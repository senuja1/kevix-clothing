import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BRAND_INFO } from '../data/looksData';

export function Navbar({ 
  cartCount = 0, 
  onOpenCart 
}) {
  return (
    <header className="sticky top-0 z-40 w-full h-14 bg-[#FFFFFF] border-b border-black/10 px-4 sm:px-10 lg:px-20 xl:px-24 flex items-center justify-between select-none shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
      
      {/* Brand Identity: Circular Logo + KevixClothing Wordmark (With Left Breathing Space) */}
      <div 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="flex items-center gap-3 cursor-pointer group pl-2 sm:pl-3 transition-transform"
      >
        {/* Round Logo */}
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border border-black/15 bg-black shadow-sm flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
          <img 
            src="/logo-round.png" 
            alt={BRAND_INFO.fullName || 'KevixClothing'} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* KevixClothing Name */}
        <div className="tracking-[0.14em] sm:tracking-[0.16em] font-extrabold text-sm sm:text-base md:text-lg text-[#1A1A1A] font-sans uppercase whitespace-nowrap">
          {BRAND_INFO.name || 'KevixClothing'}
        </div>
      </div>

      {/* Right: Pill button Bag (Only shown when cart has items, hidden at start when empty) */}
      <div className="flex items-center min-h-[40px]">
        <AnimatePresence>
          {cartCount > 0 && (
            <motion.button
              key="nav-bag-button"
              initial={{ opacity: 0, scale: 0.85, x: 10 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.85, x: 10 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={onOpenCart}
              aria-label={`Open Shopping Bag (${cartCount} items)`}
              className="border border-black/15 rounded-full px-4 sm:px-5 py-2 text-sm font-bold text-[#1A1A1A] hover:border-black transition active:scale-95 bg-white flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <span>Bag</span>
              <span className="w-5 h-5 rounded-full bg-[#1A1A1A] text-white text-[11px] font-bold flex items-center justify-center font-mono">
                {cartCount}
              </span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

    </header>
  );
}
