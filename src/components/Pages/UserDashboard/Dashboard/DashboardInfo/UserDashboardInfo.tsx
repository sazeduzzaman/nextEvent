"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getProfile } from "@/lib/api/UserData/userApi";

type User = {
  name?: string;
  email?: string;
  role?: string;
};

interface UserDashboardInfoProps {
  events: any;
}

const UserDashboardInfo: React.FC<UserDashboardInfoProps> = ({ events }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getProfile();
        setUser(userData);
      } catch (err) {
        const message = (err as Error).message || "An error occurred";
        setError(message);
        console.error("Failed to fetch user profile:", err);
        router.push("/auth/login"); // Redirect if no token or error
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  if (loading)
    return (
      <div className="loading-wrapper flex justify-center items-center h-48">
        <Image
          src="/images/preloader.gif"
          alt="Loading..."
          width={100}
          height={100}
          priority
        />
      </div>
    );

  if (error)
    return (
      <div className="text-red-600 font-semibold text-center">{error}</div>
    );

  if (!user) return <div className="text-center">No user data found.</div>;

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";

  return (
    <div className="rounded-md shadow-md">
      <h1 className="text-3xl font-bold mb-5">
        {greeting}, <span className="site-txt">{user.name || user.email}</span>
      </h1>
    </div>
  );
};

export default UserDashboardInfo;
