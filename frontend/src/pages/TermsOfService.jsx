// src/pages/TermsOfService.jsx
import React from "react";

const TermsOfService = () => {
  const sections = [
    {
      title: "Acceptance of Terms",
      content:
        "By accessing or using Manovaidya Parent Academy’s platform, courses, and related services, you agree to be bound by these Terms of Service. " +
        "These terms constitute a legally binding agreement between you (the user) and Manovaidya Parent Academy. " +
        "If you do not agree with any part of these terms, we kindly ask that you do not use our platform. " +
        "Your continued use of our services indicates your acceptance of these Terms in full.",
    },
    {
      title: "Use of Services",
      content:
        "Our platform and courses are designed for educational purposes, specifically to support parents in understanding and guiding their children effectively. " +
        "Users agree to use the services responsibly, respectfully, and lawfully. " +
        "Any form of misuse, unauthorized distribution, hacking attempts, or inappropriate behavior is strictly prohibited. " +
        "We reserve the right to suspend or terminate accounts engaging in such activities.",
    },
    {
      title: "Account Registration",
      content:
        "Some features of our platform, including course access and progress tracking, require creating an account. " +
        "Users are responsible for maintaining the confidentiality of their login credentials. " +
        "You agree to provide accurate and up-to-date information when registering, and you are fully responsible for any activity occurring under your account. " +
        "If you suspect any unauthorized use of your account, please notify us immediately.",
    },
    {
      title: "Payments & Refunds",
      content:
        "Enrollment in our courses requires payment of the specified fees. " +
        "Payments must be completed using the provided secure payment methods. " +
        "All payments are considered final, except where our Refund Policy provides for exceptions. " +
        "We encourage users to review course details carefully before purchase to ensure the course meets their needs. " +
        "Any refund requests will be evaluated in accordance with our official Refund Policy to ensure fairness and transparency.",
    },
    {
      title: "Intellectual Property",
      content:
        "All content available on the platform, including courses, videos, learning materials, and documentation, is the intellectual property of Manovaidya Parent Academy. " +
        "You are granted a limited, non-exclusive, non-transferable license to access the materials for personal educational use. " +
        "Unauthorized copying, distribution, or reproduction of our content for commercial or public purposes is strictly prohibited and may result in legal action.",
    },
    {
      title: "Limitation of Liability",
      content:
        "While we strive to provide high-quality educational content, Manovaidya Parent Academy is not liable for any direct or indirect damages resulting from the use of our services. " +
        "This includes, but is not limited to, loss of data, personal injury, or any consequences of applying the knowledge gained from our courses. " +
        "All services are provided on an 'as-is' basis without warranties of any kind. Users are encouraged to seek professional advice for specific concerns about their children.",
    },
    {
      title: "Governing Law",
      content:
        "These Terms of Service are governed by and construed in accordance with the laws of India. " +
        "Any disputes arising in connection with these terms or our services will be subject to the exclusive jurisdiction of the courts in India. " +
        "By using our services, you agree to submit to the jurisdiction of these courts for resolution of disputes.",
    },
    {
      title: "Changes to Terms",
      content:
        "Manovaidya Parent Academy reserves the right to update or modify these Terms of Service at any time, reflecting changes in our services, legal requirements, or best practices. " +
        "Users are encouraged to review this page regularly to stay informed. " +
        "Continued use of our platform after any changes constitutes acceptance of the updated Terms. " +
        "We will make reasonable efforts to highlight significant changes, but the responsibility to review the Terms lies with the user.",
    },
  ];

  return (
    <div className="min-h-screen bg-indigo-50 py-24 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-indigo-700 mb-4">
            Terms of Service
          </h1>
          <p className="text-gray-700 text-lg md:text-xl">
            Welcome to{" "}
            <span className="font-semibold text-indigo-600">
              Manovaidya Parent Academy
            </span>
            . Our mission is to provide parents with high-quality guidance and resources for their children’s growth. By using our platform, you agree to follow these Terms of Service, which are designed to ensure a safe, transparent, and effective learning environment.
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
              <p className="text-gray-700 text-base">{section.content}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
       
      </div>
    </div>
  );
};

export default TermsOfService;
