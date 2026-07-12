import { prisma } from "@/lib/prisma";
import { ProjectsPageClient } from "@/components/projects/ProjectsPageClient";

export const metadata = { title: "Projects" };
export const revalidate = 3600;

export default async function ProjectsPage() {
  const [projects, categories] = await Promise.all([
    prisma.project.findMany({
      where: { isActive: true },
      include: { category: true },
      orderBy: [{ featured: "desc" }, { displayOrder: "asc" }],
    }),
    prisma.projectCategory.findMany({
      where: { isActive: true },
      orderBy: { displayOrder: "asc" },
    }),
  ]);

  return <ProjectsPageClient projects={projects} categories={categories} />;
}
