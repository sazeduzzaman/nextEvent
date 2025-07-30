"use client"
import React, { useState } from "react";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <form className="space-y-5">
      {/* Full Name */}
      <div className="relative">
        <FaUser className="absolute top-3.5 left-3 text-gray-500" />
        <input
          type="text"
          placeholder="Full Name"
          className="pl-10 py-2 w-full text-black bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>

      {/* Username */}
      <div className="relative">
        <FaUser className="absolute top-3.5 left-3 text-gray-500" />
        <input
          type="text"
          placeholder="Username"
          className="pl-10 py-2 w-full text-black bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>

      {/* Email */}
      <div className="relative">
        <FaEnvelope className="absolute top-3.5 left-3 text-gray-500" />
        <input
          type="email"
          placeholder="Email Address"
          className="pl-10 py-2 w-full text-black bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>

      {/* Password */}
      <div className="relative">
        <FaLock className="absolute top-3.5 left-3 text-gray-500" />
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          className="pl-10 pr-10 py-2 w-full text-black bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        <span
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute top-3.5 right-3 text-gray-500 cursor-pointer"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>

      {/* Confirm Password */}
      <div className="relative">
        <FaLock className="absolute top-3.5 left-3 text-gray-500" />
        <input
          type={showConfirm ? "text" : "password"}
          placeholder="Confirm Password"
          className="pl-10 pr-10 py-2 w-full text-black bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        <span
          onClick={() => setShowConfirm((prev) => !prev)}
          className="absolute top-3.5 right-3 text-gray-500 cursor-pointer"
        >
          {showConfirm ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>

      {/* Register Button */}
      <button
        type="submit"
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-md font-semibold transition duration-300"
      >
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
