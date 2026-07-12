"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
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

function parseRequiredDate(value: FormDataEntryValue | null, fieldLabel: string): Date {
  const date = new Date((value as string) ?? "");
  if (Number.isNaN(date.getTime())) {
    throw new Error(`${fieldLabel} is required and must be a valid date.`);
  }
  return date;
}

export async function deleteExperience(id: string) {
  try {
    await prisma.experience.delete({ where: { id } });
    revalidatePath("/admin/experience");
    revalidatePath("/experience");
    revalidatePath("/about");
  } catch (error) {
    console.error("deleteExperience error:", error);
  }
}

export async function createExperience(formData: FormData) {
  try {
    const companyName = formData.get("companyName") as string;
    const jobTitle = formData.get("jobTitle") as string;
    if (!companyName?.trim() || !jobTitle?.trim()) {
      throw new Error("Company name and job title are required.");
    }

    const currentlyWorking = formData.get("currentlyWorking") === "on";
    const startDate = parseRequiredDate(formData.get("startDate"), "Start date");
    const endDateRaw = formData.get("endDate") as string;
    const endDate = currentlyWorking
      ? null
      : endDateRaw
        ? new Date(endDateRaw)
        : null;

    await prisma.experience.create({
      data: {
        companyName,
        companyLogo: (formData.get("companyLogo") as string) || null,
        jobTitle,
        employmentType: (formData.get("employmentType") as any) || "FULL_TIME",
        workMode: (formData.get("workMode") as any) || null,
        location: (formData.get("location") as string) || null,
        startDate,
        endDate,
        currentlyWorking,
        shortDescription: (formData.get("shortDescription") as string) || null,
        description: (formData.get("description") as string) || "",
        responsibilities: parseLines(formData.get("responsibilities")),
        achievements: parseLines(formData.get("achievements")),
        technologies: parseCsv(formData.get("technologies")),
        companyWebsite: (formData.get("companyWebsite") as string) || null,
        featured: formData.get("featured") === "on",
        status: formData.get("status") !== "off",
        displayOrder: parseInt(formData.get("displayOrder") as string) || 0,
      },
    });
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error("createExperience error:", error);
    const message = error instanceof Error ? error.message : "Could not add experience.";
    redirect(`/admin/experience/new?error=${encodeURIComponent(message)}`);
  }

  revalidatePath("/admin/experience");
  revalidatePath("/experience");
  revalidatePath("/about");
  redirect("/admin/experience");
}

export async function updateExperience(id: string, formData: FormData) {
  try {
    const companyName = formData.get("companyName") as string;
    const jobTitle = formData.get("jobTitle") as string;
    if (!companyName?.trim() || !jobTitle?.trim()) {
      throw new Error("Company name and job title are required.");
    }

    const currentlyWorking = formData.get("currentlyWorking") === "on";
    const startDate = parseRequiredDate(formData.get("startDate"), "Start date");
    const endDateRaw = formData.get("endDate") as string;
    const endDate = currentlyWorking
      ? null
      : endDateRaw
        ? new Date(endDateRaw)
        : null;

    await prisma.experience.update({
      where: { id },
      data: {
        companyName,
        companyLogo: (formData.get("companyLogo") as string) || null,
        jobTitle,
        employmentType: (formData.get("employmentType") as any) || "FULL_TIME",
        workMode: (formData.get("workMode") as any) || null,
        location: (formData.get("location") as string) || null,
        startDate,
        endDate,
        currentlyWorking,
        shortDescription: (formData.get("shortDescription") as string) || null,
        description: (formData.get("description") as string) || "",
        responsibilities: parseLines(formData.get("responsibilities")) ?? [],
        achievements: parseLines(formData.get("achievements")) ?? [],
        technologies: parseCsv(formData.get("technologies")) ?? [],
        companyWebsite: (formData.get("companyWebsite") as string) || null,
        featured: formData.get("featured") === "on",
        status: formData.get("status") !== "off",
        displayOrder: parseInt(formData.get("displayOrder") as string) || 0,
      },
    });
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error("updateExperience error:", error);
    const message = error instanceof Error ? error.message : "Could not save changes.";
    redirect(`/admin/experience/${id}/edit?error=${encodeURIComponent(message)}`);
  }

  revalidatePath("/admin/experience");
  revalidatePath("/experience");
  revalidatePath("/about");
  redirect("/admin/experience");
}
