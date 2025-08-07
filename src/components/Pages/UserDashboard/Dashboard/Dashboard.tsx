"use client";

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

type User = {
  name?: string;
  email?: string;
  role?: string;
};

const TOKEN_EXPIRY_MINUTES = 1;

const Dashboard = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (!token) {
      router.push("/auth/login");
      return;
    }

    // Fetch user profile
    const fetchProfile = async () => {
      try {
        const res = await fetch(
          "https://admin.eventstailor.com/api/v1/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await res.json();
        setUser(data.user);
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();

    // Set a timer to check token expiration and redirect after expiry
    const timer = setTimeout(() => {
      // Remove token and user data from cookies
      Cookies.remove("authToken");
      Cookies.remove("userName");
      Cookies.remove("authUser");

      // Remove token and user data from localStorage
      localStorage.removeItem("authToken");
      localStorage.removeItem("userName");
      localStorage.removeItem("authUser");

      // Redirect to login page
      router.push("/auth/login");
    }, TOKEN_EXPIRY_MINUTES * 60 * 1000);

    // Cleanup timer on unmount
    return () => clearTimeout(timer);
  }, [router]);

  if (loading) return <div>Loading profile...</div>;
  if (error) return <div className="text-red-600">Error: {error}</div>;
  if (!user) return <div>No user data found.</div>;

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-gray-100 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">
        Welcome, {user.name || user.email}
      </h1>
      <p>Role: {user.role || "N/A"}</p>
    </div>
  );
};

export default Dashboard;
