import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateProject } from "@/actions/projects.actions";
import { toStringArray } from "@/types";
import { ProjectForm } from "@/features/admin/projects/ProjectForm";

interface Props { params: Promise<{ id: string }> }
export const metadata = { title: "Edit Project | Admin" };

export default async function EditProjectPage({ params }: Props) {
  const { id } = await params;
  const [project, categories] = await Promise.all([
    prisma.project.findUnique({ where: { id } }),
    prisma.projectCategory.findMany({ where: { isActive: true }, orderBy: { displayOrder: "asc" } }),
  ]);

  if (!project) notFound();
  const action = updateProject.bind(null, project.id);

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Edit Project</h1>
        <p className="text-muted-foreground text-sm mt-1">{project.title}</p>
      </div>

      <ProjectForm
        categories={categories}
        action={action}
        mode="edit"
        defaultValues={{
          title: project.title,
          slug: project.slug,
          categoryId: project.categoryId,
          status: project.status,
          shortDescription: project.shortDescription,
          description: project.description,
          thumbnail: project.thumbnail,
          demoVideo: project.demoVideo,
          liveUrl: project.liveUrl,
          githubUrl: project.githubUrl,
          technologies: toStringArray(project.technologies),
          features: toStringArray(project.features),
          challenges: toStringArray(project.challenges),
          solutions: toStringArray(project.solutions),
          clientName: project.clientName,
          displayOrder: project.displayOrder,
          featured: project.featured,
          isActive: project.isActive,
        }}
      />
    </div>
  );
}
