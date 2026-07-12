'use client';

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Clock, Calendar, BookOpen } from "lucide-react";
import { formatFullDate } from "@/utils/format";
import type { Blog, BlogCategory } from "@prisma/client";

interface BlogWithCategory extends Blog {
  category: BlogCategory;
}

interface Props {
  blogs: BlogWithCategory[];
}

export function LatestBlogs({ blogs }: Props) {
  const [slideIdx, setSlideIdx] = useState(0);

  if (!blogs.length) return null;

  const maxSlides = Math.max(0, blogs.length - 2); // Show 2 cards at a time on desktop

  const handleNext = () => {
    setSlideIdx((prev) => Math.min(prev + 1, blogs.length - 1));
  };

  const handlePrev = () => {
    setSlideIdx((prev) => Math.max(prev - 1, 0));
  };

  return (
    <section className="py-24 overflow-hidden relative">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Descriptions and Sliding Toggles */}
          <div className="lg:col-span-4 flex flex-col justify-between self-stretch py-4">
            <div className="space-y-4">
              <p className="text-primary text-sm font-semibold tracking-wider uppercase mb-2">Writing</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                Latest Articles
              </h2>
              <div className="w-12 h-1 bg-primary rounded-full mt-2" />
              <p className="text-muted-foreground mt-4 text-sm leading-relaxed max-w-md">
                Guides, tutorials, and thoughts on development, database performance tuning, real-time WebSockets, and system architectures.
              </p>
            </div>

            {/* Slider Navigation Controls */}
            <div className="flex flex-col gap-6 mt-8 lg:mt-auto">
              <div className="flex items-center gap-4">
                <button
                  onClick={handlePrev}
                  disabled={slideIdx === 0}
                  className={`p-3 rounded-full border transition-all ${
                    slideIdx === 0 
                      ? "border-border/30 text-muted-foreground/30 cursor-not-allowed" 
                      : "border-border bg-card hover:bg-accent text-foreground hover:scale-105 active:scale-98 shadow-md"
                  }`}
                  aria-label="Previous articles"
                >
                  <ArrowLeft className="h-4.5 w-4.5" />
                </button>
                
                <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-muted-foreground">
                  <span className="text-primary font-bold">{slideIdx + 1}</span>
                  <span>/</span>
                  <span>{blogs.length}</span>
                </div>

                <button
                  onClick={handleNext}
                  disabled={slideIdx === blogs.length - 1}
                  className={`p-3 rounded-full border transition-all ${
                    slideIdx === blogs.length - 1 
                      ? "border-border/30 text-muted-foreground/30 cursor-not-allowed" 
                      : "border-border bg-card hover:bg-accent text-foreground hover:scale-105 active:scale-98 shadow-md"
                  }`}
                  aria-label="Next articles"
                >
                  <ArrowRight className="h-4.5 w-4.5" />
                </button>
              </div>

              <Link 
                href="/blog" 
                className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:text-primary/80 group mt-2"
              >
                Browse All Publications 
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right Column: Sliding Horizontal overflow view */}
          <div className="lg:col-span-8 relative py-4">
            
            {/* Horizontal Track container */}
            <div className="w-full overflow-hidden rounded-2xl">
              <motion.div
                animate={{ x: `-${slideIdx * 340}px` }}
                transition={{ type: "spring", stiffness: 220, damping: 26 }}
                className="flex gap-6 w-max"
              >
                {blogs.map((blog) => (
                  <div
                    key={blog.id}
                    className="w-[316px] sm:w-[340px] shrink-0 p-1.5"
                  >
                    <Link href={`/blog/${blog.slug}`} className="block group h-full select-none">
                      <div className="group rounded-[24px] border border-border/50 bg-card/65 backdrop-blur-sm overflow-hidden hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 h-full flex flex-col justify-between relative">
                        {/* Hover Glow Effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                        <div>
                          {/* Image Container with card-in-card overlap */}
                          <div className="relative h-44 m-3.5 rounded-2xl overflow-hidden border border-border/30 bg-muted">
                            {blog.featuredImage ? (
                              <Image 
                                src={blog.featuredImage} 
                                alt={blog.title} 
                                fill 
                                className="object-cover group-hover:scale-105 transition-transform duration-700" 
                                sizes="320px"
                              />
                            ) : (
                              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-indigo-500/5 flex items-center justify-center">
                                <BookOpen className="h-10 w-10 text-primary/30" />
                              </div>
                            )}
                            
                            {/* Category tag overlaid on bottom-left of image */}
                            <div className="absolute bottom-3 left-3">
                              <span className="text-[9px] uppercase tracking-wider font-extrabold px-2.5 py-1 rounded bg-black/60 backdrop-blur-md text-white border border-white/10 shadow-sm">
                                {blog.category ? blog.category.name : "Article"}
                              </span>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="px-6 pb-4 pt-1 space-y-2">
                            <h3 className="font-extrabold text-base leading-snug tracking-tight text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
                              {blog.title}
                            </h3>
                            {blog.excerpt && (
                              <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed font-normal">
                                {blog.excerpt}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Footer details */}
                        <div className="px-6 pb-6 pt-4 border-t border-border/20 flex items-center justify-between text-[11px] text-muted-foreground font-mono">
                          {blog.publishedAt && (
                            <span className="flex items-center gap-1.5 font-medium">
                              <Calendar className="h-3.5 w-3.5 text-muted-foreground/60" />
                              {formatFullDate(blog.publishedAt)}
                            </span>
                          )}
                          
                          <span className="flex items-center gap-1 text-primary font-bold text-xs group-hover:text-primary transition-colors duration-300">
                            Read <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </motion.div>
            </div>
            
          </div>

        </div>
      </div>
    </section>
  );
}
