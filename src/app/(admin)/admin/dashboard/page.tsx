import { prisma } from "@/lib/prisma";
import { MessageSquare, Package, ShoppingCart, FolderOpen, ShoppingBag, BookOpen, Users, TrendingUp } from "lucide-react";
import Link from "next/link";
import { formatCurrency } from "@/utils/format";

export const metadata = { title: "Dashboard | Admin" };

export default async function DashboardPage() {
  const [
    unreadMessages,
    unreadRequests,
    pendingOrders,
    totalProjects,
    totalProducts,
    publishedBlogs,
    totalSubscribers,
    recentMessages,
    recentOrders,
  ] = await Promise.all([
    prisma.contactMessage.count({ where: { isRead: false } }),
    prisma.projectRequest.count({ where: { isRead: false } }),
    prisma.order.count({ where: { status: "PENDING" } }),
    prisma.project.count({ where: { isActive: true } }),
    prisma.product.count({ where: { isActive: true } }),
    prisma.blog.count({ where: { status: "PUBLISHED" } }),
    prisma.newsletterSubscriber.count({ where: { isActive: true } }),
    prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
    prisma.order.findMany({
      include: { product: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  const stats = [
    { label: "Unread Messages", value: unreadMessages, icon: MessageSquare, href: "/admin/messages", color: "text-blue-500 bg-blue-50 dark:bg-blue-950/30" },
    { label: "New Requests", value: unreadRequests, icon: Package, href: "/admin/requests", color: "text-violet-500 bg-violet-50 dark:bg-violet-950/30" },
    { label: "Pending Orders", value: pendingOrders, icon: ShoppingCart, href: "/admin/orders", color: "text-amber-500 bg-amber-50 dark:bg-amber-950/30" },
    { label: "Total Projects", value: totalProjects, icon: FolderOpen, href: "/admin/projects", color: "text-green-500 bg-green-50 dark:bg-green-950/30" },
    { label: "Total Products", value: totalProducts, icon: ShoppingBag, href: "/admin/products", color: "text-pink-500 bg-pink-50 dark:bg-pink-950/30" },
    { label: "Blog Posts", value: publishedBlogs, icon: BookOpen, href: "/admin/blogs", color: "text-orange-500 bg-orange-50 dark:bg-orange-950/30" },
    { label: "Subscribers", value: totalSubscribers, icon: Users, href: "/admin/leads", color: "text-teal-500 bg-teal-50 dark:bg-teal-950/30" },
    { label: "Live", value: "●", icon: TrendingUp, href: "/", color: "text-primary bg-primary/10" },
  ];

  const statusColor: Record<string, string> = {
    PAID: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    DELIVERED: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    PENDING: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    CANCELLED: "bg-muted text-muted-foreground",
    REFUNDED: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">Overview of your portfolio platform</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.label} href={stat.href}>
              <div className="p-5 rounded-xl border border-border/50 bg-card hover:border-primary/30 hover:shadow-md transition-all duration-200">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${stat.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Messages */}
        <div className="rounded-xl border border-border/50 bg-card">
          <div className="p-5 border-b border-border/50 flex items-center justify-between">
            <h2 className="font-semibold">Recent Messages</h2>
            <Link href="/admin/messages" className="text-xs text-primary hover:underline">
              View all
            </Link>
          </div>
          <div className="divide-y divide-border/40">
            {recentMessages.length === 0 && (
              <p className="p-5 text-sm text-muted-foreground">No messages yet.</p>
            )}
            {recentMessages.map((msg) => (
              <Link key={msg.id} href="/admin/messages">
                <div className="p-4 hover:bg-muted/30 transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm">{msg.name}</span>
                    {!msg.isRead && <span className="w-2 h-2 rounded-full bg-primary shrink-0" />}
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-1">{msg.message}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{msg.email}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="rounded-xl border border-border/50 bg-card">
          <div className="p-5 border-b border-border/50 flex items-center justify-between">
            <h2 className="font-semibold">Recent Orders</h2>
            <Link href="/admin/orders" className="text-xs text-primary hover:underline">
              View all
            </Link>
          </div>
          <div className="divide-y divide-border/40">
            {recentOrders.length === 0 && (
              <p className="p-5 text-sm text-muted-foreground">No orders yet.</p>
            )}
            {recentOrders.map((order) => (
              <Link key={order.id} href="/admin/orders">
                <div className="p-4 hover:bg-muted/30 transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm">{order.customerName}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor[order.status] ?? "bg-muted text-muted-foreground"}`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{order.product.name}</p>
                  <p className="text-xs font-semibold text-primary mt-1">
                    {formatCurrency(order.amount, order.currency)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="rounded-xl border border-border/50 bg-card p-5">
        <h2 className="font-semibold mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          {[
            { href: "/admin/projects/new", label: "Add Project" },
            { href: "/admin/products/new", label: "Add Product" },
            { href: "/admin/blogs/new", label: "Write Blog Post" },
            { href: "/admin/experience/new", label: "Add Experience" },
            { href: "/admin/testimonials/new", label: "Add Testimonial" },
            { href: "/admin/services/new", label: "Add Service" },
          ].map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="px-4 py-2 rounded-lg border border-border bg-background text-sm hover:bg-accent hover:border-primary/30 transition-colors"
            >
              + {action.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
