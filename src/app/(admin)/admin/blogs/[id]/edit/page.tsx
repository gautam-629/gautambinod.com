import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateBlog } from "@/actions/blogs.actions";
import { AlertCircle } from "lucide-react";

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}
export const metadata = { title: "Edit Blog Post | Admin" };

export default async function EditBlogPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { error } = await searchParams;
  const [blog, categories] = await Promise.all([
    prisma.blog.findUnique({ where: { id } }),
    prisma.blogCategory.findMany({ where: { isActive: true }, orderBy: { displayOrder: "asc" } }),
  ]);
  if (!blog) notFound();
  const action = updateBlog.bind(null, blog.id);

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Edit Blog Post</h1>
        <p className="text-muted-foreground text-sm mt-1">{blog.title}</p>
      </div>
      {error && (
        <div className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
          {error}
        </div>
      )}
      <form action={action} className="rounded-xl border border-border/50 bg-card p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1.5">Title *</label>
          <input name="title" required defaultValue={blog.title}
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium mb-1.5">Category *</label>
            <select name="categoryId" required defaultValue={blog.categoryId}
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
              {categories.map((cat) => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Status</label>
            <select name="status" defaultValue={blog.status}
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
              <option value="ARCHIVED">Archived</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Excerpt</label>
          <textarea name="excerpt" rows={2} defaultValue={blog.excerpt ?? ""}
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Featured Image URL</label>
          <input name="featuredImage" defaultValue={blog.featuredImage ?? ""}
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Content *</label>
          <textarea name="content" required rows={20} defaultValue={blog.content}
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-ring resize-y" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium mb-1.5">Read Time (minutes)</label>
            <input name="readTimeMin" type="number" min="1" defaultValue={blog.readTimeMin ?? ""}
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
        </div>

        <div className="border-t border-border/50 pt-5 space-y-4">
          <h3 className="font-semibold text-sm">SEO</h3>
          <div>
            <label className="block text-sm font-medium mb-1.5">Meta Title</label>
            <input name="seoTitle" defaultValue={blog.seoTitle ?? ""}
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Meta Description</label>
            <textarea name="seoDescription" rows={2} defaultValue={blog.seoDescription ?? ""}
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
          </div>
        </div>

        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" name="featured" defaultChecked={blog.featured} className="rounded" />
          <span className="text-sm">Featured Post</span>
        </label>

        <div className="flex gap-3 pt-2">
          <button type="submit"
            className="flex-1 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
            Save Changes
          </button>
          <a href="/admin/blogs"
            className="rounded-md border border-border px-5 py-3 text-sm font-medium hover:bg-accent transition-colors">
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}
