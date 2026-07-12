"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  User,
  Briefcase,
  Code2,
  FolderOpen,
  ShoppingBag,
  FileText,
  Star,
  BookOpen,
  Settings,
  Image as ImageIcon,
  Search,
  BarChart3,
  Users,
  Package,
  Wrench,
  GitBranch,
  Mail,
  ShoppingCart,
  Layers,
  GraduationCap,
  Award,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navGroups = [
  {
    title: "Overview",
    items: [
      { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    ],
  },
  {
    title: "Content",
    items: [
      { href: "/admin/hero", label: "Hero Section", icon: User },
      { href: "/admin/about", label: "About", icon: User },
      { href: "/admin/experience", label: "Experience", icon: Briefcase },
      { href: "/admin/education", label: "Education", icon: GraduationCap },
      { href: "/admin/certificates", label: "Certificates", icon: Award },
      { href: "/admin/skills", label: "Skills", icon: Code2 },
      { href: "/admin/services", label: "Services", icon: Wrench },
    ],
  },
  {
    title: "Portfolio",
    items: [
      { href: "/admin/projects", label: "Projects", icon: FolderOpen },
      { href: "/admin/case-studies", label: "Case Studies", icon: FileText },
      { href: "/admin/testimonials", label: "Testimonials", icon: Star },
    ],
  },
  {
    title: "Marketplace",
    items: [
      { href: "/admin/products", label: "Products", icon: ShoppingBag },
      { href: "/admin/working-products", label: "In Development", icon: GitBranch },
      { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
    ],
  },
  {
    title: "Publishing",
    items: [
      { href: "/admin/blogs", label: "Blog Posts", icon: BookOpen },
      { href: "/admin/media", label: "Media Library", icon: ImageIcon },
    ],
  },
  {
    title: "CRM",
    items: [
      { href: "/admin/messages", label: "Messages", icon: Mail },
      { href: "/admin/requests", label: "Requests", icon: Package },
      { href: "/admin/leads", label: "Leads", icon: Users },
    ],
  },
  {
    title: "System",
    items: [
      { href: "/admin/seo", label: "SEO", icon: Search },
      { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
      { href: "/admin/settings", label: "Settings", icon: Settings },
    ],
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 border-r border-border/50 bg-card flex-col overflow-hidden hidden md:flex shrink-0">
      {/* Logo */}
      <div className="h-16 flex items-center px-5 border-b border-border/50 shrink-0">
        <Link
          href="/admin/dashboard"
          className="flex items-center gap-2 font-bold text-base"
        >
          <Layers className="h-5 w-5 text-primary" />
          DevFolio
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-5">
        {navGroups.map((group) => (
          <div key={`${group.title}-${group.items[0].href}`}>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-1.5">
              {group.title}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.href ||
                  (pathname.startsWith(item.href + "/") &&
                    item.href !== "/admin/dashboard");
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-2.5 px-2.5 py-2 rounded-md text-sm transition-colors",
                        isActive
                          ? "bg-primary text-primary-foreground font-medium"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent"
                      )}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-border/50 shrink-0">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 px-2.5 py-2 rounded-md text-xs text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
        >
          View Public Site ↗
        </Link>
      </div>
    </aside>
  );
}
