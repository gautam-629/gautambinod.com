import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { toStringArray, toObjectArray } from "@/types";

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const cs = await prisma.caseStudy.findUnique({ where: { slug } });
  if (!cs) return { title: "Not Found" };
  return { title: cs.seoTitle ?? cs.title, description: cs.seoDescription };
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const { slug } = await params;
  const cs = await prisma.caseStudy.findUnique({
    where: { slug, isActive: true },
  });
  if (!cs) notFound();

  const technologies = toStringArray(cs.technologies);
  const metrics = toObjectArray<{ label: string; value: string }>(cs.metrics);

  return (
    <div className="container py-16 max-w-4xl mx-auto">
      <Link
        href="/case-studies"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> All Case Studies
      </Link>

      {cs.featuredImage && (
        <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden mb-10">
          <Image
            src={cs.featuredImage}
            alt={cs.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 896px) 100vw, 896px"
          />
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3 mb-6">
        {cs.clientName && (
          <span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
            {cs.clientName}
          </span>
        )}
        {cs.industry && (
          <span className="text-sm bg-muted text-muted-foreground px-3 py-1 rounded-full">
            {cs.industry}
          </span>
        )}
      </div>

      <h1 className="text-3xl sm:text-4xl font-bold mb-10">{cs.title}</h1>

      {metrics.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12 p-6 rounded-2xl bg-primary/5 border border-primary/20">
          {metrics.map((m, i) => (
            <div key={i} className="text-center">
              <p className="text-2xl font-bold text-primary">{m.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{m.label}</p>
            </div>
          ))}
        </div>
      )}

      <div className="space-y-10">
        {[
          { title: "The Problem", content: cs.problem },
          { title: "The Solution", content: cs.solution },
          { title: "Development Process", content: cs.process },
          { title: "Outcome", content: cs.outcome },
        ].map(({ title, content }) => (
          <section key={title}>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-primary inline-block" />
              {title}
            </h2>
            <p className="text-muted-foreground leading-relaxed">{content}</p>
          </section>
        ))}
      </div>

      {technologies.length > 0 && (
        <div className="mt-10 pt-8 border-t border-border/50">
          <h3 className="font-semibold mb-4">Technologies Used</h3>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <span key={tech} className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-lg font-medium">
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="mt-10 pt-8 border-t border-border/50 text-center">
        <h3 className="text-xl font-bold mb-3">Want similar results for your project?</h3>
        <p className="text-muted-foreground mb-6">
          Let&apos;s discuss how I can help solve your specific challenges.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Start a Conversation
        </Link>
      </div>
    </div>
  );
}
