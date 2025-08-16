"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { loginUser } from "@/lib/api/UserData/authLogin";

type LoginData = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read the redirect URL from the query params, default to /dashboard
  const redirect = searchParams.get("redirect") || "/dashboard";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: LoginData) => {
    setLoading(true);
    toast.loading("Logging in...", { id: "login" });

    try {
      // Perform login
      await loginUser(data);

      toast.success("Login successful!", { id: "login" });

      // Ensure redirect happens after successful login
      router.push(redirect);
    } catch (error: any) {
      toast.error(error.message || "Login failed", { id: "login" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="space-y-5 max-w-md mx-auto mt-15"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Email */}
      <div className="relative">
        <FaUser className="absolute top-3.5 left-3 text-white" />
        <input
          type="email"
          {...register("email", { required: "Email is required" })}
          placeholder="Email"
          className="pl-10 py-2 w-full text-white bg-transparent border border-yellow-400 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        {errors.email && (
          <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div className="relative">
        <FaLock className="absolute top-3.5 left-3 text-white" />
        <input
          type={showPassword ? "text" : "password"}
          {...register("password", { required: "Password is required" })}
          placeholder="Password"
          className="pl-10 pr-10 py-2 w-full text-white bg-transparent border border-yellow-400 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
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

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full ${
          loading
            ? "bg-yellow-300 cursor-not-allowed"
            : "bg-yellow-500 hover:bg-yellow-600"
        } text-white py-3 rounded-md font-semibold transition duration-300 cursor-pointer`}
      >
        {loading ? "Logging in..." : "Login Now 🔒"}
      </button>
    </form>
  );
};

export default LoginForm;
