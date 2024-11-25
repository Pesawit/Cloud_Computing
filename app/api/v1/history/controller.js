const DetectionHistory = require("./model");
const fs = require("fs");
const path = require("path");
const getRecommendation = require("./recommendation");

exports.addHistory = async (req, res) => {
  try {
    const userId = req.user.id; 
    const { result } = req.body;

    if (!["brown spots", "healthy", "white scale"].includes(result)) {
      return res.status(400).json({ message: "Invalid detection result." });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Image is required." });
    }

    const imagePath = `../../../../public/uploads/detection/${req.file.filename}`;

    const recommendation = getRecommendation(result);

    const history = await DetectionHistory.create({
      userId,
      image: imagePath,
      result,
      recommendation,
    });

    res.status(201).json({
      message: "Detection history added successfully.",
      history,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

exports.getHistoryByUser = async (req, res) => {
  try {
    const userId = req.user.id; 

    const histories = await DetectionHistory.findAll({
      where: { userId },
      order: [["detectedAt", "DESC"]], 
    });

    res.status(200).json({
      message: "User detection history retrieved successfully.",
      histories,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

