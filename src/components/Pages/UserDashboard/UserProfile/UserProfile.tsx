"use client";

import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type ProfileFormData = {
  fullName: string;
  email: string;
  phone?: string;
};

const UserProfile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProfileFormData>({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    try {
      // Here you can call your API to update profile
      // await api.updateProfile(data);

      toast.success("Profile updated successfully!");
      reset(data);
    } catch (error) {
      toast.error("Failed to update profile.");
    }
  };

  return (
    <div className="w-full mx-auto site-second-bg p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-6">Update Profile</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block mb-1 font-medium">
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            {...register("fullName", { required: "Full Name is required" })}
            className={`w-full border text-white rounded px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.fullName
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-yellow-400"
            }`}
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block mb-1 font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.email
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-yellow-400"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Phone (optional) */}
        <div>
          <label htmlFor="phone" className="block mb-1 font-medium">
            Phone (optional)
          </label>
          <input
            id="phone"
            type="tel"
            {...register("phone")}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-18 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded font-semibold transition"
        >
          {isSubmitting ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default UserProfile;
