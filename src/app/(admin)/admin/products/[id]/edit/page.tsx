import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateProduct } from "@/actions/products.actions";
import { toStringArray } from "@/types";
import { ProductForm } from "@/features/admin/products/ProductForm";

interface Props { params: Promise<{ id: string }> }
export const metadata = { title: "Edit Product | Admin" };

export default async function EditProductPage({ params }: Props) {
  const { id } = await params;
  const [product, categories] = await Promise.all([
    prisma.product.findUnique({ where: { id } }),
    prisma.productCategory.findMany({ where: { isActive: true }, orderBy: { displayOrder: "asc" } }),
  ]);
  if (!product) notFound();
  const action = updateProduct.bind(null, product.id);

  const images = toStringArray(product.images);

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Edit Product</h1>
        <p className="text-muted-foreground text-sm mt-1">{product.name}</p>
      </div>

      <ProductForm
        categories={categories}
        action={action}
        mode="edit"
        defaultValues={{
          name: product.name,
          slug: product.slug,
          categoryId: product.categoryId,
          status: product.status,
          tagline: product.tagline,
          description: product.description,
          thumbnail: images[0] ?? "",
          demoVideo: product.demoVideo,
          price: product.price,
          discountedPrice: product.discountedPrice,
          techStack: toStringArray(product.techStack),
          userFeatures: toStringArray(product.userFeatures),
          adminFeatures: toStringArray(product.adminFeatures),
          mobileFeatures: toStringArray(product.mobileFeatures),
          demoUrl: product.demoUrl,
          demoUsername: product.demoUsername,
          demoPassword: product.demoPassword,
          displayOrder: product.displayOrder,
          featured: product.featured,
          isActive: product.isActive,
        }}
      />
    </div>
  );
}
