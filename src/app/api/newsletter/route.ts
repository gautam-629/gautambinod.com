import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    await prisma.newsletterSubscriber.upsert({
      where: { email: parsed.data.email },
      update: { isActive: true, name: parsed.data.name },
      create: {
        email: parsed.data.email,
        name: parsed.data.name,
        isActive: true,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
