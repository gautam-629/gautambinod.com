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

export async function deleteCertificate(id: string) {
  try {
    await prisma.certificate.delete({ where: { id } });
    revalidatePath("/admin/certificates");
    revalidatePath("/about");
  } catch (error) {
    console.error("deleteCertificate error:", error);
  }
}

export async function createCertificate(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const issuer = formData.get("issuer") as string;
    if (!name?.trim() || !issuer?.trim()) {
      throw new Error("Certificate name and issuer are required.");
    }

    const issueDate = parseRequiredDate(formData.get("issueDate"), "Issue date");
    const expiryDateRaw = formData.get("expiryDate") as string;
    const expiryDate = expiryDateRaw ? new Date(expiryDateRaw) : null;

    await prisma.certificate.create({
      data: {
        name,
        issuer,
        issuerLogo: (formData.get("issuerLogo") as string) || null,
        issueDate,
        expiryDate,
        credentialId: (formData.get("credentialId") as string) || null,
        credentialUrl: (formData.get("credentialUrl") as string) || null,
        imageUrl: (formData.get("imageUrl") as string) || null,
        displayOrder: parseInt(formData.get("displayOrder") as string) || 0,
        isActive: formData.get("isActive") !== "off",
      },
    });
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error("createCertificate error:", error);
    const message = error instanceof Error ? error.message : "Could not add certificate.";
    redirect(`/admin/certificates/new?error=${encodeURIComponent(message)}`);
  }

  revalidatePath("/admin/certificates");
  revalidatePath("/about");
  redirect("/admin/certificates");
}

export async function updateCertificate(id: string, formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const issuer = formData.get("issuer") as string;
    if (!name?.trim() || !issuer?.trim()) {
      throw new Error("Certificate name and issuer are required.");
    }

    const issueDate = parseRequiredDate(formData.get("issueDate"), "Issue date");
    const expiryDateRaw = formData.get("expiryDate") as string;
    const expiryDate = expiryDateRaw ? new Date(expiryDateRaw) : null;

    await prisma.certificate.update({
      where: { id },
      data: {
        name,
        issuer,
        issuerLogo: (formData.get("issuerLogo") as string) || null,
        issueDate,
        expiryDate,
        credentialId: (formData.get("credentialId") as string) || null,
        credentialUrl: (formData.get("credentialUrl") as string) || null,
        imageUrl: (formData.get("imageUrl") as string) || null,
        displayOrder: parseInt(formData.get("displayOrder") as string) || 0,
        isActive: formData.get("isActive") !== "off",
      },
    });
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error("updateCertificate error:", error);
    const message = error instanceof Error ? error.message : "Could not save changes.";
    redirect(`/admin/certificates/${id}/edit?error=${encodeURIComponent(message)}`);
  }

  revalidatePath("/admin/certificates");
  revalidatePath("/about");
  redirect("/admin/certificates");
}
