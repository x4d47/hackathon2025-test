import queryDB from "../config/db.js";

import pool from "../config/database.js";
import bcrypt from "bcrypt";

async function registerUser(account_type, email, password) {
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	await queryDB(
        `INSERT INTO Accounts (type, email, password_hash) VALUES (?, ?, ?)`,
        [account_type, email, hashedPassword]
    );

	const rows = await queryDB(`SELECT id FROM Accounts WHERE email = ?`, [email]);

	return rows[0].id;
}

async function isUserExist(email) {
	const [rows] = await pool.query("SELECT * FROM user WHERE email = ?", [
		email,
	]);

	return rows.length > 0 ? rows[0] : null;
}

async function getPasswordByUserId(id) {
	const [rows] = await pool.query(
		"SELECT password FROM password WHERE user_id = ?",
		[id]
	);

	return rows.length > 0 ? rows[0].password : null;
}

export default { registerUser, isUserExist, getPasswordByUserId };
