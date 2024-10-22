import { UUID } from "mongodb";
import { Schema, model } from "mongoose";

const classSchema = new Schema({
  // TODO: Move Tags to Class Object, so that Tags can be assigned to a class and not indivdual recording form the class
  class_id: UUID,
  class_datetime: Date,
  raw_transcription: String,
  editted_transcription: String,
  summary: String,
  recorders: [{ type: UUID }],
});

export default model("class", classSchema);
