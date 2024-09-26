import express from "express";
import { connectDB, disconnectDB } from "./db";
import { Course, Recording, Room } from "./models";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/rooms", async (req, res) => {
  await connectDB();
  const rooms = await Room.find({});
  console.log(rooms);

  res.json({ rooms: rooms });
});

app.get("/recordings", async (req, res) => {
  await connectDB();
  const recordings = await Recording.find({});

  res.json({ recordings: recordings });
});

app.get("/courses", async (req, res) => {
  await connectDB();
  const courses = await Course.find({});

  res.json({ courses });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
