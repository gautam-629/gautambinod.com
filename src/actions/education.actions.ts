"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
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

function parseRequiredDate(value: FormDataEntryValue | null, fieldLabel: string): Date {
  const date = new Date((value as string) ?? "");
  if (Number.isNaN(date.getTime())) {
    throw new Error(`${fieldLabel} is required and must be a valid date.`);
  }
  return date;
}

export async function deleteEducation(id: string) {
  try {
    await prisma.education.delete({ where: { id } });
    revalidatePath("/admin/education");
    revalidatePath("/about");
  } catch (error) {
    console.error("deleteEducation error:", error);
  }
}

export async function createEducation(formData: FormData) {
  try {
    const institution = formData.get("institution") as string;
    const degree = formData.get("degree") as string;
    if (!institution?.trim() || !degree?.trim()) {
      throw new Error("Institution and degree are required.");
    }

    const current = formData.get("current") === "on";
    const startDate = parseRequiredDate(formData.get("startDate"), "Start date");
    const endDateRaw = formData.get("endDate") as string;
    const endDate = current ? null : endDateRaw ? new Date(endDateRaw) : null;

    await prisma.education.create({
      data: {
        institution,
        logo: (formData.get("logo") as string) || null,
        degree,
        fieldOfStudy: (formData.get("fieldOfStudy") as string) || null,
        startDate,
        endDate,
        current,
        grade: (formData.get("grade") as string) || null,
        description: (formData.get("description") as string) || null,
        websiteUrl: (formData.get("websiteUrl") as string) || null,
        displayOrder: parseInt(formData.get("displayOrder") as string) || 0,
        isActive: formData.get("isActive") !== "off",
      },
    });
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error("createEducation error:", error);
    const message = error instanceof Error ? error.message : "Could not add education entry.";
    redirect(`/admin/education/new?error=${encodeURIComponent(message)}`);
  }

  revalidatePath("/admin/education");
  revalidatePath("/about");
  redirect("/admin/education");
}

export async function updateEducation(id: string, formData: FormData) {
  try {
    const institution = formData.get("institution") as string;
    const degree = formData.get("degree") as string;
    if (!institution?.trim() || !degree?.trim()) {
      throw new Error("Institution and degree are required.");
    }

    const current = formData.get("current") === "on";
    const startDate = parseRequiredDate(formData.get("startDate"), "Start date");
    const endDateRaw = formData.get("endDate") as string;
    const endDate = current ? null : endDateRaw ? new Date(endDateRaw) : null;

    await prisma.education.update({
      where: { id },
      data: {
        institution,
        logo: (formData.get("logo") as string) || null,
        degree,
        fieldOfStudy: (formData.get("fieldOfStudy") as string) || null,
        startDate,
        endDate,
        current,
        grade: (formData.get("grade") as string) || null,
        description: (formData.get("description") as string) || null,
        websiteUrl: (formData.get("websiteUrl") as string) || null,
        displayOrder: parseInt(formData.get("displayOrder") as string) || 0,
        isActive: formData.get("isActive") !== "off",
      },
    });
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error("updateEducation error:", error);
    const message = error instanceof Error ? error.message : "Could not save changes.";
    redirect(`/admin/education/${id}/edit?error=${encodeURIComponent(message)}`);
  }

  revalidatePath("/admin/education");
  revalidatePath("/about");
  redirect("/admin/education");
}
