import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";

// NOTE: PrismaAdapter is NOT used here because we use JWT sessions.
// With Credentials provider + JWT strategy, no database adapter is needed.

// Warn loudly at startup if the secret is missing or still a placeholder —
// this causes JWTSessionError on every auth() call, crashing pages that
// call auth(). The error shows up as "JWTSessionError" in the console.
const secret = process.env.NEXTAUTH_SECRET;
if (!secret || secret.startsWith("REPLACE_ME") || secret.includes("your-secret-here")) {
  console.error(
    "\n⛔  NEXTAUTH_SECRET is not configured!\n" +
    "   Run: openssl rand -base64 32\n" +
    "   Then add the output to your .env file as NEXTAUTH_SECRET=<value>\n" +
    "   Without this, all auth() calls will throw JWTSessionError.\n"
  );
}

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  // Required in NextAuth v5 when running behind proxies or when
  // NEXTAUTH_URL may not exactly match the request host (common in local
  // dev on different ports/hosts). Without this, auth() can silently fail
  // to read the session, which looks identical to an infinite redirect loop.
  trustHost: true,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/admin/login",
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const user = await prisma.user.findUnique({
          where: { email: parsed.data.email },
        });

        if (!user || !user.password) return null;

        const isValid = await bcrypt.compare(parsed.data.password, user.password);
        if (!isValid) return null;

        return {
          id: user.id,
          name: user.name ?? undefined,
          email: user.email,
          image: user.image ?? undefined,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { id: string; role?: string }).role ?? "ADMIN";
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        (session.user as { id: string; role?: string }).role = token.role as string;
      }
      return session;
    },
  },
});
