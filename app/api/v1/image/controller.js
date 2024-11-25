const multer = require('multer');
const articleUpload = require('../../../middlewares/uploadImage');
const profileUpload = require('../../../middlewares/uploadProfileImage')
const detectionUpload = require('../../../middlewares/uploadDetectionImage')

exports.articleImageUpload = (req, res, next) => {
  articleUpload(req, res, function (err) {
    if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        message: 'Gambar melebihi ukuran maksimum 350KB'
      });
    } else if (err) {
      return res.status(400).json({
        message: err.message
      });
    }
    next();
  });
};

exports.profileImageUpload = (req, res, next) => {
  profileUpload(req, res, function (err) {
    if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        message: 'Gambar melebihi ukuran maksimum 350KB'
      });
    } else if (err) {
      return res.status(400).json({
        message: err.message
      });
    }
    next();
  });
};

exports.detectionImageUpload = (req, res, next) => {
  detectionUpload(req, res, function (err) {
    if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        message: 'Gambar melebihi ukuran maksimum 1MB'
      });
    } else if (err) {
      return res.status(400).json({
        message: err.message
      });
    }
    next();
  });
};