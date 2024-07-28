const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const createTables = async () => {
  try {

    await pool.query(`DROP TABLE IF EXISTS carts;`);
    await pool.query(`DROP TABLE IF EXISTS products;`);
    await pool.query(`DROP TABLE IF EXISTS users;`);


    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(100) NOT NULL,
        role VARCHAR(50) NOT NULL
      );
    `);


    await pool.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        category VARCHAR(100) NOT NULL,
        description TEXT NOT NULL,
        price DECIMAL NOT NULL,
        discount DECIMAL,
        seller_id INTEGER NOT NULL,
        CONSTRAINT fk_seller
          FOREIGN KEY(seller_id) 
          REFERENCES users(id)
      );
    `);


    await pool.query(`
      CREATE TABLE IF NOT EXISTS carts (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        product_id INTEGER NOT NULL,
        CONSTRAINT fk_user
          FOREIGN KEY(user_id) 
          REFERENCES users(id),
        CONSTRAINT fk_product
          FOREIGN KEY(product_id) 
          REFERENCES products(id)
      );
    `);

    console.log('Tables are created or already exist.');
  } catch (err) {
    console.error('Error creating tables:', err.message);
  } finally {
    await pool.end();
  }
};

createTables();