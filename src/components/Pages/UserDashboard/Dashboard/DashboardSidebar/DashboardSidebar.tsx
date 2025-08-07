"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { getProfile, logout } from "@/lib/api/UserData/userApi";
import Image from "next/image";

const DashboardSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const isActive = (href: string) => pathname === href;

  const menuLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/dashboard/tickets", label: "Purchase Tickets" },
    { href: "/dashboard/profile", label: "Update Profile" },
  ];

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getProfile();
        setUser(userData);
      } catch (err) {
        console.error("Failed to fetch user profile:", err);
        router.push("/auth/login"); // Redirect if not authenticated
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  if (loading) {
    return (
      <div>
        <div className="loading-wrapper">
          <Image
            src="/images/preloader.gif"
            alt="Loading..."
            width={100}
            height={100}
            priority
          />
        </div>
      </div>
    );
  }
  return (
    <aside className="flex flex-col justify-between w-full p-6 border border-yellow-400 rounded-lg shadow-lg space-y-6 site-second-bg">
      <div>
        <div className="flex flex-col items-center text-center mb-8">
          <img
            src={user?.avatar || "https://i.pravatar.cc/100"} // fallback avatar
            alt="User Avatar"
            className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-yellow-400"
          />
          <h2 className="text-xl font-semibold site-txt">
            {user?.name || "Unknown User"}
          </h2>
          <p className="text-white text-sm">{user?.email || "N/A"}</p>
        </div>

        <nav>
          <ul className="space-y-3 px-10">
            {menuLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`block px-4 py-2 rounded-md font-medium transition ${
                    isActive(href)
                      ? "bg-yellow-400 text-black"
                      : "text-white hover:bg-yellow-400"
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="mt-20">
        <button
          type="button"
          onClick={() => {
            logout();
          }}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md font-semibold transition"
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
