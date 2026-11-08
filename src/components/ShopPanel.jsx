import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Check, ArrowRight } from 'lucide-react';
import { BRAND_INFO } from '../data/looksData';

export function ShopPanel({
  look,
  isInspecting = false,
  onCloseInspect,
  expandedPieceId,
  onToggleExpandPiece,
  onAddToCart,
  onAddLookToCart,
  cartItems = [],
  isMobile = false
}) {
  const [selectedSizes, setSelectedSizes] = useState({});
  const [addedPieceFeedback, setAddedPieceFeedback] = useState({});
  const [addedFullLookFeedback, setAddedFullLookFeedback] = useState(false);

  // Initialize selected sizes when look changes
  useEffect(() => {
    if (!look) return;
    const initialSizes = {};
    look.pieces.forEach((piece) => {
      const firstAvailable = piece.sizes.find((s) => s.inStock)?.label || piece.sizes[0]?.label;
      initialSizes[piece.id] = firstAvailable;
    });
    setSelectedSizes(initialSizes);
  }, [look]);

  if (!look) return null;

  const totalLookPrice = look.pieces.reduce((sum, p) => sum + p.price, 0);

  const handleSelectSize = (pieceId, sizeLabel) => {
    setSelectedSizes((prev) => ({ ...prev, [pieceId]: sizeLabel }));
  };

  const handleAddPiece = (piece) => {
    const size = selectedSizes[piece.id] || piece.sizes[0]?.label;
    if (onAddToCart) {
      onAddToCart({
        id: `${piece.id}-${size}`,
        pieceId: piece.id,
        name: piece.name,
        price: piece.price,
        size,
        thumbnail: piece.thumbnail,
        lookTitle: look.title,
        lookNumber: look.number,
        brand: piece.brand || BRAND_INFO.name
      });
    }

    setAddedPieceFeedback((prev) => ({ ...prev, [piece.id]: true }));
    setTimeout(() => {
      setAddedPieceFeedback((prev) => ({ ...prev, [piece.id]: false }));
    }, 2000);
  };

  const handleAddFullLook = () => {
    if (onAddLookToCart) {
      const itemsToAdd = look.pieces.map((piece) => ({
        id: `${piece.id}-${selectedSizes[piece.id] || piece.sizes[0]?.label}`,
        pieceId: piece.id,
        name: piece.name,
        price: piece.price,
        size: selectedSizes[piece.id] || piece.sizes[0]?.label,
        thumbnail: piece.thumbnail,
        lookTitle: look.title,
        lookNumber: look.number,
        brand: piece.brand || BRAND_INFO.name
      }));
      onAddLookToCart(itemsToAdd);
    }

    setAddedFullLookFeedback(true);
    setTimeout(() => setAddedFullLookFeedback(false), 2500);
  };

  const isPieceAdded = (pieceId) => {
    return cartItems.some((item) => item.pieceId === pieceId);
  };

  return (
    <div className={`flex flex-col justify-between h-full bg-[#F4EFEA] relative select-none ${isMobile ? 'w-full' : ''}`}>
      
      {/* Circular Close Button (Desktop) */}
      {!isMobile && (
        <button
          type="button"
          onClick={onCloseInspect}
          aria-label="Close Shop Panel"
          className="absolute top-6 right-6 z-20 w-9 h-9 rounded-full border border-black/15 bg-white hover:bg-[#FAF6F1] flex items-center justify-center text-[#1A1A1A] transition shadow-md active:scale-95 cursor-pointer hover:rotate-90 duration-200"
        >
          <X className="w-4 h-4" />
        </button>
      )}

      {/* Panel Header (Desktop Only; mobile uses the bottom sheet header) */}
      {!isMobile && (
        <div className="p-5 sm:p-8 pb-4 border-b border-black/10 bg-[#F4EFEA] pr-16">
          <div className="flex items-baseline justify-between">
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1A1A] font-normal">
              In this look
            </h2>
            <span className="text-xs sm:text-sm tracking-widest uppercase text-black/50 font-mono font-semibold">
              {look.pieces.length} PIECES
            </span>
          </div>
          <p className="text-sm sm:text-base text-black/65 mt-1.5 font-sans">
            Look {look.number} · {look.title}
          </p>
        </div>
      )}

      {/* Scrollable Piece Accordion List */}
      <div className="flex-1 overflow-y-auto px-5 sm:px-8 divide-y divide-black/10">
        {look.pieces.map((piece) => {
          const isOpen = expandedPieceId === piece.id;
          const selectedSize = selectedSizes[piece.id] || piece.sizes[0]?.label;
          const pieceHasAdded = isPieceAdded(piece.id) || addedPieceFeedback[piece.id];

          return (
            <div key={piece.id} className="py-5">
              
              {/* Row Header */}
              <div 
                onClick={() => onToggleExpandPiece && onToggleExpandPiece(piece.id)}
                className="flex items-start justify-between gap-4 cursor-pointer group"
              >
                {/* 72px x 84px Product Thumbnail on #EAE4DC card with pin badge */}
                <div className="relative w-[72px] h-[84px] rounded-lg overflow-hidden bg-[#EAE4DC] flex-shrink-0 border border-black/5 transition-transform duration-300 group-hover:scale-[1.02]">
                  <img
                    src={piece.thumbnail}
                    alt={piece.name}
                    className="w-full h-full object-cover object-center"
                  />
                  {/* Pin Number Badge */}
                  <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-[#1A1A1A] text-white text-[10px] font-bold flex items-center justify-center font-mono shadow-sm">
                    {piece.pinNumber}
                  </div>
                </div>

                {/* Middle column: Brand, Product Name, Price */}
                <div className="flex-1 min-w-0 pt-0.5">
                  <span className="text-xs uppercase tracking-wider text-black/50 block font-mono font-semibold">
                    {piece.brand || BRAND_INFO.name}
                  </span>
                  <h3 className="text-base font-semibold text-[#1A1A1A] mt-0.5 line-clamp-1">
                    {piece.name}
                  </h3>
                  <div className="text-sm font-bold text-[#1A1A1A] mt-1">
                    LKR {piece.price.toLocaleString()}
                  </div>
                </div>

                {/* Right button: Circular w-8 h-8 rounded-full border border-black/15 */}
                <div className="flex-shrink-0 pt-1">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleExpandPiece && onToggleExpandPiece(piece.id);
                    }}
                    aria-label={isOpen ? "Collapse piece" : "Expand piece"}
                    className="w-8 h-8 rounded-full border border-black/15 flex items-center justify-center text-[#1A1A1A] hover:border-black transition active:scale-95 bg-white/50"
                  >
                    {isOpen ? (
                      <X className="w-3.5 h-3.5" />
                    ) : pieceHasAdded ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Plus className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

              </div>

              {/* Collapsible Size Drawer (AnimatePresence) */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden pt-4 mt-3 border-t border-black/5"
                  >
                    <div className="text-xs uppercase tracking-wider text-black/60 font-semibold mb-2.5">
                      Size
                    </div>

                    {/* Circular Size Buttons */}
                    <div className="flex flex-wrap items-center gap-2">
                      {piece.sizes.map((s) => {
                        const isSelected = selectedSize === s.label;
                        const inStock = s.inStock !== false;

                        return (
                          <button
                            key={s.label}
                            type="button"
                            disabled={!inStock}
                            onClick={() => handleSelectSize(piece.id, s.label)}
                            className={`w-11 h-11 rounded-full text-sm font-semibold transition flex items-center justify-center relative cursor-pointer ${
                              !inStock
                                ? 'opacity-40 cursor-not-allowed bg-black/5 border border-black/10 text-black/40'
                                : isSelected
                                ? 'bg-[#1A1A1A] text-white shadow-sm'
                                : 'bg-white/70 border border-black/10 text-[#1A1A1A] hover:border-black'
                            }`}
                          >
                            <span>{s.label}</span>
                            {!inStock && (
                              <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-current" viewBox="0 0 40 40">
                                <line x1="8" y1="32" x2="32" y2="8" strokeWidth="1.5" stroke="currentColor" />
                              </svg>
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Full-width solid black CTA button */}
                    <button
                      type="button"
                      onClick={() => handleAddPiece(piece)}
                      className={`h-12 bg-[#1A1A1A] text-white text-sm font-semibold tracking-wide w-full mt-4 rounded-lg hover:bg-black transition active:scale-98 flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
                        addedPieceFeedback[piece.id] ? 'bg-emerald-800' : ''
                      }`}
                    >
                      {addedPieceFeedback[piece.id] ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-300" />
                          <span>Added to bag · {selectedSize}</span>
                        </>
                      ) : (
                        <span>Add to bag · LKR {piece.price.toLocaleString()}</span>
                      )}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          );
        })}
      </div>

      {/* Sticky Complete-the-Look Footer (Desktop split stage only; mobile uses the floating action bar) */}
      {!isMobile && (
        <div className="p-8 pt-4 border-t border-black/10 bg-[#F4EFEA]">
          {/* Row above button */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-semibold text-[#1A1A1A]">Complete the look</span>
              <span className="text-sm text-black/55">· {look.pieces.length} pieces</span>
            </div>
            <div className="text-xl font-bold text-[#1A1A1A]">
              LKR {totalLookPrice.toLocaleString()}
            </div>
          </div>

          {/* Main CTA Button */}
          <button
            type="button"
            onClick={handleAddFullLook}
            className={`h-13 py-3.5 bg-[#1A1A1A] text-white text-base font-semibold flex items-center justify-between px-6 hover:bg-black/90 transition rounded-lg w-full active:scale-98 shadow-md cursor-pointer ${
              addedFullLookFeedback ? 'bg-emerald-900' : ''
            }`}
          >
            {addedFullLookFeedback ? (
              <>
                <span className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>Full look added to bag!</span>
                </span>
                <span>✓</span>
              </>
            ) : (
              <>
                <span>Add full look to bag</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      )}

    </div>
  );
}

