import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Goon — Custom 3D Printing for Makers",
  description:
    "Describe it, sketch it, print it. Goon is a custom 3D printing service for hobbyists, tabletop gamers, and cosplayers. No minimum orders, guided co-creation, fast local fulfillment.",
  keywords: [
    "3D printing",
    "custom 3D prints",
    "tabletop gaming",
    "miniatures",
    "cosplay props",
    "hobbyist maker",
  ],
  openGraph: {
    title: "Goon — Custom 3D Printing for Makers",
    description:
      "Describe it, sketch it, print it. No minimum orders. Guided co-creation. Fast local fulfillment.",
    type: "website",
    siteName: "Goon",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-ink antialiased">{children}</body>
    </html>
  );
}
