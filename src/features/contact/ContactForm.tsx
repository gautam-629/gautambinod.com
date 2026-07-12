"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactFormData } from "@/lib/validations/schemas";
import { submitContact } from "@/actions/contact.actions";
import { CheckCircle, Loader2 } from "lucide-react";

interface Props {
  services: string[];
}

export function ContactForm({ services }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setServerError(null);
    const result = await submitContact(data);
    if (result.success) {
      setSubmitted(true);
      reset();
    } else {
      setServerError(result.error || "Something went wrong. Please try again.");
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <CheckCircle className="h-16 w-16 text-primary mb-4" />
        <h2 className="text-2xl font-bold mb-2">Message Sent!</h2>
        <p className="text-muted-foreground mb-6">Thank you for reaching out. I'll get back to you within 24 hours.</p>
        <button onClick={() => setSubmitted(false)} className="text-sm text-primary hover:underline">
          Send another message
        </button>
      </div>
    );
  }

  const inputClass = "w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors";
  const errorClass = "text-xs text-destructive mt-1";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium mb-1.5">Name *</label>
          <input {...register("name")} placeholder="John Smith" className={inputClass} />
          {errors.name && <p className={errorClass}>{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Email *</label>
          <input {...register("email")} type="email" placeholder="john@company.com" className={inputClass} />
          {errors.email && <p className={errorClass}>{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium mb-1.5">Phone</label>
          <input {...register("phone")} placeholder="+1 (555) 000-0000" className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Company</label>
          <input {...register("company")} placeholder="Your Company" className={inputClass} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium mb-1.5">Service</label>
          <select {...register("service")} className={inputClass}>
            <option value="">Select a service</option>
            {services.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Budget</label>
          <select {...register("budget")} className={inputClass}>
            <option value="">Select budget</option>
            <option value="< $500">&lt; $500</option>
            <option value="$500 - $2K">$500 – $2K</option>
            <option value="$2K - $5K">$2K – $5K</option>
            <option value="$5K - $10K">$5K – $10K</option>
            <option value="$10K+">$10K+</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5">Message *</label>
        <textarea
          {...register("message")}
          rows={5}
          placeholder="Tell me about your project..."
          className={inputClass}
        />
        {errors.message && <p className={errorClass}>{errors.message.message}</p>}
      </div>

      {serverError && (
        <p className="text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-md">{serverError}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
      >
        {isSubmitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending...</> : "Send Message"}
      </button>
    </form>
  );
}
