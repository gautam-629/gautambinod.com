"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { slugify } from "@/utils/format";
import type { ActionResult } from "@/types";

function parseLines(value: FormDataEntryValue | null): string[] | undefined {
  const text = (value as string) ?? "";
  const arr = text.split("\n").map((s) => s.trim()).filter(Boolean);
  return arr.length ? arr : undefined;
}

function parseCsv(value: FormDataEntryValue | null): string[] | undefined {
  const text = (value as string) ?? "";
  const arr = text.split(",").map((s) => s.trim()).filter(Boolean);
  return arr.length ? arr : undefined;
}

export async function deleteProject(id: string): Promise<ActionResult> {
  try {
    const project = await prisma.project.findUnique({ where: { id }, select: { title: true } });
    await prisma.project.delete({ where: { id } });
    revalidatePath("/admin/projects");
    revalidatePath("/projects");
    return {
      success: true,
      message: project ? `"${project.title}" was removed.` : undefined,
    };
  } catch (error) {
    console.error("deleteProject error:", error);
    return { success: false, error: "Could not delete this project. Please try again." };
  }
}

export async function createProject(formData: FormData): Promise<ActionResult> {
  try {
    const title = formData.get("title") as string;
    if (!title?.trim()) {
      return { success: false, error: "Title is required." };
    }
    const categoryId = formData.get("categoryId") as string;
    if (!categoryId) {
      return { success: false, error: "Please select a category." };
    }

    const slug = (formData.get("slug") as string) || slugify(title);

    // Catch slug collisions with a friendly message instead of a raw 500
    const existing = await prisma.project.findUnique({ where: { slug } });
    if (existing) {
      return {
        success: false,
        error: `A project with the slug "${slug}" already exists. Try a different title or slug.`,
      };
    }

    await prisma.project.create({
      data: {
        title,
        slug,
        shortDescription: (formData.get("shortDescription") as string) || null,
        description: (formData.get("description") as string) || "",
        thumbnail: (formData.get("thumbnail") as string) || null,
        demoVideo: (formData.get("demoVideo") as string) || null,
        liveUrl: (formData.get("liveUrl") as string) || null,
        githubUrl: (formData.get("githubUrl") as string) || null,
        technologies: parseCsv(formData.get("technologies")),
        features: parseLines(formData.get("features")),
        challenges: parseLines(formData.get("challenges")),
        solutions: parseLines(formData.get("solutions")),
        categoryId,
        status: (formData.get("status") as any) || "COMPLETED",
        clientName: (formData.get("clientName") as string) || null,
        featured: formData.get("featured") === "on",
        isActive: formData.get("isActive") === "on",
        displayOrder: parseInt(formData.get("displayOrder") as string) || 0,
      },
    });

    revalidatePath("/admin/projects");
    revalidatePath("/projects");
    return { success: true, message: `"${title}" was added to your portfolio.`, redirectTo: "/admin/projects" };
  } catch (error) {
    console.error("createProject error:", error);
    return { success: false, error: "Could not create this project. Please check your inputs and try again." };
  }
}

export async function updateProject(id: string, formData: FormData): Promise<ActionResult> {
  try {
    const title = formData.get("title") as string;
    if (!title?.trim()) {
      return { success: false, error: "Title is required." };
    }
    const categoryId = formData.get("categoryId") as string;
    if (!categoryId) {
      return { success: false, error: "Please select a category." };
    }

    const slug = (formData.get("slug") as string) || slugify(title);

    const slugOwner = await prisma.project.findUnique({ where: { slug }, select: { id: true } });
    if (slugOwner && slugOwner.id !== id) {
      return {
        success: false,
        error: `Another project already uses the slug "${slug}". Please choose a different one.`,
      };
    }

    await prisma.project.update({
      where: { id },
      data: {
        title,
        slug,
        shortDescription: (formData.get("shortDescription") as string) || null,
        description: (formData.get("description") as string) || "",
        thumbnail: (formData.get("thumbnail") as string) || null,
        demoVideo: (formData.get("demoVideo") as string) || null,
        liveUrl: (formData.get("liveUrl") as string) || null,
        githubUrl: (formData.get("githubUrl") as string) || null,
        technologies: parseCsv(formData.get("technologies")) ?? [],
        features: parseLines(formData.get("features")) ?? [],
        challenges: parseLines(formData.get("challenges")) ?? [],
        solutions: parseLines(formData.get("solutions")) ?? [],
        categoryId,
        status: (formData.get("status") as any) || "COMPLETED",
        clientName: (formData.get("clientName") as string) || null,
        featured: formData.get("featured") === "on",
        isActive: formData.get("isActive") === "on",
        displayOrder: parseInt(formData.get("displayOrder") as string) || 0,
      },
    });

    revalidatePath("/admin/projects");
    revalidatePath(`/projects/${slug}`);
    return { success: true, message: `"${title}" was updated.`, redirectTo: "/admin/projects" };
  } catch (error) {
    console.error("updateProject error:", error);
    return { success: false, error: "Could not save your changes. Please try again." };
  }
}
