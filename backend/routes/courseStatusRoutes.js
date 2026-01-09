  import express from "express";
  import multer from "multer";
  import { protect } from "../middleware/authMiddleware.js";
  import {
    getCourseStatuses,
    updateCourseStatus,
    toggleCourse,
  getMyStatuses,
    getAdminUsers,
  } from "../controllers/courseStatusController.js";
  import CourseStatus from "../models/CourseStatusModel.js";

  const router = express.Router();

  // ---------- MULTER ----------
  const storage = multer.diskStorage({
    destination: "uploads/payments",
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });

  const upload = multer({ storage });

  // ---------- USER: UPLOAD SCREENSHOT ----------
  router.post(
    "/upload-screenshot",
    protect,
    upload.single("screenshot"),
    async (req, res) => {
      try {
        const { categoryValue } = req.body;

        const status = await CourseStatus.findOneAndUpdate(
          { userId: req.user.id, categoryValue },
          {
            paymentScreenshot: `/uploads/payments/${req.file.filename}`,
            paymentMethod: "Manual",
            status: "Pending",
          },
          { upsert: true, new: true }
        );

        res.json({
          message: "Screenshot uploaded. Waiting for admin approval.",
          status,
        });
      } catch (err) {
        res.status(500).json({ message: "Upload failed" });
      }
    }
  );

  // ---------- ADMIN ----------
  router.get("/admin", protect, getCourseStatuses);
  router.post("/update", protect, updateCourseStatus);

  // ---------- USER ----------
router.get("/me", protect, getMyStatuses);
router.get("/admin/users", protect, getAdminUsers);
router.post("/admin/toggle", protect, toggleCourse);
  export default router;
