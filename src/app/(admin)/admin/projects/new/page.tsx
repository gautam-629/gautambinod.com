import { prisma } from "@/lib/prisma";
import { createProject } from "@/actions/projects.actions";
import { ProjectForm } from "@/features/admin/projects/ProjectForm";

export const metadata = { title: "New Project | Admin" };

export default async function NewProjectPage() {
  const categories = await prisma.projectCategory.findMany({
    where: { isActive: true },
    orderBy: { displayOrder: "asc" },
  });

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Add Project</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Add a new project to your portfolio
        </p>
      </div>

      <ProjectForm categories={categories} action={createProject} mode="create" />
    </div>
  );
}
