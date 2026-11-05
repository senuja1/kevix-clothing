import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  ArrowLeft, 
  ChevronLeft,
  ChevronRight,
  ShoppingBag, 
  Check, 
  Layers 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { BRAND_INFO } from '../data/looksData';

export function CampaignPage({ onAddToCart }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progresses, setProgresses] = useState({});
  const [addedItemFeedback, setAddedItemFeedback] = useState({});
  const [activeVideoModal, setActiveVideoModal] = useState(null);

  const videoRefs = useRef({});
  const carouselRef = useRef(null);
  const [carouselWidth, setCarouselWidth] = useState(1200);

  const campaignFilms = [
    {
      id: "film-04",
      title: "Director's Cut · Raw Denim in Motion",
      subtitle: "Full-motion drape test of unwashed raw selvedge denim in natural studio light.",
      videoSrc: "/videos/campaign_feature.mp4",
      poster: "/videos/thumb_4.jpg",
      duration: "0:12",
      tag: "Featured Premiere",
      lookNumber: "05",
      product: {
        id: "p-501",
        name: "True waist baggy jean (Unisex)",
        price: 98.00,
        size: "32",
        thumbnail: "/products/raw_waist_baggy.jpg",
        brand: "KevixClothing"
      }
    },
    {
      id: "film-01",
      title: "Indigo Sculpt · Front & Profile",
      subtitle: "Sculpted raw denim corset crop top with brass zipper.",
      videoSrc: "/videos/reel_01.mp4",
      poster: "/videos/thumb_1.jpg",
      duration: "0:15",
      tag: "Look 01",
      lookNumber: "01",
      product: {
        id: "p-101",
        name: "Zip up corset top",
        price: 78.00,
        size: "S",
        thumbnail: "/products/crop_top_denim.jpg",
        brand: "KevixClothing"
      }
    },
    {
      id: "film-02",
      title: "Wide-Leg Selvedge · Walking Stride",
      subtitle: "Cropped black Tee paired with True waist baggy jean (Unisex).",
      videoSrc: "/videos/reel_02.mp4",
      poster: "/videos/thumb_2.jpg",
      duration: "0:18",
      tag: "Look 02",
      lookNumber: "02",
      product: {
        id: "p-202",
        name: "True waist baggy jean (Unisex)",
        price: 98.00,
        size: "32",
        thumbnail: "/products/kvx_wide_denim.jpg",
        brand: "KevixClothing"
      }
    },
    {
      id: "film-03",
      title: "Studio Essential · Back & Turn",
      subtitle: "Cropped white Tee paired with True waist baggy jean (Unisex).",
      videoSrc: "/videos/reel_03.mp4",
      poster: "/videos/thumb_3.jpg",
      duration: "0:14",
      tag: "Look 03",
      lookNumber: "03",
      product: {
        id: "p-301",
        name: "Cropped white Tee",
        price: 48.00,
        size: "M",
        thumbnail: "/products/kvx_white_tee.jpg",
        brand: "KevixClothing"
      }
    }
  ];

  // Measure carousel container width for pixel-perfect centering
  useEffect(() => {
    const updateWidth = () => {
      if (carouselRef.current) {
        setCarouselWidth(carouselRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Sync video play/pause with active carousel card
  useEffect(() => {
    campaignFilms.forEach((_, i) => {
      const vid = videoRefs.current[i];
      if (!vid) return;
      if (i === activeIndex) {
        if (isPlaying) {
          vid.play().catch(() => {});
        } else {
          vid.pause();
        }
      } else {
        vid.pause();
      }
    });
  }, [activeIndex, isPlaying]);

  // Keyboard navigation for carousel
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeVideoModal) return;
      if (e.key === 'ArrowRight') {
        setActiveIndex((prev) => (prev + 1) % campaignFilms.length);
      } else if (e.key === 'ArrowLeft') {
        setActiveIndex((prev) => (prev - 1 + campaignFilms.length) % campaignFilms.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeVideoModal, campaignFilms.length]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + campaignFilms.length) % campaignFilms.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % campaignFilms.length);
  };

  const togglePlay = () => {
    const currentVid = videoRefs.current[activeIndex];
    if (!currentVid) return;
    if (isPlaying) {
      currentVid.pause();
      setIsPlaying(false);
    } else {
      currentVid.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const handleQuickAdd = (product) => {
    if (onAddToCart) {
      onAddToCart({
        id: `${product.id}-${product.size}`,
        pieceId: product.id,
        name: product.name,
        price: product.price,
        size: product.size,
        thumbnail: product.thumbnail,
        lookTitle: "Campaign Premiere",
        lookNumber: "CAMPAIGN",
        brand: product.brand || BRAND_INFO.name
      });
    }

    setAddedItemFeedback((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItemFeedback((prev) => ({ ...prev, [product.id]: false }));
    }, 1800);
  };

  // Responsive card calculations
  const isLarge = carouselWidth >= 1024;
  const isMedium = carouselWidth >= 640;
  const cardWidth = isLarge ? 350 : isMedium ? 310 : Math.min(carouselWidth * 0.82, 290);
  const cardGap = isLarge ? 36 : isMedium ? 24 : 16;
  const offset = (carouselWidth / 2) - (activeIndex * (cardWidth + cardGap) + cardWidth / 2);

  return (
    <div className="w-full min-h-screen bg-[#F4EFEA] pt-28 sm:pt-32 pb-20 select-none overflow-x-hidden flex flex-col items-center">
      
      {/* Top Breadcrumb Bar */}
      <div className="w-full max-w-7xl 2xl:max-w-[1540px] mx-auto px-4 sm:px-8 lg:px-12 mb-6 sm:mb-8">
        <div className="flex items-center justify-between pb-6 border-b border-black/10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-black/60 hover:text-black transition-colors min-h-[44px] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2]" />
            <span>Return to Runway</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-black/50">
              4K CAMPAIGN VAULT · FW26
            </span>
          </div>
        </div>
      </div>

      {/* Page Hero Title: Dedicated Centered Header Block */}
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-8 text-center flex flex-col items-center justify-center">
        <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-serif tracking-tight text-black leading-tight text-center">
          The Campaign Films.
        </h1>

        <p className="max-w-2xl mx-auto text-center text-base text-neutral-600 leading-relaxed mt-6 mb-12">
          Raw selvedge denim in motion. Watch the true weight, natural puddle drape, and brass accents recorded directly on models under authentic studio lighting.
        </p>
      </div>

      {/* Premium Horizontally Scrolling Framer Motion Video Carousel */}
      <div className="w-full max-w-7xl 2xl:max-w-[1540px] mx-auto px-4 sm:px-8 mb-16 relative">
        
        {/* Floating Navigation Arrows (Desktop >= 768px) */}
        <div className="hidden md:flex items-center justify-between absolute top-1/2 -translate-y-1/2 inset-x-4 lg:inset-x-8 z-30 pointer-events-none">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous Film"
            className="pointer-events-auto w-12 h-12 rounded-full bg-white/90 hover:bg-white text-black shadow-xl border border-black/10 flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-md"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next Film"
            className="pointer-events-auto w-12 h-12 rounded-full bg-white/90 hover:bg-white text-black shadow-xl border border-black/10 flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-md"
          >
            <ChevronRight className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Carousel Viewport Container */}
        <div 
          ref={carouselRef}
          className="w-full overflow-hidden py-6 sm:py-8"
        >
          <motion.div
            className="flex items-center"
            animate={{ x: offset }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            style={{ gap: `${cardGap}px` }}
          >
            {campaignFilms.map((film, idx) => {
              const isActive = idx === activeIndex;

              return (
                <motion.div
                  key={film.id}
                  animate={{
                    scale: isActive ? 1.05 : 0.94,
                    opacity: isActive ? 1 : 0.6,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 28 }}
                  onClick={() => {
                    if (!isActive) {
                      setActiveIndex(idx);
                      setIsPlaying(true);
                    }
                  }}
                  className={`relative flex-shrink-0 aspect-[9/16] rounded-2xl overflow-hidden shadow-xl shadow-black/10 cursor-pointer select-none transition-shadow duration-300 ${
                    isActive 
                      ? 'shadow-2xl shadow-black/20 ring-1 ring-black/15 z-20' 
                      : 'z-10 hover:opacity-85'
                  }`}
                  style={{ width: `${cardWidth}px` }}
                >
                  {/* Strict Portrait Aspect Ratio Video */}
                  <video
                    ref={(el) => (videoRefs.current[idx] = el)}
                    src={film.videoSrc}
                    poster={film.poster}
                    loop
                    playsInline
                    muted={isMuted || !isActive}
                    autoPlay
                    onTimeUpdate={() => {
                      const vid = videoRefs.current[idx];
                      if (vid && vid.duration) {
                        setProgresses((prev) => ({
                          ...prev,
                          [idx]: (vid.currentTime / vid.duration) * 100
                        }));
                      }
                    }}
                    className="w-full h-full object-cover"
                  />

                  {/* Top Bar Overlay */}
                  <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between z-20 pointer-events-none">
                    <span className="px-3 py-1 rounded-full bg-black/65 backdrop-blur-md text-[10px] font-mono font-bold text-white uppercase tracking-wider shadow-sm">
                      {film.tag}
                    </span>

                    {isActive && (
                      <div className="flex items-center gap-1.5 pointer-events-auto">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleMute();
                          }}
                          aria-label={isMuted ? "Unmute sound" : "Mute sound"}
                          className="w-8 h-8 rounded-full bg-black/60 hover:bg-black text-white backdrop-blur-md flex items-center justify-center transition active:scale-90 cursor-pointer shadow-sm"
                        >
                          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                        </button>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveVideoModal(film);
                          }}
                          aria-label="Expand video"
                          className="w-8 h-8 rounded-full bg-black/60 hover:bg-black text-white backdrop-blur-md flex items-center justify-center transition active:scale-90 cursor-pointer shadow-sm"
                        >
                          <Maximize2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Center Play/Pause Indicator (Only for active video if paused) */}
                  {isActive && !isPlaying && (
                    <div 
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePlay();
                      }}
                      className="absolute inset-0 z-20 flex items-center justify-center bg-black/30 backdrop-blur-[2px] transition-all cursor-pointer"
                    >
                      <div className="w-14 h-14 rounded-full bg-white/95 text-black flex items-center justify-center shadow-2xl transition hover:scale-105 active:scale-95">
                        <Play className="w-6 h-6 fill-current ml-0.5" />
                      </div>
                    </div>
                  )}

                  {/* Bottom Information & Quick Action Scrim */}
                  <div className="absolute inset-x-0 bottom-0 z-20 p-4 sm:p-5 bg-gradient-to-t from-black/95 via-black/50 to-transparent flex flex-col justify-end text-white pointer-events-auto">
                    
                    {/* Scrub Progress Track */}
                    <div className="w-full bg-white/20 h-1 rounded-full overflow-hidden mb-3">
                      <div 
                        className="bg-white h-full transition-all duration-100 ease-linear rounded-full"
                        style={{ width: `${progresses[idx] || 0}%` }}
                      />
                    </div>

                    <div className="text-left">
                      <h3 className="font-serif text-base sm:text-lg text-white font-medium leading-snug drop-shadow-sm">
                        {film.title}
                      </h3>
                      <p className="text-xs text-white/75 font-sans mt-0.5 line-clamp-1">
                        {film.subtitle}
                      </p>
                    </div>

                    {/* Pinned Piece Quick Shop Row (Active Video Only) */}
                    {isActive && (
                      <div className="mt-3 pt-3 border-t border-white/15 flex items-center justify-between gap-2.5">
                        <div className="flex items-center gap-2 min-w-0">
                          <img
                            src={film.product.thumbnail}
                            alt={film.product.name}
                            className="w-9 h-11 rounded object-cover border border-white/20 flex-shrink-0"
                          />
                          <div className="min-w-0 text-left">
                            <p className="text-xs font-semibold text-white truncate">
                              {film.product.name}
                            </p>
                            <p className="text-[11px] font-mono text-white/80 font-bold">
                              ${film.product.price.toFixed(2)}
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleQuickAdd(film.product);
                          }}
                          aria-label={`Add ${film.product.name} to bag`}
                          className={`px-3.5 py-2 rounded-full font-mono text-xs uppercase tracking-wider font-bold transition-all active:scale-95 flex items-center gap-1.5 flex-shrink-0 cursor-pointer shadow-lg ${
                            addedItemFeedback[film.product.id]
                              ? 'bg-emerald-500 text-white'
                              : 'bg-white text-black hover:bg-neutral-100'
                          }`}
                        >
                          {addedItemFeedback[film.product.id] ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Added ✓</span>
                            </>
                          ) : (
                            <>
                              <ShoppingBag className="w-3.5 h-3.5" />
                              <span>Shop Piece</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}

                  </div>

                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Carousel Bottom Controls & Indicators */}
        <div className="flex flex-col items-center gap-4 mt-6">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous Campaign Film"
              className="w-11 h-11 rounded-full bg-white hover:bg-neutral-100 text-black shadow-md border border-black/10 flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
            </button>

            {/* Pagination indicator pills */}
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-black/5 border border-black/5">
              {campaignFilms.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setActiveIndex(i);
                    setIsPlaying(true);
                  }}
                  aria-label={`Go to film ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    i === activeIndex 
                      ? 'w-7 bg-black' 
                      : 'w-2 bg-black/25 hover:bg-black/50'
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next Campaign Film"
              className="w-11 h-11 rounded-full bg-white hover:bg-neutral-100 text-black shadow-md border border-black/10 flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>

          <p className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
            Film {activeIndex + 1} of {campaignFilms.length} · Tap any card or use arrows to navigate
          </p>
        </div>

      </div>

      {/* Production Notes / Atelier Sourcing Accordion */}
      <div className="w-full max-w-7xl 2xl:max-w-[1540px] mx-auto px-4 sm:px-8 lg:px-12 mt-12">
        <div className="bg-[#FAF6F1] rounded-2xl border border-black/10 p-8 sm:p-12 space-y-6">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#1A1A1A]" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] font-bold text-black/70">
              Technical Specifications &amp; Sourcing
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm font-sans text-black/70 leading-relaxed divide-y md:divide-y-0 md:divide-x divide-black/10 pt-2">
            <div className="space-y-1 md:pr-6 pt-3 md:pt-0">
              <h5 className="font-mono font-bold uppercase tracking-wider text-[#1A1A1A] text-xs">
                Shuttle Loom Denim
              </h5>
              <p>
                Spun from unbleached long-staple cotton yarn and woven slowly on 1960s Toyoda shuttle looms to retain maximum natural ring-spun texture and authentic selvedge ID line.
              </p>
            </div>

            <div className="space-y-1 md:px-6 pt-3 md:pt-0">
              <h5 className="font-mono font-bold uppercase tracking-wider text-[#1A1A1A] text-xs">
                Contour Patterning
              </h5>
              <p>
                The zip-up corset top utilizes 8-panel curved anatomical seams and reinforced brass zipper closures to contour the torso without rigid boning discomfort.
              </p>
            </div>

            <div className="space-y-1 md:pl-6 pt-3 md:pt-0">
              <h5 className="font-mono font-bold uppercase tracking-wider text-[#1A1A1A] text-xs">
                Heavyweight Knits
              </h5>
              <p>
                280gsm combed cotton jersey knit specifically for boxy structure and minimal shoulder slope, pre-shrunk with water-conserving bio-wash treatments.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Video Modal */}
      <AnimatePresence>
        {activeVideoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveVideoModal(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          >
            <div 
              className="relative max-w-sm sm:max-w-md w-full aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl bg-black border border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                src={activeVideoModal.videoSrc}
                className="w-full h-full object-cover"
                autoPlay
                controls
                playsInline
              />

              <div className="absolute top-4 right-4 z-30">
                <button
                  type="button"
                  onClick={() => setActiveVideoModal(null)}
                  className="w-10 h-10 rounded-full bg-black/70 border border-white/20 text-white flex items-center justify-center hover:bg-black cursor-pointer"
                >
                  ✕
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
