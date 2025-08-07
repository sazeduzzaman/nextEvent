"use client";
import React, { useState } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import {
  FaEnvelope,
  FaLock,
  FaPhone,
  FaUser,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import { registerUser } from "@/lib/api/UserData/authRegister";

const RegisterForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.password_confirmation) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await registerUser(formData);
      toast.success("Registration successful");
      await router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      {/* Full Name */}
      <div className="relative">
        <FaUser className="absolute top-3.5 left-3 text-yellow-400" />
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          className="pl-10 py-2 w-full site-txt bg-transparent border border-yellow-400 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          required
        />
      </div>

      {/* Email */}
      <div className="relative">
        <FaEnvelope className="absolute top-3.5 left-3 text-yellow-400" />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email Address"
          className="pl-10 py-2 w-full site-txt bg-transparent border border-yellow-400 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          required
        />
      </div>

      {/* Phone */}
      <div className="relative">
        <FaPhone className="absolute top-3.5 left-3 text-yellow-400" />
        <input
          type="number"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="pl-10 py-2 w-full site-txt bg-transparent border border-yellow-400 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          required
        />
      </div>

      {/* Password */}
      <div className="relative">
        <FaLock className="absolute top-3.5 left-3 text-yellow-400" />
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="pl-10 pr-10 py-2 w-full site-txt bg-transparent border border-yellow-400 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          required
        />
        <span
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute top-3.5 right-3 text-yellow-400 cursor-pointer"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>

      {/* Confirm Password */}
      <div className="relative">
        <FaLock className="absolute top-3.5 left-3 text-yellow-400" />
        <input
          type={showConfirmPassword ? "text" : "password"}
          name="password_confirmation"
          value={formData.password_confirmation}
          onChange={handleChange}
          placeholder="Confirm Password"
          className="pl-10 pr-10 py-2 w-full site-txt bg-transparent border border-yellow-400 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          required
        />
        <span
          onClick={() => setShowConfirmPassword((prev) => !prev)}
          className="absolute top-3.5 right-3 text-yellow-400 cursor-pointer"
        >
          {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>

      {/* Register Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-md font-semibold transition duration-300"
      >
        {loading ? "Registering..." : "Register"}
      </button>
    </form>
  );
};

export default RegisterForm;
