const pool = require("../db");

const { validationResult } = require("express-validator");

const addProduct = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }

    const { name, category, description, price, quantity, discount } = req.body;
    const userId = req.user.userId;
    const role = req.user.role;

    if (role !== "seller") {
      const error = new Error("Only seller can add products");
      error.statusCode = 403;
      throw error;
    }

    const result = await pool.query(
      "INSERT INTO products (name, category, description, price, quantity, discount, seller_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [name, category, description, price, quantity, discount, userId]
    );
    res.status(201).json({ message: 'Product added successfully!', data: result.rows[0]});
  } catch (err) {
    next(err);
  }
};

const editProduct = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }

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
    const { name, category, description, price, quantity, discount } = req.body;

    const result = await pool.query(
      "UPDATE products SET name = $1, category = $2, description = $3, price = $4, discount = $5, quantity = $6 WHERE id = $7 RETURNING *",
      [name, category, description, price, discount, quantity, id]
    );
    res.json({message: 'Product updated!', data:result.rows[0]});
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
    res.status(200).json({ message: "Deleted product successfully" });
  } catch (err) {
    next(err);
  }
};

const getMyProducts = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const result = await pool.query('SELECT * FROM products where seller_id = $1', [userId]);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
};

module.exports = { addProduct, editProduct, deleteProduct, getMyProducts};
