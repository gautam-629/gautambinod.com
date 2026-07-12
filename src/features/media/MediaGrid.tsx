"use client";

import Image from "next/image";
import { useState, useCallback } from "react";
import { Trash2, Copy, Check } from "lucide-react";
import { deleteMediaFile } from "@/actions/media.actions";
import type { MediaFile } from "@prisma/client";

interface Props {
  files: MediaFile[];
}

export function MediaGrid({ files }: Props) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyUrl = useCallback(async (id: string, url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // Fallback
      const el = document.createElement("textarea");
      el.value = url;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  }, []);

  if (files.length === 0) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        <p>No files uploaded yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
      {files.map((file) => (
        <div
          key={file.id}
          className="group relative rounded-lg border border-border/50 bg-card overflow-hidden"
        >
          <div className="relative h-24 bg-muted">
            {file.resourceType === "image" ? (
              <Image
                src={file.url}
                alt={file.altText ?? file.originalName}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl">
                  {file.resourceType === "video" ? "🎬" : "📄"}
                </span>
              </div>
            )}

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => copyUrl(file.id, file.url)}
                className="p-1.5 rounded-md bg-white/20 hover:bg-white/30 text-white transition-colors"
                title="Copy URL"
              >
                {copiedId === file.id ? (
                  <Check className="h-3.5 w-3.5" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </button>
              <form
                action={deleteMediaFile.bind(null, file.id, file.publicId)}
                onSubmit={(e) => {
                  if (!confirm(`Delete "${file.originalName}"?`)) {
                    e.preventDefault();
                  }
                }}
              >
                <button
                  type="submit"
                  className="p-1.5 rounded-md bg-red-500/80 hover:bg-red-500 text-white transition-colors"
                  title="Delete file"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </form>
            </div>
          </div>

          <div className="p-2">
            <p
              className="text-xs text-muted-foreground line-clamp-1"
              title={file.originalName}
            >
              {file.originalName}
            </p>
            {file.size !== null && (
              <p className="text-xs text-muted-foreground/60 mt-0.5">
                {file.size < 1024 * 1024
                  ? `${Math.round(file.size / 1024)} KB`
                  : `${(file.size / (1024 * 1024)).toFixed(1)} MB`}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
