const pool = require('../db');

const addProduct = async (req, res) => {
  const { name, category, description, price, discount } = req.body;
  const userId = req.user.id;

  try {
    const result = await pool.query(
      'INSERT INTO products (name, category, description, price, discount, seller_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, category, description, price, discount, userId]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

const editProduct = async (req, res) => {
  const { id } = req.params;
  const { name, category, description, price, discount } = req.body;

  try {
    const result = await pool.query(
      'UPDATE products SET name = $1, category = $2, description = $3, price = $4, discount = $5 WHERE id = $6 RETURNING *',
      [name, category, description, price, discount, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM products WHERE id = $1', [id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { addProduct, editProduct, deleteProduct };
