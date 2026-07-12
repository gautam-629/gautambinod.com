import { prisma } from "@/lib/prisma";
import { AboutPageClient } from "@/components/about/AboutPageClient";

export const metadata = { title: "About" };
export const revalidate = 3600;

export default async function AboutPage() {
  const [about, experiences, education, certificates, skills] = await Promise.all([
    prisma.aboutSection.findFirst({ where: { isActive: true } }),
    prisma.experience.findMany({
      where: { featured: true, status: true },
      orderBy: { displayOrder: "asc" },
      take: 5,
    }),
    prisma.education.findMany({
      where: { isActive: true },
      orderBy: { startDate: "desc" },
    }),
    prisma.certificate.findMany({
      where: { isActive: true },
      orderBy: { displayOrder: "asc" },
      take: 6,
    }),
    prisma.skill.findMany({
      where: { featured: true, isActive: true },
      include: { category: true },
      take: 12,
    }),
  ]);

  return (
    <AboutPageClient
      about={about}
      experiences={experiences}
      education={education}
      certificates={certificates}
      skills={skills}
    />
  );
}
