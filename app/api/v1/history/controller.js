const DetectionHistory = require("./model");
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const path = require("path");
const getRecommendation = require("./recommendation");

exports.detectAndSaveHistory = async (req, res) => {
	try {
		const userId = req.user.id;

		if (!req.file) {
			return res.status(400).json({ message: "Image is required." });
		}

		const imagePath = path.join(
			// "https://server-pesawit-469455376612.asia-southeast2.run.app",
			"./public/uploads/detection",
      req.file.filename
		);

		// const imagePath = path.join(uploadDirectory, req.file.filename);
		// const imagePath = `../../../../public/uploads/detection/${req.file.filename}`

		const formData = new FormData();
		formData.append("image", fs.createReadStream(imagePath));

		const mlResponse = await axios.post(
			"https://machine-learning-469455376612.asia-southeast2.run.app/predict",
			formData,
			{
				headers: formData.getHeaders(),
			}
		);

		const { predicted_class } = mlResponse.data;

		if (!["Brown Spot", "Healthy", "White Scale"].includes(predicted_class)) {
			const imagePath = path.join(
				// "https://server-pesawit-469455376612.asia-southeast2.run.app",
				"./public/uploads/detection",
				req.file.filename
			);
			fs.unlinkSync(imagePath);
			return res
				.status(400)
				.json({ message: "Invalid prediction predicted_class from ML API." });
		}

		const recommendation = getRecommendation(predicted_class);

		const data = await DetectionHistory.create({
			userId,
			image: imagePath,
			result: predicted_class,
			recommendation,
		});

		res.status(201).json({
			message: "Detection history added successfully.",
			data,
		});
	} catch (error) {
		console.error(error);

		if (req.file) {
			const imagePath = path.join(
				// "https://server-pesawit-469455376612.asia-southeast2.run.app",
				"./public/uploads/detection",
				req.file.filename
			);
			fs.unlinkSync(imagePath);
		}

		res.status(500).json({ message: error.message });
	}
};

exports.getHistoryByUser = async (req, res) => {
	try {
		const userId = req.user.id;

		const data = await DetectionHistory.findAll({
			where: { userId },
			order: [["detectedAt", "DESC"]],
		});

		res.status(200).json({
			message: "User detection history retrieved successfully.",
			data,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: error.message });
	}
};
