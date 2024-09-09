import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import { logger } from "../plugins/logger";

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URL || "";
    await mongoose.connect(mongoUri);
    logger.info("Connected to MongoDB");
  } catch (error) {
    logger.error("Failed to connect to MongoDB", error);
    process.exit(1);
  }
};

export default connectDB;
