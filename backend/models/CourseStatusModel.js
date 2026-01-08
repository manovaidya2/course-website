import mongoose from "mongoose";

const courseStatusSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    categoryValue: {
      type: String,
      enum: ["autism-adhd", "teenage", "adults"],
      required: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Active"],
      default: "Pending",
    },

    paymentId: String,
  },
  { timestamps: true }
);

export default mongoose.model("CourseStatus", courseStatusSchema);
