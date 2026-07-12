import { prisma } from "@/lib/prisma";
import { createProduct } from "@/actions/products.actions";
import { ProductForm } from "@/features/admin/products/ProductForm";

export const metadata = { title: "New Product | Admin" };

export default async function NewProductPage() {
  const categories = await prisma.productCategory.findMany({
    where: { isActive: true },
    orderBy: { displayOrder: "asc" },
  });

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Add Product</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Add a new digital product to your marketplace
        </p>
      </div>

      <ProductForm categories={categories} action={createProduct} mode="create" />
    </div>
  );
}
