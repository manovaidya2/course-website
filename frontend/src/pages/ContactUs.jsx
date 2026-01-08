import { useState } from "react";
import { FiMail, FiUser, FiMessageSquare, FiPhone, FiMapPin } from "react-icons/fi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Form submitted:", formData);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 flex items-center justify-center py-20 px-4">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8">
        
        {/* Left Side - Contact Form */}
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-extrabold mb-4 text-indigo-700">
            Get in Touch
          </h1>
          <p className="text-gray-700 mb-8">
            We'd love to hear from you! Send us a message or contact us directly.
          </p>

          {submitted ? (
            <div className="text-center text-green-600 font-semibold text-xl animate-pulse">
              🎉 Thank you! We'll get back to you soon.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div className="relative">
                <FiUser className="absolute top-3 left-3 text-indigo-500" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="w-full border border-indigo-300 px-12 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                />
              </div>

              {/* Email */}
              <div className="relative">
                <FiMail className="absolute top-3 left-3 text-indigo-500" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                  className="w-full border border-indigo-300 px-12 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                />
              </div>

              {/* Message */}
              <div className="relative">
                <FiMessageSquare className="absolute top-3 left-3 text-indigo-500" />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  required
                  rows={5}
                  className="w-full border border-indigo-300 px-12 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition resize-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center items-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-3 rounded-xl hover:from-purple-600 hover:to-indigo-500 transition-all shadow-lg ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {loading && <AiOutlineLoading3Quarters className="animate-spin mr-2" />}
                {loading ? "Sending..." : "Submit"}
              </button>
            </form>
          )}
        </div>

        {/* Right Side - Contact Details */}
        <div className="flex flex-col justify-center space-y-6 text-gray-700">
          <h2 className="text-3xl font-bold text-indigo-700 mb-4">Contact Details</h2>
          <div className="flex items-center gap-3">
            <FiPhone className="text-indigo-500 text-xl" />
            <span>+91 98765 43210</span>
          </div>
          <div className="flex items-center gap-3">
            <FiMail className="text-indigo-500 text-xl" />
            <span>contact@company.com</span>
          </div>
          <div className="flex items-center gap-3">
            <FiMapPin className="text-indigo-500 text-xl" />
            <span>New Delhi, India</span>
          </div>

          <div className="flex items-center gap-6 mt-4 text-indigo-500 text-2xl">
            <a href="#" className="hover:text-purple-600 transition">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-purple-600 transition">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-purple-600 transition">
              <FaLinkedin />
            </a>
          </div>

          <div className="mt-6 rounded-xl overflow-hidden shadow-lg">
            <iframe
              title="office-map"
              className="w-full h-48 sm:h-64"
              src="https://maps.google.com/maps?q=New%20Delhi,%20India&t=&z=13&ie=UTF8&iwloc=&output=embed"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
