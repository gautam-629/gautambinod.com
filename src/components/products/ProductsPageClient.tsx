'use client';

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Package, ShoppingCart, Tag } from "lucide-react";
import { toStringArray } from "@/types";
import { formatCurrency } from "@/utils/format";

import type { ProductWithCategory } from "@/types";
import type { ProductCategory } from "@prisma/client";

interface Props {
  products: ProductWithCategory[];
  categories: ProductCategory[];
}

export function ProductsPageClient({ products, categories }: Props) {
  const [selectedCat, setSelectedCat] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter products by category and keyword search
  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCat === "all" || product.category.slug === selectedCat;

    const techStack = toStringArray(product.techStack);
    const searchTarget = `${product.name} ${product.tagline || ""} ${techStack.join(" ")}`.toLowerCase();
    const matchesSearch = searchTarget.includes(searchQuery.toLowerCase().trim());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container py-16 max-w-6xl mx-auto px-4 select-none">

      {/* Title & Header Section */}
      <div className="max-w-2xl mb-12 space-y-3">
        <span className="text-primary text-xs font-semibold uppercase tracking-wider">Product Marketplace</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          Premium Software & Tools
        </h1>
        <div className="w-12 h-1 bg-primary rounded-full mt-2" />
        <p className="text-muted-foreground text-sm leading-relaxed">
          Premium software products, templates, and tools ready to accelerate your business.
        </p>
      </div>

      {/* Control Panel: Filters & Search bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCat("all")}
            className={`px-4 py-1.5 text-xs font-bold rounded-lg border transition-all duration-300 ${selectedCat === "all"
              ? "bg-primary border-primary text-primary-foreground shadow-md shadow-primary/5"
              : "bg-muted/10 border-border/40 text-muted-foreground hover:border-primary/20 hover:text-foreground"
              }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCat(cat.slug)}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg border transition-all duration-300 ${selectedCat === cat.slug
                ? "bg-primary border-primary text-primary-foreground shadow-md shadow-primary/5"
                : "bg-muted/10 border-border/40 text-muted-foreground hover:border-primary/20 hover:text-foreground"
                }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Dynamic Search Box */}
        <div className="relative w-full sm:w-64 shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs font-medium bg-card border border-border/50 rounded-xl focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/10 transition-all text-foreground"
          />
        </div>
      </div>

      {/* Grid Layout Container */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product) => {
            const images = toStringArray(product.images);
            const techStack = toStringArray(product.techStack);
            const discount =
              product.discountedPrice && product.price > 0
                ? Math.round(((product.price - product.discountedPrice) / product.price) * 100)
                : 0;

            return (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="h-full flex"
              >
                <div className="group rounded-[24px] border border-border/50 bg-card/65 backdrop-blur-sm overflow-hidden hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 w-full flex flex-col justify-between relative p-1.5">
                  {/* Outer Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div>
                    {/* Cover thumbnail with Card-in-card spacing margins */}
                    <div className="relative h-44 m-2 rounded-2xl overflow-hidden border border-border/30 bg-muted">
                      {images.length > 0 ? (
                        <Image
                          src={images[0]}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-103 transition-transform duration-750 ease-out"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-indigo-500/5 flex items-center justify-center">
                          <Package className="h-10 w-10 text-primary/30" />
                        </div>
                      )}

                      {/* Discount Overlay Badge */}
                      {discount > 0 && (
                        <div className="absolute top-3 left-3 z-10">
                          <span className="text-[9px] uppercase tracking-wider font-extrabold px-2.5 py-1 rounded bg-destructive text-destructive-foreground shadow-sm flex items-center gap-1">
                            <Tag className="h-3 w-3" />
                            {discount}% OFF
                          </span>
                        </div>
                      )}

                      {/* Product status badge overlay right */}
                      <div className="absolute top-3 right-3 z-10">
                        {product.status === "AVAILABLE" ? (
                          <span className="text-[9px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-emerald-400 border border-emerald-500/30 flex items-center gap-1 shadow-sm">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            Available
                          </span>
                        ) : product.status === "COMING_SOON" ? (
                          <span className="text-[9px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-amber-400 border border-amber-500/30 flex items-center gap-1 shadow-sm">
                            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                            Coming Soon
                          </span>
                        ) : product.status === "UNDER_DEVELOPMENT" ? (
                          <span className="text-[9px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-blue-400 border border-blue-500/30 flex items-center gap-1 shadow-sm">
                            <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
                            In Dev
                          </span>
                        ) : (
                          <span className="text-[9px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-muted-foreground border border-border/30 flex items-center gap-1 shadow-sm">
                            <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                            Sold Out
                          </span>
                        )}
                      </div>

                      {/* Overlay Category tag */}
                      <div className="absolute bottom-3 left-3 z-10">
                        <span className="text-[9px] uppercase tracking-wider font-extrabold px-2.5 py-1 rounded bg-black/60 backdrop-blur-md text-white border border-white/10 shadow-sm">
                          {product.category.name}
                        </span>
                      </div>
                    </div>

                    {/* Metadata Content area */}
                    <div className="px-4.5 pb-3 pt-2.5 space-y-2">
                      <Link href={`/products/${product.slug}`}>
                        <h3 className="font-extrabold text-base tracking-tight text-foreground group-hover:text-primary transition-colors duration-300 leading-snug">
                          {product.name}
                        </h3>
                      </Link>

                      {product.tagline && (
                        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed font-normal">
                          {product.tagline}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Actions & Tech Stack Footer Container */}
                  <div className="flex flex-col">
                    {/* Price and Cart Block */}
                    <div className="px-4.5 py-4 border-t border-border/20 flex items-center justify-between">
                      <div>
                        {product.discountedPrice ? (
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-lg font-extrabold text-primary">
                              {formatCurrency(product.discountedPrice, product.currency)}
                            </span>
                            <span className="text-xs text-muted-foreground line-through">
                              {formatCurrency(product.price, product.currency)}
                            </span>
                          </div>
                        ) : (
                          <span className="text-lg font-extrabold text-primary">
                            {formatCurrency(product.price, product.currency)}
                          </span>
                        )}
                      </div>
                      <Link href={`/products/${product.slug}`}>
                        <div className="p-2.5 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 cursor-pointer shadow-sm shadow-primary/5">
                          <ShoppingCart className="h-4 w-4" />
                        </div>
                      </Link>
                    </div>

                    {/* Tech stack badges footer block */}
                    {techStack.length > 0 && (
                      <div className="px-4.5 pb-4 pt-3 border-t border-border/20 flex flex-wrap gap-1">
                        {techStack.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="text-[9px] font-mono font-semibold bg-muted/65 border border-border/30 px-2 py-0.5 rounded-md text-muted-foreground"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20 text-muted-foreground text-sm font-medium flex flex-col items-center justify-center gap-2"
        >
          <Package className="h-8 w-8 text-muted-foreground/55" />
          <span>No matches found inside this category search.</span>
        </motion.div>
      )}

    </div>
  );
}
