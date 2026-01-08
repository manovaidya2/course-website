// src/pages/RefundPolicy.jsx
import React from "react";

const RefundPolicy = () => {
  const sections = [
    {
      title: "Introduction",
      content:
        "At Manovaidya Parent Academy, we are committed to providing high-quality courses and learning experiences. " +
        "This Refund Policy outlines the conditions under which refunds may be requested and processed, ensuring transparency and fairness for all our users.",
    },
    {
      title: "Refund Eligibility",
      content:
        "Refunds are applicable only for courses purchased directly through our platform. " +
        "To qualify, the refund request must be made within 7 days of purchase, and the course content must not have been accessed or downloaded. " +
        "Courses accessed partially or fully beyond this period are not eligible for a refund. " +
        "This policy ensures that users can try our courses risk-free while maintaining platform sustainability.",
    },
    {
      title: "How to Request a Refund",
      content:
        "To initiate a refund, please contact our support team by visiting our <a href='/contact-us' class='text-indigo-600 underline'>Contact Us</a> page. " +
        "Include your order details, such as your name, email, and purchase information, so we can process your request efficiently. " +
        "Our team will review your request and notify you about the next steps.",
    },
    {
      title: "Processing Refunds",
      content:
        "Once a refund request is approved, the refund will be processed within 7-10 business days. " +
        "The amount will be returned using the same payment method you used during the purchase. " +
        "Please note that depending on your bank or payment provider, it may take additional time for the refunded amount to reflect in your account.",
    },
    {
      title: "Exceptions",
      content:
        "Refunds are not available for courses accessed beyond the refund eligibility period or for free courses. " +
        "Additionally, any courses purchased through third-party platforms (e.g., marketplaces) must follow the refund policies of those platforms. " +
        "We encourage users to review course details carefully before enrolling.",
    },
    {
      title: "Contact Information",
      content:
        "If you have any questions or concerns regarding this Refund Policy, please do not hesitate to <a href='/contact-us' class='text-indigo-600 underline'>contact us</a>. " +
        "Our support team is dedicated to addressing your concerns promptly and professionally.",
    },
  ];

  return (
    <div className="min-h-screen bg-indigo-50 py-24 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-indigo-700 mb-4">
            Refund Policy
          </h1>
          <p className="text-gray-700 text-lg md:text-xl">
            At <span className="font-semibold text-indigo-600">Manovaidya Parent Academy</span>, we aim to provide a fair and transparent refund process. 
            Please read this policy carefully to understand your rights and eligibility for refunds.
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

export default RefundPolicy;
