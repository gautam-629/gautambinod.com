import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Plus, Pencil, Star } from "lucide-react";
import { deleteTestimonial } from "@/actions/testimonials.actions";
import { DeleteButton } from "@/components/admin/DeleteButton";

export const metadata = { title: "Testimonials | Admin" };

export default async function AdminTestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: [{ featured: "desc" }, { displayOrder: "asc" }],
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Testimonials</h1>
          <p className="text-muted-foreground text-sm mt-1">{testimonials.length} total</p>
        </div>
        <Link
          href="/admin/testimonials/new"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4" /> Add Testimonial
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {testimonials.map((t) => (
          <div key={t.id} className="rounded-xl border border-border/50 bg-card p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-sm">{t.clientName}</span>
                  {t.featured && <span className="text-xs bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 px-2 py-0.5 rounded-full">Featured</span>}
                </div>
                <p className="text-xs text-primary">{t.jobTitle}{t.company ? ` · ${t.company}` : ""}</p>
                <div className="flex items-center gap-0.5 mt-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{t.feedback}</p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <Link href={`/admin/testimonials/${t.id}/edit`} className="p-1.5 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors">
                  <Pencil className="h-3.5 w-3.5" />
                </Link>
                <DeleteButton
                  action={deleteTestimonial.bind(null, t.id)}
                  confirmMessage="Delete this testimonial? This cannot be undone."
                />
              </div>
            </div>
          </div>
        ))}
        {testimonials.length === 0 && (
          <div className="col-span-2 text-center py-16 text-muted-foreground">
            <p className="mb-3">No testimonials yet</p>
            <Link href="/admin/testimonials/new" className="text-primary hover:underline text-sm">Add your first testimonial →</Link>
          </div>
        )}
      </div>
    </div>
  );
}
