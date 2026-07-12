"use client";

import { useRouter } from "next/navigation";
import { useCallback, useRef, useTransition } from "react";
import { useToast } from "@/components/ui/Toast";
import type { ActionResult } from "@/types";

export type { ActionResult };

interface Options {
  /** Toast title shown immediately while the action is in flight */
  loadingMessage: string;
  /** Toast title shown on success */
  successMessage: string;
  /** Optional toast description on success */
  successDescription?: string;
  /** Fallback error toast title if the action doesn't return one */
  errorMessage?: string;
  /** Called after a successful action, before any redirect */
  onSuccess?: () => void;
}

/**
 * Wraps a server action that returns ActionResult with:
 *  - pending state (for disabling buttons / showing spinners)
 *  - double-submit prevention (ignores calls while already pending)
 *  - toast feedback (loading -> success/error)
 *  - client-side redirect on success (avoids the server action throwing
 *    NEXT_REDIRECT, which would prevent us from showing a result toast)
 */
export function useFormAction(
  action: (formData: FormData) => Promise<ActionResult>,
  options: Options
) {
  const router = useRouter();
  const { toast, updateToast } = useToast();
  const [isPending, startTransition] = useTransition();
  const submittingRef = useRef(false);

  const submit = useCallback(
    (formData: FormData) => {
      // Double-submit guard: ignore additional calls while one is in flight.
      if (submittingRef.current) return;
      submittingRef.current = true;

      const toastId = toast({
        variant: "loading",
        title: options.loadingMessage,
        persistent: true,
      });

      startTransition(async () => {
        try {
          const result = await action(formData);

          if (result.success) {
            updateToast(toastId, {
              variant: "success",
              title: options.successMessage,
              description: result.message ?? options.successDescription,
              persistent: false,
            });
            options.onSuccess?.();
            if (result.redirectTo) {
              router.push(result.redirectTo);
              router.refresh();
            }
          } else {
            updateToast(toastId, {
              variant: "error",
              title: options.errorMessage ?? "Something went wrong",
              description: result.error,
              persistent: false,
            });
          }
        } catch (err) {
          updateToast(toastId, {
            variant: "error",
            title: options.errorMessage ?? "Something went wrong",
            description: err instanceof Error ? err.message : "Please try again.",
            persistent: false,
          });
        } finally {
          submittingRef.current = false;
        }
      });
    },
    [action, options, router, toast, updateToast]
  );

  return { submit, isPending };
}
