import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

function createToken(email, id) {
	return jwt.sign({ email: email, userId: id }, process.env.JWT_SECRET_KEY, {
		expiresIn: "12h",
	});
}

const verifyToken = (req, res, next) => {
	const token = req.headers["auth"]?.split(" ")[1];

	if (!token) {
		return res.status(403).json({ message: "Have no token!" });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
		req.user = decoded;
	} catch (error) {
		return res.status(401).json({ message: "Invalid token" });
	}

	next();
};

export { createToken, verifyToken };
