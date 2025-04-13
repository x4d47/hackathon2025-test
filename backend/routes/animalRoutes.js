import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import queryDB from "../config/db.js";

const animalRouter = express.Router();

animalRouter.post("/add", verifyToken, async (req, res) => {
    const { name, specie, age } = req.body;

    try {
        const result = await queryDB(
            `INSERT INTO Animals (name, shelter_id, specie, age) VALUES (?, ?, ?, ?)`,
            [name, req.user.userId, specie, age]
        );

        res.status(201).json({});
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
});

animalRouter.get("/all", async (req, res) => {
    try {
        const animals = await queryDB(`
            SELECT 
                a.id,
                a.name,
                a.specie,
                a.age,
                a.created_at,
                sp.name AS shelter_name,
                sp.address,
                c.state AS city
            FROM Animals a
            JOIN Accounts acc ON a.shelter_id = acc.id
            JOIN ShelterProfiles sp ON acc.id = sp.account_id
            LEFT JOIN City c ON sp.city_id = c.id
            ORDER BY a.created_at DESC
        `);

        res.status(200).json({ animals });
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
});

animalRouter.delete("/:id", verifyToken, async (req, res) => {
    const animalID = req.params.id;

    try {
        const animal = await queryDB(
            `SELECT * FROM Animals WHERE id = ?`,
            [animalID]
        );

        if (animal.length == 0) {
            return res.status(404).json({ error: "Animal not found" });
        }

        await queryDB(`DELETE FROM Animals WHERE id = ?`, [animalID]);

        res.status(200).json({});
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
});

export default animalRouter;