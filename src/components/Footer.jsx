import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Check } from 'lucide-react';
import { KevixWordmark } from './KevixWordmark';
import { BeBetterEverydayWordmark } from './BeBetterEverydayWordmark';

function InstagramIcon({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function YouTubeIcon({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

function LinkedInIcon({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  );
}

export function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

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
    const msg = encodeURIComponent("Hello KevixClothing! I have an inquiry about the FW26 Archive.");
    window.open(`https://wa.me/?text=${msg}`, '_blank', 'noopener,noreferrer');
  };

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
                  required
                  className="bg-transparent text-[clamp(0.55rem,0.95vw,0.75rem)] text-white placeholder-white/40 focus:outline-none w-full font-sans min-w-0"
                />
                
                <button
                  type="submit"
                  className="text-[clamp(0.55rem,0.95vw,0.75rem)] font-bold text-white whitespace-nowrap hover:text-white/75 transition-colors cursor-pointer flex items-center justify-center flex-shrink-0"
                >
                  {isSubscribed ? (
                    <span className="flex items-center gap-1 text-emerald-400">
                      <Check className="w-3 h-3" />
                      <span>Subscribed</span>
                    </span>
                  ) : (
                    <span>Sign up</span>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Column 2: Shop (Starts at ~37.1% of footer width) */}
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

          {/* Column 3: Information (Starts at ~49.5% of footer width) */}
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

      {/* 3. BOTTOM BAR: Socials (Left), Tagline (Center), Copyright & Live Chat (Right) */}
      <div className="w-full px-[3%] pt-[clamp(0.5rem,1.2vw,1rem)] pb-[clamp(0.85rem,1.8vw,1.5rem)] flex flex-row items-center justify-between relative">
        
        {/* Left: Minimalist Social Icons */}
        <div className="flex items-center gap-[clamp(0.5rem,1.1vw,1rem)] text-white/60 z-10">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hover:text-white transition-colors"
          >
            <InstagramIcon className="w-[clamp(11px,1.2vw,15px)] h-[clamp(11px,1.2vw,15px)]" />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="hover:text-white transition-colors"
          >
            <YouTubeIcon className="w-[clamp(11px,1.2vw,15px)] h-[clamp(11px,1.2vw,15px)]" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-white transition-colors"
          >
            <LinkedInIcon className="w-[clamp(11px,1.2vw,15px)] h-[clamp(11px,1.2vw,15px)]" />
          </a>
        </div>

        {/* Center: Stylish Geometric High-Fashion Tagline (Mathematically Centered) */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-none">
          <div className="flex items-center transform -skew-x-[11deg] drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
            <BeBetterEverydayWordmark className="h-[clamp(8px,1.05vw,13px)] w-auto fill-white select-none" />
          </div>
        </div>

        {/* Right: Copyright & Live Chat Pill Button */}
        <div className="flex items-center gap-[clamp(0.4rem,1vw,0.85rem)] text-[clamp(0.5rem,0.85vw,0.7rem)] font-sans text-white/45 z-10">
          <span className="whitespace-nowrap">© 2026 KevixClothing</span>

          {/* Live Chat Pill Button */}
          <button
            type="button"
            onClick={handleLiveChat}
            className="inline-flex items-center gap-[clamp(0.3rem,0.6vw,0.5rem)] px-[clamp(0.55rem,1.2vw,1rem)] py-[clamp(0.3rem,0.65vw,0.55rem)] rounded-full bg-[#1C1C1E] hover:bg-[#2A2A2D] text-[clamp(0.55rem,0.9vw,0.75rem)] font-sans font-medium text-white transition-all active:scale-95 cursor-pointer shadow-md"
          >
            <MessageSquare className="w-[clamp(10px,1vw,14px)] h-[clamp(10px,1vw,14px)]" />
            <span className="whitespace-nowrap">Live chat</span>
          </button>
        </div>

      </div>

    </footer>
  );
}
