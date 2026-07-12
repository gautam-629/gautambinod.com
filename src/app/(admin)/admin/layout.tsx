import { auth } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { ToastProvider } from "@/components/ui/Toast";

// NOTE: Auth is already enforced by middleware.ts for all /admin/* routes
// except /admin/login. We intentionally do NOT redirect() here as well —
// having two independent redirect checks (middleware + layout) racing
// against cookie propagation is what causes infinite redirect loops after
// sign-in. Middleware is the single source of truth for route protection.
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Wrap in try/catch so a JWTSessionError (e.g. mismatched NEXTAUTH_SECRET
  // after a secret rotation) degrades gracefully — the admin panel still
  // renders, just without the user's name in the header. Middleware still
  // enforces the auth gate, so unauthenticated users can't reach this layout.
  let session = null;
  try {
    session = await auth();
  } catch {
    // JWTSessionError or similar — middleware already guards the route,
    // so it's safe to render without a session object here.
  }

  return (
    <ToastProvider>
      <div className="flex h-screen bg-background overflow-hidden">
        <AdminSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <AdminHeader userName={session?.user?.name} />
          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </div>
      </div>
    </ToastProvider>
  );
}
