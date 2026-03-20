import React, { useState } from 'react';
import { Star, Minus, Plus } from 'lucide-react';
import { CartItem, Product } from '../types';
import { useCurrency } from '../context/CurrencyContext';

interface ProductCardProps {
  product: Product;
  onClick: (slug: string) => void;
  onAddToCart: (item: CartItem) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, onClick, onAddToCart 
}) => {
  const [qty, setQty] = useState(1);
  const { formatPrice } = useCurrency();

  const { id, title, subtitle, category, rating, reviews, oldPrice, price, imageColor, logo, coverImage } = product;

  const handleActionClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart({
      id: id,
      title: title,
      subtitle: subtitle,
      price: price,
      imageColor: imageColor || 'bg-gray-800',
      logo: logo || title,
      quantity: qty,
      coverImage: coverImage
    });
  };

  const isPrivateAccount = subtitle?.toLowerCase().includes('private') || title?.toLowerCase().includes('account');
  const isLifetime = subtitle?.toLowerCase().includes('lifetime');

  return (
    <div 
      onClick={() => onClick(id)}
      className="block bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-[#16a34a]/10 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group cursor-pointer"
    >
      {/* Image Area */}
      <div className={`h-40 md:h-64 ${imageColor || 'bg-gray-800'} p-4 md:p-6 relative flex flex-col items-center md:items-start justify-between group-hover:brightness-105 transition-all text-center md:text-left`}>
        
        {coverImage ? (
            <>
                <img 
                    src={coverImage} 
                    alt={title} 
                    className="absolute inset-0 w-full h-full object-cover z-20 group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-20 pointer-events-none"></div>
            </>
        ) : (
            <>
                {/* Brand Logo / Text */}
                {logo && logo.includes('http') ? (
                    <img src={logo} alt="brand" className="h-6 md:h-8 object-contain mb-1 md:mb-2" />
                ) : (
                    <span className="text-white text-2xl md:text-3xl font-light mb-1 md:mb-2 block opacity-90">{logo}</span>
                )}
                
                {/* Main Product Title on Image */}
                <h3 className="text-white text-xl md:text-3xl font-semibold leading-tight drop-shadow-md w-full">
                    {title.replace(' Professional', '').replace(' Pro', '')}
                    <span className="block font-light">{title.includes('Pro') ? 'Pro' : ''}</span>
                    <span className="block font-light">{title.includes('Professional') ? 'Professional' : ''}</span>
                </h3>
            </>
        )}

        {/* Floating details on image bottom */}
        <div className="mt-auto w-full hidden md:block z-30 relative">
            {!coverImage && <p className="text-white/90 text-sm font-medium">{subtitle}</p>}
            <p className="text-white/70 text-xs mt-1">
                {isPrivateAccount ? "Private Account • Instant Delivery" : "License Key • Instant Delivery"}
            </p>
        </div>
        
        {/* Mobile only subtitle overlay */}
        <div className="md:hidden mt-auto text-white/80 text-[10px] font-medium leading-tight z-30 relative">
            {isPrivateAccount ? "Private Account" : (isLifetime ? "Lifetime Validity" : "Instant Delivery")}
        </div>

        {/* Delivery Tag */}
        <div className="absolute bottom-0 left-0 w-full bg-[#1e2025]/90 backdrop-blur-sm py-1.5 md:py-2 text-center text-white text-[9px] md:text-[10px] font-bold uppercase tracking-widest z-30">
            {isPrivateAccount ? "PERSONAL ACCOUNT" : "INSTANT DELIVERY"}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-3 md:p-5 flex flex-col flex-grow text-center">
        <h4 className="font-bold text-gray-800 text-xs md:text-sm mb-1 leading-snug min-h-[32px] md:min-h-[40px] group-hover:text-[#16a34a] transition-colors line-clamp-2">
          {title} {subtitle}
        </h4>
        <span className="text-gray-400 text-[10px] md:text-xs uppercase mb-2 md:mb-3 font-medium tracking-wide">{category}</span>

        {/* Ratings */}
        <div className="flex items-center justify-center gap-1 mb-2 md:mb-4">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={12} className="fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <span className="text-gray-400 text-[10px] md:text-xs ml-1 font-medium">({reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-center gap-2 md:gap-3 mb-3 md:mb-5">
            {oldPrice && <span className="text-gray-400 line-through text-xs md:text-sm">{formatPrice(oldPrice)}</span>}
            <span className="text-[#16a34a] font-black text-lg md:text-xl">{formatPrice(price)}</span>
        </div>

        {/* Actions - Prevent Navigation on Click */}
        <div className="mt-auto flex flex-col gap-3 w-full" onClick={handleActionClick}>
            <div className="flex items-center justify-center border border-gray-200 rounded-lg bg-gray-50 w-24 md:w-28 mx-auto h-8 md:h-9">
                <button 
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-8 h-full flex items-center justify-center text-gray-500 hover:text-[#16a34a] hover:bg-gray-100 rounded-l-lg transition-colors cursor-pointer"
                  type="button"
                >
                    <Minus size={12} />
                </button>
                <span className="text-xs md:text-sm font-bold w-6 text-center text-gray-700 cursor-default">{qty}</span>
                <button 
                  onClick={() => setQty(qty + 1)}
                  className="w-8 h-full flex items-center justify-center text-gray-500 hover:text-[#16a34a] hover:bg-gray-100 rounded-r-lg transition-colors cursor-pointer"
                  type="button"
                >
                    <Plus size={12} />
                </button>
            </div>
            
            <button 
              onClick={handleAddToCart}
              className="bg-[#1e2025] hover:bg-[#16a34a] text-white text-xs md:text-sm font-bold py-2 md:py-2.5 px-4 rounded-full transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 w-full cursor-pointer"
            >
                Add to cart
            </button>
        </div>
      </div>
    </div>
  );
};

interface ProductGridProps {
    products: Product[];
    onProductClick: (slug: string) => void;
    onAddToCart: (item: CartItem) => void;
    title?: string | null;
    category?: 'all' | 'software' | 'subscription' | 'games';
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onProductClick, onAddToCart, title, category = 'all' }) => {
  const displayTitle = title !== undefined ? title : "Top Selling Products";

  const filteredProducts = products.filter(p => {
      if (p.id === 'default') return false; // Skip default template
      if (category === 'all') return true;
      if (category === 'software') return p.category !== 'Creative Tools' && p.category !== 'AI Tools'; // Rough approximation based on existing data
      if (category === 'subscription') return p.category === 'Creative Tools' || p.category === 'AI Tools';
      if (category === 'games') return p.category === 'Games';
      return true;
  });

  return (
    <section className="py-8 md:py-16 bg-white">
      <div className="max-w-[1440px] mx-auto px-6 md:px-20 lg:px-32">
        {displayTitle && (
            <div className="text-center mb-8 md:mb-12">
                <h2 className="text-2xl md:text-3xl font-black text-[#1e2025] uppercase tracking-wide inline-block relative">
                    {displayTitle}
                    <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-12 md:w-16 h-1 bg-[#16a34a] rounded-full"></span>
                </h2>
            </div>
        )}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {filteredProducts.map(product => (
                <ProductCard 
                    key={product.id}
                    product={product}
                    onClick={onProductClick}
                    onAddToCart={onAddToCart}
                />
            ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;