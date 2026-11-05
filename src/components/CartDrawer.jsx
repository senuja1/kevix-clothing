import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck } from 'lucide-react';
import { BRAND_INFO } from '../data/looksData';

export function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}) {
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState('');

  const rawSubtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  
  let promoDiscount = 0;
  if (appliedPromo) {
    promoDiscount = Math.round(rawSubtotal * (appliedPromo.percent / 100));
  }

  const finalSubtotal = rawSubtotal - promoDiscount;
  const isFreeShipping = finalSubtotal >= BRAND_INFO.freeShippingThreshold || finalSubtotal === 0;
  const shippingAmount = isFreeShipping ? 0 : 20;
  const total = finalSubtotal + shippingAmount;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    setPromoError('');
    const cleanCode = promoCode.trim().toUpperCase();
    if (BRAND_INFO.promoCodes[cleanCode]) {
      setAppliedPromo({
        code: cleanCode,
        percent: BRAND_INFO.promoCodes[cleanCode]
      });
      setPromoCode('');
    } else {
      setPromoError('Invalid code. Try "CATWALK"');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-[#1A1A1A]/35 backdrop-blur-[6px]"
          />

          {/* Slide-over Cart */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-[#F4EFEA] border-l border-[rgba(26,26,26,0.1)] text-[#1A1A1A] shadow-2xl flex flex-col overflow-hidden select-none"
          >
            {/* Header */}
            <div className="p-6 border-b border-[rgba(26,26,26,0.1)] bg-[#F4EFEA] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h2 className="font-serif text-2xl font-normal text-[#1A1A1A]">
                  Your Bag
                </h2>
                <span className="w-5 h-5 rounded-full bg-[#1A1A1A] text-white text-[11px] flex items-center justify-center font-bold">
                  {items.reduce((acc, i) => acc + i.quantity, 0)}
                </span>
              </div>

              <button
                onClick={onClose}
                aria-label="Close Bag"
                className="w-8 h-8 rounded-full border border-[rgba(26,26,26,0.18)] hover:border-[#1A1A1A] flex items-center justify-center text-[#1A1A1A] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Free Shipping Meter */}
            <div className="px-6 py-2.5 bg-[#FAF6F1] border-b border-[rgba(26,26,26,0.08)] text-[11px] font-sans text-[#8C8680] flex items-center justify-between">
              <span>{isFreeShipping ? 'Complimentary express shipping included' : `Add $${BRAND_INFO.freeShippingThreshold - finalSubtotal} for free shipping`}</span>
              <span className="font-semibold text-[#1A1A1A]">${BRAND_INFO.freeShippingThreshold} Goal</span>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-3">
                  <p className="font-serif text-xl text-[#1A1A1A]">Your bag is empty</p>
                  <p className="text-xs text-[#8C8680] max-w-xs">
                    Explore the runway queue and tap any piece to add it to your bag.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-2 px-5 py-2.5 rounded-lg bg-[#1A1A1A] text-white text-xs font-semibold hover:bg-black transition-all shadow-sm cursor-pointer"
                  >
                    Return to Shop
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-xl border border-[rgba(26,26,26,0.1)] bg-[#FFFFFF] flex gap-3.5 items-center shadow-[0_1px_4px_rgba(0,0,0,0.02)]"
                  >
                    <img
                      src={item.thumbnail}
                      alt={item.name}
                      className="w-16 h-20 object-cover rounded-md border border-[rgba(26,26,26,0.08)] flex-shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <div className="truncate">
                          <span className="text-xs uppercase font-mono text-[#8C8680] block font-bold">
                            LOOK {item.lookNumber}
                          </span>
                          <h3 className="text-sm font-semibold text-[#1A1A1A] truncate mt-0.5">
                            {item.name}
                          </h3>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.id)}
                          aria-label={`Remove ${item.name}`}
                          className="text-[#8C8680] hover:text-[#1A1A1A] transition-colors p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-sans px-2.5 py-0.5 rounded bg-[#FAF6F1] border border-[rgba(26,26,26,0.1)] text-[#1A1A1A] font-medium">
                          Size: {item.size}
                        </span>
                        {item.isBundlePart && (
                          <span className="text-xs text-[#8C8680] font-sans">
                            Bundle Applied
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-[rgba(26,26,26,0.06)]">
                        <div className="flex items-center gap-2 bg-[#FAF6F1] rounded-md border border-[rgba(26,26,26,0.1)] px-2 py-0.5">
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="text-[#8C8680] hover:text-[#1A1A1A]"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-sm font-semibold text-[#1A1A1A] min-w-[14px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="text-[#8C8680] hover:text-[#1A1A1A]"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <span className="text-sm font-bold text-[#1A1A1A]">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Cart Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-[rgba(26,26,26,0.1)] bg-[#F4EFEA] space-y-4">
                
                {/* Promo Code Form */}
                {appliedPromo ? (
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#FAF6F1] border border-[rgba(26,26,26,0.1)] text-sm">
                    <span className="font-semibold text-[#1A1A1A]">
                      PROMO "{appliedPromo.code}" ({appliedPromo.percent}% OFF)
                    </span>
                    <button
                      onClick={() => setAppliedPromo(null)}
                      className="text-[#8C8680] hover:text-[#1A1A1A] text-xs font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="PROMO CODE (e.g. CATWALK)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 bg-[#FFFFFF] border border-[rgba(26,26,26,0.18)] rounded-lg px-3.5 py-2.5 text-sm text-[#1A1A1A] placeholder-[#8C8680] uppercase focus:outline-none focus:border-[#1A1A1A]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 bg-[#FAF6F1] hover:bg-[#FFFFFF] border border-[rgba(26,26,26,0.14)] text-[#1A1A1A] rounded-lg text-sm font-semibold uppercase transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                )}

                {promoError && (
                  <div className="text-xs text-red-600">{promoError}</div>
                )}

                {/* Subtotal & Total */}
                <div className="space-y-2 text-sm text-[#8C8680] pt-2 border-t border-[rgba(26,26,26,0.08)]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-[#1A1A1A] font-semibold">${rawSubtotal.toFixed(2)}</span>
                  </div>
                  {appliedPromo && (
                    <div className="flex justify-between text-[#1A1A1A]">
                      <span>Discount ({appliedPromo.percent}%)</span>
                      <span>-${promoDiscount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-[#1A1A1A] font-semibold">
                      {isFreeShipping ? 'FREE' : `$${shippingAmount}.00`}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-[#1A1A1A] pt-2.5 border-t border-[rgba(26,26,26,0.15)]">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <button
                  onClick={() => onCheckout({ items, total, promo: appliedPromo })}
                  className="w-full py-4 rounded-lg bg-[#1A1A1A] text-white text-sm font-bold tracking-wider uppercase hover:bg-black transition-all flex items-center justify-center gap-2 shadow-md active:scale-98 cursor-pointer"
                >
                  <span>Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-center gap-2 text-xs text-[#8C8680]">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Guaranteed Safe & Secure Checkout</span>
                </div>

              </div>
            )}

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
