"use client";

import { useCallback, useRef, useState } from "react";
import { ImageIcon, Upload, Loader2, X, AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/Toast";

interface Props {
  name: string;
  label: string;
  defaultValue?: string | null;
  /** Cloudinary folder to upload into */
  folder?: string;
  /** Helper text shown below the field */
  helperText?: string;
  required?: boolean;
}

const MAX_SIZE_MB = 10;

/**
 * Image URL field with an inline upload option. Admins can either paste a
 * URL directly or click/drag a file to upload straight to Cloudinary via
 * /api/upload — the resulting URL is filled in automatically. Shows a live
 * thumbnail preview and upload progress, so there's no need to leave the
 * form or juggle the separate Media Library page just to add a photo.
 */
export function ImageUrlField({
  name,
  label,
  defaultValue,
  folder = "devfolio",
  helperText,
  required,
}: Props) {
  const { toast } = useToast();
  const [value, setValue] = useState(defaultValue ?? "");
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [previewError, setPreviewError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadFile = useCallback(
    async (file: File) => {
      if (!file.type.startsWith("image/")) {
        toast({ variant: "error", title: "Please choose an image file" });
        return;
      }
      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        toast({ variant: "error", title: `Image must be under ${MAX_SIZE_MB}MB` });
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
        setPreviewError(false);
        if (inputRef.current) inputRef.current.value = data.url;
        toast({ variant: "success", title: "Image uploaded" });
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
        <ImageIcon className="h-3.5 w-3.5" />
        {label} {required && <span className="text-destructive">*</span>}
      </label>

      <div className="flex gap-2">
        <input
          ref={inputRef}
          type="text"
          name={name}
          required={required}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setPreviewError(false);
          }}
          placeholder="https://res.cloudinary.com/... or upload a file"
          className="flex-1 rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-60"
        />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
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
          {previewError ? (
            <div className="w-20 h-20 rounded-lg border border-dashed border-border flex flex-col items-center justify-center gap-1 text-muted-foreground">
              <AlertCircle className="h-4 w-4" />
              <span className="text-[10px]">Can&apos;t load</span>
            </div>
          ) : (
            <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-border/50 bg-muted">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={value}
                alt="Preview"
                className="w-full h-full object-cover"
                onError={() => setPreviewError(true)}
              />
            </div>
          )}
          <button
            type="button"
            onClick={() => {
              setValue("");
              setPreviewError(false);
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
