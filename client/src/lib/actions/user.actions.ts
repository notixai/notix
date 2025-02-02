"use server";

import { connectToDatabase } from "../mongoose";
import User from "../models/user.model";

export async function fetchUser(userId: string) {
  try {
    await connectToDatabase();
    return await User.findOne({ id: userId });
  } catch (error: any) {
    throw new Error(`Failed to fetch user: ${error.message}`);
  }
}

export async function fetchUsers() {
  try {
    await connectToDatabase();

    return await User.find({});
  } catch (error: any) {
    throw new Error(`Failed to fetch users: ${error.message}`);
  }
}

interface Params {
  userId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
}

export async function updateUser({
  userId,
  bio,
  name,
  username,
  image,
}: Params): Promise<void> {
  try {
    await connectToDatabase();

    await User.findOneAndUpdate(
      { id: userId },
      {
        username: username.toLowerCase(),
        name,
        bio,
        image,
        onboarded: true,
      },
      { upsert: true }
    );
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}
