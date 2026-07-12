"use client";

import { useState } from "react";
import { ImageOff } from "lucide-react";

interface Props {
  src?: string | null;
  alt?: string;
}

/**
 * Small thumbnail preview for admin list tables. Uses a plain <img> rather
 * than next/image because admins can paste arbitrary external URLs (not
 * just whitelisted domains like Cloudinary), and next/image throws a hard
 * runtime error for non-whitelisted hostnames. This is internal tooling
 * where flexibility matters more than image optimization. Falls back to a
 * placeholder icon on missing src or load failure (e.g. broken/typo'd URL).
 */
export function ThumbnailCell({ src, alt = "" }: Props) {
  const [errored, setErrored] = useState(false);
  const showPlaceholder = !src || errored;

  return (
    <div className="w-10 h-10 rounded-md overflow-hidden bg-muted border border-border/50 shrink-0 flex items-center justify-center">
      {showPlaceholder ? (
        <ImageOff className="h-4 w-4 text-muted-foreground/40" />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          onError={() => setErrored(true)}
        />
      )}
    </div>
  );
}
