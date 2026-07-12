import { prisma } from "@/lib/prisma";
import { toStringArray, toObjectArray } from "@/types";
import { NewsletterSignup } from "@/features/newsletter/NewsletterSignup";
import { formatFullDate } from "@/utils/format";
import { CheckCircle2, Circle } from "lucide-react";

export const metadata = { title: "Currently Building" };
export const revalidate = 1800;

interface FeatureItem {
  name: string;
  done: boolean;
}

export default async function WorkingProductsPage() {
  const products = await prisma.workingProduct.findMany({
    where: { isActive: true },
    orderBy: [{ featured: "desc" }, { displayOrder: "asc" }],
  });

  return (
    <div className="container py-16 max-w-4xl mx-auto">
      <div className="max-w-2xl mb-12">
        <h1 className="text-4xl font-bold mb-4">Currently Building</h1>
        <p className="text-muted-foreground text-lg">
          A look into my development pipeline — what I&apos;m working on right now and what&apos;s coming next.
        </p>
      </div>

      <div className="space-y-8">
        {products.map((product) => {
          const techStack = toStringArray(product.techStack);
          const features = toObjectArray<FeatureItem>(product.features);

          return (
            <div key={product.id} className="rounded-2xl border border-border/50 bg-card p-6 sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-xl font-bold">{product.name}</h2>
                  {product.tagline && (
                    <p className="text-muted-foreground text-sm mt-1">{product.tagline}</p>
                  )}
                </div>
                <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium shrink-0">
                  {product.status.replace(/_/g, " ")}
                </span>
              </div>

              {product.description && (
                <p className="text-sm text-muted-foreground mb-6">{product.description}</p>
              )}

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="font-medium">Progress</span>
                  <span className="text-primary font-semibold">{product.progress}%</span>
                </div>
                <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-700"
                    style={{ width: `${product.progress}%` }}
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-4 text-sm mb-6">
                {product.currentMilestone && (
                  <span className="text-muted-foreground">
                    📍 Current: <span className="text-foreground font-medium">{product.currentMilestone}</span>
                  </span>
                )}
                {product.launchDate && (
                  <span className="text-muted-foreground">
                    🗓️ Expected launch: <span className="text-foreground font-medium">{formatFullDate(product.launchDate)}</span>
                  </span>
                )}
              </div>

              {/* Feature Checklist */}
              {features.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold mb-3">Feature Checklist</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        {f.done ? (
                          <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                        ) : (
                          <Circle className="h-4 w-4 text-muted-foreground shrink-0" />
                        )}
                        <span className={f.done ? "text-foreground" : "text-muted-foreground"}>
                          {f.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tech Stack */}
              {techStack.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border/40">
                  {techStack.map((tech) => (
                    <span key={tech} className="text-xs bg-muted px-2 py-0.5 rounded-md text-muted-foreground">
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {products.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            Nothing in the pipeline right now — check back soon!
          </div>
        )}
      </div>

      {/* Newsletter CTA */}
      <div className="mt-16 rounded-2xl bg-primary/5 border border-primary/20 p-8 text-center">
        <h2 className="text-xl font-bold mb-2">Want to be notified at launch?</h2>
        <p className="text-muted-foreground text-sm mb-6">
          Get an email the moment any of these products go live.
        </p>
        <NewsletterSignup />
      </div>
    </div>
  );
}
