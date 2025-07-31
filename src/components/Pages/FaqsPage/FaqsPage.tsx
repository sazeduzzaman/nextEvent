"use client";

import React, { useState } from "react";

const faqs = [
  {
    question: "How do I create an event on your platform?",
    answer:
      "You can create an event by clicking the 'Create Event' button in the top-right corner, then filling in all required event details like title, date, location, and ticket info.",
  },
  {
    question: "Can I edit my event after publishing?",
    answer:
      "Yes, you can edit your event details anytime from your dashboard. Just go to 'My Events' and click 'Edit' on the event card.",
  },
  {
    question: "Is there a fee for creating or hosting events?",
    answer:
      "Creating free events is free of charge. For paid events, a small service fee may apply per ticket sold.",
  },
  {
    question: "How are refunds handled for ticket sales?",
    answer:
      "Refund policies are set by each event organizer. Make sure to review the refund terms on the event details page.",
  },
];

const FaqsPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <h2 className="text-4xl font-bold text-center mb-12 site-txt">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={index}
              className="border border-yellow-600 rounded-lg shadow-sm overflow-hidden transition-all duration-300"
            >
              <button
                className={`w-full text-left px-6 py-5 flex items-center justify-between ${
                  isOpen ? "site-bg" : "site-bg hover:bg-bg-yellow-600"
                } transition-colors duration-300`}
                onClick={() => toggle(index)}
              >
                <span className="text-lg font-medium text-gray-800">
                  {faq.question}
                </span>
                <span
                  className={`text-2xl transform transition-transform duration-300 ${
                    isOpen ? "rotate-45" : "rotate-0"
                  }`}
                >
                  +
                </span>
              </button>
              <div
                className={`px-6 transition-all duration-300 ease-in-out overflow-hidden ${
                  isOpen
                    ? "max-h-40 opacity-100 py-4"
                    : "max-h-0 opacity-0 py-0"
                }`}
              >
                <p className="text-white">{faq.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FaqsPage;
