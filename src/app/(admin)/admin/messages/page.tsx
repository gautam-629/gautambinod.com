import { prisma } from "@/lib/prisma";
import { markMessageRead, deleteMessage } from "@/actions/messages.actions";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { formatFullDate } from "@/utils/format";
import { Mail, MailOpen } from "lucide-react";

export const metadata = { title: "Messages | Admin" };

export default async function AdminMessagesPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Contact Messages</h1>
        <p className="text-muted-foreground text-sm mt-1">
          {messages.filter((m) => !m.isRead).length} unread · {messages.length} total
        </p>
      </div>

      <div className="space-y-3">
        {messages.map((msg) => (
          <div key={msg.id} className={`rounded-xl border bg-card p-5 transition-colors ${!msg.isRead ? "border-primary/30 bg-primary/5" : "border-border/50"}`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${!msg.isRead ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                  {!msg.isRead ? <Mail className="h-4 w-4" /> : <MailOpen className="h-4 w-4" />}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-semibold text-sm">{msg.name}</span>
                    {!msg.isRead && <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">New</span>}
                  </div>
                  <p className="text-xs text-muted-foreground">{msg.email}{msg.company ? ` · ${msg.company}` : ""}</p>
                  {(msg.service || msg.budget) && (
                    <div className="flex gap-2 mt-1">
                      {msg.service && <span className="text-xs bg-muted px-2 py-0.5 rounded-full">{msg.service}</span>}
                      {msg.budget && <span className="text-xs bg-muted px-2 py-0.5 rounded-full">{msg.budget}</span>}
                    </div>
                  )}
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs text-muted-foreground">{formatFullDate(msg.createdAt)}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium mt-1 inline-block ${
                  msg.status === "NEW" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" :
                  msg.status === "CONVERTED" ? "bg-green-100 text-green-700" :
                  "bg-muted text-muted-foreground"
                }`}>{msg.status}</span>
              </div>
            </div>
            <div className="mt-3 ml-11">
              <p className="text-sm text-muted-foreground">{msg.message}</p>
              <div className="flex gap-3 mt-3">
                <a
                  href={`mailto:${msg.email}?subject=Re: Your Message`}
                  className="text-xs text-primary hover:underline"
                >
                  Reply via Email
                </a>
                {!msg.isRead && (
                  <form action={async () => {
                    "use server";
                    await markMessageRead(msg.id);
                  }}>
                    <button type="submit" className="text-xs text-muted-foreground hover:text-foreground">
                      Mark as Read
                    </button>
                  </form>
                )}
                <DeleteButton
                  action={deleteMessage.bind(null, msg.id)}
                  itemLabel="message"
                  className="p-1 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors disabled:opacity-50"
                />
              </div>
            </div>
          </div>
        ))}
        {messages.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">No messages yet.</div>
        )}
      </div>
    </div>
  );
}
