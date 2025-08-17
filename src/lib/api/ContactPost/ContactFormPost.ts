// /lib/api/Contacts/ContactsPost.ts
export type ContactFormPayload = {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  call?: "1" | "0";
};

export async function contactData(data: ContactFormPayload) {
  const res = await fetch("https://admin.eventstailor.com/api/v1/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      phone: data.phone || "",
      subject: data.subject || "",
      message: data.message,
      call: data.call || "0",
    }),
  });

  const text = await res.text();

  let result;
  try {
    result = JSON.parse(text);
  } catch {
    result = null;
  }

  if (!res.ok) {
    throw new Error(result?.message || "Failed to send message");
  }

  return result;
}
