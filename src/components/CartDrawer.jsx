import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, MessageCircle, Truck } from 'lucide-react';
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
  const shippingAmount = isFreeShipping ? 0 : 350;
  const total = finalSubtotal + shippingAmount;

  const threshold = BRAND_INFO.freeShippingThreshold || 10000;
  const progressPercent = Math.min(100, Math.round((finalSubtotal / threshold) * 100));
  const remainingForFreeShipping = Math.max(0, threshold - finalSubtotal);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    setPromoError('');
    const cleanCode = promoCode.trim().toUpperCase();
    if (BRAND_INFO.promoCodes && BRAND_INFO.promoCodes[cleanCode]) {
      setAppliedPromo({
        code: cleanCode,
        percent: BRAND_INFO.promoCodes[cleanCode]
      });
      setPromoCode('');
    } else {
      setPromoError('Invalid code. Try "CATWALK"');
    }
  };

  const handleWhatsAppOrder = () => {
    if (items.length === 0) return;

    const lineItems = items
      .map(
        (item) =>
          `• ${item.name} (${item.size || 'Standard'}) x${item.quantity} — LKR ${(
            item.price * item.quantity
          ).toLocaleString()}`
      )
      .join('\n');

    const hasCustomItems = items.some((item) => item.size === 'Custom');
    const customPrompt = hasCustomItems
      ? '\n\n*Custom Sizing Details:*\nI will reply with my preferred measurements (waist, length, bust) for the custom pieces.'
      : '';

    const messageText = 
`*NEW ORDER — ${BRAND_INFO.name.toUpperCase()}*
----------------------------------------
${lineItems}
----------------------------------------
*Subtotal:* LKR ${rawSubtotal.toLocaleString()}${
  appliedPromo ? `\n*Promo (${appliedPromo.code}):* -LKR ${promoDiscount.toLocaleString()}` : ''
}
*Shipping:* ${isFreeShipping ? 'COMPLIMENTARY (FREE)' : `LKR ${shippingAmount.toLocaleString()}`}
*Total:* LKR ${total.toLocaleString()}${customPrompt}

Please confirm my order and send payment details. Thank you!`;

    const encodedMessage = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
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
            className="fixed inset-0 z-50 bg-[#1A1A1A]/45 backdrop-blur-[6px]"
          />

          {/* Slide-over Cart Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-[#F4EFEA] border-l border-black/10 text-[#1A1A1A] shadow-2xl flex flex-col overflow-hidden select-none"
          >
            {/* Header */}
            <div className="p-5 sm:p-6 border-b border-black/10 bg-[#F4EFEA] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#1A1A1A]">
                  Your Bag
                </h2>
                <span className="w-5 h-5 rounded-full bg-[#1A1A1A] text-white text-[11px] flex items-center justify-center font-bold font-mono">
                  {items.reduce((acc, i) => acc + i.quantity, 0)}
                </span>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close Bag"
                className="w-11 h-11 rounded-full border border-black/15 hover:border-black flex items-center justify-center text-[#1A1A1A] transition-colors cursor-pointer active:scale-95 bg-white/70 shadow-xs"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Dynamic Free Shipping Progress Bar */}
            <div className="px-5 sm:px-6 py-3.5 bg-[#FAF6F1] border-b border-black/10 space-y-2">
              <div className="flex items-center justify-between text-xs font-sans">
                <span className="flex items-center gap-1.5 font-medium text-black/75">
                  <Truck className="w-3.5 h-3.5 text-[#1A1A1A]" />
                  {isFreeShipping ? (
                    <span className="text-emerald-700 font-semibold">
                      🎉 Complimentary Worldwide Shipping Unlocked!
                    </span>
                  ) : (
                    <span>
                      Add <strong className="text-[#1A1A1A] font-mono font-bold">LKR {remainingForFreeShipping.toLocaleString()}</strong> for free shipping
                    </span>
                  )}
                </span>
                <span className="font-mono font-bold text-black/60 text-[11px]">
                  {progressPercent}%
                </span>
              </div>

              {/* Progress track */}
              <div className="w-full bg-black/10 rounded-full h-1.5 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className={`h-full rounded-full ${
                    isFreeShipping ? 'bg-emerald-600' : 'bg-[#1A1A1A]'
                  }`}
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-3.5">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-3">
                  <p className="font-serif text-2xl text-[#1A1A1A]">Your bag is empty</p>
                  <p className="text-xs text-black/60 max-w-xs leading-relaxed">
                    Explore the runway queue or curated silhouettes and select any piece to add it to your bag.
                  </p>
                  <button
                    type="button"
                    onClick={onClose}
                    className="mt-3 px-6 py-3 rounded-lg bg-[#1A1A1A] text-white text-xs font-semibold hover:bg-black transition-all shadow-sm cursor-pointer min-h-[44px]"
                  >
                    Explore Collection
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-xl border border-black/10 bg-[#FFFFFF] flex gap-3.5 items-center shadow-[0_1px_4px_rgba(0,0,0,0.02)]"
                  >
                    <img
                      src={item.thumbnail}
                      alt={item.name}
                      className="w-16 h-20 object-cover rounded-md border border-black/10 flex-shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <div className="truncate">
                          <span className="text-[10px] uppercase font-mono text-black/50 block font-bold">
                            {item.lookNumber ? `LOOK ${item.lookNumber}` : 'ARCHIVE'}
                          </span>
                          <h3 className="text-sm font-semibold text-[#1A1A1A] truncate mt-0.5">
                            {item.name}
                          </h3>
                        </div>

                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.id)}
                          aria-label={`Remove ${item.name}`}
                          className="text-black/40 hover:text-red-600 transition-colors p-2 -mr-1 -mt-1 cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Size Badge */}
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-[11px] font-mono px-2 py-0.5 rounded border font-bold ${
                          item.size === 'Custom'
                            ? 'bg-emerald-50 border-emerald-500/30 text-emerald-900'
                            : 'bg-[#FAF6F1] border-black/10 text-[#1A1A1A]'
                        }`}>
                          Size: {item.size || 'OS'}{item.size === 'Custom' ? ' (Custom)' : ''}
                        </span>
                        {item.brand && (
                          <span className="text-[10px] text-black/50 font-mono uppercase">
                            {item.brand}
                          </span>
                        )}
                      </div>

                      {/* Stepper & Price Row */}
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-black/5">
                        <div className="flex items-center gap-1.5 bg-[#FAF6F1] rounded-lg border border-black/10 p-1">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            aria-label="Decrease quantity"
                            className="w-8 h-8 flex items-center justify-center text-black/60 hover:text-black hover:bg-black/5 rounded transition-colors cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-sm font-bold font-mono text-[#1A1A1A] min-w-[18px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            aria-label="Increase quantity"
                            className="w-8 h-8 flex items-center justify-center text-black/60 hover:text-black hover:bg-black/5 rounded transition-colors cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <span className="text-sm font-bold font-mono text-[#1A1A1A]">
                          LKR {(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Cart Footer */}
            {items.length > 0 && (
              <div className="p-5 sm:p-6 border-t border-black/10 bg-[#F4EFEA] space-y-3.5">
                
                {/* Promo Code Form */}
                {appliedPromo ? (
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#FAF6F1] border border-black/10 text-xs font-mono">
                    <span className="font-bold text-[#1A1A1A]">
                      PROMO "{appliedPromo.code}" ({appliedPromo.percent}% OFF)
                    </span>
                    <button
                      type="button"
                      onClick={() => setAppliedPromo(null)}
                      className="text-black/50 hover:text-black font-semibold underline cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="PROMO (e.g. CATWALK)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 bg-white border border-black/15 rounded-lg px-3.5 py-2.5 text-xs font-mono text-[#1A1A1A] placeholder-black/40 uppercase focus:outline-none focus:border-black min-h-[44px]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 bg-[#FAF6F1] hover:bg-white border border-black/15 text-[#1A1A1A] rounded-lg text-xs font-bold font-mono uppercase transition-colors cursor-pointer min-h-[44px]"
                    >
                      Apply
                    </button>
                  </form>
                )}

                {promoError && (
                  <div className="text-xs text-red-600 font-sans">{promoError}</div>
                )}

                {/* Subtotal & Total */}
                <div className="space-y-1.5 text-xs font-sans text-black/60 pt-1 border-t border-black/5">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-[#1A1A1A] font-mono font-semibold">LKR {rawSubtotal.toLocaleString()}</span>
                  </div>
                  {appliedPromo && (
                    <div className="flex justify-between text-emerald-700">
                      <span>Discount ({appliedPromo.percent}%)</span>
                      <span className="font-mono font-semibold">-LKR {promoDiscount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-[#1A1A1A] font-mono font-semibold">
                      {isFreeShipping ? 'FREE' : `LKR ${shippingAmount.toLocaleString()}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-[#1A1A1A] pt-2 border-t border-black/10">
                    <span>Total</span>
                    <span className="font-mono">LKR {total.toLocaleString()}</span>
                  </div>
                </div>

                {/* Standard Checkout CTA */}
                <button
                  type="button"
                  onClick={() => onCheckout({ items, total, promo: appliedPromo })}
                  className="w-full py-3.5 rounded-lg bg-[#1A1A1A] text-white text-xs font-bold font-mono tracking-widest uppercase hover:bg-black transition-all flex items-center justify-center gap-2 shadow-md active:scale-98 cursor-pointer min-h-[48px]"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Pre-filled "Order via WhatsApp" Button */}
                <button
                  type="button"
                  onClick={handleWhatsAppOrder}
                  className="w-full py-3 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold font-mono tracking-wider uppercase transition-all flex items-center justify-center gap-2 shadow-sm active:scale-98 cursor-pointer min-h-[44px]"
                >
                  <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
                  <span>Order via WhatsApp</span>
                </button>

                <div className="flex items-center justify-center gap-2 text-[11px] text-black/50 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Bank-Grade Encryption · Instant Dispatch</span>
                </div>

              </div>
            )}

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
