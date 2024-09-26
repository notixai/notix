import { model, Schema } from "mongoose";

const recordingSchema = new Schema({
  class_id: String,
  // recorder: User,
  tags: [{type: String}],
  meta_data: {},
  processed: Boolean,
  uploaded: { type: Date, default: Date.now }
});

export default model("recordings", recordingSchema);


