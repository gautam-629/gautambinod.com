import { HeroSection } from "@/components/sections/HeroSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { LatestBlogs } from "@/components/sections/LatestBlogs";
import { CTASection } from "@/components/sections/CTASection";
import { InteractiveHomepageLayout } from "@/components/common/InteractiveHomepageLayout";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [hero, socialLinks, stats, projects, products, services, testimonials, blogs] =
    await Promise.all([
      prisma.heroSection.findFirst({ where: { isActive: true } }),
      prisma.socialLink.findMany({
        where: { isActive: true },
        orderBy: { displayOrder: "asc" },
      }),
      prisma.statistic.findMany({
        where: { isActive: true },
        orderBy: { displayOrder: "asc" },
      }),
      prisma.project.findMany({
        where: { featured: true, isActive: true },
        include: { category: true },
        take: 6,
        orderBy: { displayOrder: "asc" },
      }),
      prisma.product.findMany({
        where: { featured: true, isActive: true },
        include: { category: true },
        take: 4,
        orderBy: { displayOrder: "asc" },
      }),
      prisma.service.findMany({
        where: { isActive: true },
        take: 6,
        orderBy: { displayOrder: "asc" },
      }),
      prisma.testimonial.findMany({
        where: { featured: true, isActive: true },
        take: 6,
        orderBy: { displayOrder: "asc" },
      }),
      prisma.blog.findMany({
        where: { status: "PUBLISHED" },
        include: { category: true },
        take: 3,
        orderBy: { publishedAt: "desc" },
      }),
    ]);

  return (
    <InteractiveHomepageLayout
      hero={<HeroSection hero={hero} socialLinks={socialLinks} />}
      stats={<StatsSection stats={stats} />}
      products={<FeaturedProducts products={products} />}
      projects={<FeaturedProjects projects={projects} />}
      services={<ServicesOverview services={services} />}
      testimonials={<TestimonialsSection testimonials={testimonials} />}
      blogs={<LatestBlogs blogs={blogs} />}
      cta={<CTASection />}
    />
  );
}
