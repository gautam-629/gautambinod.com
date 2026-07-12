import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/common/ThemeProvider";
import { SessionProvider } from "@/components/common/SessionProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: {
    default: "DevFolio - Full Stack Developer",
    template: "%s | DevFolio",
  },
  description:
    "Full Stack Developer portfolio — React, Next.js, TypeScript, NestJS, Node.js.",
  openGraph: {
    images: [
      {
        url: "https://res.cloudinary.com/dbvr3bxyv/image/upload/v1783848445/devfolio/wd49r4qekxq4lg4sjafb.jpg",
        width: 1200,
        height: 630,
        alt: "DevFolio - Full Stack Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://res.cloudinary.com/dbvr3bxyv/image/upload/v1783848445/devfolio/wd49r4qekxq4lg4sjafb.jpg"],
  },
};

/**
 * Root layout intentionally does NOT call auth() here.
 *
 * Reasons:
 *  1. auth() throws JWTSessionError if NEXTAUTH_SECRET is missing/mismatched
 *     (common on first run before .env is configured), which would crash
 *     every page including all public routes.
 *  2. Public pages don't need session at all.
 *  3. The admin layout fetches its own session for the admin header/sidebar.
 *  4. SessionProvider without an initial session is perfectly valid — it
 *     will lazy-load the session via /api/auth/session when a client
 *     component actually calls useSession().
 */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
