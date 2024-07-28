const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db');

const registerUser = async (req, res, next) => {
  const { username, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const result = await pool.query(
      'INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING *',
      [username, hashedPassword, role]
    );
    const token = jwt.sign({ userId: result.rows[0].id, role: role }, process.env.JWT_SECRET);
    res.status(201).json({ token });
  } catch (err) {
    next(err)
  }
};

const loginUser = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (result.rows.length === 0) return res.status(401).json({ error: 'Invalid credentials' });

    const isValid = await bcrypt.compare(password, result.rows[0].password);
    if (!isValid) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ userId: result.rows[0].id, role: result.rows[0].role }, process.env.JWT_SECRET);
    res.json({ token, role: result.rows[0].role});
  } catch (err) {
    next(err);
  }
};

module.exports = { registerUser, loginUser };
