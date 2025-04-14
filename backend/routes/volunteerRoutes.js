import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import queryDB from "../config/db.js";

const volunteerRouter = express.Router();

volunteerRouter.post("/profile", verifyToken, async (req, res) => {
    const { name } = req.body;

    try {
        await queryDB(`INSERT INTO VolunteerProfiles (account_id, name) VALUES (?, ?)
            ON DUPLICATE KEY UPDATE name=VALUES(name)`,
            [req.user.userId, name]);

        res.status(201).json({});
    } catch (err) {
        res.status(500).json({});
    }
});

export default volunteerRouter;