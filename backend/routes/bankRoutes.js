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

export default bankRouter;
