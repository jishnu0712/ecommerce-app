const { Client } = require('pg');
require('dotenv').config();

const createDatabase = async () => {
  const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: 'postgres'
  });

  try {
    await client.connect();
    const result = await client.query(`SELECT 1 FROM pg_database WHERE datname='${process.env.DB_DATABASE}'`);
    if (result.rows.length === 0) {
      await client.query(`CREATE DATABASE ${process.env.DB_DATABASE}`);
      console.log(`Database ${process.env.DB_DATABASE} created successfully.`);
    } else {
      console.log(`Database ${process.env.DB_DATABASE} already exists.`);
    }
  } catch (err) {
    console.error('Error creating database:', err);
  } finally {
    await client.end();
  }
};

createDatabase();
