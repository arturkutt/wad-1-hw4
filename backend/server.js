const express = require('express');
const cors = require('cors');
const { init } = require('./db');

const authRoutes = require('./routes/auth');
const postsRoutes = require('./routes/posts');

const app = express();
app.use(cors());
app.use(express.json());

// Init DB tables
(async () => {
  await init();
  console.log("DB initialized");
})();

app.use('/api/auth', authRoutes);
app.use('/api/posts', postsRoutes);

app.get('/api/ping', (req, res) => res.json({ ok: true }));

app.listen(3000, () => console.log("Server running on port 3000"));
