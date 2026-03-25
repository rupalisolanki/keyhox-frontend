import React, { useEffect, useState } from 'react';
import { X, Minus, Plus, Trash2, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types';
import { useCurrency } from '../context/CurrencyContext';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQty: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onNavigateCart: () => void;
  onNavigateCheckout: () => void;
  onProductClick: (slug: string) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onUpdateQty, onRemove, onNavigateCart, onNavigateCheckout, onProductClick }) => {
  const [isClosing, setIsClosing] = useState(false);
  const { formatPrice } = useCurrency();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsClosing(false);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
        onClose();
        setIsClosing(false); 
    }, 300); // Wait for animation
  };
  
  const handleViewCart = () => {
      onNavigateCart();
      handleClose();
  }

  const handleCheckout = () => {
      onNavigateCheckout();
      handleClose();
  }

  const handleProductClick = (id: string) => {
      onProductClick(id);
      handleClose();
  }

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`}
        onClick={handleClose}
      />

      {/* Drawer Panel */}
      <div className={`relative w-full max-w-md bg-white shadow-2xl h-full flex flex-col transition-transform duration-300 transform ${isClosing ? 'translate-x-full' : 'translate-x-0'} animate-in slide-in-from-right`}>
        
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-white z-10">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-[#16a34a]/10 rounded-full flex items-center justify-center text-[#16a34a]">
                <ShoppingBag size={20} />
             </div>
             <div>
                <h2 className="text-xl font-bold text-gray-900">Your Cart</h2>
                <p className="text-xs text-gray-500">{items.length} items</p>
             </div>
          </div>
          <button 
            onClick={handleClose}
            className="p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
           {items.length === 0 ? (
               <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-60">
                   <ShoppingBag size={64} className="text-gray-300" />
                   <h3 className="text-xl font-bold text-gray-900">Your cart is empty</h3>
                   <p className="text-gray-500 max-w-xs">Looks like you haven't added any software keys yet.</p>
                   <button 
                    onClick={handleClose}
                    className="mt-4 px-6 py-3 bg-[#1e2025] text-white rounded-xl font-bold hover:bg-[#16a34a] transition-colors"
                   >
                       Start Shopping
                   </button>
               </div>
           ) : (
               items.map((item) => (
                   <div key={item.id} className="flex gap-4 group">
                       {/* Product Image/Icon */}
                       <div 
                         onClick={() => handleProductClick(item.id)}
                         className={`w-20 h-20 rounded-xl ${item.imageColor} shrink-0 flex items-center justify-center p-2 relative overflow-hidden cursor-pointer hover:opacity-90 transition-opacity`}
                       >
                           {item.coverImage ? (
                                <img src={item.coverImage} alt={item.title} className="w-full h-full object-cover" />
                           ) : item.logo.includes('http') ? (
                               <img src={item.logo} alt={item.title} className="w-full h-full object-contain" />
                           ) : (
                               <span className="text-white font-bold text-sm text-center leading-tight">{item.logo}</span>
                           )}
                       </div>

                       {/* Details */}
                       <div className="flex-1 flex flex-col justify-between">
                           <div>
                               <div className="flex justify-between items-start gap-2">
                                   <h4 
                                    onClick={() => handleProductClick(item.id)}
                                    className="font-bold text-gray-900 text-sm line-clamp-2 leading-tight cursor-pointer hover:text-[#16a34a] transition-colors"
                                   >
                                       {item.title}
                                   </h4>
                                   <button 
                                    onClick={() => onRemove(item.id)}
                                    className="text-gray-400 hover:text-red-500 transition-colors p-1 -mr-2 -mt-1"
                                   >
                                       <Trash2 size={16} />
                                   </button>
                               </div>
                               <p className="text-xs text-gray-500 mt-1">{item.subtitle}</p>
                           </div>

                           <div className="flex items-center justify-between mt-2">
                               <div className="flex items-center border border-gray-200 rounded-lg h-8">
                                   <button 
                                    onClick={() => onUpdateQty(item.id, -1)}
                                    className="w-8 h-full flex items-center justify-center hover:bg-gray-50 text-gray-500 rounded-l-lg"
                                    disabled={item.quantity <= 1}
                                   >
                                       <Minus size={14} />
                                   </button>
                                   <span className="w-8 text-center text-sm font-bold text-gray-900">{item.quantity}</span>
                                   <button 
                                    onClick={() => onUpdateQty(item.id, 1)}
                                    className="w-8 h-full flex items-center justify-center hover:bg-gray-50 text-gray-500 rounded-r-lg"
                                   >
                                       <Plus size={14} />
                                   </button>
                               </div>
                               <div className="text-[#16a34a] font-bold">
                                   {formatPrice(item.price * item.quantity)}
                               </div>
                           </div>
                       </div>
                   </div>
               ))
           )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
            <div className="p-5 border-t border-gray-100 bg-gray-50">
                <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-gray-500 text-sm">
                        <span>Subtotal</span>
                        <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-gray-900 font-black text-xl">
                        <span>Total</span>
                        <span>{formatPrice(subtotal)}</span>
                    </div>
                </div>
                
                <div className="flex flex-col gap-3">
                    <button 
                        onClick={handleCheckout}
                        className="w-full bg-[#1e2025] hover:bg-black text-white py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
                    >
                        Checkout Securely <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button 
                        onClick={handleViewCart}
                        className="w-full bg-white border border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50 py-3.5 rounded-xl font-bold transition-all"
                    >
                        View Cart
                    </button>
                </div>

                <div className="flex justify-center items-center gap-2 mt-4 text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                    <ShieldCheck size={12} /> 100% Secure Checkout
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;