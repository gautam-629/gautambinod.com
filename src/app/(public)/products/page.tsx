import { prisma } from "@/lib/prisma";
import { ProductsPageClient } from "@/components/products/ProductsPageClient";

export const metadata = { title: "Products" };
export const revalidate = 3600;

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    prisma.product.findMany({
      where: { isActive: true },
      include: { category: true },
      orderBy: [{ featured: "desc" }, { displayOrder: "asc" }],
    }),
    prisma.productCategory.findMany({
      where: { isActive: true },
      orderBy: { displayOrder: "asc" },
    }),
  ]);

  return <ProductsPageClient products={products} categories={categories} />;
}

