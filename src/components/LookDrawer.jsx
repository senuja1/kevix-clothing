import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Check, ArrowRight } from 'lucide-react';
import { BRAND_INFO } from '../data/looksData';

export function LookDrawer({
  isOpen,
  onClose,
  look,
  initialFocusItemId,
  onAddToCart,
  onAddLookToCart,
  cartItems = []
}) {
  const [expandedItemId, setExpandedItemId] = useState(null);
  const [selectedSizes, setSelectedSizes] = useState({});
  const [addedItems, setAddedItems] = useState({});
  const [lookAddedFeedback, setLookAddedFeedback] = useState(false);

  // Initialize selected sizes and expand initial item
  useEffect(() => {
    if (!look) return;
    const initialSizes = {};
    look.pieces.forEach((piece) => {
      const firstInStock = piece.sizes.find((s) => s.inStock)?.label || piece.sizes[0]?.label;
      initialSizes[piece.id] = firstInStock;
    });
    setSelectedSizes(initialSizes);
    setExpandedItemId(initialFocusItemId || look.pieces[0]?.id);
    setLookAddedFeedback(false);
  }, [look, initialFocusItemId]);

  if (!look) return null;

  const totalLookPrice = look.pieces.reduce((acc, p) => acc + p.price, 0);
  const discountPercent = BRAND_INFO.bundleDiscountPercent;
  const discountedPrice = (totalLookPrice * (1 - discountPercent / 100)).toFixed(2);

  const piecesInCartCount = cartItems.filter(
    (ci) => ci.lookNumber === look.number
  ).length;

  const handleToggleExpand = (pieceId) => {
    setExpandedItemId((prev) => (prev === pieceId ? null : pieceId));
  };

  const handleSelectSize = (pieceId, sizeLabel) => {
    setSelectedSizes((prev) => ({ ...prev, [pieceId]: sizeLabel }));
  };

  const handleAddPiece = (piece) => {
    const size = selectedSizes[piece.id] || piece.sizes[0]?.label;
    onAddToCart({
      id: `${piece.id}-${size}`,
      pieceId: piece.id,
      name: piece.name,
      price: piece.price,
      size,
      thumbnail: piece.thumbnail,
      lookTitle: look.title,
      lookNumber: look.number,
      brand: piece.brand
    });

    setAddedItems((prev) => ({ ...prev, [piece.id]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [piece.id]: false }));
    }, 2000);
  };

  const handleAddFullLook = () => {
    const itemsToAdd = look.pieces.map((piece) => ({
      id: `${piece.id}-${selectedSizes[piece.id] || piece.sizes[0]?.label}`,
      pieceId: piece.id,
      name: piece.name,
      price: Math.round(piece.price * (1 - discountPercent / 100)),
      originalPrice: piece.price,
      size: selectedSizes[piece.id] || piece.sizes[0]?.label,
      thumbnail: piece.thumbnail,
      lookTitle: look.title,
      lookNumber: look.number,
      brand: piece.brand,
      isBundlePart: true
    }));

    onAddLookToCart(itemsToAdd);
    setLookAddedFeedback(true);
    setTimeout(() => setLookAddedFeedback(false), 2500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-[#1A1A1A]/35 backdrop-blur-[6px]"
          />

          {/* Slide-over Drawer (Warm Alabaster #F4EFEA) */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-lg bg-[#F4EFEA] border-l border-[rgba(26,26,26,0.1)] text-[#1A1A1A] shadow-2xl flex flex-col overflow-hidden select-none"
          >
            {/* Circular Close Button (Top Left) */}
            <div className="absolute top-6 left-6 z-20">
              <button
                onClick={onClose}
                aria-label="Close Look Details"
                className="w-10 h-10 rounded-full border border-[rgba(26,26,26,0.18)] bg-[#FFFFFF]/80 hover:bg-[#FFFFFF] flex items-center justify-center text-[#1A1A1A] transition-all shadow-sm active:scale-95"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Header: 'In this look' / 'X PIECES' / 'Look 02 · Bubblegum' */}
            <div className="pt-8 px-8 pb-5 pl-20 border-b border-[rgba(26,26,26,0.1)] bg-[#F4EFEA]">
              <div className="flex items-baseline justify-between">
                <h2 className="font-serif text-3xl font-normal text-[#1A1A1A]">
                  In this look
                </h2>
                <span className="font-mono text-xs uppercase tracking-widest text-[#8C8680] font-semibold">
                  {look.pieces.length} PIECES
                </span>
              </div>
              <p className="text-xs text-[#8C8680] font-sans mt-0.5">
                Look {look.number} · {look.title}
              </p>
            </div>

            {/* Pieces List */}
            <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
              {look.pieces.map((piece) => {
                const isExpanded = expandedItemId === piece.id;
                const currentSize = selectedSizes[piece.id] || piece.sizes[0]?.label;
                const isAdded = addedItems[piece.id];

                return (
                  <div
                    key={piece.id}
                    className="border-b border-[rgba(26,26,26,0.1)] pb-6 transition-all"
                  >
                    {/* Collapsed Product Row */}
                    <div className="flex items-start justify-between gap-4">
                      
                      {/* Product Thumbnail with Pin Number Badge */}
                      <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-[#FAF6F1] flex-shrink-0 border border-[rgba(26,26,26,0.1)]">
                        <img
                          src={piece.thumbnail}
                          alt={piece.name}
                          className="w-full h-full object-cover object-center"
                        />
                        {/* Circular Black Pin Badge */}
                        <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center font-mono text-[10px] font-bold">
                          {piece.pinNumber}
                        </div>
                      </div>

                      {/* Product Title, Brand, & Price */}
                      <div className="flex-1 min-w-0 pt-0.5">
                        <span className="text-[10px] uppercase font-mono tracking-wider text-[#8C8680] block font-bold">
                          {piece.brand || BRAND_INFO.name}
                        </span>
                        <h3 className="font-sans text-sm font-semibold text-[#1A1A1A] mt-0.5">
                          {piece.name}
                        </h3>
                        <div className="font-sans text-xs text-[#1A1A1A] mt-1 font-medium">
                          LKR {piece.price.toLocaleString()}
                        </div>
                      </div>

                      {/* Expand / Collapse Toggle Button (+) and (X) */}
                      <button
                        onClick={() => handleToggleExpand(piece.id)}
                        aria-label={isExpanded ? "Collapse size options" : "Expand size options"}
                        className="w-8 h-8 rounded-full border border-[rgba(26,26,26,0.18)] hover:border-[#1A1A1A] flex items-center justify-center text-[#1A1A1A] transition-colors flex-shrink-0 mt-1 active:scale-95"
                      >
                        {isExpanded ? (
                          <X className="w-3.5 h-3.5" />
                        ) : (
                          <Plus className="w-3.5 h-3.5" />
                        )}
                      </button>

                    </div>

                    {/* Expanded Size Selector with Out-of-Stock Support */}
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="mt-4 pt-3 border-t border-[rgba(26,26,26,0.08)] space-y-3"
                      >
                        <div className="flex items-center justify-between text-[11px] font-semibold text-[#8C8680] uppercase tracking-wider">
                          <span>Size</span>
                          {piece.canCustomize && (
                            <span className="text-[10px] font-mono text-emerald-800 normal-case font-medium">
                              ✦ Custom sizing available
                            </span>
                          )}
                        </div>

                        {/* Circular Size Pills */}
                        <div className="flex items-center gap-2">
                          {piece.sizes.map((s) => {
                            const isSelected = currentSize === s.label;
                            const isOutOfStock = s.inStock === false;

                            return (
                              <button
                                key={s.label}
                                disabled={isOutOfStock}
                                onClick={() => handleSelectSize(piece.id, s.label)}
                                className={`min-w-[40px] h-10 px-2.5 rounded-full flex items-center justify-center text-xs font-semibold transition-all relative ${
                                  isOutOfStock
                                    ? 'text-[#8C8680]/50 border border-[rgba(26,26,26,0.12)] cursor-not-allowed line-through'
                                    : isSelected
                                    ? 'bg-[#FFFFFF] border-2 border-[#1A1A1A] text-[#1A1A1A] shadow-sm'
                                    : 'bg-[#FFFFFF]/60 border border-[rgba(26,26,26,0.18)] text-[#1A1A1A] hover:border-[#1A1A1A]'
                                }`}
                              >
                                {s.label}
                              </button>
                            );
                          })}
                        </div>

                        {/* 'Choose size' Action Button */}
                        <button
                          onClick={() => handleAddPiece(piece)}
                          className={`w-full py-2.5 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-2 active:scale-98 ${
                            isAdded
                              ? 'bg-[#1A1A1A] text-white'
                              : 'bg-[rgba(26,26,26,0.08)] hover:bg-[rgba(26,26,26,0.14)] text-[#1A1A1A]'
                          }`}
                        >
                          {isAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-white" />
                              <span>Added to bag ({currentSize})</span>
                            </>
                          ) : (
                            <span>Choose size & add piece · LKR {piece.price.toLocaleString()}</span>
                          )}
                        </button>
                      </motion.div>
                    )}

                  </div>
                );
              })}
            </div>

            {/* Sticky Bottom Footer: 'Complete the look', Total, and 'Add full look to bag ->' */}
            <div className="p-8 border-t border-[rgba(26,26,26,0.1)] bg-[#F4EFEA] space-y-3">
              <div className="flex items-baseline justify-between">
                <div>
                  <div className="font-sans text-sm font-semibold text-[#1A1A1A]">
                    Complete the look
                  </div>
                  <div className="text-xs text-[#8C8680]">
                    {look.pieces.length} pieces
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-sans text-lg font-bold text-[#1A1A1A]">
                    LKR {totalLookPrice.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* 'Add full look to bag ->' Full-Width Button */}
              <button
                onClick={handleAddFullLook}
                className={`w-full py-4 rounded-lg font-sans text-xs font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2 active:scale-98 shadow-md ${
                  lookAddedFeedback
                    ? 'bg-[#1A1A1A] text-white'
                    : 'bg-[#1A1A1A] text-white hover:bg-black'
                }`}
              >
                {lookAddedFeedback ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Full look added to bag!</span>
                  </>
                ) : (
                  <>
                    <span>Add full look to bag</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* In-bag Status Indicator */}
              {piecesInCartCount > 0 && (
                <div className="text-[11px] text-[#8C8680] text-center font-sans">
                  {piecesInCartCount} piece{piecesInCartCount > 1 ? 's' : ''} in your bag
                </div>
              )}

            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
