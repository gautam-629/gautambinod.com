'use client';

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useSpring, AnimatePresence, useTransform } from "framer-motion";
import {
  ArrowUp,
  Home,
  BarChart3,
  Briefcase,
  Package,
  Cpu,
  MessageSquareQuote,
  BookOpen,
  Mail
} from "lucide-react";

interface Props {
  hero: React.ReactNode;
  stats: React.ReactNode;
  projects: React.ReactNode;
  products: React.ReactNode;
  services: React.ReactNode;
  testimonials: React.ReactNode;
  blogs: React.ReactNode;
  cta: React.ReactNode;
}

interface SectionItem {
  id: string;
  label: string;
  icon: React.ElementType;
}

const SECTIONS: SectionItem[] = [
  { id: "hero", label: "Home", icon: Home },
  { id: "stats", label: "Stats", icon: BarChart3 },
  { id: "products", label: "Products", icon: Package },
  { id: "projects", label: "Projects", icon: Briefcase },
  { id: "services", label: "Services", icon: Cpu },
  { id: "testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { id: "blogs", label: "Blog", icon: BookOpen },
  { id: "cta", label: "Contact", icon: Mail }
];

export function InteractiveHomepageLayout({
  hero,
  stats,
  projects,
  products,
  services,
  testimonials,
  blogs,
  cta
}: Props) {
  const [activeSection, setActiveSection] = useState("hero");
  const [showScrollTop, setShowScrollTop] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Scroll parallax mapping for background circuit network
  const bgY1 = useTransform(scrollYProgress, [0, 1], ["0vh", "-12vh"]);
  const bgY2 = useTransform(scrollYProgress, [0, 1], ["0vh", "12vh"]);
  const bgY3 = useTransform(scrollYProgress, [0, 1], ["0vh", "-6vh"]);

  // Track scroll position to show scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer to update active section in sidebar
  useEffect(() => {
    const observers = SECTIONS.map(section => {
      const el = document.getElementById(section.id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
              setActiveSection(section.id);
            }
          });
        },
        {
          rootMargin: "-20% 0px -40% 0px", // Focus in the middle area of viewport
          threshold: [0.1, 0.3, 0.5]
        }
      );

      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach(obs => {
        if (obs) {
          obs.observer.unobserve(obs.el);
        }
      });
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const sectionNodes: Record<string, React.ReactNode> = {
    hero,
    stats,
    projects,
    products,
    services,
    testimonials,
    blogs,
    cta
  };

  return (
    <div className="relative">
      {/* Top Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-purple-500 to-indigo-500 origin-[0%] z-50 shadow-sm"
        style={{ scaleX }}
      />

      {/* High-Tech Circuit Board & Architecture Node Network Backdrop */}
      <div className="fixed inset-0 pointer-events-none -z-20 overflow-hidden bg-background">
        


        {/* Parallax Layer 1: Left Circuit Line & System Nodes */}
        <motion.div style={{ y: bgY1 }} className="absolute inset-y-0 left-0 w-80 opacity-20 dark:opacity-[0.15]">
          {/* Node 1: SYSTEM INITIALIZER */}
          <div className="absolute top-[18%] left-8 flex flex-col gap-1 font-mono text-[9px] text-foreground tracking-widest select-none">
            <span className="text-primary font-bold animate-pulse">[SYS_INIT_01]</span>
            <span className="text-muted-foreground/60">PORT: 8080 // OK</span>
          </div>
          {/* Node 2: DATA INGEST PIPELINE */}
          <div className="absolute top-[52%] left-12 flex flex-col gap-1 font-mono text-[9px] text-foreground tracking-widest select-none">
            <span className="text-indigo-500 font-bold">[INGEST_PIPELINE]</span>
            <span className="text-muted-foreground/60">RATE: 100K/s // RUN</span>
          </div>
          {/* SVG Connection Paths */}
          <svg className="w-full h-full text-foreground/15 dark:text-foreground/10" fill="none" stroke="currentColor" strokeWidth="1.2">
            {/* Left border line with branch points */}
            <path d="M 24 0 L 24 150 L 50 176 L 50 400 L 20 430 L 20 700 L 40 720 L 40 1000" strokeDasharray="4 4" />
            <path d="M 50 250 L 90 290 L 90 350" />
            <path d="M 20 550 L -10 580" />
            
            {/* Dynamic data pulses flowing down the circuit lines */}
            <circle r="3" fill="var(--primary)" opacity="0.8">
              <animateMotion dur="12s" repeatCount="indefinite" path="M 24 0 L 24 150 L 50 176 L 50 400 L 20 430 L 20 700 L 40 720 L 40 1000" />
            </circle>
            <circle r="2.5" fill="var(--indigo-500)" opacity="0.6">
              <animateMotion dur="8s" begin="4s" repeatCount="indefinite" path="M 50 250 L 90 290 L 90 350" />
            </circle>
          </svg>
        </motion.div>

        {/* Parallax Layer 2: Right Circuit Line & Gateway Nodes */}
        <motion.div style={{ y: bgY2 }} className="absolute inset-y-0 right-0 w-80 opacity-20 dark:opacity-[0.15]">
          {/* Node 3: API GATEWAY */}
          <div className="absolute top-[32%] right-8 flex flex-col gap-1 font-mono text-[9px] text-foreground text-right tracking-widest select-none">
            <span className="text-emerald-500 font-bold">[API_GATEWAY]</span>
            <span className="text-muted-foreground/60">JWT: AUTH_ACTIVE</span>
          </div>
          {/* Node 4: DB STORAGE REPLICA */}
          <div className="absolute top-[75%] right-12 flex flex-col gap-1 font-mono text-[9px] text-foreground text-right tracking-widest select-none">
            <span className="text-amber-500 font-bold">[DB_REPLICA_02]</span>
            <span className="text-muted-foreground/60">STATUS: SYNCED</span>
          </div>
          {/* SVG Connection Paths */}
          <svg className="w-full h-full text-foreground/15 dark:text-foreground/10" fill="none" stroke="currentColor" strokeWidth="1.2">
            {/* Right border line with branch points */}
            <path d="M 296 0 L 296 280 L 270 306 L 270 500 L 300 530 L 300 800 L 280 820 L 280 1000" strokeDasharray="4 4" />
            <path d="M 270 410 L 230 450 L 230 510" />
            <path d="M 300 680 L 330 710" />
            
            {/* Dynamic data pulses flowing down the circuit lines */}
            <circle r="3" fill="var(--emerald-500)" opacity="0.8">
              <animateMotion dur="10s" repeatCount="indefinite" path="M 296 0 L 296 280 L 270 306 L 270 500 L 300 530 L 300 800 L 280 820 L 280 1000" />
            </circle>
            <circle r="2.5" fill="var(--amber-500)" opacity="0.6">
              <animateMotion dur="9s" begin="2s" repeatCount="indefinite" path="M 270 410 L 230 450 L 230 510" />
            </circle>
          </svg>
        </motion.div>

        {/* Parallax Layer 3: Central Grid Backdrop */}
        <motion.div 
          className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03] pointer-events-none"
          style={{
            y: bgY3,
            backgroundImage: `
              radial-gradient(circle, currentColor 1px, transparent 1px)
            `,
            backgroundSize: '32px 32px',
            WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 95%)',
            maskImage: 'radial-gradient(circle at center, black 40%, transparent 95%)'
          }}
        />

      </div>

      {/* Floating Sidebar Navigator (Desktop only) */}
      <nav className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-2.5 p-2.5 rounded-full border border-border/50 bg-background/50 backdrop-blur-md shadow-lg shadow-black/5">
        {SECTIONS.map((section) => {
          const Icon = section.icon;
          const isActive = activeSection === section.id;

          return (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className="group relative p-2 rounded-full transition-colors focus-visible:outline-none"
              aria-label={`Scroll to ${section.label}`}
            >
              {/* Highlight Background */}
              {isActive && (
                <motion.div
                  layoutId="activeNavBackground"
                  className="absolute inset-0 bg-primary/10 dark:bg-primary/20 rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}

              {/* Icon */}
              <Icon
                className={`relative h-4.5 w-4.5 transition-colors z-10 ${isActive
                  ? "text-primary scale-110"
                  : "text-muted-foreground group-hover:text-foreground"
                  }`}
              />

              {/* Tooltip */}
              <span className="absolute right-12 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded bg-popover text-popover-foreground text-xs font-medium border border-border shadow-md opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all pointer-events-none origin-right whitespace-nowrap">
                {section.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Render Sections with smooth fade-in slide-up triggers */}
      <main className="w-full">
        {SECTIONS.map((section) => {
          const isHero = section.id === "hero";

          return (
            <div
              key={section.id}
              id={section.id}
              className={`scroll-mt-20 ${isHero ? "" : "border-t border-border/10"
                }`}
            >
              <motion.div
                initial={isHero ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
                whileInView={isHero ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} // easeOutExpo
              >
                {sectionNodes[section.id]}
              </motion.div>
            </div>
          );
        })}
      </main>

      {/* Scroll to Top Floating Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 lg:right-8 z-40 p-3 rounded-full bg-primary text-primary-foreground shadow-xl hover:bg-primary/90 transition-colors focus-visible:outline-none"
            aria-label="Scroll to top"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
