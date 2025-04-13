import pool from "../config/database.js";
import parseBank from "../models/bankModels.js";

// Base query for retrieving bank information
const bankQuery = `
    SELECT
        bank.id,
        bank.title,
        bank.description,
        bank.img_src AS imgSrc,
        bank.bond_price AS bondPrice,
        GROUP_CONCAT(DISTINCT bond_percentages.percentage ORDER BY bond_percentages.percentage ASC) AS bondPercent,
        GROUP_CONCAT(DISTINCT bank_characteristics.characteristic ORDER BY bank_characteristics.characteristic ASC) AS charArray
    FROM
        bank
    LEFT JOIN
        bank_has_bond_percentages ON bank.id = bank_has_bond_percentages.bank_id
    LEFT JOIN
        bond_percentages ON bank_has_bond_percentages.bond_percentages_id = bond_percentages.id
    LEFT JOIN
        bank_characteristics ON bank.id = bank_characteristics.bank_id
`;

// async function getBanks(orderBy = "") {
// 	const [rows] = await pool.query(`${bankQuery} GROUP BY bank.id ${orderBy};`);
// 	return parseBank(rows);
// }

// async function getBanksByAlphabet() {
//     return getBanks('ORDER BY bank.title ASC');
// }

async function getBanks(key, type, only) {
	let partQuerySortingType = "";
	let partQueryIncludeOnly = "";

	switch (type) {
		case "aZ":
			partQuerySortingType = "ORDER BY bank.title ASC";
			break;
		case "zA":
			partQuerySortingType = "ORDER BY bank.title DESC";
			break;
		case "highPrice":
			partQuerySortingType = "ORDER BY bank.bond_price DESC";
			break;
		case "lowPrice":
			partQuerySortingType = "ORDER BY bank.bond_price ASC";
			break;
	}

	if (only) {
		partQueryIncludeOnly = "AND bond_percentages.percentage = ?";
	}

	const [rows] = await pool.query(
		`${bankQuery} WHERE bank.title LIKE ? ${partQueryIncludeOnly} GROUP BY bank.id ${partQuerySortingType};`,
		[`%${key}%`, only]
	);
	return parseBank(rows);
}

async function getBankByCluster(sliceCount) {
	const clusterLimit = 3;

	const [rows] = await pool.query(
		`${bankQuery} GROUP BY bank.id, bank.title, bank.description, bank.img_src, bank.bond_price LIMIT ? OFFSET ?;`,
		[clusterLimit, parseInt(sliceCount)]
	);
	return parseBank(rows);
}

// дістати число банків
async function getBankCount() {
	const [rows] = await pool.query(`SELECT COUNT(*) AS count FROM bank;`);
	return rows[0];
}

// Get a single bank by ID
async function getBank(id) {
	const [rows] = await pool.query(
		`${bankQuery} WHERE bank.id = ? GROUP BY bank.id;`,
		[id]
	);
	return parseBank(rows);
}

// Create a new bank
async function createBank(name, description, client_count, credit_taken_count) {
	const [result] = await pool.query(
		"INSERT INTO bank (name, description, client_count, credit_taken_count) VALUES (?, ?, ?, ?)",
		[name, description, client_count, credit_taken_count]
	);
	return getBank(result.insertId);
}

// Update an existing bank
async function updateBank(id, fields) {
	const keys = Object.keys(fields);
	if (keys.length === 0) return { message: "No fields to update" };

	const queryParts = keys.map((key) => `${key} = ?`).join(", ");
	const values = [...Object.values(fields), id];

	await pool.query(`UPDATE bank SET ${queryParts} WHERE id = ?`, values);
	return getBank(id);
}

// Delete a bank by ID
async function deleteBank(id) {
	await pool.query("DELETE FROM bank WHERE id = ?", [id]);
}

export default {
	getBanks,
	getBankByCluster,
	getBank,
	getBankCount,
	createBank,
	updateBank,
	deleteBank,
};
