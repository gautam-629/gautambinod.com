import type { Prisma } from "@prisma/client";

// ─── JSON field safe parser ──────────────────────────────────────────────────
// Prisma stores Json fields as Prisma.JsonValue at runtime.
// These helpers safely parse them into typed arrays.

export function toStringArray(value: Prisma.JsonValue | null | undefined): string[] {
  if (!value) return [];
  if (Array.isArray(value)) {
    return value.filter((v): v is string => typeof v === "string");
  }
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) {
        return parsed.filter((v): v is string => typeof v === "string");
      }
    } catch {
      return [];
    }
  }
  return [];
}

export function toObjectArray<T extends object>(
  value: Prisma.JsonValue | null | undefined
): T[] {
  if (!value) return [];
  if (Array.isArray(value)) {
    return value.filter((v): v is T => typeof v === "object" && v !== null && !Array.isArray(v));
  }
  return [];
}

// ─── Relation types (Prisma exports model types but not inline relation types) 
// These augment the base types with their include relations for component props.
export type ProjectWithCategory = {
  id: string;
  title: string;
  slug: string;
  shortDescription: string | null;
  description: string;
  thumbnail: string | null;
  gallery: Prisma.JsonValue | null;
  demoVideo: string | null;
  liveUrl: string | null;
  githubUrl: string | null;
  technologies: Prisma.JsonValue | null;
  features: Prisma.JsonValue | null;
  challenges: Prisma.JsonValue | null;
  solutions: Prisma.JsonValue | null;
  status: import("@prisma/client").ProjectStatus;
  clientName: string | null;
  clientLogo: string | null;
  completedDate: Date | null;
  featured: boolean;
  displayOrder: number;
  isActive: boolean;
  seoTitle: string | null;
  seoDescription: string | null;
  viewCount: number;
  createdAt: Date;
  updatedAt: Date;
  categoryId: string;
  category: {
    id: string;
    name: string;
    slug: string;
    icon: string | null;
    displayOrder: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
};

export type ProductWithCategory = {
  id: string;
  name: string;
  slug: string;
  tagline: string | null;
  description: string;
  images: Prisma.JsonValue | null;
  demoVideo: string | null;
  demoUrl: string | null;
  brochureUrl: string | null;
  price: number;
  discountedPrice: number | null;
  currency: string;
  userFeatures: Prisma.JsonValue | null;
  adminFeatures: Prisma.JsonValue | null;
  mobileFeatures: Prisma.JsonValue | null;
  techStack: Prisma.JsonValue | null;
  installationGuide: string | null;
  documentation: string | null;
  demoUsername: string | null;
  demoPassword: string | null;
  status: import("@prisma/client").ProductStatus;
  featured: boolean;
  displayOrder: number;
  isActive: boolean;
  seoTitle: string | null;
  seoDescription: string | null;
  viewCount: number;
  createdAt: Date;
  updatedAt: Date;
  categoryId: string;
  category: {
    id: string;
    name: string;
    slug: string;
    icon: string | null;
    displayOrder: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
};

// ─── Server action result shape ──────────────────────────────────────────────
// Shared between server actions (which return this) and client hooks/components
// (which consume it for toast feedback, redirects, and error display).
export interface ActionResult {
  success: boolean;
  message?: string;
  error?: string;
  /** Path to navigate to on success, e.g. "/admin/projects" */
  redirectTo?: string;
}
