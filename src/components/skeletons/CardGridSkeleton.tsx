import { Skeleton } from "./Skeleton";

interface Props {
  /** Number of cards to render */
  count?: number;
  /** Grid column config (Tailwind classes) */
  cols?: string;
  /** Card image/thumbnail height */
  imageHeight?: string;
  /** Show a category + status badge row above title */
  showBadges?: boolean;
  /** Show a price row at the bottom (for product cards) */
  showPrice?: boolean;
  /** Show tag pills below description */
  showTags?: boolean;
}

/**
 * Generic card-grid skeleton used by Projects, Products, and Blog listing
 * pages — each card mirrors the real card's structure (image, badges,
 * title, description lines, footer) so the layout doesn't jump on hydration.
 */
export function CardGridSkeleton({
  count = 6,
  cols = "md:grid-cols-2 lg:grid-cols-3",
  imageHeight = "h-48",
  showBadges = true,
  showPrice = false,
  showTags = true,
}: Props) {
  return (
    <div className={`grid grid-cols-1 ${cols} gap-6`}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="rounded-xl border border-border/50 bg-card overflow-hidden flex flex-col"
        >
          <Skeleton className={`${imageHeight} w-full rounded-none`} />
          <div className="p-5 flex flex-col flex-1 gap-3">
            {showBadges && (
              <div className="flex items-center justify-between">
                <Skeleton className="h-3.5 w-16" />
                <Skeleton className="h-4 w-14 rounded-full" />
              </div>
            )}
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-3.5 w-full" />
            <Skeleton className="h-3.5 w-5/6" />
            {showTags && (
              <div className="flex gap-1.5 mt-1">
                <Skeleton className="h-5 w-14 rounded-md" />
                <Skeleton className="h-5 w-16 rounded-md" />
                <Skeleton className="h-5 w-12 rounded-md" />
              </div>
            )}
            {showPrice && (
              <div className="flex items-center justify-between mt-auto pt-3 border-t border-border/50">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-8 w-8 rounded-md" />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
