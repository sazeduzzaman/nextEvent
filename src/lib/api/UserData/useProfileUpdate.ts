"use client";

import { useState } from "react";
import toast from "react-hot-toast";

interface ProfileFormData {
  name: string;
  email: string;
  username: string | null;
  phone: string | null;
  address: string | null;
  country: string | null;
  city: string | null;
  zipcode: string | null;
  // profile_image is excluded as per your request
}

// Helper to get cookie value by name
function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}

export function useProfileUpdate() {
  const [loading, setLoading] = useState(false);

  const updateProfile = async (formData: ProfileFormData) => {
    setLoading(true);

    const token = getCookie("authToken");
    if (!token) {
      toast.error("No auth token found. Please login.");
      setLoading(false);
      return;
    }

    try {
      // Prepare payload exactly as the Laravel fields (profile_image excluded)
      const payload = {
        name: formData.name,
        email: formData.email,
        username: formData.username ?? null,
        phone: formData.phone ?? null,
        address: formData.address ?? null,
        country: formData.country ?? null,
        city: formData.city ?? null,
        zipcode: formData.zipcode ?? null,
      };

      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const contentType = res.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        const result = await res.json();

        if (!res.ok) throw new Error(result.message || "Profile update failed");

        toast.success("Profile updated successfully!");
        return result;
      } else {
        const text = await res.text();
        console.error("Unexpected non-JSON response:", text);
        throw new Error("Received non-JSON response from server");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to update profile");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateProfile, loading };
}
