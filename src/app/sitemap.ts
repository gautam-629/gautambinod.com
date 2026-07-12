import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXTAUTH_URL || "https://devfolio.com";

  const staticPages = [
    { url: baseUrl, changeFrequency: "weekly" as const, priority: 1 },
    { url: `${baseUrl}/about`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/projects`, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${baseUrl}/products`, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${baseUrl}/services`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/blog`, changeFrequency: "daily" as const, priority: 0.8 },
    { url: `${baseUrl}/contact`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/experience`, changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${baseUrl}/skills`, changeFrequency: "monthly" as const, priority: 0.6 },
  ];

  const [projects, products, blogs] = await Promise.all([
    prisma.project.findMany({ where: { isActive: true }, select: { slug: true, updatedAt: true } }),
    prisma.product.findMany({ where: { isActive: true }, select: { slug: true, updatedAt: true } }),
    prisma.blog.findMany({ where: { status: "PUBLISHED" }, select: { slug: true, updatedAt: true } }),
  ]);

  const projectPages = projects.map((p) => ({
    url: `${baseUrl}/projects/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const productPages = products.map((p) => ({
    url: `${baseUrl}/products/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const blogPages = blogs.map((b) => ({
    url: `${baseUrl}/blog/${b.slug}`,
    lastModified: b.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...projectPages, ...productPages, ...blogPages];
}
