"use client";

import { Loader2 } from "lucide-react";
import { useFormAction, type ActionResult } from "@/hooks/useFormAction";
import { ImageUrlField } from "@/components/admin/ImageUrlField";
import { VideoUrlField } from "@/components/admin/VideoUrlField";

interface Category {
  id: string;
  name: string;
}

interface ProjectFormValues {
  id?: string;
  title?: string;
  slug?: string;
  categoryId?: string;
  status?: string;
  shortDescription?: string | null;
  description?: string;
  thumbnail?: string | null;
  demoVideo?: string | null;
  liveUrl?: string | null;
  githubUrl?: string | null;
  technologies?: string[];
  features?: string[];
  challenges?: string[];
  solutions?: string[];
  clientName?: string | null;
  displayOrder?: number;
  featured?: boolean;
  isActive?: boolean;
}

interface Props {
  categories: Category[];
  action: (formData: FormData) => Promise<ActionResult>;
  defaultValues?: ProjectFormValues;
  mode: "create" | "edit";
}

const inputClass =
  "w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-60 disabled:cursor-not-allowed";

export function ProjectForm({ categories, action, defaultValues, mode }: Props) {
  const { submit, isPending } = useFormAction(action, {
    loadingMessage: mode === "create" ? "Creating project..." : "Saving changes...",
    successMessage: mode === "create" ? "Project created" : "Project updated",
    errorMessage: mode === "create" ? "Couldn't create project" : "Couldn't save changes",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit(new FormData(e.currentTarget));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-border/50 bg-card p-6 space-y-5"
    >
      <fieldset disabled={isPending} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium mb-1.5">
              Title <span className="text-destructive">*</span>
            </label>
            <input
              name="title"
              required
              defaultValue={defaultValues?.title}
              placeholder="E-Commerce Platform"
              className={inputClass}
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium mb-1.5">Slug</label>
            <input
              name="slug"
              defaultValue={defaultValues?.slug}
              placeholder="auto-generated from title"
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">
              Category <span className="text-destructive">*</span>
            </label>
            <select
              name="categoryId"
              required
              defaultValue={defaultValues?.categoryId ?? ""}
              className={inputClass}
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Status</label>
            <select
              name="status"
              defaultValue={defaultValues?.status ?? "COMPLETED"}
              className={inputClass}
            >
              <option value="ACTIVE">Active</option>
              <option value="COMPLETED">Completed</option>
              <option value="ARCHIVED">Archived</option>
              <option value="SOLD">Sold</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Short Description</label>
          <input
            name="shortDescription"
            defaultValue={defaultValues?.shortDescription ?? ""}
            placeholder="Brief one-line description"
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">
            Full Description <span className="text-destructive">*</span>
          </label>
          <p className="text-xs text-muted-foreground mb-1">HTML supported</p>
          <textarea
            name="description"
            required
            rows={6}
            defaultValue={defaultValues?.description}
            placeholder="<p>Detailed project description...</p>"
            className={`${inputClass} font-mono resize-y`}
          />
        </div>

        {/* Thumbnail with inline upload */}
        <ImageUrlField
          name="thumbnail"
          label="Thumbnail Image"
          defaultValue={defaultValues?.thumbnail}
          folder="devfolio/projects"
          helperText="Paste a URL or upload an image directly"
        />

        {/* Demo video URL */}
        <VideoUrlField
          name="demoVideo"
          label="Demo Video"
          defaultValue={defaultValues?.demoVideo}
          folder="devfolio/projects"
          helperText='Shown as a "Watch Demo" link on the project page — paste a YouTube/Vimeo link or upload a file'
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium mb-1.5">Live URL</label>
            <input
              name="liveUrl"
              type="url"
              defaultValue={defaultValues?.liveUrl ?? ""}
              placeholder="https://example.com"
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">GitHub URL</label>
            <input
              name="githubUrl"
              type="url"
              defaultValue={defaultValues?.githubUrl ?? ""}
              placeholder="https://github.com/..."
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Technologies</label>
          <input
            name="technologies"
            defaultValue={defaultValues?.technologies?.join(", ") ?? ""}
            placeholder="React, Node.js, PostgreSQL (comma-separated)"
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Key Features</label>
          <textarea
            name="features"
            rows={4}
            defaultValue={defaultValues?.features?.join("\n") ?? ""}
            placeholder="One feature per line"
            className={`${inputClass} resize-y`}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium mb-1.5">Challenges (one per line)</label>
            <textarea
              name="challenges"
              rows={3}
              defaultValue={defaultValues?.challenges?.join("\n") ?? ""}
              className={`${inputClass} resize-y`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Solutions (one per line)</label>
            <textarea
              name="solutions"
              rows={3}
              defaultValue={defaultValues?.solutions?.join("\n") ?? ""}
              className={`${inputClass} resize-y`}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium mb-1.5">Client Name</label>
            <input
              name="clientName"
              defaultValue={defaultValues?.clientName ?? ""}
              placeholder="Client or company name"
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Display Order</label>
            <input
              name="displayOrder"
              type="number"
              defaultValue={defaultValues?.displayOrder ?? 0}
              className={inputClass}
            />
          </div>
        </div>

        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="featured"
              defaultChecked={defaultValues?.featured}
              className="rounded"
            />
            <span className="text-sm">Featured</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="isActive"
              defaultChecked={defaultValues?.isActive ?? true}
              className="rounded"
            />
            <span className="text-sm">Active</span>
          </label>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={isPending}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
          >
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {mode === "create" ? "Creating..." : "Saving..."}
              </>
            ) : mode === "create" ? (
              "Create Project"
            ) : (
              "Save Changes"
            )}
          </button>
          <a
            href="/admin/projects"
            className="rounded-md border border-border px-5 py-3 text-sm font-medium hover:bg-accent transition-colors"
          >
            Cancel
          </a>
        </div>
      </fieldset>
    </form>
  );
}
