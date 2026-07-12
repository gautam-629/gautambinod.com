import { prisma } from "@/lib/prisma";
import { updateAboutSection } from "@/actions/settings.actions";
import { CheckCircle2, AlertCircle } from "lucide-react";

export const metadata = { title: "About Section | Admin" };

export default async function AdminAboutPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; error?: string }>;
}) {
  const { success, error } = await searchParams;
  const about = await prisma.aboutSection.findFirst();

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold">About Section</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Manage your personal bio and about page content
        </p>
      </div>
      {success && (
        <div className="flex items-start gap-2 rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-700 dark:text-green-400">
          <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0" />
          About section saved successfully.
        </div>
      )}
      {error && (
        <div className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
          {error}
        </div>
      )}

      <form action={updateAboutSection} className="rounded-xl border border-border/50 bg-card p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1.5">Headline</label>
          <input
            name="headline"
            defaultValue={about?.headline ?? ""}
            placeholder="Passionate developer crafting digital experiences"
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">
            Biography <span className="text-destructive">*</span>
          </label>
          <p className="text-xs text-muted-foreground mb-1.5">
            HTML is supported (e.g. &lt;p&gt;, &lt;strong&gt;, &lt;ul&gt;)
          </p>
          <textarea
            name="biography"
            defaultValue={about?.biography ?? ""}
            rows={10}
            required
            placeholder="<p>Write your biography here...</p>"
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-ring resize-y"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium mb-1.5">Profile Image URL</label>
            <input
              name="profileImage"
              defaultValue={about?.profileImage ?? ""}
              placeholder="https://res.cloudinary.com/..."
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Resume URL</label>
            <input
              name="resumeUrl"
              defaultValue={about?.resumeUrl ?? ""}
              placeholder="https://res.cloudinary.com/.../resume.pdf"
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Location</label>
            <input
              name="location"
              defaultValue={about?.location ?? ""}
              placeholder="San Francisco, CA"
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Availability Status</label>
            <input
              name="availability"
              defaultValue={about?.availability ?? ""}
              placeholder="Available for freelance"
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Years of Experience</label>
            <input
              name="yearsOfExp"
              type="number"
              min="0"
              max="50"
              defaultValue={about?.yearsOfExp ?? ""}
              placeholder="5"
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Save About Section
        </button>
      </form>
    </div>
  );
}
