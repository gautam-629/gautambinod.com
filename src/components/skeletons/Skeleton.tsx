import { cn } from "@/lib/utils";

/**
 * Base shimmer skeleton primitive. All other skeleton components compose
 * this. Uses a CSS background-position animation (defined in globals.css)
 * rather than opacity pulsing for a more premium, "loading bar sweep" feel.
 */
export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("skeleton-shimmer rounded-md bg-muted", className)}
      {...props}
    />
  );
}
