import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateWorkingProduct } from "@/actions/working-products.actions";
import { toStringArray, toObjectArray } from "@/types";
import { AlertCircle } from "lucide-react";

interface FeatureItem {
  name: string;
  done: boolean;
}

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}

export const metadata = { title: "Edit Pipeline Product | Admin" };

export default async function EditWorkingProductPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { error } = await searchParams;

  const product = await prisma.workingProduct.findUnique({ where: { id } });
  if (!product) notFound();

  const action = updateWorkingProduct.bind(null, product.id);
  const techStack = toStringArray(product.techStack);
  const features = toObjectArray<FeatureItem>(product.features);
  const launchDateValue = product.launchDate
    ? product.launchDate.toISOString().split("T")[0]
    : "";

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Edit Pipeline Product</h1>
        <p className="text-muted-foreground text-sm mt-1">{product.name}</p>
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
            <label className="block text-sm font-medium mb-1.5">Product Name *</label>
            <input name="name" required defaultValue={product.name}
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium mb-1.5">Slug</label>
            <input name="slug" defaultValue={product.slug}
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Status</label>
            <select name="status" defaultValue={product.status}
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
              <option value="UNDER_DEVELOPMENT">Under Development</option>
              <option value="COMING_SOON">Coming Soon</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Progress (0-100)</label>
            <input name="progress" type="number" min="0" max="100" defaultValue={product.progress}
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Tagline</label>
          <input name="tagline" defaultValue={product.tagline ?? ""}
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Description</label>
          <textarea name="description" rows={3} defaultValue={product.description ?? ""}
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-y" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Thumbnail URL</label>
          <input name="thumbnail" defaultValue={product.thumbnail ?? ""}
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium mb-1.5">Current Milestone</label>
            <input name="currentMilestone" defaultValue={product.currentMilestone ?? ""}
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Expected Launch Date</label>
            <input name="launchDate" type="date" defaultValue={launchDateValue}
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Tech Stack (comma-separated)</label>
          <input name="techStack" defaultValue={techStack.join(", ")}
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Planned Features (one per line)</label>
          <textarea name="features" rows={5} defaultValue={features.map((f) => f.name).join("\n")}
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-y" />
          <p className="text-xs text-muted-foreground mt-1">
            Completion checkmarks for unchanged feature names are preserved automatically
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium mb-1.5">Display Order</label>
            <input name="displayOrder" type="number" defaultValue={product.displayOrder}
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
        </div>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="featured" defaultChecked={product.featured} className="rounded" />
            <span className="text-sm">Featured</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="isActive" defaultChecked={product.isActive} className="rounded" />
            <span className="text-sm">Active</span>
          </label>
        </div>
        <div className="flex gap-3 pt-2">
          <button type="submit"
            className="flex-1 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
            Save Changes
          </button>
          <a href="/admin/working-products"
            className="rounded-md border border-border px-5 py-3 text-sm font-medium hover:bg-accent transition-colors">
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}
