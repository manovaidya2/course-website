
// import { useEffect, useState } from "react";
// import CourseCard from "../components/course/CourseCard";
// import axiosInstance from "../utils/axiosInstance";

// const Courses = () => {
//     const [courses, setCourses] = useState([]);
//     const [loading, setLoading] = useState(true);

//     // Filters
//     const [categoryFilter, setCategoryFilter] = useState("All");
//     const [typeFilter, setTypeFilter] = useState("All");
//     const [levelFilter, setLevelFilter] = useState("All");

//     // STATIC filter options except Category
//     const types = ["All", "Free", "Paid", "Locked" ];
//     const levels = ["All", "Intro", "Deep-dive", "Protocols"];

//     useEffect(() => {
//         const fetchCourses = async () => {
//             try {
//                 const res = await axiosInstance.get("/courses");
//                 setCourses(res.data);
//             } catch (err) {
//                 console.error("COURSE FETCH ERROR", err);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchCourses();
//     }, []);

//     // 🔥 Dynamic Category Filter from DB
//     const categories = ["All", ...new Set(courses.map(c => c.disease))];

//     // Apply Filters
//     const filteredCourses = courses.filter((course) => {
//         const matchesCategory =
//             categoryFilter === "All" || course.disease === categoryFilter;

//         const matchesType =
//             typeFilter === "All" || course.access === typeFilter;

//         const matchesLevel =
//             levelFilter === "All" || course.type === levelFilter;

//         return matchesCategory && matchesType && matchesLevel;
//     });

//     const clearFilters = () => {
//         setCategoryFilter("All");
//         setTypeFilter("All");
//         setLevelFilter("All");
//     };

//     if (loading) return <p className="p-10 text-center">Loading courses...</p>;

//     return (
//         <div className="min-h-screen flex flex-col">
//             <main className="flex-1">

//                 {/* 🔵 Hero Section */}
//                 <section className="bg-gray-100 py-5">
//                    <div className="container mx-auto px-4 text-center max-w-3xl">
//   <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
//     Courses for Parents
//   </h1>
//   <p className="text-base sm:text-lg md:text-xl text-gray-600">
//     Learn at your own pace with structured guidance
//   </p>
// </div>

//                 </section>

//                 {/* 🔵 Filters Section */}
//                 <section className="py-8 border-b sticky top-11 bg-white z-40">
//                     <div className="w-[90%] mx-auto px-4 flex flex-col md:flex-row gap-4 items-center justify-between">

//                       <div className="flex flex-row gap-3 w-full overflow-x-auto">


//                             {/* Category Filter (Dynamic) */}
//                             <select
//                                 value={categoryFilter}
//                                 onChange={(e) => setCategoryFilter(e.target.value)}
//                                 className="border rounded-lg px-4 py-2 w-full sm:w-[200px]"
//                             >
//                                 {categories.map((c) => (
//                                     <option key={c} value={c}>{c}</option>
//                                 ))}
//                             </select>

//                             {/* Type Filter */}
//                             <select
//                                 value={typeFilter}
//                                 onChange={(e) => setTypeFilter(e.target.value)}
//                                 className="border rounded-lg px-4 py-2 w-full sm:w-[150px]"
//                             >
//                                 {types.map((t) => (
//                                     <option key={t} value={t}>{t}</option>
//                                 ))}
//                             </select>

//                             {/* Level Filter */}
//                             <select
//                                 value={levelFilter}
//                                 onChange={(e) => setLevelFilter(e.target.value)}
//                                 className="border rounded-lg px-4 py-2 w-full sm:w-[150px]"
//                             >
//                                 {levels.map((l) => (
//                                     <option key={l} value={l}>{l}</option>
//                                 ))}
//                             </select>

//                         </div>

//                         {/* Clear Filters Button */}
//                         {(categoryFilter !== "All" ||
//                           typeFilter !== "All" ||
//                           levelFilter !== "All") && (
//                             <button
//                                 onClick={clearFilters}
//                                 className="text-gray-600 underline"
//                             >
//                                 Clear Filters
//                             </button>
//                         )}
//                     </div>
//                 </section>

//                 {/* 🔵 Course Grid */}
//                 <section className="py-12">
//                     <div className="w-[90%] mx-auto px-4">

//                         {filteredCourses.length > 0 ? (
//                             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//                                 {filteredCourses.map((course, index) => (
//                                     <div key={course._id}>
//                                         <CourseCard
//                                             slug={course._id}
//                                             title={course.courseTitle}
//                                             shortDescription={course.courseDescription}
//                                             category={course.disease}
//                                             level={course.type}
//                                             isFree={course.access === "Free"}
//                                             duration={course.totalTime}
//                                             moduleCount={course.totalModules}
//                                             thumbnail={course.thumbnail}
//                                         />
//                                     </div>
//                                 ))}
//                             </div>
//                         ) : (
//                             <div className="text-center py-20">
//                                 <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-6 flex items-center justify-center">
//                                     <span className="text-4xl">📚</span>
//                                 </div>
//                                 <h3 className="text-2xl font-semibold mb-2">No courses found</h3>
//                                 <p className="text-gray-500 mb-6">
//                                     Try adjusting your filters to see more courses
//                                 </p>
//                                 <button
//                                     onClick={clearFilters}
//                                     className="px-6 py-3 border rounded-lg hover:bg-gray-100"
//                                 >
//                                     Clear Filters
//                                 </button>
//                             </div>
//                         )}

//                     </div>
//                 </section>
//             </main>
//         </div>
//     );
// };

// export default Courses;











import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import CourseCard from "../components/course/CourseCard";

const Courses = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [courses, setCourses] = useState([]);
  const [userCourses, setUserCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [typeFilter, setTypeFilter] = useState("All");
  const [levelFilter, setLevelFilter] = useState("All");

  const types = ["All", "Free", "Paid", "Locked"];
  const levels = ["All", "Intro", "Deep-dive", "Protocols"];

  // ---------------- USER COURSE STATUS ----------------
  useEffect(() => {
    const fetchUserCourses = async () => {
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await fetch(
          "https://apicourse.manovaidya.com/api/admin/course-status/me",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = await res.json();
        setUserCourses(data);
      } catch (err) {
        console.error("User course status error:", err);
      }
    };

    fetchUserCourses();
  }, [token, navigate]);

  // ---------------- CHECK ACCESS ----------------
  const isUnlocked = userCourses.some(
    (c) => c.categoryValue === category && c.status === "Active"
  );

  useEffect(() => {
    if (category && userCourses.length > 0 && !isUnlocked) {
      navigate("/courses"); // redirect to category list / payment page
    }
  }, [category, userCourses, isUnlocked, navigate]);

  // ---------------- FETCH COURSES ----------------
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);

        const url = category
          ? `/courses/category-id/${category}`
          : `/courses`;

        const res = await axiosInstance.get(url, {
          headers: { "Cache-Control": "no-cache" },
        });

        setCourses(res.data);
      } catch (err) {
        console.error("Fetch courses error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (isUnlocked || !category) {
      fetchCourses();
    }
  }, [category, isUnlocked]);

  // ---------------- FILTER ----------------
  const filteredCourses = courses.filter((course) => {
    const matchType =
      typeFilter === "All" || course.access === typeFilter;
    const matchLevel =
      levelFilter === "All" || course.type === levelFilter;
    return matchType && matchLevel;
  });

  const headingMap = {
    "autism-adhd": "Autism & ADHD",
    teenage: "Teenage",
    adults: "Adults",
  };

  if (loading) return <p className="p-10 text-center">Loading...</p>;

  return (
    <div className="min-h-screen">
      {/* ---------------- HEADER ---------------- */}
      <section className="bg-gray-100 py-6 text-center">
        <h1 className="text-3xl font-bold">
          {headingMap[category] || "All Courses"}
        </h1>
      </section>

      {/* ---------------- FILTERS ---------------- */}
      <section className="py-5 bg-white border-b sticky top-10 z-40">
        <div className="w-[90%] mx-auto flex gap-4">
          <select
            className="border px-4 py-2 rounded"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            {types.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>

          <select
            className="border px-4 py-2 rounded"
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
          >
            {levels.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* ---------------- COURSES ---------------- */}
      <section className="py-12">
        <div className="w-[90%] mx-auto grid md:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course._id}
              slug={course._id}
              title={course.courseTitle}
              shortDescription={course.courseDescription}
              category={course.disease}
              level={course.type}
              isFree={course.access === "Free"}
              duration={course.totalTime}
              moduleCount={course.totalModules}
              thumbnail={course.thumbnail}
            />
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            No courses found
          </p>
        )}
      </section>
    </div>
  );
};

export default Courses;
