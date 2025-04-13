import express from "express";

import authServices from "../services/authServices.js";
import e from "express";
import bcrypt from "bcrypt";
import { createToken, verifyToken } from "../middleware/authMiddleware.js";

import queryDB from "../config/db.js";

const authRouter = express.Router();

// реєстрація акаунту
authRouter.post("/register", async (req, res) => {
	try {
		const { account_type, email, password } = req.body;

		if (!account_type || !email || !password) {
			throw new Error("All fields are required");
		}

		const rows = await queryDB(
			`SELECT 1 FROM Accounts WHERE email = ? LIMIT 1`,
			[email]
		);
	
		if (rows.length > 0) {
			return res.status(409).json({ message: "Email is already in use" });
		}

		const userId = await authServices.registerUser(account_type, email, password);

		const token = createToken(email, userId);

		res.status(201).send({ token, account_type, email });
	} catch (error) {
		res
			.status(500)
			.send({ message: "Failed to register", error: error.message });
	}
});

// логінізація акаунта
authRouter.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(401).json({ message: "Email and password are required" });
		}

        const rows = await queryDB(`SELECT * FROM Accounts WHERE email = ?`, [email]);

		if (rows.length == 0) {
			return res.status(401).json({ message: "Invalid email" });
		}

		if (await bcrypt.compare(password, rows[0].password_hash)) {
			const token = createToken(rows[0].email, rows[0].id);

			res.status(200).json({ token });
		} else {
			res.status(401).json({ message: "Invalid password" });
		}
	} catch (error) {
		res.status(500).send({ message: "Failed to log in", error: error.message });
	}
});

export default authRouter;