import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  User, 
  ShoppingBag, 
  X, 
  ArrowRight, 
  Sparkles, 
  MessageCircle, 
  ShieldCheck, 
  Truck,
  Plus
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BRAND_INFO, ARCHIVE_PRODUCTS } from '../data/looksData';
import { KevixWordmark } from './KevixWordmark';

export function Navbar({ 
  cartCount = 0, 
  onOpenCart,
  onAddToCart
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === '/';
  const isCollectionPage = location.pathname.startsWith('/collection');
  const isCampaignPage = location.pathname.startsWith('/campaign');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close modals on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsAccountOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Autofocus search input when search modal opens
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    } else {
      setSearchQuery('');
    }
  }, [isSearchOpen]);

  // Close modals when navigating
  useEffect(() => {
    setIsSearchOpen(false);
    setIsAccountOpen(false);
  }, [location.pathname]);

  // On non-home pages (like /collection or /campaign), always provide high contrast background
  const hasSolidNav = !isHomePage || isScrolled;

  // Filter products for search overlay
  const filteredProducts = searchQuery.trim() === ''
    ? []
    : ARCHIVE_PRODUCTS.filter((item) => {
        const q = searchQuery.toLowerCase();
        return (
          item.name.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          (item.tag && item.tag.toLowerCase().includes(q)) ||
          (item.details && item.details.toLowerCase().includes(q))
        );
      });

  const popularSearches = [
    "Raw Selvedge Denim",
    "Zip Up Corset",
    "Cropped Boxy Tee",
    "Baggy Jean",
    "Studio White Tee"
  ];

  return (
    <>
      <header 
        className={`fixed top-0 inset-x-0 z-40 w-full flex flex-col select-none transition-all duration-300 ${
          hasSolidNav 
            ? 'bg-white/85 backdrop-blur-md border-b border-black/10 shadow-[0_4px_20px_rgba(0,0,0,0.03)] text-[#1A1A1A]' 
            : 'bg-black/30 backdrop-blur-xs border-b border-white/10 text-white'
        }`}
      >
        {/* Main Primary Row: Brand Logo & Desktop Nav & Actions */}
        <div className="w-full max-w-7xl 2xl:max-w-[1540px] mx-auto h-16 sm:h-20 px-4 sm:px-8 lg:px-12 flex items-center justify-between relative">
          
          {/* Brand Identity: Circular Logo + KevixClothing Stylized Geometric Wordmark */}
          <Link 
            to="/"
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group py-2 -ml-2 pl-2 transition-transform duration-200 min-h-[44px] z-10"
          >
            {/* Round Logo */}
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-white/20 bg-black shadow-sm flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
              <img 
                src="/logo-round.png" 
                alt={BRAND_INFO.fullName || 'KevixClothing'} 
                className="w-full h-full object-cover"
              />
            </div>

            {/* KevixClothing Stylized Geometric Logotype */}
            <div className="flex items-center">
              <KevixWordmark 
                mode="full" 
                className="h-3.5 sm:h-4.5 md:h-5 w-auto fill-current" 
              />
            </div>
          </Link>

          {/* Center Navigation Links (Desktop >= 768px): Mathematically Centered */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10 absolute left-1/2 -translate-x-1/2 h-full">
            <Link 
              to="/" 
              className={`inline-flex items-center text-sm font-semibold tracking-wide uppercase transition-all duration-200 pb-1 border-b-2 ${
                isHomePage
                  ? hasSolidNav ? 'text-black border-black' : 'text-white border-white'
                  : hasSolidNav ? 'text-neutral-800 hover:text-black border-transparent' : 'text-white/80 hover:text-white border-transparent'
              }`}
            >
              Runway
            </Link>

            <Link 
              to="/collection" 
              className={`inline-flex items-center text-sm font-semibold tracking-wide uppercase transition-all duration-200 pb-1 border-b-2 ${
                isCollectionPage
                  ? hasSolidNav ? 'text-black border-black' : 'text-white border-white'
                  : hasSolidNav ? 'text-neutral-800 hover:text-black border-transparent' : 'text-white/80 hover:text-white border-transparent'
              }`}
            >
              Collection
            </Link>

            <Link 
              to="/campaign" 
              className={`inline-flex items-center text-sm font-semibold tracking-wide uppercase transition-all duration-200 pb-1 border-b-2 ${
                isCampaignPage
                  ? hasSolidNav ? 'text-black border-black' : 'text-white border-white'
                  : hasSolidNav ? 'text-neutral-800 hover:text-black border-transparent' : 'text-white/80 hover:text-white border-transparent'
              }`}
            >
              Campaign
            </Link>
          </nav>

          {/* Right Action Icons: Search, User, Bag (Minimal Outline Suite) */}
          <div className="flex items-center gap-1 sm:gap-2">
            
            {/* 1. Search Icon Button */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search Collection"
              className={`min-w-[40px] sm:min-w-[44px] min-h-[40px] sm:min-h-[44px] flex items-center justify-center cursor-pointer transition-all duration-200 hover:opacity-70 active:scale-90 ${
                hasSolidNav ? 'text-[#1A1A1A]' : 'text-white'
              }`}
            >
              <Search className="w-5 h-5 stroke-[1.6]" />
            </button>

            {/* 2. User Account / Concierge Icon Button */}
            <button
              type="button"
              onClick={() => setIsAccountOpen(true)}
              aria-label="Account & Concierge"
              className={`min-w-[40px] sm:min-w-[44px] min-h-[40px] sm:min-h-[44px] flex items-center justify-center cursor-pointer transition-all duration-200 hover:opacity-70 active:scale-90 ${
                hasSolidNav ? 'text-[#1A1A1A]' : 'text-white'
              }`}
            >
              <User className="w-5 h-5 stroke-[1.6]" />
            </button>

            {/* 3. Shopping Bag Icon Button */}
            <button
              type="button"
              onClick={onOpenCart}
              aria-label={`Open Shopping Bag (${cartCount} items)`}
              className={`relative min-w-[40px] sm:min-w-[44px] min-h-[40px] sm:min-h-[44px] flex items-center justify-center cursor-pointer transition-all duration-200 hover:opacity-70 active:scale-90 ${
                hasSolidNav ? 'text-[#1A1A1A]' : 'text-white'
              }`}
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.6]" />
              {cartCount > 0 && (
                <span className={`absolute top-1 sm:top-1.5 right-1 sm:right-1.5 min-w-[16px] h-4 px-1 rounded-full text-[10px] font-mono font-bold flex items-center justify-center leading-none ${
                  hasSolidNav ? 'bg-[#1A1A1A] text-white' : 'bg-white text-black'
                }`}>
                  {cartCount}
                </span>
              )}
            </button>

          </div>

        </div>

        {/* Dedicated Mobile Navigation Strip: RUNWAY | COLLECTION | CAMPAIGN */}
        <nav 
          aria-label="Mobile Navigation Strip"
          className={`flex md:hidden w-full items-center justify-center gap-7 sm:gap-9 py-2.5 border-t text-sm font-semibold tracking-wide uppercase transition-colors ${
            hasSolidNav 
              ? 'border-black/5 bg-white/95 text-neutral-800' 
              : 'border-white/10 bg-black/60 text-white'
          }`}
        >
          <Link 
            to="/" 
            className={`pb-1 border-b-2 transition-all ${
              isHomePage
                ? hasSolidNav ? 'text-black border-black' : 'text-white border-white'
                : hasSolidNav ? 'text-neutral-800 hover:text-black border-transparent' : 'text-white/75 hover:text-white border-transparent'
            }`}
          >
            Runway
          </Link>

          <Link 
            to="/collection" 
            className={`pb-1 border-b-2 transition-all ${
              isCollectionPage
                ? hasSolidNav ? 'text-black border-black' : 'text-white border-white'
                : hasSolidNav ? 'text-neutral-800 hover:text-black border-transparent' : 'text-white/75 hover:text-white border-transparent'
            }`}
          >
            Collection
          </Link>

          <Link 
            to="/campaign" 
            className={`pb-1 border-b-2 transition-all ${
              isCampaignPage
                ? hasSolidNav ? 'text-black border-black' : 'text-white border-white'
                : hasSolidNav ? 'text-neutral-800 hover:text-black border-transparent' : 'text-white/75 hover:text-white border-transparent'
            }`}
          >
            Campaign
          </Link>
        </nav>

      </header>

      {/* Interactive Search Modal Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 select-none">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSearchOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="relative w-full max-w-2xl bg-[#FAF6F1] rounded-2xl border border-black/15 shadow-2xl p-6 sm:p-8 flex flex-col gap-6 z-10 max-h-[82vh] overflow-hidden"
            >
              {/* Search Bar Input */}
              <div className="flex items-center gap-3 pb-4 border-b border-black/10">
                <Search className="w-5 h-5 text-black/40 flex-shrink-0 stroke-[2]" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search raw selvedge, corsets, tees, essentials..."
                  className="w-full bg-transparent text-[#1A1A1A] text-base sm:text-lg font-sans placeholder:text-black/35 focus:outline-hidden"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="p-1 text-black/40 hover:text-black cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(false)}
                  className="p-2 rounded-full hover:bg-black/5 text-black/60 hover:text-black cursor-pointer transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Search Content / Results */}
              <div className="overflow-y-auto no-scrollbar flex-1 space-y-6">
                
                {/* When Query is Empty: Popular Keywords & Quick Links */}
                {searchQuery.trim() === '' ? (
                  <div className="space-y-6">
                    <div>
                      <span className="text-xs font-mono uppercase tracking-[0.2em] text-black/50 block mb-3">
                        Trending Searches
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {popularSearches.map((term) => (
                          <button
                            key={term}
                            type="button"
                            onClick={() => setSearchQuery(term)}
                            className="px-3.5 py-1.5 rounded-full bg-black/5 hover:bg-black/10 border border-black/5 text-xs font-sans text-black/80 transition-all cursor-pointer"
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-black/10 flex items-center justify-between">
                      <span className="text-xs font-mono text-black/50">
                        Explore full archive catalogue
                      </span>
                      <Link
                        to="/collection"
                        onClick={() => setIsSearchOpen(false)}
                        className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider font-bold text-[#1A1A1A] hover:underline"
                      >
                        <span>View All 12 Pieces</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ) : filteredProducts.length > 0 ? (
                  /* Found Products List */
                  <div className="space-y-3">
                    <span className="text-xs font-mono uppercase tracking-[0.2em] text-black/50 block">
                      Found {filteredProducts.length} {filteredProducts.length === 1 ? 'Silhouette' : 'Silhouettes'}
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {filteredProducts.map((prod) => (
                        <div
                          key={prod.id}
                          className="flex items-center gap-3.5 p-3 rounded-xl bg-white border border-black/10 hover:border-black/30 transition-all group"
                        >
                          <img
                            src={prod.primaryImage}
                            alt={prod.name}
                            className="w-14 h-18 object-cover rounded-lg bg-black/5 flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <span className="text-[10px] font-mono uppercase text-black/50 tracking-wider block">
                              {prod.category}
                            </span>
                            <h4 className="font-serif text-base text-[#1A1A1A] truncate group-hover:underline">
                              {prod.name}
                            </h4>
                            <span className="font-mono text-xs font-bold text-black/80 block mt-0.5">
                              ${prod.price.toFixed(2)}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              if (onAddToCart) {
                                onAddToCart({
                                  id: `${prod.id}-${prod.sizes[0] || 'M'}`,
                                  pieceId: prod.id,
                                  name: prod.name,
                                  price: prod.price,
                                  size: prod.sizes[0] || 'M',
                                  thumbnail: prod.primaryImage,
                                  lookTitle: prod.tag || "Archive Piece",
                                  lookNumber: "ARCHIVE",
                                  brand: prod.brand || BRAND_INFO.name
                                });
                                setIsSearchOpen(false);
                                if (onOpenCart) onOpenCart();
                              } else {
                                navigate('/collection');
                                setIsSearchOpen(false);
                              }
                            }}
                            className="p-2.5 rounded-full bg-black/5 hover:bg-[#1A1A1A] hover:text-white transition-colors cursor-pointer flex-shrink-0"
                            title="Add to Bag"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  /* No Results State */
                  <div className="py-8 text-center space-y-3">
                    <p className="font-serif text-2xl text-[#1A1A1A]">
                      No silhouettes found
                    </p>
                    <p className="text-black/60 text-xs sm:text-sm font-sans max-w-sm mx-auto">
                      No matches found for "{searchQuery}". Try searching for "selvedge", "baggy", "corset", or "tee".
                    </p>
                    <div className="pt-2">
                      <Link
                        to="/collection"
                        onClick={() => setIsSearchOpen(false)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1A1A1A] text-white text-xs font-mono uppercase tracking-wider font-bold hover:bg-black transition-all cursor-pointer"
                      >
                        <span>Browse Entire Collection</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                )}

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Interactive VIP Account & Client Concierge Modal */}
      <AnimatePresence>
        {isAccountOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 select-none">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAccountOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="relative w-full max-w-lg bg-[#FAF6F1] rounded-2xl border border-black/15 shadow-2xl p-6 sm:p-8 flex flex-col gap-6 z-10"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-black/10">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-black/50 block">
                    KevixClothing Client Services
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#1A1A1A]">
                    Account &amp; Concierge
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAccountOpen(false)}
                  className="p-2 rounded-full hover:bg-black/5 text-black/60 hover:text-black cursor-pointer transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Concierge Services & Quick Navigation */}
              <div className="space-y-4">
                
                {/* VIP Personal Styling via WhatsApp */}
                <a
                  href="https://wa.me/94771234567?text=Hello%20KevixClothing%2C%20I%20would%20like%20assistance%20with%20sizing%20and%20orders."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-xl bg-white border border-black/10 hover:border-black/30 transition-all group cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-sm text-[#1A1A1A] group-hover:underline">
                        VIP WhatsApp Styling
                      </h4>
                      <p className="text-black/60 text-xs">
                        Direct 1-on-1 bespoke sizing &amp; fit advice
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-black/40 group-hover:text-black transition-colors" />
                </a>

                {/* Navigation Links for Quick Access */}
                <div className="p-4 rounded-xl bg-white border border-black/10 space-y-2.5">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-black/50 block mb-2">
                    Direct Navigation
                  </span>
                  
                  <Link
                    to="/"
                    onClick={() => setIsAccountOpen(false)}
                    className="flex items-center justify-between text-xs font-mono uppercase tracking-wider py-1.5 text-black/75 hover:text-black font-semibold"
                  >
                    <span>Runway Stage (2.5D Catwalk)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    to="/collection"
                    onClick={() => setIsAccountOpen(false)}
                    className="flex items-center justify-between text-xs font-mono uppercase tracking-wider py-1.5 text-black/75 hover:text-black font-semibold border-t border-black/5"
                  >
                    <span>The Collection (12 Silhouettes)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    to="/campaign"
                    onClick={() => setIsAccountOpen(false)}
                    className="flex items-center justify-between text-xs font-mono uppercase tracking-wider py-1.5 text-black/75 hover:text-black font-semibold border-t border-black/5"
                  >
                    <span>The Campaign Films (4K Studio Reels)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Service Highlights */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="flex items-center gap-2.5 p-3 rounded-lg bg-black/5">
                    <Truck className="w-4 h-4 text-black/70 flex-shrink-0" />
                    <span className="text-[11px] font-mono text-black/70">
                      Complimentary over $200
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5 p-3 rounded-lg bg-black/5">
                    <ShieldCheck className="w-4 h-4 text-black/70 flex-shrink-0" />
                    <span className="text-[11px] font-mono text-black/70">
                      30-Day Exchanges
                    </span>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
