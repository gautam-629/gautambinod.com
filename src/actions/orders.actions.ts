"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { sendOrderConfirmation } from "@/lib/email";

export async function updateOrderStatus(id: string, formData: FormData) {
  const status = formData.get("status") as string;

  const order = await prisma.order.update({
    where: { id },
    data: {
      status: status as any,
      deliveredAt: status === "DELIVERED" ? new Date() : undefined,
    },
    include: { product: true },
  });

  // Send confirmation email when order is paid
  if (status === "PAID") {
    try {
      await sendOrderConfirmation({
        customerName: order.customerName,
        customerEmail: order.customerEmail,
        productName: order.product.name,
        orderNumber: order.orderNumber,
        amount: order.amount,
        currency: order.currency,
      });
    } catch (err) {
      console.error("Failed to send order confirmation:", err);
    }
  }

  revalidatePath("/admin/orders");
}

export async function createOrder(formData: FormData) {
  const productId = formData.get("productId") as string;
  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) throw new Error("Product not found");

  const orderNumber = `ORD-${Date.now()}`;

  await prisma.order.create({
    data: {
      orderNumber,
      productId,
      customerName: formData.get("customerName") as string,
      customerEmail: formData.get("customerEmail") as string,
      customerPhone: formData.get("customerPhone") as string || null,
      customerCompany: formData.get("customerCompany") as string || null,
      amount: product.discountedPrice ?? product.price,
      currency: product.currency,
      paymentMethod: formData.get("paymentMethod") as string || null,
      notes: formData.get("notes") as string || null,
    },
  });

  revalidatePath("/admin/orders");
}
