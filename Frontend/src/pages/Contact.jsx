import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

export default function Contact() {
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message Sent Successfully!");
    setFormData({ name: "", email: "", message: "" });
  };

  const bgColor = isDarkMode ? "bg-green-950 text-white" : "bg-green-50 text-green-900";
  const inputClass = `w-full px-4 py-2 rounded-md border text-sm outline-none transition-all duration-200 ${
    isDarkMode
      ? "bg-green-900 text-white border-green-700 focus:ring-2 focus:ring-green-300"
      : "bg-white text-green-900 border-green-300 focus:ring-2 focus:ring-green-400"
  }`;

  return (
    <div
      className={`min-h-screen flex flex-col md:flex-row items-center justify-center gap-10 px-6 py-10 md:py-20 transition-all duration-300 ${bgColor}`}
    >
      {/* Left Side Illustration */}
      <div className="md:w-1/2 w-full flex justify-center">
        <div className="bg-green-50 rounded-xl p-6 shadow-lg">
          <img
            src="https://illustrations.popsy.co/gray/web-design.svg"
            alt="Contact Illustration"
            className="w-full max-w-sm md:max-w-md lg:max-w-lg object-contain"
          />
        </div>
      </div>

      {/* Right Side Form */}
      <div className="md:w-1/2 w-full max-w-xl">
        <h1 className="text-4xl font-bold mb-6 border-b-4 border-green-400 inline-block pb-2">
          Contact Us
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label className="block mb-2 font-medium text-sm tracking-wide">Your Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
              className={inputClass}
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block mb-2 font-medium text-sm tracking-wide">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              className={inputClass}
            />
          </div>

          {/* Message Field */}
          <div>
            <label className="block mb-2 font-medium text-sm tracking-wide">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              placeholder="Write your message here..."
              className={`${inputClass} resize-none`}
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-md transition duration-200"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
