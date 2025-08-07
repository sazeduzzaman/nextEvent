"use client";

import Link from "next/link";
import React, { useState } from "react";
import { BiUser } from "react-icons/bi";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useAuthInfo } from "@/hooks/useAuthInfo";
import { logout } from "@/lib/api/UserData/userApi";

const UserMenu = () => {
  const router = useRouter();
  const { isLoggedIn, userName, loadAuthInfo } = useAuthInfo();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => setIsDropdownOpen(!isDropdownOpen);
  const closeDropdown = () => setIsDropdownOpen(false);

  // Format initials
  const userInitials = userName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word, _, arr) =>
      arr.length === 1 ? word.slice(0, 2) : word.charAt(0)
    )
    .join("")
    .toUpperCase();

  return (
    <div className="relative">
      {!isLoggedIn ? (
        <Link href="/auth/login" className="flex items-center">
          <BiUser size={24} className="text-white" />
        </Link>
      ) : (
        <div>
          <div
            onClick={handleDropdownToggle}
            className="btn btn-ghost btn-circle text-white ring font-medium capitalize cursor-pointer"
          >
            {userInitials}
          </div>

          {isDropdownOpen && (
            <ul className="menu menu-sm dropdown-content absolute right-0 mt-3 w-52 bg-base-100 rounded-box z-10 p-2 shadow border-t">
              <li>
                <Link href="/dashboard" onClick={closeDropdown}>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/profile" onClick={closeDropdown}>
                  <span className="justify-between">
                    Profile <span className="badge">New</span>
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/settings" onClick={closeDropdown}>
                  Settings
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    logout();
                  }}
                >
                  Logout
                </button>
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default UserMenu;
