export default function AdminLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-8 bg-muted rounded-md w-1/4" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-24 rounded-xl bg-muted" />
        ))}
      </div>
      <div className="h-64 rounded-xl bg-muted" />
    </div>
  );
}
