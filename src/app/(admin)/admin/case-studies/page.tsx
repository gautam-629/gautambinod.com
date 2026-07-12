import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Plus, Pencil, Eye } from "lucide-react";
import { deleteCaseStudy } from "@/actions/case-studies.actions";
import { DeleteButton } from "@/components/admin/DeleteButton";

export const metadata = { title: "Case Studies | Admin" };

export default async function AdminCaseStudiesPage() {
  const caseStudies = await prisma.caseStudy.findMany({
    orderBy: [{ featured: "desc" }, { displayOrder: "asc" }],
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Case Studies</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {caseStudies.length} case studies
          </p>
        </div>
        <Link
          href="/admin/case-studies/new"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4" /> Add Case Study
        </Link>
      </div>

      <div className="rounded-xl border border-border/50 bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50 bg-muted/30">
                <th className="text-left px-5 py-3 font-medium text-muted-foreground">
                  Title
                </th>
                <th className="text-left px-5 py-3 font-medium text-muted-foreground hidden md:table-cell">
                  Client
                </th>
                <th className="text-left px-5 py-3 font-medium text-muted-foreground hidden lg:table-cell">
                  Industry
                </th>
                <th className="text-left px-5 py-3 font-medium text-muted-foreground hidden lg:table-cell">
                  Featured
                </th>
                <th className="text-right px-5 py-3 font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {caseStudies.map((cs) => (
                <tr
                  key={cs.id}
                  className="hover:bg-muted/20 transition-colors"
                >
                  <td className="px-5 py-4">
                    <div>
                      <p className="font-medium line-clamp-1">{cs.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        /{cs.slug}
                      </p>
                    </div>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell text-muted-foreground">
                    {cs.clientName ?? "—"}
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell">
                    {cs.industry ? (
                      <span className="text-xs bg-muted px-2 py-0.5 rounded-full text-muted-foreground">
                        {cs.industry}
                      </span>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell">
                    {cs.featured ? (
                      <span className="text-xs bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 px-2 py-0.5 rounded-full">
                        Featured
                      </span>
                    ) : (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/case-studies/${cs.slug}`}
                        target="_blank"
                        className="p-1.5 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </Link>
                      <Link
                        href={`/admin/case-studies/${cs.id}/edit`}
                        className="p-1.5 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </Link>
                      <DeleteButton
                        action={deleteCaseStudy.bind(null, cs.id)}
                        confirmMessage="Delete this case study? This cannot be undone."
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {caseStudies.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <p className="mb-3">No case studies yet</p>
              <Link
                href="/admin/case-studies/new"
                className="text-primary hover:underline text-sm"
              >
                Add your first case study →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
