"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type LoginData = {
  username: string;
  password: string;
};

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginData>();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: LoginData) => {
    console.log("Form Data:", data);
    toast.loading("Logging in...", { id: "login" });

    try {
      const response = await fetch("https://weeklyinqilab.com/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.message || "Login failed");

      toast.success("Login successful!", { id: "login" });
      reset(); // resets the form
    } catch (error: any) {
      toast.error(error.message || "Something went wrong", { id: "login" });
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      {/* Username */}
      <div className="relative">
        <FaUser className="absolute top-3.5 left-3 text-gray-500" />
        <input
          type="text"
          {...register("username", { required: "Username is required" })}
          placeholder="Username"
          className="pl-10 py-2 w-full text-black bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        {errors.username && (
          <p className="text-sm text-red-500 mt-1">{errors.username.message}</p>
        )}
      </div>

      {/* Password */}
      <div className="relative">
        <FaLock className="absolute top-3.5 left-3 text-gray-500" />
        <input
          type={showPassword ? "text" : "password"}
          {...register("password", { required: "Password is required" })}
          placeholder="Password"
          className="pl-10 pr-10 py-2 w-full text-black bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        <span
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute top-3.5 right-3 text-gray-500 cursor-pointer"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
        {errors.password && (
          <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
        )}
      </div>

      {/* Remember & Forgot */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <label className="flex items-center space-x-2">
          <input type="checkbox" className="form-checkbox text-yellow-500" />
          <span>Remember me</span>
        </label>
        <Link href="/auth/forgot-password" className="hover:text-yellow-600">
          Forgot password?
        </Link>
      </div>

      {/* Submit Button */}
      {/* <button
        type="submit"
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-md font-semibold transition duration-300"
      >
        Login
      </button> */}
      <Link href="/user">
        <button
          // type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-md font-semibold transition duration-300"
        >
          Login
        </button>
      </Link>
    </form>
  );
};

export default LoginForm;
