import React from 'react';
import { Truck, RotateCcw, Headset, CreditCard, Facebook, Instagram, Linkedin, Youtube, Phone } from 'lucide-react';

interface FooterProps {
    onNavigateAbout?: () => void;
    onNavigateRefund?: () => void;
    onNavigateTerms?: () => void;
    onNavigatePrivacy?: () => void;
    onNavigateDisclaimer?: () => void;
    onNavigateDmca?: () => void;
    onNavigateSupport?: () => void;
    onNavigateUpdate?: () => void;
    onNavigateContact?: () => void;
    onNavigateBlog?: () => void;
    onNavigateSeller?: () => void;
    onNavigateLicense?: () => void;
    onNavigateProduct?: (slug: string) => void;
    onAdminLogin?: () => void;
}

const Footer: React.FC<FooterProps> = ({ 
    onNavigateAbout, 
    onNavigateRefund, 
    onNavigateTerms, 
    onNavigatePrivacy, 
    onNavigateDisclaimer,
    onNavigateDmca,
    onNavigateSupport,
    onNavigateUpdate,
    onNavigateContact,
    onNavigateBlog,
    onNavigateSeller,
    onNavigateLicense,
    onNavigateProduct,
    onAdminLogin
}) => {
  return (
    <footer className="bg-[#1e2025] text-gray-400">
      {/* Top Features Bar - Hidden on Mobile, Visible on Desktop */}
      <div className="hidden md:block border-b border-gray-800 bg-[#181a1d]">
        <div className="max-w-[1440px] mx-auto px-4 md:px-10 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
             <div className="flex items-center gap-4 group">
               <div className="p-3 rounded-full bg-[#2a2d35] group-hover:bg-[#16a34a] transition-colors duration-300">
                 <Truck size={24} className="text-white shrink-0" />
               </div>
               <div>
                 <h4 className="text-white font-bold text-sm">Free Digital Shipping</h4>
                 <p className="text-xs mt-1 text-gray-500">5-10 Min. Instant Delivery</p>
               </div>
             </div>
             <div className="flex items-center gap-4 group">
               <div className="p-3 rounded-full bg-[#2a2d35] group-hover:bg-[#16a34a] transition-colors duration-300">
                 <RotateCcw size={24} className="text-white shrink-0" />
               </div>
               <div>
                 <h4 className="text-white font-bold text-sm">Easy & Fast Exchange</h4>
                 <p className="text-xs mt-1 text-gray-500">7 Days Free Exchange Policy</p>
               </div>
             </div>
             <div className="flex items-center gap-4 group">
               <div className="p-3 rounded-full bg-[#2a2d35] group-hover:bg-[#16a34a] transition-colors duration-300">
                 <Headset size={24} className="text-white shrink-0" />
               </div>
               <div>
                 <h4 className="text-white font-bold text-sm">24/7 Customer Support</h4>
                 <p className="text-xs mt-1 text-gray-500">Online Help By Our Agents</p>
               </div>
             </div>
             <div className="flex items-center gap-4 group">
               <div className="p-3 rounded-full bg-[#2a2d35] group-hover:bg-[#16a34a] transition-colors duration-300">
                 <CreditCard size={24} className="text-white shrink-0" />
               </div>
               <div>
                 <h4 className="text-white font-bold text-sm">100% Secure Payments</h4>
                 <p className="text-xs mt-1 text-gray-500">UPI/Internet Banking/Cards</p>
               </div>
             </div>
          </div>
        </div>
      </div>

      {/* Main Links Area */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-10 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-10 md:gap-10">
          
          {/* About Company */}
          <div className="col-span-1">
            <h3 className="text-[#16a34a] font-bold uppercase text-sm mb-4 md:mb-6 tracking-wider">About Company</h3>
            <ul className="space-y-2 md:space-y-3 text-sm text-gray-400">
              <li>
                  <button onClick={onNavigateAbout} className="hover:text-white transition-colors text-left">About Us</button>
              </li>
              <li>
                  <button onClick={onNavigateContact} className="hover:text-white transition-colors text-left">Contact Us</button>
              </li>
              <li>
                  <button onClick={onNavigateSeller} className="hover:text-white transition-colors text-left">Become a Seller</button>
              </li>
              <li>
                  <button onClick={onNavigateBlog} className="hover:text-white transition-colors text-left">Blog</button>
              </li>
            </ul>
          </div>

          {/* Shop */}
          <div className="col-span-1">
            <h3 className="text-[#16a34a] font-bold uppercase text-sm mb-4 md:mb-6 tracking-wider">Shop</h3>
            <ul className="space-y-2 md:space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <button onClick={() => onNavigateProduct?.('chatgpt-plus')} className="hover:text-white transition-colors text-left">ChatGPT Plus</button>
                <span className="text-[10px] bg-red-500 text-white px-1.5 py-0.5 rounded font-bold">HOT</span>
              </li>
              <li className="flex items-center gap-2">
                <button onClick={() => onNavigateProduct?.('capcut-pro')} className="hover:text-white transition-colors text-left">CapCut Pro</button>
                <span className="text-[10px] bg-yellow-500 text-black px-1.5 py-0.5 rounded font-bold">SALE</span>
              </li>
              <li className="flex items-center gap-2">
                <button onClick={() => onNavigateProduct?.('default')} className="hover:text-white transition-colors text-left">Windows 10 Pro</button>
              </li>
              <li className="flex items-center gap-2">
                <button onClick={() => onNavigateProduct?.('office-365-pro-plus')} className="hover:text-white transition-colors text-left">Office 365</button>
                <span className="text-[10px] bg-[#16a34a] text-black px-1.5 py-0.5 rounded font-bold">NEW</span>
              </li>
            </ul>
          </div>

          {/* Store Policies */}
          <div className="col-span-1">
            <h3 className="text-[#16a34a] font-bold uppercase text-sm mb-4 md:mb-6 tracking-wider">Store Policies</h3>
            <ul className="space-y-2 md:space-y-3 text-sm text-gray-400">
              <li>
                  <button onClick={onNavigatePrivacy} className="hover:text-white transition-colors text-left">Privacy Policy</button>
              </li>
              <li>
                  <button onClick={onNavigateTerms} className="hover:text-white transition-colors text-left">Terms Of Use</button>
              </li>
              <li>
                  <button onClick={onNavigateDisclaimer} className="hover:text-white transition-colors text-left">Disclaimer</button>
              </li>
              <li>
                   <button onClick={onNavigateDmca} className="hover:text-white transition-colors text-left">DMCA Policy</button>
              </li>
            </ul>
          </div>

          {/* Product Policies */}
          <div className="col-span-1">
            <h3 className="text-[#16a34a] font-bold uppercase text-sm mb-4 md:mb-6 tracking-wider">Product Policies</h3>
            <ul className="space-y-2 md:space-y-3 text-sm text-gray-400">
              <li>
                  <button onClick={onNavigateRefund} className="hover:text-white transition-colors text-left">Refund Policy</button>
              </li>
              <li>
                  <button onClick={onNavigateLicense} className="hover:text-white transition-colors text-left">License Policy</button>
              </li>
              <li>
                  <button onClick={onNavigateSupport} className="hover:text-white transition-colors text-left">Support Policy</button>
              </li>
              <li>
                  <button onClick={onNavigateUpdate} className="hover:text-white transition-colors text-left">Update Policy</button>
              </li>
            </ul>
          </div>

          {/* Subscribe */}
          <div className="col-span-2 md:col-span-1">
             <h3 className="text-[#16a34a] font-bold uppercase text-sm mb-4 md:mb-6 tracking-wider">Subscribe</h3>
             <div className="flex gap-3 md:gap-4 mb-4 md:mb-6 flex-wrap">
               <a href="https://www.facebook.com/profile.php?id=61580184836539" target="_blank" rel="noopener noreferrer" className="bg-[#2a2d35] p-2 rounded-lg hover:bg-[#1877f2] hover:text-white transition-colors"><Facebook size={18} /></a>
               <a href="https://www.instagram.com/digital_._hub?igsh=anU3dWNxNWttYTVi" target="_blank" rel="noopener noreferrer" className="bg-[#2a2d35] p-2 rounded-lg hover:bg-[#e4405f] hover:text-white transition-colors"><Instagram size={18} /></a>
               <a href="#" className="bg-[#2a2d35] p-2 rounded-lg hover:bg-[#0a66c2] hover:text-white transition-colors"><Linkedin size={18} /></a>
               <a href="https://wa.me/918305319636" target="_blank" rel="noopener noreferrer" className="bg-[#2a2d35] p-2 rounded-lg hover:bg-[#16a34a] hover:text-white transition-colors"><Phone size={18} /></a>
               <a href="#" className="bg-[#2a2d35] p-2 rounded-lg hover:bg-[#ff0000] hover:text-white transition-colors"><Youtube size={18} /></a>
             </div>
             <p className="text-xs text-gray-500">Subscribe to our newsletter for latest updates and offers.</p>
          </div>

        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="bg-[#181a1d] py-8 border-t border-gray-800">
        <div className="max-w-[1440px] mx-auto px-4 md:px-10 flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#16a34a] to-[#14532d] rounded-xl flex items-center justify-center font-black text-white text-xl shadow-lg shadow-[#16a34a]/20">
              DH
            </div>
            <div className="flex flex-col text-xs text-gray-500">
                <p className="mb-1"><span className="text-gray-300 font-bold">Phone:</span> +917903554767 <span className="text-gray-300 font-bold ml-3">Email:</span> support@keyhox.com</p>
                <p>Copyright © 2024 <span className="text-[#16a34a] font-bold">Keyhox</span>. All rights reserved. <button onClick={onAdminLogin} className="ml-2 hover:text-white transition-colors">Admin</button></p>
            </div>
          </div>

          <div className="flex gap-3">
             <div className="bg-white/5 px-3 py-1.5 rounded border border-white/10 text-xs font-bold text-gray-400">VISA</div>
             <div className="bg-white/5 px-3 py-1.5 rounded border border-white/10 text-xs font-bold text-gray-400">UPI</div>
             <div className="bg-white/5 px-3 py-1.5 rounded border border-white/10 text-xs font-bold text-gray-400">Skrill</div>
             <div className="bg-white/5 px-3 py-1.5 rounded border border-white/10 text-xs font-bold text-gray-400">Pay</div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;