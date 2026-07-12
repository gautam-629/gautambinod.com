import { createService } from "@/actions/services.actions";
import { AlertCircle } from "lucide-react";

export const metadata = { title: "New Service | Admin" };

export default async function NewServicePage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Add Service</h1>
        <p className="text-muted-foreground text-sm mt-1">Add a service you offer</p>
      </div>
      {error && (
        <div className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
          {error}
        </div>
      )}

      <form action={createService} className="rounded-xl border border-border/50 bg-card p-6 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium mb-1.5">
              Service Title <span className="text-destructive">*</span>
            </label>
            <input
              name="title"
              required
              placeholder="Full Stack Web Development"
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Icon Name</label>
            <input
              name="icon"
              placeholder="Code, Cloud, Palette, Smartphone..."
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <p className="text-xs text-muted-foreground mt-1">Lucide icon name</p>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Starting Price</label>
            <input
              name="startingPrice"
              type="number"
              min="0"
              placeholder="2000"
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Price Unit</label>
            <input
              name="priceUnit"
              placeholder="per project, per hour, per month"
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Timeline</label>
            <input
              name="timeline"
              placeholder="2-8 weeks"
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Short Description</label>
          <input
            name="shortDesc"
            placeholder="Brief one-line description"
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">
            Full Description <span className="text-destructive">*</span>
          </label>
          <textarea
            name="description"
            required
            rows={4}
            placeholder="<p>Detailed service description...</p>"
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-ring resize-y"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Features</label>
          <textarea
            name="features"
            rows={4}
            placeholder="One feature per line"
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-y"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Deliverables</label>
          <textarea
            name="deliverables"
            rows={3}
            placeholder="One deliverable per line"
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-y"
          />
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
          <button
            type="submit"
            className="flex-1 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Add Service
          </button>
          <a
            href="/admin/services"
            className="rounded-md border border-border px-5 py-3 text-sm font-medium hover:bg-accent transition-colors"
          >
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}
