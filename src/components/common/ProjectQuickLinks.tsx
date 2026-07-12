"use client";

import { ExternalLink, Github } from "lucide-react";

interface Props {
  liveUrl?: string | null;
  githubUrl?: string | null;
}

/**
 * Small interactive island for the live-demo / source-code icon links shown
 * on project cards. Extracted as a Client Component because:
 *  1. stopPropagation() is an event handler and cannot be passed as a prop
 *     from a Server Component.
 *  2. These render as siblings (not children) of the card's <Link>, which
 *     avoids invalid nested-<a> HTML while still overlaying visually via
 *     absolute positioning on the parent.
 */
export function ProjectQuickLinks({ liveUrl, githubUrl }: Props) {
  if (!liveUrl && !githubUrl) return null;

  return (
    <div
      className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10"
      onClick={(e) => e.stopPropagation()}
    >
      {liveUrl && (
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-1.5 rounded-md bg-background/90 hover:bg-background"
          aria-label="View live demo"
        >
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      )}
      {githubUrl && (
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-1.5 rounded-md bg-background/90 hover:bg-background"
          aria-label="View source code"
        >
          <Github className="h-3.5 w-3.5" />
        </a>
      )}
    </div>
  );
}
