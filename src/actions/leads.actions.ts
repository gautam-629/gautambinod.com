"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import type { ActionResult } from "@/types";

export async function updateLeadStatus(id: string, formData: FormData): Promise<ActionResult> {
  try {
    const status = formData.get("status") as string;
    await prisma.contactMessage.update({
      where: { id },
      data: { status: status as any, isRead: true },
    });
    revalidatePath("/admin/leads");
    return { success: true };
  } catch (error) {
    console.error("updateLeadStatus error:", error);
    return { success: false, error: "Could not update status. Please try again." };
  }
}

export async function unsubscribeNewsletter(id: string): Promise<ActionResult> {
  try {
    await prisma.newsletterSubscriber.update({
      where: { id },
      data: { isActive: false },
    });
    revalidatePath("/admin/leads");
    return { success: true, message: "Subscriber unsubscribed." };
  } catch (error) {
    console.error("unsubscribeNewsletter error:", error);
    return { success: false, error: "Could not unsubscribe. Please try again." };
  }
}
