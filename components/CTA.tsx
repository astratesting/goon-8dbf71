"use client";

import { useState } from "react";

export default function CTA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    // Simulate waitlist signup — in production this would hit an API
    await new Promise((r) => setTimeout(r, 800));
    setStatus("success");
    setEmail("");
  };

  return (
    <section className="py-24 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-glow rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo/5 via-transparent to-cyan/5" />

          <div className="relative">
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white mb-4">
              Ready to bring your ideas to life?
            </h2>
            <p className="text-zinc-400 max-w-xl mx-auto mb-8">
              Join the waitlist for early access. We are launching soon and will
              let you know the moment we are ready to print your first piece.
            </p>

            {status === "success" ? (
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal/10 border border-teal/20 text-teal font-medium">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                You are on the list! We will be in touch.
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="flex-1 px-4 py-3 rounded-xl bg-ink border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-indigo/50 focus:ring-1 focus:ring-indigo/50 transition-all font-mono text-sm"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="px-6 py-3 bg-gradient-to-r from-indigo to-cyan text-white font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 whitespace-nowrap"
                >
                  {status === "loading" ? "Joining..." : "Join Waitlist"}
                </button>
              </form>
            )}

            <p className="text-zinc-500 text-xs mt-4">
              No spam. Just a single email when we launch.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
