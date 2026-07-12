import { createExperience } from "@/actions/experience.actions";
import { AlertCircle } from "lucide-react";

export const metadata = { title: "Add Experience | Admin" };

export default async function NewExperiencePage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Add Experience</h1>
        <p className="text-muted-foreground text-sm mt-1">Add a work experience entry</p>
      </div>
      {error && (
        <div className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
          {error}
        </div>
      )}

      <form action={createExperience} className="rounded-xl border border-border/50 bg-card p-6 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium mb-1.5">
              Company Name <span className="text-destructive">*</span>
            </label>
            <input
              name="companyName"
              required
              placeholder="TechCorp Inc."
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">
              Job Title <span className="text-destructive">*</span>
            </label>
            <input
              name="jobTitle"
              required
              placeholder="Senior Full Stack Developer"
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Employment Type</label>
            <select
              name="employmentType"
              defaultValue="FULL_TIME"
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="FULL_TIME">Full Time</option>
              <option value="PART_TIME">Part Time</option>
              <option value="CONTRACT">Contract</option>
              <option value="FREELANCE">Freelance</option>
              <option value="INTERNSHIP">Internship</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Work Mode</label>
            <select
              name="workMode"
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Not specified</option>
              <option value="REMOTE">Remote</option>
              <option value="HYBRID">Hybrid</option>
              <option value="ONSITE">Onsite</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Location</label>
            <input
              name="location"
              placeholder="San Francisco, CA"
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Company Website</label>
            <input
              name="companyWebsite"
              type="url"
              placeholder="https://company.com"
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">
              Start Date <span className="text-destructive">*</span>
            </label>
            <input
              name="startDate"
              type="date"
              required
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">End Date</label>
            <input
              name="endDate"
              type="date"
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Leave blank if currently working here
            </p>
          </div>
        </div>

        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" name="currentlyWorking" className="rounded" />
          <span className="text-sm">Currently working here</span>
        </label>

        <div>
          <label className="block text-sm font-medium mb-1.5">Short Description</label>
          <input
            name="shortDescription"
            placeholder="One-line role summary"
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Full Description</label>
          <textarea
            name="description"
            rows={4}
            placeholder="Detailed description of your role and contributions..."
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-y"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Responsibilities</label>
          <textarea
            name="responsibilities"
            rows={4}
            placeholder="One responsibility per line"
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-y"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Achievements</label>
          <textarea
            name="achievements"
            rows={3}
            placeholder="One achievement per line"
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-y"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Technologies</label>
          <input
            name="technologies"
            placeholder="React, Node.js, PostgreSQL (comma-separated)"
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="featured" className="rounded" />
            <span className="text-sm">Featured (shown on About page)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="status" defaultChecked className="rounded" />
            <span className="text-sm">Active</span>
          </label>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="flex-1 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Add Experience
          </button>
          <a
            href="/admin/experience"
            className="rounded-md border border-border px-5 py-3 text-sm font-medium hover:bg-accent transition-colors"
          >
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}
