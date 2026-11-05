import React, { useState, useEffect } from 'react';

export function LoadingScreen({ onLoadingComplete }) {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Show only the round logo for ~1.8 seconds, then smoothly fade out
    const timer = setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(() => {
        setIsDone(true);
        if (onLoadingComplete) onLoadingComplete();
      }, 700);
    }, 1800);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  if (isDone) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#0d0d10] text-white select-none transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Subtle ambient luxury glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.08)_0%,transparent_65%)] pointer-events-none" />

      {/* Only the Round KVX Logo Centerpiece */}
      <div className="relative flex items-center justify-center">
        
        {/* Delicate Outer Hairline Orbit Ring */}
        <div className="absolute -inset-4 sm:-inset-6 rounded-full border border-white/10 border-t-white/70 animate-spin [animation-duration:3s]" />
        
        {/* Soft Ambient Breathing Ring */}
        <div className="absolute -inset-2 rounded-full border border-white/20 animate-pulse [animation-duration:2s]" />

        {/* Circular KVX Logo */}
        <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden bg-black border-2 border-white/30 shadow-[0_0_60px_rgba(255,255,255,0.15)] flex items-center justify-center p-1">
          <img
            src="/logo-round.png"
            alt="KVX Clothing"
            className="w-full h-full object-cover rounded-full"
          />
        </div>

      </div>
    </div>
  );
}
