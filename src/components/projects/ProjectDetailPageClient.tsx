'use client';

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowLeft, Clock, Play, ExternalLink, Github, CheckCircle } from "lucide-react";
import { toStringArray } from "@/types";
import type { Prisma } from "@prisma/client";

type ProjectWithCategory = Prisma.ProjectGetPayload<{
  include: { category: true };
}>;

interface Props {
  project: ProjectWithCategory;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1]
    }
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.97 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1]
    }
  },
};

export function ProjectDetailPageClient({ project }: Props) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const technologies = toStringArray(project.technologies);
  const features = toStringArray(project.features);
  const challenges = toStringArray(project.challenges);
  const solutions = toStringArray(project.solutions);

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-50"
        style={{ scaleX }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="container py-16 max-w-4xl mx-auto px-4 select-none"
      >
        {/* Back Link */}
        <motion.div variants={itemVariants}>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            <span>Back to Projects</span>
          </Link>
        </motion.div>

        {/* Hero Banner */}
        {project.thumbnail && (
          <motion.div
            variants={imageVariants}
            className="relative h-72 sm:h-96 rounded-[24px] overflow-hidden mb-10 border border-border/30 shadow-lg shadow-black/5"
          >
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 896px) 100vw, 896px"
            />
          </motion.div>
        )}

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-12 border-b border-border/10 pb-8">
          <div className="space-y-3">
            <motion.div variants={itemVariants} className="flex items-center gap-3 text-xs font-semibold">
              <span className="text-primary uppercase tracking-wider">{project.category.name}</span>
              <span className="text-muted-foreground/50">•</span>
              {project.status === "ACTIVE" ? (
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Active
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                  Completed
                </span>
              )}
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground leading-tight"
            >
              {project.title}
            </motion.h1>

            {project.shortDescription && (
              <motion.p
                variants={itemVariants}
                className="text-base text-muted-foreground leading-relaxed"
              >
                {project.shortDescription}
              </motion.p>
            )}
          </div>

          {/* Action Links */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-2.5 shrink-0 mt-2 md:mt-0">
            {project.demoVideo && (
              <a
                href={project.demoVideo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-border/55 bg-card px-4 py-2.5 text-xs font-bold text-foreground hover:bg-accent transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Play className="h-3.5 w-3.5" /> Watch Demo
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-sm shadow-primary/5"
              >
                <ExternalLink className="h-3.5 w-3.5" /> Live Demo
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-border/55 bg-card px-4 py-2.5 text-xs font-bold text-foreground hover:bg-accent transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Github className="h-3.5 w-3.5" /> Source Code
              </a>
            )}
          </motion.div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Details */}
          <div className="lg:col-span-2 space-y-10">
            {/* Overview */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h2 className="text-xl font-bold tracking-tight text-foreground">Overview</h2>
              <div
                className="prose prose-neutral dark:prose-invert max-w-none text-sm text-muted-foreground leading-relaxed prose-headings:font-bold"
                dangerouslySetInnerHTML={{ __html: project.description }}
              />
            </motion.div>

            {/* Key Features */}
            {features.length > 0 && (
              <motion.div variants={itemVariants} className="space-y-4">
                <h2 className="text-xl font-bold tracking-tight text-foreground">Key Features</h2>
                <ul className="space-y-3">
                  {features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed">
                      <CheckCircle className="h-4.5 w-4.5 text-primary mt-0.5 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Challenges & Solutions */}
            {(challenges.length > 0 || solutions.length > 0) && (
              <motion.div variants={itemVariants} className="space-y-4">
                <h2 className="text-xl font-bold tracking-tight text-foreground">Challenges & Solutions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {challenges.length > 0 && (
                    <div className="p-5 rounded-[18px] border border-destructive/10 bg-destructive/5 space-y-3">
                      <h3 className="font-extrabold text-sm text-destructive uppercase tracking-wide">Challenges</h3>
                      <ul className="space-y-2">
                        {challenges.map((c, i) => (
                          <li key={i} className="text-xs text-muted-foreground flex items-start gap-2 leading-relaxed">
                            <span className="text-destructive mt-0.5 font-bold">•</span>
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {solutions.length > 0 && (
                    <div className="p-5 rounded-[18px] border border-primary/10 bg-primary/5 space-y-3">
                      <h3 className="font-extrabold text-sm text-primary uppercase tracking-wide">Solutions</h3>
                      <ul className="space-y-2">
                        {solutions.map((s, i) => (
                          <li key={i} className="text-xs text-muted-foreground flex items-start gap-2 leading-relaxed">
                            <span className="text-primary mt-0.5 font-bold">•</span>
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tech Stack Widget */}
            {technologies.length > 0 && (
              <motion.div
                variants={itemVariants}
                className="p-6 rounded-[22px] border border-border/50 bg-card/65 backdrop-blur-sm relative overflow-hidden group hover:border-primary/20 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <h3 className="font-bold text-sm text-foreground mb-4 tracking-tight">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] font-semibold bg-primary/10 text-primary border border-primary/5 px-2.5 py-1 rounded-lg"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Project Info Widget */}
            {project.clientName && (
              <motion.div
                variants={itemVariants}
                className="p-6 rounded-[22px] border border-border/50 bg-card/65 backdrop-blur-sm relative overflow-hidden group hover:border-primary/20 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <h3 className="font-bold text-sm text-foreground mb-4 tracking-tight">Project Info</h3>
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between items-center py-1.5 border-b border-border/20">
                    <span className="text-muted-foreground">Client</span>
                    <span className="font-bold text-foreground">{project.clientName}</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* CTA Box */}
            <motion.div
              variants={itemVariants}
              className="p-6 rounded-[22px] bg-gradient-to-br from-primary/5 to-indigo-500/5 border border-primary/20 hover:shadow-xl transition-all duration-300"
            >
              <h3 className="font-extrabold text-sm text-foreground mb-2">Interested in similar systems?</h3>
              <p className="text-xs text-muted-foreground mb-5 leading-relaxed">
                Let&apos;s discuss your engineering and system design requirements.
              </p>
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-sm shadow-primary/5"
              >
                Get in Touch
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
