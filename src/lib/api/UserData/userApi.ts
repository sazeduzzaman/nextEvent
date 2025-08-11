import Cookies from "js-cookie";

const API_BASE = "https://admin.eventstailor.com/api/v1";

const COOKIE_EXPIRY_MINUTES = 60;
const COOKIE_EXPIRY_DAYS = COOKIE_EXPIRY_MINUTES / (60 * 24); // convert 60 mins to days fraction

export const logout = (router?: any) => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("userName");
  Cookies.remove("authToken");
  Cookies.remove("userName");
  Cookies.remove("authUser");

  // 🔥 Dispatch a global event
  window.dispatchEvent(new Event("authChanged"));

  if (router) {
    router.push("/auth/login");
  } else {
    window.location.href = "/auth/login";
  }
};

export const updateProfile = async (updatedData: any) => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    throw new Error("No auth token found");
  }

  try {
    const res = await fetch(`${API_BASE}/profile`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Update failed");
    }

    return await res.json();
  } catch (err) {
    console.error("Profile update error:", err);
    throw err;
  }
};

// New function to get current user profile
export const getProfile = async () => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    throw new Error("No auth token found");
  }

  try {
    const res = await fetch(`${API_BASE}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to fetch profile");
    }

    const data = await res.json();
    return data.user; // Assuming API returns { user: {...} }
  } catch (err) {
    console.error("Profile fetch error:", err);
    throw err;
  }
};

// Update local storage and cookies with new username, with 60-minute expiry, and notify listeners
export const updateLocalUserInfo = (name: string, token?: string) => {
  if (!name) return;

  // Save username and token (if provided)
  localStorage.setItem("userName", name);
  Cookies.set("userName", name, { expires: COOKIE_EXPIRY_DAYS });

  if (token) {
    localStorage.setItem("authToken", token);
    Cookies.set("authToken", token, { expires: COOKIE_EXPIRY_DAYS });
  }

  // Notify app that auth info changed
  window.dispatchEvent(new Event("authChanged"));
};
