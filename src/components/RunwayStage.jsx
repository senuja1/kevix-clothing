import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ChevronDown, Play, Pause, ArrowUpRight } from 'lucide-react';

export function RunwayStage({
  looks,
  currentLookIndex,
  onSelectLook,
  isInspecting,
  setIsInspecting,
  expandedPieceId,
  onSelectPiece
}) {
  const currentLook = looks[currentLookIndex];
  const [isAutoWalking, setIsAutoWalking] = useState(true);
  const [progressPercent, setProgressPercent] = useState(0);

  // Auto-advance runway every 5 seconds (auto-pauses when isInspecting === true)
  useEffect(() => {
    if (!isAutoWalking || isInspecting) return;

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
  }, [isAutoWalking, isInspecting, currentLookIndex, looks.length, onSelectLook]);

  // Reset progress bar on manual look change
  useEffect(() => {
    setProgressPercent(0);
  }, [currentLookIndex]);

  // Keyboard navigation [Left] [Right] [Space] [Escape]
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        onSelectLook((prev) => (prev + 1) % looks.length);
      } else if (e.key === 'ArrowLeft') {
        onSelectLook((prev) => (prev - 1 + looks.length) % looks.length);
      } else if (e.key === ' ') {
        e.preventDefault();
        setIsAutoWalking((prev) => !prev);
      } else if (e.key === 'Escape' && isInspecting) {
        setIsInspecting(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [looks.length, onSelectLook, isInspecting, setIsInspecting]);

  const handlePrev = () => {
    onSelectLook((prev) => (prev - 1 + looks.length) % looks.length);
  };

  const handleNext = () => {
    onSelectLook((prev) => (prev + 1) % looks.length);
  };

  // Transition physics specified: spring, stiffness 110, damping 20, mass 1
  const springTransition = {
    type: "spring",
    stiffness: 110,
    damping: 20,
    mass: 1
  };

  return (
    <div className={`relative flex flex-col justify-between p-6 sm:p-10 select-none h-full bg-[#F4EFEA] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
      isInspecting ? 'w-full lg:w-[62%]' : 'w-full lg:w-full'
    }`}>
      
      {/* Top Editorial Header: Centered */}
      <div className="relative z-10 text-center flex flex-col items-center">
        <AnimatePresence mode="wait">
          {!isInspecting ? (
            <motion.div
              key="runway-header"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <h1 className="font-serif text-5xl sm:text-6xl text-[#1A1A1A] leading-tight">
                Shop with us.
              </h1>
              <p className="font-sans text-base sm:text-lg text-black/65 mt-1.5">
                {looks.length} looks. Tap one to shop.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="inspect-header"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <span className="font-mono text-xs uppercase tracking-[0.25em] font-bold text-[#8C8680] block mb-1.5">
                LOOK {currentLook.number}
              </span>
              <h1 className="font-serif text-5xl sm:text-6xl text-[#1A1A1A] leading-tight">
                {currentLook.title}.
              </h1>
              <p className="font-sans text-base sm:text-lg text-black/65 mt-1.5">
                {currentLook.subtitle || "Styled head to toe. Tap a dot to shop the piece."}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* The 2.5D Model Runway Queue Container */}
      <div className="relative flex-1 w-full flex items-center justify-center min-h-[380px] sm:min-h-[460px] py-4">
        <div className="relative w-full h-[58vh] min-h-[380px] max-h-[620px] flex items-end justify-center">

          {looks.map((look, index) => {
            // Calculate circular offset from currentLookIndex
            const offset = (index - currentLookIndex + looks.length) % looks.length;

            // Only render up to queue slot 3 (offset 0, 1, 2, 3)
            if (offset > 3) return null;

            const isActive = offset === 0;

            // Calculate exact position, scale, opacity, blur, zIndex
            let animateProps;
            if (isInspecting) {
              if (isActive) {
                // Active Model in Inspect Mode: centers horizontally (x: 0%, scale: 1.03)
                animateProps = {
                  x: "0%",
                  y: "0%",
                  scale: 1.03,
                  opacity: 1,
                  filter: "blur(0px)",
                  zIndex: 30,
                  pointerEvents: "auto"
                };
              } else {
                // Background queued models smoothly fade out
                animateProps = {
                  x: offset === 1 ? "-18%" : offset === 2 ? "-44%" : "-64%",
                  y: `${offset * 4}%`,
                  scale: 0.9,
                  opacity: 0,
                  filter: "blur(6px)",
                  zIndex: 20 - offset * 5,
                  pointerEvents: "none"
                };
              }
            } else {
              // Runway Mode
              if (isActive) {
                animateProps = {
                  x: "14%",
                  y: "0%",
                  scale: 1,
                  opacity: 1,
                  filter: "blur(0px)",
                  zIndex: 30,
                  pointerEvents: "auto"
                };
              } else if (offset === 1) {
                animateProps = {
                  x: "-18%",
                  y: "4%",
                  scale: 0.78,
                  opacity: 0.9,
                  filter: "blur(2.5px)",
                  zIndex: 20,
                  pointerEvents: "auto"
                };
              } else if (offset === 2) {
                animateProps = {
                  x: "-44%",
                  y: "8%",
                  scale: 0.60,
                  opacity: 0.75,
                  filter: "blur(5px)",
                  zIndex: 10,
                  pointerEvents: "auto"
                };
              } else if (offset === 3) {
                animateProps = {
                  x: "-64%",
                  y: "12%",
                  scale: 0.46,
                  opacity: 0.5,
                  filter: "blur(7px)",
                  zIndex: 5,
                  pointerEvents: "auto"
                };
              }
            }

            return (
              <motion.div
                key={look.id}
                animate={animateProps}
                transition={springTransition}
                onClick={() => {
                  if (isActive) {
                    setIsInspecting(true);
                  } else {
                    onSelectLook(index);
                  }
                }}
                className={`absolute bottom-0 h-full max-h-[580px] aspect-[9/16] flex flex-col items-center justify-end ${
                  isActive ? 'cursor-pointer group' : 'cursor-pointer hover:opacity-100'
                }`}
                style={{ transformOrigin: "bottom center" }}
              >
                {/* Contact Shadow under Model's Feet */}
                <div className="absolute -bottom-2 w-[70%] h-6 bg-black/15 blur-md rounded-full pointer-events-none" />

                {/* Model Image Frame */}
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  <img
                    src={look.modelImage}
                    alt={`Model wearing ${look.title}`}
                    className="w-full h-full object-cover object-top select-none pointer-events-none"
                    draggable={false}
                  />

                  {/* Runway Mode Floating Badge on Hover of Active Model */}
                  {isActive && !isInspecting && (
                    <div className="absolute inset-0 bg-transparent group-hover:bg-black/10 transition-colors flex items-center justify-center pointer-events-none">
                      <div className="opacity-0 group-hover:opacity-100 transition-all duration-200 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full shadow-xl text-xs font-bold text-[#1A1A1A] border border-black/15 flex items-center gap-1.5 group-hover:scale-105">
                        <span>Click model to view look</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  )}

                  {/* Inspect Mode: Numbered Hotspot Pins */}
                  {isActive && isInspecting && (
                    <div className="absolute inset-0 pointer-events-auto">
                      {look.pieces.map((piece) => {
                        const isPieceSelected = expandedPieceId === piece.id;

                        return (
                          <div
                            key={piece.id}
                            className="absolute -translate-x-1/2 -translate-y-1/2"
                            style={{
                              left: `${piece.hotspot.x}%`,
                              top: `${piece.hotspot.y}%`
                            }}
                          >
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (onSelectPiece) onSelectPiece(piece.id);
                              }}
                              aria-label={`Select ${piece.name}`}
                              className={`w-8 h-8 rounded-full bg-white text-[#1A1A1A] text-xs font-semibold shadow-md flex items-center justify-center hover:scale-110 transition cursor-pointer ${
                                isPieceSelected
                                  ? 'ring-2 ring-[#1A1A1A] ring-offset-2 scale-110'
                                  : 'hover:bg-[#FAF6F1]'
                              }`}
                            >
                              <span>{piece.pinNumber}</span>
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}

        </div>
      </div>

      {/* Inspect Mode Helper Caption */}
      <div className="relative z-10 min-h-[20px] text-center mb-2">
        <AnimatePresence>
          {isInspecting && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.25 }}
              className="text-[11px] tracking-[0.2em] uppercase text-black/50 font-sans"
            >
              TAP A DOT TO SHOP THE PIECE
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Runway Scrubber Bar */}
      <div className="relative z-20 w-full pt-4 border-t border-black/5 flex items-center justify-between">
        
        {/* Left: Numbered Items 01 through 06 with horizontal progress fill for active */}
        <div className="flex items-center gap-4 sm:gap-6">
          {looks.map((look, idx) => {
            const isActive = idx === currentLookIndex;

            return (
              <button
                key={look.id}
                type="button"
                onClick={() => {
                  onSelectLook(idx);
                }}
                className="flex items-center group cursor-pointer focus:outline-none"
              >
                <span
                  className={`font-mono text-sm transition-colors ${
                    isActive ? 'font-bold text-[#1A1A1A]' : 'text-black/40 hover:text-black'
                  }`}
                >
                  {look.number}
                </span>

                {/* Expanding progress line for active look */}
                {isActive && (
                  <div className="w-16 sm:w-24 h-[2px] bg-black/15 rounded-full overflow-hidden ml-2 sm:ml-2.5">
                    <div
                      className="h-full bg-[#1A1A1A] transition-all duration-75"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Center: Scroll down cue to campaign films */}
        <button
          type="button"
          onClick={() => {
            const el = document.getElementById('campaign-films');
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
            } else {
              window.scrollTo({ top: window.innerHeight - 56, behavior: 'smooth' });
            }
          }}
          className="hidden md:flex items-center gap-1.5 text-xs sm:text-sm font-mono tracking-wider uppercase text-black/50 hover:text-black font-semibold transition cursor-pointer"
        >
          <span>Clothes on models</span>
          <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
        </button>

        {/* Right side of scrubber: Play/Pause button + Previous/Next arrows */}
        <div className="flex items-center gap-2">
          {/* Play / Pause Toggle */}
          <button
            type="button"
            onClick={() => setIsAutoWalking(!isAutoWalking)}
            aria-label={isAutoWalking ? "Pause runway" : "Play runway"}
            className="w-8 h-8 rounded-full border border-black/15 hover:border-black flex items-center justify-center text-[#1A1A1A] bg-white/50 transition active:scale-95 cursor-pointer shadow-sm"
          >
            {isAutoWalking && !isInspecting ? (
              <Pause className="w-3.5 h-3.5" />
            ) : (
              <Play className="w-3.5 h-3.5 ml-0.5" />
            )}
          </button>

          {/* Previous Arrow */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous look"
            className="w-8 h-8 rounded-full border border-black/15 hover:border-black flex items-center justify-center text-[#1A1A1A] bg-white/50 transition active:scale-95 cursor-pointer shadow-sm"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Next Arrow */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next look"
            className="w-8 h-8 rounded-full border border-black/15 hover:border-black flex items-center justify-center text-[#1A1A1A] bg-white/50 transition active:scale-95 cursor-pointer shadow-sm"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
}
