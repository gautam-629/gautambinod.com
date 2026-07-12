"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import type { ActionResult } from "@/types";

export async function markMessageRead(id: string): Promise<ActionResult> {
  try {
    await prisma.contactMessage.update({ where: { id }, data: { isRead: true } });
    revalidatePath("/admin/messages");
    return { success: true };
  } catch (error) {
    console.error("markMessageRead error:", error);
    return { success: false, error: "Could not mark as read. Please try again." };
  }
}

export async function updateMessageStatus(id: string, status: string): Promise<ActionResult> {
  try {
    await prisma.contactMessage.update({
      where: { id },
      data: { status: status as any },
    });
    revalidatePath("/admin/messages");
    return { success: true };
  } catch (error) {
    console.error("updateMessageStatus error:", error);
    return { success: false, error: "Could not update status. Please try again." };
  }
}

export async function deleteMessage(id: string): Promise<ActionResult> {
  try {
    await prisma.contactMessage.delete({ where: { id } });
    revalidatePath("/admin/messages");
    return { success: true, message: "Message deleted." };
  } catch (error) {
    console.error("deleteMessage error:", error);
    return { success: false, error: "Could not delete this message. Please try again." };
  }
}
