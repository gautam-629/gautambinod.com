"use server";

import { prisma } from "@/lib/prisma";
import { contactSchema, type ContactFormData } from "@/lib/validations/schemas";
import { sendContactNotification } from "@/lib/email";

export async function submitContact(data: ContactFormData): Promise<{ success: boolean; error?: string }> {
  try {
    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) {
      return { success: false, error: "Invalid form data" };
    }

    await prisma.contactMessage.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone,
        company: parsed.data.company,
        budget: parsed.data.budget,
        service: parsed.data.service,
        message: parsed.data.message,
      },
    });

    // Send email notification to admin
    try {
      await sendContactNotification({
        name: parsed.data.name,
        email: parsed.data.email,
        message: parsed.data.message,
        service: parsed.data.service,
        budget: parsed.data.budget,
      });
    } catch (emailError) {
      console.error("Failed to send email notification:", emailError);
      // Don't fail the whole action if email fails
    }

    return { success: true };
  } catch (error) {
    console.error("Contact form submission error:", error);
    return { success: false, error: "Failed to send message. Please try again." };
  }
}
