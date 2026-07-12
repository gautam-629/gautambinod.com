import { RequestForm } from "@/features/requests/RequestForm";

export const metadata = { title: "Start a Project" };

export default function RequestPage() {
  return (
    <div className="container py-16 max-w-2xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">Start a Project</h1>
        <p className="text-muted-foreground text-lg">
          Tell me about your project and I'll get back to you with a tailored proposal within 24 hours.
        </p>
      </div>
      <div className="rounded-2xl border border-border/50 bg-card p-8">
        <RequestForm />
      </div>
    </div>
  );
}
