"use client";

import React, { useState } from "react";
import { Send } from "lucide-react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    // Toast or backend call logic here
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/5 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-white/10 text-white space-y-6"
    >
      <h2 className="text-3xl font-bold text-amber-400 mb-2">Let's Talk</h2>
      <p className="text-gray-400 mb-6 text-sm">
        Fill out the form and our team will get back to you within 24 hours.
      </p>

      {/* Name Input */}
      <div className="form-control w-full">
        <label className="label text-sm text-gray-400">Full Name</label>
        <input
          type="text"
          name="name"
          placeholder="Jane Doe"
          value={formData.name}
          onChange={handleChange}
          className="input input-bordered w-full bg-gray-800 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all duration-200"
          required
        />
      </div>

      {/* Email Input */}
      <div className="form-control w-full">
        <label className="label text-sm text-gray-400">Email</label>
        <input
          type="email"
          name="email"
          placeholder="jane@example.com"
          value={formData.email}
          onChange={handleChange}
          className="input input-bordered w-full bg-gray-800 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all duration-200"
          required
        />
      </div>

      {/* Message Textarea */}
      <div className="form-control w-full">
        <label className="label text-sm text-gray-400">Message</label>
        <textarea
          name="message"
          placeholder="Write your message here..."
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className="textarea textarea-bordered w-full bg-gray-800 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all duration-200"
          required
        ></textarea>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="btn bg-amber-400 text-gray-900 font-semibold w-full hover:bg-amber-300 transition-all duration-200"
      >
        <Send className="w-4 h-4 mr-2" />
        Send Message
      </button>
    </form>
  );
};

export default ContactForm;
