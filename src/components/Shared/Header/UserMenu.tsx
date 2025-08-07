"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { BiUser } from "react-icons/bi";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const TOKEN_EXPIRY_MINUTES = 1;

const UserMenu = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  // Function to load auth info from cookies/localStorage
  const loadAuthInfo = () => {
    const token = Cookies.get("authToken") || localStorage.getItem("authToken");
    const name = Cookies.get("userName") || localStorage.getItem("userName");
    setIsLoggedIn(!!token);
    setUserName(name || "");
  };

  useEffect(() => {
    loadAuthInfo();

    // Listen for auth changes (login/register/logout)
    const handleAuthChange = () => {
      loadAuthInfo();
    };

    window.addEventListener("authChanged", handleAuthChange);

    // Setup token expiry timer
    const timer = setTimeout(() => {
      // Remove tokens from cookies and localStorage after expiry time
      Cookies.remove("authToken");
      Cookies.remove("userName");
      localStorage.removeItem("authToken");
      localStorage.removeItem("userName");
      setIsLoggedIn(false);
      setUserName("");
      window.dispatchEvent(new Event("authChanged")); // notify other components
      router.push("/auth/login"); // Redirect to login after token expiration
    }, TOKEN_EXPIRY_MINUTES * 60 * 1000);

    return () => {
      window.removeEventListener("authChanged", handleAuthChange);
      clearTimeout(timer);
    };
  }, [router]);

  return (
    <div>
      {!isLoggedIn ? (
        <Link href="/auth/login" className="flex items-center">
          <BiUser size={24} className="text-white" />
        </Link>
      ) : (
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle text-white ring font-medium capitalize"
          >
            {userName.slice(0, 2)}
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow border-t"
          >
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
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
                  localStorage.removeItem("userName");
                  Cookies.remove("authToken");
                  Cookies.remove("userName");
                  setIsLoggedIn(false);
                  setUserName("");
                  window.dispatchEvent(new Event("authChanged"));
                  router.push("/"); // SPA navigation on logout
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
