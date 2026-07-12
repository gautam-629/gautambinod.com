import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { ArrowRight } from "lucide-react";

export const metadata = { title: "Case Studies" };
export const revalidate = 3600;

export default async function CaseStudiesPage() {
  const caseStudies = await prisma.caseStudy.findMany({
    where: { isActive: true },
    orderBy: [{ featured: "desc" }, { displayOrder: "asc" }],
  });

  return (
    <div className="container py-16">
      <div className="max-w-2xl mb-12">
        <h1 className="text-4xl font-bold mb-4">Case Studies</h1>
        <p className="text-muted-foreground text-lg">
          Deep dives into selected projects — the problems, the process, and the results.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {caseStudies.map((cs) => (
          <Link key={cs.id} href={`/case-studies/${cs.slug}`}>
            <div className="group rounded-2xl border border-border/50 bg-card overflow-hidden hover:border-primary/30 hover:shadow-xl transition-all duration-300 h-full">
              {cs.featuredImage && (
                <div className="relative h-52 overflow-hidden">
                  <Image src={cs.featuredImage} alt={cs.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
              )}
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {cs.clientName && <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{cs.clientName}</span>}
                  {cs.industry && <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">{cs.industry}</span>}
                </div>
                <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{cs.title}</h2>
                <p className="text-sm text-muted-foreground line-clamp-2">{cs.problem}</p>
                <div className="flex items-center gap-1 mt-4 text-primary text-sm font-medium">
                  Read case study <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {caseStudies.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">No case studies published yet.</div>
      )}
    </div>
  );
}
