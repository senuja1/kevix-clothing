import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Check, Plus, ArrowRight, Sparkles, ArrowUpDown } from 'lucide-react';
import { ARCHIVE_PRODUCTS, ARCHIVE_CATEGORIES, BRAND_INFO } from '../data/looksData';

export function ProductGrid({ onAddToCart, hideHeader = false }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMobileProduct, setSelectedMobileProduct] = useState(null);
  const [addedItemFeedback, setAddedItemFeedback] = useState({});

  // Trigger smooth skeleton shimmer when switching categories
  const handleCategoryChange = (category) => {
    if (category === activeCategory) return;
    setIsLoading(true);
    setActiveCategory(category);
    setTimeout(() => {
      setIsLoading(false);
    }, 280);
  };

  const filteredProducts = ARCHIVE_PRODUCTS.filter((item) => {
    if (activeCategory === "All") return true;
    return item.category === activeCategory;
  }).sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    return 0; // featured default
  });

  const handleQuickAdd = (product, size) => {
    if (onAddToCart) {
      onAddToCart({
        id: `${product.id}-${size}`,
        pieceId: product.id,
        name: product.name,
        price: product.price,
        size: size,
        thumbnail: product.primaryImage,
        lookTitle: product.tag || "Archive Piece",
        lookNumber: "ARCHIVE",
        brand: product.brand || BRAND_INFO.name
      });
    }

    setAddedItemFeedback((prev) => ({ ...prev, [`${product.id}-${size}`]: true }));
    setTimeout(() => {
      setAddedItemFeedback((prev) => ({ ...prev, [`${product.id}-${size}`]: false }));
    }, 1800);

    setSelectedMobileProduct(null);
  };

  return (
    <section 
      id="archive-collection"
      className="w-full bg-[#F4EFEA] py-6 sm:py-8 px-4 sm:px-8 lg:px-12 select-none overflow-x-hidden flex flex-col items-center justify-center"
    >
      <div className="w-full max-w-7xl 2xl:max-w-[1540px] mx-auto space-y-8 sm:space-y-10 flex flex-col items-center">
        
        {/* Optional Section Header (Hidden on dedicated collection page) */}
        {!hideHeader && (
          <div className="text-center max-w-3xl mx-auto flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-black/15 bg-white/70 backdrop-blur-sm text-[11px] font-mono uppercase tracking-[0.22em] text-black/70 mb-3 shadow-xs">
              <Sparkles className="w-3 h-3 text-[#1A1A1A]" />
              <span>KevixClothing Archive</span>
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#1A1A1A] tracking-tight leading-tight">
              Curated Silhouettes.
            </h2>

            <p className="text-black/60 text-sm sm:text-base mt-2 max-w-xl font-sans text-center">
              Precision-cut raw selvedge denims, structured corsets, and heavyweight cotton essentials constructed for architectural drape.
            </p>
          </div>
        )}

        {/* Filter Controls Row: Perfectly Centered & Balanced Across Width */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 border-b border-black/10 pb-6">
          
          {/* Left item counter (Desktop) */}
          <div className="hidden md:flex items-center min-w-[150px]">
            <span className="text-xs font-mono uppercase tracking-wider text-black/50 font-bold">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'Silhouette' : 'Silhouettes'}
            </span>
          </div>

          {/* Centered Category Tabs with Animated Pill Indicator (Framer Motion layout) */}
          <div className="flex items-center justify-center overflow-x-auto no-scrollbar py-1 w-full md:w-auto">
            <div className="inline-flex items-center p-1 sm:p-1.5 rounded-full bg-black/5 border border-black/10 backdrop-blur-md gap-1">
              {ARCHIVE_CATEGORIES.map((category) => {
                const isActive = activeCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => handleCategoryChange(category)}
                    className={`relative px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-sans font-medium tracking-wide transition-colors duration-300 min-h-[44px] flex items-center justify-center cursor-pointer ${
                      isActive ? 'text-white' : 'text-black/65 hover:text-black'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeCategoryPill"
                        className="absolute inset-0 bg-[#1A1A1A] rounded-full shadow-sm"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10 whitespace-nowrap">{category}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Sorter Dropdown & Mobile Count */}
          <div className="flex items-center justify-between md:justify-end gap-3 w-full md:w-auto min-w-[150px]">
            <span className="md:hidden text-xs font-mono uppercase tracking-wider text-black/50 font-bold">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'Piece' : 'Pieces'}
            </span>

            <div className="flex items-center gap-1.5 bg-white border border-black/10 rounded-full px-3.5 py-1.5 shadow-xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-black/50" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-xs font-mono uppercase bg-transparent text-[#1A1A1A] focus:outline-none cursor-pointer pr-1"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

        </div>

        {/* Product Grid: Strict aspect-[4/5] Cards Evenly Distributed Across Width */}
        <div className="w-full">
          {isLoading ? (
            /* Skeleton Shimmer Loading Cards */
            <div className="w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 justify-center">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="flex flex-col space-y-3">
                  <div className="aspect-[4/5] w-full rounded-xl overflow-hidden bg-black/5 relative animate-pulse">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full animate-[shimmer_1.8s_infinite]" />
                  </div>
                  <div className="h-4 bg-black/10 rounded-sm w-3/4 animate-pulse" />
                  <div className="h-3 bg-black/10 rounded-sm w-1/3 animate-pulse" />
                </div>
              ))}
            </div>
          ) : (
            /* Active Framer Motion Layout Grid */
            <motion.div 
              layout
              className="w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 justify-center"
            >
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => {
                  return (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="group flex flex-col justify-between"
                    >
                      {/* Product Image Container: Strict aspect-[4/5] & overflow-hidden */}
                      <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-[#EAE4DC] border border-black/10 shadow-[0_2px_12px_rgba(0,0,0,0.03)] cursor-pointer">
                        
                        {/* Primary Image */}
                        <img
                          src={product.primaryImage}
                          alt={product.name}
                          className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ease-out group-hover:opacity-0"
                          loading="lazy"
                        />

                        {/* Secondary Image: Smooth Hover Crossfade (duration-700) */}
                        <img
                          src={product.secondaryImage}
                          alt={`${product.name} view`}
                          className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-out opacity-0 scale-100 group-hover:opacity-100 group-hover:scale-105"
                          loading="lazy"
                        />

                        {/* Subtle Editorial Top Tag Badge */}
                        {product.tag && (
                          <div className="absolute top-2.5 left-2.5 z-10 pointer-events-none">
                            <span className="px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-md border border-black/10 text-[10px] sm:text-[11px] font-mono font-semibold uppercase tracking-wider text-[#1A1A1A] shadow-xs">
                              {product.tag}
                            </span>
                          </div>
                        )}

                        {/* Desktop: Glassmorphic Quick-Add Size Selector Bar (Slides up on Hover) */}
                        <div className="hidden sm:flex absolute inset-x-2 bottom-2 z-20 flex-col gap-1 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out pointer-events-none group-hover:pointer-events-auto">
                          <div className="p-1.5 rounded-lg backdrop-blur-md bg-white/85 dark:bg-black/85 border border-white/40 dark:border-white/10 shadow-lg flex items-center justify-between gap-1">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-black/60 pl-1 font-bold">
                              Quick Add
                            </span>
                            <div className="flex items-center gap-1">
                              {product.sizes.map((size) => {
                                const isAdded = addedItemFeedback[`${product.id}-${size}`];
                                return (
                                  <button
                                    key={size}
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleQuickAdd(product, size);
                                    }}
                                    className={`px-2 py-1 text-xs font-mono font-bold rounded transition-all duration-200 cursor-pointer min-w-[28px] text-center ${
                                      isAdded
                                        ? 'bg-emerald-600 text-white'
                                        : 'bg-black/5 hover:bg-[#1A1A1A] hover:text-white text-[#1A1A1A]'
                                    }`}
                                    title={`Add size ${size}`}
                                  >
                                    {isAdded ? '✓' : size}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>

                        {/* Mobile: Compact Quick-Add Trigger Button (Min 44x44px touch target) */}
                        <div className="sm:hidden absolute bottom-2 right-2 z-20">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedMobileProduct(product);
                            }}
                            aria-label={`Select size for ${product.name}`}
                            className="w-11 h-11 rounded-full bg-white/90 backdrop-blur-md border border-black/15 text-[#1A1A1A] flex items-center justify-center shadow-md active:scale-95 cursor-pointer"
                          >
                            <Plus className="w-5 h-5 stroke-[2]" />
                          </button>
                        </div>

                      </div>

                      {/* Product Metadata with Fluid clamp() Typography */}
                      <div className="mt-3 flex flex-col justify-between">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-[clamp(0.8125rem,0.9vw+0.45rem,1rem)] font-medium text-[#1A1A1A] tracking-tight line-clamp-1">
                            {product.name}
                          </h3>
                        </div>

                        <div className="flex items-baseline justify-between mt-1">
                          <span className="text-[clamp(0.8125rem,0.85vw+0.45rem,0.95rem)] font-mono font-semibold text-black/80">
                            ${product.price.toFixed(2)}
                          </span>
                          <span className="text-[11px] font-mono text-black/50 uppercase">
                            {product.brand}
                          </span>
                        </div>
                      </div>

                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          )}
        </div>

      </div>

      {/* Mobile Size Selection Bottom Sheet */}
      <AnimatePresence>
        {selectedMobileProduct && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMobileProduct(null)}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs sm:hidden"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="fixed inset-x-0 bottom-0 z-50 bg-[#F4EFEA] border-t border-black/15 rounded-t-2xl p-6 shadow-2xl sm:hidden select-none"
            >
              <div className="w-12 h-1.5 bg-black/20 rounded-full mx-auto mb-4" />
              
              <div className="flex items-center gap-3.5 pb-4 border-b border-black/10">
                <img
                  src={selectedMobileProduct.primaryImage}
                  alt={selectedMobileProduct.name}
                  className="w-14 h-16 rounded-lg object-cover border border-black/10"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-base font-semibold text-[#1A1A1A] truncate">
                    {selectedMobileProduct.name}
                  </h4>
                  <p className="text-sm font-mono font-bold text-black/75 mt-0.5">
                    ${selectedMobileProduct.price.toFixed(2)} USD
                  </p>
                </div>
              </div>

              <div className="py-4">
                <span className="text-xs uppercase tracking-wider font-mono text-black/60 block font-bold mb-2">
                  Select Size to Add
                </span>
                <div className="grid grid-cols-4 gap-2">
                  {selectedMobileProduct.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => handleQuickAdd(selectedMobileProduct, size)}
                      className="py-3 px-2 rounded-xl border border-black/15 bg-white text-sm font-mono font-bold text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-all active:scale-95 shadow-xs flex items-center justify-center min-h-[44px] cursor-pointer"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedMobileProduct(null)}
                className="w-full py-3 text-center text-xs font-mono uppercase tracking-widest text-black/60 hover:text-black cursor-pointer min-h-[44px]"
              >
                Cancel
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </section>
  );
}
