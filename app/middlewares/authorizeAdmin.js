module.exports = (req, res, next) => {
  // Pastikan user telah terverifikasi oleh middleware authenticate sebelumnya
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized: No user found' });
  }

  // Cek apakah role user adalah admin
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access forbidden: Admins only' });
  }

  // Lanjutkan ke handler jika user adalah admin
  next();
};
