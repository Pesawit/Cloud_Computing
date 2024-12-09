const express = require("express");
const { getProfile, updateProfile } = require("./controller");
const { profileImageUpload } = require("../image/controller");
const authenticate = require("../../../middlewares/authenticate");

const router = express.Router();

router.put("/profile", authenticate, profileImageUpload, updateProfile);
router.get("/profile", authenticate, getProfile);

module.exports = router;
