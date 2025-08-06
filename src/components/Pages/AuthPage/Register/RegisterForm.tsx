"use client";
import React, { useState } from "react";
import {
  FaEnvelope,
  FaLock,
  FaPhone,
  FaUser,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        "https://admin.eventstailor.com/api/v1/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        console.error("Registration failed:", data.message);
        alert(data.message || "Registration failed");
      } else {
        alert("Registration successful");
        setFormData({ name: "", email: "", phone: "", password: "" });
      }
    } catch (error: any) {
      console.error("Error:", error);
      alert("Something went wrong. Try again.");
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
