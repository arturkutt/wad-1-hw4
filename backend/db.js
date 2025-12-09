// backend/db.js
const { Pool } = require('pg');

const pool = new Pool({
  user: "postgres",
  password: "Karelallik11",//"superuser",
  database: "testWad",
  host: "localhost",
  port: 5432
});

async function tableExists(tableName) {
  const q = `
    SELECT EXISTS (
      SELECT 1
      FROM information_schema.tables
      WHERE table_schema = 'public'
        AND table_name = $1
    ) AS "exists";
  `;
  const res = await pool.query(q, [tableName]);
  return res.rows[0] && res.rows[0].exists;
}

async function init() {
  try {
    // users table
    const usersExists = await tableExists('users');
    if (usersExists) {
      console.log('Table "users" already exists.');
    } else {
      await pool.query(`
        CREATE TABLE public.users (
          id SERIAL PRIMARY KEY,
          email TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT NOW()
        );
      `);
      console.log('Table "users" created.');
    }

    // posts table
    const postsExists = await tableExists('posts');
    if (postsExists) {
      console.log('Table "posts" already exists.');
    } else {
      await pool.query(`
        CREATE TABLE public.posts (
          id SERIAL PRIMARY KEY,
          body TEXT NOT NULL,
          user_id INTEGER REFERENCES public.users(id) ON DELETE SET NULL,
          created_at TIMESTAMP DEFAULT NOW()
        );
      `);
      console.log('Table "posts" created.');
    }

    return true;
  } catch (err) {
    console.error('Error during DB initialization:', err);
    throw err;
  }
}

module.exports = { pool, init };
