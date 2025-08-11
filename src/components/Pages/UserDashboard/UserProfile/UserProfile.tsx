"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useProfileUpdate } from "@/lib/api/UserData/useProfileUpdate";

interface ProfileFormData {
  name: string;
  email: string;
  username: string;
  phone: string;
  address: string;
  country: string;
  city: string;
  zipcode: string;
  // Removed profile_image from interface because not sent to backend
}

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}

async function getProfile(token: string) {
  const res = await fetch("https://admin.eventstailor.com/api/v1/profile", {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to fetch profile");
  }
  const data = await res.json();
  return data.user;
}

const ProfileUpdateForm = () => {
  const { updateProfile, loading } = useProfileUpdate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormData>({
    defaultValues: {
      name: "",
      email: "",
      username: "",
      phone: "",
      address: "",
      country: "",
      city: "",
      zipcode: "",
    },
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const token = getCookie("authToken");
      if (!token) {
        toast.error("No auth token found. Please login.");
        return;
      }
      try {
        const user = await getProfile(token);
        reset({
          name: user.name || "",
          email: user.email || "",
          username: user.username || "",
          phone: user.phone || "",
          address: user.address || "",
          country: user.country || "",
          city: user.city || "",
          zipcode: user.zipcode || "",
        });
      } catch (err: any) {
        toast.error(err.message || "Failed to load profile data");
      }
    };

    fetchProfile();
  }, [reset]);

  const onSubmit = async (data: ProfileFormData) => {
    try {
      await updateProfile(data);
    } catch {
      // handled in hook
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {[
        { name: "name", label: "Name" },
        { name: "email", label: "Email", readOnly: true },
        { name: "username", label: "Username" },
        { name: "phone", label: "Phone" },
        { name: "address", label: "Address" },
        { name: "country", label: "Country" },
        { name: "city", label: "City" },
        { name: "zipcode", label: "Zip Code" },
      ].map(({ name, label, readOnly }) => (
        <input
          key={name}
          {...register(name as keyof ProfileFormData)}
          type="text"
          placeholder={label}
          readOnly={readOnly}
          className="input input-bordered w-full bg-gray-800 text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-amber-400"
        />
      ))}

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Updating..." : "Update Profile"}
      </button>
    </form>
  );
};

export default ProfileUpdateForm;
