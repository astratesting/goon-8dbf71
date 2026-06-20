"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isDemo = searchParams.get("demo") === "1";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Auto-login demo on mount if demo=1
  useEffect(() => {
    if (isDemo) {
      setLoading(true);
      signIn("credentials", {
        email: "demo@demo.app",
        password: "demo123",
        redirect: false,
      }).then((res) => {
        if (res?.ok) {
          router.push("/dashboard");
        } else {
          setError("Demo login failed. Please try again.");
          setLoading(false);
        }
      });
    }
  }, [isDemo, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.ok) {
      router.push("/dashboard");
    } else {
      setError("Invalid email or password.");
      setLoading(false);
    }
  };

  if (isDemo) {
    return (
      <div className="min-h-screen bg-ink flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-indigo border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-zinc-400 font-mono text-sm">Loading demo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ink flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Back to home */}
        <Link
          href="/"
          className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-8 text-sm"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Back to Goon
        </Link>

        <div className="border-glow rounded-2xl p-8">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo to-cyan flex items-center justify-center">
              <span className="text-white font-bold font-mono text-sm">G</span>
            </div>
            <span className="font-heading font-bold text-xl text-white">Goon</span>
          </div>

          <h1 className="font-heading font-bold text-2xl text-white mb-2">
            Sign in to your account
          </h1>
          <p className="text-zinc-400 text-sm mb-6">
            Access your projects, orders, and design workspace.
          </p>

          {error && (
            <div className="mb-4 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-1.5">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl bg-ink border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-indigo/50 focus:ring-1 focus:ring-indigo/50 transition-all font-mono text-sm"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-zinc-300 mb-1.5">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl bg-ink border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-indigo/50 focus:ring-1 focus:ring-indigo/50 transition-all font-mono text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-indigo to-cyan text-white font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/5">
            <p className="text-zinc-500 text-xs text-center mb-3">
              Want to explore without signing up?
            </p>
            <Link
              href="/auth/signin?demo=1"
              className="block w-full text-center py-2.5 border border-teal/30 text-teal font-medium rounded-xl hover:bg-teal/5 transition-colors text-sm"
            >
              View Live Demo
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-ink flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-indigo border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <SignInForm />
    </Suspense>
  );
}
