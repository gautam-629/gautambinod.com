import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Plus, Pencil } from "lucide-react";
import { deleteEducation } from "@/actions/education.actions";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { formatDate } from "@/utils/format";

export const metadata = { title: "Education | Admin" };

export default async function AdminEducationPage() {
  const education = await prisma.education.findMany({
    orderBy: { startDate: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Education</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {education.length} {education.length === 1 ? "entry" : "entries"} — shown on your About page
          </p>
        </div>
        <Link
          href="/admin/education/new"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4" /> Add Education
        </Link>
      </div>

      <div className="space-y-3">
        {education.map((edu) => (
          <div key={edu.id} className="rounded-xl border border-border/50 bg-card p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold">
                    {edu.degree}
                    {edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ""}
                  </h3>
                  {edu.current && (
                    <span className="text-xs bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-2 py-0.5 rounded-full">
                      Current
                    </span>
                  )}
                  {!edu.isActive && (
                    <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                      Hidden
                    </span>
                  )}
                </div>
                <p className="text-primary font-medium text-sm">{edu.institution}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatDate(edu.startDate)} – {edu.current ? "Present" : edu.endDate ? formatDate(edu.endDate) : ""}
                  {edu.grade ? ` · ${edu.grade}` : ""}
                </p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <Link
                  href={`/admin/education/${edu.id}/edit`}
                  className="p-1.5 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Pencil className="h-4 w-4" />
                </Link>
                <DeleteButton action={deleteEducation.bind(null, edu.id)} itemLabel="education entry" />
              </div>
            </div>
          </div>
        ))}
        {education.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <p className="mb-3">No education entries yet — this section won&apos;t show on your About page</p>
            <Link href="/admin/education/new" className="text-primary hover:underline text-sm">
              Add your first education entry →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
