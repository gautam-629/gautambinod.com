import { Skeleton } from "./Skeleton";

/** Project / Case Study detail page skeleton (hero image + 2-col content) */
export function ProjectDetailSkeleton() {
  return (
    <div className="container py-16 max-w-4xl mx-auto">
      <Skeleton className="h-4 w-32 mb-8" />
      <Skeleton className="h-72 sm:h-96 w-full rounded-2xl mb-8" />

      <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-16 rounded-full" />
          </div>
          <Skeleton className="h-9 w-72" />
          <Skeleton className="h-4 w-56" />
        </div>
        <div className="flex gap-3">
          <Skeleton className="h-10 w-32 rounded-md" />
          <Skeleton className="h-10 w-32 rounded-md" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <div className="space-y-4">
          <div className="p-5 rounded-xl border border-border/50 space-y-3">
            <Skeleton className="h-4 w-24" />
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-6 w-16 rounded-md" />
              <Skeleton className="h-6 w-20 rounded-md" />
              <Skeleton className="h-6 w-14 rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Product detail page skeleton (gallery + sticky purchase sidebar) */
export function ProductDetailSkeleton() {
  return (
    <div className="container py-16 max-w-6xl mx-auto">
      <Skeleton className="h-4 w-32 mb-8" />
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3 space-y-8">
          <Skeleton className="h-72 sm:h-96 w-full rounded-2xl" />
          <div className="grid grid-cols-4 gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-20 w-full rounded-lg" />
            ))}
          </div>
          <div className="space-y-3">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="p-6 rounded-2xl border border-border/50 space-y-5">
            <div className="space-y-2">
              <Skeleton className="h-3.5 w-20" />
              <Skeleton className="h-7 w-48" />
              <Skeleton className="h-4 w-full" />
            </div>
            <Skeleton className="h-9 w-32" />
            <div className="space-y-3">
              <Skeleton className="h-11 w-full rounded-md" />
              <Skeleton className="h-11 w-full rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
