require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./app/db/config");

const app = express();

const articleRoutes = require("./app/api/v1/articles/router");
const auth = require("./app/api/v1/auth/router");
const userRoutes = require("./app/api/v1/users/router");
const historyRoutes = require("./app/api/v1/history/router");

const v1 = "/api/v1";

app.use(cors());
app.use(express.json());
app.use("/public/uploads/images", express.static("./public/uploads/images"));
app.use("/public/uploads/profile", express.static("./public/uploads/profile"));
app.use("/public/uploads/detection", express.static("./public/uploads/detection"));

app.use(`${v1}`, articleRoutes);
app.use(`${v1}`, auth);
app.use(`${v1}`, userRoutes);
app.use(`${v1}`, historyRoutes);

sequelize
	.sync({ alter: true })
	.then(() => {
		const now = new Date();
		const timeString = now.toLocaleString();
		console.log(`Database synced successfully ${timeString}`);
	})
	.catch((err) => {
		console.error(`Error syncing database ${timeString}:`, err);
	});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
