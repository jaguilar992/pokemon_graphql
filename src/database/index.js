import mongoose from "mongoose";
import { MONGO_URI } from "../config/index.js";

export const connectDB = async () => {
	await mongoose.connect(MONGO_URI);
	console.log("Connected to MongoDB");
};

