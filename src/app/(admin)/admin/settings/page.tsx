import { prisma } from "@/lib/prisma";
import { updateSiteSettings } from "@/actions/settings.actions";
import { CheckCircle2, AlertCircle } from "lucide-react";

export const metadata = { title: "Settings | Admin" };

export default async function AdminSettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; error?: string }>;
}) {
  const { success, error } = await searchParams;
  const settings = await prisma.siteSettings.findFirst();

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold">Site Settings</h1>
        <p className="text-muted-foreground text-sm mt-1">Configure your site&apos;s global settings</p>
      </div>

      {success && (
        <div className="flex items-start gap-2 rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-700 dark:text-green-400">
          <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0" />
          Settings saved successfully.
        </div>
      )}
      {error && (
        <div className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
          {error}
        </div>
      )}

      <form action={updateSiteSettings} className="rounded-xl border border-border/50 bg-card p-6 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium mb-1.5">Site Name *</label>
            <input name="siteName" defaultValue={settings?.siteName || ""} required placeholder="DevFolio" className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Tagline</label>
            <input name="siteTagline" defaultValue={settings?.siteTagline || ""} placeholder="Full Stack Developer" className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Site Description</label>
          <textarea name="siteDescription" defaultValue={settings?.siteDescription || ""} rows={3} placeholder="Brief description for SEO..." className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium mb-1.5">Contact Email</label>
            <input name="siteEmail" defaultValue={settings?.siteEmail || ""} type="email" placeholder="hello@example.com" className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Phone Number</label>
            <input name="sitePhone" defaultValue={settings?.sitePhone || ""} placeholder="+1 (555) 000-0000" className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Address</label>
          <input name="siteAddress" defaultValue={settings?.siteAddress || ""} placeholder="San Francisco, CA, USA" className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium mb-1.5">Default Currency</label>
            <select name="currency" defaultValue={settings?.currency || "USD"} className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
              <option value="USD">USD - US Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound</option>
              <option value="NPR">NPR - Nepali Rupee</option>
              <option value="INR">INR - Indian Rupee</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Google Analytics ID</label>
            <input name="analyticsId" defaultValue={settings?.analyticsId || ""} placeholder="G-XXXXXXXXXX" className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
          <input type="checkbox" name="maintenanceMode" id="maintenanceMode" defaultChecked={settings?.maintenanceMode} className="rounded" />
          <div>
            <label htmlFor="maintenanceMode" className="text-sm font-medium cursor-pointer">Maintenance Mode</label>
            <p className="text-xs text-muted-foreground">Show a maintenance page to public visitors</p>
          </div>
        </div>

        <button type="submit" className="w-full rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
          Save Settings
        </button>
      </form>
    </div>
  );
}
