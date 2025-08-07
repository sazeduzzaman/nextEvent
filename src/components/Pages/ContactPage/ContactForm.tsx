"use client";

import React, { useState } from "react";
import { Send } from "lucide-react";
import toast from "react-hot-toast";
import { contactData } from "@/lib/api/Contacts/ContactsPost";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await contactData(formData);
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error: any) {
      toast.error(error.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/5 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-white/10 text-white space-y-6"
    >
      <h2 className="text-4xl font-extrabold mb-6 text-amber-400 border-l-4 border-amber-400 pl-4">
        Let's Talk
      </h2>
      <p className="text-gray-400 mb-6 text-sm">
        Fill out the form and our team will get back to you within 24 hours.
      </p>

      {/* Name */}
      <div className="form-control w-full">
        <label className="label text-sm text-gray-400">Full Name</label>
        <input
          type="text"
          name="name"
          placeholder="Jane Doe"
          value={formData.name}
          onChange={handleChange}
          className="input input-bordered w-full bg-gray-800 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
          required
        />
      </div>

      {/* Email */}
      <div className="form-control w-full">
        <label className="label text-sm text-gray-400">Email</label>
        <input
          type="email"
          name="email"
          placeholder="jane@example.com"
          value={formData.email}
          onChange={handleChange}
          className="input input-bordered w-full bg-gray-800 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
          required
        />
      </div>

      {/* Message */}
      <div className="form-control w-full">
        <label className="label text-sm text-gray-400">Message</label>
        <textarea
          name="message"
          placeholder="Write your message here..."
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className="textarea textarea-bordered w-full bg-gray-800 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
          required
        ></textarea>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="btn bg-amber-400 text-gray-900 font-semibold w-full hover:bg-amber-300 transition-all duration-200"
      >
        {loading ? "Sending..." : <>
          <Send className="w-4 h-4 mr-2" />
          Send Message
        </>}
      </button>
    </form>
  );
};

export default ContactForm;
