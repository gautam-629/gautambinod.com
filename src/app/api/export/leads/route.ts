import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  const headers = ["Name", "Email", "Phone", "Company", "Service", "Budget", "Status", "Date"];
  const rows = messages.map((m) => [
    m.name, m.email, m.phone ?? "", m.company ?? "",
    m.service ?? "", m.budget ?? "", m.status,
    m.createdAt.toISOString().split("T")[0],
  ]);

  const csv = [headers, ...rows]
    .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
    .join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="leads-${new Date().toISOString().split("T")[0]}.csv"`,
    },
  });
}
