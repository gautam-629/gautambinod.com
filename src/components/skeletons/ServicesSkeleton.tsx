import { Skeleton } from "./Skeleton";

export function ServicesOverviewSkeleton() {
  return (
    <section className="py-24">
      <div className="container">
        <div className="text-center mb-12">
          <Skeleton className="h-4 w-20 mx-auto mb-2" />
          <Skeleton className="h-9 w-48 mx-auto mb-3" />
          <Skeleton className="h-4 w-80 max-w-full mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="p-6 rounded-xl border border-border/50 bg-card flex flex-col gap-3">
              <Skeleton className="w-12 h-12 rounded-xl" />
              <Skeleton className="h-5 w-2/3" />
              <Skeleton className="h-3.5 w-full" />
              <Skeleton className="h-3.5 w-4/5" />
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/40">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Full detail-card version used on the /services page itself */
export function ServicesListSkeleton() {
  return (
    <div className="space-y-8">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="grid grid-cols-1 lg:grid-cols-5 gap-8 rounded-2xl border border-border/50 bg-card p-8"
        >
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center gap-3">
              <Skeleton className="w-12 h-12 rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-3.5 w-32" />
              </div>
            </div>
            <Skeleton className="h-3.5 w-full" />
            <Skeleton className="h-3.5 w-5/6" />
            <Skeleton className="h-3.5 w-3/4" />
            <div className="flex gap-3 mt-4">
              <Skeleton className="h-10 w-32 rounded-md" />
              <Skeleton className="h-10 w-24 rounded-md" />
            </div>
          </div>
          <div className="lg:col-span-2 space-y-4">
            <Skeleton className="h-4 w-32" />
            {Array.from({ length: 4 }).map((_, j) => (
              <Skeleton key={j} className="h-3.5 w-full" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
