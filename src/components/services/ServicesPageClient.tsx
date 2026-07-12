'use client';

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, Clock, ArrowRight, Code, Cloud, Palette, Smartphone, Database, Zap } from "lucide-react";
import type { ElementType } from "react";
import { formatCurrency } from "@/utils/format";
import { toStringArray } from "@/types";
import type { Service } from "@prisma/client";

interface Props {
  services: Service[];
}

const iconMap: Record<string, ElementType> = {
  Code, Cloud, Palette, Smartphone, Database, Zap,
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export function ServicesPageClient({ services }: Props) {
  return (
    <div className="container py-16 max-w-5xl mx-auto px-4 select-none">
      
      {/* Title & Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-2xl mb-12 space-y-3"
      >
        <span className="text-primary text-xs font-semibold uppercase tracking-wider">My Offerings</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground animate-in fade-in slide-in-from-top-4 duration-500">
          Professional Services
        </h1>
        <div className="w-12 h-1 bg-primary rounded-full mt-2" />
        <p className="text-muted-foreground text-sm leading-relaxed">
          End-to-end development services — from concept to deployment.
        </p>
      </motion.div>

      {/* Services List with Framer Motion Stagger */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {services.map((service) => {
          const Icon = (service.icon ? iconMap[service.icon] : null) ?? Code;
          const features = toStringArray(service.features);
          const deliverables = toStringArray(service.deliverables);

          return (
            <motion.div
              key={service.id}
              variants={cardVariants}
              className="group grid grid-cols-1 lg:grid-cols-5 gap-8 rounded-[24px] border border-border/50 bg-card/65 backdrop-blur-sm p-8 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 relative overflow-hidden"
            >
              {/* Outer Glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="lg:col-span-3 flex flex-col justify-between z-10">
                <div>
                  <div className="flex items-center gap-4 mb-5">
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-sm shadow-primary/5 shrink-0"
                    >
                      <Icon className="h-6 w-6" />
                    </motion.div>
                    <div>
                      <h2 className="text-xl font-bold tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary">
                        {service.title}
                      </h2>
                      {service.startingPrice && (
                        <p className="text-sm text-primary font-semibold mt-0.5">
                          From {formatCurrency(service.startingPrice)}
                          {service.priceUnit && (
                            <span className="text-xs text-muted-foreground font-normal"> {service.priceUnit}</span>
                          )}
                        </p>
                      )}
                    </div>
                  </div>

                  {service.shortDesc && (
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed font-normal">
                      {service.shortDesc}
                    </p>
                  )}

                  <div
                    className="prose prose-neutral dark:prose-invert max-w-none text-xs text-muted-foreground leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: service.description }}
                  />
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <Link
                    href={`/contact?service=${encodeURIComponent(service.title)}`}
                    className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-all duration-300 shadow-sm shadow-primary/5 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Get a Quote <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  {service.timeline && (
                    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/65 border border-border/30 px-3 py-1.5 rounded-xl font-medium">
                      <Clock className="h-3.5 w-3.5 text-primary/70" /> {service.timeline}
                    </span>
                  )}
                </div>
              </div>

              <div className="lg:col-span-2 space-y-6 z-10 border-t lg:border-t-0 lg:border-l border-border/20 pt-6 lg:pt-0 lg:pl-8">
                {features.length > 0 && (
                  <div>
                    <h3 className="font-bold text-xs uppercase tracking-wider text-muted-foreground mb-3">What&apos;s Included</h3>
                    <ul className="space-y-2">
                      {features.map((f, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground leading-normal">
                          <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" /> 
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {deliverables.length > 0 && (
                  <div>
                    <h3 className="font-bold text-xs uppercase tracking-wider text-muted-foreground mb-3">Deliverables</h3>
                    <ul className="space-y-2">
                      {deliverables.map((d, i) => (
                        <li key={i} className="text-xs text-muted-foreground flex items-start gap-2 leading-normal">
                          <span className="text-primary font-bold mt-0.5">▸</span> 
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {services.length === 0 && (
        <div className="text-center py-20 text-muted-foreground text-sm font-medium">
          No services listed yet.
        </div>
      )}

      {/* Don't see what you need CTA card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mt-16 text-center rounded-[24px] bg-gradient-to-br from-primary/5 to-indigo-500/5 border border-primary/20 p-12 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
      >
        <h2 className="text-2xl font-bold mb-3 text-foreground">Don&apos;t see what you need?</h2>
        <p className="text-muted-foreground mb-6 text-sm">
          I&apos;m open to custom projects and unique challenges. Let&apos;s talk.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-md shadow-primary/5"
        >
          Start a Conversation <ArrowRight className="h-4 w-4" />
        </Link>
      </motion.div>
    </div>
  );
}
