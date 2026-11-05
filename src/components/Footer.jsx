import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowUpRight, 
  ArrowUp, 
  ShieldCheck, 
  Globe, 
  Truck, 
  Sparkles, 
  RefreshCw 
} from 'lucide-react';
import { BRAND_INFO } from '../data/looksData';

// Custom Scalable Social Vector Icons
function InstagramIcon({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5.5" ry="5.5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokIcon({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.5 6.27 6.27 0 0 0 1.95-4.5V8.84a8.28 8.28 0 0 0 4.82 1.54V6.93a4.79 4.79 0 0 1-1-.24z" />
    </svg>
  );
}

function YouTubeIcon({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

function XTwitterIcon({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function PinterestIcon({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
    </svg>
  );
}

export function Footer() {
  const [currency, setCurrency] = useState('USD ($)');
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id) => {
    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const socialLinks = [
    {
      name: "Instagram",
      handle: "@kevixclothing",
      icon: InstagramIcon,
      href: "https://instagram.com",
      color: "hover:text-[#E1306C] hover:border-[#E1306C]/40",
      description: "Runway & Lookbook Drops"
    },
    {
      name: "TikTok",
      handle: "@kevixclothing",
      icon: TikTokIcon,
      href: "https://tiktok.com",
      color: "hover:text-[#25F4EE] hover:border-[#25F4EE]/40",
      description: "Drape in Motion & Styling"
    },
    {
      name: "YouTube",
      handle: "Kevix Archive",
      icon: YouTubeIcon,
      href: "https://youtube.com",
      color: "hover:text-[#FF0000] hover:border-[#FF0000]/40",
      description: "4K Runway Broadcasts"
    },
    {
      name: "X (Twitter)",
      handle: "@kevixclothing",
      icon: XTwitterIcon,
      href: "https://x.com",
      color: "hover:text-white hover:border-white/50",
      description: "Release Dispatches"
    },
    {
      name: "Pinterest",
      handle: "kevixclothing",
      icon: PinterestIcon,
      href: "https://pinterest.com",
      color: "hover:text-[#E60023] hover:border-[#E60023]/40",
      description: "Silhouette Moodboards"
    }
  ];

  const collections = [
    { label: "Look 01 · Indigo Sculpt", action: () => scrollToSection('catwalk-stage') },
    { label: "Look 02 · Selvedge Wide-Leg", action: () => scrollToSection('catwalk-stage') },
    { label: "Look 03 · Studio Essential", action: () => scrollToSection('catwalk-stage') },
    { label: "Look 04 · Raw Minimal", action: () => scrollToSection('catwalk-stage') },
    { label: "Look 05 · Raw Waist Selvedge", action: () => scrollToSection('catwalk-stage') },
    { label: "Curated Archive Collection", action: () => navigate('/collection') },
    { label: "Campaign Films in Motion", action: () => navigate('/campaign') }
  ];

  const concierge = [
    { label: "Sizing Architecture & Fit Guide" },
    { label: "Complimentary Global Shipping ($200+)" },
    { label: "Worldwide Tracked Dispatch" },
    { label: "Concierge Returns & Exchanges" },
    { label: "Raw Denim Washing & Care" },
    { label: "Certificate of Authenticity" }
  ];

  const maison = [
    { label: "About KevixClothing Archive" },
    { label: "Runway Atelier & Sourcing" },
    { label: "Heavyweight Shuttle Selvedge" },
    { label: "Sustainability & Low-Water Dye" },
    { label: "Private Client Appointments" },
    { label: "Press & Lookbook Inquiries" }
  ];

  return (
    <footer className="w-full bg-[#0E0E11] text-[#E5E0DB] border-t border-white/10 select-none relative overflow-hidden">
      
      {/* Subtle Luxury Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-64 bg-white/[0.025] blur-[100px] rounded-full pointer-events-none" />

      {/* Top International Trust Badges Row */}
      <div className="border-b border-white/[0.08] bg-black/40">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-xs text-white/75">
          
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-white flex-shrink-0">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-white uppercase tracking-wider text-[11px]">Worldwide Shipping</p>
              <p className="text-white/50 text-[11px] mt-0.5">Complimentary over $200</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-white flex-shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-white uppercase tracking-wider text-[11px]">Authentic Selvedge</p>
              <p className="text-white/50 text-[11px] mt-0.5">Shuttle loom raw denim</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-white flex-shrink-0">
              <RefreshCw className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-white uppercase tracking-wider text-[11px]">Concierge Returns</p>
              <p className="text-white/50 text-[11px] mt-0.5">30-day seamless exchanges</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-white flex-shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-white uppercase tracking-wider text-[11px]">Secure Encryption</p>
              <p className="text-white/50 text-[11px] mt-0.5">Bank-grade protected checkout</p>
            </div>
          </div>

        </div>
      </div>

      {/* Main Multi-Column Links & Social Grid */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-14 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          
          {/* Column 1: Brand Atelier Statement (Spans 2 cols on desktop) */}
          <div className="lg:col-span-2 pr-0 lg:pr-8">
            <div 
              onClick={scrollToTop}
              className="flex items-center gap-3 cursor-pointer group mb-5"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20 bg-black shadow-lg flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
                <img 
                  src="/logo-round.png" 
                  alt={BRAND_INFO.fullName || 'KevixClothing'} 
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="tracking-[0.18em] font-extrabold text-xl text-white font-sans uppercase">
                {BRAND_INFO.name || 'KevixClothing'}
              </span>
            </div>

            <p className="text-sm text-white/65 leading-relaxed font-sans max-w-sm">
              Sculpted raw selvedge denim and architectural silhouettes engineered for effortless movement. Designed with relentless precision in limited editions.
            </p>

            {/* Atelier Locations */}
            <div className="mt-6 pt-6 border-t border-white/[0.08] flex items-center gap-3 text-xs text-white/50 font-mono uppercase tracking-wider">
              <span>New York</span>
              <span>·</span>
              <span>Paris</span>
              <span>·</span>
              <span>Tokyo</span>
              <span>·</span>
              <span>London</span>
            </div>

            {/* Global Currency & Language Selector */}
            <div className="mt-5 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setCurrency((prev) => (prev === 'USD ($)' ? 'EUR (€)' : prev === 'EUR (€)' ? 'GBP (£)' : 'USD ($)'))}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-xs text-white/80 transition-colors cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5 text-white/60" />
                <span>Global Edition · {currency}</span>
              </button>
            </div>
          </div>

          {/* Column 2: Collection Archive */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-white/40 mb-4">
              Collection
            </h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              {collections.map((item, idx) => (
                <li key={idx}>
                  <button
                    type="button"
                    onClick={item.action}
                    className="hover:text-white transition-colors duration-150 text-left cursor-pointer flex items-center gap-1 group/link"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Client Concierge */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-white/40 mb-4">
              Concierge
            </h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              {concierge.map((item, idx) => (
                <li key={idx}>
                  <a
                    href="#concierge"
                    onClick={(e) => e.preventDefault()}
                    className="hover:text-white transition-colors duration-150 block text-left"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: The Maison */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-white/40 mb-4">
              The Maison
            </h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              {maison.map((item, idx) => (
                <li key={idx}>
                  <a
                    href="#maison"
                    onClick={(e) => e.preventDefault()}
                    className="hover:text-white transition-colors duration-150 block text-left"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Dedicated Social Media Channels Showcase */}
        <div className="mt-14 pt-10 border-t border-white/[0.08]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-white/40">
                Official Channels & Social Archive
              </h4>
              <p className="text-sm text-white/70 mt-1">
                Follow our creative journey, behind-the-scenes runway clips, and release announcements.
              </p>
            </div>
            
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              className="self-start sm:self-auto inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/70 hover:text-white px-4 py-2 rounded-full border border-white/10 hover:border-white/30 bg-white/[0.03] transition-all active:scale-95 cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Social Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl ${social.color}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-full bg-white/[0.06] group-hover:bg-white/10 flex items-center justify-center transition-colors">
                      <Icon className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>

                  <div className="mt-4">
                    <p className="text-sm font-bold text-white group-hover:text-white transition-colors">
                      {social.name}
                    </p>
                    <p className="text-xs text-white/50 font-mono mt-0.5">
                      {social.handle}
                    </p>
                    <p className="text-[11px] text-white/40 mt-1 line-clamp-1">
                      {social.description}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>

        </div>

      </div>

      {/* Massive Editorial Watermark Typography */}
      <div className="w-full overflow-hidden pointer-events-none select-none border-t border-white/[0.04]">
        <div className="text-center font-extrabold text-[12vw] sm:text-[10vw] lg:text-[8.5vw] leading-none tracking-[0.16em] uppercase text-white/[0.03] py-2 whitespace-nowrap">
          KEVIXCLOTHING
        </div>
      </div>

      {/* Bottom Legal & Copyright Bar */}
      <div className="border-t border-white/[0.08] bg-black/60">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/45">
          
          <div className="flex items-center gap-3">
            <span className="font-bold text-white/80 tracking-wider">
              {BRAND_INFO.fullName || 'KEVIXCLOTHING'}
            </span>
            <span>© 2026 ARCHIVE. ALL RIGHTS RESERVED.</span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center text-white/50">
            <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">Privacy Policy</a>
            <span>·</span>
            <a href="#terms" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">Terms of Service</a>
            <span>·</span>
            <a href="#cookies" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">Cookie Settings</a>
            <span>·</span>
            <a href="#accessibility" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">Accessibility</a>
            <span>·</span>
            <a href="#compliance" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">Supply Chain</a>
          </div>

        </div>
      </div>

    </footer>
  );
}

