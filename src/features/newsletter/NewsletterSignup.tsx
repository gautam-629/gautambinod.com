"use client";

import { useState } from "react";
import { Loader2, CheckCircle, Mail } from "lucide-react";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setError(null);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = (await res.json()) as { error?: string };

      if (!res.ok) {
        throw new Error(data.error ?? "Subscription failed");
      }

      setStatus("success");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  if (status === "success") {
    return (
      <div className="flex items-center justify-center gap-2 text-sm text-green-600 dark:text-green-400">
        <CheckCircle className="h-5 w-5" />
        You&apos;re subscribed! We&apos;ll notify you at launch.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
      <div className="relative flex-1">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="w-full rounded-md border border-input bg-background pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-60 transition-colors shrink-0"
      >
        {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : "Notify Me"}
      </button>
      {error && <p className="text-xs text-destructive sm:absolute sm:mt-12">{error}</p>}
    </form>
  );
}
