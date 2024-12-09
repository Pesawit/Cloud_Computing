const express = require("express");
const { detectAndSaveHistory, getHistoryByUser } = require("./controller");
const { detectionImageUpload } = require("../image/controller");
const authenticate = require("../../../middlewares/authenticate");

const router = express.Router();

router.post("/detect", authenticate, detectionImageUpload, detectAndSaveHistory);
router.get("/history", authenticate, getHistoryByUser);

module.exports = router;
