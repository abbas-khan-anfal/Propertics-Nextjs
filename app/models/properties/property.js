import mongoose, { mongo } from "mongoose";

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  location_name: {
    type: String,
    required: true,
  },
  location_url: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  img_paths : {
    type: [String],
    required: true,
  },
  img_pub_ids : {
    type: [String],
    required: true,
  },
  user : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const propertyModel = mongoose.models.properties || mongoose.model("properties", propertySchema);

export default propertyModel;