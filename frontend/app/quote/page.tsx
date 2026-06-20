"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthGate from "@/frontend/app/lib/auth-gate";

function QuoteForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    projectDescription: "",
    material: "pla",
    quantity: 1,
    budget: "",
    deadline: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.projectDescription.trim()) {
      setError("Please describe your project.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Submit failed");
      router.push("/dashboard");
    } catch {
      setError("Submission failed. Please try again.");
      setSubmitting(false);
    }
  }

  const input =
    "w-full px-4 py-3 rounded-xl bg-ink border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-indigo/50 focus:ring-1 focus:ring-indigo/50 transition-all text-sm";

  return (
    <div className="min-h-screen bg-ink flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg">
        <h1 className="font-heading font-bold text-3xl text-white mb-2">
          Request a Quote
        </h1>
        <p className="text-zinc-400 text-sm mb-8">
          Describe your project and we&apos;ll get back to you with pricing and timeline.
        </p>

        {error && (
          <div className="mb-4 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1.5">
              Name
            </label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="Your name"
              className={input}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1.5">
              Email
            </label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder="you@example.com"
              className={input}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1.5">
              Project Description
            </label>
            <textarea
              rows={4}
              required
              value={form.projectDescription}
              onChange={(e) => update("projectDescription", e.target.value)}
              placeholder="Describe what you want — size, purpose, any reference images or sketches..."
              className={`${input} resize-none`}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                Preferred Material
              </label>
              <select
                value={form.material}
                onChange={(e) => update("material", e.target.value)}
                className={input}
              >
                <option value="pla">PLA</option>
                <option value="abs">ABS</option>
                <option value="resin">Resin</option>
                <option value="petg">PETG</option>
                <option value="tpu">TPU</option>
                <option value="unsure">Not sure</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                Quantity
              </label>
              <input
                type="number"
                min={1}
                max={1000}
                value={form.quantity}
                onChange={(e) => update("quantity", Number(e.target.value))}
                className={input}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                Budget Range
              </label>
              <select
                value={form.budget}
                onChange={(e) => update("budget", e.target.value)}
                className={input}
              >
                <option value="">Select...</option>
                <option value="under50">Under $50</option>
                <option value="50-100">$50 – $100</option>
                <option value="100-250">$100 – $250</option>
                <option value="250+">$250+</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                Needed By
              </label>
              <input
                type="date"
                value={form.deadline}
                onChange={(e) => update("deadline", e.target.value)}
                className={input}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 bg-gradient-to-r from-indigo to-cyan text-white font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {submitting ? "Submitting..." : "Submit Quote Request"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function QuotePage() {
  return (
    <AuthGate>
      <QuoteForm />
    </AuthGate>
  );
}
