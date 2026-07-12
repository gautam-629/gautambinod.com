import Link from "next/link";
import { ArrowLeft, Home, FolderOpen, Mail } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center px-4">
        <div className="text-8xl font-bold text-primary/20 mb-4">404</div>
        <h1 className="text-3xl font-bold mb-3">Page Not Found</h1>
        <p className="text-muted-foreground max-w-md mx-auto mb-8">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link href="/" className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
            <Home className="h-4 w-4" /> Go Home
          </Link>
          <Link href="/projects" className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-2.5 text-sm font-medium hover:bg-accent transition-colors">
            <FolderOpen className="h-4 w-4" /> View Projects
          </Link>
          <Link href="/contact" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <Mail className="h-4 w-4" /> Contact Me
          </Link>
        </div>
      </div>
    </div>
  );
}
