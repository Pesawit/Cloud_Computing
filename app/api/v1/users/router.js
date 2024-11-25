const express = require("express");
const { updateProfile } = require("./controller");
const { profileImageUpload } = require("../image/controller");
const authenticate = require("../../../middlewares/authenticate");

const router = express.Router();

router.put("/profile", authenticate, profileImageUpload, updateProfile);

module.exports = router;
