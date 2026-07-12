import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateTestimonial } from "@/actions/testimonials.actions";
import { AlertCircle } from "lucide-react";

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}
export const metadata = { title: "Edit Testimonial | Admin" };

export default async function EditTestimonialPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { error } = await searchParams;
  const t = await prisma.testimonial.findUnique({ where: { id } });
  if (!t) notFound();
  const action = updateTestimonial.bind(null, t.id);

  return (
    <div className="max-w-lg space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Edit Testimonial</h1>
        <p className="text-muted-foreground text-sm mt-1">{t.clientName}</p>
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
            <label className="block text-sm font-medium mb-1.5">Client Name *</label>
            <input name="clientName" required defaultValue={t.clientName}
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Job Title</label>
            <input name="jobTitle" defaultValue={t.jobTitle ?? ""}
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Company</label>
            <input name="company" defaultValue={t.company ?? ""}
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Rating (1-5)</label>
            <select name="rating" defaultValue={t.rating}
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
              {[5,4,3,2,1].map((r) => <option key={r} value={r}>{"★".repeat(r)} ({r})</option>)}
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Photo URL</label>
          <input name="photo" defaultValue={t.photo ?? ""}
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Feedback *</label>
          <textarea name="feedback" required rows={5} defaultValue={t.feedback}
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-y" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Project Type</label>
          <input name="projectType" defaultValue={t.projectType ?? ""}
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="featured" defaultChecked={t.featured} className="rounded" />
            <span className="text-sm">Featured</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="isActive" defaultChecked={t.isActive} className="rounded" />
            <span className="text-sm">Active</span>
          </label>
        </div>
        <div className="flex gap-3 pt-2">
          <button type="submit"
            className="flex-1 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
            Save Changes
          </button>
          <a href="/admin/testimonials"
            className="rounded-md border border-border px-5 py-3 text-sm font-medium hover:bg-accent transition-colors">
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}
