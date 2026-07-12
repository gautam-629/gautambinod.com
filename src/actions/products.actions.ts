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

export async function deleteProduct(id: string): Promise<ActionResult> {
  try {
    const product = await prisma.product.findUnique({ where: { id }, select: { name: true } });
    await prisma.product.delete({ where: { id } });
    revalidatePath("/admin/products");
    revalidatePath("/products");
    return {
      success: true,
      message: product ? `"${product.name}" was removed.` : undefined,
    };
  } catch (error) {
    console.error("deleteProduct error:", error);
    // Most common cause: existing orders reference this product (FK constraint)
    return {
      success: false,
      error:
        "Could not delete this product. It may have existing orders linked to it.",
    };
  }
}

export async function createProduct(formData: FormData): Promise<ActionResult> {
  try {
    const name = formData.get("name") as string;
    if (!name?.trim()) {
      return { success: false, error: "Product name is required." };
    }
    const categoryId = formData.get("categoryId") as string;
    if (!categoryId) {
      return { success: false, error: "Please select a category." };
    }
    const price = parseFloat(formData.get("price") as string);
    if (Number.isNaN(price) || price < 0) {
      return { success: false, error: "Please enter a valid price." };
    }

    const slug = (formData.get("slug") as string) || slugify(name);

    const existing = await prisma.product.findUnique({ where: { slug } });
    if (existing) {
      return {
        success: false,
        error: `A product with the slug "${slug}" already exists. Try a different name or slug.`,
      };
    }

    const thumbnail = (formData.get("thumbnail") as string) || "";
    const images = thumbnail ? [thumbnail] : undefined;

    await prisma.product.create({
      data: {
        name,
        slug,
        tagline: (formData.get("tagline") as string) || null,
        description: (formData.get("description") as string) || "",
        images,
        demoVideo: (formData.get("demoVideo") as string) || null,
        price,
        discountedPrice: formData.get("discountedPrice")
          ? parseFloat(formData.get("discountedPrice") as string)
          : null,
        currency: (formData.get("currency") as string) || "USD",
        categoryId,
        status: (formData.get("status") as any) || "AVAILABLE",
        techStack: parseCsv(formData.get("techStack")),
        userFeatures: parseLines(formData.get("userFeatures")),
        adminFeatures: parseLines(formData.get("adminFeatures")),
        mobileFeatures: parseLines(formData.get("mobileFeatures")),
        demoUrl: (formData.get("demoUrl") as string) || null,
        demoUsername: (formData.get("demoUsername") as string) || null,
        demoPassword: (formData.get("demoPassword") as string) || null,
        featured: formData.get("featured") === "on",
        isActive: formData.get("isActive") === "on",
        displayOrder: parseInt(formData.get("displayOrder") as string) || 0,
      },
    });

    revalidatePath("/admin/products");
    revalidatePath("/products");
    return { success: true, message: `"${name}" was added to your marketplace.`, redirectTo: "/admin/products" };
  } catch (error) {
    console.error("createProduct error:", error);
    return { success: false, error: "Could not create this product. Please check your inputs and try again." };
  }
}

export async function updateProduct(id: string, formData: FormData): Promise<ActionResult> {
  try {
    const name = formData.get("name") as string;
    if (!name?.trim()) {
      return { success: false, error: "Product name is required." };
    }
    const categoryId = formData.get("categoryId") as string;
    if (!categoryId) {
      return { success: false, error: "Please select a category." };
    }
    const price = parseFloat(formData.get("price") as string);
    if (Number.isNaN(price) || price < 0) {
      return { success: false, error: "Please enter a valid price." };
    }

    const slug = (formData.get("slug") as string) || slugify(name);

    const slugOwner = await prisma.product.findUnique({ where: { slug }, select: { id: true } });
    if (slugOwner && slugOwner.id !== id) {
      return {
        success: false,
        error: `Another product already uses the slug "${slug}". Please choose a different one.`,
      };
    }

    const thumbnail = (formData.get("thumbnail") as string) || "";
    const images = thumbnail ? [thumbnail] : [];

    await prisma.product.update({
      where: { id },
      data: {
        name,
        slug,
        tagline: (formData.get("tagline") as string) || null,
        description: (formData.get("description") as string) || "",
        images,
        demoVideo: (formData.get("demoVideo") as string) || null,
        price,
        discountedPrice: formData.get("discountedPrice")
          ? parseFloat(formData.get("discountedPrice") as string)
          : null,
        currency: (formData.get("currency") as string) || "USD",
        categoryId,
        status: (formData.get("status") as any) || "AVAILABLE",
        techStack: parseCsv(formData.get("techStack")) ?? [],
        userFeatures: parseLines(formData.get("userFeatures")) ?? [],
        adminFeatures: parseLines(formData.get("adminFeatures")) ?? [],
        mobileFeatures: parseLines(formData.get("mobileFeatures")) ?? [],
        demoUrl: (formData.get("demoUrl") as string) || null,
        demoUsername: (formData.get("demoUsername") as string) || null,
        demoPassword: (formData.get("demoPassword") as string) || null,
        featured: formData.get("featured") === "on",
        isActive: formData.get("isActive") === "on",
        displayOrder: parseInt(formData.get("displayOrder") as string) || 0,
      },
    });

    revalidatePath("/admin/products");
    revalidatePath(`/products/${slug}`);
    return { success: true, message: `"${name}" was updated.`, redirectTo: "/admin/products" };
  } catch (error) {
    console.error("updateProduct error:", error);
    return { success: false, error: "Could not save your changes. Please try again." };
  }
}
