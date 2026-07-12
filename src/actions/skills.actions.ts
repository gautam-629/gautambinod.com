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

export async function deleteSkill(id: string) {
  try {
    await prisma.skill.delete({ where: { id } });
    revalidatePath("/admin/skills");
    revalidatePath("/skills");
  } catch (error) {
    console.error("deleteSkill error:", error);
  }
}

export async function createSkill(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    if (!name?.trim()) {
      throw new Error("Skill name is required.");
    }
    const categoryId = formData.get("categoryId") as string;
    if (!categoryId) {
      throw new Error("Please select a category.");
    }
    const slug = (formData.get("slug") as string) || slugify(name);

    const existing = await prisma.skill.findUnique({ where: { slug } });
    if (existing) {
      throw new Error(`A skill named "${existing.name}" already exists. Try a different name.`);
    }

    await prisma.skill.create({
      data: {
        name,
        slug,
        logo: (formData.get("logo") as string) || null,
        categoryId,
        level: (formData.get("level") as any) || "INTERMEDIATE",
        proficiency: parseInt(formData.get("proficiency") as string) || 80,
        yearsOfExp: formData.get("yearsOfExp")
          ? parseFloat(formData.get("yearsOfExp") as string)
          : null,
        description: (formData.get("description") as string) || null,
        featured: formData.get("featured") === "on",
        displayOrder: parseInt(formData.get("displayOrder") as string) || 0,
        isActive: formData.get("isActive") === "on",
      },
    });
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error("createSkill error:", error);
    const message = error instanceof Error ? error.message : "Could not add skill.";
    redirect(`/admin/skills/new?error=${encodeURIComponent(message)}`);
  }

  revalidatePath("/admin/skills");
  revalidatePath("/skills");
  redirect("/admin/skills");
}

export async function createSkillCategory(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    if (!name?.trim()) {
      throw new Error("Category name is required.");
    }
    const slug = (formData.get("slug") as string) || slugify(name);

    const existing = await prisma.skillCategory.findUnique({ where: { slug } });
    if (existing) {
      throw new Error(`A category named "${existing.name}" already exists.`);
    }

    await prisma.skillCategory.create({
      data: {
        name,
        slug,
        icon: (formData.get("icon") as string) || null,
        displayOrder: parseInt(formData.get("displayOrder") as string) || 0,
        isActive: formData.get("isActive") === "on",
      },
    });
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error("createSkillCategory error:", error);
    const message = error instanceof Error ? error.message : "Could not add category.";
    redirect(`/admin/skills/categories/new?error=${encodeURIComponent(message)}`);
  }

  revalidatePath("/admin/skills");
  redirect("/admin/skills");
}

export async function deleteSkillCategory(id: string) {
  try {
    const skillCount = await prisma.skill.count({ where: { categoryId: id } });
    if (skillCount > 0) {
      // Don't silently cascade-orphan skills — block deletion with a clear signal.
      console.error(
        `deleteSkillCategory: refused to delete category ${id} with ${skillCount} skills still assigned`
      );
      return;
    }
    await prisma.skillCategory.delete({ where: { id } });
    revalidatePath("/admin/skills");
  } catch (error) {
    console.error("deleteSkillCategory error:", error);
  }
}

export async function updateSkill(id: string, formData: FormData) {
  try {
    const name = formData.get("name") as string;
    if (!name?.trim()) {
      throw new Error("Skill name is required.");
    }
    const categoryId = formData.get("categoryId") as string;
    if (!categoryId) {
      throw new Error("Please select a category.");
    }

    await prisma.skill.update({
      where: { id },
      data: {
        name,
        logo: (formData.get("logo") as string) || null,
        categoryId,
        level: (formData.get("level") as any) || "INTERMEDIATE",
        proficiency: parseInt(formData.get("proficiency") as string) || 80,
        yearsOfExp: formData.get("yearsOfExp")
          ? parseFloat(formData.get("yearsOfExp") as string)
          : null,
        featured: formData.get("featured") === "on",
        isActive: formData.get("isActive") === "on",
        displayOrder: parseInt(formData.get("displayOrder") as string) || 0,
      },
    });
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error("updateSkill error:", error);
    const message = error instanceof Error ? error.message : "Could not save changes.";
    redirect(`/admin/skills/${id}/edit?error=${encodeURIComponent(message)}`);
  }

  revalidatePath("/admin/skills");
  revalidatePath("/skills");
  redirect("/admin/skills");
}
