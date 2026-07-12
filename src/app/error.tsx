"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RotateCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
        <p className="text-muted-foreground mb-6">
          An unexpected error occurred. Please try again or return to the homepage.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <RotateCcw className="h-4 w-4" /> Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-2.5 text-sm font-medium hover:bg-accent transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
