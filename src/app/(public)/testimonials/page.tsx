import { prisma } from "@/lib/prisma";
import { Star } from "lucide-react";
import { Avatar } from "@/components/common/Avatar";

export const metadata = { title: "Testimonials" };
export const revalidate = 3600;

export default async function TestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({
    where: { isActive: true },
    orderBy: [{ featured: "desc" }, { rating: "desc" }, { displayOrder: "asc" }],
  });

  return (
    <div className="container py-16">
      <div className="max-w-2xl mb-12">
        <h1 className="text-4xl font-bold mb-4">Client Testimonials</h1>
        <p className="text-muted-foreground text-lg">
          What clients say about working with me.
        </p>
        <div className="flex items-center gap-2 mt-4">
          <div className="flex items-center gap-0.5">
            {[1,2,3,4,5].map((s) => <Star key={s} className="h-5 w-5 fill-amber-400 text-amber-400" />)}
          </div>
          <span className="text-sm font-medium">
            {(testimonials.reduce((s, t) => s + t.rating, 0) / (testimonials.length || 1)).toFixed(1)} average
          </span>
          <span className="text-sm text-muted-foreground">({testimonials.length} reviews)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div key={t.id} className="p-6 rounded-xl border border-border/50 bg-card flex flex-col">
            <div className="flex items-center gap-0.5 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < t.rating ? "fill-amber-400 text-amber-400" : "text-muted/30"}`} />
              ))}
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-4">&ldquo;{t.feedback}&rdquo;</p>
            <div className="flex items-center gap-3 pt-4 border-t border-border/40">
              <Avatar src={t.photo} name={t.clientName} size={40} className="shrink-0" />
              <div>
                <p className="font-semibold text-sm">{t.clientName}</p>
                <p className="text-xs text-muted-foreground">
                  {t.jobTitle}{t.company ? ` · ${t.company}` : ""}
                </p>
                {t.projectType && <p className="text-xs text-primary mt-0.5">{t.projectType}</p>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {testimonials.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">No testimonials yet.</div>
      )}
    </div>
  );
}
