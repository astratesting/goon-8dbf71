"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createSupabaseClient } from "@/frontend/app/lib/db";
import type { Session } from "@supabase/supabase-js";

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const supabase = createSupabaseClient();
    supabase.auth.getSession().then(({ data: { session: s } }) => setSession(s));
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => subscription.unsubscribe();
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-ink/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo to-cyan flex items-center justify-center">
              <span className="text-white font-bold font-mono text-sm">G</span>
            </div>
            <span className="font-heading font-bold text-xl text-white group-hover:text-cyan transition-colors">
              Goon
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-zinc-400 hover:text-white transition-colors font-medium"
              >
                {link.label}
              </a>
            ))}

            {session ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-sm text-zinc-400 hover:text-white transition-colors font-medium"
                >
                  Dashboard
                </Link>
                <Link
                  href="/upload"
                  className="px-4 py-2 bg-gradient-to-r from-indigo to-cyan text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity"
                >
                  Upload Design
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/auth/signin"
                  className="text-sm text-zinc-400 hover:text-white transition-colors font-medium"
                >
                  Login
                </Link>
                <Link
                  href="/auth/signup"
                  className="px-4 py-2 bg-gradient-to-r from-indigo to-cyan text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-zinc-400 hover:text-white"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2 text-zinc-400 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}

            {session ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 text-zinc-400 hover:text-white transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  href="/upload"
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 text-cyan font-semibold"
                >
                  Upload Design
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/auth/signin"
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 text-zinc-400 hover:text-white transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/auth/signup"
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 text-cyan font-semibold"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
