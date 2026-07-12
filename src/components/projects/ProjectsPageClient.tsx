'use client';

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Search, FolderOpen, ExternalLink, Code } from "lucide-react";
import { toStringArray } from "@/types";
import { ProjectQuickLinks } from "@/components/common/ProjectQuickLinks";

import type { ProjectWithCategory } from "@/types";
import type { ProjectCategory } from "@prisma/client";

interface Props {
  projects: ProjectWithCategory[];
  categories: ProjectCategory[];
}

export function ProjectsPageClient({ projects, categories }: Props) {
  const [selectedCat, setSelectedCat] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter projects by category and keyword search
  const filteredProjects = projects.filter((project) => {
    const matchesCategory = selectedCat === "all" || project.category.slug === selectedCat;
    
    const technologies = toStringArray(project.technologies);
    const searchTarget = `${project.title} ${project.shortDescription || ""} ${technologies.join(" ")}`.toLowerCase();
    const matchesSearch = searchTarget.includes(searchQuery.toLowerCase().trim());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container py-16 max-w-6xl mx-auto px-4 select-none">
      
      {/* Title & Header Section */}
      <div className="max-w-2xl mb-12 space-y-3">
        <span className="text-primary text-xs font-semibold uppercase tracking-wider">Portfolio Showcase</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          My Engineering Projects
        </h1>
        <div className="w-12 h-1 bg-primary rounded-full mt-2" />
        <p className="text-muted-foreground text-sm leading-relaxed">
          Explore complete production systems, web applications, and digital platforms I have designed and deployed.
        </p>
      </div>

      {/* Control Panel: Filters & Search bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCat("all")}
            className={`px-4 py-1.5 text-xs font-bold rounded-lg border transition-all duration-300 ${
              selectedCat === "all"
                ? "bg-primary border-primary text-primary-foreground shadow-md shadow-primary/5"
                : "bg-muted/10 border-border/40 text-muted-foreground hover:border-primary/20 hover:text-foreground"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCat(cat.slug)}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg border transition-all duration-300 ${
                selectedCat === cat.slug
                  ? "bg-primary border-primary text-primary-foreground shadow-md shadow-primary/5"
                  : "bg-muted/10 border-border/40 text-muted-foreground hover:border-primary/20 hover:text-foreground"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Dynamic Search Box */}
        <div className="relative w-full sm:w-64 shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs font-medium bg-card border border-border/50 rounded-xl focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/10 transition-all text-foreground"
          />
        </div>
      </div>

      {/* Grid Layout Container */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => {
            const technologies = toStringArray(project.technologies);

            return (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="h-full flex"
              >
                <div className="group rounded-[24px] border border-border/50 bg-card/65 backdrop-blur-sm overflow-hidden hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 w-full flex flex-col justify-between relative p-1.5">
                  {/* Outer Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div>
                    {/* Cover thumbnail with Card-in-card spacing margins */}
                    <div className="relative h-44 m-2 rounded-2xl overflow-hidden border border-border/30 bg-muted">
                      {project.thumbnail ? (
                        <Image
                          src={project.thumbnail}
                          alt={project.title}
                          fill
                          className="object-cover group-hover:scale-103 transition-transform duration-750 ease-out"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-indigo-500/5 flex items-center justify-center">
                          <FolderOpen className="h-10 w-10 text-primary/30" />
                        </div>
                      )}
                      
                      {/* Featured Overlay Badge */}
                      {project.featured && (
                        <div className="absolute top-3 left-3 z-10">
                          <span className="text-[9px] uppercase tracking-wider font-extrabold px-2.5 py-1 rounded bg-primary text-primary-foreground shadow-sm">
                            Featured
                          </span>
                        </div>
                      )}

                      {/* Project status badge overlay right */}
                      <div className="absolute top-3 right-3 z-10">
                        {project.status === "ACTIVE" ? (
                          <span className="text-[9px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-emerald-400 border border-emerald-500/30 flex items-center gap-1 shadow-sm">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            Active
                          </span>
                        ) : (
                          <span className="text-[9px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-blue-400 border border-blue-500/30 flex items-center gap-1 shadow-sm">
                            <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                            Completed
                          </span>
                        )}
                      </div>

                      {/* Overlay Category tag */}
                      <div className="absolute bottom-3 left-3 z-10">
                        <span className="text-[9px] uppercase tracking-wider font-extrabold px-2.5 py-1 rounded bg-black/60 backdrop-blur-md text-white border border-white/10 shadow-sm">
                          {project.category.name}
                        </span>
                      </div>
                    </div>

                    {/* Code Repos and Action link overlays */}
                    <div className="px-4.5 pt-2">
                      <ProjectQuickLinks liveUrl={project.liveUrl} githubUrl={project.githubUrl} />
                    </div>

                    {/* Metadata Content area */}
                    <div className="px-4.5 pb-3 pt-2.5 space-y-2">
                      <Link href={`/projects/${project.slug}`}>
                        <h3 className="font-extrabold text-base tracking-tight text-foreground group-hover:text-primary transition-colors duration-300 leading-snug">
                          {project.title}
                        </h3>
                      </Link>
                      
                      {project.shortDescription && (
                        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed font-normal">
                          {project.shortDescription}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Tech stack badges footer block */}
                  {technologies.length > 0 && (
                    <div className="px-4.5 pb-4 pt-3 border-t border-border/20 flex flex-wrap gap-1">
                      {technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="text-[9px] font-mono font-semibold bg-muted/65 border border-border/30 px-2 py-0.5 rounded-md text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20 text-muted-foreground text-sm font-medium flex flex-col items-center justify-center gap-2"
        >
          <FolderOpen className="h-8 w-8 text-muted-foreground/55" />
          <span>No matches found inside this category search.</span>
        </motion.div>
      )}

    </div>
  );
}
