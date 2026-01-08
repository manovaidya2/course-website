// src/pages/PrivacyPolicy.jsx
import React from "react";

const PrivacyPolicy = () => {
  const sections = [
    {
      title: "Introduction",
      content:
        "At Manovaidya Parent Academy, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information when you use our courses and services. By using our platform, you consent to the practices described here.",
    },
    {
      title: "Information We Collect",
      content:
        "We may collect information that you provide directly, such as your name, email address, phone number, and payment details when enrolling in courses. " +
        "We may also collect information automatically through your use of our platform, such as device information, IP address, and browsing behavior, to improve your experience.",
    },
    {
      title: "How We Use Your Information",
      content:
        "Your information is used to provide and enhance our services, process course enrollments and payments, communicate important updates, and offer personalized recommendations. " +
        "We use data responsibly to ensure a safe, seamless, and tailored learning experience for every parent and student.",
    },
    {
      title: "Sharing of Information",
      content:
        "We do not sell or rent your personal information to third parties. Your data may be shared with trusted service providers for payment processing, analytics, or legal compliance. " +
        "We ensure that all third parties follow strict confidentiality and security standards.",
    },
    {
      title: "Cookies and Tracking",
      content:
        "Our platform may use cookies, analytics tools, and similar technologies to understand how users interact with our courses, improve functionality, and provide a better user experience. " +
        "You can manage your cookie preferences through your browser settings.",
    },
    {
      title: "Data Security",
      content:
        "We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. " +
        "While we strive to safeguard your data, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.",
    },
    {
      title: "Your Rights",
      content:
        "You have the right to access, update, or delete your personal information at any time. You may also request a copy of the data we hold about you by contacting us. " +
        "We will respond to such requests promptly and in accordance with applicable laws.",
    },
    {
      title: "Children's Privacy",
      content:
        "Our platform is designed for parents and guardians. We do not knowingly collect personal information from children under 13. " +
        "If you believe your child has provided us with personal data, please contact us immediately to have it removed.",
    },
    {
      title: "Changes to This Privacy Policy",
      content:
        "We may update this Privacy Policy periodically to reflect changes in our practices, services, or legal obligations. " +
        "Significant changes will be highlighted, and your continued use of our platform constitutes acceptance of the updated policy.",
    },
    {
      title: "Contact Us",
      content:
        "If you have any questions, concerns, or requests regarding this Privacy Policy, please <a href='/contact-us' class='text-indigo-600 underline'>contact us</a>. " +
        "We are committed to addressing your privacy concerns promptly and transparently.",
    },
  ];

  return (
    <div className="min-h-screen bg-indigo-50 py-24 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-indigo-700 mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-700 text-lg md:text-xl">
            At <span className="font-semibold text-indigo-600">Manovaidya Parent Academy</span>, your privacy and trust are our top priorities. 
            This page explains how we handle your personal information while providing our courses and services.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((section, idx) => (
            <div
              key={idx}
              className="relative bg-white rounded-2xl p-8 shadow-md border border-indigo-200 hover:shadow-lg transition duration-300 group"
            >
              <span className="absolute -top-3 -left-3 bg-indigo-500 text-white font-bold w-10 h-10 flex items-center justify-center rounded-full text-lg shadow-md">
                {idx + 1}
              </span>
              <h2 className="text-2xl font-semibold text-indigo-600 mb-3 group-hover:text-indigo-700 transition">
                {section.title}
              </h2>
              <p
                className="text-gray-700 text-base"
                dangerouslySetInnerHTML={{ __html: section.content }}
              ></p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <p className="text-gray-500 mt-16 text-sm text-center">
          &copy; {new Date().getFullYear()}{" "}
          <span className="font-semibold text-indigo-600">
            Manovaidya Parent Academy
          </span>
          . All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
