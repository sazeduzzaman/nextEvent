"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

type LoginData = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: LoginData) => {
    toast.loading("Logging in...", { id: "login" });

    try {
      const res = await fetch("https://admin.eventstailor.com/api/v1/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Login failed");
      }

      const result = await res.json();

      // Assuming API returns user data and maybe token
      // Save user info or token in cookie/localStorage
      // Example: saving token if available
      if (result.token) {
        Cookies.set("authToken", result.token, { expires: 1 }); // 1 day expiry
      }
      // Save user info if provided (adjust keys as per your API response)
      if (result.user) {
        Cookies.set("authUser", JSON.stringify(result.user), { expires: 1 });
      }

      toast.success("Login successful!", { id: "login" });
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.message || "Login failed", { id: "login" });
    }
  };

  return (
    <form
      className="space-y-5 max-w-md mx-auto mt-10 "
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Email */}
      <div className="relative">
        <FaUser className="absolute top-3.5 left-3 text-yellow-400" />
        <input
          type="email"
          {...register("email", { required: "Email is required" })}
          placeholder="Email"
          className="pl-10 py-2 w-full site-txt bg-transparent border border-yellow-400 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        {errors.email && (
          <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div className="relative">
        <FaLock className="absolute top-3.5 left-3 text-yellow-400" />
        <input
          type={showPassword ? "text" : "password"}
          {...register("password", { required: "Password is required" })}
          placeholder="Password"
          className="pl-10 pr-10 py-2 w-full site-txt bg-transparent border border-yellow-400 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
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

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-md font-semibold transition duration-300"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
