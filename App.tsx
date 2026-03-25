import React, { useState } from 'react';
import Header from './components/Header';
import Features from './components/Features';
import ProductGrid from './components/ProductGrid';
import Stats from './components/Stats';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import ProductDetails from './components/ProductDetails';
import MobileBottomNav from './components/MobileBottomNav';
import AboutUs from './components/AboutUs';
import RefundPolicy from './components/RefundPolicy';
import TermsAndConditions from './components/TermsAndConditions';
import PrivacyPolicy from './components/PrivacyPolicy';
import Disclaimer from './components/Disclaimer';
import DmcaPolicy from './components/DmcaPolicy';
import SupportPolicy from './components/SupportPolicy';
import UpdatePolicy from './components/UpdatePolicy';
import ContactUs from './components/ContactUs';
import Blog from './components/Blog';
import BlogPost from './components/BlogPost';
import BecomeSeller from './components/BecomeSeller';
import LicensePolicy from './components/LicensePolicy';
import Auth from './components/Auth';
import CartDrawer from './components/CartDrawer';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Wishlist from './components/Wishlist';
import Profile from './components/Profile';
import AdminLogin from './components/AdminLogin';
import AdminPanel from './components/AdminPanel';
import OrderSuccess from './components/OrderSuccess';
import LocationDetails from './components/LocationDetails';
import { CartItem, WishlistItem, Product } from './types';
import { Gamepad2 } from 'lucide-react';
import { CurrencyProvider } from './context/CurrencyContext';
import { productsDB } from './data/products';

const App: React.FC = () => {
  // Authentication State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);

  // Admin State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [products, setProducts] = useState<Product[]>(Object.values(productsDB));

  // State-based navigation
  const [view, setView] = useState<'home' | 'shop' | 'product' | 'about' | 'refund' | 'terms' | 'privacy' | 'disclaimer' | 'dmca' | 'support' | 'update' | 'contact' | 'blog' | 'blog-post' | 'seller' | 'license' | 'auth' | 'cart' | 'checkout' | 'wishlist' | 'profile' | 'software' | 'subscription' | 'games' | 'admin-login' | 'admin-panel' | 'order-success' | 'location'>('home');
  const [currentSlug, setCurrentSlug] = useState<string>('default');
  const [currentBlogId, setCurrentBlogId] = useState<string>('');
  const [lastOrder, setLastOrder] = useState<any>(null);
  
  // Profile specific tab navigation state
  const [profileTab, setProfileTab] = useState<'dashboard' | 'orders' | 'licenses' | 'address' | 'settings'>('dashboard');

  // Recently Viewed State
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);

  // Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Wishlist State
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

  // Admin Actions
  const handleAdminLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    setUserProfile({ name: 'Administrator', email: 'admin@keyhox.com', isAdmin: true });
    setView('admin-panel');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    setUserProfile(null);
    setView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddProduct = (newProduct: Product) => {
    setProducts(prev => [...prev, newProduct]);
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  // Cart Actions
  const addToCart = (newItem: CartItem) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === newItem.id);
      if (existing) {
        // Increment quantity by the amount specified in newItem
        return prev.map(item => 
          item.id === newItem.id 
            ? { ...item, quantity: item.quantity + newItem.quantity } 
            : item
        );
      }
      // Add new item with its specific quantity
      return [...prev, newItem];
    });
    setIsCartOpen(true); // Open drawer on add
  };

  const updateCartQty = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  // Wishlist Actions
  const addToWishlist = (item: WishlistItem) => {
      setWishlistItems(prev => {
          if (prev.find(i => i.id === item.id)) return prev;
          return [...prev, item];
      });
  }

  const removeFromWishlist = (id: string) => {
      setWishlistItems(prev => prev.filter(item => item.id !== id));
  }

  const moveToCartFromWishlist = (item: WishlistItem) => {
      addToCart({ ...item, quantity: 1 });
      removeFromWishlist(item.id);
  }

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  // Navigation Handlers
  const navigateToHome = () => {
    setView('home');
    setIsCartOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToShop = () => {
      setView('shop');
      setIsCartOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const navigateToSoftware = () => {
      setView('software');
      setIsCartOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const navigateToSubscription = () => {
      setView('subscription');
      setIsCartOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const navigateToGames = () => {
      setView('games');
      setIsCartOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const navigateToCart = () => {
    setView('cart');
    setIsCartOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const navigateToCheckout = () => {
    setView('checkout');
    setIsCartOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const navigateToWishlist = () => {
      setView('wishlist');
      setIsCartOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const navigateToProduct = (slug: string) => {
    setCurrentSlug(slug);
    
    // Update recently viewed (keep last 3 unique items)
    setRecentlyViewed(prev => {
        const filtered = prev.filter(id => id !== slug);
        return [slug, ...filtered].slice(0, 3);
    });

    setView('product');
    setIsCartOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlaceOrder = (details: any) => {
      // Simulate payment processing
      setTimeout(() => {
          setLastOrder(details);
          setCartItems([]);
          setView('order-success');
          window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 1500); // Fake delay for realism
  }

  // Auth Handlers
  const handleLoginSuccess = (user: any) => {
      setIsLoggedIn(true);
      setUserProfile(user);
      setProfileTab('dashboard');
      setView('profile');
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
      setIsLoggedIn(false);
      setUserProfile(null);
      setView('auth');
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToAuth = () => { 
      // If already logged in, go to profile dashboard
      if (isLoggedIn) {
          setProfileTab('dashboard');
          setView('profile');
      } else if (isAdminLoggedIn) {
          setView('admin-panel');
      } else {
          setView('auth'); 
      }
      setIsCartOpen(false); 
      window.scrollTo({ top: 0, behavior: 'smooth' }); 
  };

  const navigateToAdminLogin = () => {
    if (isAdminLoggedIn) {
      setView('admin-panel');
    } else {
      setView('admin-login');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Specific Profile Navigation
  const navigateToOrders = () => {
      if(isLoggedIn) {
          setProfileTab('orders');
          setView('profile');
          window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
          navigateToAuth();
      }
  }

  const navigateToLicenses = () => {
      if(isLoggedIn) {
          setProfileTab('licenses');
          setView('profile');
          window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
          navigateToAuth();
      }
  }

  const navigateToAbout = () => { setView('about'); setIsCartOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const navigateToRefund = () => { setView('refund'); setIsCartOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const navigateToTerms = () => { setView('terms'); setIsCartOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const navigateToPrivacy = () => { setView('privacy'); setIsCartOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const navigateToDisclaimer = () => { setView('disclaimer'); setIsCartOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const navigateToDmca = () => { setView('dmca'); setIsCartOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const navigateToSupport = () => { setView('support'); setIsCartOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const navigateToUpdate = () => { setView('update'); setIsCartOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const navigateToContact = () => { setView('contact'); setIsCartOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const navigateToBlog = () => { setView('blog'); setIsCartOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const navigateToBlogPost = (id: string) => { setCurrentBlogId(id); setView('blog-post'); setIsCartOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const navigateToSeller = () => { setView('seller'); setIsCartOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const navigateToLicense = () => { setView('license'); setIsCartOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const navigateToLocation = () => { setView('location'); setIsCartOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  return (
    <CurrencyProvider>
        <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-white pb-[80px] md:pb-0">
        <Header 
            onNavigateHome={navigateToHome} 
            onNavigateAuth={navigateToAuth} 
            onNavigateContact={navigateToContact}
            onOpenCart={() => setIsCartOpen(true)}
            onNavigateWishlist={navigateToWishlist}
            onNavigateSoftware={navigateToSoftware}
            onNavigateSubscription={navigateToSubscription}
            onNavigateGames={navigateToGames}
            
            // Profile specific nav
            onNavigateOrders={navigateToOrders}
            onNavigateLicenses={navigateToLicenses}
            onLogout={handleLogout}

            cartCount={cartCount}
            cartTotal={cartTotal}
            wishlistCount={wishlistItems.length}
            user={userProfile}
        />
        
        <CartDrawer 
            isOpen={isCartOpen} 
            onClose={() => setIsCartOpen(false)} 
            items={cartItems}
            onUpdateQty={updateCartQty}
            onRemove={removeFromCart}
            onNavigateCart={navigateToCart}
            onNavigateCheckout={navigateToCheckout}
            onProductClick={navigateToProduct}
        />

        <main className="flex-grow">
            {view === 'product' ? (
                <ProductDetails 
                slug={currentSlug} 
                products={products}
                onNavigateHome={navigateToHome} 
                onAddToCart={addToCart}
                onAddToWishlist={addToWishlist}
                onRemoveFromWishlist={removeFromWishlist}
                wishlistItems={wishlistItems}
                recentlyViewed={recentlyViewed}
                onProductClick={navigateToProduct}
                />
            ) : view === 'cart' ? (
                <Cart 
                items={cartItems}
                onUpdateQty={updateCartQty}
                onRemove={removeFromCart}
                onNavigateHome={navigateToHome}
                onProductClick={navigateToProduct}
                onAddToCart={addToCart}
                onNavigateCheckout={navigateToCheckout}
                />
            ) : view === 'checkout' ? (
                <Checkout 
                items={cartItems}
                cartTotal={cartTotal}
                onPlaceOrder={handlePlaceOrder}
                />
            ) : view === 'wishlist' ? (
                <Wishlist 
                    items={wishlistItems}
                    onRemove={removeFromWishlist}
                    onMoveToCart={moveToCartFromWishlist}
                    onNavigateHome={navigateToHome}
                    onProductClick={navigateToProduct}
                />
            ) : view === 'shop' ? (
                <div className="animate-in fade-in duration-500">
                    <div className="bg-gray-50 border-b border-gray-100 py-10 md:py-16">
                        <div className="max-w-[1440px] mx-auto px-6 md:px-20 lg:px-32 text-center">
                            <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">Shop All Products</h1>
                            <p className="text-gray-500 max-w-2xl mx-auto">Browse our complete collection of premium software keys, subscriptions, and digital tools.</p>
                        </div>
                    </div>
                    <ProductGrid 
                    products={products}
                    title="All Products"
                    category="all"
                    onProductClick={navigateToProduct} 
                    onAddToCart={addToCart}
                    />
                </div>
            ) : view === 'software' ? (
                <div className="animate-in fade-in duration-500">
                    <div className="bg-gray-50 border-b border-gray-100 py-10 md:py-16">
                        <div className="max-w-[1440px] mx-auto px-6 md:px-20 lg:px-32 text-center">
                            <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">Software</h1>
                            <p className="text-gray-500 max-w-2xl mx-auto">Premium software keys for Windows, Office, Adobe, and more.</p>
                        </div>
                    </div>
                    <ProductGrid 
                    products={products}
                    title="Software Keys"
                    category="software"
                    onProductClick={navigateToProduct} 
                    onAddToCart={addToCart}
                    />
                </div>
            ) : view === 'subscription' ? (
                <div className="animate-in fade-in duration-500">
                    <div className="bg-gray-50 border-b border-gray-100 py-10 md:py-16">
                        <div className="max-w-[1440px] mx-auto px-6 md:px-20 lg:px-32 text-center">
                            <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">Subscriptions</h1>
                            <p className="text-gray-500 max-w-2xl mx-auto">Access premium accounts and subscription services at unbeatable prices.</p>
                        </div>
                    </div>
                    <ProductGrid 
                    products={products}
                    title="Subscription Services"
                    category="subscription"
                    onProductClick={navigateToProduct} 
                    onAddToCart={addToCart}
                    />
                </div>
            ) : view === 'games' ? (
                <div className="animate-in fade-in duration-500 min-h-[60vh] flex flex-col items-center justify-center text-center p-8 bg-white">
                    <div className="w-24 h-24 bg-[#16a34a]/10 rounded-full flex items-center justify-center text-[#16a34a] mb-6 animate-pulse">
                        <Gamepad2 size={48} />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-4">Coming Soon</h1>
                    <p className="text-gray-500 text-lg md:text-xl max-w-md">
                        We are working hard to bring you the best game keys and deals. Stay tuned!
                    </p>
                    <div className="mt-8 flex gap-3">
                        <button onClick={navigateToHome} className="bg-[#1e2025] hover:bg-black text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg">
                            Back Home
                        </button>
                        <button onClick={navigateToContact} className="bg-white border border-gray-200 text-gray-700 hover:border-[#16a34a] hover:text-[#16a34a] px-8 py-3 rounded-xl font-bold transition-all">
                            Contact Us
                        </button>
                    </div>
                </div>
            ) : view === 'profile' ? (
                <Profile 
                    onLogout={handleLogout} 
                    user={userProfile || { name: 'User', email: '', phone: '', joinDate: '' }} 
                    initialTab={profileTab}
                />
            ) : view === 'about' ? (
                <AboutUs />
            ) : view === 'refund' ? (
                <RefundPolicy />
            ) : view === 'terms' ? (
                <TermsAndConditions />
            ) : view === 'privacy' ? (
                <PrivacyPolicy />
            ) : view === 'disclaimer' ? (
                <Disclaimer />
            ) : view === 'dmca' ? (
                <DmcaPolicy />
            ) : view === 'support' ? (
                <SupportPolicy />
            ) : view === 'update' ? (
                <UpdatePolicy />
            ) : view === 'contact' ? (
                <ContactUs 
                    onNavigateRefund={navigateToRefund}
                    onNavigateTerms={navigateToTerms}
                    onNavigatePrivacy={navigateToPrivacy}
                />
            ) : view === 'blog' ? (
                <Blog onReadMore={navigateToBlogPost} />
            ) : view === 'blog-post' ? (
                <BlogPost blogId={currentBlogId} onBack={navigateToBlog} />
            ) : view === 'seller' ? (
                <BecomeSeller />
            ) : view === 'license' ? (
                <LicensePolicy />
            ) : view === 'auth' ? (
                <Auth onLoginSuccess={handleLoginSuccess} />
            ) : view === 'admin-login' ? (
                <AdminLogin onLoginSuccess={handleAdminLoginSuccess} />
            ) : view === 'admin-panel' ? (
                isAdminLoggedIn ? (
                  <AdminPanel 
                    products={products}
                    onAddProduct={handleAddProduct}
                    onUpdateProduct={handleUpdateProduct}
                    onDeleteProduct={handleDeleteProduct}
                    onLogout={handleAdminLogout}
                  />
                ) : (
                  <AdminLogin onLoginSuccess={handleAdminLoginSuccess} />
                )
            ) : view === 'order-success' ? (
                <OrderSuccess 
                    order={lastOrder}
                    products={products}
                    onNavigateHome={navigateToHome}
                />
            ) : view === 'location' ? (
                <LocationDetails />
            ) : (
                <>
                    <Features />
                    <ProductGrid 
                    products={products}
                    onProductClick={navigateToProduct} 
                    onAddToCart={addToCart}
                    />
                    <Stats />
                    <Testimonials />
                </>
            )}
        </main>
        <Footer 
            onNavigateAbout={navigateToAbout} 
            onNavigateRefund={navigateToRefund} 
            onNavigateTerms={navigateToTerms} 
            onNavigatePrivacy={navigateToPrivacy}
            onNavigateDisclaimer={navigateToDisclaimer}
            onNavigateDmca={navigateToDmca}
            onNavigateSupport={navigateToSupport}
            onNavigateUpdate={navigateToUpdate}
            onNavigateContact={navigateToContact}
            onNavigateBlog={navigateToBlog}
            onNavigateSeller={navigateToSeller}
            onNavigateLicense={navigateToLicense}
            onNavigateProduct={navigateToProduct}
            onAdminLogin={navigateToAdminLogin}
        />
        <MobileBottomNav 
            onNavigateHome={navigateToHome} 
            onNavigateShop={navigateToShop}
            onNavigateAuth={navigateToAuth} 
            onOpenCart={() => setIsCartOpen(true)}
            cartCount={cartCount}
        />
        </div>
    </CurrencyProvider>
  );
};

export default App;