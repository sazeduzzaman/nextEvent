import Cookies from "js-cookie";

type LoginData = {
  email: string;
  password: string;
};

type LoginResponse = {
  token: string;
  user: { name: string };
};

export async function loginUser(data: LoginData): Promise<LoginResponse> {
  const res = await fetch("https://admin.eventstailor.com/api/v1/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result?.message || "Login failed");
  }

  // Save tokens and user info
  if (result.token) {
    Cookies.set("authToken", result.token, {
      expires: 1 / 24, // 1 hour
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      path: "/",
    });
    localStorage.setItem("authToken", result.token);
  }

  if (result.user) {
    Cookies.set("userName", result.user.name, {
      expires: 1 / 24,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      path: "/",
    });
    localStorage.setItem("userName", result.user.name);

    Cookies.set("authUser", JSON.stringify(result.user), {
      expires: 1 / 24,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      path: "/",
    });
  }

  // Dispatch event to notify app about auth change
  window.dispatchEvent(new Event("authChanged"));

  return result;
}
