import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { HeroSection } from '../components/HeroSection';
import { RunwayStage } from '../components/RunwayStage';
import { ShopPanel } from '../components/ShopPanel';
import { MobileRunway } from '../components/MobileRunway';
import { CampaignVideos } from '../components/CampaignVideos';
import { LOOKS_DATA, ARCHIVE_PRODUCTS } from '../data/looksData';

export function HomePage({
  currentLookIndex,
  handleSelectLook,
  isInspecting,
  setIsInspecting,
  expandedPieceId,
  handleSelectPiece,
  handleToggleExpandPiece,
  handleAddToCart,
  handleAddLookToCart,
  cartItems,
  currentLook
}) {
  return (
    <div className="w-full max-w-full overflow-x-hidden">
      
      {/* Cinematic KVX CLOTHING Runway Hero Banner */}
      <HeroSection />

      {/* Catwalk Runway Stage Anchor ("Shop with us") */}
      <div id="catwalk-stage" className="w-full">
        {/* Desktop Stage (>= 1024px): Full Viewport Height minus Navbar */}
        <div className="hidden lg:flex w-full h-[calc(100svh-56px)] overflow-hidden bg-[#F4EFEA] relative">
          
          {/* Left Runway Canvas */}
          <RunwayStage
            looks={LOOKS_DATA}
            currentLookIndex={currentLookIndex}
            onSelectLook={handleSelectLook}
            isInspecting={isInspecting}
            setIsInspecting={setIsInspecting}
            expandedPieceId={expandedPieceId}
            onSelectPiece={handleSelectPiece}
          />

          {/* Right Shop Panel ("In this look") */}
          <AnimatePresence>
            {isInspecting && (
              <motion.div 
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "100%", opacity: 0 }}
                transition={{ type: "spring", damping: 28, stiffness: 260 }}
                className="w-[38%] border-l border-black/10 bg-[#F4EFEA] h-full flex flex-col justify-between relative overflow-hidden z-20 shadow-[-12px_0_35px_rgba(0,0,0,0.06)]"
              >
                <ShopPanel
                  look={currentLook}
                  isInspecting={isInspecting}
                  onCloseInspect={() => setIsInspecting(false)}
                  expandedPieceId={expandedPieceId}
                  onToggleExpandPiece={handleToggleExpandPiece}
                  onAddToCart={handleAddToCart}
                  onAddLookToCart={handleAddLookToCart}
                  cartItems={cartItems}
                  isMobile={false}
                />
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* Mobile Layout (< 1024px) */}
        <MobileRunway
          looks={LOOKS_DATA}
          currentLookIndex={currentLookIndex}
          onSelectLook={handleSelectLook}
          expandedPieceId={expandedPieceId}
          onToggleExpandPiece={handleToggleExpandPiece}
          onAddToCart={handleAddToCart}
          onAddLookToCart={handleAddLookToCart}
          cartItems={cartItems}
        />
      </div>

      {/* Editorial Teaser Banner: Invitation to Dedicated Collection Page */}
      <section className="w-full bg-[#FAF6F1] border-y border-black/10 py-16 sm:py-20 px-4 sm:px-8 lg:px-14 select-none">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-black/15 bg-white text-[11px] font-mono uppercase tracking-[0.2em] text-black/70">
              <Sparkles className="w-3 h-3 text-[#1A1A1A]" />
              <span>Full Archive Available</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl text-[#1A1A1A] leading-tight">
              The FW26 Collection.
            </h2>
            <p className="text-black/65 text-sm sm:text-base leading-relaxed">
              Explore our complete catalogue of 12 architectural pieces: from 14oz shuttle loom selvedge denim to contoured zip corsets and essential jerseys.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link
              to="/collection"
              className="px-8 py-4 rounded-full bg-[#1A1A1A] text-white hover:bg-black transition-all font-mono text-xs uppercase tracking-widest font-bold shadow-lg hover:shadow-xl active:scale-95 flex items-center gap-3 min-h-[44px] cursor-pointer"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>

        {/* 4-Item Mini Teaser Grid on Home Page */}
        <div className="max-w-7xl mx-auto mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6">
          {ARCHIVE_PRODUCTS.slice(0, 4).map((item) => (
            <Link
              key={item.id}
              to="/collection"
              className="group block"
            >
              <div className="aspect-[4/5] rounded-xl overflow-hidden bg-[#EAE4DC] border border-black/10 relative">
                <img
                  src={item.primaryImage}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-white/90 backdrop-blur-md text-[10px] font-mono font-bold uppercase tracking-wider text-[#1A1A1A]">
                  {item.category}
                </span>
              </div>
              <div className="mt-2.5 flex items-baseline justify-between text-xs">
                <h4 className="font-medium text-[#1A1A1A] truncate pr-2 group-hover:underline">
                  {item.name}
                </h4>
                <span className="font-mono font-bold text-black/75">
                  ${item.price.toFixed(2)}
                </span>
              </div>
            </Link>
          ))}
        </div>

      </section>

      {/* Video Campaign Section ("Our Clothes on Models.") */}
      <CampaignVideos
        onSelectLookAndShop={(lookIdx) => {
          handleSelectLook(lookIdx);
          setIsInspecting(true);
          document.getElementById('catwalk-stage')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

    </div>
  );
}
