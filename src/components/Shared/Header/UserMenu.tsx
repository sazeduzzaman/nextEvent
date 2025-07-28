"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { BiUser } from "react-icons/bi";

const UserMenu = () => {
  // Simulate authentication (replace with real auth logic)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Simulated auth check (e.g., check token in localStorage)
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div>
      {!isLoggedIn ? (
        // Show login icon if not logged in
        <Link href="/auth/login" className="flex items-center">
          <BiUser size={24} className="text-white" />
        </Link>
      ) : (
        // Show avatar dropdown if logged in
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar ring-1"
          >
            <div className="w-10 rounded-full">
              <img
                alt="User Avatar"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow border-t"
          >
            <li>
              <Link href="/profile">
                <span className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </span>
              </Link>
            </li>
            <li>
              <Link href="/settings">Settings</Link>
            </li>
            <li>
              <button
                onClick={() => {
                  localStorage.removeItem("authToken");
                  setIsLoggedIn(false);
                }}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
