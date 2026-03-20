import React from 'react';
import { Trash2, ShoppingCart, ArrowLeft, Heart } from 'lucide-react';
import { WishlistItem } from '../types';
import { useCurrency } from '../context/CurrencyContext';

interface WishlistProps {
  items: WishlistItem[];
  onRemove: (id: string) => void;
  onMoveToCart: (item: WishlistItem) => void;
  onNavigateHome: () => void;
  onProductClick: (slug: string) => void;
}

const Wishlist: React.FC<WishlistProps> = ({ items = [], onRemove, onMoveToCart, onNavigateHome, onProductClick }) => {
  // Defensive check to ensure items is always an array
  const safeItems = Array.isArray(items) ? items : [];
  const { formatPrice } = useCurrency();

  if (safeItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center px-4 py-20 bg-white min-h-[50vh]">
        <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-6">
          <Heart size={40} className="text-red-400" fill="#f87171" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Your wishlist is empty</h2>
        <p className="text-gray-500 mb-8 max-w-md">Browse our software catalog and save your favorite items here.</p>
        <button 
          onClick={onNavigateHome}
          className="bg-gray-900 text-white px-8 py-3.5 rounded-xl font-bold flex items-center gap-2 shadow-sm"
        >
          <ArrowLeft size={20} /> Return to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-10 py-8 md:py-16">
      <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-8 md:mb-12 flex items-center gap-3">
        My Wishlist <span className="text-gray-400 font-medium text-xl">({safeItems.length})</span>
      </h1>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Desktop Header */}
        <div className="hidden md:grid grid-cols-12 gap-4 p-5 bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
          <div className="col-span-6">Product</div>
          <div className="col-span-2 text-center">Price</div>
          <div className="col-span-2 text-center">Stock Status</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        {/* Items */}
        <div className="divide-y divide-gray-100">
          {safeItems.map((item) => {
            // Ensure item exists
            if (!item) return null;
            
            // Safe property access
            const price = typeof item.price === 'number' ? item.price : 0;
            const title = item.title || 'Unknown Product';
            const subtitle = item.subtitle || '';
            const logo = item.logo || 'Product';
            // Safe class handling for imageColor - ensure no undefined class names
            const imageColor = item.imageColor && typeof item.imageColor === 'string' ? item.imageColor : 'bg-gray-100';

            return (
              <div key={item.id} className="p-5 md:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                
                {/* Product Info */}
                <div className="col-span-1 md:col-span-6 flex items-center gap-4 md:gap-6">
                   <div 
                      onClick={() => onProductClick(item.id)}
                      className={`w-20 h-20 md:w-24 md:h-24 rounded-xl ${imageColor} flex items-center justify-center p-3 shrink-0 cursor-pointer overflow-hidden relative`}
                   >
                      {item.coverImage ? (
                          <img src={item.coverImage} alt={title} className="w-full h-full object-cover" />
                      ) : typeof logo === 'string' && logo.includes('http') ? (
                         <img src={logo} alt={title} className="w-full h-full object-contain" />
                      ) : (
                         <span className="text-white font-bold text-xs text-center break-words">{typeof logo === 'string' ? logo : 'Product'}</span>
                      )}
                   </div>
                   <div>
                     <h3 
                        onClick={() => onProductClick(item.id)}
                        className="font-bold text-gray-900 text-base md:text-lg mb-1 cursor-pointer"
                     >
                        {title}
                     </h3>
                     <p className="text-sm text-gray-500 mb-2">{subtitle}</p>
                   </div>
                </div>

                {/* Price */}
                <div className="col-span-1 md:col-span-2 flex md:justify-center items-center justify-between md:w-auto w-full">
                   <span className="md:hidden text-sm font-medium text-gray-500">Price:</span>
                   <span className="font-bold text-gray-700">{formatPrice(price)}</span>
                </div>

                {/* Stock */}
                <div className="col-span-1 md:col-span-2 flex md:justify-center items-center justify-between md:w-auto w-full">
                    <span className="md:hidden text-sm font-medium text-gray-500">Availability:</span>
                    <span className="text-[#16a34a] font-bold text-sm bg-green-50 px-3 py-1 rounded-full">In Stock</span>
                </div>

                {/* Actions */}
                <div className="col-span-1 md:col-span-2 flex md:justify-end items-center justify-between md:w-auto w-full gap-3">
                    <button 
                      onClick={() => onMoveToCart(item)}
                      className="flex-1 md:flex-none bg-[#1e2025] text-white px-4 py-2.5 rounded-lg font-bold text-sm flex items-center justify-center gap-2 shadow-sm"
                    >
                      <ShoppingCart size={16} /> <span className="md:hidden lg:inline">Add to Cart</span>
                    </button>
                    <button 
                      onClick={() => onRemove(item.id)}
                      className="w-10 h-10 rounded-lg border border-gray-200 text-gray-400 flex items-center justify-center"
                      title="Remove from wishlist"
                    >
                      <Trash2 size={18} />
                    </button>
                </div>

              </div>
            );
          })}
        </div>
        
        <div className="p-5 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
           <button onClick={onNavigateHome} className="flex items-center gap-2 text-gray-600 font-bold text-sm">
              <ArrowLeft size={16} /> Continue Shopping
           </button>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;