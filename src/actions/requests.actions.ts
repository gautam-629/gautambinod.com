"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { projectRequestSchema } from "@/lib/validations/schemas";
import { sendProjectRequestNotification } from "@/lib/email";
import type { ActionResult } from "@/types";

export async function updateRequestStatus(id: string, formData: FormData): Promise<ActionResult> {
  try {
    const status = formData.get("status") as string;
    await prisma.projectRequest.update({
      where: { id },
      data: { status: status as any, isRead: true },
    });
    revalidatePath("/admin/requests");
    return { success: true };
  } catch (error) {
    console.error("updateRequestStatus error:", error);
    return { success: false, error: "Could not update status. Please try again." };
  }
}

export async function submitProjectRequest(
  data: unknown
): Promise<{ success: boolean; error?: string }> {
  try {
    const parsed = projectRequestSchema.safeParse(data);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      const firstError = Object.values(fieldErrors)[0]?.[0];
      return { success: false, error: firstError || "Invalid form data" };
    }

    await prisma.projectRequest.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone ?? null,
        company: parsed.data.company ?? null,
        projectType: parsed.data.projectType,
        title: parsed.data.title ?? null,
        description: parsed.data.description,
        budget: parsed.data.budget ?? null,
        timeline: parsed.data.timeline ?? null,
      },
    });

    // Notify admin by email — don't fail the whole submission if this fails,
    // the request is already safely saved in the database either way.
    try {
      await sendProjectRequestNotification({
        name: parsed.data.name,
        email: parsed.data.email,
        projectType: parsed.data.projectType,
        description: parsed.data.description,
        title: parsed.data.title,
        budget: parsed.data.budget,
        timeline: parsed.data.timeline,
        company: parsed.data.company,
      });
    } catch (emailError) {
      console.error("Failed to send project request notification email:", emailError);
    }

    revalidatePath("/admin/requests");
    return { success: true };
  } catch (error) {
    console.error("Project request submission error:", error);
    return { success: false, error: "Failed to submit request. Please try again." };
  }
}

export async function deleteRequest(id: string): Promise<ActionResult> {
  try {
    await prisma.projectRequest.delete({ where: { id } });
    revalidatePath("/admin/requests");
    return { success: true, message: "Request deleted." };
  } catch (error) {
    console.error("deleteRequest error:", error);
    return { success: false, error: "Could not delete this request. Please try again." };
  }
}
