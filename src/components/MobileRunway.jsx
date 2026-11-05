import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause, ArrowRight, X, ArrowUpRight } from 'lucide-react';
import { ShopPanel } from './ShopPanel';

export function MobileRunway({
  looks,
  currentLookIndex,
  onSelectLook,
  expandedPieceId,
  onToggleExpandPiece,
  onAddToCart,
  onAddLookToCart,
  cartItems = []
}) {
  const currentLook = looks[currentLookIndex];
  const [showPins, setShowPins] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progressPercent, setProgressPercent] = useState(0);
  const [isBarVisible, setIsBarVisible] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const containerRef = useRef(null);

  // Show floating action bar only when user has reached the runway catwalk stage
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsBarVisible(entry.isIntersecting);
      },
      {
        threshold: 0.05,
        rootMargin: '-56px 0px -40px 0px'
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Auto-advance every 5 seconds on mobile
  useEffect(() => {
    if (!isPlaying) return;

    const totalDuration = 5000;
    const intervalMs = 50;
    let elapsed = 0;

    const timer = setInterval(() => {
      elapsed += intervalMs;
      const pct = Math.min(100, (elapsed / totalDuration) * 100);
      setProgressPercent(pct);

      if (elapsed >= totalDuration) {
        elapsed = 0;
        setProgressPercent(0);
        onSelectLook((prev) => (prev + 1) % looks.length);
      }
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isPlaying, currentLookIndex, looks.length, onSelectLook]);

  useEffect(() => {
    setProgressPercent(0);
  }, [currentLookIndex]);

  const prevIndex = (currentLookIndex - 1 + looks.length) % looks.length;
  const nextIndex = (currentLookIndex + 1) % looks.length;

  const handlePrev = () => {
    onSelectLook((prev) => (prev - 1 + looks.length) % looks.length);
  };

  const handleNext = () => {
    onSelectLook((prev) => (prev + 1) % looks.length);
  };

  const totalLookPrice = currentLook.pieces.reduce((sum, p) => sum + p.price, 0);

  const handleAddFullLook = () => {
    if (onAddLookToCart) {
      const itemsToAdd = currentLook.pieces.map((piece) => ({
        id: `${piece.id}-${piece.sizes.find(s => s.inStock)?.label || piece.sizes[0]?.label}`,
        pieceId: piece.id,
        name: piece.name,
        price: piece.price,
        size: piece.sizes.find(s => s.inStock)?.label || piece.sizes[0]?.label,
        thumbnail: piece.thumbnail,
        lookTitle: currentLook.title,
        lookNumber: currentLook.number,
        brand: piece.brand
      }));
      onAddLookToCart(itemsToAdd);
    }
  };

  return (
    <div ref={containerRef} className="lg:hidden flex flex-col bg-[#F4EFEA] min-h-[calc(100svh-56px)] select-none pb-28">
      
      {/* Top Mobile Editorial Header: Centered */}
      <div className="px-6 pt-6 pb-2 text-center">
        <h1 className="font-serif text-3xl sm:text-4xl text-[#1A1A1A] leading-tight">
          Shop with us.
        </h1>
        <p className="text-sm text-black/65 mt-1">
          {looks.length} looks, styled head to toe. Tap one to see every piece.
        </p>
      </div>

      {/* Swipeable Runway Stage Container */}
      <div className="relative w-full h-[52vh] min-h-[360px] max-h-[480px] overflow-hidden flex items-center justify-center my-2">
        
        {/* Previous Model Peeking from Left */}
        <div 
          onClick={handlePrev}
          className="absolute left-0 h-[85%] aspect-[9/16] opacity-80 cursor-pointer pointer-events-auto"
          style={{
            transform: 'translateX(-55%) scale(0.82)',
            filter: 'blur(4px)',
            zIndex: 10
          }}
        >
          <img
            src={looks[prevIndex].modelImage}
            alt={looks[prevIndex].title}
            className="w-full h-full object-cover object-top rounded-xl"
          />
        </div>

        {/* Next Model Peeking from Right */}
        <div 
          onClick={handleNext}
          className="absolute right-0 h-[85%] aspect-[9/16] opacity-80 cursor-pointer pointer-events-auto"
          style={{
            transform: 'translateX(55%) scale(0.82)',
            filter: 'blur(4px)',
            zIndex: 10
          }}
        >
          <img
            src={looks[nextIndex].modelImage}
            alt={looks[nextIndex].title}
            className="w-full h-full object-cover object-top rounded-xl"
          />
        </div>

        {/* Center Active Model with Drag & Tap */}
        <motion.div
          key={currentLook.id}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={(e, { offset, velocity }) => {
            const swipeThreshold = 40;
            if (offset.x < -swipeThreshold || velocity.x < -300) {
              handleNext();
            } else if (offset.x > swipeThreshold || velocity.x > 300) {
              handlePrev();
            }
          }}
          onClick={() => setIsSheetOpen(true)}
          initial={{ opacity: 0.8, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
          className="relative h-full aspect-[9/16] z-20 cursor-pointer rounded-2xl overflow-hidden shadow-sm active:scale-98"
        >
          <img
            src={currentLook.modelImage}
            alt={currentLook.title}
            className="w-full h-full object-cover object-top pointer-events-none select-none"
            draggable={false}
          />

          {/* Contact shadow */}
          <div className="absolute -bottom-2 inset-x-8 h-4 bg-black/15 blur-md rounded-full pointer-events-none" />

          {/* Tap hint overlay */}
          <div className="absolute bottom-3 inset-x-0 text-center pointer-events-none">
            <span className="bg-white/95 backdrop-blur-md text-[10px] tracking-wider uppercase font-bold px-3.5 py-1.5 rounded-full text-[#1A1A1A] shadow-md border border-black/10 inline-flex items-center gap-1.5">
              <span>Tap model to view look</span>
              <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
        </motion.div>

      </div>

      {/* Compact Mobile Scrubber Bar: ← 01 [────] 02 Bubble... 03 04 05 06 || → */}
      <div className="px-6 py-2.5 flex items-center justify-between border-y border-black/10 bg-[#F4EFEA]">
        {/* Left Arrow */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous look"
          className="w-7 h-7 rounded-full border border-black/15 flex items-center justify-center text-[#1A1A1A] bg-white/50 active:scale-95"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>

        {/* Segments 01 through 06 */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {looks.map((look, idx) => {
            const isActive = idx === currentLookIndex;
            return (
              <button
                key={look.id}
                type="button"
                onClick={() => onSelectLook(idx)}
                className="flex items-center text-xs font-mono"
              >
                <span className={isActive ? 'font-bold text-[#1A1A1A]' : 'text-black/40'}>
                  {look.number}
                </span>

                {isActive && (
                  <div className="flex items-center ml-1.5 mr-1">
                    <div className="w-10 h-[2px] bg-black/15 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#1A1A1A]"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                    <span className="text-[11px] font-sans font-medium text-[#1A1A1A] ml-1.5 truncate max-w-[65px]">
                      {look.title}
                    </span>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Play / Pause Toggle & Next Arrow */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? "Pause" : "Play"}
            className="w-7 h-7 rounded-full border border-black/15 flex items-center justify-center text-[#1A1A1A] bg-white/50 active:scale-95"
          >
            {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 ml-0.5" />}
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next look"
            className="w-7 h-7 rounded-full border border-black/15 flex items-center justify-center text-[#1A1A1A] bg-white/50 active:scale-95"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Tap Model CTA & Piece Counter */}
      <div className="px-6 py-4 flex flex-col items-center justify-center">
        <button
          type="button"
          onClick={() => setIsSheetOpen(true)}
          className="w-full max-w-sm py-3 px-5 rounded-full bg-white hover:bg-[#FAF6F1] border border-black/15 text-xs font-bold uppercase tracking-wider text-[#1A1A1A] shadow-sm flex items-center justify-between active:scale-95 cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <span>View {currentLook.title} Pieces</span>
            <span className="w-5 h-5 rounded-full bg-[#1A1A1A] text-white text-[10px] flex items-center justify-center font-mono">
              {currentLook.pieces.length}
            </span>
          </span>
          <span className="text-black/50 text-[11px] font-mono">${totalLookPrice.toFixed(2)} →</span>
        </button>
      </div>

      {/* Pop-up Bottom Sheet Modal for "In this look" (Only when model is clicked) */}
      <AnimatePresence>
        {isSheetOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSheetOpen(false)}
              className="fixed inset-0 z-50 bg-black/45 backdrop-blur-sm"
            />

            {/* Slide-up Bottom Sheet */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="fixed inset-x-0 bottom-0 z-50 max-h-[85vh] bg-[#F4EFEA] rounded-t-3xl shadow-2xl flex flex-col overflow-hidden border-t border-black/15 select-none"
            >
              {/* Sheet Header */}
              <div className="relative pt-3 pb-3 px-6 flex items-center justify-between border-b border-black/10 bg-[#F4EFEA]">
                <div className="w-10 h-1 bg-black/20 rounded-full mx-auto absolute left-1/2 -translate-x-1/2 top-2.5" />
                <div className="pt-2">
                  <span className="text-[11px] uppercase font-mono tracking-widest text-black/50 font-bold block">
                    LOOK {currentLook.number} · {currentLook.pieces.length} PIECES
                  </span>
                  <h3 className="font-serif text-xl font-normal text-[#1A1A1A] mt-0.5">
                    {currentLook.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsSheetOpen(false)}
                  aria-label="Close look details"
                  className="w-8 h-8 rounded-full bg-white border border-black/15 flex items-center justify-center text-[#1A1A1A] cursor-pointer active:scale-90 shadow-sm"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable Shop Content */}
              <div className="flex-1 overflow-y-auto">
                <ShopPanel
                  look={currentLook}
                  isMobile={true}
                  onCloseInspect={() => setIsSheetOpen(false)}
                  expandedPieceId={expandedPieceId}
                  onToggleExpandPiece={onToggleExpandPiece}
                  onAddToCart={onAddToCart}
                  onAddLookToCart={(items) => {
                    onAddLookToCart(items);
                    setIsSheetOpen(false);
                  }}
                  cartItems={cartItems}
                />
              </div>

              {/* Bottom Sticky Action inside sheet */}
              <div className="p-4 pb-6 bg-[#F4EFEA] border-t border-black/10">
                <button
                  type="button"
                  onClick={() => {
                    handleAddFullLook();
                    setIsSheetOpen(false);
                  }}
                  className="w-full h-12 bg-[#1A1A1A] text-white px-5 rounded-full flex items-center justify-between shadow-xl cursor-pointer active:scale-98"
                >
                  <span className="text-xs font-bold">
                    Add full look to bag · ${totalLookPrice.toFixed(2)}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Pinned Floating Dark Bar at Bottom of Screen (Only visible when catwalk stage is in view AND sheet is NOT open) */}
      <AnimatePresence>
        {!isSheetOpen && isBarVisible && (
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={handleAddFullLook}
            className="fixed bottom-4 inset-x-4 z-40 h-12 bg-[#1A1A1A] text-white px-5 flex items-center justify-between shadow-xl rounded-full cursor-pointer active:scale-98"
          >
            <span className="text-xs font-medium">
              Add full look to bag · ${totalLookPrice.toFixed(2)}
            </span>
            <ArrowRight className="w-4 h-4" />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

