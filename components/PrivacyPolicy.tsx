import React from 'react';
import { Lock, Eye, CreditCard, Shield, Cookie, Server, UserCheck, Mail } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="bg-white animate-in fade-in duration-500">
      {/* Header */}
      <div className="bg-[#1e2025] text-white py-16 md:py-24 relative overflow-hidden">
         <div className="absolute inset-0 opacity-5">
            <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0 100 C 20 0 50 0 100 100 Z" fill="#16a34a" />
            </svg>
        </div>
        <div className="max-w-[1440px] mx-auto px-4 md:px-10 relative z-10 text-center">
             <div className="inline-flex items-center gap-2 bg-[#16a34a]/10 border border-[#16a34a]/20 px-4 py-1.5 rounded-full text-[#16a34a] font-bold text-sm mb-6">
                <Lock size={16} /> Data Protection
             </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4">Privacy Policy</h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Keyhox respects your privacy and is committed to protecting your personal information.
            </p>
            <p className="text-gray-500 text-sm mt-4 font-mono">Last Updated: January 2026</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-10 py-16 md:py-24">
         
         <div className="prose prose-lg max-w-none text-gray-600 mb-12">
            <p className="leading-relaxed">
                This Privacy Policy explains how we collect, use, and protect your information when you use our website and services.
                By using our website, you agree to the terms of this Privacy Policy.
            </p>
         </div>

         <div className="space-y-12">
            
            {/* 1. Information We Collect */}
            <section className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                        <Eye size={20} />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">1. Information We Collect</h2>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><UserCheck size={16} /> Personal Information</h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>Name</li>
                            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>Email address</li>
                            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>Billing information</li>
                            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>Contact details</li>
                        </ul>
                    </div>
                    <div>
                         <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><Server size={16} /> Technical Information</h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>IP address</li>
                            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>Device information</li>
                            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>Browser type</li>
                             <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>Usage data</li>
                        </ul>
                    </div>
                </div>
                <p className="text-sm text-gray-500 mt-6 pt-4 border-t border-gray-200">This information helps us provide and improve our services.</p>
            </section>

            {/* 2. How We Use */}
            <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
                <p className="text-gray-600 mb-4">We use your information to:</p>
                <div className="grid sm:grid-cols-2 gap-4">
                    {['Process and complete orders', 'Deliver digital products', 'Provide customer support', 'Improve website performance', 'Communicate important updates'].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-lg shadow-sm">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#16a34a]"></div>
                            <span className="text-sm text-gray-700 font-medium">{item}</span>
                        </div>
                    ))}
                </div>
                <p className="text-sm text-gray-500 mt-4 italic">We do not sell or rent your personal information to third parties.</p>
            </section>

             {/* 3 & 4 Grid */}
            <div className="grid md:grid-cols-2 gap-8">
                 <section className="border border-gray-200 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4 text-gray-900">
                        <CreditCard className="text-[#16a34a]" />
                        <h2 className="text-lg font-bold">3. Payment Information</h2>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Keyhox does not store your payment details.</p>
                    <p className="text-sm text-gray-600">Payments are securely processed through trusted third-party payment providers.</p>
                 </section>

                 <section className="border border-gray-200 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4 text-gray-900">
                        <Shield className="text-[#16a34a]" />
                        <h2 className="text-lg font-bold">4. Data Protection</h2>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">We take reasonable security measures to protect your information from unauthorized access, misuse, or disclosure.</p>
                    <p className="text-xs text-gray-400">However, no internet transmission is completely secure.</p>
                 </section>
            </div>

            {/* 5, 6, 8 Grid */}
            <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gray-50 p-6 rounded-xl">
                    <Cookie className="text-orange-400 mb-3" />
                    <h3 className="font-bold text-gray-900 mb-2">5. Cookies</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                        Our website may use cookies to improve user experience. You may disable cookies through your browser settings.
                    </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-xl">
                    <Server className="text-orange-400 mb-3" />
                    <h3 className="font-bold text-gray-900 mb-2">6. Third-Party Services</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                        We may use trusted third-party services to operate our website. These services have their own privacy policies.
                    </p>
                </div>
                 <div className="bg-gray-50 p-6 rounded-xl">
                    <UserCheck className="text-orange-400 mb-3" />
                    <h3 className="font-bold text-gray-900 mb-2">8. Children's Info</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                        Keyhox does not knowingly collect personal information from children under 18.
                    </p>
                </div>
            </div>

            {/* 7. Your Rights */}
            <section className="bg-[#16a34a]/5 border border-[#16a34a]/10 rounded-2xl p-8">
                 <h2 className="text-xl font-bold text-gray-900 mb-4">7. Your Rights</h2>
                 <p className="text-sm text-gray-600 mb-4">You have the right to:</p>
                 <div className="flex flex-wrap gap-3 mb-6">
                    <span className="px-3 py-1 bg-white border border-[#16a34a]/20 rounded-full text-xs font-bold text-[#16a34a]">Request Access</span>
                    <span className="px-3 py-1 bg-white border border-[#16a34a]/20 rounded-full text-xs font-bold text-[#16a34a]">Request Correction</span>
                    <span className="px-3 py-1 bg-white border border-[#16a34a]/20 rounded-full text-xs font-bold text-[#16a34a]">Request Deletion</span>
                 </div>
                 <div className="flex items-center gap-2 text-sm text-gray-600">
                    To make a request, contact us at: <a href="mailto:support@keyhox.com" className="font-bold text-[#16a34a] hover:underline">support@keyhox.com</a>
                 </div>
            </section>

             {/* Footer Info */}
             <div className="border-t border-gray-100 pt-8">
                <h2 className="text-lg font-bold text-gray-900 mb-2">9. Changes to Privacy Policy</h2>
                <p className="text-sm text-gray-600 mb-8">Keyhox may update this Privacy Policy at any time. Changes will be posted on this page.</p>
                
                <div className="bg-[#1e2025] text-white p-6 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4">
                    <div>
                        <h3 className="font-bold text-lg mb-1">10. Contact Information</h3>
                        <p className="text-gray-400 text-sm">If you have any questions about this Privacy Policy.</p>
                    </div>
                     <a href="mailto:support@keyhox.com" className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors px-6 py-3 rounded-lg font-medium">
                        <Mail size={18} /> support@keyhox.com
                    </a>
                </div>
             </div>

         </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;