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

export async function deleteTestimonial(id: string) {
  try {
    await prisma.testimonial.delete({ where: { id } });
    revalidatePath("/admin/testimonials");
    revalidatePath("/testimonials");
  } catch (error) {
    console.error("deleteTestimonial error:", error);
  }
}

export async function createTestimonial(formData: FormData) {
  try {
    const clientName = formData.get("clientName") as string;
    const feedback = formData.get("feedback") as string;
    if (!clientName?.trim() || !feedback?.trim()) {
      throw new Error("Client name and feedback are required.");
    }

    await prisma.testimonial.create({
      data: {
        clientName,
        company: (formData.get("company") as string) || null,
        jobTitle: (formData.get("jobTitle") as string) || null,
        photo: (formData.get("photo") as string) || null,
        rating: parseInt(formData.get("rating") as string) || 5,
        feedback,
        projectType: (formData.get("projectType") as string) || null,
        featured: formData.get("featured") === "on",
        isActive: formData.get("isActive") === "on",
        displayOrder: parseInt(formData.get("displayOrder") as string) || 0,
      },
    });
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error("createTestimonial error:", error);
    const message = error instanceof Error ? error.message : "Could not add testimonial.";
    redirect(`/admin/testimonials/new?error=${encodeURIComponent(message)}`);
  }

  revalidatePath("/admin/testimonials");
  revalidatePath("/testimonials");
  redirect("/admin/testimonials");
}

export async function updateTestimonial(id: string, formData: FormData) {
  try {
    const clientName = formData.get("clientName") as string;
    const feedback = formData.get("feedback") as string;
    if (!clientName?.trim() || !feedback?.trim()) {
      throw new Error("Client name and feedback are required.");
    }

    await prisma.testimonial.update({
      where: { id },
      data: {
        clientName,
        company: (formData.get("company") as string) || null,
        jobTitle: (formData.get("jobTitle") as string) || null,
        photo: (formData.get("photo") as string) || null,
        rating: parseInt(formData.get("rating") as string) || 5,
        feedback,
        projectType: (formData.get("projectType") as string) || null,
        featured: formData.get("featured") === "on",
        isActive: formData.get("isActive") === "on",
        displayOrder: parseInt(formData.get("displayOrder") as string) || 0,
      },
    });
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error("updateTestimonial error:", error);
    const message = error instanceof Error ? error.message : "Could not save changes.";
    redirect(`/admin/testimonials/${id}/edit?error=${encodeURIComponent(message)}`);
  }

  revalidatePath("/admin/testimonials");
  revalidatePath("/testimonials");
  redirect("/admin/testimonials");
}
