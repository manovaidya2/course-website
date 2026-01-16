import express from "express";
import {
  createCourse,
  getCourses,
  getCourseById,
  deleteCourse,
  getCoursesByDiseaseId,
  getCoursesForUser ,
    updateCourse,
} from "../controllers/courseController.js";

import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

/* CREATE COURSE */
router.post(
  "/",
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "lessonThumbnails", maxCount: 100 },
  ]),
  createCourse
);

/* CATEGORY WISE (KEEP FIRST) */
router.get("/category-id/:diseaseId", getCoursesByDiseaseId);

/* GET ALL */
router.get("/", getCourses);

/* GET ONE */
router.get("/:id", getCourseById);

/* DELETE */
router.delete("/:id", deleteCourse);

router.get(
  "/category/:diseaseId/user",
  protect,
  getCoursesForUser
);
router.put(
  "/:id",
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "lessonThumbnails", maxCount: 100 },
  ]),
  updateCourse
);

export default router;
