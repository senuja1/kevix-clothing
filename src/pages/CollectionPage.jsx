import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowLeft, SlidersHorizontal, ArrowUpDown, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProductGrid } from '../components/ProductGrid';
import { BRAND_INFO } from '../data/looksData';

export function CollectionPage({ onAddToCart }) {
  return (
    <div className="w-full min-h-screen bg-[#F4EFEA] pt-20 sm:pt-24 pb-16 select-none">
      
      {/* Top Editorial Breadcrumb & Intro Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-14 xl:px-20 mb-8 sm:mb-12">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between pb-6 border-b border-black/10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-black/60 hover:text-black transition-colors min-h-[44px] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2]" />
            <span>Back to Runway</span>
          </Link>

          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-black/50 hidden sm:inline">
            {BRAND_INFO.collection}
          </span>
        </div>

        {/* Collection Hero Title */}
        <div className="pt-8 sm:pt-12 text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-black/15 bg-white/70 backdrop-blur-sm text-[11px] font-mono uppercase tracking-[0.22em] text-black/70 shadow-xs">
            <Sparkles className="w-3 h-3 text-[#1A1A1A]" />
            <span>Complete Catalogue</span>
          </div>

          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl text-[#1A1A1A] tracking-tight leading-tight">
            The Collection.
          </h1>

          <p className="text-black/65 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-sans leading-relaxed">
            Every garment meticulously crafted with architectural proportions, rigid raw selvedge denim, sculpted corsets, and heavyweight cotton essentials.
          </p>
        </div>

      </div>

      {/* Main Product Grid Component with aspect-[4/5] cards, hover crossfade, glassmorphic quick-add */}
      <ProductGrid onAddToCart={onAddToCart} />

      {/* Editorial Sourcing & Runway Callout Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-14 xl:px-20 mt-16 sm:mt-24">
        <div className="relative rounded-2xl overflow-hidden bg-[#0E0E11] text-[#E5E0DB] p-8 sm:p-14 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-white/50 block">
              Atelier &amp; Runway Experience
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-white">
              See These Looks in Motion.
            </h3>
            <p className="text-white/60 text-xs sm:text-sm leading-relaxed">
              Experience how each raw selvedge denim silhouette pools and walks. Watch our 2.5D interactive catwalk runway and 4K campaign reels.
            </p>
          </div>

          <Link
            to="/"
            className="px-6 py-3.5 rounded-full bg-white text-[#1A1A1A] hover:bg-[#FAF6F1] transition-all font-mono text-xs uppercase tracking-widest font-bold shadow-md active:scale-95 whitespace-nowrap min-h-[44px] flex items-center justify-center cursor-pointer"
          >
            Launch Catwalk Runway →
          </Link>

        </div>
      </div>

    </div>
  );
}

