"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Loader2 } from "lucide-react";

export function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Let NextAuth handle the redirect natively. This performs a full
      // navigation after the session cookie is confirmed set server-side,
      // which avoids the client/server session race that causes redirect loops.
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (!result || result.error) {
        setError("Invalid email or password.");
        setLoading(false);
        return;
      }

      // Full page navigation (not router.push) so the new session cookie
      // is picked up by middleware on the very next request.
      window.location.href = callbackUrl;
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1.5">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="gautambinod629@gmail.com"
          required
          autoComplete="email"
          className={inputClass}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1.5">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
          autoComplete="current-password"
          className={inputClass}
        />
      </div>
      {error && (
        <p className="text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-md">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={loading}
        className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-60 transition-colors"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Signing in...
          </>
        ) : (
          "Sign In"
        )}
      </button>
      <p className="text-xs text-center text-muted-foreground">
        Default: gautambinod629@gmail.com / admin123
      </p>
    </form>
  );
}
