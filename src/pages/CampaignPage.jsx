import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  ShoppingBag, 
  Check, 
  Film, 
  Clapperboard, 
  Layers 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { BRAND_INFO, LOOKS_DATA } from '../data/looksData';

export function CampaignPage({ onAddToCart }) {
  // Main Hero Featured Video State
  const heroVideoRef = useRef(null);
  const [isHeroPlaying, setIsHeroPlaying] = useState(true);
  const [isHeroMuted, setIsHeroMuted] = useState(true);
  const [heroProgress, setHeroProgress] = useState(0);

  // Gallery active video states
  const [activeVideoModal, setActiveVideoModal] = useState(null);
  const [mutedStates, setMutedStates] = useState({ 0: true, 1: true, 2: true, 3: true });
  const [addedItemFeedback, setAddedItemFeedback] = useState({});

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

  // Auto-track progress for hero video
  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (video.duration) {
        setHeroProgress((video.currentTime / video.duration) * 100);
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => video.removeEventListener('timeupdate', handleTimeUpdate);
  }, []);

  const toggleHeroPlay = () => {
    const video = heroVideoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
      setIsHeroPlaying(true);
    } else {
      video.pause();
      setIsHeroPlaying(false);
    }
  };

  const toggleHeroMute = () => {
    const video = heroVideoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsHeroMuted(video.muted);
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

  return (
    <div className="w-full min-h-screen bg-[#F4EFEA] pt-20 sm:pt-24 pb-20 select-none overflow-x-hidden flex flex-col items-center">
      
      {/* Top Breadcrumb & Page Intro */}
      <div className="w-full max-w-7xl 2xl:max-w-[1540px] mx-auto px-4 sm:px-8 lg:px-12 mb-8 sm:mb-12">
        
        {/* Navigation Breadcrumb */}
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

        {/* Page Hero Title: Strictly Centered Across Viewport */}
        <div className="w-full pt-8 sm:pt-12 text-center max-w-4xl mx-auto flex flex-col items-center justify-center space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-black/15 bg-white/70 backdrop-blur-sm text-[11px] font-mono uppercase tracking-[0.22em] text-black/70 shadow-xs mx-auto">
            <Clapperboard className="w-3.5 h-3.5 text-[#1A1A1A]" />
            <span>KevixClothing In Motion</span>
          </div>

          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl text-[#1A1A1A] tracking-tight leading-tight text-center w-full">
            The Campaign Films.
          </h1>

          <p className="text-black/65 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-sans leading-relaxed text-center w-full">
            Raw selvedge denim in motion. Watch the true weight, natural puddle drape, and brass accents recorded directly on models under authentic studio lighting.
          </p>
        </div>

      </div>

      {/* Featured Spotlight: The New Uploaded Campaign Video */}
      <div className="max-w-5xl mx-auto px-4 sm:px-8 mb-20">
        <div className="relative rounded-2xl overflow-hidden bg-black border border-black/15 shadow-2xl group">
          
          {/* 9:16 Video Canvas with Centered Theater Backdrop */}
          <div className="relative w-full aspect-[9/16] sm:aspect-[16/10] max-h-[720px] bg-black flex items-center justify-center overflow-hidden">
            
            {/* Ambient Blurred Background Video for Widescreen Presentation */}
            <video
              src="/videos/campaign_feature.mp4"
              className="absolute inset-0 w-full h-full object-cover filter blur-2xl opacity-35 scale-110 pointer-events-none hidden sm:block"
              muted
              loop
              autoPlay
              playsInline
            />

            {/* Main Foreground High-Res Video */}
            <video
              ref={heroVideoRef}
              src="/videos/campaign_feature.mp4"
              poster="/videos/thumb_4.jpg"
              className="relative z-10 h-full max-h-[720px] w-auto aspect-[9/16] object-cover cursor-pointer"
              loop
              autoPlay
              muted={isHeroMuted}
              playsInline
              onClick={toggleHeroPlay}
            />

            {/* Video Controls Overlay */}
            <div className="absolute inset-x-0 bottom-0 z-20 p-4 sm:p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col gap-3">
              
              {/* Progress Track */}
              <div 
                className="w-full bg-white/20 h-1 rounded-full overflow-hidden cursor-pointer hover:h-1.5 transition-all"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickPos = (e.clientX - rect.left) / rect.width;
                  if (heroVideoRef.current && heroVideoRef.current.duration) {
                    heroVideoRef.current.currentTime = clickPos * heroVideoRef.current.duration;
                  }
                }}
              >
                <div 
                  className="bg-white h-full transition-all duration-100 rounded-full" 
                  style={{ width: `${heroProgress}%` }}
                />
              </div>

              {/* Bottom Control Bar */}
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={toggleHeroPlay}
                    aria-label={isHeroPlaying ? "Pause video" : "Play video"}
                    className="w-10 h-10 rounded-full bg-white/20 hover:bg-white text-white hover:text-black flex items-center justify-center backdrop-blur-md transition-all active:scale-95 cursor-pointer"
                  >
                    {isHeroPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                  </button>

                  <button
                    type="button"
                    onClick={toggleHeroMute}
                    aria-label={isHeroMuted ? "Unmute audio" : "Mute audio"}
                    className="w-10 h-10 rounded-full bg-white/20 hover:bg-white text-white hover:text-black flex items-center justify-center backdrop-blur-md transition-all active:scale-95 cursor-pointer"
                  >
                    {isHeroMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>

                  <div className="hidden sm:block text-xs font-mono text-white/80">
                    <span className="font-bold uppercase tracking-wider text-white">Premiere</span> · Raw Selvedge Baggy Motion
                  </div>
                </div>

                {/* Instant Shop Trigger Pill */}
                <button
                  type="button"
                  onClick={() => handleQuickAdd(campaignFilms[0].product)}
                  className="px-4 py-2 rounded-full bg-white text-[#1A1A1A] hover:bg-[#FAF6F1] font-mono text-xs uppercase tracking-wider font-bold transition-all active:scale-95 flex items-center gap-2 shadow-lg cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>
                    {addedItemFeedback[campaignFilms[0].product.id] ? "Added to Bag ✓" : `Shop Jean · $${campaignFilms[0].product.price.toFixed(2)}`}
                  </span>
                </button>
              </div>

            </div>

          </div>

          {/* Film Details Under Banner */}
          <div className="p-6 sm:p-8 bg-[#0E0E11] text-[#E5E0DB] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-white/10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded bg-white/10 text-[10px] font-mono uppercase tracking-widest text-amber-300">
                  Featured Film
                </span>
                <span className="text-xs font-mono text-white/50">1280x720 · 4K Studio Reel</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-white">
                Director's Cut · Raw Waist Selvedge
              </h2>
              <p className="text-white/60 text-xs sm:text-sm mt-1 max-w-xl">
                Demonstrating the heavy gold topstitching, 14oz rigid Japanese selvedge denim, and authentic true-waist baggy unisex silhouette.
              </p>
            </div>

            <Link
              to="/collection"
              className="px-5 py-3 rounded-full border border-white/20 hover:border-white text-white font-mono text-xs uppercase tracking-widest transition-all active:scale-95 whitespace-nowrap min-h-[44px] flex items-center justify-center cursor-pointer"
            >
              <span>Explore Collection →</span>
            </Link>
          </div>

        </div>
      </div>

      {/* Complete Campaign Video Reel Grid: All 4 Motion Films */}
      <div className="w-full max-w-7xl 2xl:max-w-[1540px] mx-auto px-4 sm:px-8 lg:px-12 space-y-8">
        
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-4 border-b border-black/10">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-black/50 block">
              The 4K Video Archive
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-[#1A1A1A] mt-1">
              All Campaign Films in Motion
            </h3>
          </div>
          <p className="text-xs font-mono text-black/50">
            Tap any reel to inspect piece details or play with sound
          </p>
        </div>

        {/* 4-Column Video Reel Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {campaignFilms.map((film, idx) => {
            const isMuted = mutedStates[idx] ?? true;

            return (
              <div 
                key={film.id}
                className="group flex flex-col justify-between bg-white rounded-2xl p-3 border border-black/10 shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-transform duration-300 hover:shadow-lg"
              >
                
                {/* 9:16 Video Player Container */}
                <div className="relative aspect-[9/16] w-full rounded-xl overflow-hidden bg-black">
                  
                  <video
                    src={film.videoSrc}
                    poster={film.poster}
                    className="w-full h-full object-cover cursor-pointer"
                    loop
                    autoPlay
                    muted={isMuted}
                    playsInline
                    onClick={() => setActiveVideoModal(film)}
                  />

                  {/* Top Tag & Sound Toggle */}
                  <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between z-20">
                    <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[10px] font-mono font-bold text-white uppercase tracking-wider">
                      {film.tag}
                    </span>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setMutedStates((prev) => ({ ...prev, [idx]: !isMuted }));
                      }}
                      aria-label="Toggle mute"
                      className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-black flex items-center justify-center transition-colors cursor-pointer"
                    >
                      {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {/* Bottom Expand Overlay */}
                  <div 
                    onClick={() => setActiveVideoModal(film)}
                    className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-center justify-between text-white cursor-pointer"
                  >
                    <span className="text-[11px] font-mono text-white/90 font-medium">
                      {film.duration} · High-Def
                    </span>
                    <div className="w-7 h-7 rounded-full bg-white/20 hover:bg-white text-white hover:text-black flex items-center justify-center backdrop-blur-md transition-colors">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </div>
                  </div>

                </div>

                {/* Metadata & Quick-Add Strip */}
                <div className="pt-3 pb-1 flex flex-col justify-between flex-1">
                  <div>
                    <h4 className="font-serif text-lg text-[#1A1A1A] leading-snug line-clamp-1">
                      {film.title}
                    </h4>
                    <p className="text-xs text-black/60 mt-1 line-clamp-2 font-sans">
                      {film.subtitle}
                    </p>
                  </div>

                  {/* Pinned Product Card inside the video card */}
                  <div className="mt-3 pt-3 border-t border-black/10 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <img
                        src={film.product.thumbnail}
                        alt={film.product.name}
                        className="w-10 h-12 rounded object-cover border border-black/10 flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-[#1A1A1A] truncate">
                          {film.product.name}
                        </p>
                        <p className="text-[11px] font-mono text-black/60 font-bold">
                          ${film.product.price.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleQuickAdd(film.product)}
                      aria-label={`Add ${film.product.name} to bag`}
                      className={`p-2.5 rounded-full transition-all active:scale-95 cursor-pointer flex-shrink-0 min-w-[38px] min-h-[38px] flex items-center justify-center ${
                        addedItemFeedback[film.product.id]
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#1A1A1A] hover:bg-black text-white'
                      }`}
                      title="Add piece to bag"
                    >
                      {addedItemFeedback[film.product.id] ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <ShoppingBag className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Production Notes / Atelier Sourcing Accordion */}
      <div className="w-full max-w-7xl 2xl:max-w-[1540px] mx-auto px-4 sm:px-8 lg:px-12 mt-20">
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
          <>
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
          </>
        )}
      </AnimatePresence>

    </div>
  );
}

