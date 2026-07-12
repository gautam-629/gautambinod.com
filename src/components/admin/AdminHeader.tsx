"use client";

import { signOut } from "next-auth/react";
import { Bell, LogOut, ExternalLink } from "lucide-react";
import { ThemeToggle } from "@/components/common/ThemeToggle";

interface Props {
  userName?: string | null;
}

export function AdminHeader({ userName }: Props) {
  return (
    <header className="h-16 border-b border-border/50 bg-background/80 backdrop-blur-md flex items-center justify-between px-6 shrink-0">
      <div className="text-sm text-muted-foreground">
        Welcome back,{" "}
        <span className="font-semibold text-foreground">{userName || "Admin"}</span>
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
          title="View site"
        >
          <ExternalLink className="h-4 w-4" />
        </a>
        <button
          className="p-2 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
          title="Notifications"
        >
          <Bell className="h-4 w-4" />
        </button>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="p-2 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
          title="Sign out"
        >
          <LogOut className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}
