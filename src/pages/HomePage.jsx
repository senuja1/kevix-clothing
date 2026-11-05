import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeroSection } from '../components/HeroSection';
import { RunwayStage } from '../components/RunwayStage';
import { ShopPanel } from '../components/ShopPanel';
import { MobileRunway } from '../components/MobileRunway';
import { CampaignVideos } from '../components/CampaignVideos';
import { LOOKS_DATA } from '../data/looksData';

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
