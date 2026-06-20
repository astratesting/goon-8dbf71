"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseClient } from "@/frontend/app/lib/db";
import type { Session } from "@supabase/supabase-js";

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const supabase = createSupabaseClient();
    supabase.auth.getSession().then(({ data: { session } }: { data: { session: Session | null } }) => {
      if (!session) {
        router.replace("/auth/signin");
      } else {
        setReady(true);
      }
    });
  }, [router]);

  if (!ready) {
    return (
      <div className="min-h-screen bg-ink flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-indigo border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
