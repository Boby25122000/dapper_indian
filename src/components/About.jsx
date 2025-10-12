import React from "react";

export default function About() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-[80vh] bg-gray-100 px-6 py-12">
      {/* Left Side - Text */}
      <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
        <h2 className="text-3xl md:text-5xl font-bold text-[#0A1540] mb-4">
          About Us
        </h2>
        <p className="text-gray-700 leading-relaxed max-w-lg mx-auto md:mx-0">
          Welcome to our platform! 🚀 We are dedicated to providing the best
          products and services with a focus on quality, trust, and innovation.
          Our mission is to simplify your life by bringing everything you need
          to your fingertips.
        </p>
      </div>

      {/* Right Side - Image */}
      <div className="md:w-1/2 flex justify-center">
        <img
          src="/src/assets/about.png"
          alt="About Illustration"
          className="w-10/12 max-w-md rounded-xl shadow-lg"
        />
      </div>
    </div>
  );
}
