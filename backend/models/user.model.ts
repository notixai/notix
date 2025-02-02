import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: String,
  bio: String,
  onboarded: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.models.User || mongoose.model("User", userSchema);
