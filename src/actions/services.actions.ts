"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { slugify } from "@/utils/format";
import { redirect } from "next/navigation";

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

function isRedirectError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "digest" in error &&
    typeof (error as { digest?: unknown }).digest === "string" &&
    (error as { digest: string }).digest.startsWith("NEXT_REDIRECT")
  );
}

export async function deleteService(id: string) {
  try {
    await prisma.service.delete({ where: { id } });
    revalidatePath("/admin/services");
    revalidatePath("/services");
  } catch (error) {
    console.error("deleteService error:", error);
  }
}

export async function createService(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    if (!title?.trim()) {
      throw new Error("Title is required.");
    }
    const slug = (formData.get("slug") as string) || slugify(title);

    const existing = await prisma.service.findUnique({ where: { slug } });
    if (existing) {
      throw new Error(`A service with the slug "${slug}" already exists. Try a different title.`);
    }

    await prisma.service.create({
      data: {
        title,
        slug,
        icon: (formData.get("icon") as string) || null,
        shortDesc: (formData.get("shortDesc") as string) || null,
        description: (formData.get("description") as string) || "",
        features: parseLines(formData.get("features")),
        deliverables: parseLines(formData.get("deliverables")),
        technologies: parseCsv(formData.get("technologies")),
        startingPrice: formData.get("startingPrice")
          ? parseFloat(formData.get("startingPrice") as string)
          : null,
        priceUnit: (formData.get("priceUnit") as string) || null,
        timeline: (formData.get("timeline") as string) || null,
        featured: formData.get("featured") === "on",
        isActive: formData.get("isActive") !== "off",
        displayOrder: parseInt(formData.get("displayOrder") as string) || 0,
      },
    });
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error("createService error:", error);
    const message = error instanceof Error ? error.message : "Could not create service.";
    redirect(`/admin/services/new?error=${encodeURIComponent(message)}`);
  }

  revalidatePath("/admin/services");
  revalidatePath("/services");
  redirect("/admin/services");
}

export async function updateService(id: string, formData: FormData) {
  try {
    const title = formData.get("title") as string;
    if (!title?.trim()) {
      throw new Error("Title is required.");
    }
    const slug = (formData.get("slug") as string) || slugify(title);

    const slugOwner = await prisma.service.findUnique({ where: { slug }, select: { id: true } });
    if (slugOwner && slugOwner.id !== id) {
      throw new Error(`Another service already uses the slug "${slug}".`);
    }

    await prisma.service.update({
      where: { id },
      data: {
        title,
        slug,
        icon: (formData.get("icon") as string) || null,
        shortDesc: (formData.get("shortDesc") as string) || null,
        description: (formData.get("description") as string) || "",
        features: parseLines(formData.get("features")) ?? [],
        deliverables: parseLines(formData.get("deliverables")) ?? [],
        technologies: parseCsv(formData.get("technologies")) ?? [],
        startingPrice: formData.get("startingPrice")
          ? parseFloat(formData.get("startingPrice") as string)
          : null,
        priceUnit: (formData.get("priceUnit") as string) || null,
        timeline: (formData.get("timeline") as string) || null,
        featured: formData.get("featured") === "on",
        isActive: formData.get("isActive") !== "off",
        displayOrder: parseInt(formData.get("displayOrder") as string) || 0,
      },
    });
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error("updateService error:", error);
    const message = error instanceof Error ? error.message : "Could not save changes.";
    redirect(`/admin/services/${id}/edit?error=${encodeURIComponent(message)}`);
  }

  revalidatePath("/admin/services");
  revalidatePath("/services");
  redirect("/admin/services");
}
