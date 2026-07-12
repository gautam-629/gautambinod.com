import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Plus, Pencil, ExternalLink } from "lucide-react";
import { deleteCertificate } from "@/actions/certificate.actions";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { formatDate } from "@/utils/format";

export const metadata = { title: "Certificates | Admin" };

export default async function AdminCertificatesPage() {
  const certificates = await prisma.certificate.findMany({
    orderBy: { displayOrder: "asc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Certificates</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {certificates.length} {certificates.length === 1 ? "certificate" : "certificates"} — shown on your About page
          </p>
        </div>
        <Link
          href="/admin/certificates/new"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4" /> Add Certificate
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {certificates.map((cert) => (
          <div key={cert.id} className="rounded-xl border border-border/50 bg-card p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-sm">{cert.name}</h3>
                  {!cert.isActive && (
                    <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                      Hidden
                    </span>
                  )}
                </div>
                <p className="text-primary text-xs">{cert.issuer}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Issued {formatDate(cert.issueDate)}
                  {cert.expiryDate ? ` · Expires ${formatDate(cert.expiryDate)}` : ""}
                </p>
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary hover:underline mt-1 inline-flex items-center gap-1"
                  >
                    Verify <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <Link
                  href={`/admin/certificates/${cert.id}/edit`}
                  className="p-1.5 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </Link>
                <DeleteButton action={deleteCertificate.bind(null, cert.id)} itemLabel="certificate" />
              </div>
            </div>
          </div>
        ))}
        {certificates.length === 0 && (
          <div className="col-span-2 text-center py-16 text-muted-foreground">
            <p className="mb-3">No certificates yet — this section won&apos;t show on your About page</p>
            <Link href="/admin/certificates/new" className="text-primary hover:underline text-sm">
              Add your first certificate →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
