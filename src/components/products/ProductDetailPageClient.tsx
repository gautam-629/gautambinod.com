'use client';

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowLeft, Tag, ShoppingCart, ExternalLink, CheckCircle, Package } from "lucide-react";
import { toStringArray } from "@/types";
import { formatCurrency } from "@/utils/format";
import { DemoVideoPlayer } from "@/components/common/DemoVideoPlayer";
import type { Prisma } from "@prisma/client";

type ProductWithCategoryAndFaqs = Prisma.ProductGetPayload<{
  include: { category: true; faqs: true };
}>;

interface Props {
  product: ProductWithCategoryAndFaqs;
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

export function ProductDetailPageClient({ product }: Props) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const images = toStringArray(product.images);
  const userFeatures = toStringArray(product.userFeatures);
  const adminFeatures = toStringArray(product.adminFeatures);
  const mobileFeatures = toStringArray(product.mobileFeatures);
  const techStack = toStringArray(product.techStack);

  const discount =
    product.discountedPrice && product.price > 0
      ? Math.round(((product.price - product.discountedPrice) / product.price) * 100)
      : 0;

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-[100]"
        style={{ scaleX }}
      />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="container py-16 max-w-6xl mx-auto px-4 select-none"
      >
        {/* Back Link */}
        <motion.div variants={itemVariants}>
          <Link 
            href="/products" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" /> 
            <span>Back to Products</span>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left: Images + Description */}
          <div className="lg:col-span-3 space-y-8">
            {/* Primary Cover Image */}
            {images.length > 0 ? (
              <motion.div
                variants={imageVariants}
                className="relative h-72 sm:h-96 rounded-[24px] overflow-hidden border border-border/50 shadow-lg shadow-black/5"
              >
                <Image
                  src={images[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              </motion.div>
            ) : (
              <motion.div 
                variants={itemVariants}
                className="h-72 rounded-[24px] bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center border border-border/50"
              >
                <span className="text-6xl font-bold text-primary/20">{product.name[0]}</span>
              </motion.div>
            )}

            {/* Screenshots grid */}
            {images.length > 1 && (
              <motion.div variants={itemVariants} className="grid grid-cols-4 gap-3">
                {images.slice(1, 5).map((img, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    className="relative h-20 rounded-xl overflow-hidden border border-border/50 cursor-pointer transition-all duration-350"
                  >
                    <Image
                      src={img}
                      alt={`Screenshot ${i + 2}`}
                      fill
                      className="object-cover"
                      sizes="25vw"
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Product Overview */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h2 className="text-xl font-bold tracking-tight text-foreground">About this Product</h2>
              <div
                className="prose prose-neutral dark:prose-invert max-w-none text-sm text-muted-foreground leading-relaxed prose-headings:font-bold prose-a:text-primary"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </motion.div>

            {/* Features block */}
            {(userFeatures.length > 0 || adminFeatures.length > 0 || mobileFeatures.length > 0) && (
              <motion.div variants={itemVariants} className="space-y-6">
                <h2 className="text-xl font-bold tracking-tight text-foreground">Features</h2>
                
                {userFeatures.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-bold text-xs uppercase tracking-wider text-primary">User Features</h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {userFeatures.map((f, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed">
                          <CheckCircle className="h-4.5 w-4.5 text-primary mt-0.5 shrink-0" /> 
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {adminFeatures.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-bold text-xs uppercase tracking-wider text-primary">Admin Features</h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {adminFeatures.map((f, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed">
                          <CheckCircle className="h-4.5 w-4.5 text-primary mt-0.5 shrink-0" /> 
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {mobileFeatures.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-bold text-xs uppercase tracking-wider text-primary">Mobile Features</h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {mobileFeatures.map((f, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed">
                          <CheckCircle className="h-4.5 w-4.5 text-primary mt-0.5 shrink-0" /> 
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            )}

            {/* FAQs section */}
            {product.faqs.length > 0 && (
              <motion.div variants={itemVariants} className="space-y-4">
                <h2 className="text-xl font-bold tracking-tight text-foreground">FAQs</h2>
                <div className="space-y-3">
                  {product.faqs.map((faq) => (
                    <div key={faq.id} className="p-5 rounded-2xl border border-border/50 bg-card/65 backdrop-blur-sm relative overflow-hidden hover:border-primary/20 transition-all duration-300">
                      <h3 className="font-bold text-sm text-foreground mb-2">{faq.question}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Sidebar: Sticky Purchase Details */}
          <div className="lg:col-span-2">
            <motion.div 
              variants={itemVariants}
              className="p-6 rounded-[24px] border border-border/50 bg-card/65 backdrop-blur-sm sticky top-24 space-y-6 relative overflow-hidden group hover:border-primary/20 transition-all duration-300 shadow-xl shadow-black/5"
            >
              {/* Subtle Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div>
                <span className="text-[10px] text-primary font-bold uppercase tracking-wider">{product.category.name}</span>
                <h1 className="text-2xl font-extrabold tracking-tight text-foreground mt-1">{product.name}</h1>
                {product.tagline && (
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed font-normal">{product.tagline}</p>
                )}
              </div>

              {/* Price block */}
              <div>
                {product.discountedPrice ? (
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-primary">
                      {formatCurrency(product.discountedPrice, product.currency)}
                    </span>
                    <span className="text-sm text-muted-foreground line-through font-normal">
                      {formatCurrency(product.price, product.currency)}
                    </span>
                    {discount > 0 && (
                      <span className="text-[9px] font-extrabold bg-destructive text-destructive-foreground px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Tag className="h-3 w-3" />
                        {discount}% OFF
                      </span>
                    )}
                  </div>
                ) : (
                  <span className="text-3xl font-extrabold text-primary">
                    {formatCurrency(product.price, product.currency)}
                  </span>
                )}
              </div>

              {/* Purchase CTAs */}
              <div className="space-y-3">
                <Link
                  href={`/contact?product=${encodeURIComponent(product.name)}&type=purchase`}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-xs font-bold text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-sm shadow-primary/5"
                >
                  <ShoppingCart className="h-4 w-4" /> Buy Now
                </Link>
                
                {product.demoUrl && (
                  <a
                    href={product.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-border/55 bg-card px-5 py-3 text-xs font-bold text-foreground hover:bg-accent transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <ExternalLink className="h-4 w-4" /> View Live Demo
                  </a>
                )}
                
                {product.demoVideo && (
                  <DemoVideoPlayer videoUrl={product.demoVideo} />
                )}
                
                <Link
                  href={`/contact?product=${encodeURIComponent(product.name)}&type=customize`}
                  className="w-full inline-flex items-center justify-center rounded-xl text-xs text-muted-foreground hover:text-foreground px-5 py-2.5 hover:bg-accent transition-colors"
                >
                  Request Customization
                </Link>
              </div>

              {/* Demo Credentials */}
              {(product.demoUsername || product.demoPassword) && (
                <div className="p-4 rounded-xl bg-muted/65 border border-border/30">
                  <p className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground mb-2">Demo Credentials</p>
                  <div className="space-y-1 font-mono text-xs">
                    {product.demoUsername && (
                      <p className="text-muted-foreground">
                        Email: <span className="text-foreground font-semibold">{product.demoUsername}</span>
                      </p>
                    )}
                    {product.demoPassword && (
                      <p className="text-muted-foreground">
                        Pass: <span className="text-foreground font-semibold">{product.demoPassword}</span>
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Tech Stack built details */}
              {techStack.length > 0 && (
                <div className="pt-4 border-t border-border/20">
                  <p className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground mb-3.5">Built With</p>
                  <div className="flex flex-wrap gap-1.5">
                    {techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-[9px] font-mono font-semibold bg-primary/10 text-primary border border-primary/5 px-2 py-0.5 rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
