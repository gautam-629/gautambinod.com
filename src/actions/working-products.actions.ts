"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { slugify } from "@/utils/format";
import { redirect } from "next/navigation";
import { toObjectArray } from "@/types";

interface FeatureItem {
  name: string;
  done: boolean;
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

export async function deleteWorkingProduct(id: string) {
  try {
    await prisma.workingProduct.delete({ where: { id } });
    revalidatePath("/admin/working-products");
  } catch (error) {
    console.error("deleteWorkingProduct error:", error);
  }
}

export async function createWorkingProduct(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    if (!name?.trim()) {
      throw new Error("Product name is required.");
    }
    const slug = (formData.get("slug") as string) || slugify(name);

    const existing = await prisma.workingProduct.findUnique({ where: { slug } });
    if (existing) {
      throw new Error(`A pipeline product with the slug "${slug}" already exists.`);
    }

    const featuresText = (formData.get("features") as string) ?? "";
    const features = featuresText
      .split("\n")
      .map((f) => f.trim())
      .filter(Boolean)
      .map((featureName) => ({ name: featureName, done: false }));

    await prisma.workingProduct.create({
      data: {
        name,
        slug,
        tagline: (formData.get("tagline") as string) || null,
        description: (formData.get("description") as string) || null,
        thumbnail: (formData.get("thumbnail") as string) || null,
        progress: parseInt(formData.get("progress") as string) || 0,
        currentMilestone: (formData.get("currentMilestone") as string) || null,
        launchDate: formData.get("launchDate")
          ? new Date(formData.get("launchDate") as string)
          : null,
        features: features.length ? features : undefined,
        techStack: parseCsv(formData.get("techStack")),
        status: (formData.get("status") as any) || "UNDER_DEVELOPMENT",
        featured: formData.get("featured") === "on",
        isActive: formData.get("isActive") !== "off",
        displayOrder: parseInt(formData.get("displayOrder") as string) || 0,
      },
    });
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error("createWorkingProduct error:", error);
    const message = error instanceof Error ? error.message : "Could not create pipeline product.";
    redirect(`/admin/working-products/new?error=${encodeURIComponent(message)}`);
  }

  revalidatePath("/admin/working-products");
  redirect("/admin/working-products");
}

export async function updateWorkingProduct(id: string, formData: FormData) {
  try {
    const name = formData.get("name") as string;
    if (!name?.trim()) {
      throw new Error("Product name is required.");
    }
    const slug = (formData.get("slug") as string) || slugify(name);

    const slugOwner = await prisma.workingProduct.findUnique({ where: { slug }, select: { id: true } });
    if (slugOwner && slugOwner.id !== id) {
      throw new Error(`Another pipeline product already uses the slug "${slug}".`);
    }

    // Preserve existing "done" flags for features whose name didn't change;
    // newly added lines start as not-done. Without this, editing the
    // textarea would silently reset every checkbox to unchecked.
    const existing = await prisma.workingProduct.findUnique({ where: { id }, select: { features: true } });
    const existingFeatures = toObjectArray<FeatureItem>(existing?.features);
    const doneByName = new Map(existingFeatures.map((f) => [f.name, f.done]));

    const featuresText = (formData.get("features") as string) ?? "";
    const features = featuresText
      .split("\n")
      .map((f) => f.trim())
      .filter(Boolean)
      .map((featureName) => ({
        name: featureName,
        done: doneByName.get(featureName) ?? false,
      }));

    await prisma.workingProduct.update({
      where: { id },
      data: {
        name,
        slug,
        tagline: (formData.get("tagline") as string) || null,
        description: (formData.get("description") as string) || null,
        thumbnail: (formData.get("thumbnail") as string) || null,
        progress: parseInt(formData.get("progress") as string) || 0,
        currentMilestone: (formData.get("currentMilestone") as string) || null,
        launchDate: formData.get("launchDate")
          ? new Date(formData.get("launchDate") as string)
          : null,
        features: features.length ? features : [],
        techStack: parseCsv(formData.get("techStack")) ?? [],
        status: (formData.get("status") as any) || "UNDER_DEVELOPMENT",
        featured: formData.get("featured") === "on",
        isActive: formData.get("isActive") !== "off",
        displayOrder: parseInt(formData.get("displayOrder") as string) || 0,
      },
    });
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error("updateWorkingProduct error:", error);
    const message = error instanceof Error ? error.message : "Could not save changes.";
    redirect(`/admin/working-products/${id}/edit?error=${encodeURIComponent(message)}`);
  }

  revalidatePath("/admin/working-products");
  redirect("/admin/working-products");
}
