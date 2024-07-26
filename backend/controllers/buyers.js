const pool = require('../db');

const searchProducts = async (req, res) => {
  const { name, category } = req.query;

  try {
    const result = await pool.query(
      'SELECT * FROM products WHERE name ILIKE $1 OR category ILIKE $2',
      [`%${name}%`, `%${category}%`]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

const addToCart = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user.id;

  try {
    const result = await pool.query(
      'INSERT INTO carts (user_id, product_id) VALUES ($1, $2) RETURNING *',
      [userId, productId]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

const removeFromCart = async (req, res) => {
  const { productId } = req.params;
  const userId = req.user.id;

  try {
    await pool.query('DELETE FROM carts WHERE user_id = $1 AND product_id = $2', [userId, productId]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { searchProducts, addToCart, removeFromCart };
