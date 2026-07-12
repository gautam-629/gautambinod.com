'use client';

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Search, BookOpen, AlertCircle, Calendar, ArrowRight } from "lucide-react";
import { formatFullDate } from "@/utils/format";
import type { Blog, BlogCategory } from "@prisma/client";

interface BlogWithCategory extends Blog {
  category: BlogCategory;
}

interface Props {
  initialBlogs: BlogWithCategory[];
  categories: BlogCategory[];
}

export function BlogListContainer({ initialBlogs, categories }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCatId, setSelectedCatId] = useState<string | null>(null);

  // Filter logic
  const filteredBlogs = initialBlogs.filter((blog) => {
    const matchesSearch = 
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (blog.excerpt && blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCatId === null || blog.categoryId === selectedCatId;

    return matchesSearch && matchesCategory;
  });

  const featured = filteredBlogs.find((b) => b.featured);
  const regularBlogs = featured 
    ? filteredBlogs.filter((b) => b.id !== featured.id) 
    : filteredBlogs;

  return (
    <div className="space-y-10">
      {/* Search & Category Filter Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-border/20">
        
        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 order-2 md:order-1">
          <button
            onClick={() => setSelectedCatId(null)}
            className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all ${
              selectedCatId === null
                ? "bg-primary border-primary text-primary-foreground shadow-md shadow-primary/10"
                : "bg-background/40 border-border hover:border-primary/50 text-muted-foreground hover:text-foreground"
            }`}
          >
            All Articles
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCatId(cat.id)}
              className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all ${
                selectedCatId === cat.id
                  ? "bg-primary border-primary text-primary-foreground shadow-md shadow-primary/10"
                  : "bg-background/40 border-border hover:border-primary/50 text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:max-w-xs order-1 md:order-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles..."
            className="w-full bg-muted/20 border border-border/50 rounded-xl pl-9 pr-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20 placeholder:text-muted-foreground/60 transition-all text-foreground"
          />
        </div>

      </div>

      {/* Articles Listing Stage */}
      <div className="space-y-12">
        <AnimatePresence mode="popLayout">
          {/* Featured Post (Only shown if filtering is "All" or if it is the only match) */}
          {featured && searchQuery === "" && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
            >
              <Link href={`/blog/${featured.slug}`} className="block group">
                <div className="group rounded-3xl border border-border/50 bg-card overflow-hidden hover:border-primary/30 hover:shadow-2xl transition-all duration-500">
                  <div className="grid grid-cols-1 lg:grid-cols-12">
                    
                    {/* Cover Photo */}
                    <div className="relative h-64 lg:h-auto lg:col-span-7 bg-muted overflow-hidden">
                      {featured.featuredImage ? (
                        <Image 
                          src={featured.featuredImage} 
                          alt={featured.title} 
                          fill 
                          className="object-cover group-hover:scale-102 transition-transform duration-500" 
                          sizes="(max-width: 1024px) 100vw, 60vw"
                          priority
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-indigo-500/5 flex items-center justify-center">
                          <BookOpen className="h-16 w-16 text-primary/35" />
                        </div>
                      )}
                    </div>
                    
                    {/* Content Details */}
                    <div className="p-8 lg:p-12 lg:col-span-5 flex flex-col justify-center space-y-4">
                      <div className="flex items-center gap-2.5 text-xs text-muted-foreground font-mono">
                        <span className="bg-primary/10 text-primary px-2.5 py-0.8 rounded-full font-bold uppercase tracking-wider text-[9px]">
                          Featured
                        </span>
                        <span>·</span>
                        <span className="font-semibold">{featured.category.name}</span>
                      </div>
                      
                      <h2 className="text-2xl lg:text-3xl font-extrabold text-foreground group-hover:text-primary transition-colors leading-snug">
                        {featured.title}
                      </h2>
                      
                      {featured.excerpt && (
                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                          {featured.excerpt}
                        </p>
                      )}
                      
                      <div className="flex items-center gap-3 text-xs text-muted-foreground font-mono pt-4 border-t border-border/30">
                        {featured.publishedAt && <span>{formatFullDate(featured.publishedAt)}</span>}
                        {featured.readTimeMin && (
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" /> {featured.readTimeMin} min read
                          </span>
                        )}
                      </div>
                    </div>

                  </div>
                </div>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Normal Grid listing */}
        {filteredBlogs.length > 0 ? (
          <motion.div 
            layout 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {regularBlogs.map((blog, idx) => (
                <motion.div
                  layout
                  key={blog.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="h-full"
                >
                  <Link href={`/blog/${blog.slug}`} className="block h-full group">
                    <div className="group rounded-[24px] border border-border/50 bg-card/65 backdrop-blur-sm overflow-hidden hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 h-full flex flex-col justify-between relative">
                      {/* Hover Glow Effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                      <div>
                        {/* Cover Image with card-in-card overlap */}
                        <div className="relative h-48 m-3.5 rounded-2xl overflow-hidden border border-border/30 bg-muted">
                          {blog.featuredImage ? (
                            <Image 
                              src={blog.featuredImage} 
                              alt={blog.title} 
                              fill 
                              className="object-cover group-hover:scale-105 transition-transform duration-700" 
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                          ) : (
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-indigo-500/5 flex items-center justify-center">
                              <BookOpen className="h-10 w-10 text-primary/30" />
                            </div>
                          )}
                          
                          {/* Category tag overlaid on bottom-left of image */}
                          <div className="absolute bottom-3 left-3">
                            <span className="text-[9px] uppercase tracking-wider font-extrabold px-2.5 py-1 rounded bg-black/60 backdrop-blur-md text-white border border-white/10 shadow-sm">
                              {blog.category.name}
                            </span>
                          </div>
                        </div>

                        {/* Text */}
                        <div className="px-6 pb-4 pt-1 space-y-2">
                          <h3 className="font-extrabold text-base leading-snug group-hover:text-primary transition-colors line-clamp-2">
                            {blog.title}
                          </h3>
                          {blog.excerpt && (
                            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                              {blog.excerpt}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Footer Details */}
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
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          /* Empty search result fallback */
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 border border-dashed border-border/50 rounded-2xl bg-card/20 space-y-3"
          >
            <AlertCircle className="h-8 w-8 text-muted-foreground mx-auto" />
            <h4 className="font-bold text-foreground">No articles found</h4>
            <p className="text-xs text-muted-foreground max-w-xs mx-auto">
              We couldn't find any articles matching your search query or selected category filter. Try checking spelling or resetting tags.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
