import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri =
  process.env.MONGODB_URI ||
  "mongodb://root:password@host.docker.internal:27017/";

let client: MongoClient | null = null;

export async function database() {
  try {
    // Reuse the existing connection if available
    if (!client) {
      client = new MongoClient(uri);
      await client.connect();
    }

    return client.db("notix");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error;
  }
}
