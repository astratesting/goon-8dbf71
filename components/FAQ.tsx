"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Do I need to know 3D modeling?",
    a: "Not at all. You can describe your idea in plain text, upload a rough sketch, or share reference images. Our guided workflow helps you communicate what you want, and we handle the technical design work.",
  },
  {
    q: "What materials can you print with?",
    a: "We offer standard PLA and PETG for FDM prints, and standard, ABS-like, and flexible resins for resin prints. Each material is listed with its properties during the design phase so you can pick the right one for your project.",
  },
  {
    q: "What is the minimum order quantity?",
    a: "One piece. Seriously. Whether you need a single miniature or a hundred, we treat every order with the same care. Volume pricing kicks in at 5+ pieces automatically.",
  },
  {
    q: "How long does it take?",
    a: "Most single-piece orders ship within 3-5 business days. Complex projects with multiple parts or finishing work may take 7-10 business days. You will get an estimated timeline before you commit.",
  },
  {
    q: "What if the print does not come out right?",
    a: "We quality-check every piece before it ships. If something is off — a warped base, a missing detail, a crack — we reprint it at no extra cost. Your satisfaction is part of the process, not an afterthought.",
  },
  {
    q: "Can I get my mini painted?",
    a: "We are building a painting service. For now, we focus on delivering clean, high-quality prints. We do offer priming in black, grey, or white so your minis are ready to paint out of the box.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="font-mono text-sm text-teal mb-3 tracking-wider uppercase">
            FAQ
          </p>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white mb-4">
            Common questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border-glow rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full text-left px-6 py-4 flex items-center justify-between gap-4"
              >
                <span className="font-heading font-medium text-white">
                  {faq.q}
                </span>
                <svg
                  className={`w-5 h-5 text-zinc-400 shrink-0 transition-transform ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === i && (
                <div className="px-6 pb-4">
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
