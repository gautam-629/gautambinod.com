export default function Loading() {
  return (
    <div className="container py-16">
      <div className="space-y-8 animate-pulse">
        <div className="h-8 bg-muted rounded-md w-1/3" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-border/50 overflow-hidden">
              <div className="h-48 bg-muted" />
              <div className="p-5 space-y-3">
                <div className="h-4 bg-muted rounded w-3/4" />
                <div className="h-3 bg-muted rounded w-full" />
                <div className="h-3 bg-muted rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
