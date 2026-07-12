import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Plus, Eye, Pencil } from "lucide-react";
import { deleteBlog } from "@/actions/blogs.actions";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { formatFullDate } from "@/utils/format";

export const metadata = { title: "Blog Posts | Admin" };

export default async function AdminBlogsPage() {
  const blogs = await prisma.blog.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  const statusColor: Record<string, string> = {
    DRAFT: "bg-muted text-muted-foreground",
    PUBLISHED: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    ARCHIVED: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Blog Posts</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {blogs.filter((b) => b.status === "PUBLISHED").length} published · {blogs.length} total
          </p>
        </div>
        <Link
          href="/admin/blogs/new"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4" /> New Post
        </Link>
      </div>

      <div className="rounded-xl border border-border/50 bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50 bg-muted/30">
                <th className="text-left px-5 py-3 font-medium text-muted-foreground">Title</th>
                <th className="text-left px-5 py-3 font-medium text-muted-foreground hidden md:table-cell">Category</th>
                <th className="text-left px-5 py-3 font-medium text-muted-foreground">Status</th>
                <th className="text-left px-5 py-3 font-medium text-muted-foreground hidden lg:table-cell">Published</th>
                <th className="text-left px-5 py-3 font-medium text-muted-foreground hidden lg:table-cell">Views</th>
                <th className="text-right px-5 py-3 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {blogs.map((blog) => (
                <tr key={blog.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-5 py-4">
                    <div>
                      <p className="font-medium line-clamp-1">{blog.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">/{blog.slug}</p>
                    </div>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{blog.category.name}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor[blog.status]}`}>{blog.status}</span>
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell text-muted-foreground text-xs">
                    {blog.publishedAt ? formatFullDate(blog.publishedAt) : "—"}
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell text-muted-foreground">{blog.viewCount}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1">
                      {blog.status === "PUBLISHED" && (
                        <Link href={`/blog/${blog.slug}`} target="_blank" className="p-1.5 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors">
                          <Eye className="h-3.5 w-3.5" />
                        </Link>
                      )}
                      <Link href={`/admin/blogs/${blog.id}/edit`} className="p-1.5 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors">
                        <Pencil className="h-3.5 w-3.5" />
                      </Link>
                      <DeleteButton
                        action={deleteBlog.bind(null, blog.id)}
                        confirmMessage="Delete this blog post? This cannot be undone."
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {blogs.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <p className="mb-3">No blog posts yet</p>
              <Link href="/admin/blogs/new" className="text-primary hover:underline text-sm">Write your first post →</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
