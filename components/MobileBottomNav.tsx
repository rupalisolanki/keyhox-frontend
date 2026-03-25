import React from 'react';
import { Home, Store, ShoppingCart, User } from 'lucide-react';

interface MobileBottomNavProps {
    onNavigateHome: () => void;
    onNavigateShop?: () => void;
    onNavigateAuth?: () => void;
    onOpenCart?: () => void;
    cartCount?: number;
}

const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ 
  onNavigateHome, 
  onNavigateShop,
  onNavigateAuth, 
  onOpenCart,
  cartCount = 0
}) => {
    return (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 z-[100] md:hidden shadow-[0_-4px_10px_rgba(0,0,0,0.03)]">
            <div className="flex justify-between items-center px-8 py-3 min-h-[64px]">
                {/* Home (Replaces WhatsApp) */}
                <button 
                    onClick={onNavigateHome}
                    className="flex flex-col items-center justify-center gap-1.5 text-gray-600 hover:text-[#16a34a] transition-colors w-16 group"
                >
                    <Home size={22} strokeWidth={1.8} className="group-active:scale-90 transition-transform" />
                    <span className="text-[10px] font-semibold tracking-tight leading-none">Home</span>
                </button>

                {/* Shop */}
                <button 
                    onClick={onNavigateShop}
                    className="flex flex-col items-center justify-center gap-1.5 text-gray-600 hover:text-[#16a34a] transition-colors w-16 group"
                >
                    <Store size={22} strokeWidth={1.8} className="group-active:scale-90 transition-transform" />
                    <span className="text-[10px] font-semibold tracking-tight leading-none">Shop</span>
                </button>

                {/* Cart */}
                <button 
                  onClick={onOpenCart}
                  className="flex flex-col items-center justify-center gap-1.5 text-gray-600 hover:text-[#16a34a] transition-colors w-16 relative group"
                >
                    <div className="relative group-active:scale-90 transition-transform">
                        <ShoppingCart size={22} strokeWidth={1.8} />
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-orange-400 text-white text-[9px] font-bold h-4 w-4 flex items-center justify-center rounded-full border-[1.5px] border-white shadow-sm">
                                {cartCount}
                            </span>
                        )}
                    </div>
                    <span className="text-[10px] font-semibold tracking-tight leading-none">Cart</span>
                </button>

                {/* My Account */}
                <button 
                    onClick={onNavigateAuth}
                    className="flex flex-col items-center justify-center gap-1.5 text-gray-600 hover:text-[#16a34a] transition-colors w-16 group"
                >
                    <User size={22} strokeWidth={1.8} className="group-active:scale-90 transition-transform" />
                    <span className="text-[10px] font-semibold tracking-tight leading-none whitespace-nowrap">My account</span>
                </button>
            </div>
            
            {/* Safe Area Spacer for modern mobile devices (iPhone Home Bar) */}
            <div className="h-[env(safe-area-inset-bottom)] bg-white w-full"></div>
        </div>
    );
};

export default MobileBottomNav;