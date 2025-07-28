import React from "react";
import Link from "next/link";
import { FaEnvelope } from "react-icons/fa";
import CommonBanner from "../CommonBanner/CommonBanner";

const ForgotPassword = () => {
  return (
    <>
      <CommonBanner
        title="Forgot Password"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Forgot Password", href: "/auth/forgot-password" },
          // { label: "Details" },
        ]}
      />

      <div className="min-h-screen bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-2xl relative">
          {/* Icon */}
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 p-4 rounded-full shadow-md">
            <FaEnvelope className="text-white text-3xl" />
          </div>

          <h2 className="text-center text-2xl font-bold mb-6 mt-6">
            Forgot Password
          </h2>

          <p className="text-center text-sm text-gray-600 mb-6 px-2">
            Enter your email address and we'll send you a link to reset your
            password.
          </p>

          <form className="space-y-5">
            {/* Email */}
            <div className="relative">
              <FaEnvelope className="absolute top-3.5 left-3 text-gray-500" />
              <input
                type="email"
                placeholder="Email Address"
                className="pl-10 py-2 w-full bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-md font-semibold transition duration-300"
            >
              Send Reset Link
            </button>
          </form>

          {/* Back to Login */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Remember your password?{" "}
            <Link
              href="/auth/login"
              className="text-yellow-600 hover:underline"
            >
              Back to Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
