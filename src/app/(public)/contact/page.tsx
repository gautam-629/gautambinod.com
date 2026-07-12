import { ContactForm } from "@/features/contact/ContactForm";
import { prisma } from "@/lib/prisma";
import { Mail, Phone, MapPin } from "lucide-react";

export const metadata = { title: "Contact" };

export default async function ContactPage() {
  const [settings, services] = await Promise.all([
    prisma.siteSettings.findFirst(),
    prisma.service.findMany({ where: { isActive: true }, select: { title: true } }),
  ]);

  return (
    <div className="container py-16 max-w-5xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
        <p className="text-muted-foreground text-lg">
          Have a project in mind or just want to chat? Fill out the form below and I'll get back to you within 24 hours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Contact Info */}
        <div className="space-y-6">
          <div>
            <h2 className="font-semibold mb-4">Contact Information</h2>
            <div className="space-y-3">
              {settings?.siteEmail && (
                <a href={`mailto:${settings.siteEmail}`} className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Mail className="h-4 w-4 text-primary" />
                  </div>
                  {settings.siteEmail}
                </a>
              )}
              {settings?.sitePhone && (
                <a href={`tel:${settings.sitePhone}`} className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Phone className="h-4 w-4 text-primary" />
                  </div>
                  {settings.sitePhone}
                </a>
              )}
              {settings?.siteAddress && (
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MapPin className="h-4 w-4 text-primary" />
                  </div>
                  {settings.siteAddress}
                </div>
              )}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
            <h3 className="font-semibold text-sm mb-1">Response Time</h3>
            <p className="text-xs text-muted-foreground">I typically respond within 24 hours on business days.</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <ContactForm services={services.map((s) => s.title)} />
        </div>
      </div>
    </div>
  );
}
