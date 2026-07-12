import { Skeleton } from "./Skeleton";

export function HeroSkeleton() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Skeleton className="h-5 w-24 mb-3" />
            <Skeleton className="h-12 w-full max-w-md mb-2" />
            <Skeleton className="h-12 w-3/4 max-w-sm mb-4" />
            <Skeleton className="h-6 w-full max-w-lg mb-3" />
            <Skeleton className="h-4 w-full max-w-md mb-1.5" />
            <Skeleton className="h-4 w-2/3 max-w-sm mb-8" />

            <div className="flex flex-wrap gap-4">
              <Skeleton className="h-12 w-36 rounded-md" />
              <Skeleton className="h-12 w-32 rounded-md" />
            </div>

            <div className="flex items-center gap-4 mt-8">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-5 w-5 rounded-full" />
              ))}
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <Skeleton className="w-64 h-64 sm:w-80 sm:h-80 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
