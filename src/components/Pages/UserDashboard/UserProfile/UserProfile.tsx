"use client";

import React, { useEffect, useState } from "react";
import { getProfile } from "@/lib/api/UserData/userApi";
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
  profile_image: File | null;
}

const ProfileUpdatePage = () => {
  const [formData, setFormData] = useState<ProfileFormData>({
    name: "",
    email: "",
    username: "",
    phone: "",
    address: "",
    country: "",
    city: "",
    zipcode: "",
    profile_image: null,
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const { updateProfile, loading } = useProfileUpdate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = await getProfile();
        setFormData({
          name: user.name || "",
          email: user.email || "",
          username: user.username || "",
          phone: user.phone || "",
          address: user.address || "",
          country: user.country || "",
          city: user.city || "",
          zipcode: user.zipcode || "",
          profile_image: null,
        });
        if (user.profile_image) {
          setPreviewImage(user.profile_image);
        }
      } catch (err) {
        console.error("Error loading profile:", err);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const file = e.target.files[0];
      setFormData((prev) => ({ ...prev, profile_image: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
  };

  return (
    <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-white/10 text-white space-y-6">
      <h2 className="text-xl font-bold mb-4">Update Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
            type="text"
            name={name}
            value={(formData as any)[name]}
            onChange={handleChange}
            placeholder={label}
            readOnly={readOnly}
            className="input input-bordered w-full bg-gray-800 text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-amber-400"
          />
        ))}

        {previewImage && (
          <div>
            <p className="text-sm text-gray-500 mb-1">Profile Image Preview:</p>
            <img
              src={previewImage}
              alt="Profile Preview"
              className="w-20 h-20 rounded-full object-cover border"
            />
          </div>
        )}

        <input type="file" onChange={handleFileChange} className="w-full" />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default ProfileUpdatePage;
