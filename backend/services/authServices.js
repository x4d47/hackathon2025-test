import pool from "../config/database.js";
import bcrypt from "bcrypt";

// реєстрація користувача
async function registerUser(userName, email, password) {
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	await pool.query("CALL add_user(?, ?, ?, @new_user_id)", [
		userName,
		email,
		hashedPassword,
	]);

	const [newUserId] = await pool.query("SELECT @new_user_id AS new_user_id");

	return newUserId[0].new_user_id;
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
