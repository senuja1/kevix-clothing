import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export function HeroSection() {
  const handleScrollToCatwalk = () => {
    const el = document.getElementById('catwalk-stage');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: window.innerHeight - 56, behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero-banner"
      className="relative w-full h-[calc(100svh-56px)] min-h-[480px] max-h-[920px] flex flex-col justify-end overflow-hidden bg-black select-none border-b border-black/15"
    >
      {/* Background Cinematic Runway Photo with KVX CLOTHING Wordmark */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <picture className="w-full h-full block">
          <source media="(max-width: 768px)" srcSet="/hero/kvx_runway_hero_mobile.jpg" />
          <motion.img 
            initial={{ scale: 1.05, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            src="/hero/kvx_runway_hero.jpg" 
            alt="KVX Clothing Runway" 
            className="w-full h-full object-cover object-center cursor-pointer"
            onClick={handleScrollToCatwalk}
          />
        </picture>
        {/* Subtle Vignette Gradients */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/60 via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none" />
      </div>

      {/* Bottom Cue to Enter Runway Stage: Animated Down Arrow Only */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 pb-8 sm:pb-12 flex flex-col items-center justify-center pointer-events-none"
      >
        <button
          type="button"
          onClick={handleScrollToCatwalk}
          aria-label="Scroll down to runway"
          className="pointer-events-auto group p-3 rounded-full text-white/80 hover:text-white transition-all duration-300 hover:scale-110 active:scale-90 cursor-pointer"
        >
          <ChevronDown className="w-8 h-8 sm:w-10 sm:h-10 animate-bounce stroke-[1.5] filter drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]" />
        </button>
      </motion.div>

    </section>
  );
}
