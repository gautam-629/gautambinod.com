import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateExperience } from "@/actions/experience.actions";
import { toStringArray } from "@/types";
import { AlertCircle } from "lucide-react";

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}
export const metadata = { title: "Edit Experience | Admin" };

export default async function EditExperiencePage({ params, searchParams }: Props) {
  const { id } = await params;
  const { error } = await searchParams;
  const exp = await prisma.experience.findUnique({ where: { id } });
  if (!exp) notFound();
  const action = updateExperience.bind(null, exp.id);

  const fmt = (d: Date) => d.toISOString().split("T")[0];
  const responsibilities = toStringArray(exp.responsibilities);
  const achievements = toStringArray(exp.achievements);
  const technologies = toStringArray(exp.technologies);

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Edit Experience</h1>
        <p className="text-muted-foreground text-sm mt-1">{exp.jobTitle} at {exp.companyName}</p>
      </div>
      {error && (
        <div className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
          {error}
        </div>
      )}
      <form action={action} className="rounded-xl border border-border/50 bg-card p-6 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium mb-1.5">Company Name *</label>
            <input name="companyName" required defaultValue={exp.companyName}
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Job Title *</label>
            <input name="jobTitle" required defaultValue={exp.jobTitle}
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Employment Type</label>
            <select name="employmentType" defaultValue={exp.employmentType}
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
              <option value="FULL_TIME">Full Time</option>
              <option value="PART_TIME">Part Time</option>
              <option value="CONTRACT">Contract</option>
              <option value="FREELANCE">Freelance</option>
              <option value="INTERNSHIP">Internship</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Work Mode</label>
            <select name="workMode" defaultValue={exp.workMode ?? ""}
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
              <option value="">Not specified</option>
              <option value="REMOTE">Remote</option>
              <option value="HYBRID">Hybrid</option>
              <option value="ONSITE">Onsite</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Location</label>
            <input name="location" defaultValue={exp.location ?? ""}
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Company Website</label>
            <input name="companyWebsite" type="url" defaultValue={exp.companyWebsite ?? ""}
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Start Date *</label>
            <input name="startDate" type="date" required defaultValue={fmt(exp.startDate)}
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">End Date</label>
            <input name="endDate" type="date" defaultValue={exp.endDate ? fmt(exp.endDate) : ""}
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
        </div>

        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" name="currentlyWorking" defaultChecked={exp.currentlyWorking} className="rounded" />
          <span className="text-sm">Currently working here</span>
        </label>

        <div>
          <label className="block text-sm font-medium mb-1.5">Short Description</label>
          <input name="shortDescription" defaultValue={exp.shortDescription ?? ""}
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Full Description</label>
          <textarea name="description" rows={4} defaultValue={exp.description}
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-y" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Responsibilities (one per line)</label>
          <textarea name="responsibilities" rows={4} defaultValue={responsibilities.join("\n")}
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-y" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Achievements (one per line)</label>
          <textarea name="achievements" rows={3} defaultValue={achievements.join("\n")}
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-y" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Technologies (comma-separated)</label>
          <input name="technologies" defaultValue={technologies.join(", ")}
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>

        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="featured" defaultChecked={exp.featured} className="rounded" />
            <span className="text-sm">Featured</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="status" defaultChecked={exp.status} className="rounded" />
            <span className="text-sm">Active</span>
          </label>
        </div>

        <div className="flex gap-3 pt-2">
          <button type="submit"
            className="flex-1 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
            Save Changes
          </button>
          <a href="/admin/experience"
            className="rounded-md border border-border px-5 py-3 text-sm font-medium hover:bg-accent transition-colors">
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}
