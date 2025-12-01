const express = require('express');
const router = express.Router();
const { pool } = require('../db');
const auth = require('../middleware/auth');

// GET all posts (protected)
router.get('/', auth, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT p.id, p.body, p.created_at, u.email AS author
       FROM posts p
       LEFT JOIN users u ON p.user_id = u.id
       ORDER BY p.created_at DESC`
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET single post
router.get('/:id', auth, async (req, res) => {
  const id = req.params.id;
  const result = await pool.query(
    'SELECT id, body, created_at FROM posts WHERE id=$1',
    [id]
  );

  if (result.rows.length === 0)
    return res.status(404).json({ error: "Not found" });

  res.json(result.rows[0]);
});

// ADD post
router.post('/', auth, async (req, res) => {
  const { body } = req.body;
  const userId = req.userId;

  const result = await pool.query(
    'INSERT INTO posts (body, user_id) VALUES ($1, $2) RETURNING *',
    [body, userId]
  );

  res.json(result.rows[0]);
});

// UPDATE post
router.put('/:id', auth, async (req, res) => {
  const { body } = req.body;
  const id = req.params.id;

  const result = await pool.query(
    'UPDATE posts SET body=$1 WHERE id=$2 RETURNING *',
    [body, id]
  );

  if (result.rows.length === 0)
    return res.status(404).json({ error: "Not found" });

  res.json(result.rows[0]);
});

// DELETE post
router.delete('/:id', auth, async (req, res) => {
  const id = req.params.id;
  const result = await pool.query('DELETE FROM posts WHERE id=$1 RETURNING *', [id]);

  if (result.rows.length === 0)
    return res.status(404).json({ error: "Not found" });

  res.json({ success: true });
});

// DELETE all posts
router.delete('/', auth, async (req, res) => {
  await pool.query('DELETE FROM posts');
  res.json({ success: true });
});

module.exports = router;
