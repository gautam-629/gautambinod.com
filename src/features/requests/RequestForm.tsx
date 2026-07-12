"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectRequestSchema, type ProjectRequestFormData } from "@/lib/validations/schemas";
import { submitProjectRequest } from "@/actions/requests.actions";
import { CheckCircle, Loader2 } from "lucide-react";

const projectTypes = [
  "Website Development",
  "Mobile App Development",
  "ERP / CRM System",
  "Custom Software",
  "UI/UX Design",
  "API Development",
  "SaaS Platform",
  "E-Commerce Store",
  "Other",
];

const inputClass =
  "w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors";
const errorClass = "text-xs text-destructive mt-1";

export function RequestForm() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProjectRequestFormData>({
    resolver: zodResolver(projectRequestSchema),
  });

  const onSubmit = async (data: ProjectRequestFormData) => {
    setServerError(null);
    const result = await submitProjectRequest(data);
    if (result.success) {
      setSubmitted(true);
      reset();
    } else {
      setServerError(result.error ?? "Something went wrong. Please try again.");
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <CheckCircle className="h-16 w-16 text-primary mb-4" />
        <h2 className="text-2xl font-bold mb-2">Request Submitted!</h2>
        <p className="text-muted-foreground mb-6">
          Thank you! I'll review your project and send a proposal within 24 hours.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="text-sm text-primary hover:underline"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium mb-1.5">
            Name <span className="text-destructive">*</span>
          </label>
          <input {...register("name")} placeholder="John Smith" className={inputClass} />
          {errors.name && <p className={errorClass}>{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">
            Email <span className="text-destructive">*</span>
          </label>
          <input
            {...register("email")}
            type="email"
            placeholder="john@company.com"
            className={inputClass}
          />
          {errors.email && <p className={errorClass}>{errors.email.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Phone</label>
          <input
            {...register("phone")}
            placeholder="+1 (555) 000-0000"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Company</label>
          <input
            {...register("company")}
            placeholder="Your Company"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5">
          Project Type <span className="text-destructive">*</span>
        </label>
        <select {...register("projectType")} className={inputClass}>
          <option value="">Select type...</option>
          {projectTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        {errors.projectType && (
          <p className={errorClass}>{errors.projectType.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5">Project Title</label>
        <input
          {...register("title")}
          placeholder="E.g. E-Commerce Platform for Fashion Brand"
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5">
          Project Description <span className="text-destructive">*</span>
        </label>
        <textarea
          {...register("description")}
          rows={5}
          placeholder="Describe your project: goals, features, target audience, any existing systems..."
          className={inputClass}
        />
        {errors.description && (
          <p className={errorClass}>{errors.description.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium mb-1.5">Budget Range</label>
          <select {...register("budget")} className={inputClass}>
            <option value="">Select budget</option>
            <option value="< $1K">&lt; $1K</option>
            <option value="$1K - $3K">$1K – $3K</option>
            <option value="$3K - $5K">$3K – $5K</option>
            <option value="$5K - $10K">$5K – $10K</option>
            <option value="$10K - $25K">$10K – $25K</option>
            <option value="$25K+">$25K+</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Timeline</label>
          <select {...register("timeline")} className={inputClass}>
            <option value="">Select timeline</option>
            <option value="ASAP">ASAP</option>
            <option value="1-2 weeks">1-2 weeks</option>
            <option value="1 month">1 month</option>
            <option value="2-3 months">2-3 months</option>
            <option value="3-6 months">3-6 months</option>
            <option value="6+ months">6+ months</option>
            <option value="Flexible">Flexible</option>
          </select>
        </div>
      </div>

      {serverError && (
        <p className="text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-md">
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Submitting...
          </>
        ) : (
          "Submit Project Request"
        )}
      </button>
    </form>
  );
}
