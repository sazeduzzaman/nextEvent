"use client";

import {
  ProfileFormData,
  useProfileUpdate,
} from "@/lib/api/UserData/useProfileUpdate";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Edit2 } from "lucide-react"; // import Edit icon
import { useAuthInfo } from "@/hooks/useAuthInfo"; // import your auth hook
import SiteButtonOne from "@/components/Buttons/SiteButtonOne/SiteButtonOne";
import { updateLocalUserInfo } from "@/lib/api/UserData/userApi";

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
  const { userName } = useAuthInfo();

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
      profile_image: "",
    },
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewSrc, setPreviewSrc] = useState<string>("");

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

        if (user.profile_image) {
          setPreviewSrc(user.profile_image);
        }
      } catch (err: any) {
        toast.error(err.message || "Failed to load profile data");
      }
    };

    fetchProfile();
  }, [reset]);

  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const onSubmit = async (data: ProfileFormData) => {
    try {
      if (imageFile) {
        const base64Image = await toBase64(imageFile);
        data.profile_image = base64Image;
      }
      await updateProfile(data);

      // Update local user info and notify all listeners
      updateLocalUserInfo(data.name || "");

      toast.success("Profile updated successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to update profile");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreviewSrc(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreviewSrc("");
    }
  };

  // Extract initials from current userName (uppercase, max 2 chars)
  const initials = userName
    ? userName
        .split(" ")
        .filter(Boolean)
        .map((n) => n[0])
        .join("")
        .substring(0, 2)
        .toUpperCase()
    : "";

  return (
    <div className="container">
      <h2 className="text-4xl font-extrabold mb-6 text-yellow-400 border-l-4 border-yellow-400 pl-4">
        Update
      </h2>
      <p className="text-gray-400 mb-6 text-sm">
        Fill out the form to update your profile.
      </p>

      <div className="site-second-bg dark:site-second-bg rounded-lg shadow-lg p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Profile Image column */}
            <div className="flex flex-col items-center md:col-span-1">
              <span className="mb-3 w-full text-center font-medium text-gray-700 dark:text-gray-300">
                Profile Picture
              </span>
              <label
                htmlFor="profile-image-upload"
                className="relative cursor-pointer rounded-2xl border border-yellow-400 p-1 hover:border-yellow-600 transition-shadow duration-300
      flex items-center justify-center w-full h-full bg-yellow-500 shadow-lg hover:shadow-yellow-400/50"
                title="Click to change profile picture"
              >
                {previewSrc ? (
                  <img
                    src={previewSrc}
                    alt="Profile Preview"
                    className="w-full h-full rounded-2xl object-cover shadow-inner"
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center rounded-2xl site-second-bg text-white font-extrabold
          text-6xl tracking-wider select-none"
                  >
                    {initials || "??"}
                  </div>
                )}

                <div
                  className="absolute bottom-2 right-2 bg-yellow-600 rounded-full p-2 shadow-lg
        hover:bg-yellow-700 transition-colors duration-300
        animate-pulse"
                >
                  <Edit2 className="h-6 w-6 text-white" />
                </div>
              </label>
              <input
                id="profile-image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            {/* Inputs column */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:col-span-2">
              {[
                { name: "name", label: "Full Name", type: "text" },
                {
                  name: "email",
                  label: "Email",
                  type: "email",
                  readOnly: true,
                },
                { name: "username", label: "Username", type: "text" },
                { name: "phone", label: "Phone Number", type: "tel" },
                { name: "address", label: "Address", type: "text" },
                { name: "country", label: "Country", type: "text" },
                { name: "city", label: "City", type: "text" },
                { name: "zipcode", label: "Zip Code", type: "text" },
              ].map(({ name, label, type, readOnly }) => (
                <div key={name} className="flex flex-col">
                  <label
                    htmlFor={name}
                    className="mb-1 font-medium text-gray-700 dark:text-gray-300"
                  >
                    {label}
                  </label>
                  <input
                    id={name}
                    type={type}
                    {...register(name as keyof ProfileFormData)}
                    placeholder={`Enter your ${label.toLowerCase()}`}
                    readOnly={readOnly}
                    className={`rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-2
              text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500
              focus:outline-none focus:ring-2 focus:ring-yellow-400 transition
              ${
                readOnly
                  ? "cursor-not-allowed bg-gray-200 dark:bg-gray-700"
                  : ""
              }
            `}
                  />
                  {errors[name as keyof ProfileFormData] && (
                    <span className="text-red-500 text-sm mt-1">
                      {errors[name as keyof ProfileFormData]?.message}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <SiteButtonOne
            type="submit"
            disabled={loading}
            text={loading ? "Updating..." : "Update Profile"}
          />
        </form>
      </div>
    </div>
  );
};

export default ProfileUpdateForm;
