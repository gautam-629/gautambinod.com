import { prisma } from "@/lib/prisma";

export const metadata = { title: "Analytics | Admin" };

export default async function AdminAnalyticsPage() {
  const [
    totalProjects,
    totalProducts,
    totalBlogs,
    totalMessages,
    totalRequests,
    totalOrders,
    totalSubscribers,
    recentMessages,
    recentOrders,
    topProjects,
    topProducts,
    topBlogs,
  ] = await Promise.all([
    prisma.project.count({ where: { isActive: true } }),
    prisma.product.count({ where: { isActive: true } }),
    prisma.blog.count({ where: { status: "PUBLISHED" } }),
    prisma.contactMessage.count(),
    prisma.projectRequest.count(),
    prisma.order.count(),
    prisma.newsletterSubscriber.count({ where: { isActive: true } }),
    prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
    prisma.order.findMany({
      where: { status: { in: ["PAID", "DELIVERED"] } },
      include: { product: true },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
    prisma.project.findMany({
      where: { isActive: true },
      orderBy: { viewCount: "desc" },
      take: 5,
      select: { title: true, viewCount: true, slug: true },
    }),
    prisma.product.findMany({
      where: { isActive: true },
      orderBy: { viewCount: "desc" },
      take: 5,
      select: { name: true, viewCount: true, slug: true, price: true },
    }),
    prisma.blog.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { viewCount: "desc" },
      take: 5,
      select: { title: true, viewCount: true, slug: true },
    }),
  ]);

  const totalRevenue = recentOrders.reduce((sum, o) => sum + o.amount, 0);

  const cards = [
    { label: "Total Projects", value: totalProjects, color: "text-blue-500" },
    { label: "Total Products", value: totalProducts, color: "text-violet-500" },
    { label: "Published Blogs", value: totalBlogs, color: "text-green-500" },
    { label: "Contact Messages", value: totalMessages, color: "text-amber-500" },
    { label: "Project Requests", value: totalRequests, color: "text-pink-500" },
    { label: "Total Orders", value: totalOrders, color: "text-orange-500" },
    { label: "Newsletter Subscribers", value: totalSubscribers, color: "text-teal-500" },
    {
      label: "Revenue (paid orders)",
      value: `$${totalRevenue.toLocaleString()}`,
      color: "text-primary",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Platform overview and performance metrics
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className="p-5 rounded-xl border border-border/50 bg-card"
          >
            <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Top Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Projects */}
        <div className="rounded-xl border border-border/50 bg-card">
          <div className="p-4 border-b border-border/50">
            <h2 className="font-semibold text-sm">Top Projects by Views</h2>
          </div>
          <div className="divide-y divide-border/40">
            {topProjects.map((p, i) => (
              <div key={p.slug} className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground w-4">{i + 1}</span>
                  <span className="text-sm line-clamp-1">{p.title}</span>
                </div>
                <span className="text-xs text-muted-foreground shrink-0">{p.viewCount} views</span>
              </div>
            ))}
            {topProjects.length === 0 && (
              <p className="p-4 text-sm text-muted-foreground">No data yet</p>
            )}
          </div>
        </div>

        {/* Top Products */}
        <div className="rounded-xl border border-border/50 bg-card">
          <div className="p-4 border-b border-border/50">
            <h2 className="font-semibold text-sm">Top Products by Views</h2>
          </div>
          <div className="divide-y divide-border/40">
            {topProducts.map((p, i) => (
              <div key={p.slug} className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground w-4">{i + 1}</span>
                  <span className="text-sm line-clamp-1">{p.name}</span>
                </div>
                <span className="text-xs text-muted-foreground shrink-0">{p.viewCount} views</span>
              </div>
            ))}
            {topProducts.length === 0 && (
              <p className="p-4 text-sm text-muted-foreground">No data yet</p>
            )}
          </div>
        </div>

        {/* Top Blogs */}
        <div className="rounded-xl border border-border/50 bg-card">
          <div className="p-4 border-b border-border/50">
            <h2 className="font-semibold text-sm">Top Blog Posts by Views</h2>
          </div>
          <div className="divide-y divide-border/40">
            {topBlogs.map((b, i) => (
              <div key={b.slug} className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground w-4">{i + 1}</span>
                  <span className="text-sm line-clamp-1">{b.title}</span>
                </div>
                <span className="text-xs text-muted-foreground shrink-0">{b.viewCount} views</span>
              </div>
            ))}
            {topBlogs.length === 0 && (
              <p className="p-4 text-sm text-muted-foreground">No data yet</p>
            )}
          </div>
        </div>
      </div>

      {/* Note about external analytics */}
      <div className="rounded-xl border border-border/50 bg-card p-6">
        <h2 className="font-semibold mb-2">Connect External Analytics</h2>
        <p className="text-sm text-muted-foreground">
          For detailed visitor analytics, traffic sources, and conversion funnels, connect
          Google Analytics 4 or Plausible Analytics. Add your tracking ID in{" "}
          <a href="/admin/settings" className="text-primary hover:underline">
            Site Settings
          </a>
          .
        </p>
      </div>
    </div>
  );
}
