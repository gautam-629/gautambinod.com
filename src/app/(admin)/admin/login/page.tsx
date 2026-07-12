import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { LoginForm } from "@/features/auth/LoginForm";
import { Code2 } from "lucide-react";

export const metadata = { title: "Admin Login" };

export default async function AdminLoginPage() {
  // One-way check only: if already authenticated, send to dashboard.
  // Wrapped in try/catch because a JWTSessionError (mismatched/missing
  // NEXTAUTH_SECRET) should not prevent the login page from rendering —
  // the user needs to be able to reach the form to sign in and get a
  // fresh valid cookie.
  try {
    const session = await auth();
    if (session) {
      redirect("/admin/dashboard");
    }
  } catch {
    // JWTSessionError or similar — let the login form render so the
    // user can sign in and receive a new valid session cookie.
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 font-bold text-xl mb-2">
            <Code2 className="h-6 w-6 text-primary" />
            DevFolio Admin
          </div>
          <p className="text-muted-foreground text-sm">Sign in to manage your portfolio</p>
        </div>
        <div className="bg-card border border-border rounded-2xl p-8">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
