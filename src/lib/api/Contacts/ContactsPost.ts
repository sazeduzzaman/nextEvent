// api/contact.ts

type ContactData = {
  name: string;
  email: string;
  message: string;
};

export async function contactData(data: ContactData): Promise<any> {
  const res = await fetch("https://admin.eventstailor.com/api/v1/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result?.message || "Failed to send message");
  }

  return result;
}
