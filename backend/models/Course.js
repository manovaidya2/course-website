import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  name: String,
  type: { type: String, enum: ["Video", "Quiz"], default: "Video" },
  duration: String,
  thumbnail: String,
  youtubeUrl: String,
  points: [String],
});

const moduleSchema = new mongoose.Schema({
  title: String,
  lessons: [lessonSchema],
});

const courseSchema = new mongoose.Schema(
  {
    moduleName: String,

    disease: {
      type: String,
      enum: ["Autism & ADHD", "Teenage", "Adults"],
      required: true,
    },

    diseaseId: {
      type: String,
      enum: ["autism-adhd", "teenage", "adults"],
      required: true,
      index: true,
    },

    type: String,
    access: String,

    courseTitle: String,
    courseDescription: String,

    totalModules: Number,
    totalTime: String,

    youWillLearn: [String],
    bottomFieldText: String,

    thumbnail: String,
    modules: [moduleSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Course", courseSchema);
