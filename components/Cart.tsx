import React, { useState } from 'react';
import { Trash2, Minus, Plus, ArrowRight, ArrowLeft, Tag, ShieldCheck, ShoppingCart as CartIcon } from 'lucide-react';
import { CartItem } from '../types';
import ProductGrid from './ProductGrid';
import { useCurrency } from '../context/CurrencyContext';

interface CartProps {
  items: CartItem[];
  onUpdateQty: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onNavigateHome: () => void;
  onProductClick: (slug: string) => void;
  onAddToCart: (item: CartItem) => void;
  onNavigateCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({ items, onUpdateQty, onRemove, onNavigateHome, onProductClick, onAddToCart, onNavigateCheckout }) => {
  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const { formatPrice } = useCurrency();
  
  // Empty Cart State
  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-20">
        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6 animate-in fade-in zoom-in duration-300">
          <CartIcon size={40} className="text-gray-300" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-8 max-w-md">Looks like you haven't added any software keys to your cart yet.</p>
        <button 
          onClick={onNavigateHome}
          className="bg-[#1e2025] text-white px-8 py-3.5 rounded-xl font-bold hover:bg-[#16a34a] transition-all flex items-center gap-2 shadow-lg hover:shadow-xl"
        >
          <ArrowLeft size={20} /> Return to Shop
        </button>
        
        <div className="mt-20 w-full animate-in slide-in-from-bottom-8 duration-500">
             <ProductGrid 
                title="You might be interested in" 
                onProductClick={onProductClick} 
                onAddToCart={onAddToCart} 
            />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-10 py-8 md:py-16 animate-in fade-in duration-500">
      <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-8 md:mb-12">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
        
        {/* Left Side: Cart Items */}
        <div className="flex-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Desktop Header */}
            <div className="hidden md:grid grid-cols-12 gap-4 p-5 bg-gray-50/50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Subtotal</div>
            </div>

            {/* Items */}
            <div className="divide-y divide-gray-100">
              {items.map((item) => (
                <div key={item.id} className="p-5 md:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center group">
                  
                  {/* Product Info */}
                  <div className="col-span-1 md:col-span-6 flex items-center gap-4 md:gap-6">
                     <div 
                        onClick={() => onProductClick(item.id)}
                        className={`w-20 h-20 md:w-24 md:h-24 rounded-xl ${item.imageColor} flex items-center justify-center p-3 shrink-0 cursor-pointer hover:opacity-90 transition-opacity relative overflow-hidden`}
                     >
                        {item.coverImage ? (
                            <img src={item.coverImage} alt={item.title} className="w-full h-full object-cover" />
                        ) : item.logo.includes('http') ? (
                           <img src={item.logo} alt={item.title} className="w-full h-full object-contain" />
                        ) : (
                           <span className="text-white font-bold text-xs text-center">{item.logo}</span>
                        )}
                     </div>
                     <div>
                       <h3 
                        onClick={() => onProductClick(item.id)}
                        className="font-bold text-gray-900 text-base md:text-lg mb-1 cursor-pointer hover:text-[#16a34a] transition-colors"
                       >
                            {item.title}
                       </h3>
                       <p className="text-sm text-gray-500 mb-2">{item.subtitle}</p>
                       <button 
                         onClick={() => onRemove(item.id)}
                         className="text-red-500 text-xs font-bold hover:underline flex items-center gap-1 md:hidden"
                       >
                         <Trash2 size={12} /> Remove
                       </button>
                     </div>
                  </div>

                  {/* Price */}
                  <div className="col-span-1 md:col-span-2 flex md:justify-center items-center justify-between md:w-auto w-full">
                     <span className="md:hidden text-sm font-medium text-gray-500">Price:</span>
                     <span className="font-bold text-gray-700">{formatPrice(item.price)}</span>
                  </div>

                  {/* Quantity */}
                  <div className="col-span-1 md:col-span-2 flex md:justify-center items-center justify-between md:w-auto w-full">
                      <span className="md:hidden text-sm font-medium text-gray-500">Quantity:</span>
                      <div className="flex items-center border border-gray-200 rounded-lg h-9 bg-white">
                         <button 
                            onClick={() => onUpdateQty(item.id, -1)}
                            disabled={item.quantity <= 1}
                            className="w-9 h-full flex items-center justify-center text-gray-500 hover:text-[#16a34a] hover:bg-gray-50 rounded-l-lg transition-colors disabled:opacity-50"
                         >
                            <Minus size={14} />
                         </button>
                         <span className="w-10 text-center text-sm font-bold text-gray-900">{item.quantity}</span>
                         <button 
                             onClick={() => onUpdateQty(item.id, 1)}
                             className="w-9 h-full flex items-center justify-center text-gray-500 hover:text-[#16a34a] hover:bg-gray-50 rounded-r-lg transition-colors"
                         >
                             <Plus size={14} />
                         </button>
                      </div>
                  </div>

                  {/* Subtotal & Delete (Desktop) */}
                  <div className="col-span-1 md:col-span-2 flex md:justify-end items-center justify-between md:w-auto w-full">
                      <span className="md:hidden text-sm font-medium text-gray-500">Total:</span>
                      <div className="flex items-center gap-4">
                        <span className="font-bold text-[#16a34a] text-lg">{formatPrice(item.price * item.quantity)}</span>
                        <button 
                          onClick={() => onRemove(item.id)}
                          className="hidden md:flex w-8 h-8 rounded-full bg-gray-50 hover:bg-red-50 text-gray-400 hover:text-red-500 items-center justify-center transition-colors"
                          title="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                  </div>

                </div>
              ))}
            </div>

            <div className="p-5 border-t border-gray-100 bg-gray-50/30 flex justify-between items-center">
               <button onClick={onNavigateHome} className="flex items-center gap-2 text-gray-600 font-bold hover:text-[#16a34a] transition-colors text-sm">
                  <ArrowLeft size={16} /> Continue Shopping
               </button>
               {/* Could add 'Update Cart' button if logic required manual update, but state is sync here */}
            </div>
          </div>
        </div>

        {/* Right Side: Totals & Coupon */}
        <div className="w-full lg:w-[400px] shrink-0 space-y-8">
            
            {/* Cart Totals */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">Cart Totals</h3>
                
                <div className="space-y-4 mb-6">
                   <div className="flex justify-between items-center text-gray-600">
                      <span>Subtotal</span>
                      <span className="font-bold text-gray-900">{formatPrice(subtotal)}</span>
                   </div>
                   <div className="flex justify-between items-center text-gray-600">
                      <span>Shipping</span>
                      <span className="text-[#16a34a] font-bold text-sm">Free (Digital Delivery)</span>
                   </div>
                   <div className="flex justify-between items-center text-gray-600">
                      <span>Tax (Included)</span>
                      <span className="font-bold text-gray-900">{formatPrice(subtotal * 0.18)}</span>
                   </div>
                </div>

                <div className="flex justify-between items-center pt-6 border-t border-gray-100 mb-8">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <span className="text-3xl font-black text-[#16a34a]">{formatPrice(subtotal)}</span>
                </div>

                <button 
                    onClick={onNavigateCheckout}
                    className="w-full bg-[#1e2025] hover:bg-black text-white py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group mb-4"
                >
                    Proceed to Checkout <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="flex items-center justify-center gap-2 text-xs text-gray-500 font-medium">
                    <ShieldCheck size={14} className="text-[#16a34a]" /> Secure SSL Encrypted Payment
                </div>
            </div>

            {/* Coupon Code */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                   <Tag size={18} className="text-[#16a34a]" /> Coupon Code
                </h3>
                <p className="text-sm text-gray-500 mb-4">If you have a coupon code, please apply it below.</p>
                
                <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Enter coupon code" 
                      className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#16a34a] focus:ring-2 focus:ring-[#16a34a]/10 outline-none font-medium text-gray-900 placeholder-gray-400"
                    />
                    <button className="bg-gray-900 hover:bg-[#16a34a] text-white px-6 py-3 rounded-xl font-bold transition-colors">
                       Apply
                    </button>
                </div>
            </div>

        </div>
      </div>

      {/* Recommendations */}
      <div className="mt-20">
         <ProductGrid 
            title="You may also like" 
            onProductClick={onProductClick} 
            onAddToCart={onAddToCart} 
         />
      </div>

    </div>
  );
};

export default Cart;