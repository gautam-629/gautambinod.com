"use client";

import { useState, useRef, useCallback } from "react";
import { Upload, Loader2, CheckCircle, X } from "lucide-react";
import { useRouter } from "next/navigation";

interface UploadedFile {
  url: string;
  name: string;
}

export function MediaUploader() {
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState<UploadedFile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const upload = useCallback(
    async (file: File) => {
      setUploading(true);
      setUploaded(null);
      setError(null);

      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", "devfolio");

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = (await res.json()) as { url?: string; error?: string };

        if (!res.ok || !data.url) {
          throw new Error(data.error ?? "Upload failed");
        }

        setUploaded({ url: data.url, name: file.name });
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Upload failed");
      } finally {
        setUploading(false);
      }
    },
    [router]
  );

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files || files.length === 0) return;
      upload(files[0]);
    },
    [upload]
  );

  const copyToClipboard = useCallback(async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // Fallback for browsers without clipboard API
      const el = document.createElement("textarea");
      el.value = url;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
  }, []);

  return (
    <div
      className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${
        dragging
          ? "border-primary bg-primary/5"
          : "border-border/50 hover:border-border"
      }`}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        handleFiles(e.dataTransfer.files);
      }}
      onClick={() => inputRef.current?.click()}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
      }}
      aria-label="Upload file"
    >
      <input
        ref={inputRef}
        type="file"
        multiple={false}
        accept="image/*,video/*,.pdf"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      {uploading ? (
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 text-primary animate-spin" />
          <p className="text-sm text-muted-foreground">Uploading...</p>
        </div>
      ) : uploaded ? (
        <div
          className="flex flex-col items-center gap-2"
          onClick={(e) => e.stopPropagation()}
        >
          <CheckCircle className="h-8 w-8 text-green-500" />
          <p className="text-sm font-medium text-foreground">{uploaded.name}</p>
          <button
            type="button"
            onClick={() => copyToClipboard(uploaded.url)}
            className="text-xs text-primary hover:underline break-all max-w-sm"
          >
            Click to copy URL
          </button>
          <button
            type="button"
            onClick={() => setUploaded(null)}
            className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 mt-1"
          >
            <X className="h-3 w-3" /> Upload another
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3">
          <Upload className="h-8 w-8 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">Drag & drop files here</p>
            <p className="text-xs text-muted-foreground mt-1">or click to browse</p>
          </div>
          <p className="text-xs text-muted-foreground">
            Images, videos, PDFs — max 10MB
          </p>
          {error && (
            <p className="text-xs text-destructive bg-destructive/10 px-3 py-1.5 rounded-md">
              {error}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
