import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateCertificate } from "@/actions/certificate.actions";
import { AlertCircle } from "lucide-react";

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}

export const metadata = { title: "Edit Certificate | Admin" };

export default async function EditCertificatePage({ params, searchParams }: Props) {
  const { id } = await params;
  const { error } = await searchParams;

  const cert = await prisma.certificate.findUnique({ where: { id } });
  if (!cert) notFound();

  const action = updateCertificate.bind(null, cert.id);
  const fmt = (d: Date) => d.toISOString().split("T")[0];

  return (
    <div className="max-w-xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Edit Certificate</h1>
        <p className="text-muted-foreground text-sm mt-1">{cert.name}</p>
      </div>
      {error && (
        <div className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
          {error}
        </div>
      )}
      <form action={action} className="rounded-xl border border-border/50 bg-card p-6 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium mb-1.5">Certificate Name *</label>
            <input name="name" required defaultValue={cert.name}
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Issuer *</label>
            <input name="issuer" required defaultValue={cert.issuer}
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Credential ID</label>
            <input name="credentialId" defaultValue={cert.credentialId ?? ""}
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Issue Date *</label>
            <input name="issueDate" type="date" required defaultValue={fmt(cert.issueDate)}
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Expiry Date</label>
            <input name="expiryDate" type="date" defaultValue={cert.expiryDate ? fmt(cert.expiryDate) : ""}
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Credential URL</label>
          <input name="credentialUrl" type="url" defaultValue={cert.credentialUrl ?? ""}
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium mb-1.5">Certificate Image URL</label>
            <input name="imageUrl" defaultValue={cert.imageUrl ?? ""}
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Issuer Logo URL</label>
            <input name="issuerLogo" defaultValue={cert.issuerLogo ?? ""}
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Display Order</label>
          <input name="displayOrder" type="number" defaultValue={cert.displayOrder}
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>

        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" name="isActive" defaultChecked={cert.isActive} className="rounded" />
          <span className="text-sm">Show on About page</span>
        </label>

        <div className="flex gap-3 pt-2">
          <button type="submit"
            className="flex-1 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
            Save Changes
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
