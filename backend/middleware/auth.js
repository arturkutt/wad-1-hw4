const jwt = require('jsonwebtoken');

const JWT_SECRET = "b33f4l1fe36fda1bc2k9e0j93020374e7";

function authMiddleware(req, res, next) {
  const auth = req.headers['authorization'];
  if (!auth) return res.status(401).json({ error: 'No token provided' });

  const parts = auth.split(' '); // Bearer <token>
  if (parts.length !== 2) return res.status(401).json({ error: 'Token error' });

  const scheme = parts[0];
  const token = parts[1];

  if (!/^Bearer$/i.test(scheme)) return res.status(401).json({ error: 'Token malformatted' });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Token invalid' });

    req.userId = decoded.id;
    next();
  });
}

module.exports = authMiddleware;
module.exports.JWT_SECRET = JWT_SECRET;
