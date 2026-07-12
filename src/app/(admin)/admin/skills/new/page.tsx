import { prisma } from "@/lib/prisma";
import { createSkill } from "@/actions/skills.actions";
import { AlertCircle } from "lucide-react";

export const metadata = { title: "New Skill | Admin" };

export default async function NewSkillPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const categories = await prisma.skillCategory.findMany({
    where: { isActive: true },
    orderBy: { displayOrder: "asc" },
  });

  return (
    <div className="max-w-lg space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Add Skill</h1>
        <p className="text-muted-foreground text-sm mt-1">Add a skill to your profile</p>
      </div>

      {error && (
        <div className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
          {error}
        </div>
      )}

      <form action={createSkill} className="rounded-xl border border-border/50 bg-card p-6 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium mb-1.5">
              Skill Name <span className="text-destructive">*</span>
            </label>
            <input
              name="name"
              required
              placeholder="React"
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">
              Category <span className="text-destructive">*</span>
            </label>
            <select
              name="categoryId"
              required
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Level</label>
            <select
              name="level"
              defaultValue="INTERMEDIATE"
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="BEGINNER">Beginner</option>
              <option value="INTERMEDIATE">Intermediate</option>
              <option value="ADVANCED">Advanced</option>
              <option value="EXPERT">Expert</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">
              Proficiency (0–100)
            </label>
            <input
              name="proficiency"
              type="number"
              min="0"
              max="100"
              defaultValue="80"
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">
              Years of Experience
            </label>
            <input
              name="yearsOfExp"
              type="number"
              min="0"
              step="0.5"
              placeholder="3"
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">
              Display Order
            </label>
            <input
              name="displayOrder"
              type="number"
              defaultValue="0"
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Logo URL</label>
          <input
            name="logo"
            placeholder="https://res.cloudinary.com/..."
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="featured" className="rounded" />
            <span className="text-sm">Featured (shown on About)</span>
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
            Add Skill
          </button>
          <a
            href="/admin/skills"
            className="rounded-md border border-border px-5 py-3 text-sm font-medium hover:bg-accent transition-colors"
          >
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}
