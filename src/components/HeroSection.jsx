import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const PORTRAIT_QUERY = '(max-aspect-ratio: 1/1)';
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

export function HeroSection() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);

  const [isPortrait, setIsPortrait] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(PORTRAIT_QUERY).matches : false
  );
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(REDUCED_MOTION_QUERY).matches : false
  );
  const [isInView, setIsInView] = useState(true);

  const shouldPlay = !prefersReducedMotion;

  // Listen for viewport aspect-ratio changes (device rotation, resize) and reduced-motion changes
  useEffect(() => {
    const portraitMql = window.matchMedia(PORTRAIT_QUERY);
    const motionMql = window.matchMedia(REDUCED_MOTION_QUERY);

    const onPortraitChange = (e) => setIsPortrait(e.matches);
    const onMotionChange = (e) => setPrefersReducedMotion(e.matches);

    portraitMql.addEventListener('change', onPortraitChange);
    motionMql.addEventListener('change', onMotionChange);

    return () => {
      portraitMql.removeEventListener('change', onPortraitChange);
      motionMql.removeEventListener('change', onMotionChange);
    };
  }, []);

  // Pause background video when scrolled out of view to save GPU/battery on mobile
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Sync muted autoplay properties & playback state across iOS Safari, Android Chrome, and Desktop
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    vid.defaultMuted = true;
    vid.muted = true;
    vid.playsInline = true;
    vid.setAttribute('muted', '');
    vid.setAttribute('playsinline', '');
    vid.setAttribute('webkit-playsinline', '');

    const attemptPlay = () => {
      if (!videoRef.current) return;
      videoRef.current.play().catch(() => {});
    };

    if (shouldPlay && isInView) {
      attemptPlay();
    } else {
      vid.pause();
    }

    // Unlock autoplay on first touch for strict mobile environments (e.g. iOS Low Power Mode)
    const unlockOnTouch = () => {
      if (shouldPlay && isInView && videoRef.current?.paused) {
        attemptPlay();
      }
    };
    window.addEventListener('touchstart', unlockOnTouch, { once: true, passive: true });
    return () => window.removeEventListener('touchstart', unlockOnTouch);
  }, [shouldPlay, isInView, isPortrait]);

  const handleScrollToCatwalk = () => {
    const el = document.getElementById('catwalk-stage');
    if (el) {
      el.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    } else {
      window.scrollTo({
        top: window.innerHeight - 56,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });
    }
  };

  const posterSrc = isPortrait
    ? '/hero/kvx_runway_hero_mobile.webp'
    : '/hero/kvx_runway_hero.webp';
  const webmSrc = isPortrait
    ? '/hero/kvx_runway_hero_mobile.webm'
    : '/hero/kvx_runway_hero.webm';
  const mp4Src = isPortrait
    ? '/hero/kvx_runway_hero_mobile.mp4'
    : '/hero/kvx_runway_hero.mp4';
  const videoWidth = isPortrait ? 720 : 1280;
  const videoHeight = isPortrait ? 1280 : 720;

  return (
    <section
      ref={sectionRef}
      id="hero-banner"
      className="relative w-full h-[100svh] min-h-[520px] flex flex-col justify-end overflow-hidden bg-black select-none border-b border-black/15"
    >
      {/* Background Cinematic KVX CLOTHING Runway Video (Responsive Landscape & Portrait) */}
      <div
        className="absolute inset-0 z-0 overflow-hidden bg-black cursor-pointer"
        onClick={handleScrollToCatwalk}
      >
        <video
          key={isPortrait ? 'portrait' : 'landscape'}
          ref={videoRef}
          width={videoWidth}
          height={videoHeight}
          poster={posterSrc}
          autoPlay={shouldPlay}
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
          className="w-full h-full object-cover object-center pointer-events-none"
        >
          <source src={webmSrc} type="video/webm" />
          <source src={mp4Src} type="video/mp4" />
        </video>

        {/* Subtle Vignette Gradients for Navbar & Bottom Cue Legibility */}
        <div className="absolute inset-x-0 top-0 h-28 sm:h-32 bg-gradient-to-b from-black/65 via-black/20 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />
      </div>

      {/* Bottom Cue to Enter Runway Stage: Animated Down Arrow Only (>= 44x44px target) */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 pb-8 sm:pb-12 flex flex-col items-center justify-center pointer-events-none"
      >
        <button
          type="button"
          onClick={handleScrollToCatwalk}
          aria-label="Scroll down to catwalk stage"
          className="pointer-events-auto group p-3.5 rounded-full text-white/80 hover:text-white transition-all duration-300 hover:scale-110 active:scale-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
        >
          <ChevronDown
            aria-hidden="true"
            className="w-8 h-8 sm:w-10 sm:h-10 motion-safe:animate-bounce stroke-[1.5] filter drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]"
          />
        </button>
      </motion.div>
    </section>
  );
}
