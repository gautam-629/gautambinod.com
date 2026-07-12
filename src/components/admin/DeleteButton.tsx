"use client";

import { Trash2, Loader2 } from "lucide-react";
import { useCallback, useRef, useTransition } from "react";
import { useToast } from "@/components/ui/Toast";
import type { ActionResult } from "@/types";

interface Props {
  /**
   * Server action bound with the record id. May return void (legacy actions)
   * or ActionResult (preferred — enables success/error toasts with real
   * messages instead of a generic confirm()-only flow).
   */
  action: () => Promise<ActionResult | void>;
  /** What this item is called, used in the confirm dialog and toasts, e.g. "project" */
  itemLabel?: string;
  /** Confirmation dialog message override */
  confirmMessage?: string;
  /** Optional className override for the button */
  className?: string;
  /**
   * Override the past-tense verb used in toasts when this button performs
   * something other than a true delete (e.g. "unsubscribed" rather than
   * "deleted" for a newsletter opt-out that just flips a flag).
   */
  successVerb?: string;
  /** Override the gerund used in the loading toast, e.g. "Unsubscribing" */
  loadingVerb?: string;
  /** Override the infinitive used in error toasts, e.g. "unsubscribe" */
  errorVerb?: string;
}

/**
 * Client Component wrapper for delete actions. Event handlers (onClick for
 * the confirm() guard) cannot be attached to a <button> inside a Server
 * Component's <form action={...}>, so this small island isolates just the
 * interactive bit while the parent list page stays a Server Component.
 *
 * Also provides: pending spinner, double-click prevention (button disables
 * itself the instant it's clicked), and toast feedback on success/failure.
 */
export function DeleteButton({
  action,
  itemLabel = "item",
  confirmMessage,
  className = "p-1.5 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
  successVerb = "deleted",
  loadingVerb,
  errorVerb = "delete",
}: Props) {
  const { toast, updateToast } = useToast();
  const [isPending, startTransition] = useTransition();
  const submittingRef = useRef(false);

  const handleClick = useCallback(() => {
    if (submittingRef.current) return;

    const message =
      confirmMessage ??
      `Delete this ${itemLabel}? This action cannot be undone.`;
    if (!confirm(message)) return;

    submittingRef.current = true;
    const toastId = toast({
      variant: "loading",
      title: loadingVerb ? `${loadingVerb}...` : `Deleting ${itemLabel}...`,
      persistent: true,
    });

    startTransition(async () => {
      try {
        const result = await action();

        // Legacy actions return void/undefined — treat as success.
        if (result === undefined || result.success) {
          updateToast(toastId, {
            variant: "success",
            title: `${capitalize(itemLabel)} ${successVerb}`,
            description: result && "message" in result ? result.message : undefined,
            persistent: false,
          });
        } else {
          updateToast(toastId, {
            variant: "error",
            title: `Could not ${errorVerb} ${itemLabel}`,
            description: result.error,
            persistent: false,
          });
        }
      } catch (err) {
        updateToast(toastId, {
          variant: "error",
          title: `Something went wrong`,
          description: err instanceof Error ? err.message : "Please try again.",
          persistent: false,
        });
      } finally {
        submittingRef.current = false;
      }
    });
  }, [action, confirmMessage, errorVerb, itemLabel, loadingVerb, successVerb, toast, updateToast]);

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      className={className}
      aria-label={`Delete ${itemLabel}`}
      title={`Delete ${itemLabel}`}
    >
      {isPending ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
      ) : (
        <Trash2 className="h-3.5 w-3.5" />
      )}
    </button>
  );
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
