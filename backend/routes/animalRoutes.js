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

animalRouter.put("/:id", verifyToken, async (req, res) => {
    const animalID = req.params.id;

    const { name, specie, age } = req.body;

    try {
        const animal = await queryDB(
            `SELECT * FROM Animals WHERE id = ?`,
            [animalID]
        );

        if (animal.length == 0) {
            return res.status(404).json({ error: "Animal not found" });
        }
        
        let sql = `UPDATE Animals SET`;

        const params = [];

        let hasPrevious = false;

        if (name !== undefined) {
            sql += hasPrevious ? `, name = ?` : ` name = ?`;
            params.push(name);
            hasPrevious = true;
        }
        
        if (specie !== undefined) {
            sql += hasPrevious ? `, specie = ?` : ` specie = ?`;
            params.push(specie);
            hasPrevious = true;
        }
        
        if (age !== undefined) {
            sql += hasPrevious ? `, age = ?` : ` age = ?`;
            params.push(age);
            hasPrevious = true;
        }

        if (!hasPrevious) {
            return res.status(400).json({ error: "No fields to update" });
        }

        sql += ` WHERE id = ?`;
        params.push(animalID);

        await queryDB(sql, params);

        res.status(200).json({});
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

animalRouter.get("/search", async (req, res) => {
    const { query, specie, age, sort_by, sort_order } = req.query;

    try {
        let sql = `
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
        LEFT JOIN Accounts acc ON a.shelter_id = acc.id
        LEFT JOIN ShelterProfiles sp ON acc.id = sp.account_id
        LEFT JOIN City c ON sp.city_id = c.id
        WHERE 1=1`;

        const params = [];

        // Пошук за ім’ям
        if (query) {
            sql += ` AND LOWER(a.name) LIKE LOWER(?)`;
            params.push(`%${query}%`);
        }

        // Фільтрація за видом
        if (specie) {
            sql += ` AND a.specie = ?`;
            params.push(specie);
        }

        // Фільтрація за віком
        if (age) {
            sql += ` AND a.age = ?`;
            params.push(age);
        }

        // Сортування
        const allowedSortFields = ['age', 'created_at', 'name'];
        const orderBy = allowedSortFields.includes(sort_by) ? sort_by : 'created_at';

        const orderDirection = (sort_order && sort_order.toLowerCase() === 'asc') ? 'ASC' : 'DESC';

        sql += ` ORDER BY a.${orderBy} ${orderDirection}`;

        const animals = await queryDB(sql, params);

        res.status(200).json({ animals });
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
});

animalRouter.get("/:id", async (req, res) => {
    const animalID = req.params.id;

    try {
        const [animal] = await queryDB(
            `SELECT * FROM Animals WHERE id = ?`,
            [animalID]
        );

        if (!animal) {
            return res.status(404).json({ error: "Animal not found" });
        }

        res.status(200).json({ animal });
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
});

export default animalRouter;