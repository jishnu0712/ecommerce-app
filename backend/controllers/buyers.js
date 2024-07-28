const pool = require('../db');

const searchProducts = async (req, res, next) => {
  const { name, category } = req.query;

  try {
    const result = await pool.query(
      'SELECT * FROM products WHERE name ILIKE $1 OR category ILIKE $2',
      [`%${name}%`, `%${category}%`]
    );
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
};

const addToCart = async (req, res, next) => {
  const { productId } = req.body;

  // const product = await pool.query('SELECT * from products where id = $1', [productId]);
  // console.log(product);

  if (!productId) {
    const error = new Error("No valid product id provided");
    error.statusCode = 401;
    throw error;
  }

  const userId = req.user.userId;

  try {
    const result = await pool.query(
      'INSERT INTO carts (user_id, product_id) VALUES ($1, $2) RETURNING *',
      [userId, productId]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

const getCartItems = async (req, res, next) => {
  const userId = req.user.userId;

  try {
    const result = await pool.query('SELECT * FROM carts WHERE user_id = $1', [userId]);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
}

const removeFromCart = async (req, res, next) => {
  const { productId } = req.params;
  const userId = req.user.userId;

  try {
    await pool.query('DELETE FROM carts WHERE user_id = $1 AND product_id = $2', [userId, productId]);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

const getAllProducts = async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM products');
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
}

module.exports = { getAllProducts, searchProducts, addToCart, getCartItems, removeFromCart };
