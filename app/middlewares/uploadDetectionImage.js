const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "./public/uploads/detection");
	},
	filename: (req, file, cb) => {
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		cb(null, uniqueSuffix + path.extname(file.originalname)); // Nama file unik
	},
});

const fileFilter = (req, file, cb) => {
	const allowedTypes = /jpeg|jpg|png/;
	const extname = allowedTypes.test(
		path.extname(file.originalname).toLowerCase()
	);
	const mimetype = allowedTypes.test(file.mimetype);

	if (mimetype && extname) {
		return cb(null, true);
	} else {
		cb(new Error("Only .png, .jpg, and .jpeg formats are allowed!"));
	}
};

const upload = multer({
	storage: storage,
	limits: {
		fileSize: 1024 * 1024, // 1MB
	},
	fileFilter: fileFilter,
}).single("image");

module.exports = upload;
