'use client';

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, BookOpen, ArrowUpRight, Github, ExternalLink } from "lucide-react";
import { toStringArray, type ProjectWithCategory } from "@/types";

interface Props {
  projects: ProjectWithCategory[];
}

export function FeaturedProjects({ projects }: Props) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left/prev, 1 for right/next

  if (!projects.length) return null;

  const handleNext = () => {
    setDirection(1);
    setActiveIdx((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveIdx((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const activeProject = projects[activeIdx];
  const technologies = toStringArray(activeProject.technologies);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 120 : -120,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -120 : 120,
      opacity: 0
    })
  };

  return (
    <section className="py-24 overflow-hidden relative border-b border-border/10 bg-muted/5">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
          <div>
            <p className="text-primary text-sm font-semibold tracking-wider uppercase mb-2">Portfolio</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
              Featured Projects
            </h2>
            <div className="w-12 h-1 bg-primary mt-4 rounded-full" />
            <p className="text-muted-foreground mt-4 max-w-xl text-sm leading-relaxed">
              Explore key engineering systems, real-time products, and open-source applications.
            </p>
          </div>
          <Link 
            href="/projects" 
            className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary/80 group"
          >
            View All Projects 
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Showcase Slider Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch min-h-[460px]">
          
          {/* Left Column: Visual Mockup Showcase */}
          <div className="lg:col-span-6 relative rounded-[32px] border border-border/40 overflow-hidden bg-card shadow-lg shadow-black/5 min-h-[280px] sm:min-h-[380px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeProject.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 z-0 h-full w-full"
              >
                {activeProject.thumbnail ? (
                  <Image 
                    src={activeProject.thumbnail} 
                    alt={activeProject.title} 
                    fill 
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-indigo-500/5 flex items-center justify-center">
                    <BookOpen className="h-16 w-16 text-primary/25 animate-pulse" />
                  </div>
                )}
                {/* Visual border glow shadow */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />
              </motion.div>
            </AnimatePresence>

            {/* Float category & status badges */}
            <div className="absolute top-4 left-4 z-10 flex gap-2">
              <span
                className={`text-[9px] uppercase tracking-wider px-3 py-1.5 rounded-lg backdrop-blur-md border font-extrabold shadow-sm ${
                  activeProject.status === "ACTIVE"
                    ? "bg-green-500/10 border-green-500/35 text-green-400"
                    : activeProject.status === "COMPLETED"
                    ? "bg-blue-500/10 border-blue-500/35 text-blue-400"
                    : "bg-muted/10 border-border/20 text-muted-foreground"
                }`}
              >
                {activeProject.status}
              </span>
            </div>
          </div>

          {/* Right Column: Dynamic Project Content details */}
          <div className="lg:col-span-6 flex flex-col justify-between py-2.5">
            
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeProject.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6"
              >
                {/* Counter index & category */}
                <div className="flex items-center gap-3.5 text-xs font-mono">
                  <span className="font-bold text-primary">{`0${activeIdx + 1}`}</span>
                  <span className="text-muted-foreground">/</span>
                  <span className="text-muted-foreground font-semibold uppercase tracking-wider text-[10px]">
                    {activeProject.category.name}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight leading-tight">
                  {activeProject.title}
                </h3>

                {activeProject.shortDescription && (
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {activeProject.shortDescription}
                  </p>
                )}

                {/* Tech Badges */}
                {technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {technologies.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="text-[9px] font-bold uppercase tracking-wider bg-muted/65 border border-border/30 px-2.5 py-1 rounded-md text-muted-foreground font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                {/* Actions Block */}
                <div className="flex items-center gap-4 pt-6 border-t border-border/20 mt-6">
                  <Link
                    href={`/projects/${activeProject.slug}`}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold bg-primary text-primary-foreground rounded-xl hover:bg-primary/95 transition-all hover:scale-102 shadow-md shadow-primary/10 group/btn"
                  >
                    Case Details 
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </Link>

                  {/* Source Code Link */}
                  {activeProject.githubUrl && (
                    <a
                      href={activeProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl border border-border bg-card hover:bg-accent text-foreground transition-all"
                      aria-label="View Source Code"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  )}

                  {/* Live Demo Link */}
                  {activeProject.liveUrl && (
                    <a
                      href={activeProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl border border-border bg-card hover:bg-accent text-foreground transition-all"
                      aria-label="View Live Demo"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Pagination Sliders at bottom */}
            <div className="flex items-center gap-4 mt-8 pt-6 border-t border-border/10">
              <button
                onClick={handlePrev}
                className="p-3 rounded-full border border-border bg-card hover:bg-accent text-foreground hover:scale-105 active:scale-98 transition-all shadow-md focus-visible:outline-none"
                aria-label="Previous project"
              >
                <ArrowLeft className="h-4.5 w-4.5" />
              </button>
              
              <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-muted-foreground">
                <span className="text-primary font-bold">{activeIdx + 1}</span>
                <span>/</span>
                <span>{projects.length}</span>
              </div>

              <button
                onClick={handleNext}
                className="p-3 rounded-full border border-border bg-card hover:bg-accent text-foreground hover:scale-105 active:scale-98 transition-all shadow-md focus-visible:outline-none"
                aria-label="Next project"
              >
                <ArrowRight className="h-4.5 w-4.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
