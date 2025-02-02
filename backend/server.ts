import express from "express";
import dotenv from "dotenv";
import { fetchUser, fetchUsers, updateUser } from "./actions/user.actions";

dotenv.config();

const PORT = process.env.PORT || 5001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", async (req, res) => {
  const data = await fetchUsers();

  res.json({ users: data });
});

app.get("/users/:id", async (req, res) => {
  const { id } = req.params;

  const data = await fetchUser(id);

  res.json({ user: data });
});

app.post("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { username, name, bio, image } = req.body;
  console.log(username);

  await updateUser({ userId: id, username, name, bio, image });

  res.json({ message: "User updated" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
