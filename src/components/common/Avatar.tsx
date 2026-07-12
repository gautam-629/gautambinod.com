"use client";

import { useState } from "react";

interface Props {
  src?: string | null;
  name: string;
  size?: number;
  className?: string;
}

/**
 * Avatar with photo + graceful fallback to an initial-letter circle.
 * Falls back automatically if the photo URL is missing or fails to load
 * (broken link, deleted Cloudinary asset, etc.) rather than showing a
 * broken image icon.
 */
export function Avatar({ src, name, size = 40, className = "" }: Props) {
  const [errored, setErrored] = useState(false);
  const showPhoto = src && !errored;

  return (
    <div
      className={`rounded-full overflow-hidden bg-primary/10 flex items-center justify-center text-primary font-bold shrink-0 ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      {showPhoto ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={name}
          className="w-full h-full object-cover"
          onError={() => setErrored(true)}
        />
      ) : (
        <span>{name[0]?.toUpperCase()}</span>
      )}
    </div>
  );
}
