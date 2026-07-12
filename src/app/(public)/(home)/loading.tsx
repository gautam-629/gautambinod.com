import { InteractiveHomepageLayout } from "@/components/common/InteractiveHomepageLayout";
import { HeroSkeleton } from "@/components/skeletons/HeroSkeleton";
import { StatsSkeleton } from "@/components/skeletons/StatsSkeleton";
import { CardGridSkeleton } from "@/components/skeletons/CardGridSkeleton";
import { ServicesOverviewSkeleton } from "@/components/skeletons/ServicesSkeleton";
import { TestimonialsSkeleton } from "@/components/skeletons/TestimonialsSkeleton";
import { LatestBlogsSkeleton } from "@/components/skeletons/BlogSkeleton";
import { Skeleton } from "@/components/skeletons/Skeleton";

function CTASkeleton() {
  return (
    <section className="py-24 bg-muted/20 relative overflow-hidden border-t border-border/10">
      <div className="container text-center space-y-4">
        <Skeleton className="h-12 w-full max-w-xl mx-auto mb-2" />
        <Skeleton className="h-4 w-full max-w-md mx-auto mb-8" />
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Skeleton className="h-12 w-36 rounded-md" />
          <Skeleton className="h-12 w-36 rounded-md" />
        </div>
      </div>
    </section>
  );
}

export default function HomeLoading() {
  return (
    <InteractiveHomepageLayout
      hero={<HeroSkeleton />}
      stats={<StatsSkeleton />}
      products={
        <div className="py-24 bg-muted/10 border-t border-border/10">
          <div className="container">
            <div className="text-center mb-12">
              <Skeleton className="h-4 w-20 mx-auto mb-2" />
              <Skeleton className="h-9 w-48 mx-auto" />
            </div>
            <CardGridSkeleton count={4} cols="md:grid-cols-2 lg:grid-cols-4" showPrice={true} showBadges={true} showTags={false} />
          </div>
        </div>
      }
      projects={
        <div className="py-24">
          <div className="container">
            <div className="flex items-end justify-between mb-12">
              <div>
                <Skeleton className="h-4 w-16 mb-2" />
                <Skeleton className="h-9 w-48" />
              </div>
              <Skeleton className="h-4 w-20 hidden md:block" />
            </div>
            <CardGridSkeleton count={6} cols="md:grid-cols-2 lg:grid-cols-3" showPrice={false} showBadges={true} showTags={true} />
          </div>
        </div>
      }
      services={<ServicesOverviewSkeleton />}
      testimonials={<TestimonialsSkeleton count={3} asSection={true} />}
      blogs={<LatestBlogsSkeleton />}
      cta={<CTASkeleton />}
    />
  );
}
