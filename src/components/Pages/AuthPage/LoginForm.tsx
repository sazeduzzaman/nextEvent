import React from "react";
import Link from "next/link";
import { FaFacebookF, FaGoogle, FaUser, FaLock } from "react-icons/fa";

const LoginForm = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-2xl relative">
        {/* Logo icon or circle */}
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 p-4 rounded-full shadow-md">
          <FaUser className="text-white text-3xl" />
        </div>

        <h2 className="text-center text-2xl font-bold mb-6 mt-6">
          Login to Your Account
        </h2>

        <form className="space-y-5">
          {/* Username */}
          <div className="relative">
            <FaUser className="absolute top-3.5 left-3 text-gray-500" />
            <input
              type="text"
              id="username"
              placeholder="Username"
              className="pl-10 py-2 w-full bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FaLock className="absolute top-3.5 left-3 text-gray-500" />
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="pl-10 py-2 w-full bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          {/* Remember & Forgot */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="form-checkbox text-yellow-500"
              />
              <span>Remember me</span>
            </label>
            <Link href="/auth/forgot-password" className="hover:text-yellow-600">
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-md font-semibold transition duration-300"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center justify-center my-6">
          <hr className="w-1/3 border-gray-300" />
          <span className="mx-2 text-gray-500 text-sm">OR</span>
          <hr className="w-1/3 border-gray-300" />
        </div>

        {/* Social Logins */}
        <div className="flex justify-center gap-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full">
            <FaFacebookF />
          </button>
          <button className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full">
            <FaGoogle />
          </button>
        </div>

        {/* Register Link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link
            href="/auth/register"
            className="text-yellow-600 hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
