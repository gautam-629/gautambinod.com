import { prisma } from "@/lib/prisma";
import { updateOrderStatus } from "@/actions/orders.actions";
import { StatusSelect } from "@/components/admin/StatusSelect";
import { formatFullDate, formatCurrency } from "@/utils/format";

export const metadata = { title: "Orders | Admin" };

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    include: { product: true },
    orderBy: { createdAt: "desc" },
  });

  const statusColor: Record<string, string> = {
    PENDING: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    PAID: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    DELIVERED: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    REFUNDED: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    CANCELLED: "bg-muted text-muted-foreground",
  };

  const totalRevenue = orders
    .filter((o) => o.status === "PAID" || o.status === "DELIVERED")
    .reduce((sum, o) => sum + o.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Orders</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {orders.length} orders · {formatCurrency(totalRevenue)} total revenue
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Pending", count: orders.filter((o) => o.status === "PENDING").length, color: "text-amber-500" },
          { label: "Paid", count: orders.filter((o) => o.status === "PAID").length, color: "text-blue-500" },
          { label: "Delivered", count: orders.filter((o) => o.status === "DELIVERED").length, color: "text-green-500" },
          { label: "Total Revenue", count: formatCurrency(totalRevenue), color: "text-primary" },
        ].map((stat) => (
          <div key={stat.label} className="p-4 rounded-xl border border-border/50 bg-card">
            <p className={`text-xl font-bold ${stat.color}`}>{stat.count}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-border/50 bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50 bg-muted/30">
                <th className="text-left px-5 py-3 font-medium text-muted-foreground">Order</th>
                <th className="text-left px-5 py-3 font-medium text-muted-foreground">Customer</th>
                <th className="text-left px-5 py-3 font-medium text-muted-foreground hidden md:table-cell">Product</th>
                <th className="text-left px-5 py-3 font-medium text-muted-foreground">Amount</th>
                <th className="text-left px-5 py-3 font-medium text-muted-foreground">Status</th>
                <th className="text-left px-5 py-3 font-medium text-muted-foreground hidden lg:table-cell">Date</th>
                <th className="text-right px-5 py-3 font-medium text-muted-foreground">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-5 py-4">
                    <span className="font-mono text-xs">{order.orderNumber}</span>
                  </td>
                  <td className="px-5 py-4">
                    <div>
                      <p className="font-medium">{order.customerName}</p>
                      <p className="text-xs text-muted-foreground">{order.customerEmail}</p>
                    </div>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <p className="text-sm text-muted-foreground">{order.product.name}</p>
                  </td>
                  <td className="px-5 py-4">
                    <span className="font-semibold text-primary">{formatCurrency(order.amount, order.currency)}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor[order.status]}`}>{order.status}</span>
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell text-xs text-muted-foreground">
                    {formatFullDate(order.createdAt)}
                  </td>
                  <td className="px-5 py-4">
                    <StatusSelect
                      action={updateOrderStatus.bind(null, order.id)}
                      name="status"
                      defaultValue={order.status}
                      options={[
                        { value: "PENDING", label: "Pending" },
                        { value: "PAID", label: "Paid" },
                        { value: "DELIVERED", label: "Delivered" },
                        { value: "REFUNDED", label: "Refunded" },
                        { value: "CANCELLED", label: "Cancelled" },
                      ]}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {orders.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">No orders yet.</div>
          )}
        </div>
      </div>
    </div>
  );
}
