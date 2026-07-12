'use client';

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { formatFullDate } from "@/utils/format";
import type { Prisma } from "@prisma/client";

type BlogWithCategoryAndTags = Prisma.BlogGetPayload<{
  include: { category: true; tags: { include: { tag: true } } };
}>;

interface Props {
  blog: BlogWithCategoryAndTags;
  relatedBlogs: import("@prisma/client").Blog[];
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
  hidden: { opacity: 0, scale: 0.96 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1]
    }
  },
};

export function BlogDetailPageClient({ blog, relatedBlogs }: Props) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

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
        className="container py-16 max-w-3xl mx-auto px-4 select-none"
      >
        {/* Back Link */}
        <motion.div variants={itemVariants}>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            <span>Back to Blog</span>
          </Link>
        </motion.div>

        {/* Header Section */}
        <div className="mb-8 space-y-4">
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground font-medium"
          >
            <span className="bg-primary/10 text-primary px-2.5 py-0.5 rounded-full font-semibold">
              {blog.category.name}
            </span>
            {blog.publishedAt && (
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-primary/70" />
                {formatFullDate(blog.publishedAt)}
              </span>
            )}
            {blog.readTimeMin && (
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-primary/70" />
                {blog.readTimeMin} min read
              </span>
            )}
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground leading-tight"
          >
            {blog.title}
          </motion.h1>

          {blog.excerpt && (
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-muted-foreground leading-relaxed font-normal"
            >
              {blog.excerpt}
            </motion.p>
          )}
        </div>

        {/* Featured Image */}
        {blog.featuredImage && (
          <motion.div
            variants={imageVariants}
            className="relative h-64 sm:h-96 rounded-[24px] overflow-hidden mb-10 border border-border/30 shadow-lg shadow-black/5"
          >
            <Image
              src={blog.featuredImage}
              alt={blog.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </motion.div>
        )}

        {/* Content Block */}
        <motion.div
          variants={itemVariants}
          className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-extrabold prose-a:text-primary prose-a:font-semibold text-sm sm:text-base leading-relaxed"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* Tags Block */}
        {blog.tags.length > 0 && (
          <motion.div
            variants={itemVariants}
            className="mt-10 pt-6 border-t border-border/20"
          >
            <div className="flex flex-wrap gap-2">
              {blog.tags.map(({ tag }) => (
                <span
                  key={tag.id}
                  className="text-xs bg-muted/65 border border-border/30 px-3 py-1 rounded-full text-muted-foreground font-medium"
                >
                  #{tag.name}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Related Posts */}
        {relatedBlogs.length > 0 && (
          <motion.div
            variants={itemVariants}
            className="mt-16 pt-8 border-t border-border/20"
          >
            <h2 className="text-xl font-bold tracking-tight text-foreground mb-6">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedBlogs.map((related) => (
                <Link key={related.id} href={`/blog/${related.slug}`}>
                  <motion.div
                    whileHover={{ y: -4, scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                    className="group p-5 rounded-[18px] border border-border/50 bg-card/65 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 h-full flex flex-col justify-between relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    <div>
                      <h3 className="font-bold text-sm tracking-tight text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2 leading-snug">
                        {related.title}
                      </h3>
                    </div>
                    {related.readTimeMin && (
                      <p className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground flex items-center gap-1.5 mt-3">
                        <Clock className="h-3.5 w-3.5 text-primary/70" />
                        {related.readTimeMin} min read
                      </p>
                    )}
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </>
  );
}
