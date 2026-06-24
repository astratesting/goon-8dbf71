"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import DashboardNav from "@/components/DashboardNav";
import { getSubscriptionStatus } from "@/lib/stripe";

interface SubscriptionData {
  status: string;
  current_period_end: number;
  cancel_at_period_end: boolean;
  plan: {
    name: string;
    amount: number;
    interval: string;
  };
}

export default function SubscriptionPage() {
  const { data: session, status: sessionStatus } = useSession();
  const [loading, setLoading] = useState(false);
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);

  if (sessionStatus === "loading") {
    return (
      <div className="min-h-screen bg-[#0A0A0F]">
        <DashboardNav user={{}} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-center h-64">
            <div className="border-2 border-indigo border-t-transparent rounded-full animate-spin w-8 h-8" />
          </div>
        </div>
      </div>
    );
  }

  if (sessionStatus === "unauthenticated" || !session?.user) {
    return null;
  }

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID,
          userId: (session.user as Record<string, unknown>).id || "",
          email: (session.user as any).email || "",
        }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else if (data.error) {
        console.error("Checkout error:", data.error);
      }
    } catch (error) {
      console.error("Failed to create checkout session:", error);
    } finally {
      setLoading(false);
    }
  };

  const statusInfo = subscription
    ? getSubscriptionStatus(subscription.status)
    : null;

  return (
    <div className="min-h-screen bg-[#0A0A0F]">
      <DashboardNav user={(session?.user as any) || {}} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-heading font-bold text-3xl text-white mb-2">
            Subscription
          </h1>
          <p className="text-zinc-400">
            Manage your Goon Pro subscription and billing.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Current Plan */}
          <div className="lg:col-span-2">
            <div className="border-glow rounded-2xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading font-semibold text-xl text-white">
                  Current Plan
                </h2>
                {statusInfo && (
                  <span
                    className={`px-3 py-1 text-xs font-mono font-semibold rounded-full ${statusInfo.color} ${statusInfo.bg} border ${statusInfo.border}`}
                  >
                    {statusInfo.label}
                  </span>
                )}
              </div>

              {subscription ? (
                <div className="space-y-6">
                  <div className="flex items-baseline gap-3">
                    <span className="font-heading font-bold text-4xl text-white">
                      {subscription.plan.name}
                    </span>
                    <span className="text-zinc-400 text-sm">
                      ${subscription.plan.amount / 100}/{subscription.plan.interval}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 rounded-xl p-4">
                      <p className="text-zinc-500 text-xs font-mono mb-1">
                        Next Billing Date
                      </p>
                      <p className="text-white font-mono text-sm">
                        {new Date(
                          subscription.current_period_end * 1000
                        ).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4">
                      <p className="text-zinc-500 text-xs font-mono mb-1">
                        Auto-Renew
                      </p>
                      <p className="text-white font-mono text-sm">
                        {subscription.cancel_at_period_end
                          ? "Disabled"
                          : "Enabled"}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-zinc-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                      />
                    </svg>
                  </div>
                  <p className="text-zinc-400 mb-1">No active subscription</p>
                  <p className="text-zinc-500 text-sm">
                    Subscribe to Goon Pro to unlock unlimited projects and
                    priority processing.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Goon Pro Card */}
          <div className="border-2 border-indigo/50 bg-indigo/5 glow-indigo rounded-2xl p-8 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-indigo text-white text-xs font-mono font-semibold rounded-full">
              Pro
            </div>

            <h3 className="font-heading font-semibold text-xl text-white mb-2">
              Goon Pro
            </h3>
            <p className="text-zinc-400 text-sm mb-6">
              Full access to all features, priority queue, and unlimited
              projects.
            </p>

            <div className="mb-6">
              <span className="font-heading font-bold text-4xl text-white">
                $19.99
              </span>
              <span className="text-zinc-500 text-sm ml-1">/month</span>
            </div>

            <ul className="space-y-3 mb-8">
              {[
                "Unlimited projects",
                "Priority print queue",
                "Advanced agent fleet",
                "Custom materials & finishes",
                "Real-time progress tracking",
                "Dedicated support",
              ].map((feature, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-zinc-300"
                >
                  <svg
                    className="w-5 h-5 text-[#00E5FF] shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>

            <button
              onClick={handleSubscribe}
              disabled={loading || !!subscription}
              className={`w-full py-3 rounded-xl font-semibold text-sm transition-opacity ${
                subscription
                  ? "bg-white/5 text-zinc-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-indigo to-cyan text-white hover:opacity-90"
              }`}
            >
              {loading
                ? "Redirecting..."
                : subscription
                  ? "Already Subscribed"
                  : "Subscribe Now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
