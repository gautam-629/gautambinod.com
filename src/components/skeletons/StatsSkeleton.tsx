import { Skeleton } from "./Skeleton";

export function StatsSkeleton() {
  return (
    <section className="py-16 border-y border-border/40 bg-muted/30">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="text-center">
              <Skeleton className="h-9 w-16 mx-auto mb-2" />
              <Skeleton className="h-4 w-24 mx-auto" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
