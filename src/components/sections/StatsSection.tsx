'use client';

import React, { useRef } from "react";
import { useInView } from "framer-motion";
import { 
  Calendar, 
  CheckCircle, 
  Building, 
  Code2, 
  Users, 
  Flame, 
  Star,
  Award,
  LucideIcon 
} from "lucide-react";
import type { Statistic } from "@prisma/client";

const iconMap: Record<string, LucideIcon> = {
  Calendar,
  CheckCircle,
  Building,
  Code2,
  Users,
  Flame,
  Star,
  Award
};

interface Props {
  stats: Statistic[];
}

function AnimatedCounter({
  value,
  suffix,
  inView,
}: {
  value: string;
  suffix?: string | null;
  inView: boolean;
}) {
  const isFloat = value.includes(".");
  const numericValue = parseFloat(value) || 0;
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!inView) return;
    if (numericValue === 0) return;

    const duration = 1500;
    const steps = 60;
    const increment = numericValue / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= numericValue) {
        setCount(numericValue);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [inView, numericValue]);

  return (
    <span>
      {isFloat ? count.toFixed(1) : Math.floor(count)}
      {suffix || ""}
    </span>
  );
}

export function StatsSection({ stats }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  if (!stats.length) return null;

  // Duplicate items to ensure a seamless scrolling track
  const loopedStats = [...stats, ...stats, ...stats, ...stats];

  return (
    <section className="py-4 border-y border-border/25 bg-muted/10 overflow-hidden relative select-none" ref={ref}>
      
      {/* Styles for GPU-accelerated marquee scrolling and hover pause */}
      <style>{`
        @keyframes statsMarquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .animate-stats-marquee-loop {
          display: flex;
          width: max-content;
          animation: statsMarquee 25s linear infinite;
        }
        .group-stats-marquee:hover .animate-stats-marquee-loop {
          animation-play-state: paused;
        }
      `}</style>

      {/* Marquee Track Container */}
      <div className="group-stats-marquee w-full overflow-hidden relative flex">
        {/* Left/Right fading edge indicators */}
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background via-background/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background via-background/80 to-transparent z-10 pointer-events-none" />

        {/* Looping Content track */}
        <div className="animate-stats-marquee-loop gap-6 pr-6">
          {loopedStats.map((stat, idx) => {
            const Icon = (stat.icon ? iconMap[stat.icon] : null) ?? CheckCircle;
            
            return (
              <div
                key={`${stat.id}-${idx}`}
                className="flex items-center gap-3 px-5 py-2.5 rounded-xl border border-border/40 bg-card/65 backdrop-blur-sm shrink-0 min-w-[220px] transition-colors hover:border-primary/30"
              >
                {/* Mini glowing icon */}
                <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 text-primary flex items-center justify-center shrink-0">
                  <Icon className="h-4.5 w-4.5" />
                </div>

                {/* Staged vertical stats typography */}
                <div className="text-left leading-none min-w-0">
                  <span className="text-base sm:text-lg font-extrabold tracking-tight text-foreground font-mono">
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                      inView={inView}
                    />
                  </span>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground mt-0.5 truncate">
                    {stat.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}
