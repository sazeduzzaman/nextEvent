import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const API_BASE = "https://admin.eventstailor.com/api/v1";

export const logout = () => {
  const router = useRouter();
  // Remove from localStorage
  localStorage.removeItem("authToken");
  localStorage.removeItem("userName");

  // Remove from cookies
  Cookies.remove("authToken");
  Cookies.remove("userName");
  Cookies.remove("authUser");

  // Redirect to login
  router.push("/");
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
