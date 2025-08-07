const API_BASE = "https://admin.eventstailor.com/api/v1";

export const logout = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("userName");
  window.location.href = "/login";
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
