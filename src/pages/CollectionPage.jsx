import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProductGrid } from '../components/ProductGrid';
import { BRAND_INFO } from '../data/looksData';

export function CollectionPage({ onAddToCart }) {
  return (
    <div className="w-full min-h-screen bg-[#F4EFEA] pt-28 sm:pt-32 pb-20 select-none flex flex-col items-center">
      
      {/* Top Editorial Breadcrumb Bar */}
      <div className="w-full max-w-7xl 2xl:max-w-[1540px] mx-auto px-4 sm:px-8 lg:px-12 mb-6 sm:mb-8">
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
      </div>

      {/* Collection Hero Title: Dedicated Centered Header Block */}
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-8 text-center flex flex-col items-center justify-center">
        <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-serif tracking-tight text-black leading-tight text-center">
          The Collection.
        </h1>

        <p className="max-w-2xl mx-auto text-center text-base text-neutral-600 leading-relaxed mt-6 mb-12">
          Every garment meticulously crafted with architectural proportions, authentic washed selvedge denim, sculpted corsets, and heavyweight cotton essentials.
        </p>
      </div>

      {/* Main Product Grid Component with hideHeader={true} to eliminate duplicate title */}
      <div className="w-full flex justify-center">
        <ProductGrid onAddToCart={onAddToCart} hideHeader={true} />
      </div>

    </div>
  );
}
