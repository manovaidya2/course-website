import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    title: "Autism & ADHD",
    value: "autism-adhd",
    description: "Structured programs for Autism & ADHD support",
    price: 99,
    comingSoon: false,
    gradient: "from-indigo-500 to-purple-600",
  },
  {
    title: "Teenage",
    value: "teenage",
    description: "Mental health & emotional guidance for teenagers",
    price: 199,
    comingSoon: true,
    gradient: "from-amber-400 to-orange-500",
  },
  {
    title: "Adults",
    value: "adults",
    description: "Stress, anxiety & emotional wellbeing for adults",
    price: 299,
    comingSoon: true,
    gradient: "from-emerald-400 to-teal-600",
  },
];

const Categories = () => {
  const navigate = useNavigate();
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [userCourses, setUserCourses] = useState([]);
  const token = localStorage.getItem("token");

  // Load Razorpay
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => setRazorpayLoaded(true);
    document.body.appendChild(script);
  }, []);

  // Fetch user courses
  useEffect(() => {
    const fetchUserCourses = async () => {
      if (!token) return;
      const res = await fetch(
        "https://apicourse.manovaidya.com/api/admin/course-status/me",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();
      setUserCourses(data);
    };
    fetchUserCourses();
  }, [token]);

  const isCourseUnlocked = (categoryValue) =>
    userCourses.some(
      (c) => c.categoryValue === categoryValue && c.status === "Active"
    );

  // Payment
const handlePayment = async (category) => {
  if (!token) {
    alert("Please login to continue");
    navigate("/login", {
      state: { redirectTo: "/courses" },
    });
    return;
  }

  if (!razorpayLoaded) {
    alert("Payment system loading, please wait...");
    return;
  }

  const res = await fetch(
    "https://apicourse.manovaidya.com/api/payment/create-order",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ categoryValue: category.value }),
    }
  );

  const order = await res.json();

  new window.Razorpay({
    key: "rzp_test_RQ69noRiymN9fD",
    amount: order.amount,
    currency: order.currency,
    name: "Manovaidya",
    description: `Payment for ${category.title}`,
    order_id: order.id,
    handler: async (response) => {
      const verify = await fetch(
        "https://apicourse.manovaidya.com/api/payment/verify-payment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            categoryValue: category.value,
          }),
        }
      );

      if (verify.ok) {
        navigate(`/courses/category/${category.value}`);
      } else {
        alert("Payment failed");
      }
    },
    theme: { color: "#4f46e5" },
  }).open();
};


  return (
    <div className="bg-gradient-to-b from-gray-50 to-white py-10">
      <h1 className="text-4xl font-bold text-center mb-12">
        Choose Your Program
      </h1>

      <div className="grid md:grid-cols-3 gap-10 w-[90%] mx-auto">
        {categories.map((cat) => {
          const unlocked = isCourseUnlocked(cat.value);

          return (
            <div
              key={cat.value}
             onClick={() => {
  if (cat.comingSoon) return;

  if (!token && !unlocked) {
    alert("Please login to access courses");
    navigate("/Auth", {
      state: { redirectTo: "/courses" },
    });
    return;
  }

  unlocked
    ? navigate(`/courses/category/${cat.value}`)
    : handlePayment(cat);
}}

              className={`relative overflow-hidden rounded-2xl border transition-all
                ${
                  cat.comingSoon
                    ? "opacity-70 cursor-not-allowed"
                    : "cursor-pointer hover:-translate-y-2 hover:shadow-2xl"
                }`}
            >
              {/* Gradient Header */}
              <div
                className={`h-32 bg-gradient-to-r ${cat.gradient} flex items-center justify-center`}
              >
                <h2 className="text-2xl font-bold text-white">
                  {cat.title}
                </h2>
              </div>

              {/* Coming Soon Badge */}
              {cat.comingSoon && (
                <span className="absolute top-4 right-4 bg-yellow-400 text-black text-xs font-semibold px-3 py-1 rounded-full">
                  Coming Soon
                </span>
              )}

              {/* Content */}
              <div className="p-6 text-center">
                <p className="text-gray-600 min-h-[48px]">
                  {cat.description}
                </p>

                <div className="mt-6">
                  {cat.comingSoon ? (
                    <span className="inline-block bg-gray-200 text-gray-600 px-6 py-2 rounded-full font-semibold">
                      Launching Soon 🚀
                    </span>
                  ) : unlocked ? (
                    <span className="inline-block bg-green-100 text-green-700 px-6 py-2 rounded-full font-semibold">
                      Unlocked ✅
                    </span>
                  ) : (
                   <button className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition">
  Pay ₹{cat.price}
</button>

                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;
