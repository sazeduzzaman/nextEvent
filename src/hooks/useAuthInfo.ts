"use client";

import { useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const TOKEN_EXPIRY_MINUTES = 60;

export const useAuthInfo = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  const loadAuthInfo = useCallback(() => {
    const cookieToken = Cookies.get("authToken");
    const storageToken = localStorage.getItem("authToken");

    const isValidToken = !!cookieToken && !!storageToken;

    const cookieName = Cookies.get("userName");
    const storageName = localStorage.getItem("userName");

    setIsLoggedIn(isValidToken);
    setUserName(cookieName || storageName || "");
  }, []);

  useEffect(() => {
    loadAuthInfo();

    const handleAuthChange = () => {
      loadAuthInfo();
    };

    window.addEventListener("authChanged", handleAuthChange);

    const timer = setTimeout(() => {
      Cookies.remove("authToken");
      Cookies.remove("userName");
      localStorage.removeItem("authToken");
      localStorage.removeItem("userName");

      setIsLoggedIn(false);
      setUserName("");

      window.dispatchEvent(new Event("authChanged"));
      router.push("/auth/login");
    }, TOKEN_EXPIRY_MINUTES * 60 * 1000);

    return () => {
      window.removeEventListener("authChanged", handleAuthChange);
      clearTimeout(timer);
    };
  }, [loadAuthInfo, router]);

  return { isLoggedIn, userName, loadAuthInfo };
};
