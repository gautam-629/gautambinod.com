import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { BlogDetailPageClient } from "@/components/blog/BlogDetailPageClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const blog = await prisma.blog.findUnique({ where: { slug } });
  if (!blog) return { title: "Not Found" };
  return { title: blog.seoTitle || blog.title, description: blog.seoDescription || blog.excerpt };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const blog = await prisma.blog.findUnique({
    where: { slug, status: "PUBLISHED" },
    include: { category: true, tags: { include: { tag: true } } },
  });

  if (!blog) notFound();

  prisma.blog.update({ where: { id: blog.id }, data: { viewCount: { increment: 1 } } }).catch(() => {});

  const relatedBlogs = await prisma.blog.findMany({
    where: { status: "PUBLISHED", categoryId: blog.categoryId, NOT: { id: blog.id } },
    take: 3,
    orderBy: { publishedAt: "desc" },
  });

  return <BlogDetailPageClient blog={blog} relatedBlogs={relatedBlogs} />;
}
