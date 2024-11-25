const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../users/model");
require("dotenv").config();

exports.register = async (req, res) => {
	try {
		const { email, password, confirmPassword, name, role } = req.body;

		const user = await User.findOne({ where: { email } });
		if (user) {
			return res.status(400).json({ message: "Email already registered" });
		}

		if (password !== confirmPassword) {
			return res.status(400).json({ message: "Passwords do not match" });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = await User.create({
			email,
			password: hashedPassword,
			name,
			role: role || "user",
			photo: "../../../../public/uploads/profile/default-profile.png",
		});

		res.status(201).json({
			message: "User registered successfully",
			user: newUser,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.login = async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ where: { email } });
		if (!user) {
			return res.status(400).json({ message: "Email not registered." });
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({ message: "Invalid password" });
		}

		const token = jwt.sign(
			{ id: user.id, name: user.name, role: user.role },
			process.env.JWT_SECRET,
			{ expiresIn: "1h" }
		);

		res.status(200).json({ message: "Login successful", token });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
