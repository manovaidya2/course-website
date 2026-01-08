import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

const CoursesByCategory = () => {
  const { disease } = useParams();
  const navigate = useNavigate();

  // 🔐 decode URL (Autism%20%26%20ADHD → Autism & ADHD)
  const decodedDisease = decodeURIComponent(disease);

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    axiosInstance
      .get(`/courses/category/${decodedDisease}`)
      .then((res) => {
        setCourses(res.data);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
      })
      .finally(() => setLoading(false));
  }, [decodedDisease]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        {decodedDisease} Courses
      </h1>

      {loading && (
        <p className="text-center text-gray-600">Loading courses...</p>
      )}

      {!loading && courses.length === 0 && (
        <p className="text-center text-gray-500">
          No courses available for this category.
        </p>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course._id}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition cursor-pointer"
            onClick={() => navigate(`/courses/${course._id}`)}
          >
            {course.thumbnail && (
              <img
                src={`https://apicourse.manovaidya.com/uploads/${course.thumbnail}`}
                alt={course.courseTitle}
                className="h-40 w-full object-cover rounded-lg mb-4"
              />
            )}

            <h2 className="font-semibold text-xl mb-2">
              {course.courseTitle}
            </h2>

            <p className="text-gray-600 text-sm line-clamp-3">
              {course.courseDescription}
            </p>

            <div className="mt-4 flex justify-between text-sm">
              <span className="text-purple-600 font-medium">
                {course.type}
              </span>

              <span
                className={`px-3 py-1 rounded-full text-xs ${
                  course.access === "Paid"
                    ? "bg-red-100 text-red-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {course.access}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesByCategory;
