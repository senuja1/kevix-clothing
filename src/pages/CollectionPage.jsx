import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProductGrid } from '../components/ProductGrid';
import { BRAND_INFO } from '../data/looksData';

export function CollectionPage({ onAddToCart }) {
  return (
    <div className="w-full min-h-screen bg-[#F4EFEA] pt-20 sm:pt-24 pb-20 select-none flex flex-col items-center">
      
      {/* Top Editorial Breadcrumb & Single Authoritative Header */}
      <div className="w-full max-w-7xl 2xl:max-w-[1540px] mx-auto px-4 sm:px-8 lg:px-12 mb-6 sm:mb-10">
        
        {/* Navigation Breadcrumb Bar */}
        <div className="flex items-center justify-between pb-5 border-b border-black/10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-black/60 hover:text-black transition-colors min-h-[44px] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2]" />
            <span>Back to Runway</span>
          </Link>

          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-black/50">
            {BRAND_INFO.collection}
          </span>
        </div>

        {/* Collection Hero Title: Centered and Evenly Balanced */}
        <div className="w-full pt-8 sm:pt-12 text-center max-w-4xl mx-auto flex flex-col items-center justify-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-black/15 bg-white/70 backdrop-blur-sm text-[11px] font-mono uppercase tracking-[0.22em] text-black/70 shadow-xs mx-auto">
            <Sparkles className="w-3.5 h-3.5 text-[#1A1A1A]" />
            <span>Complete Catalogue</span>
          </div>

          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl text-[#1A1A1A] tracking-tight leading-tight text-center w-full">
            The Collection.
          </h1>

          <p className="text-black/65 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-sans leading-relaxed text-center w-full">
            Every garment meticulously crafted with architectural proportions, rigid raw selvedge denim, sculpted corsets, and heavyweight cotton essentials.
          </p>
        </div>

      </div>

      {/* Main Product Grid Component with hideHeader={true} to eliminate duplicate title */}
      <div className="w-full flex justify-center">
        <ProductGrid onAddToCart={onAddToCart} hideHeader={true} />
      </div>

      {/* Editorial Sourcing & Runway Callout Banner: Centered and Wide */}
      <div className="w-full max-w-7xl 2xl:max-w-[1540px] mx-auto px-4 sm:px-8 lg:px-12 mt-16 sm:mt-24">
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
            className="px-8 py-4 rounded-full bg-white text-[#1A1A1A] hover:bg-[#FAF6F1] transition-all font-mono text-xs uppercase tracking-widest font-bold shadow-md active:scale-95 whitespace-nowrap min-h-[44px] flex items-center justify-center cursor-pointer"
          >
            Launch Catwalk Runway →
          </Link>

        </div>
      </div>

    </div>
  );
}
