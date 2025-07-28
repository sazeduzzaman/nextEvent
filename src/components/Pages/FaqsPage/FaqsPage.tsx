"use client";

import React, { useState, useRef, useEffect } from "react";

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
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          const ref = contentRefs.current[index];
          const height = ref?.scrollHeight ?? 0;

          return (
            <div
              key={index}
              className="border border-gray-300 rounded-2xl shadow-sm overflow-hidden transition-all duration-300"
            >
              <button
                className={`w-full text-left px-6 py-5 flex items-center justify-between transition-all duration-300 ${
                  isOpen ? "bg-gray-100" : "bg-white hover:bg-gray-50"
                }`}
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
                ref={(el) => (contentRefs.current[index] = el)}
                className="px-6 overflow-hidden transition-all duration-300"
                style={{
                  maxHeight: isOpen ? `${height}px` : "0px",
                  opacity: isOpen ? 1 : 0,
                }}
              >
                <div className="py-4 text-gray-600">{faq.answer}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FaqsPage;
