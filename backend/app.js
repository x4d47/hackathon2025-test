import express from "express";
import cors from "cors";
import bankRouter from "./routes/bankRoutes.js";
import authRouter from "./routes/authRoutes.js";
import shelterRouter from "./routes/shelterRoutes.js"
import animalRouter from "./routes/animalRoutes.js"
import volunteerRouter from "./routes/volunteerRoutes.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/bank", bankRouter);
app.use("/auth", authRouter);
app.use("/shelter", shelterRouter);
app.use("/animal", animalRouter);
app.use("/volunteer", volunteerRouter);

app.use("/images", express.static("images"));

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send("Something broke!");
});

app.listen(8080, () => {
	console.log("Server is running on port 8080");
});
