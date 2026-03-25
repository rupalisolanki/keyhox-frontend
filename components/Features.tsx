import React from 'react';
import { ShieldCheck, Headset, CreditCard, Zap } from 'lucide-react';

const Features: React.FC = () => {
  return (
    <div className="bg-white border-b border-gray-100 shadow-sm relative z-40">
      <div className="max-w-[1440px] mx-auto px-4 md:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          
          {/* Item 1: Genuine Products */}
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-3 md:gap-4 py-6 px-2 md:px-4
            border-b border-r border-gray-100 
            lg:border-b-0
            group cursor-default hover:bg-gray-50/50 transition-colors text-center md:text-left">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#16a34a]/10 flex items-center justify-center text-[#16a34a] group-hover:scale-110 group-hover:bg-[#16a34a] group-hover:text-white transition-all duration-300 shadow-sm shrink-0">
                <ShieldCheck size={20} className="md:w-6 md:h-6" strokeWidth={2} />
            </div>
            <div className="flex flex-col">
                <h3 className="font-bold text-gray-900 text-[11px] md:text-sm uppercase tracking-wide leading-tight">Genuine Products</h3>
                <p className="text-[10px] md:text-xs text-gray-500 font-medium mt-1">100% Official Licenses</p>
            </div>
          </div>

          {/* Item 2: 24/7 Support */}
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-3 md:gap-4 py-6 px-2 md:px-4
            border-b border-gray-100 
            lg:border-b-0 lg:border-r
            group cursor-default hover:bg-gray-50/50 transition-colors text-center md:text-left">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#16a34a]/10 flex items-center justify-center text-[#16a34a] group-hover:scale-110 group-hover:bg-[#16a34a] group-hover:text-white transition-all duration-300 shadow-sm shrink-0">
                <Headset size={20} className="md:w-6 md:h-6" strokeWidth={2} />
            </div>
            <div className="flex flex-col">
                <h3 className="font-bold text-gray-900 text-[11px] md:text-sm uppercase tracking-wide leading-tight">24/7 Support</h3>
                <p className="text-[10px] md:text-xs text-gray-500 font-medium mt-1">Always Here to Help</p>
            </div>
          </div>

          {/* Item 3: Safe Payment */}
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-3 md:gap-4 py-6 px-2 md:px-4
            border-r border-gray-100 
            lg:border-r
            group cursor-default hover:bg-gray-50/50 transition-colors text-center md:text-left">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#16a34a]/10 flex items-center justify-center text-[#16a34a] group-hover:scale-110 group-hover:bg-[#16a34a] group-hover:text-white transition-all duration-300 shadow-sm shrink-0">
                <CreditCard size={20} className="md:w-6 md:h-6" strokeWidth={2} />
            </div>
            <div className="flex flex-col">
                <h3 className="font-bold text-gray-900 text-[11px] md:text-sm uppercase tracking-wide leading-tight">Safe Payment</h3>
                <p className="text-[10px] md:text-xs text-gray-500 font-medium mt-1">100% Secure Checkout</p>
            </div>
          </div>

          {/* Item 4: Instant Delivery */}
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-3 md:gap-4 py-6 px-2 md:px-4
            group cursor-default hover:bg-gray-50/50 transition-colors text-center md:text-left">
             <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#16a34a]/10 flex items-center justify-center text-[#16a34a] group-hover:scale-110 group-hover:bg-[#16a34a] group-hover:text-white transition-all duration-300 shadow-sm shrink-0">
                <Zap size={20} className="md:w-6 md:h-6" strokeWidth={2} />
            </div>
            <div className="flex flex-col">
                <h3 className="font-bold text-gray-900 text-[11px] md:text-sm uppercase tracking-wide leading-tight">Instant Delivery</h3>
                <p className="text-[10px] md:text-xs text-gray-500 font-medium mt-1">Direct to your Email</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Features;