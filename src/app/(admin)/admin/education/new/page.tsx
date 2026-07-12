import { createEducation } from "@/actions/education.actions";
import { AlertCircle } from "lucide-react";

export const metadata = { title: "Add Education | Admin" };

export default async function NewEducationPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="max-w-xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Add Education</h1>
        <p className="text-muted-foreground text-sm mt-1">Add a school, university, or program</p>
      </div>
      {error && (
        <div className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
          {error}
        </div>
      )}
      <form action={createEducation} className="rounded-xl border border-border/50 bg-card p-6 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium mb-1.5">Institution *</label>
            <input name="institution" required placeholder="Tribhuvan University"
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Degree *</label>
            <input name="degree" required placeholder="BCA"
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Field of Study</label>
            <input name="fieldOfStudy" placeholder="Bachelor of Computer Applications"
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Start Date *</label>
            <input name="startDate" type="date" required
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">End Date</label>
            <input name="endDate" type="date"
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            <p className="text-xs text-muted-foreground mt-1">Leave blank if currently studying</p>
          </div>
        </div>

        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" name="current" className="rounded" />
          <span className="text-sm">Currently studying here</span>
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium mb-1.5">Grade / GPA</label>
            <input name="grade" placeholder="3.8 GPA, First Class, etc."
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Display Order</label>
            <input name="displayOrder" type="number" defaultValue="0"
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Logo URL</label>
          <input name="logo" placeholder="https://res.cloudinary.com/..."
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Website URL</label>
          <input name="websiteUrl" type="url" placeholder="https://university.edu"
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Description</label>
          <textarea name="description" rows={3} placeholder="Notable coursework, achievements, activities..."
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-y" />
        </div>

        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" name="isActive" defaultChecked className="rounded" />
          <span className="text-sm">Show on About page</span>
        </label>

        <div className="flex gap-3 pt-2">
          <button type="submit"
            className="flex-1 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
            Add Education
          </button>
          <a href="/admin/education"
            className="rounded-md border border-border px-5 py-3 text-sm font-medium hover:bg-accent transition-colors">
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}
