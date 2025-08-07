import Cookies from "js-cookie";

interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
  password_confirmation: string;
}

interface RegisterResponse {
  message: string;
  data: {
    token: string;
    name: string;
  };
}

export async function registerUser(formData: RegisterData): Promise<RegisterResponse> {
  const res = await fetch("https://admin.eventstailor.com/api/v1/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(formData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Registration failed");
  }

  // Save tokens
  Cookies.set("authToken", data.data.token, { expires: 1 / 24 });
  Cookies.set("userName", data.data.name, { expires: 1 / 24 });

  localStorage.setItem("authToken", data.data.token);
  localStorage.setItem("userName", data.data.name);

  // Notify other parts of the app
  window.dispatchEvent(new Event("authChanged"));

  return data;
}
