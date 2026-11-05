import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MessageSquare, Check, ArrowRight } from 'lucide-react';
import { BRAND_INFO } from '../data/looksData';
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
  const navigate = useNavigate();

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
    <footer className="w-full bg-black text-white select-none overflow-hidden border-t border-white/10">
      
      {/* 1. TOP ULTRA-MASSIVE EDGE-TO-EDGE GEOMETRIC WORDMARK */}
      <div className="w-full pt-8 sm:pt-14 pb-4 sm:pb-8 px-2 sm:px-6 flex items-center justify-center overflow-hidden border-b border-white/10">
        <div className="w-full max-w-[1700px] mx-auto flex items-center justify-center">
          <KevixWordmark 
            mode="condensed" 
            className="w-full h-auto max-h-[140px] sm:max-h-[220px] md:max-h-[280px] fill-white select-none drop-shadow-[0_4px_30px_rgba(255,255,255,0.08)]" 
          />
        </div>
      </div>

      {/* 2. MAIN 3-COLUMN CONTENT SECTION */}
      <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 lg:gap-14">
          
          {/* Left Column: Sign up now (Spans 5 cols on desktop) */}
          <div className="md:col-span-5 lg:col-span-6 pr-0 md:pr-6 lg:pr-14">
            <h3 className="font-serif italic text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Sign up now
            </h3>
            <p className="text-xs sm:text-sm text-white/55 mt-1.5 font-sans">
              Notifications you won't want to ignore.
            </p>

            {/* Clean Underline Input Form matching the reference design */}
            <form onSubmit={handleSubscribe} className="mt-6 max-w-md">
              <div className="relative border-b border-white/25 focus-within:border-white transition-colors pb-2 flex items-center justify-between">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  required
                  className="bg-transparent text-sm text-white placeholder-white/40 focus:outline-none w-full font-sans pr-4"
                />
                
                <button
                  type="submit"
                  className="text-xs font-bold text-white uppercase tracking-wider whitespace-nowrap hover:text-white/70 transition-colors cursor-pointer min-h-[36px] flex items-center justify-center pl-2"
                >
                  {isSubscribed ? (
                    <span className="flex items-center gap-1 text-emerald-400">
                      <Check className="w-3.5 h-3.5" />
                      <span>Subscribed</span>
                    </span>
                  ) : (
                    <span>Sign up</span>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Middle Column: Shop (Spans 3 cols on desktop) */}
          <div className="md:col-span-3 lg:col-span-3">
            <h4 className="text-xs font-sans text-white/50 tracking-wider mb-4">
              Shop
            </h4>
            <ul className="space-y-2.5 text-sm font-sans text-white">
              <li>
                <Link to="/collection" className="hover:text-white/70 transition-colors block">
                  Men
                </Link>
              </li>
              <li>
                <Link to="/collection" className="hover:text-white/70 transition-colors block">
                  Women
                </Link>
              </li>
              <li>
                <Link to="/collection" className="hover:text-white/70 transition-colors block">
                  Accessories
                </Link>
              </li>
              <li>
                <Link to="/collection" className="hover:text-white/70 transition-colors block">
                  Gifts
                </Link>
              </li>
              <li>
                <Link to="/collection" className="hover:text-white/70 transition-colors block">
                  Last Chance
                </Link>
              </li>
            </ul>
          </div>

          {/* Right Column: Information (Spans 4 cols on desktop) */}
          <div className="md:col-span-4 lg:col-span-3">
            <h4 className="text-xs font-sans text-white/50 tracking-wider mb-4">
              Information
            </h4>
            <ul className="space-y-2.5 text-sm font-sans text-white">
              <li>
                <span className="hover:text-white/70 transition-colors cursor-pointer block">
                  Careers
                </span>
              </li>
              <li>
                <span className="hover:text-white/70 transition-colors cursor-pointer block">
                  FAQ
                </span>
              </li>
              <li>
                <span className="hover:text-white/70 transition-colors cursor-pointer block">
                  Submit a request
                </span>
              </li>
              <li>
                <span className="hover:text-white/70 transition-colors cursor-pointer block">
                  Returns &amp; Exchanges
                </span>
              </li>
              <li>
                <span className="hover:text-white/70 transition-colors cursor-pointer block">
                  Shipping Policy
                </span>
              </li>
              <li>
                <span className="hover:text-white/70 transition-colors cursor-pointer block">
                  Contact Us
                </span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* 3. BOTTOM BAR: Socials, Bold Italic Tagline, Copyright & Live Chat */}
      <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 pt-6 pb-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: Minimalist Social Icons */}
        <div className="flex items-center gap-4 text-white/75">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hover:text-white transition-colors"
          >
            <InstagramIcon className="w-4 h-4" />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="hover:text-white transition-colors"
          >
            <YouTubeIcon className="w-4 h-4" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-white transition-colors"
          >
            <LinkedInIcon className="w-4 h-4" />
          </a>
        </div>

        {/* Center: Stylish Geometric High-Fashion Tagline */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 group">
          <span className="hidden sm:inline-block w-6 md:w-12 h-px bg-gradient-to-r from-transparent via-white/20 to-white/50" />
          <div className="flex items-center transform -skew-x-[11deg] transition-all duration-300 group-hover:scale-105 drop-shadow-[0_0_12px_rgba(255,255,255,0.25)] group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.65)]">
            <BeBetterEverydayWordmark className="h-3 sm:h-3.5 md:h-4 w-auto fill-white select-none" />
          </div>
          <span className="hidden sm:inline-block w-6 md:w-12 h-px bg-gradient-to-l from-transparent via-white/20 to-white/50" />
        </div>

        {/* Right: Copyright & Live Chat Pill Button */}
        <div className="flex items-center gap-4 text-xs font-sans text-white/60">
          <span>© 2026 KevixClothing</span>

          {/* Live Chat Pill Button */}
          <button
            type="button"
            onClick={handleLiveChat}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-sans text-white transition-all active:scale-95 cursor-pointer shadow-sm"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Live chat</span>
          </button>
        </div>

      </div>

    </footer>
  );
}
