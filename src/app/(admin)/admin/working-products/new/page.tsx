import { createWorkingProduct } from "@/actions/working-products.actions";
import { AlertCircle } from "lucide-react";

export const metadata = { title: "New Pipeline Product | Admin" };

export default async function NewWorkingProductPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Add Pipeline Product</h1>
        <p className="text-muted-foreground text-sm mt-1">Showcase what you're currently building</p>
      </div>
      {error && (
        <div className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
          {error}
        </div>
      )}
      <form action={createWorkingProduct} className="rounded-xl border border-border/50 bg-card p-6 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium mb-1.5">Product Name *</label>
            <input name="name" required placeholder="DevFolio Pro"
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Status</label>
            <select name="status" defaultValue="UNDER_DEVELOPMENT"
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
              <option value="UNDER_DEVELOPMENT">Under Development</option>
              <option value="COMING_SOON">Coming Soon</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Progress (0-100)</label>
            <input name="progress" type="number" min="0" max="100" defaultValue="0"
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Tagline</label>
          <input name="tagline" placeholder="The ultimate developer portfolio"
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Description</label>
          <textarea name="description" rows={3} placeholder="Brief description of what you're building..."
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-y" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Thumbnail URL</label>
          <input name="thumbnail" placeholder="https://res.cloudinary.com/..."
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium mb-1.5">Current Milestone</label>
            <input name="currentMilestone" placeholder="Admin Panel Development"
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Expected Launch Date</label>
            <input name="launchDate" type="date"
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Tech Stack (comma-separated)</label>
          <input name="techStack" placeholder="Next.js, TypeScript, PostgreSQL"
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Planned Features (one per line)</label>
          <textarea name="features" rows={5} placeholder="User authentication&#10;Dashboard&#10;Payment integration"
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-y" />
        </div>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="featured" className="rounded" />
            <span className="text-sm">Featured</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="isActive" defaultChecked className="rounded" />
            <span className="text-sm">Active</span>
          </label>
        </div>
        <div className="flex gap-3 pt-2">
          <button type="submit"
            className="flex-1 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
            Add to Pipeline
          </button>
          <a href="/admin/working-products"
            className="rounded-md border border-border px-5 py-3 text-sm font-medium hover:bg-accent transition-colors">
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}
