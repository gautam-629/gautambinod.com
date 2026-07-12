"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { ActionResult } from "@/types";

function isRedirectError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "digest" in error &&
    typeof (error as { digest?: unknown }).digest === "string" &&
    (error as { digest: string }).digest.startsWith("NEXT_REDIRECT")
  );
}

export async function updateSeoSettings(page: string, formData: FormData): Promise<ActionResult> {
  try {
    await prisma.seoSettings.upsert({
      where: { page },
      update: {
        metaTitle: (formData.get("metaTitle") as string) || null,
        metaDesc: (formData.get("metaDesc") as string) || null,
        keywords: (formData.get("keywords") as string) || null,
        ogTitle: (formData.get("ogTitle") as string) || null,
        ogDescription: (formData.get("ogDescription") as string) || null,
        noIndex: formData.get("noIndex") === "on",
      },
      create: {
        page,
        metaTitle: (formData.get("metaTitle") as string) || null,
        metaDesc: (formData.get("metaDesc") as string) || null,
        keywords: (formData.get("keywords") as string) || null,
        ogTitle: (formData.get("ogTitle") as string) || null,
        ogDescription: (formData.get("ogDescription") as string) || null,
        noIndex: formData.get("noIndex") === "on",
      },
    });
    revalidatePath("/admin/seo");
    return { success: true, message: "SEO settings updated." };
  } catch (error) {
    console.error("updateSeoSettings error:", error);
    return { success: false, error: "Could not save SEO settings. Please try again." };
  }
}

export async function updateSiteSettings(formData: FormData) {
  try {
    const existing = await prisma.siteSettings.findFirst();
    const data = {
      siteName: (formData.get("siteName") as string) || "DevFolio",
      siteTagline: (formData.get("siteTagline") as string) || null,
      siteDescription: (formData.get("siteDescription") as string) || null,
      siteLogo: (formData.get("siteLogo") as string) || null,
      siteEmail: (formData.get("siteEmail") as string) || null,
      sitePhone: (formData.get("sitePhone") as string) || null,
      siteAddress: (formData.get("siteAddress") as string) || null,
      currency: (formData.get("currency") as string) || "USD",
      maintenanceMode: formData.get("maintenanceMode") === "on",
      analyticsId: (formData.get("analyticsId") as string) || null,
    };
    if (existing) {
      await prisma.siteSettings.update({ where: { id: existing.id }, data });
    } else {
      await prisma.siteSettings.create({ data });
    }
    revalidatePath("/admin/settings");
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error("updateSiteSettings error:", error);
    redirect("/admin/settings?error=" + encodeURIComponent("Could not save settings. Please try again."));
  }
  redirect("/admin/settings?success=1");
}

export async function updateHeroSection(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    if (!title?.trim()) {
      throw new Error("Title is required.");
    }
    const existing = await prisma.heroSection.findFirst();
    const data = {
      greeting: (formData.get("greeting") as string) || null,
      title,
      highlightedText: (formData.get("highlightedText") as string) || null,
      subtitle: (formData.get("subtitle") as string) || null,
      description: (formData.get("description") as string) || null,
      profileImage: (formData.get("profileImage") as string) || null,
      primaryCTAText: (formData.get("primaryCTAText") as string) || null,
      primaryCTAUrl: (formData.get("primaryCTAUrl") as string) || null,
      secondaryCTAText: (formData.get("secondaryCTAText") as string) || null,
      secondaryCTAUrl: (formData.get("secondaryCTAUrl") as string) || null,
      resumeUrl: (formData.get("resumeUrl") as string) || null,
      isActive: true,
    };
    if (existing) {
      await prisma.heroSection.update({ where: { id: existing.id }, data });
    } else {
      await prisma.heroSection.create({ data });
    }
    revalidatePath("/admin/hero");
    revalidatePath("/");
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error("updateHeroSection error:", error);
    redirect("/admin/hero?error=" + encodeURIComponent(
      error instanceof Error ? error.message : "Could not save hero section."
    ));
  }
  redirect("/admin/hero?success=1");
}

export async function updateAboutSection(formData: FormData) {
  try {
    const existing = await prisma.aboutSection.findFirst();
    const data = {
      headline: (formData.get("headline") as string) || null,
      biography: (formData.get("biography") as string) || "",
      profileImage: (formData.get("profileImage") as string) || null,
      resumeUrl: (formData.get("resumeUrl") as string) || null,
      location: (formData.get("location") as string) || null,
      availability: (formData.get("availability") as string) || null,
      yearsOfExp: formData.get("yearsOfExp")
        ? parseInt(formData.get("yearsOfExp") as string)
        : null,
      isActive: true,
    };
    if (existing) {
      await prisma.aboutSection.update({ where: { id: existing.id }, data });
    } else {
      await prisma.aboutSection.create({ data });
    }
    revalidatePath("/admin/about");
    revalidatePath("/about");
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error("updateAboutSection error:", error);
    redirect("/admin/about?error=" + encodeURIComponent("Could not save about section. Please try again."));
  }
  redirect("/admin/about?success=1");
}

export async function subscribeNewsletter(
  email: string,
  name?: string
): Promise<ActionResult> {
  try {
    if (!email?.trim() || !email.includes("@")) {
      return { success: false, error: "Please enter a valid email address." };
    }
    await prisma.newsletterSubscriber.upsert({
      where: { email },
      update: { isActive: true, name },
      create: { email, name, isActive: true },
    });
    return { success: true, message: "You're subscribed!" };
  } catch (error) {
    console.error("subscribeNewsletter error:", error);
    return { success: false, error: "Could not subscribe. Please try again." };
  }
}
