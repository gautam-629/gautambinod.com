import { prisma } from "@/lib/prisma";
import { updateHeroSection } from "@/actions/settings.actions";
import { CheckCircle2, AlertCircle } from "lucide-react";

export const metadata = { title: "Hero Section | Admin" };

export default async function AdminHeroPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; error?: string }>;
}) {
  const { success, error } = await searchParams;
  const hero = await prisma.heroSection.findFirst();

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold">Hero Section</h1>
        <p className="text-muted-foreground text-sm mt-1">Manage the main hero section of your homepage</p>
      </div>

      {success && (
        <div className="flex items-start gap-2 rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-700 dark:text-green-400">
          <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0" />
          Hero section saved successfully.
        </div>
      )}
      {error && (
        <div className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
          {error}
        </div>
      )}

      <form action={updateHeroSection} className="rounded-xl border border-border/50 bg-card p-6 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium mb-1.5">Greeting</label>
            <input name="greeting" defaultValue={hero?.greeting || ""} placeholder="Hi, I'm" className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Your Name / Title *</label>
            <input name="title" defaultValue={hero?.title || ""} required placeholder="John Developer" className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Highlighted Text</label>
          <input name="highlightedText" defaultValue={hero?.highlightedText || ""} placeholder="Full Stack Engineer" className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          <p className="text-xs text-muted-foreground mt-1">Shown in accent color below your name</p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Subtitle</label>
          <input name="subtitle" defaultValue={hero?.subtitle || ""} placeholder="I build premium web applications..." className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Description</label>
          <textarea name="description" defaultValue={hero?.description || ""} rows={3} placeholder="Longer description shown below the subtitle..." className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Profile Image URL</label>
          <input name="profileImage" defaultValue={hero?.profileImage || ""} placeholder="https://res.cloudinary.com/..." className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium mb-1.5">Primary CTA Text</label>
            <input name="primaryCTAText" defaultValue={hero?.primaryCTAText || ""} placeholder="View My Work" className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Primary CTA URL</label>
            <input name="primaryCTAUrl" defaultValue={hero?.primaryCTAUrl || ""} placeholder="/projects" className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Secondary CTA Text</label>
            <input name="secondaryCTAText" defaultValue={hero?.secondaryCTAText || ""} placeholder="Hire Me" className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Secondary CTA URL</label>
            <input name="secondaryCTAUrl" defaultValue={hero?.secondaryCTAUrl || ""} placeholder="/contact" className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Resume URL</label>
          <input name="resumeUrl" defaultValue={hero?.resumeUrl || ""} placeholder="https://res.cloudinary.com/.../resume.pdf" className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>

        <button type="submit" className="w-full rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
          Save Hero Section
        </button>
      </form>
    </div>
  );
}
