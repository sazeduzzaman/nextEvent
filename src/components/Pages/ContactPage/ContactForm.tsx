"use client";

import React from "react";
import { Send } from "lucide-react";
import { useContactForm } from "@/lib/api/ContactPost/ContactFormLogic";

const ContactForm: React.FC = () => {
  const { formData, loading, handleChange, handleSubmit } = useContactForm();

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

      {/* Phone */}
      <div className="form-control w-full">
        <label className="label text-sm text-gray-400">Phone</label>
        <input
          type="tel"
          name="phone"
          placeholder="1234567890"
          value={formData.phone}
          onChange={handleChange}
          className="input input-bordered w-full bg-gray-800 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
          required
        />
      </div>

      {/* Subject */}
      <div className="form-control w-full">
        <label className="label text-sm text-gray-400">Subject</label>
        <input
          type="text"
          name="subject"
          placeholder="Subject here"
          value={formData.subject}
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
        />
      </div>

      {/* Call Checkbox */}
      <div className="form-control w-full flex items-center gap-2">
        <input
          type="checkbox"
          name="call"
          checked={formData.call === "1"}
          onChange={handleChange}
          className="checkbox checkbox-amber"
          id="callCheckbox"
        />
        <label htmlFor="callCheckbox" className="label text-sm text-gray-400">
          Need a Call?
        </label>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="btn bg-amber-400 text-gray-900 font-semibold w-full hover:bg-amber-300 transition-all duration-200"
      >
        {loading ? (
          "Sending..."
        ) : (
          <>
            <Send className="w-4 h-4 mr-2" />
            Send Message
          </>
        )}
      </button>
    </form>
  );
};

export default ContactForm;
