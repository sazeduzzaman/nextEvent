import { useState } from "react";
import toast from "react-hot-toast";

export interface ProfileFormData {
  name: string;
  email: string;
  username: string;
  phone: string;
  address: string;
  country: string;
  city: string;
  zipcode: string;
  profile_image?: string; // base64 string
}

export function useProfileUpdate() {
  const [loading, setLoading] = useState(false);

  async function updateProfile(data: ProfileFormData) {
    setLoading(true);
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("authToken="))
        ?.split("=")[1];

      if (!token) {
        throw new Error("No auth token found");
      }

      // Log full data before sending
      console.log("Sending profile update data:", JSON.stringify(data));

      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to update profile");
      }

      toast.success("Profile updated successfully");
    } catch (error: any) {
      toast.error(error.message || "Update failed");
      throw error;
    } finally {
      setLoading(false);
    }
  }

  return { updateProfile, loading };
}
