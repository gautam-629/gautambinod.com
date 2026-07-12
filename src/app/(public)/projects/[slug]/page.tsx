import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProjectDetailPageClient } from "@/components/projects/ProjectDetailPageClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = await prisma.project.findUnique({ where: { slug } });
  if (!project) return { title: "Not Found" };
  return {
    title: project.seoTitle ?? project.title,
    description: project.seoDescription ?? project.shortDescription,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await prisma.project.findUnique({
    where: { slug, isActive: true },
    include: { category: true },
  });

  if (!project) notFound();

  // Increment view count (fire and forget)
  prisma.project
    .update({ where: { id: project.id }, data: { viewCount: { increment: 1 } } })
    .catch(() => {});

  return <ProjectDetailPageClient project={project} />;
}
