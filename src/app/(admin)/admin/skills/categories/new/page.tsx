import { createSkillCategory } from "@/actions/skills.actions";
import { AlertCircle } from "lucide-react";

export const metadata = { title: "New Skill Category | Admin" };

export default async function NewSkillCategoryPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="max-w-sm space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Add Skill Category</h1>
        <p className="text-muted-foreground text-sm mt-1">Group skills by technology area</p>
      </div>
      {error && (
        <div className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
          {error}
        </div>
      )}
      <form action={createSkillCategory} className="rounded-xl border border-border/50 bg-card p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1.5">Category Name *</label>
          <input name="name" required placeholder="Frontend"
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Icon Name</label>
          <input name="icon" placeholder="Monitor, Server, Database..."
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          <p className="text-xs text-muted-foreground mt-1">Lucide icon name</p>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Display Order</label>
          <input name="displayOrder" type="number" defaultValue="0"
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" name="isActive" defaultChecked className="rounded" />
          <span className="text-sm">Active</span>
        </label>
        <div className="flex gap-3 pt-2">
          <button type="submit"
            className="flex-1 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
            Create Category
          </button>
          <a href="/admin/skills"
            className="rounded-md border border-border px-5 py-3 text-sm font-medium hover:bg-accent transition-colors">
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}
