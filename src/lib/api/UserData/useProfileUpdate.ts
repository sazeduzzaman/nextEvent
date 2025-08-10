// src/hooks/useProfileUpdate.ts
"use client";

import { useState } from "react";

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

export function useProfileUpdate() {
  const [loading, setLoading] = useState(false);

  const updateProfile = async (formData: ProfileFormData) => {
    setLoading(true);

    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("No auth token found");
      setLoading(false);
      return;
    }

    try {
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== "") {
          form.append(key, value as any);
        }
      });

      const res = await fetch(
        "https://admin.eventstailor.com/api/v1/profile-update",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: form,
        }
      );

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Profile update failed");

      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return { updateProfile, loading };
}
