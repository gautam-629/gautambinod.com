import { createCaseStudy } from "@/actions/case-studies.actions";
import { AlertCircle } from "lucide-react";

export const metadata = { title: "New Case Study | Admin" };

export default async function NewCaseStudyPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Add Case Study</h1>
        <p className="text-muted-foreground text-sm mt-1">Document a detailed project story</p>
      </div>
      {error && (
        <div className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
          {error}
        </div>
      )}
      <form action={createCaseStudy} className="rounded-xl border border-border/50 bg-card p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1.5">Title *</label>
          <input name="title" required placeholder="How We Built a 10x Faster E-Commerce Platform"
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium mb-1.5">Client Name</label>
            <input name="clientName" placeholder="Acme Corp"
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Industry</label>
            <input name="industry" placeholder="E-Commerce, FinTech, Healthcare..."
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Featured Image URL</label>
          <input name="featuredImage" placeholder="https://res.cloudinary.com/..."
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Problem Statement *</label>
          <textarea name="problem" required rows={4} placeholder="Describe the client's challenge..."
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-y" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Solution *</label>
          <textarea name="solution" required rows={4} placeholder="How did you solve it?"
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-y" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Development Process *</label>
          <textarea name="process" required rows={4} placeholder="How did the project unfold?"
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-y" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Outcome *</label>
          <textarea name="outcome" required rows={3} placeholder="What were the measurable results?"
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-y" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Technologies (comma-separated)</label>
          <input name="technologies" placeholder="React, Node.js, AWS"
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
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
            Create Case Study
          </button>
          <a href="/admin/case-studies"
            className="rounded-md border border-border px-5 py-3 text-sm font-medium hover:bg-accent transition-colors">
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}
