import { BlogListContainer } from "@/components/blog/BlogListContainer";
import { prisma } from "@/lib/prisma";

export const revalidate = 3600;

export const metadata = { title: "Blog" };

export default async function BlogPage() {
  const [blogs, categories] = await Promise.all([
    prisma.blog.findMany({
      where: { status: "PUBLISHED" },
      include: { category: true },
      orderBy: [{ featured: "desc" }, { publishedAt: "desc" }],
    }),
    prisma.blogCategory.findMany({ where: { isActive: true }, orderBy: { displayOrder: "asc" } }),
  ]);

  return (
    <div className="container py-16 max-w-6xl mx-auto">
      <div className="max-w-2xl mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4 text-foreground">Blog</h1>
        <p className="text-muted-foreground text-lg leading-relaxed">
          Thoughts on development, design, and the business of building software.
        </p>
      </div>

      <BlogListContainer initialBlogs={blogs} categories={categories} />
    </div>
  );
}
