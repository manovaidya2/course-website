import Course from "../models/Course.js";
import CourseStatus from "../models/CourseStatusModel.js";
const diseaseIdMap = {
  "Autism & ADHD": "autism-adhd",
  "Teenage": "teenage",
  "Adults": "adults",
};
export const createCourse = async (req, res) => {
  try {
    let {
      moduleName,
      disease,
      diseaseId: finalDiseaseId,
      type,
      access,
      courseTitle,
      courseDescription,
      totalModules,
      totalTime,
      youWillLearn,
      bottomFieldText,
      modules,
    } = req.body;

    // SAFE PARSE
    if (typeof modules === "string") modules = JSON.parse(modules);
    if (typeof youWillLearn === "string")
      youWillLearn = JSON.parse(youWillLearn);

    // COURSE THUMBNAIL
    const thumbnail = req.files?.thumbnail?.[0]?.filename || "";

    // LESSON THUMBNAILS (IN ORDER)
    const lessonThumbnails = req.files?.lessonThumbnails || [];
    let idx = 0;

    const updatedModules = Array.isArray(modules)
      ? modules.map((mod) => ({
          ...mod,
          lessons: Array.isArray(mod.lessons)
            ? mod.lessons.map((lesson) => {
                const thumb = lessonThumbnails[idx]
                  ? lessonThumbnails[idx].filename
                  : null;
                idx++;
                return {
                  ...lesson,
                  thumbnail: thumb,
                };
              })
            : [],
        }))
      : [];

    const course = new Course({
      moduleName,
      disease,
      diseaseId: finalDiseaseId, // ✅ FIXED
      type,
      access,
      courseTitle,
      courseDescription,
      totalModules: Number(totalModules) || 0,
      totalTime,
      youWillLearn,
      bottomFieldText,
      thumbnail,
      modules: updatedModules,
    });

    await course.save();

    res.status(201).json(course);
  } catch (err) {
    console.error("❌ Create Course Error:", err);
    res.status(500).json({
      message: "Server Error",
      error: err.message,
    });
  }
};

/* ---------------- GET ALL ---------------- */
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().lean();
    res.json(courses);
  } catch {
    res.status(500).json({ message: "Server Error" });
  }
};

/* ---------------- GET ONE ---------------- */
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    res.json(course);
  } catch {
    res.status(500).json({ message: "Server Error" });
  }
};

/* ---------------- DELETE ---------------- */
export const deleteCourse = async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: "Course deleted" });
  } catch {
    res.status(500).json({ message: "Server Error" });
  }
};

/* ---------------- DISEASE ID WISE ---------------- */
export const getCoursesByDiseaseId = async (req, res) => {
  try {
    const { diseaseId } = req.params;
    const courses = await Course.find({ diseaseId }).lean();
    res.json(courses);
  } catch {
    res.status(500).json({ message: "Server Error" });
  }
};


// export const getCourseById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     // const { userId } = req.query; // frontend will send userId
//      const userId = "693970f820a140853f8af66f";
//     const course = await Course.findById(id).lean();
//     if (!course) return res.status(404).json({ message: "Course not found" });

//     // Check status of this course for this user
//     const status = await CourseStatus.findOne({ userId, id });

//     const isPurchased = status?.status === "Purchased";

//     // Modify modules based on purchase
//     const updatedModules = course.modules.map(mod => ({
//       ...mod,
//       isLocked: isPurchased ? false : mod.isLocked
//     }));

//     course.modules = updatedModules;

//     res.json({
//       success: true,
//       purchased: isPurchased,
//       course
//     });

//   } catch (err) {
//     res.status(500).json({ message: "Server Error", error: err.message });
//   }
// };


export const updateCourse = async (req, res) => {
  try {
    let {
      moduleName,
      disease,
      type,
      access,
      courseTitle,
      courseDescription,
      totalModules,
      totalTime,
      youWillLearn,
      bottomFieldText,
      modules,
    } = req.body;

    // -----------------------------
    // SAFE JSON PARSE
    // -----------------------------
    const safeParse = (value) => {
      try {
        return typeof value === "string" ? JSON.parse(value) : value;
      } catch {
        return value;
      }
    };

    modules = safeParse(modules);
    youWillLearn = safeParse(youWillLearn);

    totalModules = Number(totalModules) || 0;

    // -----------------------------
    // FILES
    // -----------------------------
    const newThumbnail = req.files?.thumbnail?.[0]?.filename || null;
    const lessonThumbnails = req.files?.lessonThumbnails || [];

    let idx = 0;

    // -----------------------------
    // UPDATE MODULES
    // -----------------------------
    const updatedModules = Array.isArray(modules)
      ? modules.map((mod) => ({
          ...mod,
       lessons: Array.isArray(mod.lessons)
  ? mod.lessons.map((lesson) => {
      const newThumb = lessonThumbnails[idx]
        ? lessonThumbnails[idx].filename
        : null;

      idx++;

      return {
        ...lesson,
        thumbnail: newThumb ? newThumb : lesson.thumbnail,
      };
    })
  : [],

        }))
      : [];

    // -----------------------------
    // BUILD UPDATE OBJECT
    // -----------------------------
    const updateData = {
      moduleName,
      disease,
      type,
      access,
      courseTitle,
      courseDescription,
      totalModules,
      totalTime,
      youWillLearn,
      bottomFieldText,
      modules: updatedModules,
    };

    if (newThumbnail) updateData.thumbnail = newThumbnail;

    // -----------------------------
    // UPDATE IN DB
    // -----------------------------
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedCourse)
      return res.status(404).json({ message: "Course not found" });

    return res.json(updatedCourse);
  } catch (err) {
    console.error("Update Course Error:", err);
    return res.status(500).json({
      message: "Server Error",
      error: err.message,
    });
  }
};

// controllers/courseController.js

export const getCoursesByDisease = async (req, res) => {
  try {
    const { disease } = req.params;

    const courses = await Course.find({ disease }).lean();

    res.json(courses);
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
      error: err.message,
    });
  }
};




export const getCoursesForUser = async (req, res) => {
  try {
    const { diseaseId } = req.params;
    const userId = req.user.id;

    const courses = await Course.find({ diseaseId }).lean();

    const status = await CourseStatus.findOne({
      userId,
      categoryValue: diseaseId,
      status: "Active",
    });

    const unlocked = Boolean(status);

    const finalCourses = courses.map(course => ({
      ...course,
      modules: course.modules.map(mod => ({
        ...mod,
        isLocked: !unlocked, // 🔥 USER-WISE LOCK
      })),
    }));

    res.json({
      unlocked,
      courses: finalCourses,
    });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};