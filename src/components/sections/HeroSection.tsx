"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, Twitter, Mail, ExternalLink, Code2, Terminal, Database, Sparkles, Globe, Cpu, Zap, Layers, GitBranch } from "lucide-react";
import type { HeroSection as HeroSectionType, SocialLink } from "@prisma/client";

interface Props {
  hero: HeroSectionType | null;
  socialLinks?: SocialLink[];
}

const iconMap: Record<string, React.ElementType> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  mail: Mail,
  email: Mail,
};

const socialBrandMap: Record<string, string> = {
  github: "hover:bg-slate-950 hover:text-white hover:border-slate-850",
  linkedin: "hover:bg-[#0077b5]/10 hover:text-[#0077b5] hover:border-[#0077b5]/30",
  twitter: "hover:bg-slate-950 hover:text-white hover:border-slate-850",
  mail: "hover:bg-rose-500/10 hover:text-rose-500 hover:border-rose-500/30",
  email: "hover:bg-rose-500/10 hover:text-rose-500 hover:border-rose-500/30",
};

const bgParticles = [
  { char: "{ }", top: "15%", left: "8%", size: "text-lg" },
  { char: "< />", top: "60%", left: "12%", size: "text-xl" },
  { char: "[ ]", top: "25%", left: "auto", right: "15%", size: "text-md" },
  { char: "const", top: "75%", left: "auto", right: "20%", size: "text-sm font-mono" },
  { char: "import", top: "45%", left: "45%", size: "text-xs font-mono" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.6, 
      ease: [0.16, 1, 0.3, 1] 
    } 
  },
};

export function HeroSection({ hero, socialLinks = [] }: Props) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX - window.innerWidth / 2) / 35,
        y: (e.clientY - window.innerHeight / 2) / 35,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!hero) {
    return (
      <section className="relative min-h-[90vh] flex items-center justify-center">
        <div className="container text-center max-w-lg px-4">
          <h1 className="text-4xl font-extrabold tracking-tight">Welcome to DevFolio</h1>
          <p className="mt-4 text-muted-foreground text-sm">
            Please set up your hero section in the admin panel.
          </p>
          <Link
            href="/admin/hero"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-xs font-bold text-primary-foreground hover:bg-primary/90 transition-all"
          >
            Set Up Hero Section <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-[95vh] flex items-center overflow-hidden py-16 sm:py-24 select-none">
      
      {/* Premium Background Grid & Ambient Blur Orbs */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        {/* Masked Grid (Parallax Shifted) */}
        <motion.div 
          animate={{ x: mousePos.x * -0.3, y: mousePos.y * -0.3 }}
          transition={{ type: "spring", stiffness: 60, damping: 20 }}
          className="absolute inset-0 opacity-[0.08] dark:opacity-[0.15]" 
          style={{
            backgroundImage: `
              linear-gradient(to right, currentColor 1px, transparent 1px),
              linear-gradient(to bottom, currentColor 1px, transparent 1px)
            `,
            backgroundSize: '56px 56px',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
            maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
          }}
        />
        {hero.backgroundImage ? (
          <Image
            src={hero.backgroundImage}
            alt="Background Texture"
            fill
            className="object-cover opacity-5 pointer-events-none"
            priority
          />
        ) : null}

        {/* Floating Developer Particles (Shift with mouse) */}
        {bgParticles.map((part, idx) => (
          <motion.div
            key={idx}
            style={{ 
              position: 'absolute', 
              top: part.top, 
              left: part.left, 
              right: part.right 
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.12, 0.28, 0.12],
              translateX: mousePos.x * (0.5 + idx * 0.15),
              translateY: mousePos.y * (0.5 + idx * 0.15),
            }}
            transition={{
              y: { duration: 8 + (idx * 2), repeat: Infinity, ease: "easeInOut" },
              opacity: { duration: 8 + (idx * 2), repeat: Infinity, ease: "easeInOut" },
              translateX: { type: "spring", stiffness: 60, damping: 20 },
              translateY: { type: "spring", stiffness: 60, damping: 20 }
            }}
            className={`pointer-events-none select-none font-bold text-foreground/50 dark:text-foreground/40 ${part.size}`}
          >
            {part.char}
          </motion.div>
        ))}
        
        {/* Shifting Ambient Glow Spots (Move with mouse in parallax) */}
        <motion.div 
          animate={{ 
            x: [0, 40, -20, 0], 
            y: [0, -40, 20, 0],
            translateX: mousePos.x * 0.8,
            translateY: mousePos.y * 0.8
          }}
          transition={{ 
            x: { duration: 25, repeat: Infinity, ease: "easeInOut" },
            y: { duration: 25, repeat: Infinity, ease: "easeInOut" },
            translateX: { type: "spring", stiffness: 50, damping: 25 },
            translateY: { type: "spring", stiffness: 50, damping: 25 }
          }}
          className="absolute top-1/4 left-[10%] w-80 h-80 bg-primary/20 dark:bg-primary/15 rounded-full blur-[100px]" 
        />
        <motion.div 
          animate={{ 
            x: [0, -50, 30, 0], 
            y: [0, 50, -30, 0],
            translateX: mousePos.x * -0.6,
            translateY: mousePos.y * -0.6
          }}
          transition={{ 
            x: { duration: 30, repeat: Infinity, ease: "easeInOut" },
            y: { duration: 30, repeat: Infinity, ease: "easeInOut" },
            translateX: { type: "spring", stiffness: 50, damping: 25 },
            translateY: { type: "spring", stiffness: 50, damping: 25 }
          }}
          className="absolute bottom-1/4 right-[10%] w-96 h-96 bg-indigo-500/20 dark:bg-indigo-500/15 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            x: [0, 20, -20, 0], 
            y: [0, 20, 30, 0],
            translateX: mousePos.x * 0.4,
            translateY: mousePos.y * 0.4
          }}
          transition={{ 
            x: { duration: 22, repeat: Infinity, ease: "easeInOut" },
            y: { duration: 22, repeat: Infinity, ease: "easeInOut" },
            translateX: { type: "spring", stiffness: 50, damping: 25 },
            translateY: { type: "spring", stiffness: 50, damping: 25 }
          }}
          className="absolute top-1/3 right-1/3 w-72 h-72 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-[90px]" 
        />
      </div>

      <div className="container px-4 sm:px-6 mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Block: Heading and CTA buttons */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="lg:col-span-7 space-y-6 text-left"
          >
            {/* Greeting Badge */}
            {hero.greeting && (
              <motion.div 
                variants={itemVariants}
                className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-primary"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span>{hero.greeting}</span>
              </motion.div>
            )}

            {/* Giant Modern Header */}
            <motion.h1 
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-black tracking-tight leading-[1.05]"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/90 to-muted-foreground">
                {hero.title}
              </span>
              {hero.highlightedText && (
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-primary via-indigo-500 to-emerald-400 mt-2">
                  {hero.highlightedText}
                </span>
              )}
            </motion.h1>

            {/* Specialized Skill Anchors */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-2 pt-1"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
                <Sparkles className="w-3.5 h-3.5" />
                Frontend Web
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                <Terminal className="w-3.5 h-3.5" />
                Backend Systems
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#2496ed]/10 border border-[#2496ed]/20 text-[11px] font-semibold text-[#2496ed]">
                <Layers className="w-3.5 h-3.5" />
                DevOps & Cloud
              </span>
            </motion.div>

            {/* Subtitle / Excerpt */}
            {(hero.subtitle || hero.description) && (
              <motion.div variants={itemVariants} className="space-y-3 max-w-xl">
                {hero.subtitle && (
                  <p className="text-lg sm:text-xl font-semibold text-muted-foreground">
                    {hero.subtitle === "Building scalable, production-ready applications across frontend and backend systems." 
                      ? "Building scalable frontend interfaces and robust backend architectures." 
                      : hero.subtitle}
                  </p>
                )}
                {hero.description && (
                  <p className="text-sm sm:text-base text-muted-foreground/80 leading-relaxed">
                    {hero.description === "2.5+ years of experience with React.js, Next.js, TypeScript, NestJS, and Express.js. Hands-on with real-time systems, API architecture, database optimization, and AWS cloud deployment."
                      ? "2.5+ years of experience with React.js, Next.js, TypeScript, NestJS, Express.js, and Sockets. Experienced in database optimization, containerization (Docker), and AWS cloud SRE."
                      : hero.description}
                  </p>
                )}
              </motion.div>
            )}

            {/* Action CTAs */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap gap-4 items-center pt-2"
            >
              {hero.primaryCTAText && hero.primaryCTAUrl && (
                <Link
                  href={hero.primaryCTAUrl}
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-xs font-bold text-primary-foreground hover:bg-primary/90 transition-all hover:scale-[1.03] active:scale-[0.97] shadow-lg shadow-primary/10 hover:shadow-primary/20"
                >
                  <span>{hero.primaryCTAText}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}
              
              {hero.secondaryCTAText && hero.secondaryCTAUrl && (
                <Link
                  href={hero.secondaryCTAUrl}
                  className="inline-flex items-center gap-2 rounded-xl border border-border/55 bg-card/40 backdrop-blur-sm px-6 py-3.5 text-xs font-bold text-foreground hover:bg-accent transition-all hover:scale-[1.03] active:scale-[0.97]"
                >
                  <span>{hero.secondaryCTAText}</span>
                </Link>
              )}
              
              {hero.resumeUrl && (
                <a
                  href={hero.resumeUrl}
                  download
                  className="inline-flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-foreground transition-all hover:translate-y-[-1px] ml-1"
                >
                  <Download className="h-4 w-4" />
                  <span>Download CV</span>
                </a>
              )}
            </motion.div>

            {/* Dynamic Social Links */}
            {socialLinks.length > 0 && (
              <motion.div 
                variants={itemVariants}
                className="flex items-center gap-3 pt-6 border-t border-border/10 max-w-sm"
              >
                {socialLinks.map((link) => {
                  const platform = link.platform.toLowerCase();
                  const Icon =
                    iconMap[platform] ||
                    (link.icon
                      ? iconMap[link.icon.toLowerCase()] || ExternalLink
                      : ExternalLink);
                  const brandClass = socialBrandMap[platform] || "hover:bg-primary/10 hover:text-primary hover:border-primary/30";
                  return (
                    <motion.a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.platform}
                      whileHover={{ scale: 1.15, y: -2 }}
                      className={`w-9 h-9 rounded-xl bg-muted/30 border border-border/20 flex items-center justify-center text-muted-foreground transition-all duration-300 shadow-sm ${brandClass}`}
                    >
                      <Icon className="h-4 w-4" />
                    </motion.a>
                  );
                })}
              </motion.div>
            )}
          </motion.div>

          {/* Right Block: Animated Constellation Profile Composition */}
          {hero.profileImage && (
            <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-80 h-80 sm:w-96 sm:h-96 md:w-[420px] md:h-[420px] flex items-center justify-center animate-fade-in"
              >
                {/* SVG Constellation Lines (Backdrop connecting 6 nodes) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40 dark:opacity-30" xmlns="http://www.w3.org/2000/svg">
                  <line x1="50%" y1="50%" x2="15%" y2="15%" stroke="currentColor" className="text-primary/20" strokeWidth="1.2" strokeDasharray="4 4" />
                  <line x1="50%" y1="50%" x2="85%" y2="15%" stroke="currentColor" className="text-primary/20" strokeWidth="1.2" strokeDasharray="4 4" />
                  <line x1="50%" y1="50%" x2="5%" y2="50%" stroke="currentColor" className="text-primary/20" strokeWidth="1.2" strokeDasharray="4 4" />
                  <line x1="50%" y1="50%" x2="95%" y2="50%" stroke="currentColor" className="text-primary/20" strokeWidth="1.2" strokeDasharray="4 4" />
                  <line x1="50%" y1="50%" x2="15%" y2="85%" stroke="currentColor" className="text-primary/20" strokeWidth="1.2" strokeDasharray="4 4" />
                  <line x1="50%" y1="50%" x2="85%" y2="85%" stroke="currentColor" className="text-primary/20" strokeWidth="1.2" strokeDasharray="4 4" />
                </svg>

                {/* Glowing Ambient Halo behind core */}
                <div className="absolute w-60 h-60 sm:w-68 sm:h-68 rounded-full bg-gradient-to-tr from-primary/10 via-indigo-500/10 to-emerald-500/5 blur-2xl opacity-60 pointer-events-none animate-pulse" />

                {/* Profile Core Image Container */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="relative w-52 h-52 sm:w-60 sm:h-60 rounded-full p-1.5 bg-gradient-to-tr from-primary/30 via-indigo-500/25 to-emerald-500/20 shadow-2xl border border-border/40 flex items-center justify-center select-none z-10"
                >
                  <div className="relative w-full h-full rounded-full overflow-hidden bg-background border border-background/50 shadow-inner">
                    <Image
                      src={hero.profileImage}
                      alt={`${hero.title} profile photo`}
                      fill
                      className="object-cover rounded-full hover:scale-105 transition-transform duration-700 ease-out"
                      priority
                      sizes="(max-width: 640px) 208px, 240px"
                    />
                  </div>
                </motion.div>

                {/* Node 1: React / Next.js (Top-Left) */}
                <motion.div
                  animate={{ y: [0, -6, 0], x: [0, 4, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute left-6 top-6 sm:left-8 sm:top-8 w-11 h-11 rounded-full bg-card/85 backdrop-blur-xl border border-border/50 shadow-lg flex items-center justify-center text-[#61dafb] hover:bg-[#61dafb]/10 hover:border-[#61dafb]/30 hover:scale-110 transition-all duration-300 cursor-pointer group/node z-20"
                >
                  <Code2 className="w-5 h-5 group-hover/node:rotate-[30deg] transition-transform duration-300" />
                  <span className="absolute bottom-[-22px] scale-0 group-hover/node:scale-100 px-1.5 py-0.5 rounded bg-popover border border-border text-[9px] font-bold text-popover-foreground pointer-events-none transition-all duration-200 uppercase tracking-wider whitespace-nowrap shadow-sm">React/Next</span>
                </motion.div>

                {/* Node 2: Node.js / NestJS (Top-Right) */}
                <motion.div
                  animate={{ y: [0, 5, 0], x: [0, -4, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute right-8 top-6 sm:right-12 sm:top-8 w-11 h-11 rounded-full bg-card/85 backdrop-blur-xl border border-border/50 shadow-lg flex items-center justify-center text-[#339933] hover:bg-[#339933]/10 hover:border-[#339933]/30 hover:scale-110 transition-all duration-300 cursor-pointer group/node z-20"
                >
                  <Terminal className="w-5 h-5 group-hover/node:scale-110 transition-transform duration-300" />
                  <span className="absolute bottom-[-22px] scale-0 group-hover/node:scale-100 px-1.5 py-0.5 rounded bg-popover border border-border text-[9px] font-bold text-popover-foreground pointer-events-none transition-all duration-200 uppercase tracking-wider whitespace-nowrap shadow-sm">Node/Nest</span>
                </motion.div>

                {/* Node 3: Docker & Containers (Mid-Left) */}
                <motion.div
                  animate={{ y: [0, 4, 0], x: [0, 5, 0] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                  className="absolute left-[-10px] sm:left-[-14px] top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-card/85 backdrop-blur-xl border border-border/50 shadow-lg flex items-center justify-center text-[#2496ed] hover:bg-[#2496ed]/10 hover:border-[#2496ed]/30 hover:scale-110 transition-all duration-300 cursor-pointer group/node z-20"
                >
                  <Layers className="w-5 h-5 group-hover/node:scale-110 transition-transform duration-300" />
                  <span className="absolute bottom-[-22px] scale-0 group-hover/node:scale-100 px-1.5 py-0.5 rounded bg-popover border border-border text-[9px] font-bold text-popover-foreground pointer-events-none transition-all duration-200 uppercase tracking-wider whitespace-nowrap shadow-sm">Docker/K8s</span>
                </motion.div>

                {/* Node 4: Real-time Sockets (Mid-Right) */}
                <motion.div
                  animate={{ y: [0, -4, 0], x: [0, -5, 0] }}
                  transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                  className="absolute right-[-10px] sm:right-[-14px] top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-card/85 backdrop-blur-xl border border-border/50 shadow-lg flex items-center justify-center text-yellow-500 hover:bg-yellow-500/10 hover:border-yellow-500/30 hover:scale-110 transition-all duration-300 cursor-pointer group/node z-20"
                >
                  <Zap className="w-5 h-5 group-hover/node:scale-110 transition-transform duration-300" />
                  <span className="absolute bottom-[-22px] scale-0 group-hover/node:scale-100 px-1.5 py-0.5 rounded bg-popover border border-border text-[9px] font-bold text-popover-foreground pointer-events-none transition-all duration-200 uppercase tracking-wider whitespace-nowrap shadow-sm">Sockets/RT</span>
                </motion.div>

                {/* Node 5: Databases (Bottom-Left) */}
                <motion.div
                  animate={{ y: [0, 6, 0], x: [0, 3, 0] }}
                  transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
                  className="absolute left-6 bottom-8 sm:left-8 sm:bottom-10 w-11 h-11 rounded-full bg-card/85 backdrop-blur-xl border border-border/50 shadow-lg flex items-center justify-center text-[#336791] hover:bg-[#336791]/10 hover:border-[#336791]/30 hover:scale-110 transition-all duration-300 cursor-pointer group/node z-20"
                >
                  <Database className="w-5 h-5 group-hover/node:translate-y-[-1px] transition-transform duration-300" />
                  <span className="absolute bottom-[-22px] scale-0 group-hover/node:scale-100 px-1.5 py-0.5 rounded bg-popover border border-border text-[9px] font-bold text-popover-foreground pointer-events-none transition-all duration-200 uppercase tracking-wider whitespace-nowrap shadow-sm">Postgres/SQL</span>
                </motion.div>

                {/* Node 6: CI/CD & Cloud (Bottom-Right) */}
                <motion.div
                  animate={{ y: [0, -5, 0], x: [0, -3, 0] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                  className="absolute right-8 bottom-10 sm:right-12 sm:bottom-12 w-11 h-11 rounded-full bg-card/85 backdrop-blur-xl border border-border/50 shadow-lg flex items-center justify-center text-[#f1502f] hover:bg-[#f1502f]/10 hover:border-[#f1502f]/30 hover:scale-110 transition-all duration-300 cursor-pointer group/node z-20"
                >
                  <GitBranch className="w-5 h-5 group-hover/node:rotate-[15deg] transition-transform duration-300" />
                  <span className="absolute bottom-[-22px] scale-0 group-hover/node:scale-100 px-1.5 py-0.5 rounded bg-popover border border-border text-[9px] font-bold text-popover-foreground pointer-events-none transition-all duration-200 uppercase tracking-wider whitespace-nowrap shadow-sm">CI-CD/AWS</span>
                </motion.div>

                {/* Floating Developer Status Panel (Bottom Centered base) */}
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                  className="absolute bottom-[-8px] left-1/2 -translate-x-1/2 bg-card/90 backdrop-blur-xl border border-border/50 px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2.5 z-20 select-none whitespace-nowrap"
                >
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <div className="leading-tight text-left">
                    <h4 className="text-[10px] font-extrabold text-foreground tracking-wide uppercase">Available Now</h4>
                    <p className="text-[8px] text-muted-foreground font-normal">Remote Projects</p>
                  </div>
                </motion.div>

                {/* Floating Experience Widget (Top-Right inside constellation) */}
                <motion.div
                  animate={{ y: [0, 4, 0] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                  className="absolute top-[-8px] right-1/4 translate-x-1/2 bg-card/90 backdrop-blur-xl border border-border/50 w-14 h-14 rounded-full shadow-xl flex flex-col items-center justify-center text-center leading-none z-20 select-none"
                >
                  <span className="text-sm font-black text-primary">5+</span>
                  <span className="text-[7px] uppercase tracking-wider font-extrabold text-muted-foreground mt-0.5">Years Exp</span>
                </motion.div>
              </motion.div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
