"use server";

import { prisma } from "@/lib/prisma";
import { deleteFromCloudinary } from "@/lib/cloudinary";
import { revalidatePath } from "next/cache";

export async function deleteMediaFile(id: string, publicId: string) {
  try {
    await deleteFromCloudinary(publicId);
  } catch (err) {
    console.error("Cloudinary delete error:", err);
  }
  await prisma.mediaFile.delete({ where: { id } });
  revalidatePath("/admin/media");
}
