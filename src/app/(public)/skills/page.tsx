import { prisma } from "@/lib/prisma";

export const revalidate = 3600;

export const metadata = { title: "Skills" };

export default async function SkillsPage() {
  const categories = await prisma.skillCategory.findMany({
    where: { isActive: true },
    include: {
      skills: { where: { isActive: true }, orderBy: { displayOrder: "asc" } },
    },
    orderBy: { displayOrder: "asc" },
  });

  const levelColors: Record<string, string> = {
    BEGINNER: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
    INTERMEDIATE: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    ADVANCED: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
    EXPERT: "bg-primary/10 text-primary",
  };

  return (
    <div className="container py-16">
      <div className="max-w-2xl mb-12">
        <h1 className="text-4xl font-bold mb-4">Skills & Expertise</h1>
        <p className="text-muted-foreground text-lg">
          Technologies and tools I use to build exceptional digital experiences.
        </p>
      </div>

      <div className="space-y-12">
        {categories.map((category) => (
          <div key={category.id}>
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-primary" />
              {category.name}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.skills.map((skill) => (
                <div key={skill.id} className="p-4 rounded-xl border border-border/50 bg-card hover:border-primary/30 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold text-sm">{skill.name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${levelColors[skill.level]}`}>
                      {skill.level}
                    </span>
                  </div>
                  {/* Progress Bar */}
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-700"
                      style={{ width: `${skill.proficiency}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-1.5">
                    <span className="text-xs text-muted-foreground">{skill.proficiency}% proficiency</span>
                    {skill.yearsOfExp && (
                      <span className="text-xs text-muted-foreground">{skill.yearsOfExp}y exp</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {categories.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">No skills found.</div>
      )}
    </div>
  );
}
