"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";

const DashboardSidebar = () => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    imageUrl: "https://i.pravatar.cc/100",
  };

  const isActive = (href: string) => pathname === href;

  const menuLinks = [
    { href: "/user/tickets", label: "Purchase Tickets" },
    { href: "/user/profile", label: "Update Profile" },
  ];

  if (!mounted) return null; // Wait until hydrated

  return (
    <aside className="flex flex-col justify-between w-full p-6 border border-yellow-400 rounded-lg shadow-lg space-y-6 site-second-bg">
      {/* Top section */}
      <div>
        {/* User Info */}
        <div className="flex flex-col items-center text-center mb-8">
          <img
            src={user.imageUrl}
            alt={user.name}
            className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-yellow-400"
          />
          <h2 className="text-xl font-semibold site-txt">{user.name}</h2>
          <p className="text-white text-sm">{user.email}</p>
        </div>

        {/* Navigation Links */}
        <nav>
          <ul className="space-y-3 px-10">
            {menuLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`block px-4 py-2 rounded-md font-medium transition
                    ${
                      isActive(href)
                        ? "bg-yellow-400 text-black"
                        : "text-white hover:bg-yellow-400"
                    }
                  `}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Bottom Logout Button */}
      <div className="mt-20">
        <button
          type="button"
          onClick={() => {
            toast.success("Logout clicked");
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
