"use client";

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Image from "next/image";

type User = {
  name?: string;
  email?: string;
  role?: string;
};

const TOKEN_EXPIRY_MINUTES = 60;

const getProfile = async (token: string) => {
  const res = await fetch("https://admin.eventstailor.com/api/v1/profile", {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch profile");
  }

  const data = await res.json();
  console.log("✅ getProfile result:", data); // <-- Log the profile data here
  return data;
};

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

    const fetchProfile = async () => {
      try {
        const data = await getProfile(token);
        setUser(data.user);
      } catch (err: any) {
        console.error("❌ Error fetching profile:", err);
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  if (loading)
    return (
      <div className="loading-wrapper">
        <Image
          src="/images/preloader.gif"
          alt="Loading..."
          width={100}
          height={100}
          priority
        />
      </div>
    );

  if (error) return <div className="text-red-600">Error: {error}</div>;
  if (!user) return <div>No user data found.</div>;

  return (
    <div className="mt-20 p-6 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">
        Welcome, {user.name || user.email}
      </h1>
      <p>Role: {user.role || "N/A"}</p>
    </div>
  );
};

export default Dashboard;
