"use client";

import { useTransition } from "react";
import { useToast } from "@/components/ui/Toast";
import type { ActionResult } from "@/types";

interface Option {
  value: string;
  label: string;
}

interface Props {
  /**
   * Server action bound with the record id. May return void (legacy actions)
   * or ActionResult — when ActionResult is returned, failures show a toast
   * with a real error message instead of failing silently.
   */
  action: (formData: FormData) => Promise<ActionResult | void>;
  name: string;
  defaultValue: string;
  options: Option[];
  className?: string;
}

/**
 * Auto-submitting status <select> for admin tables (orders, leads, requests).
 * Wraps the select + its single-field FormData submission so the parent
 * list page can remain a Server Component — onChange handlers cannot be
 * attached to elements rendered by a Server Component directly.
 */
export function StatusSelect({
  action,
  name,
  defaultValue,
  options,
  className = "text-xs border border-border rounded-md px-2 py-1 bg-background focus:outline-none focus:ring-1 focus:ring-ring disabled:opacity-50",
}: Props) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const formData = new FormData();
    formData.set(name, e.target.value);
    startTransition(async () => {
      try {
        const result = await action(formData);
        if (result && !result.success) {
          toast({
            variant: "error",
            title: "Couldn't update status",
            description: result.error,
          });
        }
      } catch (err) {
        toast({
          variant: "error",
          title: "Couldn't update status",
          description: err instanceof Error ? err.message : "Please try again.",
        });
      }
    });
  };

  return (
    <select
      name={name}
      defaultValue={defaultValue}
      onChange={handleChange}
      disabled={isPending}
      className={className}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
