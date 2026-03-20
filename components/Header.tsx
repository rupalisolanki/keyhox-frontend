import React, { useState, useEffect, useRef } from 'react';
import { Search, ShoppingCart, Heart, User, Menu, ChevronDown, HelpCircle, X, Home, Monitor, RefreshCw, Gamepad2, LogOut, UserCheck, Package, Key, Settings, MapPin } from 'lucide-react';
import Logo from './Logo';
import { useCurrency } from '../context/CurrencyContext';

interface HeaderProps {
    onNavigateHome?: () => void;
    onNavigateAuth?: () => void;
    onNavigateContact?: () => void;
    onOpenCart?: () => void;
    onNavigateWishlist?: () => void;
    onNavigateSoftware?: () => void;
    onNavigateSubscription?: () => void;
    onNavigateGames?: () => void;
    onNavigateOrders?: () => void;
    onNavigateLicenses?: () => void;
    onLogout?: () => void;
    cartCount?: number;
    cartTotal?: number;
    wishlistCount?: number;
    user?: { name: string } | null;
}

const Header: React.FC<HeaderProps> = ({ 
  onNavigateHome, 
  onNavigateAuth, 
  onNavigateContact, 
  onOpenCart,
  onNavigateWishlist,
  onNavigateSoftware,
  onNavigateSubscription,
  onNavigateGames,
  onNavigateOrders,
  onNavigateLicenses,
  onLogout,
  cartCount = 0,
  cartTotal = 0,
  wishlistCount = 0,
  user = null
}) => {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Categories');
  const { formatPrice } = useCurrency();
  
  // Use refs for scroll tracking to avoid re-attaching listeners on every render
  const lastScrollY = useRef(0);
  const isNavVisibleRef = useRef(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const threshold = 100; // Threshold to start interaction
      
      // Determine if at top (small buffer)
      setIsAtTop(currentScrollY < 50);

      // Determine direction
      const isScrollingDown = currentScrollY > lastScrollY.current;
      const scrollDelta = Math.abs(currentScrollY - lastScrollY.current);

      // Only act if the scroll difference is significant to avoid jitter
      if (scrollDelta > 8) {
          if (currentScrollY > threshold) {
            if (isScrollingDown) {
              // Scrolling DOWN -> Hide
              if (isNavVisibleRef.current) {
                setIsNavVisible(false);
                isNavVisibleRef.current = false;
              }
            } else {
              // Scrolling UP -> Show
              if (!isNavVisibleRef.current) {
                setIsNavVisible(true);
                isNavVisibleRef.current = true;
              }
            }
          } else {
            // Near Top -> Always Show
            if (!isNavVisibleRef.current) {
              setIsNavVisible(true);
              isNavVisibleRef.current = true;
            }
          }
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  const handleHomeClick = (e: React.MouseEvent) => {
      e.preventDefault();
      if (onNavigateHome) onNavigateHome();
      setIsMobileMenuOpen(false);
  }

  const handleSoftwareClick = (e: React.MouseEvent) => {
      e.preventDefault();
      if (onNavigateSoftware) onNavigateSoftware();
      setIsMobileMenuOpen(false);
  };

  const handleSubscriptionClick = (e: React.MouseEvent) => {
      e.preventDefault();
      if (onNavigateSubscription) onNavigateSubscription();
      setIsMobileMenuOpen(false);
  };

  const handleGamesClick = (e: React.MouseEvent) => {
      e.preventDefault();
      if (onNavigateGames) onNavigateGames();
      setIsMobileMenuOpen(false);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
      e.preventDefault();
      if (onNavigateWishlist) onNavigateWishlist();
      setIsMobileMenuOpen(false);
  };

  const handleContactClick = (e: React.MouseEvent) => {
      e.preventDefault();
      if (onNavigateContact) onNavigateContact();
      setIsMobileMenuOpen(false);
  };

  const handleAuthClick = (e: React.MouseEvent) => {
      e.preventDefault();
      if (onNavigateAuth) onNavigateAuth();
      setIsMobileMenuOpen(false);
  }

  const handleCategorySelect = (category: string) => {
      setSelectedCategory(category);
      setIsSearchDropdownOpen(false);
  };

  return (
    <>
      {/* ================= MOBILE HEADER (Visible < md) ================= */}
      <div className={`md:hidden fixed top-0 left-0 w-full z-[60] bg-white transition-transform duration-300 shadow-md ${isNavVisible ? 'translate-y-0' : '-translate-y-full'}`}>
          
          {/* Row 1: Menu | Logo | User -- COLLAPSIBLE (Hidden when scrolling up from depth) */}
          <div className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${isAtTop ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-white">
                <button 
                    className="p-2 -ml-2 text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
                    onClick={() => setIsMobileMenuOpen(true)}
                >
                    <Menu size={26} />
                </button>
                
                <div className="flex-1 flex justify-center mr-2">
                    <a href="#" onClick={handleHomeClick} className="block transform scale-90">
                        <Logo />
                    </a>
                </div>

                <button onClick={onNavigateAuth} className={`p-2 -mr-2 ${user ? 'text-[#16a34a]' : 'text-gray-700'}`}>
                    {user ? <UserCheck size={26} /> : <User size={26} />}
                </button>
            </div>
          </div>

          {/* Row 2: Search Bar -- ALWAYS VISIBLE when header is shown */}
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
               <div className="relative w-full">
                    <input 
                        type="text" 
                        placeholder="Search for products" 
                        className="w-full h-11 pl-5 pr-12 rounded-full border border-gray-200 bg-white text-sm text-gray-700 outline-none focus:border-[#16a34a] shadow-sm transition-colors"
                    />
                    <button className="absolute right-1 top-1 h-9 w-9 bg-[#16a34a] rounded-full flex items-center justify-center text-white shadow-sm">
                        <Search size={18} />
                    </button>
               </div>
          </div>
      </div>
      
      {/* Spacer for Mobile Fixed Header to prevent content overlap */}
      <div className="md:hidden h-[135px]"></div>

      {/* ================= MOBILE SIDEBAR MENU ================= */}
      {isMobileMenuOpen && (
        <>
            {/* Backdrop */}
            <div 
                className="fixed inset-0 bg-black/50 z-[70] md:hidden animate-in fade-in duration-200 backdrop-blur-sm"
                onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Sidebar Container */}
            <div className="fixed top-0 left-0 h-full w-[85%] max-w-[320px] bg-white z-[80] md:hidden shadow-2xl animate-in slide-in-from-left duration-300 flex flex-col">
                
                {/* Sidebar Header */}
                <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-white">
                    <Logo className="scale-90" />
                    <button 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="p-2 text-gray-500 hover:bg-red-50 hover:text-red-500 rounded-full transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>
                
                {/* Sidebar Links */}
                <div className="flex-1 overflow-y-auto py-6 px-4">
                    <nav className="flex flex-col space-y-2">
                        <a 
                            href="#" 
                            onClick={handleHomeClick} 
                            className="px-4 py-3.5 text-gray-800 font-bold hover:bg-[#16a34a]/10 hover:text-[#16a34a] rounded-xl flex items-center gap-4 transition-all"
                        >
                            <Home size={22} className="text-gray-400" /> Home
                        </a>
                        <a 
                            href="#" 
                            onClick={handleWishlistClick}
                            className="px-4 py-3.5 text-gray-800 font-bold hover:bg-[#16a34a]/10 hover:text-[#16a34a] rounded-xl flex items-center gap-4 transition-all"
                        >
                            <Heart size={22} className="text-gray-400" /> Wishlist <span className="text-xs bg-[#16a34a] text-white px-2 py-0.5 rounded-full ml-auto">{wishlistCount}</span>
                        </a>
                        <a 
                            href="#" 
                            onClick={handleSoftwareClick} 
                            className="px-4 py-3.5 text-gray-800 font-bold hover:bg-[#16a34a]/10 hover:text-[#16a34a] rounded-xl flex items-center gap-4 transition-all"
                        >
                            <Monitor size={22} className="text-gray-400" /> Software
                        </a>
                         <a 
                            href="#" 
                            onClick={handleSubscriptionClick} 
                            className="px-4 py-3.5 text-gray-800 font-bold hover:bg-[#16a34a]/10 hover:text-[#16a34a] rounded-xl flex items-center gap-4 transition-all"
                        >
                            <RefreshCw size={22} className="text-gray-400" /> Subscriptions
                        </a>
                         <a 
                            href="#" 
                            onClick={handleGamesClick} 
                            className="px-4 py-3.5 text-gray-800 font-bold hover:bg-[#16a34a]/10 hover:text-[#16a34a] rounded-xl flex items-center gap-4 transition-all"
                        >
                            <Gamepad2 size={22} className="text-gray-400" /> Games
                        </a>
                        {user && (
                            <>
                                <div className="h-px bg-gray-100 my-2"></div>
                                <a 
                                    href="#" 
                                    onClick={(e) => { e.preventDefault(); if(onNavigateOrders) onNavigateOrders(); setIsMobileMenuOpen(false); }} 
                                    className="px-4 py-3.5 text-gray-800 font-bold hover:bg-[#16a34a]/10 hover:text-[#16a34a] rounded-xl flex items-center gap-4 transition-all"
                                >
                                    <Package size={22} className="text-gray-400" /> My Orders
                                </a>
                                <a 
                                    href="#" 
                                    onClick={(e) => { e.preventDefault(); if(onNavigateLicenses) onNavigateLicenses(); setIsMobileMenuOpen(false); }} 
                                    className="px-4 py-3.5 text-gray-800 font-bold hover:bg-[#16a34a]/10 hover:text-[#16a34a] rounded-xl flex items-center gap-4 transition-all"
                                >
                                    <Key size={22} className="text-gray-400" /> My Licenses
                                </a>
                                <a 
                                    href="#" 
                                    onClick={(e) => { e.preventDefault(); if(onLogout) onLogout(); setIsMobileMenuOpen(false); }} 
                                    className="px-4 py-3.5 text-red-600 font-bold hover:bg-red-50 rounded-xl flex items-center gap-4 transition-all"
                                >
                                    <LogOut size={22} /> Sign Out
                                </a>
                            </>
                        )}
                    </nav>

                    {/* Divider */}
                    <div className="h-px bg-gray-100 my-6"></div>

                    {/* Help Button */}
                    <button 
                        onClick={handleContactClick}
                        className="w-full flex items-center gap-4 px-4 py-4 bg-orange-50 text-orange-600 rounded-xl font-bold hover:bg-orange-100 transition-colors shadow-sm border border-orange-100"
                     >
                        <div className="w-8 h-8 rounded-full bg-orange-200 flex items-center justify-center">
                            <HelpCircle size={18} className="text-orange-700" />
                        </div>
                        Help Center
                     </button>
                </div>

                {/* Sidebar Footer */}
                <div className="p-5 border-t border-gray-100 bg-gray-50">
                     <button 
                        onClick={handleAuthClick}
                        className={`w-full flex items-center justify-center gap-3 py-3.5 rounded-xl font-bold shadow-lg transition-colors ${user ? 'bg-[#16a34a] text-white hover:bg-[#15803d]' : 'bg-[#1e2025] text-white hover:bg-black'}`}
                     >
                        {user ? (
                            <>
                                <UserCheck size={20} />
                                My Profile
                            </>
                        ) : (
                            <>
                                <User size={20} />
                                Login / Register
                            </>
                        )}
                     </button>
                </div>
            </div>
        </>
      )}


      {/* ================= DESKTOP HEADER (Visible >= md) ================= */}
      {/* Top Bar - Main Header - STATIC (Scrolls away with page) */}
      <div className="hidden md:block bg-white shadow-sm z-[60] relative w-full">
        <div className="max-w-[1440px] mx-auto px-4 md:px-10 py-4 grid grid-cols-[auto_1fr_auto] items-center gap-8">
          
          {/* Logo */}
          <div className="flex items-center gap-2 min-w-[150px] justify-self-start">
            <a href="#" onClick={handleHomeClick} className="block group">
              <Logo />
            </a>
          </div>

          {/* Search Bar */}
          <div className="flex w-full items-center relative z-50">
            <div className="flex w-full border-2 border-gray-100 rounded-full hover:border-[#16a34a] transition-colors shadow-sm bg-white">
              <input 
                type="text" 
                placeholder="Search for products" 
                className="flex-1 px-6 py-2.5 outline-none text-gray-700 placeholder-gray-400 font-medium rounded-l-full bg-transparent"
              />
              
              {/* Categories Dropdown */}
              <div className="hidden lg:block relative border-l border-gray-100">
                  <button 
                    className="px-4 py-2.5 bg-gray-50 flex items-center cursor-pointer hover:bg-gray-100 h-full transition-colors outline-none min-w-[140px] justify-between"
                    onClick={() => setIsSearchDropdownOpen(!isSearchDropdownOpen)}
                    onBlur={() => setTimeout(() => setIsSearchDropdownOpen(false), 200)}
                  >
                    <span className="text-xs font-bold text-gray-600 uppercase tracking-wide mr-1 truncate">
                        {selectedCategory}
                    </span>
                    <ChevronDown size={14} className={`text-gray-500 transition-transform duration-200 ${isSearchDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isSearchDropdownOpen && (
                    <div className="absolute top-full right-0 mt-3 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-[60] overflow-hidden animate-in fade-in slide-in-from-top-2">
                      <button 
                        onClick={() => handleCategorySelect('Categories')} 
                        className="w-full text-left flex items-center px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-[#16a34a] hover:text-white transition-colors"
                      >
                        <span className="text-lg mr-2">📂</span> All Categories
                      </button>
                      <button 
                        onClick={() => handleCategorySelect('Software')} 
                        className="w-full text-left flex items-center px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-[#16a34a] hover:text-white transition-colors"
                      >
                        <span className="text-lg mr-2">💻</span> Software
                      </button>
                      <button 
                        onClick={() => handleCategorySelect('Subscriptions')} 
                        className="w-full text-left flex items-center px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-[#16a34a] hover:text-white transition-colors"
                      >
                        <span className="text-lg mr-2">🔄</span> Subscriptions
                      </button>
                      <button 
                        onClick={() => handleCategorySelect('Games')} 
                        className="w-full text-left flex items-center px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-[#16a34a] hover:text-white transition-colors"
                      >
                        <span className="text-lg mr-2">🎮</span> Games
                      </button>
                    </div>
                  )}
              </div>

              <button className="bg-[#16a34a] hover:bg-[#15803d] text-white px-6 py-2 transition-colors flex items-center justify-center rounded-r-full">
                <Search size={20} />
              </button>
            </div>
          </div>

          {/* Login / Register Button with Dropdown */}
          <div className="flex items-center gap-4 justify-self-end">
             
             {/* Help Button */}
             <button 
                onClick={onNavigateContact}
                className="hidden lg:flex items-center gap-2 bg-white text-gray-700 px-5 py-2.5 rounded-full font-bold border border-gray-200 hover:border-[#16a34a] hover:text-[#16a34a] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group"
             >
                <HelpCircle size={18} className="group-hover:rotate-12 transition-transform" />
                Help
             </button>

             {user ? (
                 <div 
                    className="relative z-50"
                    onMouseEnter={() => setIsUserMenuOpen(true)}
                    onMouseLeave={() => setIsUserMenuOpen(false)}
                 >
                     <button 
                        onClick={onNavigateAuth} 
                        className="flex items-center gap-2 px-6 py-2.5 rounded-full font-bold transition-all shadow-md hover:shadow-lg text-sm bg-[#16a34a] text-white hover:bg-[#15803d] relative z-50"
                     >
                        <UserCheck size={18} />
                        Hi, {user.name.split(' ')[0]}
                        <ChevronDown size={14} className={`transition-transform duration-300 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                     </button>

                     {/* Dropdown Menu */}
                     <div 
                        className={`absolute top-full right-0 pt-2 w-56 transition-all duration-200 origin-top-right ${isUserMenuOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}
                     >
                         <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                             <div className="p-4 bg-gray-50 border-b border-gray-100">
                                 <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Account</p>
                                 <p className="font-bold text-gray-900 truncate">{user.name}</p>
                             </div>
                             <div className="py-2">
                                 {/* Admin Link or Regular User Links */}
                                 {(user as any).isAdmin ? (
                                     <button onClick={() => { if(onNavigateAuth) onNavigateAuth(); }} className="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-[#16a34a]/10 hover:text-[#16a34a] flex items-center gap-3 transition-colors">
                                         <Settings size={16} /> Admin Dashboard
                                     </button>
                                 ) : (
                                     <>
                                         <button onClick={onNavigateOrders} className="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-[#16a34a]/10 hover:text-[#16a34a] flex items-center gap-3 transition-colors">
                                             <Package size={16} /> Order History
                                         </button>
                                         <button onClick={onNavigateLicenses} className="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-[#16a34a]/10 hover:text-[#16a34a] flex items-center gap-3 transition-colors">
                                             <Key size={16} /> My Licenses
                                         </button>
                                         <button onClick={onNavigateAuth} className="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-[#16a34a]/10 hover:text-[#16a34a] flex items-center gap-3 transition-colors">
                                             <Settings size={16} /> Account Details
                                         </button>
                                     </>
                                 )}
                             </div>
                             <div className="border-t border-gray-100 py-2 bg-gray-50">
                                 <button onClick={onLogout} className="w-full text-left px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors">
                                     <LogOut size={16} /> Sign Out
                                 </button>
                             </div>
                         </div>
                     </div>
                 </div>
             ) : (
                 <button 
                    onClick={onNavigateAuth} 
                    className="flex items-center gap-2 px-6 py-2.5 rounded-full font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 text-sm bg-[#1e2025] text-white hover:bg-[#16a34a]"
                 >
                    <User size={18} />
                    Login / Register
                 </button>
             )}
          </div>
        </div>
      </div>

      {/* Bottom Bar - Navigation - STICKY with Hide/Show on Scroll */}
      <div className={`hidden md:block bg-[#1e2025] border-t border-white/5 text-white sticky top-0 z-50 transition-transform duration-300 ease-in-out shadow-2xl w-full ${isNavVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="max-w-[1440px] mx-auto px-4 md:px-10">
          <div className="flex items-center justify-between h-[70px]"> {/* Fixed height */}
            <nav className="flex items-center gap-8 h-full">
              
              {/* Home */}
              <a href="#" onClick={handleHomeClick} className="group relative h-full flex items-center gap-2.5 text-[13px] font-bold tracking-widest uppercase text-white hover:text-[#16a34a] transition-colors">
                <Home size={18} className="text-[#16a34a] group-hover:scale-110 transition-transform duration-300" />
                <span>Home</span>
                <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#16a34a] rounded-t-full scale-x-100 transition-transform duration-300"></span>
              </a>
              
              {/* Software */}
              <a href="#" onClick={handleSoftwareClick} className="group relative h-full flex items-center gap-2.5 text-[13px] font-bold tracking-widest uppercase text-gray-400 hover:text-white transition-colors">
                <Monitor size={18} className="group-hover:text-[#16a34a] group-hover:scale-110 transition-transform duration-300" />
                <span>Software</span>
                <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#16a34a] rounded-t-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </a>

              {/* Subscriptions */}
              <a href="#" onClick={handleSubscriptionClick} className="group relative h-full flex items-center gap-2.5 text-[13px] font-bold tracking-widest uppercase text-gray-400 hover:text-white transition-colors">
                <RefreshCw size={18} className="group-hover:text-[#16a34a] group-hover:scale-110 transition-transform duration-300" />
                <span>Subscriptions</span>
                <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#16a34a] rounded-t-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </a>

              {/* Games */}
              <a href="#" onClick={handleGamesClick} className="group relative h-full flex items-center gap-2.5 text-[13px] font-bold tracking-widest uppercase text-gray-400 hover:text-white transition-colors">
                <Gamepad2 size={18} className="group-hover:text-[#16a34a] group-hover:scale-110 transition-transform duration-300" />
                <span>Games</span>
                <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#16a34a] rounded-t-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </a>
            </nav>

            {/* Cart & Wishlist */}
            <div className="flex items-center gap-5">
                <button 
                  onClick={onNavigateWishlist}
                  className="group relative p-2.5 rounded-full text-gray-400 hover:bg-white/10 hover:text-white transition-all duration-300"
                >
                    <Heart size={20} className={wishlistCount > 0 ? "fill-[#16a34a] text-[#16a34a]" : ""} />
                    <span className={`absolute top-1 right-1 bg-[#16a34a] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-[#1e2025] transition-transform ${wishlistCount > 0 ? 'scale-100' : 'scale-0'}`}>
                        {wishlistCount}
                    </span>
                </button>
                
                <div className="h-8 w-px bg-white/10 mx-1"></div>

                <button 
                  onClick={onOpenCart}
                  className="flex items-center gap-3 group pl-2 hover:opacity-80 transition-opacity"
                >
                    <div className="relative">
                        <ShoppingCart size={22} className="text-white group-hover:text-[#16a34a] transition-colors" />
                        <span className={`absolute -top-1.5 -right-1.5 bg-[#16a34a] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-[#1e2025] ${cartCount > 0 ? 'scale-100' : 'scale-0'} transition-transform`}>
                          {cartCount}
                        </span>
                    </div>
                    <div className="flex flex-col items-start leading-none">
                        <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Total</span>
                        <span className="text-sm font-bold text-white group-hover:text-[#16a34a] transition-colors">
                          {formatPrice(cartTotal)}
                        </span>
                    </div>
                </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;