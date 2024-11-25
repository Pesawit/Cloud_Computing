const express = require("express");
const { addHistory, getHistoryByUser } = require("./controller");
const { detectionImageUpload } = require("../image/controller");
const authenticate = require("../../../middlewares/authenticate");

const router = express.Router();

router.post("/history", authenticate, detectionImageUpload, addHistory);
router.get("/history", authenticate, getHistoryByUser);

module.exports = router;
