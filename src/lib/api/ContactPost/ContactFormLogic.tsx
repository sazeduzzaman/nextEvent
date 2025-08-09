"use client";

import { useState, useCallback } from "react";
import { contactData } from "@/lib/api/ContactPost/ContactFormPost";
import toast from "react-hot-toast";

export function useContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    call: "0" as "1" | "0",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const target = e.target;
      const { name, type } = target;

      let value: string;
      if (type === "checkbox") {
        const input = target as HTMLInputElement;
        value = input.checked ? "1" : "0";
      } else {
        value = target.value;
      }

      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);

      try {
        const cleanPhone = formData.phone.replace(/\D/g, "");
        await contactData({ ...formData, phone: cleanPhone });
        toast.success("Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
          call: "0",
        });
      } catch (error: any) {
        toast.error(error.message || "Something went wrong!");
      } finally {
        setLoading(false);
      }
    },
    [formData]
  );

  return { formData, loading, handleChange, handleSubmit };
}
