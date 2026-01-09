import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiAlertCircle, FiEye, FiEyeOff } from "react-icons/fi";
import SuccessPopup from "../components/SuccessPopup";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👁️
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        "https://apicourse.manovaidya.com/api/auth/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, phone, password }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Signup failed");
        setLoading(false);
        return;
      }

      setSuccess(true);

      setTimeout(() => {
        navigate("/auth"); // redirect to login
      }, 1500);
    } catch (err) {
      setError("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <>
      {success && <SuccessPopup message="Account created successfully!" />}

      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-xl">
          <h2 className="text-2xl font-bold mb-4">Create Account</h2>

          {error && (
            <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg flex gap-2">
              <FiAlertCircle className="mt-0.5" />
              {error}
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-4">
            {/* Name */}
            <div>
              <label className="text-sm font-medium">Full Name</label>
              <input
                className="w-full px-3 py-2 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                className="w-full px-3 py-2 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label className="text-sm font-medium">Phone Number</label>
              <input
                className="w-full px-3 py-2 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="text"
                required
              />
            </div>

            {/* Password with Eye Icon */}
            <div>
              <label className="text-sm font-medium">Password</label>

              <div className="relative mt-1">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full px-3 py-2 border rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <button
              className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          <p className="text-center mt-4 text-sm">
            Already have an account?
            <Link className="text-indigo-600 ml-1" to="/auth">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
