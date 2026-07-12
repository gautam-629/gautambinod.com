import { Skeleton } from "./Skeleton";

interface Props {
  count?: number;
  /** Section wrapper (home page) vs bare grid (testimonials page) */
  asSection?: boolean;
}

export function TestimonialsSkeleton({ count = 6, asSection = true }: Props) {
  const grid = (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="p-6 rounded-xl border border-border/50 bg-card flex flex-col gap-4">
          <Skeleton className="h-8 w-8 rounded" />
          <Skeleton className="h-3.5 w-full" />
          <Skeleton className="h-3.5 w-full" />
          <Skeleton className="h-3.5 w-2/3" />
          <div className="flex items-center gap-3 pt-4 border-t border-border/40 mt-auto">
            <Skeleton className="w-10 h-10 rounded-full shrink-0" />
            <div className="space-y-1.5 flex-1">
              <Skeleton className="h-3.5 w-24" />
              <Skeleton className="h-3 w-32" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  if (!asSection) return grid;

  return (
    <section className="py-24 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <Skeleton className="h-4 w-24 mx-auto mb-2" />
          <Skeleton className="h-9 w-56 mx-auto" />
        </div>
        {grid}
      </div>
    </section>
  );
}
