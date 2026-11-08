import React from 'react';
import { Shirt, Sparkles, Plus, ArrowRight } from 'lucide-react';

export function LookbookGrid({ looks, onOpenLookDrawer, onSelectPinItem }) {
  return (
    <section className="relative w-full min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-[#070709]">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-amber-300">
            EDITORIAL ARCHIVE
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-wider text-white uppercase mt-2">
            FW26 LOOKBOOK
          </h1>
          <p className="text-zinc-400 text-sm mt-3 leading-relaxed">
            Every garment meticulously crafted with architectural proportions, raw Mongolian cashmere, and bonded Italian twill. Click any garment to inspect sizing and tailoring.
          </p>
        </div>

        {/* Looks List */}
        <div className="space-y-24">
          {looks.map((look, index) => {
            const isReversed = index % 2 === 1;

            return (
              <div
                key={look.id}
                className={`flex flex-col ${
                  isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'
                } gap-8 lg:gap-16 items-center p-6 sm:p-10 rounded-3xl border border-[rgba(255,255,255,0.08)] bg-[#0d0e14]`}
              >
                {/* Look Model Visual with Numbered Pins */}
                <div className="relative w-full lg:w-1/2 aspect-[3/4] max-h-[680px] rounded-2xl overflow-hidden border border-white/10 group">
                  <img
                    src={look.modelImage}
                    alt={look.title}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  {/* Numbered Pins */}
                  {look.pinItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => onSelectPinItem(look, item)}
                      className="runway-pin"
                      style={{ left: `${item.pinCoords.x}%`, top: `${item.pinCoords.y}%` }}
                      aria-label={`Inspect ${item.name}`}
                    >
                      {item.pinNumber}
                      <div className="pin-tooltip">
                        <div className="text-left font-sans">
                          <div className="text-[10px] text-amber-300 font-mono">{item.category}</div>
                          <div className="text-xs font-bold text-white">{item.name}</div>
                          <div className="text-xs text-zinc-300 font-mono">LKR {Number(item.price).toLocaleString()}</div>
                        </div>
                      </div>
                    </button>
                  ))}

                  {/* Look badge on image */}
                  <div className="absolute bottom-6 left-6 z-10">
                    <span className="font-mono text-xs uppercase tracking-widest text-amber-300 block">
                      LOOK {look.lookNumber} / 05
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-white tracking-wider">
                      {look.title}
                    </h3>
                  </div>
                </div>

                {/* Garments Breakdown Column */}
                <div className="w-full lg:w-1/2 space-y-6">
                  <div>
                    <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
                      {look.season} • SILHOUETTE
                    </span>
                    <h2 className="font-serif text-3xl font-bold text-white uppercase mt-1">
                      {look.title}
                    </h2>
                    <p className="text-zinc-400 text-sm italic mt-2">
                      "{look.quote}"
                    </p>
                  </div>

                  {/* List of pinned garments in this look */}
                  <div className="space-y-3 pt-2">
                    {look.pinItems.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => onSelectPinItem(look, item)}
                        className="flex items-center justify-between p-3.5 rounded-xl border border-white/5 bg-zinc-900/50 hover:bg-zinc-800/80 hover:border-white/20 transition-all cursor-pointer group"
                      >
                        <div className="flex items-center gap-3.5">
                          <span className="w-6 h-6 rounded-full bg-white/10 text-white flex items-center justify-center font-mono text-xs font-bold border border-white/20">
                            {item.pinNumber}
                          </span>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded-md border border-white/10"
                          />
                          <div>
                            <span className="text-[10px] uppercase font-mono tracking-wider text-amber-300">
                              {item.category}
                            </span>
                            <div className="text-sm font-semibold text-white group-hover:text-amber-200 transition-colors">
                              {item.name}
                            </div>
                            <div className="text-xs text-zinc-400">
                              {item.color}
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="font-mono text-sm font-bold text-white">
                            LKR {Number(item.price).toLocaleString()}
                          </span>
                          <div className="flex items-center justify-end text-[11px] text-zinc-400 group-hover:text-white transition-colors mt-0.5">
                            <span>Details</span>
                            <ArrowRight className="w-3 h-3 ml-1" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Primary CTA button for outfit */}
                  <div className="pt-4 flex items-center gap-4">
                    <button
                      onClick={() => onOpenLookDrawer(look)}
                      className="flex-1 py-3.5 px-6 rounded-xl bg-white text-black font-display text-xs font-bold uppercase tracking-wider hover:bg-zinc-200 transition-all active:scale-98 flex items-center justify-center gap-2 shadow-xl"
                    >
                      <Shirt className="w-4 h-4" />
                      <span>Shop Complete Outfit ({look.pinItems.length} Pieces)</span>
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

