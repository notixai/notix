import { ObjectId } from "mongodb";
import { Schema, model } from "mongoose";

const roomSchema = new Schema({
  location: String,
  name: String,
  courses: [{ type: ObjectId, ref: "course" }],
  start_availability_date: Date,
  end_availability_date: Date,
});
export default model("room", roomSchema);
