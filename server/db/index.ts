import { connect, disconnect } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function connectDB() {
  try {
    await connect(process.env.MONGODB_URI!, {
      dbName: process.env.DB_NAME,
      user: process.env.DB_USER,
      pass: process.env.DB_PASSWD,
    });
    console.log("Connected to the database!!");
  } catch (error) {
    console.error(error);
    await disconnect();
  }
}

async function disconnectDB() {
  await disconnect();
}

export { connectDB, disconnectDB };
