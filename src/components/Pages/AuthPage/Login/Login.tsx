import React from "react";
import LoginForm from "./LoginForm";
import Link from "next/link";
import { FaFacebookF, FaGoogle, FaUser, FaLock } from "react-icons/fa";

const Login = () => {
  return (
    <div>
      <div className="h-screen bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center p-4">
        <div className="bg-black pb-20 pt-10 w-full max-w-md p-8 rounded-lg shadow-2xl relative">
          {/* Logo icon or circle */}
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-full shadow-md">
            <FaUser className="site-txt text-3xl" />
          </div>

          <div className="text-center pt-8 px-4 rounded-md shadow-md max-w-md mx-auto">
            <h2 className="text-3xl font-extrabold mb-3 site-txt tracking-wide">
              Welcome Back!
            </h2>
            <p className="text-white text-lg mb-6">
              Please login to your Event Tailor account to continue.
            </p>
          </div>

          <LoginForm />

          {/* Divider */}
          {/* <div className="flex items-center justify-center my-6">
            <hr className="w-1/3 border-gray-300" />
            <span className="mx-2 text-gray-500 text-sm">OR</span>
            <hr className="w-1/3 border-gray-300" />
          </div> */}

          {/* Social Logins */}
          {/* <div className="flex justify-center gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full">
              <FaFacebookF />
            </button>
            <button className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full">
              <FaGoogle />
            </button>
          </div> */}

          {/* Register Link */}
          <p className="text-center text-sm text-white mt-10">
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
    </div>
  );
};

export default Login;
