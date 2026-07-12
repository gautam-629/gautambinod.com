import { createCertificate } from "@/actions/certificate.actions";
import { AlertCircle } from "lucide-react";

export const metadata = { title: "Add Certificate | Admin" };

export default async function NewCertificatePage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="max-w-xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Add Certificate</h1>
        <p className="text-muted-foreground text-sm mt-1">Add a professional certification</p>
      </div>
      {error && (
        <div className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
          {error}
        </div>
      )}
      <form action={createCertificate} className="rounded-xl border border-border/50 bg-card p-6 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium mb-1.5">Certificate Name *</label>
            <input name="name" required placeholder="AWS Certified Solutions Architect"
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Issuer *</label>
            <input name="issuer" required placeholder="Amazon Web Services"
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Credential ID</label>
            <input name="credentialId" placeholder="ABC123XYZ"
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Issue Date *</label>
            <input name="issueDate" type="date" required
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Expiry Date</label>
            <input name="expiryDate" type="date"
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            <p className="text-xs text-muted-foreground mt-1">Leave blank if it doesn&apos;t expire</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Credential URL</label>
          <input name="credentialUrl" type="url" placeholder="https://credly.com/badges/..."
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium mb-1.5">Certificate Image URL</label>
            <input name="imageUrl" placeholder="https://res.cloudinary.com/..."
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Issuer Logo URL</label>
            <input name="issuerLogo" placeholder="https://res.cloudinary.com/..."
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Display Order</label>
          <input name="displayOrder" type="number" defaultValue="0"
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>

        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" name="isActive" defaultChecked className="rounded" />
          <span className="text-sm">Show on About page</span>
        </label>

        <div className="flex gap-3 pt-2">
          <button type="submit"
            className="flex-1 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
            Add Certificate
          </button>
          <a href="/admin/certificates"
            className="rounded-md border border-border px-5 py-3 text-sm font-medium hover:bg-accent transition-colors">
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}
