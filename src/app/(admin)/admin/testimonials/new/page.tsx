import { createTestimonial } from "@/actions/testimonials.actions";
import { AlertCircle } from "lucide-react";

export const metadata = { title: "New Testimonial | Admin" };

export default async function NewTestimonialPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="max-w-lg space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Add Testimonial</h1>
        <p className="text-muted-foreground text-sm mt-1">Add a client testimonial</p>
      </div>
      {error && (
        <div className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
          {error}
        </div>
      )}

      <form action={createTestimonial} className="rounded-xl border border-border/50 bg-card p-6 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium mb-1.5">
              Client Name <span className="text-destructive">*</span>
            </label>
            <input
              name="clientName"
              required
              placeholder="Sarah Johnson"
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Job Title</label>
            <input
              name="jobTitle"
              placeholder="CEO"
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Company</label>
            <input
              name="company"
              placeholder="TechStartup Inc."
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Rating (1-5)</label>
            <select
              name="rating"
              defaultValue="5"
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {[5, 4, 3, 2, 1].map((r) => (
                <option key={r} value={r}>
                  {"★".repeat(r)} ({r})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Photo URL</label>
          <input
            name="photo"
            placeholder="https://res.cloudinary.com/..."
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">
            Feedback <span className="text-destructive">*</span>
          </label>
          <textarea
            name="feedback"
            required
            rows={5}
            placeholder="What the client said about working with you..."
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-y"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Project Type</label>
          <input
            name="projectType"
            placeholder="SaaS Platform, E-Commerce, etc."
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
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
            Add Testimonial
          </button>
          <a
            href="/admin/testimonials"
            className="rounded-md border border-border px-5 py-3 text-sm font-medium hover:bg-accent transition-colors"
          >
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}
