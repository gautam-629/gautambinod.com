import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateService } from "@/actions/services.actions";
import { toStringArray } from "@/types";
import { AlertCircle } from "lucide-react";

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}

export const metadata = { title: "Edit Service | Admin" };

export default async function EditServicePage({ params, searchParams }: Props) {
  const { id } = await params;
  const { error } = await searchParams;

  const service = await prisma.service.findUnique({ where: { id } });
  if (!service) notFound();

  const action = updateService.bind(null, service.id);
  const features = toStringArray(service.features);
  const deliverables = toStringArray(service.deliverables);

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Edit Service</h1>
        <p className="text-muted-foreground text-sm mt-1">{service.title}</p>
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
            <label className="block text-sm font-medium mb-1.5">
              Service Title <span className="text-destructive">*</span>
            </label>
            <input
              name="title"
              required
              defaultValue={service.title}
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium mb-1.5">Slug</label>
            <input
              name="slug"
              defaultValue={service.slug}
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Icon Name</label>
            <input
              name="icon"
              defaultValue={service.icon ?? ""}
              placeholder="Code, Cloud, Palette, Smartphone..."
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <p className="text-xs text-muted-foreground mt-1">Lucide icon name</p>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Starting Price</label>
            <input
              name="startingPrice"
              type="number"
              min="0"
              defaultValue={service.startingPrice ?? ""}
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Price Unit</label>
            <input
              name="priceUnit"
              defaultValue={service.priceUnit ?? ""}
              placeholder="per project, per hour, per month"
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Timeline</label>
            <input
              name="timeline"
              defaultValue={service.timeline ?? ""}
              placeholder="2-8 weeks"
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Display Order</label>
            <input
              name="displayOrder"
              type="number"
              defaultValue={service.displayOrder}
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Short Description</label>
          <input
            name="shortDesc"
            defaultValue={service.shortDesc ?? ""}
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">
            Full Description <span className="text-destructive">*</span>
          </label>
          <textarea
            name="description"
            required
            rows={5}
            defaultValue={service.description}
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-ring resize-y"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Features (one per line)</label>
          <textarea
            name="features"
            rows={4}
            defaultValue={features.join("\n")}
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-y"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Deliverables (one per line)</label>
          <textarea
            name="deliverables"
            rows={3}
            defaultValue={deliverables.join("\n")}
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-y"
          />
        </div>

        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="featured" defaultChecked={service.featured} className="rounded" />
            <span className="text-sm">Featured</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="isActive" defaultChecked={service.isActive} className="rounded" />
            <span className="text-sm">Active</span>
          </label>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="flex-1 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Save Changes
          </button>
          <a
            href="/admin/services"
            className="rounded-md border border-border px-5 py-3 text-sm font-medium hover:bg-accent transition-colors"
          >
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}
