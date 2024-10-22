import express from "express";
import dotenv from "dotenv";
import { fetchUsers } from "./actions/user.actions";

dotenv.config();

const PORT = process.env.PORT || 5001;

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", async (req, res) => {
  const data = await fetchUsers();

  res.json({ users: data });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
