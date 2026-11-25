import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, ExternalLink, MessageSquare, X } from 'lucide-react';
import { KevixWordmark } from './KevixWordmark';

const LEGAL_CONTENT = {
  privacy: {
    title: 'Privacy Policy',
    body: [
      'KevixClothing collects only the details you voluntarily share when subscribing to drop notifications or placing an order via WhatsApp (such as your name, delivery address, contact number, and custom sizing measurements).',
      'Your details are used strictly to process, tailor, and deliver your garments and provide order support. We never sell or rent customer information to third parties.',
      'To request removal or correction of your contact details at any time, message our atelier team via WhatsApp Live Chat.'
    ]
  },
  terms: {
    title: 'Terms & Conditions',
    body: [
      'All prices on KevixClothing are listed in Sri Lankan Rupees (LKR). Standard islandwide courier delivery is LKR 350, with complimentary shipping on orders of LKR 10,000 or more.',
      'Custom-sized orders (available for True Waist Baggy Jeans and Zip Up Corset Tops) are tailored to the measurements you confirm with our team and are non-refundable once cutting begins.',
      'Exchanges on unworn standard-size garments with original tags intact may be requested within 7 days of delivery via WhatsApp Live Chat.'
    ]
  }
};

export function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [activeLegal, setActiveLegal] = useState(null);
  const legalDialogRef = useRef(null);

  useEffect(() => {
    const dialog = legalDialogRef.current;
    if (!dialog) return;

    if (activeLegal) {
      if (!dialog.open) dialog.showModal();
    } else if (dialog.open) {
      dialog.close();
    }
  }, [activeLegal]);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setIsSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setIsSubscribed(false);
      }, 3500);
    }
  };

  const handleLiveChat = () => {
    const msg = encodeURIComponent('Hello KevixClothing! I have an inquiry about the FW26 Archive.');
    window.open(`https://wa.me/?text=${msg}`, '_blank', 'noopener,noreferrer');
  };

  const currentDoc = activeLegal ? LEGAL_CONTENT[activeLegal] : null;

  return (
    <footer className="w-full bg-black text-white select-none overflow-hidden">
      {/* 1. TOP EDGE-TO-EDGE GEOMETRIC WORDMARK */}
      <div className="w-full pt-[clamp(1rem,2.5vw,2.25rem)] pb-[clamp(0.5rem,1.5vw,1.25rem)] px-[1.8%] flex items-center justify-center overflow-hidden">
        <div className="w-full flex items-center justify-center">
          <KevixWordmark
            mode="condensed"
            className="w-full h-auto fill-white select-none"
          />
        </div>
      </div>

      {/* 2. PROPORTIONAL 3-COLUMN INFORMATION ROW (Preserves exact layout across all viewport sizes) */}
      <div className="w-full px-[3%] pt-[clamp(1rem,2.8vw,2.5rem)] pb-[clamp(1.25rem,3.5vw,3.25rem)]">
        <div className="w-full flex flex-row items-start">
          {/* Column 1: Sign up now (0% -> 34.1% width) */}
          <div className="w-[38%] sm:w-[34.1%] pr-[3.5%] sm:pr-[4.4%] flex-shrink-0">
            <h3 className="font-sans italic font-bold text-[clamp(0.72rem,1.35vw,0.95rem)] text-white tracking-tight leading-snug">
              Sign up now
            </h3>
            <p className="text-[clamp(0.55rem,0.95vw,0.75rem)] text-white/50 mt-[clamp(0.2rem,0.5vw,0.45rem)] font-sans leading-relaxed">
              Notifications you won't want to ignore.
            </p>

            {/* Clean Underline Input Form matching reference proportions */}
            <form onSubmit={handleSubscribe} className="mt-[clamp(0.85rem,2.2vw,1.75rem)] w-full">
              <div className="relative border-b border-white/25 focus-within:border-white transition-colors pb-[clamp(0.25rem,0.5vw,0.45rem)] flex items-center justify-between gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  aria-label="Email address"
                  autoComplete="email"
                  required
                  className="bg-transparent text-[clamp(0.55rem,0.95vw,0.75rem)] text-white placeholder-white/40 focus:outline-none w-full font-sans min-w-0"
                />

                <button
                  type="submit"
                  className="text-[clamp(0.55rem,0.95vw,0.75rem)] font-bold text-white whitespace-nowrap hover:text-white/75 transition-colors cursor-pointer flex items-center justify-center flex-shrink-0"
                >
                  {isSubscribed ? (
                    <span className="flex items-center gap-1 text-emerald-400">
                      <Check aria-hidden="true" className="w-3 h-3" />
                      <span>Subscribed</span>
                    </span>
                  ) : (
                    <span>Sign up</span>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Column 2: Shop */}
          <div className="w-[24%] sm:w-[13.2%] pr-[2%] flex-shrink-0">
            <h4 className="text-[clamp(0.55rem,0.9vw,0.7rem)] font-sans font-medium text-white/50 mb-[clamp(0.5rem,1.2vw,1rem)]">
              Shop
            </h4>
            <ul className="space-y-[clamp(0.35rem,0.85vw,0.65rem)] text-[clamp(0.58rem,1vw,0.78rem)] font-sans font-medium text-white">
              <li>
                <Link to="/collection" className="hover:text-white/70 transition-colors block leading-snug">
                  Men
                </Link>
              </li>
              <li>
                <Link to="/collection" className="hover:text-white/70 transition-colors block leading-snug">
                  Women
                </Link>
              </li>
              <li>
                <Link to="/collection" className="hover:text-white/70 transition-colors block leading-snug">
                  Accessories
                </Link>
              </li>
              <li>
                <Link to="/collection" className="hover:text-white/70 transition-colors block leading-snug">
                  Gifts
                </Link>
              </li>
              <li>
                <Link to="/collection" className="hover:text-white/70 transition-colors block leading-snug">
                  Last Chance
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Information */}
          <div className="w-[38%] sm:w-[22%] flex-shrink-0">
            <h4 className="text-[clamp(0.55rem,0.9vw,0.7rem)] font-sans font-medium text-white/50 mb-[clamp(0.5rem,1.2vw,1rem)]">
              Information
            </h4>
            <ul className="space-y-[clamp(0.35rem,0.85vw,0.65rem)] text-[clamp(0.58rem,1vw,0.78rem)] font-sans font-medium text-white">
              <li>
                <span className="hover:text-white/70 transition-colors cursor-pointer block leading-snug">
                  Careers
                </span>
              </li>
              <li>
                <span className="hover:text-white/70 transition-colors cursor-pointer block leading-snug">
                  FAQ
                </span>
              </li>
              <li>
                <span className="hover:text-white/70 transition-colors cursor-pointer block leading-snug">
                  Submit a request
                </span>
              </li>
              <li>
                <span className="hover:text-white/70 transition-colors cursor-pointer block leading-snug">
                  Returns &amp; Exchanges
                </span>
              </li>
              <li>
                <span className="hover:text-white/70 transition-colors cursor-pointer block leading-snug">
                  Shipping Policy
                </span>
              </li>
              <li>
                <span className="hover:text-white/70 transition-colors cursor-pointer block leading-snug">
                  Contact Us
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 3. BOTTOM LEGAL, COMMUNITY & DEVELOPER CREDIT BAR */}
      <div className="w-full px-[3%]">
        <div className="w-full border-t border-white/10 pt-[clamp(1.1rem,2vw,1.65rem)] pb-[clamp(1.25rem,2.4vw,2rem)] flex flex-col gap-3">
          {/* Copyright Row */}
          <p className="text-[11px] sm:text-xs font-sans text-white/45 tracking-wide">
            © 2026 KEVIXCLOTHING. All Rights Reserved.
          </p>

          {/* Dot-Separated Legal, Social & Developer Links */}
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-2 text-[11px] sm:text-xs font-sans leading-relaxed">
            <button
              type="button"
              onClick={() => setActiveLegal('privacy')}
              className="text-white/90 hover:text-white font-medium transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded-xs"
            >
              Privacy Policy
            </button>

            <span aria-hidden="true" className="text-white/30">•</span>

            <button
              type="button"
              onClick={() => setActiveLegal('terms')}
              className="text-white/90 hover:text-white font-medium transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded-xs"
            >
              Terms &amp; Conditions
            </button>

            <span aria-hidden="true" className="text-white/30">•</span>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sky-400 hover:text-sky-300 underline underline-offset-4 decoration-sky-400/50 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 rounded-xs"
            >
              <span>Instagram Community</span>
              <ExternalLink aria-hidden="true" className="w-3 h-3 shrink-0" />
            </a>

            <span aria-hidden="true" className="hidden sm:inline text-white/30">•</span>

            <button
              type="button"
              onClick={handleLiveChat}
              className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-medium transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400 rounded-xs"
            >
              <MessageSquare aria-hidden="true" className="w-3 h-3 shrink-0" />
              <span>WhatsApp Live Chat</span>
              <ExternalLink aria-hidden="true" className="w-3 h-3 shrink-0" />
            </button>

            <span aria-hidden="true" className="text-white/30">•</span>

            <a
              href="https://www.vasterglobal.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1 text-white/55 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded-xs"
            >
              <span>Developed by</span>
              <strong className="font-semibold text-white">VasterGlobal</strong>
              <ExternalLink aria-hidden="true" className="w-3 h-3 shrink-0 text-white/50 group-hover:text-white transition-colors" />
            </a>
          </div>
        </div>
      </div>

      {/* Native Accessible Legal Policy Dialog */}
      <dialog
        ref={legalDialogRef}
        aria-labelledby="footer-legal-title"
        closedby="any"
        onClose={() => setActiveLegal(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setActiveLegal(null);
        }}
        className="m-auto w-[92vw] max-w-lg rounded-2xl bg-[#111113] border border-white/15 text-white p-0 shadow-2xl backdrop:bg-black/70 backdrop:backdrop-blur-sm"
      >
        {currentDoc && (
          <div className="p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
              <h2 id="footer-legal-title" className="font-serif text-2xl text-white tracking-tight">
                {currentDoc.title}
              </h2>
              <button
                type="button"
                onClick={() => setActiveLegal(null)}
                aria-label={`Close ${currentDoc.title}`}
                className="min-w-[44px] min-h-[44px] rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <X aria-hidden="true" className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3 text-sm text-white/75 font-sans leading-relaxed">
              {currentDoc.body.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>
        )}
      </dialog>
    </footer>
  );
}
