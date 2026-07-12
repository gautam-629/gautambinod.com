'use client';

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  ShoppingCart, 
  Tag, 
  BookOpen, 
  Check, 
  ExternalLink, 
  Key, 
  ShieldCheck, 
  Info 
} from "lucide-react";
import { formatCurrency } from "@/utils/format";
import { toStringArray, type ProductWithCategory } from "@/types";

interface Props {
  products: ProductWithCategory[];
}

export function FeaturedProducts({ products }: Props) {
  const [activeIdx, setActiveIdx] = useState(0);

  if (!products.length) return null;

  const parseJsonArray = (jsonVal: unknown): string[] => {
    if (!jsonVal) return [];
    if (typeof jsonVal === "string") {
      try {
        const parsed = JSON.parse(jsonVal);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    }
    return Array.isArray(jsonVal) ? jsonVal : [];
  };

  const activeProduct = products[activeIdx];
  const images = toStringArray(activeProduct.images);
  const discount =
    activeProduct.discountedPrice && activeProduct.price > 0
      ? Math.round(((activeProduct.price - activeProduct.discountedPrice) / activeProduct.price) * 100)
      : 0;

  const features = parseJsonArray(activeProduct.userFeatures);
  const techStack = parseJsonArray(activeProduct.techStack);

  return (
    <section className="py-24 bg-muted/20 border-y border-border/20">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
          <div>
            <p className="text-primary text-sm font-semibold tracking-wider uppercase mb-2">SaaS & Apps Marketplace</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
              Premium Software Solutions
            </h2>
            <div className="w-12 h-1 bg-primary mt-4 rounded-full" />
            <p className="text-muted-foreground mt-4 max-w-xl text-sm leading-relaxed">
              Complete, production-ready SaaS platforms, API engines, and digital products available for immediate deployment.
            </p>
          </div>
          <Link 
            href="/products" 
            className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary/80 group"
          >
            Browse Store 
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Dynamic Showcase & Conversion Panel Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Premium Cards selector tabs */}
          <div className="lg:col-span-5 space-y-4">
            {products.map((product, i) => {
              const isActive = activeIdx === i;
              const productDiscount =
                product.discountedPrice && product.price > 0
                  ? Math.round(((product.price - product.discountedPrice) / product.price) * 100)
                  : 0;

              return (
                <button
                  key={product.id}
                  onClick={() => setActiveIdx(i)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 relative flex gap-4 items-center focus-visible:outline-none ${
                    isActive 
                      ? "bg-card border-primary/40 shadow-lg shadow-primary/5 scale-102" 
                      : "bg-muted/10 hover:bg-muted/20 border-border/30"
                  }`}
                >
                  {/* Active Indicator Pillar */}
                  {isActive && (
                    <motion.div
                      layoutId="activeProductPill"
                      className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-primary rounded-r"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}

                  {/* Tiny mockup cover photo inside card selector */}
                  <div className="relative w-12 h-12 rounded-xl bg-muted overflow-hidden shrink-0 border border-border/20">
                    {toStringArray(product.images).length > 0 ? (
                      <Image 
                        src={toStringArray(product.images)[0]} 
                        alt={product.name} 
                        fill 
                        className="object-cover"
                        sizes="48px"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                        <BookOpen className="h-4 w-4 text-primary/40" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className={`font-bold text-sm sm:text-base leading-snug truncate ${
                      isActive ? "text-foreground font-extrabold" : "text-muted-foreground"
                    }`}>
                      {product.name}
                    </h3>
                    
                    <div className="flex flex-wrap items-center gap-2 mt-1.5 text-[10px] font-mono">
                      {product.discountedPrice ? (
                        <span className="text-primary font-bold">
                          {formatCurrency(product.discountedPrice, product.currency)}
                        </span>
                      ) : (
                        <span className="text-primary font-bold">
                          {formatCurrency(product.price, product.currency)}
                        </span>
                      )}

                      {productDiscount > 0 && (
                        <span className="text-red-400 font-semibold bg-red-500/10 px-1 rounded">
                          {productDiscount}% OFF
                        </span>
                      )}

                      <span className="text-muted-foreground">·</span>
                      
                      {product.status === "AVAILABLE" ? (
                        <span className="text-emerald-400">Ready</span>
                      ) : (
                        <span className="text-amber-400">Backlog</span>
                      )}
                    </div>
                  </div>
                  
                  <ArrowRight className={`h-4 w-4 shrink-0 transition-transform ${
                    isActive ? "text-primary translate-x-1" : "text-muted-foreground/30"
                  }`} />
                </button>
              );
            })}
          </div>

          {/* Right Column: High-Conversion Spotlight Presentation stage */}
          <div className="lg:col-span-7 rounded-3xl border border-border/50 bg-card/65 backdrop-blur-md overflow-hidden relative shadow-xl shadow-black/5 flex flex-col justify-between min-h-[580px]">
            
            <div className="p-6 sm:p-8 space-y-6">
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProduct.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-6"
                >
                  {/* Top Details & Categories */}
                  <div className="flex items-center justify-between gap-4 flex-wrap pb-4 border-b border-border/20">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-primary">
                        {activeProduct.category.name}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-foreground mt-1 tracking-tight">
                        {activeProduct.name}
                      </h3>
                    </div>

                    {discount > 0 && (
                      <span className="text-[10px] uppercase font-bold tracking-wider bg-red-500/15 border border-red-500/20 text-red-400 px-3 py-1 rounded-full font-mono flex items-center gap-1.5 shadow-sm">
                        <Tag className="h-3.5 w-3.5" />
                        {discount}% Instant Discount
                      </span>
                    )}
                  </div>

                  {/* Primary Visual Cover Mockup */}
                  <div className="relative h-56 rounded-2xl overflow-hidden border border-border/30 bg-muted shadow-inner">
                    {images.length > 0 ? (
                      <Image 
                        src={images[0]} 
                        alt={activeProduct.name} 
                        fill 
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        priority
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-indigo-500/5 flex items-center justify-center">
                        <BookOpen className="h-12 w-12 text-primary/30" />
                      </div>
                    )}
                  </div>

                  {/* Tagline Description */}
                  {activeProduct.tagline && (
                    <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                      {activeProduct.tagline}
                    </p>
                  )}

                  {/* Dynamic Product Features Checklist */}
                  {features.length > 0 && (
                    <div className="space-y-2.5">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Product Architecture & Capabilities</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {features.slice(0, 4).map((feat, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-foreground/80 leading-normal">
                            <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Direct Demo Sandbox access (If URL is provided in DB) */}
                  {(activeProduct.demoUrl || activeProduct.demoUsername) && (
                    <div className="p-4 rounded-xl border border-primary/25 bg-primary/5 space-y-3 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 rounded-full blur-xl pointer-events-none" />
                      
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
                          <span className="text-xs font-bold text-foreground">Interactive Demo Sandbox</span>
                        </div>
                        {activeProduct.demoUrl && (
                          <a
                            href={activeProduct.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[10px] font-extrabold text-primary hover:underline font-mono"
                          >
                            Launch Sandbox <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </div>

                      {/* Credentials prompt if present */}
                      {(activeProduct.demoUsername || activeProduct.demoPassword) && (
                        <div className="grid grid-cols-2 gap-4 bg-background/50 p-2.5 rounded-lg border border-border/40 text-[11px] font-mono leading-none">
                          <div>
                            <span className="text-muted-foreground block text-[9px] uppercase font-bold mb-1">Username</span>
                            <span className="text-foreground font-semibold select-all">{activeProduct.demoUsername || "demo"}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground block text-[9px] uppercase font-bold mb-1">Password</span>
                            <span className="text-foreground font-semibold select-all">{activeProduct.demoPassword || "admin123"}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                </motion.div>
              </AnimatePresence>

            </div>

            {/* Price tag & Shopping checkout card footer */}
            <div className="p-6 sm:p-8 bg-muted/30 border-t border-border/40 flex items-center justify-between select-none">
              <div>
                <p className="text-[10px] text-muted-foreground uppercase font-semibold">Immediate Ownership Price</p>
                {activeProduct.discountedPrice ? (
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-lg sm:text-xl font-bold text-primary font-mono leading-none">
                      {formatCurrency(activeProduct.discountedPrice, activeProduct.currency)}
                    </span>
                    <span className="text-xs text-muted-foreground line-through font-mono font-normal">
                      {formatCurrency(activeProduct.price, activeProduct.currency)}
                    </span>
                  </div>
                ) : (
                  <span className="text-lg sm:text-xl font-bold text-primary font-mono mt-0.5">
                    {formatCurrency(activeProduct.price, activeProduct.currency)}
                  </span>
                )}
              </div>

              <Link
                href={`/products/${activeProduct.slug}`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary hover:bg-primary/90 text-xs font-bold text-primary-foreground transition-all duration-300 hover:scale-102 shadow-md shadow-primary/10 group/btn"
              >
                <span>Purchase Product</span>
                <ShoppingCart className="h-3.5 w-3.5 shrink-0" />
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
