import { prisma } from "@/lib/prisma";
import { formatFullDate } from "@/utils/format";
import { updateLeadStatus, unsubscribeNewsletter } from "@/actions/leads.actions";
import { StatusSelect } from "@/components/admin/StatusSelect";
import { DeleteButton } from "@/components/admin/DeleteButton";

export const metadata = { title: "Leads | Admin" };

export default async function AdminLeadsPage() {
  const [messages, subscribers] = await Promise.all([
    prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        company: true,
        service: true,
        budget: true,
        status: true,
        createdAt: true,
      },
    }),
    prisma.newsletterSubscriber.findMany({
      orderBy: { subscribedAt: "desc" },
    }),
  ]);

  const statusColor: Record<string, string> = {
    NEW: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    CONTACTED: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
    QUALIFIED: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    CONVERTED: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    LOST: "bg-muted text-muted-foreground",
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Lead Management</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Track and manage potential clients through your pipeline
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {(["NEW", "CONTACTED", "QUALIFIED", "CONVERTED", "LOST"] as const).map((status) => {
          const count = messages.filter((m) => m.status === status).length;
          return (
            <div key={status} className="p-4 rounded-xl border border-border/50 bg-card text-center">
              <p className="text-2xl font-bold">{count}</p>
              <p className={`text-xs mt-1 px-2 py-0.5 rounded-full font-medium inline-block ${statusColor[status]}`}>
                {status}
              </p>
            </div>
          );
        })}
      </div>

      {/* Lead Pipeline */}
      <div className="rounded-xl border border-border/50 bg-card overflow-hidden">
        <div className="px-5 py-3 border-b border-border/50 bg-muted/30 flex items-center justify-between">
          <h2 className="font-semibold text-sm">Contact Leads ({messages.length})</h2>
          <a
            href="/api/export/leads"
            className="text-xs text-primary hover:underline"
          >
            Export CSV
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50 bg-muted/20">
                <th className="text-left px-5 py-3 font-medium text-muted-foreground">Name</th>
                <th className="text-left px-5 py-3 font-medium text-muted-foreground hidden md:table-cell">Email</th>
                <th className="text-left px-5 py-3 font-medium text-muted-foreground hidden lg:table-cell">Service</th>
                <th className="text-left px-5 py-3 font-medium text-muted-foreground hidden lg:table-cell">Date</th>
                <th className="text-left px-5 py-3 font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {messages.map((msg) => (
                <tr key={msg.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-5 py-3">
                    <div>
                      <p className="font-medium text-sm">{msg.name}</p>
                      {msg.company && (
                        <p className="text-xs text-muted-foreground">{msg.company}</p>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-3 hidden md:table-cell text-muted-foreground text-xs">
                    {msg.email}
                  </td>
                  <td className="px-5 py-3 hidden lg:table-cell">
                    {msg.service && (
                      <span className="text-xs bg-muted px-2 py-0.5 rounded-full">{msg.service}</span>
                    )}
                  </td>
                  <td className="px-5 py-3 hidden lg:table-cell text-xs text-muted-foreground">
                    {formatFullDate(msg.createdAt)}
                  </td>
                  <td className="px-5 py-3">
                    <StatusSelect
                      action={updateLeadStatus.bind(null, msg.id)}
                      name="status"
                      defaultValue={msg.status}
                      options={[
                        { value: "NEW", label: "New" },
                        { value: "CONTACTED", label: "Contacted" },
                        { value: "QUALIFIED", label: "Qualified" },
                        { value: "CONVERTED", label: "Converted" },
                        { value: "LOST", label: "Lost" },
                      ]}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {messages.length === 0 && (
            <p className="p-8 text-center text-muted-foreground">No leads yet.</p>
          )}
        </div>
      </div>

      {/* Newsletter Subscribers */}
      <div className="rounded-xl border border-border/50 bg-card overflow-hidden">
        <div className="px-5 py-3 border-b border-border/50 bg-muted/30">
          <h2 className="font-semibold text-sm">
            Newsletter Subscribers ({subscribers.length})
          </h2>
        </div>
        <div className="divide-y divide-border/40 max-h-64 overflow-y-auto">
          {subscribers.map((sub) => (
            <div
              key={sub.id}
              className="flex items-center justify-between px-5 py-3"
            >
              <div>
                <p className="text-sm">{sub.email}</p>
                {sub.name && (
                  <p className="text-xs text-muted-foreground">{sub.name}</p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    sub.isActive
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {sub.isActive ? "Active" : "Unsubscribed"}
                </span>
                <span className="text-xs text-muted-foreground">
                  {formatFullDate(sub.subscribedAt)}
                </span>
                {sub.isActive && (
                  <DeleteButton
                    action={unsubscribeNewsletter.bind(null, sub.id)}
                    itemLabel="subscriber"
                    confirmMessage={`Unsubscribe ${sub.email} from the newsletter?`}
                    successVerb="unsubscribed"
                    loadingVerb="Unsubscribing"
                    errorVerb="unsubscribe"
                    className="p-1 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors disabled:opacity-50"
                  />
                )}
              </div>
            </div>
          ))}
          {subscribers.length === 0 && (
            <p className="p-8 text-center text-muted-foreground">No subscribers yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
