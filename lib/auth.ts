import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Demo credentials — works without any real DB
const DEMO_USER = {
  id: "demo-user-001",
  email: "demo@demo.app",
  password: "demo123",
  name: "Demo Maker",
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // Check demo account
        if (
          credentials.email === DEMO_USER.email &&
          credentials.password === DEMO_USER.password
        ) {
          return {
            id: DEMO_USER.id,
            email: DEMO_USER.email,
            name: DEMO_USER.name,
          };
        }

        // Any other email/password combo creates a temporary session
        // (in production, this would check a real database)
        if (credentials.email.includes("@") && credentials.password.length >= 3) {
          return {
            id: `user-${Buffer.from(credentials.email).toString("base64").slice(0, 8)}`,
            email: credentials.email,
            name: credentials.email.split("@")[0],
          };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET || "goon-dev-secret-change-in-production",
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
      }
      return session;
    },
  },
};
