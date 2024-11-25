const Article = require("./model");
const fs = require("fs");
const path = require("path");

exports.getAllArticles = async (req, res) => {
	try {
		if (req.user.role === "admin") {
			const articles = await Article.findAll({
				order: [["created_at", "DESC"]],
			});
			return res.status(200).json(articles);
		}

		const articles = await Article.findAll({
			where: { is_published: true },
			order: [["created_at", "DESC"]],
		});
		res.status(200).json(articles);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.getArticleById = async (req, res) => {
	try {
		const { id } = req.params;

		if (req.user.role === "admin") {
			const article = await Article.findByPk(id);
			if (!article) {
				return res.status(404).json({ message: "Article not found" });
			}
			return res.status(200).json(article);
		}

		const article = await Article.findOne({
			where: { id, is_published: true },
		});
		if (!article) {
			return res
				.status(404)
				.json({ message: "Article not found or not published" });
		}

		res.status(200).json(article);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.createArticle = async (req, res) => {
	try {
		const { title, content, tags, is_published } = req.body;

		let image_url = null;
		if (req.file) {
			image_url = `../../../../public/uploads/images/${req.file.filename}`;
		}

		let parsedTags = [];

		if (tags) {
			if (tags.startsWith("[") && tags.endsWith("]")) {
				parsedTags = JSON.parse(tags);
			} else {
				parsedTags = tags.split(",").map((tag) => tag.trim());
			}
		}

		const article = await Article.create({
			title,
			content,
			author: req.user.name,
			image_url,
			tags: parsedTags,
			is_published,
		});

		res.status(201).json({
			message: "Article successfully created",
			article,
		});
	} catch (error) {
		console.error(error);

		// menghapus gambar jika artikel gagal dibuat
		if (req.file && fs.existsSync(req.file.path)) {
			fs.unlinkSync(req.file.path);
		}

		res.status(500).json({ message: error.message });
	}
};

exports.updateArticle = async (req, res) => {
	try {
		const { id } = req.params;
		const { title, content, tags, is_published } = req.body;

		const article = await Article.findByPk(id);
		if (!article) {
			return res.status(404).json({ message: "Article not found" });
		}

		article.title = title || article.title;
		article.content = content || article.content;
		article.tags = tags || article.tags;
		article.is_published =
			is_published !== undefined ? is_published : article.is_published;

		if (req.file) {
			article.image_url = `../../../../public/uploads/images/${req.file.filename}`; // Update image jika ada
		}

		await article.save();

		res.status(200).json({ message: "Article updated successfully", article });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.deleteArticle = async (req, res) => {
	try {
		const { id } = req.params;

		const article = await Article.findByPk(id);

		if (!article) {
			return res.status(404).json({ message: "Article not found" });
		}

		// ngecek artikel memiliki gambar atau tidak, kalo ada diapus
		if (article.image_url) {
			const imagePath = path.join(
				__dirname,
				"../../../../public/uploads/images",
				path.basename(article.image_url)
			);

			fs.unlink(imagePath, (err) => {
				if (err) {
					console.error("Failed to delete image:", err);
				} else {
					console.log("image deleted successfully:", imagePath);
				}
			});
		}

		await article.destroy();

		res.status(200).json({ message: "articles deleted successfully" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: error.message });
	}
};
