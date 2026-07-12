"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { slugify } from "@/utils/format";
import { redirect } from "next/navigation";

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

export async function deleteCaseStudy(id: string) {
  try {
    await prisma.caseStudy.delete({ where: { id } });
    revalidatePath("/admin/case-studies");
    revalidatePath("/case-studies");
  } catch (error) {
    console.error("deleteCaseStudy error:", error);
    // Swallow: this action is wired to the legacy DeleteButton/void contract,
    // which has no error channel back to the UI. Logging is the best we can
    // do without a larger refactor of this call site's return type.
  }
}

export async function createCaseStudy(formData: FormData) {
  let slug = "";
  try {
    const title = formData.get("title") as string;
    if (!title?.trim()) {
      throw new Error("Title is required.");
    }
    slug = (formData.get("slug") as string) || slugify(title);

    const existing = await prisma.caseStudy.findUnique({ where: { slug } });
    if (existing) {
      throw new Error(
        `A case study with the slug "${slug}" already exists. Try a different title.`
      );
    }

    await prisma.caseStudy.create({
      data: {
        title,
        slug,
        clientName: (formData.get("clientName") as string) || null,
        clientLogo: (formData.get("clientLogo") as string) || null,
        industry: (formData.get("industry") as string) || null,
        featuredImage: (formData.get("featuredImage") as string) || null,
        problem: (formData.get("problem") as string) || "",
        solution: (formData.get("solution") as string) || "",
        process: (formData.get("process") as string) || "",
        outcome: (formData.get("outcome") as string) || "",
        technologies: parseCsv(formData.get("technologies")),
        featured: formData.get("featured") === "on",
        isActive: formData.get("isActive") !== "off",
        displayOrder: parseInt(formData.get("displayOrder") as string) || 0,
        seoTitle: (formData.get("seoTitle") as string) || null,
        seoDescription: (formData.get("seoDescription") as string) || null,
      },
    });
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error("createCaseStudy error:", error);
    const message = error instanceof Error ? error.message : "Could not create case study.";
    redirect(`/admin/case-studies/new?error=${encodeURIComponent(message)}`);
  }

  revalidatePath("/admin/case-studies");
  revalidatePath("/case-studies");
  redirect("/admin/case-studies");
}

export async function updateCaseStudy(id: string, formData: FormData) {
  let slug = "";
  try {
    const title = formData.get("title") as string;
    if (!title?.trim()) {
      throw new Error("Title is required.");
    }
    slug = (formData.get("slug") as string) || slugify(title);

    const slugOwner = await prisma.caseStudy.findUnique({ where: { slug }, select: { id: true } });
    if (slugOwner && slugOwner.id !== id) {
      throw new Error(`Another case study already uses the slug "${slug}".`);
    }

    await prisma.caseStudy.update({
      where: { id },
      data: {
        title,
        slug,
        clientName: (formData.get("clientName") as string) || null,
        clientLogo: (formData.get("clientLogo") as string) || null,
        industry: (formData.get("industry") as string) || null,
        featuredImage: (formData.get("featuredImage") as string) || null,
        problem: (formData.get("problem") as string) || "",
        solution: (formData.get("solution") as string) || "",
        process: (formData.get("process") as string) || "",
        outcome: (formData.get("outcome") as string) || "",
        technologies: parseCsv(formData.get("technologies")) ?? [],
        featured: formData.get("featured") === "on",
        isActive: formData.get("isActive") !== "off",
        displayOrder: parseInt(formData.get("displayOrder") as string) || 0,
        seoTitle: (formData.get("seoTitle") as string) || null,
        seoDescription: (formData.get("seoDescription") as string) || null,
      },
    });
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error("updateCaseStudy error:", error);
    const message = error instanceof Error ? error.message : "Could not save changes.";
    redirect(`/admin/case-studies/${id}/edit?error=${encodeURIComponent(message)}`);
  }

  revalidatePath("/admin/case-studies");
  revalidatePath(`/case-studies/${slug}`);
  redirect("/admin/case-studies");
}
