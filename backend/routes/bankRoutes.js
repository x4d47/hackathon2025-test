import express from "express";

import bankServices from "../services/bankServices.js";

const bankRouter = express.Router();

// отримати всі банки
bankRouter.get("/", async (req, res) => {
	try {
		const { key = "", type = null, only = null } = req.query;

		const result = await bankServices.getBanks(key, type, only);

		res.send(result);
	} catch (error) {
		res
			.status(500)
			.send({ message: "Failed to get all banks", error: error.message });
	}
});

// // // отримати всі банки по ключ слову
// bankRouter.get("/search", async (req, res) => {
// 	try {
// 		let allSortedBanksWithSearch;
// 		const keyword = req.query.keyword;

// 		if (req.query.sort) {
// 			allSortedBanksWithSearch =
// 				await bankServices.getBanksByKeywordWithSortByAlphabet(keyword);
// 		} else {
// 			allSortedBanksWithSearch = await bankServices.getBanksByKeyword(keyword);
// 		}

// 		res.send(allSortedBanksWithSearch);
// 	} catch (error) {
// 		res.status(500).send({
// 			message: "Failed to get banks by keyword ",
// 			error: error.message,
// 		});
// 	}
// });

// // отримати банк по ід
bankRouter.get("/:id", async (req, res) => {
	try {
		const id = req.params.id;

		const bank = await bankServices.getBank(id);
		res.send(bank);
	} catch (error) {
		res
			.status(500)
			.send({ message: "Failed to get bank with id", error: error.message });
	}
});

// // отримати банкі кластером
bankRouter.get("/cluster/:sliceCount", async (req, res) => {
	try {
		const limit = 3;
		const sliceCount = parseInt(req.params.sliceCount);
		let isDoNextQueryClusterBanks = true;

		const bank = await bankServices.getBankByCluster(sliceCount);
		const { count: lengthBank } = await bankServices.getBankCount();

		if (sliceCount + limit >= lengthBank) {
			isDoNextQueryClusterBanks = false;
		}

		bank.unshift({ nextQuery: isDoNextQueryClusterBanks });

		res.send(bank);
	} catch (error) {
		res
			.status(500)
			.send({ message: "Failed to get bank with id", error: error.message });
	}
});

// // створити банк
// app.post("/bank", async (req, res) => {
// 	try {
// 		const { name, description, client_count, credit_taken_count } = req.body;

// 		const newBank = await createBank(
// 			name,
// 			description,
// 			client_count,
// 			credit_taken_count
// 		);
// 		res.status(201).send(newBank);
// 	} catch (error) {
// 		res
// 			.status(500)
// 			.send({ message: "Failed to create bank", error: error.message });
// 	}
// });

// // оновити банк
// app.put("/bank", async (req, res) => {
// 	try {
// 		const { id, name, description, client_count, credit_taken_count } =
// 			req.body;

// 		const updBank = await updateBank(
// 			id,
// 			name,
// 			description,
// 			client_count,
// 			credit_taken_count
// 		);
// 		res.status(201).send(updBank);
// 	} catch (error) {
// 		res
// 			.status(500)
// 			.send({ message: "Failed to update bank", error: error.message });
// 	}
// });

// // видалити банк
// app.delete("/bank/:id", async (req, res) => {
// 	try {
// 		const id = req.params.id;
// 		await deleteBank(id);
// 		res.status(201).send({ message: "Bank deleted successfully" }); // Відправляємо відповідь
// 	} catch (error) {
// 		res
// 			.status(500)
// 			.send({ message: "Failed to delete bank", error: error.message }); // Відправляємо помилку
// 	}
// });

export default bankRouter;
