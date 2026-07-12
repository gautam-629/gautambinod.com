import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Plus, Pencil } from "lucide-react";
import { deleteWorkingProduct } from "@/actions/working-products.actions";
import { DeleteButton } from "@/components/admin/DeleteButton";

export const metadata = { title: "In Development | Admin" };

export default async function AdminWorkingProductsPage() {
  const products = await prisma.workingProduct.findMany({
    orderBy: [{ featured: "desc" }, { displayOrder: "asc" }],
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Products in Development</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {products.length} items in your development pipeline
          </p>
        </div>
        <Link
          href="/admin/working-products/new"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4" /> Add Product
        </Link>
      </div>

      <div className="space-y-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="rounded-xl border border-border/50 bg-card p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold">{product.name}</h3>
                  {product.featured && (
                    <span className="text-xs bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 px-2 py-0.5 rounded-full">
                      Featured
                    </span>
                  )}
                  <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                    {product.status.replace(/_/g, " ")}
                  </span>
                </div>
                {product.tagline && (
                  <p className="text-sm text-muted-foreground">{product.tagline}</p>
                )}
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex-1 max-w-xs">
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                      <span>Progress</span>
                      <span>{product.progress}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${product.progress}%` }}
                      />
                    </div>
                  </div>
                  {product.currentMilestone && (
                    <span className="text-xs text-muted-foreground">
                      📍 {product.currentMilestone}
                    </span>
                  )}
                  {product.launchDate && (
                    <span className="text-xs text-muted-foreground">
                      🗓️{" "}
                      {new Date(product.launchDate).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <Link
                  href={`/admin/working-products/${product.id}/edit`}
                  className="p-1.5 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Pencil className="h-4 w-4" />
                </Link>
                <DeleteButton
                  action={deleteWorkingProduct.bind(null, product.id)}
                  confirmMessage="Delete this pipeline product? This cannot be undone."
                />
              </div>
            </div>
          </div>
        ))}
        {products.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <p className="mb-3">No products in development yet</p>
            <Link
              href="/admin/working-products/new"
              className="text-primary hover:underline text-sm"
            >
              Add your first pipeline product →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
