// routes/courseStatusRoutes.js
import express from "express";
import { getCourseStatuses, updateCourseStatus } from "../controllers/courseStatusController.js";
import { protect } from "../middleware/authMiddleware.js";
import CourseStatus from "../models/CourseStatusModel.js";

const router = express.Router();

router.get("/admin", protect, getCourseStatuses);
router.post("/update", protect, updateCourseStatus);
router.get("/me", protect, async (req, res) => {
  const data = await CourseStatus.find({ userId: req.user.id });
  res.json(data);
});
export default router;
