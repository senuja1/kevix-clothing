import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { BRAND_INFO } from '../data/looksData';

export function Navbar({ 
  cartCount = 0, 
  onOpenCart 
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isCollectionPage = location.pathname.startsWith('/collection');
  const isCampaignPage = location.pathname.startsWith('/campaign');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // On non-home pages (like /collection or /campaign), always provide high contrast background
  const hasSolidNav = !isHomePage || isScrolled;

  return (
    <header 
      className={`fixed top-0 inset-x-0 z-40 w-full h-14 sm:h-16 px-4 sm:px-10 lg:px-20 xl:px-24 flex items-center justify-between select-none transition-all duration-300 ${
        hasSolidNav 
          ? 'bg-white/85 backdrop-blur-md border-b border-black/10 shadow-[0_4px_20px_rgba(0,0,0,0.03)] text-[#1A1A1A]' 
          : 'bg-black/20 backdrop-blur-xs border-b border-white/10 text-white'
      }`}
    >
      
      {/* Brand Identity: Circular Logo + KevixClothing Wordmark (>= 44x44px touch target) */}
      <Link 
        to="/"
        className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group py-2 -ml-2 pl-2 transition-transform duration-200 min-h-[44px]"
      >
        {/* Round Logo */}
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border border-white/20 bg-black shadow-sm flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
          <img 
            src="/logo-round.png" 
            alt={BRAND_INFO.fullName || 'KevixClothing'} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* KevixClothing Name */}
        <div className="tracking-[0.14em] sm:tracking-[0.16em] font-extrabold text-sm sm:text-base md:text-lg font-sans uppercase whitespace-nowrap">
          {BRAND_INFO.name || 'KevixClothing'}
        </div>
      </Link>

      {/* Center Navigation Links (Desktop >= 768px) */}
      <nav className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-widest font-semibold">
        <Link 
          to="/" 
          className={`transition-colors min-h-[44px] flex items-center relative py-1 ${
            isHomePage
              ? 'font-bold underline underline-offset-8 decoration-2'
              : hasSolidNav ? 'text-black/60 hover:text-black' : 'text-white/80 hover:text-white'
          }`}
        >
          Runway
        </Link>

        <Link 
          to="/collection" 
          className={`transition-colors min-h-[44px] flex items-center relative py-1 ${
            isCollectionPage
              ? 'font-bold underline underline-offset-8 decoration-2'
              : hasSolidNav ? 'text-black/60 hover:text-black' : 'text-white/80 hover:text-white'
          }`}
        >
          Collection
        </Link>

        <Link 
          to="/campaign" 
          className={`transition-colors min-h-[44px] flex items-center relative py-1 ${
            isCampaignPage
              ? 'font-bold underline underline-offset-8 decoration-2'
              : hasSolidNav ? 'text-black/60 hover:text-black' : 'text-white/80 hover:text-white'
          }`}
        >
          Campaign
        </Link>
      </nav>

      {/* Right: Quick Links + Shopping Bag Pill with Ergonomic Touch Target (>= 44x44px) */}
      <div className="flex items-center gap-2">
        
        {/* Mobile Page Navigator Pills (Visible on small screens) */}
        <div className="flex md:hidden items-center gap-1">
          <Link
            to="/collection"
            className={`text-[10px] font-mono uppercase tracking-wider font-bold px-2.5 py-1.5 rounded-full border transition-all ${
              isCollectionPage
                ? 'bg-[#1A1A1A] text-white border-black'
                : hasSolidNav
                ? 'border-black/15 text-[#1A1A1A] hover:bg-black/5'
                : 'border-white/25 text-white hover:bg-white/10'
            }`}
          >
            Archive
          </Link>

          <Link
            to="/campaign"
            className={`text-[10px] font-mono uppercase tracking-wider font-bold px-2.5 py-1.5 rounded-full border transition-all ${
              isCampaignPage
                ? 'bg-[#1A1A1A] text-white border-black'
                : hasSolidNav
                ? 'border-black/15 text-[#1A1A1A] hover:bg-black/5'
                : 'border-white/25 text-white hover:bg-white/10'
            }`}
          >
            Films
          </Link>
        </div>

        {/* Bag Trigger Button */}
        <button
          type="button"
          onClick={onOpenCart}
          aria-label={`Open Shopping Bag (${cartCount} items)`}
          className={`min-h-[44px] min-w-[44px] px-3 sm:px-4 py-2 rounded-full border text-xs sm:text-sm font-bold flex items-center gap-1.5 sm:gap-2 cursor-pointer transition-all active:scale-95 shadow-sm ${
            hasSolidNav 
              ? 'border-black/15 bg-white text-[#1A1A1A] hover:border-black' 
              : 'border-white/25 bg-black/40 text-white hover:border-white'
          }`}
        >
          <ShoppingBag className="w-4 h-4 stroke-[2]" />
          <span className="hidden sm:inline font-sans">Bag</span>
          <span className={`w-5 h-5 rounded-full text-[11px] font-bold flex items-center justify-center font-mono ${
            hasSolidNav ? 'bg-[#1A1A1A] text-white' : 'bg-white text-black'
          }`}>
            {cartCount}
          </span>
        </button>
      </div>

    </header>
  );
}
