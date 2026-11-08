import React, { useRef, useEffect } from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export function CheckoutModal({ isOpen, onClose, orderDetails, onClearCart }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#161513', '#ded6ca', '#f4efe6', '#9c978f']
        });
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }

    const handleCancel = (e) => {
      e.preventDefault();
      onClose();
    };

    dialog.addEventListener('cancel', handleCancel);
    return () => dialog.removeEventListener('cancel', handleCancel);
  }, [isOpen, onClose]);

  if (!orderDetails) return null;

  const orderNumber = `KVX-${Math.floor(100000 + Math.random() * 900000)}`;

  const handleFinish = () => {
    onClearCart();
    onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="checkout-modal-title"
      closedby="any"
      className="m-auto rounded-2xl bg-[#faf7f2] border border-stone-200 text-[#161513] shadow-2xl p-0 overflow-hidden max-w-md w-[92vw] z-50 backdrop:bg-black/40 backdrop:backdrop-blur-sm"
    >
      <div className="p-8 text-center space-y-5">
        
        {/* Success Icon */}
        <div className="w-14 h-14 rounded-full bg-stone-200 flex items-center justify-center mx-auto text-[#161513]">
          <CheckCircle2 className="w-7 h-7" />
        </div>

        {/* Title */}
        <div>
          <span className="text-[10px] uppercase tracking-widest text-stone-500 font-semibold block">
            ORDER CONFIRMED
          </span>
          <h2 id="checkout-modal-title" className="font-serif text-3xl font-normal text-[#161513] mt-1">
            Thank you for your order
          </h2>
          <p className="text-xs text-stone-600 mt-1 font-mono">
            REFERENCE: {orderNumber}
          </p>
        </div>

        {/* Order Details Card */}
        <div className="p-4 rounded-xl bg-white border border-stone-200 text-left space-y-2 text-xs">
          <div className="flex justify-between text-stone-600">
            <span>Items Ordered:</span>
            <span className="text-black font-semibold">{orderDetails.items.length} items</span>
          </div>
          <div className="flex justify-between text-stone-600">
            <span>Estimated Delivery:</span>
            <span className="text-black font-semibold">2 - 4 Business Days</span>
          </div>
          <div className="flex justify-between text-stone-800 pt-2 border-t border-stone-100 text-sm font-semibold">
            <span>Total Paid:</span>
            <span className="text-black font-bold">LKR {orderDetails.total.toLocaleString()}</span>
          </div>
        </div>

        {/* Finish button */}
        <button
          onClick={handleFinish}
          className="w-full py-3.5 rounded-lg bg-[#161513] text-white text-xs font-semibold tracking-wider uppercase hover:bg-black transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Return to Shop</span>
          <ArrowRight className="w-4 h-4" />
        </button>

      </div>
    </dialog>
  );
}
