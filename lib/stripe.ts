import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia" as any,
  typescript: true,
  appInfo: {
    name: "Goon",
    version: "1.0.0",
    url: "https://goon.dev",
  },
});

export interface Subscription {
  id: string;
  status: string;
  current_period_end: number;
  cancel_at_period_end: boolean;
  plan: {
    id: string;
    name: string;
    amount: number;
    interval: string;
  };
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount / 100);
}

export function getSubscriptionStatus(status: string): {
  label: string;
  color: string;
  bg: string;
  border: string;
} {
  switch (status) {
    case "active":
      return {
        label: "Active",
        color: "text-emerald-400",
        bg: "bg-emerald-400/10",
        border: "border-emerald-400/20",
      };
    case "past_due":
      return {
        label: "Past Due",
        color: "text-yellow-400",
        bg: "bg-yellow-400/10",
        border: "border-yellow-400/20",
      };
    case "canceled":
      return {
        label: "Canceled",
        color: "text-red-400",
        bg: "bg-red-400/10",
        border: "border-red-400/20",
      };
    case "trialing":
      return {
        label: "Trialing",
        color: "text-cyan",
        bg: "bg-cyan/10",
        border: "border-cyan/20",
      };
    default:
      return {
        label: "Inactive",
        color: "text-zinc-400",
        bg: "bg-zinc-400/10",
        border: "border-zinc-400/20",
      };
  }
}
