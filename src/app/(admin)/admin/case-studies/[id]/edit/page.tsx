import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateCaseStudy } from "@/actions/case-studies.actions";
import { toStringArray } from "@/types";
import { AlertCircle } from "lucide-react";

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}

export const metadata = { title: "Edit Case Study | Admin" };

export default async function EditCaseStudyPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { error } = await searchParams;

  const cs = await prisma.caseStudy.findUnique({ where: { id } });
  if (!cs) notFound();

  const action = updateCaseStudy.bind(null, cs.id);
  const technologies = toStringArray(cs.technologies);

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Edit Case Study</h1>
        <p className="text-muted-foreground text-sm mt-1">{cs.title}</p>
      </div>
      {error && (
        <div className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
          {error}
        </div>
      )}
      <form action={action} className="rounded-xl border border-border/50 bg-card p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1.5">Title *</label>
          <input name="title" required defaultValue={cs.title}
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Slug</label>
          <input name="slug" defaultValue={cs.slug}
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium mb-1.5">Client Name</label>
            <input name="clientName" defaultValue={cs.clientName ?? ""} placeholder="Acme Corp"
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Industry</label>
            <input name="industry" defaultValue={cs.industry ?? ""} placeholder="E-Commerce, FinTech, Healthcare..."
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Featured Image URL</label>
          <input name="featuredImage" defaultValue={cs.featuredImage ?? ""} placeholder="https://res.cloudinary.com/..."
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Problem Statement *</label>
          <textarea name="problem" required rows={4} defaultValue={cs.problem}
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-y" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Solution *</label>
          <textarea name="solution" required rows={4} defaultValue={cs.solution}
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-y" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Development Process *</label>
          <textarea name="process" required rows={4} defaultValue={cs.process}
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-y" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Outcome *</label>
          <textarea name="outcome" required rows={3} defaultValue={cs.outcome}
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-y" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Technologies (comma-separated)</label>
          <input name="technologies" defaultValue={technologies.join(", ")} placeholder="React, Node.js, AWS"
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium mb-1.5">Meta Title (SEO)</label>
            <input name="seoTitle" defaultValue={cs.seoTitle ?? ""}
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Display Order</label>
            <input name="displayOrder" type="number" defaultValue={cs.displayOrder}
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Meta Description (SEO)</label>
          <textarea name="seoDescription" rows={2} defaultValue={cs.seoDescription ?? ""}
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
        </div>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="featured" defaultChecked={cs.featured} className="rounded" />
            <span className="text-sm">Featured</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="isActive" defaultChecked={cs.isActive} className="rounded" />
            <span className="text-sm">Active</span>
          </label>
        </div>
        <div className="flex gap-3 pt-2">
          <button type="submit"
            className="flex-1 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
            Save Changes
          </button>
          <a href="/admin/case-studies"
            className="rounded-md border border-border px-5 py-3 text-sm font-medium hover:bg-accent transition-colors">
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}
