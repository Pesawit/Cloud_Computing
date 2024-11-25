const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticate = (req, res, next) => {
  // mengambil token dari header Authorization
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token missing' });
  }

  try {
    // Verifikasi token dan ambil payloadnya
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Simpan data user dari token ke req.user

    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authenticate;
