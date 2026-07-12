import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Plus, Pencil } from "lucide-react";
import { deleteService } from "@/actions/services.actions";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { formatCurrency } from "@/utils/format";

export const metadata = { title: "Services | Admin" };

export default async function AdminServicesPage() {
  const services = await prisma.service.findMany({
    orderBy: [{ featured: "desc" }, { displayOrder: "asc" }],
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Services</h1>
          <p className="text-muted-foreground text-sm mt-1">{services.length} services</p>
        </div>
        <Link
          href="/admin/services/new"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4" /> Add Service
        </Link>
      </div>

      <div className="space-y-3">
        {services.map((service) => (
          <div
            key={service.id}
            className="rounded-xl border border-border/50 bg-card p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold">{service.title}</h3>
                  {service.featured && (
                    <span className="text-xs bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 px-2 py-0.5 rounded-full">
                      Featured
                    </span>
                  )}
                  {!service.isActive && (
                    <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                      Inactive
                    </span>
                  )}
                </div>
                {service.shortDesc && (
                  <p className="text-sm text-muted-foreground">{service.shortDesc}</p>
                )}
                <div className="flex flex-wrap gap-3 mt-2 text-xs text-muted-foreground">
                  {service.startingPrice && (
                    <span className="text-primary font-medium">
                      From {formatCurrency(service.startingPrice)}
                      {service.priceUnit ? ` ${service.priceUnit}` : ""}
                    </span>
                  )}
                  {service.timeline && <span>Timeline: {service.timeline}</span>}
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <Link
                  href={`/admin/services/${service.id}/edit`}
                  className="p-1.5 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Pencil className="h-4 w-4" />
                </Link>
                <DeleteButton
                  action={deleteService.bind(null, service.id)}
                  confirmMessage="Delete this service? This cannot be undone."
                />
              </div>
            </div>
          </div>
        ))}
        {services.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <p className="mb-3">No services yet</p>
            <Link
              href="/admin/services/new"
              className="text-primary hover:underline text-sm"
            >
              Add your first service →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
