import express from "express";
import cors from "cors";
import bankRouter from "./routes/bankRoutes.js";
import authRouter from "./routes/authRoutes.js";

const app = express();

app.use(express.json());
// без корса не буде працювати бек з ріними доменами
app.use(cors());
app.use("/bank", bankRouter);
app.use("/auth", authRouter);

// CRUD запити

// інше
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send("Something broke!");
});

app.listen(8080, () => {
	console.log("Server is running on port 8080");
});
