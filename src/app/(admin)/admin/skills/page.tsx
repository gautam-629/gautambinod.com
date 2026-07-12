import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Plus, Pencil } from "lucide-react";
import { deleteSkill } from "@/actions/skills.actions";
import { DeleteButton } from "@/components/admin/DeleteButton";

export const metadata = { title: "Skills | Admin" };

export default async function AdminSkillsPage() {
  const categories = await prisma.skillCategory.findMany({
    include: { skills: { orderBy: { displayOrder: "asc" } } },
    orderBy: { displayOrder: "asc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Skills</h1>
          <p className="text-muted-foreground text-sm mt-1">{categories.reduce((sum, c) => sum + c.skills.length, 0)} skills across {categories.length} categories</p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/skills/categories/new" className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-accent transition-colors">
            <Plus className="h-4 w-4" /> Category
          </Link>
          <Link href="/admin/skills/new" className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
            <Plus className="h-4 w-4" /> Add Skill
          </Link>
        </div>
      </div>

      {categories.map((category) => (
        <div key={category.id} className="rounded-xl border border-border/50 bg-card overflow-hidden">
          <div className="px-5 py-3 border-b border-border/50 bg-muted/30 flex items-center justify-between">
            <h2 className="font-semibold text-sm">{category.name}</h2>
            <span className="text-xs text-muted-foreground">{category.skills.length} skills</span>
          </div>
          <div className="divide-y divide-border/40">
            {category.skills.map((skill) => (
              <div key={skill.id} className="flex items-center justify-between px-5 py-3">
                <div className="flex items-center gap-3">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{skill.name}</span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <div className="h-1 w-24 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${skill.proficiency}%` }} />
                      </div>
                      <span className="text-xs text-muted-foreground">{skill.proficiency}%</span>
                      <span className="text-xs bg-muted px-1.5 py-0.5 rounded text-muted-foreground">{skill.level}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Link href={`/admin/skills/${skill.id}/edit`} className="p-1.5 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors">
                    <Pencil className="h-3.5 w-3.5" />
                  </Link>
                  <DeleteButton
                    action={deleteSkill.bind(null, skill.id)}
                    confirmMessage="Delete this skill? This cannot be undone."
                  />
                </div>
              </div>
            ))}
            {category.skills.length === 0 && (
              <p className="px-5 py-3 text-xs text-muted-foreground">No skills in this category yet.</p>
            )}
          </div>
        </div>
      ))}

      {categories.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <p className="mb-3">No skill categories yet</p>
          <Link href="/admin/skills/categories/new" className="text-primary hover:underline text-sm">Add your first category →</Link>
        </div>
      )}
    </div>
  );
}
