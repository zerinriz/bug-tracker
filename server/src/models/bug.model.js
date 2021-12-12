import mongoose from "mongoose";

const BugSchema = new mongoose.Schema(
  {
    creator: {
      type: String,
      trim: true,
    },
    name: {
      type: String,
      trim: true,
      required: "Name is required",
    },

    details: {
      type: String,
      trim: true,
      required: "Details is required",
    },

    steps: {
      type: String,
      trim: true,
      required: "Steps are required",
    },

    priority: {
      type: String,
      trim: true,
      required: "Priority is required",
    },

    version: {
      type: String,
      trim: true,
      required: "Version is required",
    },
    assigned: {
      type: String,
      trim: true,
      required: "You must assign a user",
    },
    completed: {
      type: Boolean,
    },
    created: {
      type: Date,
      default: Date.now,
    },
    updated: Date,
  },
  {
    collection: "bugs",
  }
);

export default mongoose.model("Bug", BugSchema);
