"use client";

import { createContext, useCallback, useContext, useRef, useState } from "react";
import { CheckCircle2, XCircle, Info, Loader2, X } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastVariant = "success" | "error" | "info" | "loading";

interface ToastItem {
  id: string;
  variant: ToastVariant;
  title: string;
  description?: string;
  /** Loading toasts stay until explicitly resolved via updateToast */
  persistent?: boolean;
}

interface ToastContextValue {
  toast: (t: Omit<ToastItem, "id">) => string;
  updateToast: (id: string, t: Partial<Omit<ToastItem, "id">>) => void;
  dismissToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const AUTO_DISMISS_MS = 4000;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const timers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    const timer = timers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timers.current.delete(id);
    }
  }, []);

  const scheduleDismiss = useCallback(
    (id: string) => {
      const existing = timers.current.get(id);
      if (existing) clearTimeout(existing);
      const timer = setTimeout(() => dismissToast(id), AUTO_DISMISS_MS);
      timers.current.set(id, timer);
    },
    [dismissToast]
  );

  const toast = useCallback(
    (t: Omit<ToastItem, "id">) => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
      setToasts((prev) => [...prev, { ...t, id }]);
      if (!t.persistent) scheduleDismiss(id);
      return id;
    },
    [scheduleDismiss]
  );

  const updateToast = useCallback(
    (id: string, t: Partial<Omit<ToastItem, "id">>) => {
      setToasts((prev) => prev.map((item) => (item.id === id ? { ...item, ...t } : item)));
      if (!t.persistent) scheduleDismiss(id);
    },
    [scheduleDismiss]
  );

  return (
    <ToastContext.Provider value={{ toast, updateToast, dismissToast }}>
      {children}
      <ToastViewport toasts={toasts} onDismiss={dismissToast} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

const variantConfig: Record<
  ToastVariant,
  { icon: React.ElementType; iconClass: string; borderClass: string }
> = {
  success: { icon: CheckCircle2, iconClass: "text-green-500", borderClass: "border-green-500/20" },
  error: { icon: XCircle, iconClass: "text-destructive", borderClass: "border-destructive/20" },
  info: { icon: Info, iconClass: "text-primary", borderClass: "border-primary/20" },
  loading: { icon: Loader2, iconClass: "text-primary animate-spin", borderClass: "border-border" },
};

function ToastViewport({
  toasts,
  onDismiss,
}: {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
}) {
  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 w-full max-w-sm pointer-events-none"
      role="region"
      aria-label="Notifications"
    >
      {toasts.map((t) => {
        const config = variantConfig[t.variant];
        const Icon = config.icon;
        return (
          <div
            key={t.id}
            role="status"
            aria-live="polite"
            className={cn(
              "pointer-events-auto flex items-start gap-3 rounded-xl border bg-card shadow-lg p-4 stream-in",
              config.borderClass
            )}
          >
            <Icon className={cn("h-5 w-5 shrink-0 mt-0.5", config.iconClass)} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{t.title}</p>
              {t.description && (
                <p className="text-xs text-muted-foreground mt-0.5">{t.description}</p>
              )}
            </div>
            <button
              onClick={() => onDismiss(t.id)}
              className="shrink-0 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Dismiss notification"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
