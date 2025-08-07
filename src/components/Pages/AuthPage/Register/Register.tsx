import React from "react";
import RegisterForm from "./RegisterForm";
import Link from "next/link";
import {  FaFacebookF, FaGoogle, FaUserPlus } from "react-icons/fa";
const Register = () => {
  return (
    <div>
      <div className="min-h-screen bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center p-4">
        <div className="bg-black w-full max-w-md p-8 rounded-lg shadow-2xl relative">
          {/* Icon */}
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-full shadow-md">
            <FaUserPlus className="site-txt text-3xl" />
          </div>

          <div className="text-center py-8 px-4  rounded-md shadow-md max-w-md mx-auto">
            <h2 className="text-3xl font-extrabold mb-3 site-txt tracking-wide">
              Create Your Account
            </h2>
            <p className="text-white text-lg mb-6">
              Join Event Tailor and start your journey with us.
            </p>
          </div>

          <RegisterForm />

          {/* Divider */}
          {/* <div className="flex items-center justify-center my-6">
            <hr className="w-1/3 border-gray-300" />
            <span className="mx-2 text-gray-500 text-sm">OR</span>
            <hr className="w-1/3 border-gray-300" />
          </div>
          <div className="flex justify-center gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full">
              <FaFacebookF />
            </button>
            <button className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full">
              <FaGoogle />
            </button>
          </div> */}

          {/* Login Redirect */}
          <p className="text-center text-sm text-white mt-10 mb-8">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-yellow-600 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
