import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Plus, Pencil } from "lucide-react";
import { deleteExperience } from "@/actions/experience.actions";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { formatDate } from "@/utils/format";
import { calculateDuration } from "@/utils/calculateDuration";

export const metadata = { title: "Experience | Admin" };

export default async function AdminExperiencePage() {
  const experiences = await prisma.experience.findMany({
    orderBy: [{ currentlyWorking: "desc" }, { startDate: "desc" }],
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Experience</h1>
          <p className="text-muted-foreground text-sm mt-1">{experiences.length} entries</p>
        </div>
        <Link
          href="/admin/experience/new"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4" /> Add Experience
        </Link>
      </div>

      <div className="space-y-3">
        {experiences.map((exp) => (
          <div key={exp.id} className="rounded-xl border border-border/50 bg-card p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold">{exp.jobTitle}</h3>
                  {exp.currentlyWorking && (
                    <span className="text-xs bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-2 py-0.5 rounded-full">Current</span>
                  )}
                  {exp.featured && (
                    <span className="text-xs bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 px-2 py-0.5 rounded-full">Featured</span>
                  )}
                </div>
                <p className="text-primary font-medium text-sm">{exp.companyName}</p>
                <div className="flex flex-wrap gap-2 mt-1.5">
                  <span className="text-xs text-muted-foreground">
                    {formatDate(exp.startDate)} – {exp.currentlyWorking ? "Present" : exp.endDate ? formatDate(exp.endDate) : ""}
                    {" "}({calculateDuration(exp.startDate, exp.endDate)})
                  </span>
                  <span className="text-xs bg-muted px-2 py-0.5 rounded-full text-muted-foreground">{exp.employmentType.replace("_", " ")}</span>
                  {exp.workMode && <span className="text-xs bg-muted px-2 py-0.5 rounded-full text-muted-foreground">{exp.workMode}</span>}
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <Link href={`/admin/experience/${exp.id}/edit`} className="p-1.5 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors">
                  <Pencil className="h-4 w-4" />
                </Link>
                <DeleteButton
                  action={deleteExperience.bind(null, exp.id)}
                  confirmMessage="Delete this experience entry? This cannot be undone."
                />
              </div>
            </div>
          </div>
        ))}
        {experiences.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <p className="mb-3">No experience entries yet</p>
            <Link href="/admin/experience/new" className="text-primary hover:underline text-sm">Add your first experience →</Link>
          </div>
        )}
      </div>
    </div>
  );
}
