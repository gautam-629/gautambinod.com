"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-24 bg-primary relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
      </div>
      <div className="container relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Let's Build Something Amazing
          </h2>
          <p className="text-white/70 max-w-xl mx-auto mb-8 text-lg">
            Have a project in mind? I'm available for freelance work and exciting collaborations.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md bg-white text-primary px-8 py-3 text-sm font-semibold hover:bg-white/90 transition-colors"
            >
              <Mail className="h-4 w-4" />
              Get in Touch
            </Link>
            <Link
              href="/request"
              className="inline-flex items-center gap-2 rounded-md border border-white/30 text-white px-8 py-3 text-sm font-semibold hover:bg-white/10 transition-colors"
            >
              Start a Project <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
