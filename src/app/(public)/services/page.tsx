import { prisma } from "@/lib/prisma";
import { ServicesPageClient } from "@/components/services/ServicesPageClient";

export const metadata = { title: "Services" };
export const revalidate = 3600;

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    where: { isActive: true },
    orderBy: [{ featured: "desc" }, { displayOrder: "asc" }],
  });

  return <ServicesPageClient services={services} />;
}
