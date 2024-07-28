const pool = require("../db");

const addProduct = async (req, res, next) => {
  const { name, category, description, price, discount } = req.body;
  const userId = req.user.userId;
  const role = req.user.role;

  if (role !== "seller") {
    const error = new Error("Only seller can add products");
    error.statusCode = 403;
    throw error;
  }

  try {
    const result = await pool.query(
      "INSERT INTO products (name, category, description, price, discount, seller_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [name, category, description, price, discount, userId]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

const editProduct = async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    const error = new Error("No valid product id provided");
    error.statusCode = 401;
    throw error;
  }
  const role = req.user.role;

  if (role !== "seller") {
    const error = new Error("Only seller can add products");
    error.statusCode = 403;
    throw error;
  }
  const { name, category, description, price, discount } = req.body;

  try {
    const result = await pool.query(
      "UPDATE products SET name = $1, category = $2, description = $3, price = $4, discount = $5 WHERE id = $6 RETURNING *",
      [name, category, description, price, discount, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

const deleteProduct = async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    const error = new Error("No valid product id provided");
    error.statusCode = 401;
    throw error;
  }
  const role = req.user.role;

  if (role !== "seller") {
    const error = new Error("Only seller can add products");
    error.statusCode = 403;
    throw error;
  }
  try {
    await pool.query("DELETE FROM products WHERE id = $1", [id]);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports = { addProduct, editProduct, deleteProduct };
