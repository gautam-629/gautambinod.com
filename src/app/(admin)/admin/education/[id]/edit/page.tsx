import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateEducation } from "@/actions/education.actions";
import { AlertCircle } from "lucide-react";

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}

export const metadata = { title: "Edit Education | Admin" };

export default async function EditEducationPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { error } = await searchParams;

  const edu = await prisma.education.findUnique({ where: { id } });
  if (!edu) notFound();

  const action = updateEducation.bind(null, edu.id);
  const fmt = (d: Date) => d.toISOString().split("T")[0];

  return (
    <div className="max-w-xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Edit Education</h1>
        <p className="text-muted-foreground text-sm mt-1">{edu.institution}</p>
      </div>
      {error && (
        <div className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
          {error}
        </div>
      )}
      <form action={action} className="rounded-xl border border-border/50 bg-card p-6 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium mb-1.5">Institution *</label>
            <input name="institution" required defaultValue={edu.institution}
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Degree *</label>
            <input name="degree" required defaultValue={edu.degree}
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Field of Study</label>
            <input name="fieldOfStudy" defaultValue={edu.fieldOfStudy ?? ""}
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Start Date *</label>
            <input name="startDate" type="date" required defaultValue={fmt(edu.startDate)}
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">End Date</label>
            <input name="endDate" type="date" defaultValue={edu.endDate ? fmt(edu.endDate) : ""}
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
        </div>

        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" name="current" defaultChecked={edu.current} className="rounded" />
          <span className="text-sm">Currently studying here</span>
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium mb-1.5">Grade / GPA</label>
            <input name="grade" defaultValue={edu.grade ?? ""}
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Display Order</label>
            <input name="displayOrder" type="number" defaultValue={edu.displayOrder}
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Logo URL</label>
          <input name="logo" defaultValue={edu.logo ?? ""}
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Website URL</label>
          <input name="websiteUrl" type="url" defaultValue={edu.websiteUrl ?? ""}
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Description</label>
          <textarea name="description" rows={3} defaultValue={edu.description ?? ""}
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-y" />
        </div>

        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" name="isActive" defaultChecked={edu.isActive} className="rounded" />
          <span className="text-sm">Show on About page</span>
        </label>

        <div className="flex gap-3 pt-2">
          <button type="submit"
            className="flex-1 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
            Save Changes
          </button>
          <a href="/admin/education"
            className="rounded-md border border-border px-5 py-3 text-sm font-medium hover:bg-accent transition-colors">
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}
