import { database } from "../db";

export async function createUser(name: string) {
  try {
    const db = await database();
    const user = await db.collection("users").insertOne({ name });

    if (!user) {
      throw new Error("Minor not found");
    }
    return user;
  } catch (error) {
    console.error("Error creating minor:", error);
    throw error;
  }
}

export async function fetchUsers() {
  try {
    const db = await database();
    const users = await db.collection("users").find().toArray();

    if (!users) {
      throw new Error("No users found");
    }

    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}
