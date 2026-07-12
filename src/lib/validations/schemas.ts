import { z } from "zod";

// ─── Contact ───────────────────────────────────────────────────────
export const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().optional(),
  company: z.string().optional(),
  budget: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormData = z.infer<typeof contactSchema>;

// ─── Project Request ────────────────────────────────────────────────
export const projectRequestSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().optional(),
  company: z.string().optional(),
  projectType: z.string().min(1, "Project type is required"),
  title: z.string().optional(),
  description: z.string().min(20, "Description must be at least 20 characters"),
  budget: z.string().optional(),
  timeline: z.string().optional(),
});

export type ProjectRequestFormData = z.infer<typeof projectRequestSchema>;

// ─── Hero Section ───────────────────────────────────────────────────
export const heroSchema = z.object({
  greeting: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  highlightedText: z.string().optional(),
  subtitle: z.string().optional(),
  description: z.string().optional(),
  profileImage: z.string().optional(),
  backgroundImage: z.string().optional(),
  primaryCTAText: z.string().optional(),
  primaryCTAUrl: z.string().optional(),
  secondaryCTAText: z.string().optional(),
  secondaryCTAUrl: z.string().optional(),
  resumeUrl: z.string().optional(),
  isActive: z.boolean().default(true),
});

// ─── Experience ─────────────────────────────────────────────────────
export const experienceSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  companyLogo: z.string().optional(),
  jobTitle: z.string().min(1, "Job title is required"),
  employmentType: z.enum(["FULL_TIME", "PART_TIME", "CONTRACT", "FREELANCE", "INTERNSHIP"]),
  workMode: z.enum(["REMOTE", "HYBRID", "ONSITE"]).optional(),
  location: z.string().optional(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  currentlyWorking: z.boolean().default(false),
  shortDescription: z.string().optional(),
  description: z.string().min(1, "Description is required"),
  responsibilities: z.array(z.string()).optional(),
  achievements: z.array(z.string()).optional(),
  technologies: z.array(z.string()).optional(),
  companyWebsite: z.string().url().optional().or(z.literal("")),
  featured: z.boolean().default(false),
  status: z.boolean().default(true),
  displayOrder: z.number().default(0),
});

export type ExperienceFormData = z.infer<typeof experienceSchema>;

// ─── Skill ──────────────────────────────────────────────────────────
export const skillSchema = z.object({
  name: z.string().min(1, "Skill name is required"),
  slug: z.string().optional(),
  logo: z.string().optional(),
  categoryId: z.string().min(1, "Category is required"),
  level: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED", "EXPERT"]),
  proficiency: z.number().min(0).max(100),
  yearsOfExp: z.number().optional(),
  description: z.string().optional(),
  featured: z.boolean().default(false),
  displayOrder: z.number().default(0),
  isActive: z.boolean().default(true),
});

// ─── Project ────────────────────────────────────────────────────────
export const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().optional(),
  shortDescription: z.string().optional(),
  description: z.string().min(1, "Description is required"),
  thumbnail: z.string().optional(),
  liveUrl: z.string().url().optional().or(z.literal("")),
  githubUrl: z.string().url().optional().or(z.literal("")),
  technologies: z.array(z.string()).optional(),
  features: z.array(z.string()).optional(),
  challenges: z.array(z.string()).optional(),
  solutions: z.array(z.string()).optional(),
  categoryId: z.string().min(1, "Category is required"),
  status: z.enum(["ACTIVE", "COMPLETED", "SOLD", "ARCHIVED"]),
  clientName: z.string().optional(),
  featured: z.boolean().default(false),
  displayOrder: z.number().default(0),
  isActive: z.boolean().default(true),
});

// ─── Product ────────────────────────────────────────────────────────
export const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  slug: z.string().optional(),
  tagline: z.string().optional(),
  description: z.string().min(1, "Description is required"),
  price: z.number().min(0, "Price must be positive"),
  discountedPrice: z.number().optional(),
  currency: z.string().default("USD"),
  categoryId: z.string().min(1, "Category is required"),
  status: z.enum(["AVAILABLE", "SOLD", "COMING_SOON", "UNDER_DEVELOPMENT"]),
  userFeatures: z.array(z.string()).optional(),
  adminFeatures: z.array(z.string()).optional(),
  mobileFeatures: z.array(z.string()).optional(),
  techStack: z.array(z.string()).optional(),
  demoUrl: z.string().url().optional().or(z.literal("")),
  demoUsername: z.string().optional(),
  demoPassword: z.string().optional(),
  featured: z.boolean().default(false),
  displayOrder: z.number().default(0),
  isActive: z.boolean().default(true),
});

// ─── Blog ───────────────────────────────────────────────────────────
export const blogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().optional(),
  excerpt: z.string().optional(),
  content: z.string().min(1, "Content is required"),
  featuredImage: z.string().optional(),
  categoryId: z.string().min(1, "Category is required"),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]),
  featured: z.boolean().default(false),
  readTimeMin: z.number().optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});

// ─── Order ──────────────────────────────────────────────────────────
export const orderSchema = z.object({
  productId: z.string().min(1, "Product is required"),
  customerName: z.string().min(1, "Name is required"),
  customerEmail: z.string().email("Invalid email"),
  customerPhone: z.string().optional(),
  customerCompany: z.string().optional(),
  paymentMethod: z.string().optional(),
  notes: z.string().optional(),
});

export type OrderFormData = z.infer<typeof orderSchema>;

// ─── Newsletter ─────────────────────────────────────────────────────
export const newsletterSchema = z.object({
  email: z.string().email("Invalid email"),
  name: z.string().optional(),
});

// ─── Product Review ─────────────────────────────────────────────────
export const productReviewSchema = z.object({
  productId: z.string().min(1),
  reviewerName: z.string().min(2, "Name is required").max(100),
  reviewerEmail: z.string().email("Invalid email"),
  rating: z.number().min(1, "Please select a rating").max(5),
  title: z.string().max(150).optional(),
  content: z.string().min(10, "Review must be at least 10 characters").max(2000),
});

export type ProductReviewFormData = z.infer<typeof productReviewSchema>;

// ─── Blog Comment ───────────────────────────────────────────────────
export const blogCommentSchema = z.object({
  blogId: z.string().min(1),
  name: z.string().min(2, "Name is required").max(100),
  email: z.string().email("Invalid email"),
  content: z.string().min(3, "Comment is too short").max(2000),
});

export type BlogCommentFormData = z.infer<typeof blogCommentSchema>;
