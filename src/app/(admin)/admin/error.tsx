"use client";

import { useEffect } from "react";
import { AlertCircle, RotateCcw } from "lucide-react";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Admin Error]", error);
  }, [error]);

  return (
    <div className="flex items-center justify-center h-full min-h-[400px]">
      <div className="text-center max-w-sm">
        <AlertCircle className="h-10 w-10 text-destructive mx-auto mb-3" />
        <h2 className="text-lg font-bold mb-1">Something went wrong</h2>
        <p className="text-sm text-muted-foreground mb-4">
          {error.message || "An unexpected error occurred in the admin panel."}
        </p>
        <button
          onClick={() => reset()}
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <RotateCcw className="h-3.5 w-3.5" /> Try Again
        </button>
      </div>
    </div>
  );
}
