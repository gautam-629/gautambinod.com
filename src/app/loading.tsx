"use client";

import { motion } from "framer-motion";
import { Layers } from "lucide-react";
import { useEffect, useState } from "react";

const loadingSteps = [
  "Connecting to DevFolio...",
  "Loading UI components...",
  "Fetching database resources...",
  "Compiling interactive elements...",
  "Optimizing performance layer...",
];

export default function Loading() {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % loadingSteps.length);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-[75vh] w-full items-center justify-center px-4 py-16 relative">
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center overflow-hidden">
        <div className="absolute w-[500px] h-[500px] rounded-full bg-primary/5 dark:bg-primary/10 blur-3xl opacity-60 animate-pulse duration-[8000ms]" />
        <div className="absolute w-[250px] h-[250px] rounded-full bg-primary/10 dark:bg-primary/20 blur-2xl opacity-40 animate-pulse duration-[4000ms]" />
      </div>

      {/* Grid Pattern Background */}
      <div 
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04] pointer-events-none -z-20 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:32px_32px]"
        style={{
          maskImage: "radial-gradient(circle at center, black 40%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(circle at center, black 40%, transparent 80%)",
        }}
      />

      <div className="relative flex flex-col items-center max-w-sm w-full text-center">
        {/* Animated Loader Circle */}
        <div className="relative w-28 h-28 mb-8 flex items-center justify-center">
          {/* Subtle Outer Pulse Ring */}
          <motion.div
            className="absolute inset-0 rounded-full border border-primary/10"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Dotted Outer Spinning Ring */}
          <motion.div
            className="absolute inset-2 rounded-full border-2 border-dotted border-primary/30 border-t-primary"
            animate={{ rotate: 360 }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Solid Middle Counter-Spinning Ring */}
          <motion.div
            className="absolute inset-4 rounded-full border border-primary/20 border-r-primary border-l-primary/40"
            animate={{ rotate: -360 }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Inner Fast Ring */}
          <motion.div
            className="absolute inset-6 rounded-full border-2 border-transparent border-t-primary"
            animate={{ rotate: 360 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Central Pulsing Icon Card */}
          <motion.div
            className="relative bg-background/50 dark:bg-background/80 p-3.5 rounded-2xl border border-primary/20 backdrop-blur-md shadow-[0_0_25px_rgba(var(--primary),0.15)] flex items-center justify-center"
            animate={{
              scale: [0.96, 1.04, 0.96],
            }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Layers className="h-6 w-6 text-primary animate-pulse" />
          </motion.div>
        </div>

        {/* Text Area */}
        <div className="space-y-4 w-full">
          <div className="space-y-1.5">
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-lg font-bold tracking-wider text-foreground uppercase text-xs"
            >
              Loading Experience
            </motion.h2>
            <div className="h-4 flex items-center justify-center">
              <motion.p
                key={stepIndex}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 0.7, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.25 }}
                className="text-xs text-muted-foreground font-mono tracking-tight"
              >
                {loadingSteps[stepIndex]}
              </motion.p>
            </div>
          </div>

          {/* Progress Bar with Glow */}
          <div className="relative w-44 h-1.5 bg-muted rounded-full overflow-hidden mx-auto border border-border/10 shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)]">
            <motion.div
              className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-primary/80 to-primary shadow-[0_0_8px_rgba(139,92,246,0.6)]"
              animate={{
                left: ["-40%", "100%"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                width: "40%",
                borderRadius: "inherit",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

