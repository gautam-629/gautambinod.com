"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { slugify } from "@/utils/format";
import { redirect } from "next/navigation";

function isRedirectError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "digest" in error &&
    typeof (error as { digest?: unknown }).digest === "string" &&
    (error as { digest: string }).digest.startsWith("NEXT_REDIRECT")
  );
}

export async function deleteBlog(id: string) {
  try {
    await prisma.blog.delete({ where: { id } });
    revalidatePath("/admin/blogs");
    revalidatePath("/blog");
  } catch (error) {
    console.error("deleteBlog error:", error);
  }
}

export async function createBlog(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    if (!title?.trim()) {
      throw new Error("Title is required.");
    }
    const categoryId = formData.get("categoryId") as string;
    if (!categoryId) {
      throw new Error("Please select a category.");
    }
    const slug = (formData.get("slug") as string) || slugify(title);
    const status = (formData.get("status") as string) || "DRAFT";

    const existing = await prisma.blog.findUnique({ where: { slug } });
    if (existing) {
      throw new Error(`A post with the slug "${slug}" already exists. Try a different title.`);
    }

    await prisma.blog.create({
      data: {
        title,
        slug,
        excerpt: (formData.get("excerpt") as string) || null,
        content: (formData.get("content") as string) || "",
        featuredImage: (formData.get("featuredImage") as string) || null,
        categoryId,
        status: status as any,
        featured: formData.get("featured") === "on",
        publishedAt: status === "PUBLISHED" ? new Date() : null,
        readTimeMin: formData.get("readTimeMin")
          ? parseInt(formData.get("readTimeMin") as string)
          : null,
        seoTitle: (formData.get("seoTitle") as string) || null,
        seoDescription: (formData.get("seoDescription") as string) || null,
      },
    });
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error("createBlog error:", error);
    const message = error instanceof Error ? error.message : "Could not create blog post.";
    redirect(`/admin/blogs/new?error=${encodeURIComponent(message)}`);
  }

  revalidatePath("/admin/blogs");
  revalidatePath("/blog");
  redirect("/admin/blogs");
}

export async function updateBlog(id: string, formData: FormData) {
  try {
    const title = formData.get("title") as string;
    if (!title?.trim()) {
      throw new Error("Title is required.");
    }
    const categoryId = formData.get("categoryId") as string;
    if (!categoryId) {
      throw new Error("Please select a category.");
    }
    const slug = (formData.get("slug") as string) || slugify(title);
    const status = (formData.get("status") as string) || "DRAFT";

    const slugOwner = await prisma.blog.findUnique({ where: { slug }, select: { id: true } });
    if (slugOwner && slugOwner.id !== id) {
      throw new Error(`Another post already uses the slug "${slug}".`);
    }

    const existing = await prisma.blog.findUnique({
      where: { id },
      select: { publishedAt: true, status: true },
    });
    const publishedAt =
      status === "PUBLISHED" && existing?.status !== "PUBLISHED" ? new Date() : existing?.publishedAt;

    await prisma.blog.update({
      where: { id },
      data: {
        title,
        slug,
        excerpt: (formData.get("excerpt") as string) || null,
        content: (formData.get("content") as string) || "",
        featuredImage: (formData.get("featuredImage") as string) || null,
        categoryId,
        status: status as any,
        featured: formData.get("featured") === "on",
        publishedAt,
        readTimeMin: formData.get("readTimeMin")
          ? parseInt(formData.get("readTimeMin") as string)
          : null,
        seoTitle: (formData.get("seoTitle") as string) || null,
        seoDescription: (formData.get("seoDescription") as string) || null,
      },
    });
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error("updateBlog error:", error);
    const message = error instanceof Error ? error.message : "Could not save changes.";
    redirect(`/admin/blogs/${id}/edit?error=${encodeURIComponent(message)}`);
  }

  revalidatePath("/admin/blogs");
  redirect("/admin/blogs");
}
