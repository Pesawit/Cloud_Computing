const express = require("express");
const { getAllArticles, getArticleById, createArticle, updateArticle, deleteArticle } = require("./controller");
const { articleImageUpload } = require("../image/controller");
const authenticate = require("../../../middlewares/authenticate")
const checkRole = require("../../../middlewares/checkRole")

const router = express.Router();

router.get("/articles", authenticate, getAllArticles);
router.get("/articles/:id", authenticate, getArticleById);
router.post("/articles", authenticate, checkRole(["admin"]), articleImageUpload, createArticle);
router.put("/articles/:id", authenticate, checkRole(["admin"]), articleImageUpload, updateArticle);
router.delete("/articles/:id", authenticate, checkRole(["admin"]), deleteArticle);

module.exports = router;
