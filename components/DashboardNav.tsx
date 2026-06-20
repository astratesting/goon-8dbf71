"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";

interface DashboardNavProps {
  user: {
    name?: string | null;
    email?: string | null;
  };
}

export default function DashboardNav({ user }: DashboardNavProps) {
  return (
    <nav className="bg-ink/80 backdrop-blur-xl border-b border-white/5 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo to-cyan flex items-center justify-center">
                <span className="text-white font-bold font-mono text-sm">G</span>
              </div>
              <span className="font-heading font-bold text-xl text-white group-hover:text-cyan transition-colors">
                Goon
              </span>
            </Link>
            <div className="hidden sm:flex items-center gap-1">
              <Link
                href="/dashboard"
                className="px-3 py-1.5 text-sm text-white bg-white/5 rounded-lg font-medium"
              >
                Dashboard
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-indigo/20 border border-indigo/30 flex items-center justify-center">
                <span className="text-indigo font-mono text-xs font-bold">
                  {(user.name || user.email || "U")[0].toUpperCase()}
                </span>
              </div>
              <span className="text-sm text-zinc-400">{user.name || user.email}</span>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="text-sm text-zinc-500 hover:text-white transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
