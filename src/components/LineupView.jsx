import React, { useState } from 'react';
import { Shirt, Sparkles, ArrowRight } from 'lucide-react';

export function LineupView({ looks, onOpenLookDrawer, onSelectLook }) {
  const [hoveredLookId, setHoveredLookId] = useState(null);

  return (
    <section className="relative w-full min-h-[calc(100vh-80px)] py-12 px-4 sm:px-6 lg:px-8 bg-[#070709] flex flex-col justify-between overflow-hidden">
      
      {/* Runway Stage Glow & Floor */}
      <div className="runway-spotlight" />
      <div className="runway-floor-reflection" />

      {/* Header */}
      <div className="relative z-10 max-w-7xl mx-auto w-full text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-700 bg-zinc-900/60 text-zinc-300 text-[11px] font-mono tracking-widest uppercase mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>FINALE CATWALK LINEUP</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-wider uppercase text-white">
          THE FULL FW26 COLLECTION
        </h1>
        <p className="text-zinc-400 text-sm max-w-xl mx-auto mt-2 font-sans">
          All five silhouettes aligned on the Paris runway. Hover any model to inspect full tailoring specifications or add to bag.
        </p>
      </div>

      {/* Lineup Stage Cards */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex-1 flex items-center justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6 w-full items-end pb-8">
          {looks.map((look, index) => {
            const isHovered = hoveredLookId === look.id;

            return (
              <div
                key={look.id}
                onMouseEnter={() => setHoveredLookId(look.id)}
                onMouseLeave={() => setHoveredLookId(null)}
                className={`group relative rounded-2xl overflow-hidden border transition-all duration-500 flex flex-col justify-end ${
                  isHovered 
                    ? 'border-white shadow-2xl scale-[1.03] z-20 bg-zinc-900' 
                    : 'border-[rgba(255,255,255,0.1)] opacity-85 hover:opacity-100 bg-[#0c0d12]'
                }`}
                style={{ height: '580px' }}
              >
                {/* Full-body Model Imagery */}
                <img
                  src={look.modelImage}
                  alt={look.title}
                  className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />

                {/* Dark Vignettes */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />

                {/* Top Look Badge */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded bg-black/80 backdrop-blur-md border border-white/20 text-white font-mono text-[10px] font-bold">
                    LOOK {look.lookNumber}
                  </span>
                </div>

                {/* Bottom Model Details & Actions */}
                <div className="relative z-10 p-5 space-y-3">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-amber-300 uppercase">
                      FW26 ARCHIVE
                    </span>
                    <h3 className="font-serif text-lg font-bold text-white tracking-wide mt-0.5">
                      {look.title}
                    </h3>
                    <p className="text-xs text-zinc-400 line-clamp-1 mt-0.5">
                      {look.silhouette}
                    </p>
                  </div>

                  {/* Pinned pieces pill summary */}
                  <div className="flex flex-wrap gap-1">
                    {look.pinItems.slice(0, 3).map((item) => (
                      <span
                        key={item.id}
                        className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/10 text-zinc-300 border border-white/10"
                      >
                        {item.category}
                      </span>
                    ))}
                    {look.pinItems.length > 3 && (
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/10 text-zinc-400">
                        +{look.pinItems.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 flex flex-col gap-2">
                    <button
                      onClick={() => onOpenLookDrawer(look)}
                      className="w-full py-2.5 px-3 rounded-xl bg-white text-black font-display text-xs font-bold uppercase tracking-wider hover:bg-zinc-200 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg"
                    >
                      <Shirt className="w-3.5 h-3.5" />
                      <span>Shop Outfit</span>
                    </button>

                    <button
                      onClick={() => onSelectLook(index)}
                      className="w-full py-2 px-3 rounded-xl bg-white/10 text-white text-[11px] font-mono uppercase tracking-wider hover:bg-white/20 transition-all flex items-center justify-center gap-1.5 border border-white/10"
                    >
                      <span>Walk on Stage</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                </div>

              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}

