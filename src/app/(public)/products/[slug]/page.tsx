import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProductDetailPageClient } from "@/components/products/ProductDetailPageClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({ where: { slug } });
  if (!product) return { title: "Not Found" };
  return {
    title: product.seoTitle ?? product.name,
    description: product.seoDescription ?? product.tagline,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug, isActive: true },
    include: { category: true, faqs: { orderBy: { displayOrder: "asc" } } },
  });

  if (!product) notFound();

  prisma.product
    .update({ where: { id: product.id }, data: { viewCount: { increment: 1 } } })
    .catch(() => { });

  return <ProductDetailPageClient product={product} />;
}
