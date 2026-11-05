import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { CollectionPage } from './pages/CollectionPage';
import { CampaignPage } from './pages/CampaignPage';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { LoadingScreen } from './components/LoadingScreen';
import { Footer } from './components/Footer';
import { LOOKS_DATA } from './data/looksData';

// Scroll to top helper on page route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export function App() {
  const [currentLookIndex, setCurrentLookIndex] = useState(1); // Default to Look 02
  const [isInspecting, setIsInspecting] = useState(false);
  const [expandedPieceId, setExpandedPieceId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Global cart state
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
    // Immediately open slide-over drawer
    setIsCartOpen(true);
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
    setIsCartOpen(true);
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
    <div className="min-h-screen bg-[#F4EFEA] text-[#1A1A1A] flex flex-col font-sans selection:bg-[#1A1A1A] selection:text-white w-full max-w-full overflow-x-hidden">
      
      {/* Scroll restoration helper */}
      <ScrollToTop />

      {/* Luxury Loading Screen with Circular KVX/KERB Logo */}
      <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />

      {/* Sticky/Fixed Navbar with Dynamic Scroll & Multi-Page Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onAddToCart={handleAddToCart}
      />

      {/* Dynamic Multi-Page Router */}
      <main className="flex-1 w-full max-w-full overflow-x-hidden">
        <Routes>
          {/* Home / Runway Page */}
          <Route 
            path="/" 
            element={
              <HomePage
                currentLookIndex={currentLookIndex}
                handleSelectLook={handleSelectLook}
                isInspecting={isInspecting}
                setIsInspecting={setIsInspecting}
                expandedPieceId={expandedPieceId}
                handleSelectPiece={handleSelectPiece}
                handleToggleExpandPiece={handleToggleExpandPiece}
                handleAddToCart={handleAddToCart}
                handleAddLookToCart={handleAddLookToCart}
                cartItems={cartItems}
                currentLook={currentLook}
              />
            } 
          />

          {/* Dedicated Collection Page */}
          <Route 
            path="/collection" 
            element={<CollectionPage onAddToCart={handleAddToCart} />} 
          />

          {/* Plural alias /collections */}
          <Route 
            path="/collections" 
            element={<CollectionPage onAddToCart={handleAddToCart} />} 
          />

          {/* Dedicated Campaign Page */}
          <Route 
            path="/campaign" 
            element={<CampaignPage onAddToCart={handleAddToCart} />} 
          />

          {/* Plural alias /campaigns */}
          <Route 
            path="/campaigns" 
            element={<CampaignPage onAddToCart={handleAddToCart} />} 
          />

          {/* Fallback to Home */}
          <Route 
            path="*" 
            element={
              <HomePage
                currentLookIndex={currentLookIndex}
                handleSelectLook={handleSelectLook}
                isInspecting={isInspecting}
                setIsInspecting={setIsInspecting}
                expandedPieceId={expandedPieceId}
                handleSelectPiece={handleSelectPiece}
                handleToggleExpandPiece={handleToggleExpandPiece}
                handleAddToCart={handleAddToCart}
                handleAddLookToCart={handleAddLookToCart}
                cartItems={cartItems}
                currentLook={currentLook}
              />
            } 
          />
        </Routes>
      </main>

      {/* International Luxury Footer */}
      <Footer />

      {/* Shared Slide-over Cart Preview Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />

      {/* Shared Order Confirmation Modal with Confetti */}
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
