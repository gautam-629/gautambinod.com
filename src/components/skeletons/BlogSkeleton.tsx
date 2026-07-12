import { Skeleton } from "./Skeleton";

export function LatestBlogsSkeleton() {
  return (
    <section className="py-24">
      <div className="container">
        <div className="flex items-end justify-between mb-12">
          <div>
            <Skeleton className="h-4 w-16 mb-2" />
            <Skeleton className="h-9 w-48" />
          </div>
          <Skeleton className="h-4 w-20 hidden md:block" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-border/50 bg-card overflow-hidden">
              <Skeleton className="h-44 w-full rounded-none" />
              <div className="p-5 space-y-2.5">
                <Skeleton className="h-3 w-32" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-3.5 w-5/6" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Featured + grid layout used on the /blog listing page */
export function BlogListingSkeleton() {
  return (
    <>
      {/* Featured post */}
      <div className="rounded-2xl border border-border/50 bg-card overflow-hidden mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <Skeleton className="h-64 md:h-auto w-full rounded-none" />
          <div className="p-8 space-y-3">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-7 w-full" />
            <Skeleton className="h-7 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-3 w-40 mt-2" />
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-border/50 bg-card overflow-hidden">
            <Skeleton className="h-44 w-full rounded-none" />
            <div className="p-5 space-y-2.5">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-3.5 w-5/6" />
              <Skeleton className="h-3 w-28 mt-1" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/** Single blog post detail skeleton */
export function BlogDetailSkeleton() {
  return (
    <div className="container py-16 max-w-3xl mx-auto">
      <Skeleton className="h-4 w-32 mb-8" />
      <div className="mb-8 space-y-4">
        <div className="flex items-center gap-3">
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-20" />
        </div>
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-2/3" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-5/6" />
      </div>
      <Skeleton className="h-64 sm:h-80 w-full rounded-2xl mb-10" />
      <div className="space-y-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className={`h-4 ${i % 3 === 2 ? "w-2/3" : "w-full"}`} />
        ))}
      </div>
    </div>
  );
}
