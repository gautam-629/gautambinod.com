import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Plus, Eye, Pencil, ExternalLink } from "lucide-react";
import { deleteProject } from "@/actions/projects.actions";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { ThumbnailCell } from "@/components/admin/ThumbnailCell";

export const metadata = { title: "Projects | Admin" };

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    include: { category: true },
    orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Projects</h1>
          <p className="text-muted-foreground text-sm mt-1">{projects.length} total projects</p>
        </div>
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4" /> Add Project
        </Link>
      </div>

      <div className="rounded-xl border border-border/50 bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50 bg-muted/30">
                <th className="text-left px-5 py-3 font-medium text-muted-foreground w-16"></th>
                <th className="text-left px-5 py-3 font-medium text-muted-foreground">Title</th>
                <th className="text-left px-5 py-3 font-medium text-muted-foreground hidden md:table-cell">Category</th>
                <th className="text-left px-5 py-3 font-medium text-muted-foreground hidden lg:table-cell">Status</th>
                <th className="text-left px-5 py-3 font-medium text-muted-foreground hidden lg:table-cell">Featured</th>
                <th className="text-left px-5 py-3 font-medium text-muted-foreground hidden md:table-cell">Views</th>
                <th className="text-right px-5 py-3 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-5 py-4">
                    <ThumbnailCell src={project.thumbnail} alt={project.title} />
                  </td>
                  <td className="px-5 py-4">
                    <div>
                      <p className="font-medium">{project.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">/{project.slug}</p>
                    </div>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                      {project.category.name}
                    </span>
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      project.status === "ACTIVE" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                      project.status === "COMPLETED" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" :
                      "bg-muted text-muted-foreground"
                    }`}>{project.status}</span>
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell">
                    {project.featured ? (
                      <span className="text-xs bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 px-2 py-0.5 rounded-full">Featured</span>
                    ) : (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell text-muted-foreground">
                    {project.viewCount}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1">
                      {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors">
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      )}
                      <Link href={`/projects/${project.slug}`} target="_blank" className="p-1.5 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors">
                        <Eye className="h-3.5 w-3.5" />
                      </Link>
                      <Link href={`/admin/projects/${project.id}/edit`} className="p-1.5 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors">
                        <Pencil className="h-3.5 w-3.5" />
                      </Link>
                      <DeleteButton
                        action={deleteProject.bind(null, project.id)}
                        itemLabel="project"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {projects.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <p className="mb-3">No projects yet</p>
              <Link href="/admin/projects/new" className="text-primary hover:underline text-sm">Add your first project →</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
