'use client';

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, X, ExternalLink } from "lucide-react";
import type { Testimonial } from "@prisma/client";
import { Avatar } from "@/components/common/Avatar";

interface Props {
  testimonials: Testimonial[];
}

export function TestimonialsSection({ testimonials }: Props) {
  const [selectedItem, setSelectedItem] = useState<Testimonial | null>(null);

  if (!testimonials.length) return null;

  // Duplicate testimonials multiple times to create a seamless looping list
  const loopedItems = [...testimonials, ...testimonials, ...testimonials, ...testimonials];

  return (
    <section className="py-24 bg-muted/20 border-y border-border/20 overflow-hidden relative">
      {/* Styles for GPU-accelerated marquee scrolling and hover pause */}
      <style>{`
        @keyframes marquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .animate-marquee-loop {
          display: flex;
          width: max-content;
          animation: marquee 35s linear infinite;
        }
        .group-marquee:hover .animate-marquee-loop {
          animation-play-state: paused;
        }
      `}</style>

      <div className="container relative">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-primary text-sm font-semibold tracking-wider uppercase mb-2">Social Proof</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            What Clients Say
          </h2>
          <div className="w-12 h-1 bg-primary mx-auto mt-4 rounded-full" />
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Hover to pause and click any card to read the full engagement case details.
          </p>
        </div>
      </div>

      {/* Infinite Marquee Track */}
      <div className="group-marquee w-full overflow-hidden relative py-4 flex mask-image-gradient">
        {/* Left/Right fading edge indicators */}
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee-loop gap-6 pr-6">
          {loopedItems.map((t, idx) => (
            <div
              key={`${t.id}-${idx}`}
              onClick={() => setSelectedItem(t)}
              className="w-[340px] sm:w-[400px] shrink-0 cursor-pointer p-6 rounded-2xl border border-border/50 bg-card hover:border-primary/40 hover:shadow-lg hover:scale-101 transition-all duration-300 flex flex-col justify-between select-none relative group"
            >
              {/* Card quote indicator */}
              <Quote className="absolute right-6 top-6 h-8 w-8 text-primary/5 pointer-events-none transition-transform group-hover:scale-110" />
              
              <div className="space-y-4">
                {/* Stars and project tag */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-3.5 w-3.5 ${
                          i < t.rating 
                            ? "fill-amber-400 text-amber-400" 
                            : "text-muted/30"
                        }`} 
                      />
                    ))}
                  </div>
                  {t.projectType && (
                    <span className="text-[9px] font-bold uppercase tracking-wider bg-primary/10 border border-primary/20 text-primary px-2.5 py-0.5 rounded-full">
                      {t.projectType}
                    </span>
                  )}
                </div>

                {/* Excerpt of review */}
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-4 italic">
                  "{t.feedback.replace(/<\/?[^>]+(>|$)/g, "")}"
                </p>
              </div>

              {/* Client Profile details */}
              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-border/30">
                <Avatar src={t.photo} name={t.clientName} size={36} className="border border-border/40" />
                <div className="min-w-0">
                  <h4 className="font-bold text-xs text-foreground truncate">{t.clientName}</h4>
                  <p className="text-[10px] text-muted-foreground truncate mt-0.5">
                    {t.jobTitle}{t.company ? `, ${t.company}` : ""}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Spotlight Case Modal Dialog overlay */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            {/* Modal backdrop click to close */}
            <div className="absolute inset-0" onClick={() => setSelectedItem(null)} />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-xl bg-card border border-border/60 rounded-3xl shadow-2xl overflow-hidden z-10 p-6 sm:p-8"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 rounded-lg p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                aria-label="Close modal"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="absolute top-0 left-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl pointer-events-none" />

              <div className="space-y-6">
                {/* Header Rating & Project Tag */}
                <div className="flex items-center gap-4 flex-wrap pt-2">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4.5 w-4.5 ${
                          i < selectedItem.rating 
                            ? "fill-amber-400 text-amber-400" 
                            : "text-muted/30"
                        }`} 
                      />
                    ))}
                  </div>
                  {selectedItem.projectType && (
                    <span className="text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary">
                      Project: {selectedItem.projectType}
                    </span>
                  )}
                </div>

                {/* Testimonial Quote */}
                <div className="relative pt-4">
                  <Quote className="absolute -left-1.5 -top-2 h-10 w-10 text-primary/10 pointer-events-none" />
                  <p className="text-sm sm:text-base text-foreground font-medium leading-relaxed italic relative z-10 pl-6 pr-2">
                    {selectedItem.feedback.replace(/<\/?[^>]+(>|$)/g, "")}
                  </p>
                </div>

                {/* Client Profile details */}
                <div className="flex items-center gap-4 pt-6 border-t border-border/40">
                  <Avatar src={selectedItem.photo} name={selectedItem.clientName} size={48} className="border border-border/60" />
                  <div>
                    <h4 className="font-extrabold text-sm text-foreground">{selectedItem.clientName}</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {selectedItem.jobTitle}{selectedItem.company ? ` · ${selectedItem.company}` : ""}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
