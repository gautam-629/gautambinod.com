import { prisma } from "@/lib/prisma";
import { formatFullDate } from "@/utils/format";
import { updateRequestStatus, deleteRequest } from "@/actions/requests.actions";
import { StatusSelect } from "@/components/admin/StatusSelect";
import { DeleteButton } from "@/components/admin/DeleteButton";

export const metadata = { title: "Project Requests | Admin" };

export default async function AdminRequestsPage() {
  const requests = await prisma.projectRequest.findMany({
    orderBy: { createdAt: "desc" },
  });

  const statusColor: Record<string, string> = {
    NEW: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    IN_REVIEW: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
    QUOTED: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    ACCEPTED: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    REJECTED: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    IN_PROGRESS: "bg-primary/10 text-primary",
    COMPLETED: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Project Requests</h1>
        <p className="text-muted-foreground text-sm mt-1">
          {requests.filter((r) => !r.isRead).length} unread · {requests.length} total
        </p>
      </div>

      <div className="space-y-4">
        {requests.map((req) => (
          <div key={req.id} className={`rounded-xl border bg-card p-5 ${!req.isRead ? "border-primary/30" : "border-border/50"}`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="font-semibold">{req.name}</span>
                  {!req.isRead && <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">New</span>}
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor[req.status]}`}>{req.status.replace("_", " ")}</span>
                </div>
                <p className="text-sm text-muted-foreground">{req.email}{req.company ? ` · ${req.company}` : ""}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{req.projectType}</span>
                  {req.budget && <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">Budget: {req.budget}</span>}
                  {req.timeline && <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">Timeline: {req.timeline}</span>}
                </div>
                {req.title && <p className="font-medium text-sm mt-2">{req.title}</p>}
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{req.description}</p>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-xs text-muted-foreground mb-2">{formatFullDate(req.createdAt)}</p>
                <StatusSelect
                  action={updateRequestStatus.bind(null, req.id)}
                  name="status"
                  defaultValue={req.status}
                  options={[
                    { value: "NEW", label: "New" },
                    { value: "IN_REVIEW", label: "In Review" },
                    { value: "QUOTED", label: "Quoted" },
                    { value: "ACCEPTED", label: "Accepted" },
                    { value: "REJECTED", label: "Rejected" },
                    { value: "IN_PROGRESS", label: "In Progress" },
                    { value: "COMPLETED", label: "Completed" },
                  ]}
                />
                <a href={`mailto:${req.email}?subject=Re: Your Project Request`} className="text-xs text-primary hover:underline mt-2 block">
                  Reply
                </a>
                <div className="mt-2 flex justify-end">
                  <DeleteButton
                    action={deleteRequest.bind(null, req.id)}
                    itemLabel="request"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
        {requests.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">No project requests yet.</div>
        )}
      </div>
    </div>
  );
}
