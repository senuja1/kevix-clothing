import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, ArrowUpRight, X, Maximize2, ChevronLeft, ChevronRight } from 'lucide-react';
import { BRAND_INFO } from '../data/looksData';

export function CampaignVideos({ onSelectLookAndShop }) {
  const [playingStates, setPlayingStates] = useState({ 0: true, 1: true, 2: true });
  const [progresses, setProgresses] = useState({ 0: 0, 1: 0, 2: 0 });
  const [modalVideoIndex, setModalVideoIndex] = useState(null);
  const [modalIsPlaying, setModalIsPlaying] = useState(true);
  const [modalProgress, setModalProgress] = useState(0);

  const videoRefs = [useRef(null), useRef(null), useRef(null)];
  const modalVideoRef = useRef(null);

  // Exact matching: Look 01 (Corset Top), Look 02 (Black Tee + Baggy Jean), Look 03 (White Tee + Baggy Jean)
  const videoData = [
    {
      id: "v-01",
      src: "/videos/reel_02.mp4",
      title: "Look 01 · Indigo Sculpt",
      subtitle: "Zip up corset top & raw denim drape",
      lookIndex: 0,
      tag: "ZIP UP CORSET TOP"
    },
    {
      id: "v-02",
      src: "/videos/reel_03.mp4",
      title: "Look 02 · Wide-Leg Selvedge",
      subtitle: "Cropped black Tee & True waist baggy jean",
      lookIndex: 1,
      tag: "BAGGY JEAN (UNISEX), BLACK TEE"
    },
    {
      id: "v-03",
      src: "/videos/reel_01.mp4",
      title: "Look 03 · Studio Essential",
      subtitle: "Cropped white Tee & True waist baggy jean",
      lookIndex: 2,
      tag: "BAGGY JEAN (UNISEX), WHITE TEE"
    }
  ];

  // Auto-play videos when they come into viewport in the grid
  useEffect(() => {
    videoRefs.forEach((ref, idx) => {
      const vid = ref.current;
      if (!vid) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              vid.play().catch(() => {});
              setPlayingStates((prev) => ({ ...prev, [idx]: true }));
            } else {
              vid.pause();
              setPlayingStates((prev) => ({ ...prev, [idx]: false }));
            }
          });
        },
        { threshold: 0.2 }
      );

      observer.observe(vid);
      return () => observer.disconnect();
    });
  }, []);

  // Keyboard navigation & body scroll lock for pop-up modal
  useEffect(() => {
    if (modalVideoIndex !== null) {
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          setModalVideoIndex(null);
        } else if (e.key === 'ArrowRight') {
          setModalVideoIndex((prev) => (prev + 1) % videoData.length);
        } else if (e.key === 'ArrowLeft') {
          setModalVideoIndex((prev) => (prev - 1 + videoData.length) % videoData.length);
        } else if (e.key === ' ') {
          e.preventDefault();
          if (modalVideoRef.current) {
            if (modalVideoRef.current.paused) {
              modalVideoRef.current.play();
              setModalIsPlaying(true);
            } else {
              modalVideoRef.current.pause();
              setModalIsPlaying(false);
            }
          }
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [modalVideoIndex, videoData.length]);

  // Restart video when switching in modal
  useEffect(() => {
    if (modalVideoIndex !== null && modalVideoRef.current) {
      modalVideoRef.current.currentTime = 0;
      modalVideoRef.current.play().catch(() => {});
      setModalIsPlaying(true);
      setModalProgress(0);
    }
  }, [modalVideoIndex]);

  const handleTimeUpdate = (idx) => {
    const vid = videoRefs[idx].current;
    if (vid && vid.duration) {
      setProgresses((prev) => ({
        ...prev,
        [idx]: (vid.currentTime / vid.duration) * 100
      }));
    }
  };

  const toggleModalPlay = () => {
    const vid = modalVideoRef.current;
    if (!vid) return;
    if (vid.paused) {
      vid.play();
      setModalIsPlaying(true);
    } else {
      vid.pause();
      setModalIsPlaying(false);
    }
  };

  const handleShop = (lookIndex) => {
    const el = document.getElementById('catwalk-stage');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    if (onSelectLookAndShop) {
      setTimeout(() => {
        onSelectLookAndShop(lookIndex);
      }, 350);
    }
  };

  const handleModalShop = (lookIndex) => {
    setModalVideoIndex(null);
    handleShop(lookIndex);
  };

  return (
    <section 
      id="campaign-films"
      className="w-full bg-[#EFE9E2] border-t border-black/10 pt-14 sm:pt-20 lg:pt-24 pb-28 sm:pb-36 lg:pb-48 px-4 sm:px-8 select-none flex flex-col items-center justify-center"
    >
      
      {/* Editorial Section Header: Centered Headline Only */}
      <div className="w-full max-w-5xl mx-auto mb-8 sm:mb-10 text-center flex flex-col items-center justify-center">
        <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#1A1A1A] leading-tight tracking-tight">
          Our Clothes on Models.
        </h2>
      </div>

      {/* Videos Layout: Centered Horizontally with Generous Space Between Videos */}
      <div className="w-full max-w-7xl 2xl:max-w-[1540px] mx-auto flex flex-col sm:flex-row items-center justify-center gap-10 sm:gap-16 md:gap-20 lg:gap-24 xl:gap-28 2xl:gap-32">
        {videoData.map((item, idx) => {
          const progress = progresses[idx] || 0;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.45, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-[250px] sm:max-w-[260px] lg:max-w-[270px] flex flex-col items-center group flex-shrink-0"
            >
              {/* Video Player Frame with Compact Height and 9:16 Aspect Ratio */}
              <div 
                onClick={() => setModalVideoIndex(idx)}
                className="relative w-full aspect-[9/16] max-h-[460px] lg:max-h-[480px] rounded-2xl overflow-hidden bg-black shadow-[0_10px_28px_rgba(0,0,0,0.1)] border border-black/10 transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-[0_18px_40px_rgba(0,0,0,0.18)] cursor-pointer"
              >
                
                <video
                  ref={videoRefs[idx]}
                  src={item.src}
                  loop
                  muted
                  playsInline
                  autoPlay
                  preload="metadata"
                  disablePictureInPicture
                  controlsList="nodownload nofullscreen noremoteplayback"
                  onTimeUpdate={() => handleTimeUpdate(idx)}
                  className="w-full h-full object-cover"
                />

                {/* Top Left Tag Badge */}
                <div className="absolute top-4 left-4 z-20 pointer-events-none">
                  <span className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full text-[11px] uppercase font-mono font-bold tracking-wider text-[#1A1A1A] shadow-sm">
                    {item.tag}
                  </span>
                </div>

                {/* Top Right Expand Icon Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setModalVideoIndex(idx);
                  }}
                  aria-label="Open full video"
                  className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md hover:bg-black/80 text-white flex items-center justify-center transition active:scale-95 cursor-pointer shadow-md group/btn"
                >
                  <Maximize2 className="w-3.5 h-3.5 transition-transform group-hover/btn:scale-110" />
                </button>

                {/* Hover Play & Expand Center Prompt */}
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="px-4 py-2 rounded-full bg-white/95 backdrop-blur-md flex items-center gap-2 text-[#1A1A1A] shadow-xl text-xs font-bold tracking-wide transition-transform group-hover:scale-105">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>View Full Video</span>
                  </div>
                </div>

                {/* Looping Progress Hairline */}
                <div className="absolute bottom-0 inset-x-0 h-[2.5px] bg-white/20 z-30 pointer-events-none">
                  <div 
                    className="h-full bg-white transition-all duration-100 ease-linear"
                    style={{ width: `${progress}%` }}
                  />
                </div>

              </div>

              {/* Caption Underneath Video Frame */}
              <div className="mt-3.5 w-full flex items-start justify-between gap-2 px-1">
                <div 
                  onClick={() => setModalVideoIndex(idx)}
                  className="min-w-0 cursor-pointer"
                >
                  <h3 className="font-sans text-sm sm:text-base font-bold text-[#1A1A1A] truncate hover:underline">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-black/65 mt-0.5 line-clamp-1">
                    {item.subtitle}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleShop(item.lookIndex)}
                  className="text-sm font-bold text-[#1A1A1A] hover:underline flex items-center gap-0.5 flex-shrink-0 pt-0.5 cursor-pointer"
                >
                  <span>Shop</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </motion.div>
          );
        })}
      </div>

      {/* Full-Screen Video Lightbox Modal */}
      <AnimatePresence>
        {modalVideoIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={() => setModalVideoIndex(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md select-none"
          >
            {/* Modal Content Frame */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 15 }}
              transition={{ type: "spring", stiffness: 280, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[420px] aspect-[9/16] max-h-[88vh] bg-black rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.6)] border border-white/15 flex flex-col justify-between"
            >
              {/* Full Video Element */}
              <video
                ref={modalVideoRef}
                src={videoData[modalVideoIndex].src}
                loop
                muted
                playsInline
                autoPlay
                disablePictureInPicture
                controlsList="nodownload nofullscreen noremoteplayback"
                onTimeUpdate={() => {
                  const vid = modalVideoRef.current;
                  if (vid && vid.duration) {
                    setModalProgress((vid.currentTime / vid.duration) * 100);
                  }
                }}
                className="absolute inset-0 w-full h-full object-cover cursor-pointer"
                onClick={toggleModalPlay}
              />

              {/* Centered Top Tag Badge */}
              <div className="relative z-20 pt-4 pb-2 px-12 flex items-center justify-center text-white bg-gradient-to-b from-black/80 via-black/35 to-transparent pointer-events-none">
                <div className="bg-black/45 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 shadow-lg">
                  <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-white">
                    {videoData[modalVideoIndex].tag}
                  </span>
                </div>
              </div>

              {/* Close Button in Top Right */}
              <button
                type="button"
                onClick={() => setModalVideoIndex(null)}
                aria-label="Close full video"
                className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md flex items-center justify-center transition active:scale-90 cursor-pointer border border-white/20 shadow-lg"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Center Play / Pause Indicator Overlay */}
              <div 
                onClick={toggleModalPlay}
                className="absolute inset-0 z-10 flex items-center justify-center cursor-pointer"
              >
                {!modalIsPlaying && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#1A1A1A] shadow-2xl"
                  >
                    <Play className="w-7 h-7 ml-1" />
                  </motion.div>
                )}
              </div>

              {/* Floating Left / Right Navigation Arrows */}
              <div className="absolute inset-y-0 inset-x-2 z-20 flex items-center justify-between pointer-events-none">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setModalVideoIndex((prev) => (prev - 1 + videoData.length) % videoData.length);
                  }}
                  aria-label="Previous reel"
                  className="pointer-events-auto w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition active:scale-90 cursor-pointer shadow-lg"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setModalVideoIndex((prev) => (prev + 1) % videoData.length);
                  }}
                  aria-label="Next reel"
                  className="pointer-events-auto w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition active:scale-90 cursor-pointer shadow-lg"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Looping Progress Hairline */}
              <div className="absolute bottom-0 inset-x-0 h-[3px] bg-white/20 z-30 pointer-events-none">
                <div 
                  className="h-full bg-white transition-all duration-100 ease-linear"
                  style={{ width: `${modalProgress}%` }}
                />
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
