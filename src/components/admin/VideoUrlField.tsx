"use client";

import { useCallback, useRef, useState } from "react";
import { Video, Upload, Loader2, X, ExternalLink } from "lucide-react";
import { useToast } from "@/components/ui/Toast";

interface Props {
  name: string;
  label: string;
  defaultValue?: string | null;
  folder?: string;
  helperText?: string;
}

const MAX_SIZE_MB = 100;

/**
 * Video URL field with inline upload. Admins can paste an external link
 * (YouTube, Vimeo, etc.) or upload a video file directly to Cloudinary.
 * Unlike images, we don't render a heavy inline preview player — just a
 * confirmation chip with a link to open it, since auto-playing/loading
 * video previews in a form is a poor experience and wastes bandwidth.
 */
export function VideoUrlField({ name, label, defaultValue, folder = "devfolio", helperText }: Props) {
  const { toast } = useToast();
  const [value, setValue] = useState(defaultValue ?? "");
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadFile = useCallback(
    async (file: File) => {
      if (!file.type.startsWith("video/")) {
        toast({ variant: "error", title: "Please choose a video file" });
        return;
      }
      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        toast({ variant: "error", title: `Video must be under ${MAX_SIZE_MB}MB` });
        return;
      }

      setUploading(true);
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", folder);

        const res = await fetch("/api/upload", { method: "POST", body: formData });
        const data = (await res.json()) as { url?: string; error?: string };

        if (!res.ok || !data.url) {
          throw new Error(data.error ?? "Upload failed");
        }

        setValue(data.url);
        if (inputRef.current) inputRef.current.value = data.url;
        toast({ variant: "success", title: "Video uploaded" });
      } catch (err) {
        toast({
          variant: "error",
          title: "Upload failed",
          description: err instanceof Error ? err.message : "Please try again.",
        });
      } finally {
        setUploading(false);
      }
    },
    [folder, toast]
  );

  return (
    <div>
      <label className="block text-sm font-medium mb-1.5 flex items-center gap-1.5">
        <Video className="h-3.5 w-3.5" /> {label}
      </label>

      <div className="flex gap-2">
        <input
          ref={inputRef}
          type="url"
          name={name}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="https://youtube.com/watch?v=... or upload a file"
          className="flex-1 rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-60"
        />
        <input
          ref={fileInputRef}
          type="file"
          accept="video/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) uploadFile(file);
            e.target.value = "";
          }}
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            const file = e.dataTransfer.files?.[0];
            if (file) uploadFile(file);
          }}
          className={`shrink-0 inline-flex items-center gap-1.5 rounded-md border px-3 py-2.5 text-sm font-medium transition-colors disabled:opacity-60 disabled:cursor-not-allowed ${
            dragging
              ? "border-primary bg-primary/10 text-primary"
              : "border-input hover:bg-accent"
          }`}
        >
          {uploading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Upload className="h-4 w-4" />
          )}
          <span className="hidden sm:inline">{uploading ? "Uploading..." : "Upload"}</span>
        </button>
      </div>

      {helperText && <p className="text-xs text-muted-foreground mt-1">{helperText}</p>}

      {value && (
        <div className="mt-2 flex items-center gap-2">
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs bg-muted px-2.5 py-1.5 rounded-md text-foreground hover:bg-accent transition-colors"
          >
            <Video className="h-3 w-3" /> Preview video <ExternalLink className="h-3 w-3" />
          </a>
          <button
            type="button"
            onClick={() => {
              setValue("");
              if (inputRef.current) inputRef.current.value = "";
            }}
            className="text-xs text-muted-foreground hover:text-destructive transition-colors inline-flex items-center gap-1"
          >
            <X className="h-3 w-3" /> Remove
          </button>
        </div>
      )}
    </div>
  );
}
