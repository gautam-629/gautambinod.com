import Link from "next/link";
import { Code2, Github, Linkedin, Twitter, Mail, Globe } from "lucide-react";
import { prisma } from "@/lib/prisma";

const footerLinks = {
  Navigation: [
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/products", label: "Products" },
    { href: "/services", label: "Services" },
    { href: "/blog", label: "Blog" },
  ],
  Work: [
    { href: "/contact", label: "Contact" },
    { href: "/request", label: "Request Project" },
    { href: "/case-studies", label: "Case Studies" },
    { href: "/testimonials", label: "Testimonials" },
  ],
};

// Icon map for social platforms — falls back to Globe for unknown platforms
const platformIcons: Record<string, React.ElementType> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  x: Twitter,
  email: Mail,
  mail: Mail,
};

function SocialIcon({ platform }: { platform: string }) {
  const Icon = platformIcons[platform.toLowerCase()] ?? Globe;
  return <Icon className="h-5 w-5" />;
}

export async function Footer() {
  const [socialLinks, settings] = await Promise.all([
    prisma.socialLink.findMany({
      where: { isActive: true },
      orderBy: { displayOrder: "asc" },
    }),
    prisma.siteSettings.findFirst(),
  ]);

  const currentYear = new Date().getFullYear();
  const siteName = settings?.siteName ?? "DevFolio";
  const tagline =
    settings?.siteTagline ??
    "Full-stack developer building premium web applications and digital products.";

  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg mb-4">
              <Code2 className="h-6 w-6 text-primary" />
              {siteName}
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">{tagline}</p>

            {/* Dynamic social links from DB */}
            {socialLinks.length > 0 && (
              <div className="flex items-center gap-3 mt-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    target={link.url.startsWith("mailto:") ? undefined : "_blank"}
                    rel={link.url.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                    aria-label={link.platform}
                  >
                    <SocialIcon platform={link.icon ?? link.platform} />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Static nav links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-semibold text-sm mb-4">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-border/40 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {currentYear} {siteName}. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with Next.js, Tailwind CSS &amp; ❤️
          </p>
        </div>
      </div>
    </footer>
  );
}
