import express from "express";

import authServices from "../services/authServices.js";
import e from "express";
import bcrypt from "bcrypt";
import { createToken, verifyToken } from "../middleware/authMiddleware.js";

const authRouter = express.Router();

// реєстрація акаунту
authRouter.post("/register", async (req, res) => {
	try {
		const { userName, email, password } = req.body;

		if (!userName || !email || !password) {
			throw new Error("All fields are required");
		}

		const userId = await authServices.registerUser(userName, email, password);

		if (!userId) {
			throw new Error("Incorrect data or user exist");
		}

		const token = createToken(email, userId);

		res.status(201).send({ token, userName, email });
	} catch (error) {
		res
			.status(500)
			.send({ message: "Failed to create bank", error: error.message });
	}
});

// логінізація акаунта
authRouter.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			throw new Error("All fields are required");
		}

		// Перевіряємо, чи існує користувач
		const user = await authServices.isUserExist(email);

		if (!user) {
			throw new Error("Invalid email or password");
		}

		// Отримуємо хеш пароля для цього користувача
		const passwordHash = await authServices.getPasswordByUserId(user.id);

		if (!passwordHash) {
			throw new Error("Password not found");
		}

		// Перевіряємо правильність пароля
		const isPasswordCorrect = await bcrypt.compare(password, passwordHash);

		if (!isPasswordCorrect) {
			throw new Error("Incorrect password");
		}

		// Створення токену
		const token = createToken(user.email, user.id);

		res.status(200).send({
			token,
			userName: user.name,
			email: user.email,
		});
	} catch (error) {
		res.status(500).send({ message: "Failed to log in", error: error.message });
	}
});

export default authRouter;
