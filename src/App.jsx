import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { RunwayStage } from './components/RunwayStage';
import { ShopPanel } from './components/ShopPanel';
import { MobileRunway } from './components/MobileRunway';
import { CampaignVideos } from './components/CampaignVideos';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { LoadingScreen } from './components/LoadingScreen';
import { Footer } from './components/Footer';
import { LOOKS_DATA } from './data/looksData';

export function App() {
  const [currentLookIndex, setCurrentLookIndex] = useState(1); // Default to Look 02
  const [isInspecting, setIsInspecting] = useState(false);
  const [expandedPieceId, setExpandedPieceId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Cart state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  // Checkout modal
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [lastOrderDetails, setLastOrderDetails] = useState(null);

  const currentLook = LOOKS_DATA[currentLookIndex] || LOOKS_DATA[0];

  const handleSelectLook = (indexOrFn) => {
    if (typeof indexOrFn === 'function') {
      setCurrentLookIndex(indexOrFn);
    } else {
      setCurrentLookIndex(indexOrFn);
    }
    // When changing looks, reset inspecting state unless staying on same look
    setIsInspecting(false);
    setExpandedPieceId(null);
  };

  const handleSelectPiece = (pieceId) => {
    setExpandedPieceId(pieceId);
    setIsInspecting(true);
  };

  const handleToggleExpandPiece = (pieceId) => {
    setExpandedPieceId((prev) => (prev === pieceId ? null : pieceId));
  };

  const handleAddToCart = (newItem) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === newItem.id);
      if (existing) {
        return prevItems.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...newItem, quantity: 1 }];
    });
  };

  const handleAddLookToCart = (newItems) => {
    setCartItems((prevItems) => {
      let updated = [...prevItems];
      newItems.forEach((newItem) => {
        const existingIdx = updated.findIndex((item) => item.id === newItem.id);
        if (existingIdx > -1) {
          updated[existingIdx] = {
            ...updated[existingIdx],
            quantity: updated[existingIdx].quantity + 1
          };
        } else {
          updated.push({ ...newItem, quantity: 1 });
        }
      });
      return updated;
    });
  };

  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCheckout = (orderDetails) => {
    setLastOrderDetails(orderDetails);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#F4EFEA] text-[#1A1A1A] flex flex-col font-sans selection:bg-[#1A1A1A] selection:text-white">
      
      {/* Luxury Loading Screen with Circular KVX/KERB Logo */}
      <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />

      {/* Top Navbar with Circular Logo + KevixClothing Name & Bag */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">

        {/* Cinematic KVX CLOTHING Runway Hero Banner */}
        <HeroSection />
        
        {/* Catwalk Runway Stage Anchor ("Shop with us") */}
        <div id="catwalk-stage" className="w-full">
          {/* Desktop Stage (>= 1024px): Full Viewport Height minus Navbar */}
          <div className="hidden lg:flex w-full h-[calc(100svh-56px)] overflow-hidden bg-[#F4EFEA] relative">
            
            {/* Left Runway Canvas (Full width when browsing, transitions to 62% when inspecting) */}
            <RunwayStage
              looks={LOOKS_DATA}
              currentLookIndex={currentLookIndex}
              onSelectLook={handleSelectLook}
              isInspecting={isInspecting}
              setIsInspecting={setIsInspecting}
              expandedPieceId={expandedPieceId}
              onSelectPiece={handleSelectPiece}
            />

            {/* Right Shop Panel ("In this look") — Pops up only when clicking model */}
            <AnimatePresence>
              {isInspecting && (
                <motion.div 
                  initial={{ x: "100%", opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: "100%", opacity: 0 }}
                  transition={{ type: "spring", damping: 28, stiffness: 260 }}
                  className="w-[38%] border-l border-black/10 bg-[#F4EFEA] h-full flex flex-col justify-between relative overflow-hidden z-20 shadow-[-12px_0_35px_rgba(0,0,0,0.06)]"
                >
                  <ShopPanel
                    look={currentLook}
                    isInspecting={isInspecting}
                    onCloseInspect={() => setIsInspecting(false)}
                    expandedPieceId={expandedPieceId}
                    onToggleExpandPiece={handleToggleExpandPiece}
                    onAddToCart={handleAddToCart}
                    onAddLookToCart={handleAddLookToCart}
                    cartItems={cartItems}
                    isMobile={false}
                  />
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* Mobile Layout (< 1024px) */}
          <MobileRunway
            looks={LOOKS_DATA}
            currentLookIndex={currentLookIndex}
            onSelectLook={handleSelectLook}
            expandedPieceId={expandedPieceId}
            onToggleExpandPiece={handleToggleExpandPiece}
            onAddToCart={handleAddToCart}
            onAddLookToCart={handleAddLookToCart}
            cartItems={cartItems}
          />
        </div>

        {/* Video Campaign Section ("Our Clothes on Models.") */}
        <CampaignVideos
          onSelectLookAndShop={(lookIdx) => {
            setCurrentLookIndex(lookIdx);
            setIsInspecting(true);
            document.getElementById('catwalk-stage')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

      </main>

      {/* International Luxury Footer with Social Media & Archive VIP Access */}
      <Footer />

      {/* Slide-over Cart Preview Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />

      {/* Order Confirmation Modal with Confetti */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        orderDetails={lastOrderDetails}
        onClearCart={handleClearCart}
      />

    </div>
  );
}

export default App;
