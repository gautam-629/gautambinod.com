"use client";

import { Loader2 } from "lucide-react";
import { useFormAction, type ActionResult } from "@/hooks/useFormAction";
import { ImageUrlField } from "@/components/admin/ImageUrlField";
import { VideoUrlField } from "@/components/admin/VideoUrlField";

interface Category {
  id: string;
  name: string;
}

interface ProductFormValues {
  id?: string;
  name?: string;
  slug?: string;
  categoryId?: string;
  status?: string;
  tagline?: string | null;
  description?: string;
  thumbnail?: string | null;
  demoVideo?: string | null;
  price?: number;
  discountedPrice?: number | null;
  techStack?: string[];
  userFeatures?: string[];
  adminFeatures?: string[];
  mobileFeatures?: string[];
  demoUrl?: string | null;
  demoUsername?: string | null;
  demoPassword?: string | null;
  displayOrder?: number;
  featured?: boolean;
  isActive?: boolean;
}

interface Props {
  categories: Category[];
  action: (formData: FormData) => Promise<ActionResult>;
  defaultValues?: ProductFormValues;
  mode: "create" | "edit";
}

const inputClass =
  "w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-60 disabled:cursor-not-allowed";

export function ProductForm({ categories, action, defaultValues, mode }: Props) {
  const { submit, isPending } = useFormAction(action, {
    loadingMessage: mode === "create" ? "Creating product..." : "Saving changes...",
    successMessage: mode === "create" ? "Product created" : "Product updated",
    errorMessage: mode === "create" ? "Couldn't create product" : "Couldn't save changes",
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
              Product Name <span className="text-destructive">*</span>
            </label>
            <input
              name="name"
              required
              defaultValue={defaultValues?.name}
              placeholder="AdminPro Dashboard"
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
              defaultValue={defaultValues?.status ?? "AVAILABLE"}
              className={inputClass}
            >
              <option value="AVAILABLE">Available</option>
              <option value="COMING_SOON">Coming Soon</option>
              <option value="UNDER_DEVELOPMENT">Under Development</option>
              <option value="SOLD">Sold</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">
              Price (USD) <span className="text-destructive">*</span>
            </label>
            <input
              name="price"
              type="number"
              min="0"
              step="0.01"
              required
              defaultValue={defaultValues?.price}
              placeholder="299"
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Discounted Price</label>
            <input
              name="discountedPrice"
              type="number"
              min="0"
              step="0.01"
              defaultValue={defaultValues?.discountedPrice ?? ""}
              placeholder="199 (optional)"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Tagline</label>
          <input
            name="tagline"
            defaultValue={defaultValues?.tagline ?? ""}
            placeholder="Premium admin dashboard with 50+ components"
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">
            Description <span className="text-destructive">*</span>
          </label>
          <p className="text-xs text-muted-foreground mb-1">HTML supported</p>
          <textarea
            name="description"
            required
            rows={6}
            defaultValue={defaultValues?.description}
            placeholder="<p>Detailed product description...</p>"
            className={`${inputClass} font-mono resize-y`}
          />
        </div>

        {/* Thumbnail with inline upload */}
        <ImageUrlField
          name="thumbnail"
          label="Thumbnail Photo"
          defaultValue={defaultValues?.thumbnail}
          folder="devfolio/products"
          helperText="Main image shown on product cards and the marketplace listing — paste a URL or upload directly"
        />

        {/* Demo video URL */}
        <VideoUrlField
          name="demoVideo"
          label="Demo Video"
          defaultValue={defaultValues?.demoVideo}
          folder="devfolio/products"
          helperText='Shown as a "Watch Demo Video" button on the product page — paste a YouTube/Vimeo link or upload a file'
        />

        <div>
          <label className="block text-sm font-medium mb-1.5">Tech Stack</label>
          <input
            name="techStack"
            defaultValue={defaultValues?.techStack?.join(", ") ?? ""}
            placeholder="Next.js, TypeScript, Tailwind (comma-separated)"
            className={inputClass}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium mb-1.5">User Features</label>
            <textarea
              name="userFeatures"
              rows={4}
              defaultValue={defaultValues?.userFeatures?.join("\n") ?? ""}
              placeholder="One feature per line"
              className={`${inputClass} resize-y`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Admin Features</label>
            <textarea
              name="adminFeatures"
              rows={4}
              defaultValue={defaultValues?.adminFeatures?.join("\n") ?? ""}
              placeholder="One feature per line"
              className={`${inputClass} resize-y`}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Mobile Features</label>
          <textarea
            name="mobileFeatures"
            rows={3}
            defaultValue={defaultValues?.mobileFeatures?.join("\n") ?? ""}
            placeholder="One feature per line"
            className={`${inputClass} resize-y`}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium mb-1.5">Demo URL</label>
            <input
              name="demoUrl"
              type="url"
              defaultValue={defaultValues?.demoUrl ?? ""}
              placeholder="https://demo.example.com"
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
          <div>
            <label className="block text-sm font-medium mb-1.5">Demo Username</label>
            <input
              name="demoUsername"
              defaultValue={defaultValues?.demoUsername ?? ""}
              placeholder="demo@example.com"
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Demo Password</label>
            <input
              name="demoPassword"
              defaultValue={defaultValues?.demoPassword ?? ""}
              placeholder="demo123"
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
              "Create Product"
            ) : (
              "Save Changes"
            )}
          </button>
          <a
            href="/admin/products"
            className="rounded-md border border-border px-5 py-3 text-sm font-medium hover:bg-accent transition-colors"
          >
            Cancel
          </a>
        </div>
      </fieldset>
    </form>
  );
}
