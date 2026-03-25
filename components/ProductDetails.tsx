import React, { useState, useEffect, useRef } from 'react';
import { Star, Check, Minus, Plus, ShoppingCart, Heart, ShieldCheck, Zap, RotateCcw, Share2, Facebook, Search, User, ChevronDown, Monitor, Smartphone, X, Clock, ArrowRight, ChevronLeft, ChevronRight, Tag, Settings, Cpu, HardDrive, Download, Instagram } from 'lucide-react';
import { CartItem, WishlistItem, Product } from '../types';
import { useCurrency } from '../context/CurrencyContext';

interface ProductDetailsProps {
    slug: string;
    products: Product[];
    onNavigateHome?: () => void;
    onAddToCart: (item: CartItem) => void;
    onAddToWishlist: (item: WishlistItem) => void;
    onRemoveFromWishlist: (id: string) => void;
    wishlistItems: WishlistItem[];
    recentlyViewed: string[];
    onProductClick: (slug: string) => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ slug, products, onNavigateHome, onAddToCart, onAddToWishlist, onRemoveFromWishlist, wishlistItems, recentlyViewed, onProductClick }) => {
  const [qty, setQty] = useState(1);
  const [product, setProduct] = useState<any>(null);
  const { formatPrice } = useCurrency();
  
  // Reviews State
  const [reviews, setReviews] = useState([
    {
        id: 1,
        author: "shavi narayan",
        date: "February 3, 2026",
        rating: 5,
        content: "Excellent service! The key arrived instantly and worked without any issues. Highly recommended.",
        verified: true
    },
    {
        id: 2,
        author: "Anil Chahal",
        date: "February 3, 2026",
        rating: 5,
        content: "Very satisfied with the purchase. Good support team helped me with activation.",
        verified: true
    }
  ]);

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewForm, setReviewForm] = useState({
      name: '',
      email: '',
      rating: 5,
      comment: ''
  });

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Find product by ID (slug)
    const foundProduct = products.find(p => p.id === slug);
    
    // If not found by ID, try finding by title (for legacy/demo purposes if needed) or fallback to default if strictly required, 
    // but for now, let's just set what we found.
    // If the slug is 'default', we might want to show the default product template.
    if (foundProduct) {
        setProduct(foundProduct);
    } else if (slug === 'default') {
         const defaultProduct = products.find(p => p.id === 'default');
         setProduct(defaultProduct);
    } else {
        // Product not found
        setProduct(null);
    }
  }, [slug, products]);

  if (!product && slug !== 'default' && products.length > 0) {
      return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
            <p className="text-gray-500 mb-6">The product you are looking for does not exist or has been removed.</p>
            <button onClick={onNavigateHome} className="bg-[#16a34a] text-white px-6 py-2 rounded-full font-bold hover:bg-[#15803d] transition-colors">
                Back to Home
            </button>
        </div>
      );
  }

  if (!product) return <div className="p-10 text-center">Loading...</div>;

  const handleAddToCart = () => {
    if (!product) return;
    onAddToCart({
        id: product.id,
        title: product.title,
        subtitle: product.subtitle,
        price: product.price,
        imageColor: product.imageColor,
        logo: product.logo || product.title,
        quantity: qty,
        coverImage: product.coverImage
    });
  };

  const isInWishlist = product && wishlistItems.some(item => item.id === product.id);

  const handleWishlistToggle = () => {
      if (!product) return;
      
      if (isInWishlist) {
          onRemoveFromWishlist(product.id);
      } else {
          onAddToWishlist({
              id: product.id,
              title: product.title,
              subtitle: product.subtitle,
              price: product.price,
              imageColor: product.imageColor,
              logo: product.logo || product.title,
              coverImage: product.coverImage
          });
          alert("Added to wishlist!");
      }
  }

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = `Check out ${product?.title} on Keyhox!`;

    switch (platform) {
        case 'facebook':
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
            break;
        case 'whatsapp':
            window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
            break;
        case 'instagram':
            navigator.clipboard.writeText(url).then(() => {
                alert('Product link copied to clipboard!');
                window.open('https://www.instagram.com/', '_blank');
            });
            break;
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newReview = {
        id: Date.now(),
        author: reviewForm.name,
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        rating: reviewForm.rating,
        content: reviewForm.comment,
        verified: false 
    };
    setReviews([newReview, ...reviews]);
    setProduct((prev: any) => ({
        ...prev,
        reviews: prev.reviews + 1
    }));
    setIsReviewModalOpen(false);
    setReviewForm({ name: '', email: '', rating: 5, comment: '' });
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  // Filter products for the horizontal scroll section (exclude current)
  const otherProducts = products.filter(p => p.id !== product.id);

  return (
     <div className="max-w-[1440px] mx-auto px-4 md:px-10 py-6 md:py-10 animate-in fade-in duration-500 relative">
        {/* Breadcrumbs */}
        <nav className="text-xs md:text-sm text-gray-500 mb-6 md:mb-10 flex flex-wrap items-center gap-2">
            <button onClick={onNavigateHome} className="hover:text-[#16a34a] transition-colors">Home</button>
            <span className="text-gray-300">/</span>
            <span className="hover:text-[#16a34a] transition-colors cursor-pointer">{product.category}</span>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-semibold truncate max-w-[200px] md:max-w-none">{product.title}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
            {/* Left Column - Product Image */}
            <div className="w-full lg:w-[480px] xl:w-[550px] flex-shrink-0">
                <div className={`aspect-[4/4] rounded-3xl ${product.imageColor} relative p-8 md:p-12 flex flex-col justify-between shadow-2xl shadow-blue-900/10 overflow-hidden group`}>
                    
                    {/* Custom Cover Image Support */}
                    {product.coverImage ? (
                        <>
                            <img 
                                src={product.coverImage} 
                                alt={product.title} 
                                className="absolute inset-0 w-full h-full object-cover z-20 group-hover:scale-105 transition-transform duration-700" 
                            />
                            {/* Optional Dark Overlay for text legibility if needed, or keeping it clean */}
                            <div className="absolute inset-0 bg-black/10 z-20 pointer-events-none"></div>
                        </>
                    ) : (
                        <>
                            {/* Background Pattern */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl -ml-16 -mb-16 pointer-events-none"></div>

                            {/* Logo Area */}
                            <div className="w-16 h-16 md:w-20 md:h-20 z-10">
                                {product.logoType === 'image' ? (
                                    <img src={product.logo || product.title} alt="Logo" className="w-full h-full object-contain drop-shadow-lg" />
                                ) : (
                                    <div className="font-black text-white/90 text-xl tracking-tighter">
                                        {product.logoType === 'svg' ? (
                                            <svg viewBox="0 0 88 88" fill="white" className="w-full h-full drop-shadow-md opacity-90">
                                                <path d="M0 12.402l35.687-4.86.016 34.423-35.67.203L0 12.402zm35.67 33.529l.028 34.253L.048 75.248l-.013-29.066 35.635-.25zM39.58 6.541L87.952 0v41.559l-48.372.266V6.541zm48.372 38.64V88L39.58 81.346V45.49l48.372-.312z"/>
                                            </svg>
                                        ) : (
                                            <span>{product.imageText?.main?.charAt(0) || product.title.charAt(0)}</span>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Main Text */}
                            <div className="mt-4 z-10 transform transition-transform duration-500 group-hover:scale-105 origin-left">
                                <h1 className="text-white text-5xl md:text-7xl font-light tracking-tight leading-[0.9]">
                                    {product.imageText?.main || product.title}
                                    <br />
                                    <span className="font-bold">{product.imageText?.sub || product.subtitle}</span>
                                </h1>
                                
                                <div className="mt-6 md:mt-8 text-white/90 font-medium text-lg md:text-xl space-y-1">
                                    <p className="flex items-center gap-2">
                                        <ShieldCheck size={20} /> 
                                        {product.title.toLowerCase().includes('account') ? 'Private Account' : 'Retail License'}
                                    </p>
                                    <p className="flex items-center gap-2"><RotateCcw size={20} /> Lifetime Validity</p>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Instant Delivery Banner */}
                    <div className="absolute bottom-0 left-0 w-full bg-[#1e2025]/90 backdrop-blur-md py-4 text-center z-30">
                        <span className="text-white font-bold tracking-[0.25em] uppercase text-xs md:text-sm flex items-center justify-center gap-2">
                             <Zap size={16} className="fill-white" /> Instant Delivery
                        </span>
                    </div>
                </div>

                {/* Watching Notification */}
                <div className="mt-5 bg-[#fff7ed] border border-[#ffedd5] rounded-xl p-4 flex items-center justify-center gap-3 text-sm text-[#c2410c] shadow-sm">
                    <div className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
                    </div>
                    <span className="font-bold">{product.viewingCount || 12} People watching this product now!</span>
                </div>
            </div>

            {/* Right Column - Product Details */}
            <div className="flex-1 py-2">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">{product.title}</h1>
                
                {/* Platform Badge */}
                {product.platform && (
                    <div className="flex items-center gap-2 mb-6">
                        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 uppercase tracking-wide">
                           {product.platform.includes("Mobile") ? <Smartphone size={14} /> : <Monitor size={14} />}
                           Platform: {product.platform}
                        </span>
                    </div>
                )}

                {/* Ratings */}
                <div className="flex flex-wrap items-center gap-3 mb-8">
                    <div className="flex text-[#16a34a]">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} size={20} fill="currentColor" strokeWidth={0} />
                        ))}
                    </div>
                    <span className="text-gray-500 text-sm font-medium">({product.reviews || 0} customer reviews)</span>
                </div>

                {/* Features List */}
                <div className="mb-8">
                    <ul className="space-y-4 text-gray-600 leading-relaxed">
                        {product.features?.map((feature: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-3.5 group">
                                <div className="mt-2 w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-[#16a34a] transition-colors flex-shrink-0" />
                                <span className="text-[15px]">{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Price Section */}
                <div className="flex items-end gap-4 mb-8 border-t border-gray-100 pt-8">
                    <div className="flex flex-col">
                        <span className="text-gray-400 line-through text-2xl font-semibold decoration-gray-300 decoration-2">{formatPrice(product.oldPrice)}</span>
                    </div>
                    <span className="text-[#16a34a] text-5xl font-bold tracking-tight">{formatPrice(product.price)}</span>
                </div>

                {/* Offer Section */}
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-8 flex items-start gap-3 relative overflow-hidden group">
                    <div className="absolute right-0 top-0 p-4 opacity-5 pointer-events-none">
                        <Tag size={100} className="text-[#16a34a]" />
                    </div>
                    <div className="bg-white p-2 rounded-lg shadow-sm text-[#16a34a] shrink-0 mt-0.5 z-10">
                        <Tag size={20} />
                    </div>
                    <div className="z-10">
                        <h4 className="font-bold text-gray-900 text-sm">Special Offer Available</h4>
                        <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                            Get an extra <span className="font-bold text-[#16a34a]">2.5% Discount</span> by using coupon code: 
                            <span 
                                className="font-mono font-bold bg-white border border-gray-200 px-2 py-0.5 rounded ml-2 text-gray-800 select-all cursor-pointer hover:bg-gray-50 transition-colors shadow-sm" 
                                title="Click to copy" 
                                onClick={() => { navigator.clipboard.writeText('Keyhox'); alert('Code copied: Keyhox'); }}
                            >
                                Keyhox
                            </span>
                        </p>
                    </div>
                </div>

                {/* Stock Status */}
                <div className="flex items-center gap-2 mb-8">
                     <span className="text-[#16a34a] font-bold text-sm bg-[#16a34a]/10 px-3 py-1.5 rounded-md flex items-center gap-2">
                        <Check size={14} strokeWidth={3} /> In stock
                     </span>
                </div>

                {/* Add to Cart Actions */}
                <div className="flex flex-col sm:flex-row gap-4 max-w-xl pb-8 border-b border-gray-100">
                    <div className="flex items-center border-2 border-gray-200 rounded-xl bg-white h-14 hover:border-gray-300 transition-colors w-full sm:w-auto">
                        <button 
                            onClick={() => setQty(Math.max(1, qty - 1))}
                            className="w-14 h-full flex items-center justify-center text-gray-400 hover:text-[#16a34a] hover:bg-gray-50 rounded-l-xl transition-colors"
                        >
                            <Minus size={20} />
                        </button>
                        <span className="text-xl font-bold w-12 text-center text-gray-900 select-none">{qty}</span>
                        <button 
                            onClick={() => setQty(qty + 1)}
                            className="w-14 h-full flex items-center justify-center text-gray-400 hover:text-[#16a34a] hover:bg-gray-50 rounded-r-xl transition-colors"
                        >
                            <Plus size={20} />
                        </button>
                    </div>

                    <button 
                        onClick={handleAddToCart}
                        className="flex-1 bg-[#16a34a] hover:bg-[#15803d] text-white h-14 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl flex items-center justify-center gap-2.5 transition-all duration-300 transform hover:-translate-y-1"
                    >
                        Add to cart
                    </button>
                    
                    <button 
                        onClick={handleAddToCart}
                        className="flex-1 bg-[#1e2025] hover:bg-black text-white h-14 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl flex items-center justify-center gap-2.5 transition-all duration-300 transform hover:-translate-y-1"
                    >
                        Buy now
                    </button>
                </div>
                
                {/* Wishlist & Share */}
                <div className="mt-8 flex flex-col md:flex-row items-start md:items-center gap-6 text-sm text-gray-500 font-medium">
                    <button 
                        onClick={handleWishlistToggle}
                        className={`flex items-center gap-2 transition-colors group ${isInWishlist ? 'text-[#16a34a]' : 'hover:text-[#16a34a]'}`}
                    >
                        <Heart size={18} className={`transition-colors ${isInWishlist ? 'fill-[#16a34a]' : 'group-hover:fill-[#16a34a]'}`} /> 
                        {isInWishlist ? 'Added to wishlist' : 'Add to wishlist'}
                    </button>
                    
                    <div className="flex items-center gap-3">
                        <span>Share:</span>
                        <button onClick={() => handleShare('facebook')} className="hover:text-blue-600 transition-colors"><Facebook size={18} /></button>
                        <button onClick={() => handleShare('whatsapp')} className="hover:text-green-500 transition-colors">
                            {/* WhatsApp SVG */}
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" className="transform scale-110">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                            </svg>
                        </button>
                        <button onClick={() => handleShare('instagram')} className="hover:text-pink-600 transition-colors"><Instagram size={18} /></button>
                    </div>
                </div>
            </div>
        </div>

        {/* Description Section */}
        {product.description && (
            <div className="mt-16 md:mt-24 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                <div className="flex items-center gap-4 mb-8">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900">Product Description</h2>
                    <div className="h-px bg-gray-200 flex-grow"></div>
                </div>

                <div className="text-gray-600 leading-7 text-[15px]">
                    {product.description.bullets && (
                        <ul className="space-y-4 mb-10">
                            {product.description.bullets.map((bullet: string, i: number) => (
                                <li key={i} className="flex items-start gap-3">
                                    <div className="mt-2 w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0"></div>
                                    <span>
                                        {bullet.includes('**') ? (
                                            <>
                                                <strong className="text-gray-800">{bullet.split('**')[1]}</strong>
                                                {bullet.split('**')[2]}
                                            </>
                                        ) : (
                                            bullet
                                        )}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}

                    <div className="space-y-8">
                        {product.description.sections?.map((section: any, i: number) => (
                            <div key={i}>
                                <h3 className="text-gray-900 font-bold text-base mb-3">{section.title}</h3>
                                <p className="text-gray-500">{section.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )}

        {/* How to Activate & System Requirements Grid */}
        <div className="mt-16 grid lg:grid-cols-2 gap-10">
            
            {/* How to Activate Section */}
            {product.activationGuide && (
                <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm h-full">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-[#16a34a]/10 rounded-full flex items-center justify-center text-[#16a34a]">
                            <Download size={20} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">How to Activate</h3>
                    </div>
                    
                    {product.activationGuide.steps && (
                        <div className="space-y-4">
                            {product.activationGuide.steps.map((step: string, idx: number) => (
                                <div key={idx} className="flex gap-4">
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 text-gray-600 font-bold text-xs flex items-center justify-center mt-0.5">
                                        {idx + 1}
                                    </div>
                                    <p className="text-sm text-gray-600 leading-relaxed">{step}</p>
                                </div>
                            ))}
                        </div>
                    )}
                    
                    {product.activationGuide.note && (
                        <div className="mt-6 pt-4 border-t border-gray-100">
                             <p className="text-xs text-orange-500 font-medium flex gap-2">
                                <span className="font-bold">Note:</span> {product.activationGuide.note}
                             </p>
                        </div>
                    )}
                </div>
            )}

            {/* System Requirements Section */}
            {product.systemRequirements && (
                <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm h-full">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                            <Settings size={20} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">System Requirements</h3>
                    </div>

                    <div className="space-y-4">
                        {product.systemRequirements.os && (
                            <div className="flex items-start gap-4 p-3 bg-gray-50 rounded-xl">
                                <Monitor size={18} className="text-gray-400 mt-0.5 shrink-0" />
                                <div>
                                    <span className="block text-xs font-bold text-gray-500 uppercase tracking-wide">Operating System</span>
                                    <span className="text-sm font-medium text-gray-900">{product.systemRequirements.os}</span>
                                </div>
                            </div>
                        )}
                        {product.systemRequirements.processor && (
                            <div className="flex items-start gap-4 p-3 bg-gray-50 rounded-xl">
                                <Cpu size={18} className="text-gray-400 mt-0.5 shrink-0" />
                                <div>
                                    <span className="block text-xs font-bold text-gray-500 uppercase tracking-wide">Processor</span>
                                    <span className="text-sm font-medium text-gray-900">{product.systemRequirements.processor}</span>
                                </div>
                            </div>
                        )}
                        {product.systemRequirements.memory && (
                            <div className="flex items-start gap-4 p-3 bg-gray-50 rounded-xl">
                                <Settings size={18} className="text-gray-400 mt-0.5 shrink-0" />
                                <div>
                                    <span className="block text-xs font-bold text-gray-500 uppercase tracking-wide">Memory (RAM)</span>
                                    <span className="text-sm font-medium text-gray-900">{product.systemRequirements.memory}</span>
                                </div>
                            </div>
                        )}
                        {product.systemRequirements.storage && (
                            <div className="flex items-start gap-4 p-3 bg-gray-50 rounded-xl">
                                <HardDrive size={18} className="text-gray-400 mt-0.5 shrink-0" />
                                <div>
                                    <span className="block text-xs font-bold text-gray-500 uppercase tracking-wide">Storage</span>
                                    <span className="text-sm font-medium text-gray-900">{product.systemRequirements.storage}</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

        </div>

        {/* Reviews Section */}
        <div className="mt-16 md:mt-24 border-t border-gray-100 pt-16">
            <h3 className="text-center text-xl font-bold text-gray-900 mb-10 flex items-center justify-center gap-4">
                <span className="h-px w-12 bg-gray-200"></span>
                Customer Reviews
                <span className="h-px w-12 bg-gray-200"></span>
            </h3>

            {/* Summary Box */}
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 md:p-10 mb-10">
                <h4 className="font-bold text-gray-900 text-lg mb-8">
                    {product.reviews || 0} reviews for {product.title}
                </h4>

                <div className="flex flex-col md:flex-row gap-10 md:gap-20">
                    {/* Left: Score & Button */}
                    <div className="flex flex-col items-start gap-4 min-w-[200px]">
                        <div className="flex items-end gap-3">
                            <span className="text-6xl font-medium text-gray-900 leading-none">{product.rating || 5}</span>
                            <div className="flex flex-col mb-1">
                                <div className="flex text-[#16a34a] gap-0.5">
                                    {[1,2,3,4,5].map(s => <Star key={s} size={18} fill="currentColor" strokeWidth={0} />)}
                                </div>
                                <span className="text-xs text-gray-500 mt-1">Based on {product.reviews || 0} reviews</span>
                            </div>
                        </div>
                        
                        <button 
                            onClick={() => setIsReviewModalOpen(true)}
                            className="mt-2 px-6 py-2.5 border border-gray-300 bg-white hover:bg-gray-50 hover:border-[#16a34a] hover:text-[#16a34a] text-gray-900 font-bold text-sm rounded-lg transition-colors shadow-sm w-full md:w-auto"
                        >
                            Add a review
                        </button>
                    </div>

                    {/* Right: Progress Bars */}
                    <div className="flex-1 w-full space-y-3">
                        {[
                            { stars: 5, percentage: 89 },
                            { stars: 4, percentage: 6 },
                            { stars: 3, percentage: 1 },
                            { stars: 2, percentage: 0 },
                            { stars: 1, percentage: 2 },
                        ].map((item) => (
                            <div key={item.stars} className="flex items-center gap-4 text-sm">
                                <span className="w-12 text-gray-600 font-medium">{item.stars} star</span>
                                <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                                    <div 
                                        className="h-full bg-[#16a34a] rounded-full" 
                                        style={{ width: `${item.percentage}%` }}
                                    ></div>
                                </div>
                                <span className="w-10 text-right text-gray-500">{item.percentage}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Search & Filter Bar */}
            <div className="border border-gray-200 rounded-lg p-2 mb-8 flex items-center gap-2 shadow-sm bg-white">
                <Search className="text-gray-400 ml-2" size={20} />
                <input 
                    type="text" 
                    placeholder="Search customer reviews" 
                    className="bg-white text-gray-900 flex-1 outline-none text-sm h-10 bg-transparent"
                />
            </div>

            {/* Controls */}
            <div className="flex justify-between items-center mb-8 text-sm text-gray-500 border-b border-gray-100 pb-4">
                <span>1-{reviews.length} of {product.reviews || 0} reviews</span>
                <button className="flex items-center gap-1 hover:text-gray-900 font-medium">
                    Most Recent <ChevronDown size={16} />
                </button>
            </div>

            {/* Reviews List */}
            <div className="space-y-8">
                 {reviews.map((review) => (
                     <div key={review.id} className="flex gap-4 border-b border-gray-100 pb-8 last:border-0 animate-in fade-in duration-300">
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-400 shrink-0">
                            <User size={24} className="fill-white text-white" />
                        </div>
                        <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                                <span className="font-bold text-gray-700 flex items-center gap-2 text-sm">
                                    {review.verified ? <ShoppingCart size={14} className="text-[#16a34a]" /> : null} 
                                    {review.author}
                                </span>
                                <span className="text-gray-400 text-xs">{review.date}</span>
                            </div>
                            {review.verified && <p className="text-xs text-gray-500 mb-2">Verified owner</p>}
                            <div className="flex text-[#16a34a] gap-0.5 mb-2">
                                 {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} strokeWidth={i < review.rating ? 0 : 2} className={i < review.rating ? "" : "text-gray-300"} />
                                 ))}
                            </div>
                            <p className="text-sm text-gray-600 leading-relaxed">{review.content}</p>
                        </div>
                     </div>
                 ))}
            </div>
        </div>

        {/* Recently Viewed Section */}
        {recentlyViewed.length > 0 && (
            <div className="mt-16 md:mt-24 pt-12 border-t border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-2">
                    <Clock size={24} className="text-[#16a34a]" /> Recently Viewed
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {recentlyViewed.map(slug => {
                        const p = products.find(prod => prod.id === slug);
                        if (!p) return null;
                        return (
                            <div key={p.id} onClick={() => onProductClick(p.id)} className="cursor-pointer group">
                                <div className={`aspect-square rounded-xl ${p.imageColor} p-4 flex items-center justify-center mb-3 group-hover:opacity-90 transition-opacity`}>
                                    {p.logoType === 'image' ? (
                                        <img src={p.logo || p.title} alt={p.title} className="w-12 h-12 object-contain" />
                                    ) : (
                                        <span className="text-white font-bold text-xl">{p.logoType === 'svg' ? 'W' : p.logo}</span>
                                    )}
                                </div>
                                <h4 className="font-bold text-sm text-gray-900 line-clamp-1 group-hover:text-[#16a34a]">{p.title}</h4>
                                <p className="text-xs text-gray-500 font-bold">{formatPrice(p.price)}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        )}

        {/* Divider */}
        <div className="my-16 h-px bg-gray-200"></div>

        {/* Horizontal Scrollable Software Section */}
        <div className="mb-16 relative">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900">Explore More Software</h3>
                <span className="text-sm text-gray-500 flex items-center gap-1">Scroll <ArrowRight size={14} /></span>
            </div>
            
            <div className="relative group">
                <button 
                    onClick={scrollLeft}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white shadow-xl rounded-full p-3 text-gray-800 -ml-2 md:-ml-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-gray-100 hidden md:flex items-center justify-center hover:scale-110 hover:text-[#16a34a]"
                    aria-label="Scroll left"
                >
                    <ChevronLeft size={24} />
                </button>

                <div 
                    className="flex overflow-x-auto gap-4 md:gap-6 pb-6 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide snap-x scroll-smooth"
                    ref={scrollContainerRef}
                >
                    {otherProducts.map((p) => (
                        <div 
                            key={p.id} 
                            onClick={() => onProductClick(p.id)}
                            className="min-w-[200px] md:min-w-[240px] bg-white border border-gray-100 rounded-2xl p-4 cursor-pointer hover:shadow-lg transition-shadow snap-start flex flex-col"
                        >
                            <div className={`h-32 rounded-xl ${p.imageColor} flex items-center justify-center mb-4 relative overflow-hidden`}>
                                <div className="absolute inset-0 bg-black/10"></div>
                                {p.logoType === 'image' ? (
                                    <img src={p.logoUrl} alt={p.title} className="w-12 h-12 object-contain relative z-10" />
                                ) : (
                                    <span className="text-white font-bold text-xl relative z-10">{p.logoType === 'svg' ? 'W' : p.logo}</span>
                                )}
                            </div>
                            <h4 className="font-bold text-gray-900 text-sm line-clamp-2 mb-1 flex-grow">{p.title}</h4>
                            <div className="flex items-center justify-between mt-2">
                                <span className="text-[#16a34a] font-black">{formatPrice(p.price)}</span>
                                <span className="text-xs text-gray-400 line-through">{formatPrice(p.oldPrice)}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <button 
                    onClick={scrollRight}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white shadow-xl rounded-full p-3 text-gray-800 -mr-2 md:-mr-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-gray-100 hidden md:flex items-center justify-center hover:scale-110 hover:text-[#16a34a]"
                    aria-label="Scroll right"
                >
                    <ChevronRight size={24} />
                </button>
            </div>
        </div>

        {/* Review Modal */}
        {isReviewModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl animate-in zoom-in-95 duration-200 relative overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50">
                        <h3 className="font-bold text-lg text-gray-900">Write a Review</h3>
                        <button onClick={() => setIsReviewModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                            <X size={24} />
                        </button>
                    </div>
                    
                    <form onSubmit={handleReviewSubmit} className="p-6 space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Rating</label>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setReviewForm({...reviewForm, rating: star})}
                                        className="focus:outline-none transition-transform hover:scale-110"
                                    >
                                        <Star 
                                            size={32} 
                                            fill={star <= reviewForm.rating ? "#facc15" : "none"}
                                            className={star <= reviewForm.rating ? "text-yellow-400" : "text-gray-300"} 
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1.5">Name <span className="text-red-500">*</span></label>
                                <input 
                                    type="text" 
                                    required
                                    value={reviewForm.name}
                                    onChange={(e) => setReviewForm({...reviewForm, name: e.target.value})}
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 focus:border-[#16a34a] outline-none"
                                    placeholder="Your Name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1.5">Email <span className="text-red-500">*</span></label>
                                <input 
                                    type="email" 
                                    required
                                    value={reviewForm.email}
                                    onChange={(e) => setReviewForm({...reviewForm, email: e.target.value})}
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 focus:border-[#16a34a] outline-none"
                                    placeholder="your@email.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1.5">Review <span className="text-red-500">*</span></label>
                            <textarea 
                                required
                                rows={4}
                                value={reviewForm.comment}
                                onChange={(e) => setReviewForm({...reviewForm, comment: e.target.value})}
                                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 focus:border-[#16a34a] outline-none resize-none"
                                placeholder="Tell us about your experience..."
                            ></textarea>
                        </div>

                        <button 
                            type="submit" 
                            className="w-full bg-[#1e2025] hover:bg-[#16a34a] text-white font-bold py-3.5 rounded-xl transition-all shadow-lg mt-2 flex items-center justify-center gap-2"
                        >
                            Submit Review
                        </button>
                    </form>
                </div>
            </div>
        )}

     </div>
  );
};

export default ProductDetails;
