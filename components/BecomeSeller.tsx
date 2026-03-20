import React from 'react';
import { Rocket, Globe, ShieldCheck, Zap, Mail, BarChart, CreditCard, Lock } from 'lucide-react';

const BecomeSeller: React.FC = () => {
  return (
    <div className="bg-white animate-in fade-in duration-500">
      
      {/* Hero Section */}
      <div className="bg-[#1e2025] text-white py-20 md:py-28 relative overflow-hidden">
         {/* Abstract Background */}
         <div className="absolute inset-0 opacity-10">
            <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0 100 C 20 0 50 0 100 100 Z" fill="#16a34a" />
            </svg>
        </div>
        
        <div className="max-w-[1440px] mx-auto px-4 md:px-10 relative z-10 text-center">
             <div className="inline-flex items-center gap-2 bg-[#16a34a]/10 border border-[#16a34a]/20 px-4 py-1.5 rounded-full text-[#16a34a] font-bold text-sm mb-6 uppercase tracking-wider">
                <Rocket size={16} /> Merchant Program
             </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                Become a Seller <br /> on <span className="text-[#16a34a]">Keyhox</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                We are building a global marketplace for premium digital software. 
                <br className="hidden md:block"/>
                Join us to reach customers worldwide with instant delivery and secure payments.
            </p>
        </div>
      </div>

      {/* Status Banner */}
      <div className="bg-[#fff7ed] border-b border-[#ffedd5]">
          <div className="max-w-[1440px] mx-auto px-4 md:px-10 py-4 text-center">
              <p className="text-[#c2410c] font-bold flex items-center justify-center gap-2 text-sm md:text-base">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
                  </span>
                  Seller Registration is currently <span className="underline decoration-2 underline-offset-2">Invite Only</span>. Public registration coming soon.
              </p>
          </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-10 py-16 md:py-24">
        
        {/* Why Sell With Us */}
        <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Partner With Keyhox?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
                We provide the infrastructure, marketing, and security so you can focus on sourcing great products.
            </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
            {/* Benefit 1 */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-xl hover:shadow-[#16a34a]/5 hover:border-[#16a34a]/30 transition-all duration-300 group">
                <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#16a34a] mb-6 group-hover:scale-110 transition-transform">
                    <Globe size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Global Reach</h3>
                <p className="text-gray-600 leading-relaxed">
                    Instantly access thousands of customers from over 100 countries. Our platform handles currency conversion and localized payment methods automatically.
                </p>
            </div>

            {/* Benefit 2 */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-xl hover:shadow-[#16a34a]/5 hover:border-[#16a34a]/30 transition-all duration-300 group">
                <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#16a34a] mb-6 group-hover:scale-110 transition-transform">
                    <Zap size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Instant Delivery System</h3>
                <p className="text-gray-600 leading-relaxed">
                    Our automated API system delivers keys to customers within seconds of purchase, 24/7, reducing workload and increasing customer satisfaction.
                </p>
            </div>

            {/* Benefit 3 */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-xl hover:shadow-[#16a34a]/5 hover:border-[#16a34a]/30 transition-all duration-300 group">
                <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#16a34a] mb-6 group-hover:scale-110 transition-transform">
                    <ShieldCheck size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Fraud Protection</h3>
                <p className="text-gray-600 leading-relaxed">
                    We use advanced AI fraud detection to protect your stock. Zero chargeback liability for verified deliveries. Sell with peace of mind.
                </p>
            </div>

             {/* Benefit 4 */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-xl hover:shadow-[#16a34a]/5 hover:border-[#16a34a]/30 transition-all duration-300 group">
                <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#16a34a] mb-6 group-hover:scale-110 transition-transform">
                    <BarChart size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Analytics Dashboard</h3>
                <p className="text-gray-600 leading-relaxed">
                    Track sales, view performance metrics, and manage inventory in real-time with our professional seller dashboard.
                </p>
            </div>

             {/* Benefit 5 */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-xl hover:shadow-[#16a34a]/5 hover:border-[#16a34a]/30 transition-all duration-300 group">
                <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#16a34a] mb-6 group-hover:scale-110 transition-transform">
                    <CreditCard size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Flexible Payouts</h3>
                <p className="text-gray-600 leading-relaxed">
                    Get paid weekly via Bank Transfer, Wise, Payoneer, or Crypto (USDT). Low withdrawal fees and transparent reporting.
                </p>
            </div>

             {/* Benefit 6 */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-xl hover:shadow-[#16a34a]/5 hover:border-[#16a34a]/30 transition-all duration-300 group">
                <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#16a34a] mb-6 group-hover:scale-110 transition-transform">
                    <Lock size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">No Setup Fees</h3>
                <p className="text-gray-600 leading-relaxed">
                    It's free to join. We only make money when you make a sale. Competitive commission rates tailored to your product category.
                </p>
            </div>
        </div>

        {/* Contact / Early Access */}
        <div className="bg-[#1e2025] rounded-3xl p-8 md:p-16 text-center text-white relative overflow-hidden">
            <div className="relative z-10 max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Interested in Early Access?</h2>
                <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                    While our automated registration portal is under development, we are onboarding select high-volume sellers manually. 
                    If you are an authorized distributor or wholesale supplier, please contact our business team.
                </p>
                
                <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                    <a href="mailto:support@keyhox.com" className="bg-[#16a34a] hover:bg-[#15803d] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-[#16a34a]/20 flex items-center gap-3">
                        <Mail size={20} /> support@keyhox.com
                    </a>
                </div>
                <p className="mt-6 text-sm text-gray-500">
                    Please include your company details and product catalog for faster review.
                </p>
            </div>
        </div>

      </div>
    </div>
  );
};

export default BecomeSeller;