import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import queryDB from "../config/db.js";

const shelterRouter = express.Router();

shelterRouter.post("/profile", verifyToken, async (req, res) => {
    const { name, category, address, city, description, accepts_animals } = req.body;

    try {
        const city_rows = await queryDB(`SELECT id FROM City WHERE state = ? LIMIT 1`, [city]);

        let cityID;

        if(city_rows.length == 0) {
            await queryDB(`INSERT INTO City (state) VALUES (?)`, [city]);
            cityID = await queryDB(`SELECT id FROM City WHERE state = ? LIMIT 1`, [city]);
        } else {
            cityID = city_rows[0].id
        }

        await queryDB(`INSERT INTO ShelterProfiles (account_id, name, category, address, city_id, description, accepts_animals)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [req.user.userId, name, category, address, cityID, description, accepts_animals]
        );

        res.status(201).json({});
    } catch (err) {
        res.status(500).json({});
    }
});

shelterRouter.get("/all", async (req, res) => {
    try {
        const rows = await queryDB(`SELECT 
                                    a.id,
                                    sp.name,
                                    sp.category,
                                    sp.address,
                                    c.state AS city,
                                    sp.description,
                                    sp.accepts_animals
                                    FROM ShelterProfiles sp
                                    JOIN Accounts a ON sp.account_id = a.id
                                    LEFT JOIN City c ON sp.city_id = c.id;`
        );

        res.status(200).json({ rows });
    } catch (err) {
        res.status(500).json({});
    }
});

export default shelterRouter;