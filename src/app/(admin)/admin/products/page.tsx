import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Plus, Eye, Pencil } from "lucide-react";
import { deleteProduct } from "@/actions/products.actions";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { ThumbnailCell } from "@/components/admin/ThumbnailCell";
import { formatCurrency } from "@/utils/format";
import { toStringArray } from "@/types";

export const metadata = { title: "Products | Admin" };

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-muted-foreground text-sm mt-1">{products.length} total products</p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4" /> Add Product
        </Link>
      </div>

      <div className="rounded-xl border border-border/50 bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50 bg-muted/30">
                <th className="text-left px-5 py-3 font-medium text-muted-foreground w-16"></th>
                <th className="text-left px-5 py-3 font-medium text-muted-foreground">Product</th>
                <th className="text-left px-5 py-3 font-medium text-muted-foreground hidden md:table-cell">Category</th>
                <th className="text-left px-5 py-3 font-medium text-muted-foreground">Price</th>
                <th className="text-left px-5 py-3 font-medium text-muted-foreground hidden lg:table-cell">Status</th>
                <th className="text-left px-5 py-3 font-medium text-muted-foreground hidden lg:table-cell">Views</th>
                <th className="text-right px-5 py-3 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {products.map((product) => {
                const thumbnail = toStringArray(product.images)[0];
                return (
                <tr key={product.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-5 py-4">
                    <ThumbnailCell src={thumbnail} alt={product.name} />
                  </td>
                  <td className="px-5 py-4">
                    <div>
                      <p className="font-medium">{product.name}</p>
                      {product.tagline && <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{product.tagline}</p>}
                    </div>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{product.category.name}</span>
                  </td>
                  <td className="px-5 py-4">
                    <div>
                      <p className="font-semibold text-primary">
                        {formatCurrency(product.discountedPrice ?? product.price, product.currency)}
                      </p>
                      {product.discountedPrice && (
                        <p className="text-xs text-muted-foreground line-through">{formatCurrency(product.price, product.currency)}</p>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      product.status === "AVAILABLE" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                      product.status === "COMING_SOON" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" :
                      "bg-muted text-muted-foreground"
                    }`}>{product.status.replace("_", " ")}</span>
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell text-muted-foreground">{product.viewCount}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <Link href={`/products/${product.slug}`} target="_blank" className="p-1.5 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors">
                        <Eye className="h-3.5 w-3.5" />
                      </Link>
                      <Link href={`/admin/products/${product.id}/edit`} className="p-1.5 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors">
                        <Pencil className="h-3.5 w-3.5" />
                      </Link>
                      <DeleteButton
                        action={deleteProduct.bind(null, product.id)}
                        itemLabel="product"
                      />
                    </div>
                  </td>
                </tr>
                );
              })}
            </tbody>
          </table>
          {products.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <p className="mb-3">No products yet</p>
              <Link href="/admin/products/new" className="text-primary hover:underline text-sm">Add your first product →</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
