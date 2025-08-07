"use client";

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

type User = {
  name?: string;
  email?: string;
  role?: string;
  // add more fields if needed based on your API response
};

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = Cookies.get("authToken");
      console.log("Token from cookie:", token);

      if (!token) {
        setError("Authentication token not found. Please login.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          "https://admin.eventstailor.com/api/v1/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Profile fetch status:", res.status);

        if (!res.ok) {
          const errorText = await res.text();
          console.error("Profile fetch error:", errorText);
          throw new Error("Failed to fetch profile");
        }

        const data = await res.json();
        console.log("Profile data:", data);
        setUser(data.user); // <-- set only the user object here
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <div>Loading profile...</div>;
  if (error) return <div className="text-red-600">Error: {error}</div>;
  if (!user) return <div>No user data found.</div>;

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-gray-100 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">
        Welcome, {user.name || user.email}
      </h1>
      {/* Display more user info if available */}
      <p>Role: {user.role || "N/A"}</p>
    </div>
  );
};

export default Dashboard;
