// controllers/courseStatusController.js
import CourseStatus from "../models/CourseStatusModel.js";
import Course from "../models/Course.js";
import User from "../models/UserModel.js";

// Get all statuses
export const getCourseStatuses = async (req, res) => {
  try {
    const statuses = await CourseStatus.find().populate(
      "userId",
      "name email phone createdAt"
    );
    res.json(statuses);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ADMIN – Update status (Approve Manual Payment)
export const updateCourseStatus = async (req, res) => {
  try {
    const { userId, categoryValue, status } = req.body;

    const updated = await CourseStatus.findOneAndUpdate(
      { userId, categoryValue },
      { status },
      { new: true }
    );

    res.json({
      message: "Status updated successfully",
      updated,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};









export const getAdminUsers = async (req, res) => {
  try {
    const users = await User.find().lean();
    const statuses = await CourseStatus.find().lean();

    const data = users.map((u) => {
      const userStatus = statuses.filter(
        (s) => String(s.userId) === String(u._id)
      );

      return {
        _id: u._id,
        name: u.name,
        email: u.email,
        phone: u.phone,
        courses: {
          "autism-adhd":
            userStatus.find((s) => s.categoryValue === "autism-adhd")
              ?.status === "Active",
          teenage:
            userStatus.find((s) => s.categoryValue === "teenage")?.status ===
            "Active",
          adults:
            userStatus.find((s) => s.categoryValue === "adults")?.status ===
            "Active",
        },
      };
    });

    res.json(data);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

// TOGGLE COURSE
export const toggleCourse = async (req, res) => {
  try {
    const { userId, categoryValue, active } = req.body;

    const status = await CourseStatus.findOneAndUpdate(
      { userId, categoryValue },
      {
        status: active ? "Active" : "Pending",
        paymentMethod: "Manual",
      },
      { new: true, upsert: true }
    );

    res.json({ success: true, status });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= USER ================= */

export const getMyStatuses = async (req, res) => {
  const data = await CourseStatus.find({ userId: req.user.id });
  res.json(data);
};