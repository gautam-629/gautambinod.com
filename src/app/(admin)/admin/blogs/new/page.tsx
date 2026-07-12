import { prisma } from "@/lib/prisma";
import { createBlog } from "@/actions/blogs.actions";
import { AlertCircle } from "lucide-react";

export const metadata = { title: "New Blog Post | Admin" };

export default async function NewBlogPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const categories = await prisma.blogCategory.findMany({
    where: { isActive: true },
    orderBy: { displayOrder: "asc" },
  });

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">New Blog Post</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Write and publish a new article
        </p>
      </div>

      {error && (
        <div className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
          {error}
        </div>
      )}

      <form action={createBlog} className="rounded-xl border border-border/50 bg-card p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1.5">
            Title <span className="text-destructive">*</span>
          </label>
          <input
            name="title"
            required
            placeholder="How I Built a Full-Stack App in 7 Days"
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium mb-1.5">
              Category <span className="text-destructive">*</span>
            </label>
            <select
              name="categoryId"
              required
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Status</label>
            <select
              name="status"
              defaultValue="DRAFT"
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
              <option value="ARCHIVED">Archived</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Excerpt</label>
          <textarea
            name="excerpt"
            rows={2}
            placeholder="Brief summary shown in blog listings..."
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Featured Image URL</label>
          <input
            name="featuredImage"
            placeholder="https://res.cloudinary.com/..."
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">
            Content <span className="text-destructive">*</span>
          </label>
          <p className="text-xs text-muted-foreground mb-1">
            HTML is supported. Use heading tags, paragraphs, lists, code blocks, etc.
          </p>
          <textarea
            name="content"
            required
            rows={20}
            placeholder="<h2>Introduction</h2>&#10;<p>Write your article here...</p>"
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-ring resize-y"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium mb-1.5">
              Read Time (minutes)
            </label>
            <input
              name="readTimeMin"
              type="number"
              min="1"
              placeholder="5"
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        <div className="border-t border-border/50 pt-5 space-y-4">
          <h3 className="font-semibold text-sm">SEO Settings</h3>
          <div>
            <label className="block text-sm font-medium mb-1.5">Meta Title</label>
            <input
              name="seoTitle"
              placeholder="Leave blank to use post title"
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Meta Description</label>
            <textarea
              name="seoDescription"
              rows={2}
              placeholder="Leave blank to use excerpt"
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />
          </div>
        </div>

        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="featured" className="rounded" />
            <span className="text-sm">Featured Post</span>
          </label>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="flex-1 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Save Post
          </button>
          <a
            href="/admin/blogs"
            className="rounded-md border border-border px-5 py-3 text-sm font-medium hover:bg-accent transition-colors"
          >
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}
