import React from 'react';
import { FileKey, ShieldCheck, Mail, AlertOctagon, CheckCircle, Send, Key } from 'lucide-react';

const LicensePolicy: React.FC = () => {
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
                <FileKey size={16} /> Software Licensing
             </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4">License Policy</h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                This License Policy explains the terms under which digital products and software licenses are provided by Keyhox.
            </p>
            <p className="text-gray-500 text-sm mt-4 font-mono">Last Updated: January 2026</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-10 py-16 md:py-24">
         
         <div className="prose prose-lg max-w-none text-gray-600 mb-12">
            <p className="leading-relaxed">
                By purchasing from <span className="font-bold text-gray-900">Keyhox</span>, you agree to this License Policy. Please read the following terms regarding the usage, validity, and restrictions of our digital products.
            </p>
         </div>

         <div className="space-y-12">
            
            {/* 1. Nature of Software Licenses */}
            <section className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                        <Key size={20} />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Nature of Software Licenses</h2>
                </div>
                
                <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-gray-700">
                         <div className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></div>
                         <span className="text-sm">All products sold by Keyhox are digital software licenses or digital access-based services.</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-700">
                         <div className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></div>
                         <span className="text-sm">Customers are purchasing the right to use the product in accordance with the applicable license terms.</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-700">
                         <div className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></div>
                         <span className="text-sm">Ownership of the software itself remains with the original developer or publisher.</span>
                    </li>
                </ul>
            </section>

            {/* 2. License Usage */}
            <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <ShieldCheck className="text-[#16a34a]" size={24} /> License Usage
                </h2>
                <p className="text-gray-600 mb-4">Each license is intended for use according to its specific type and scope. Customers are responsible for:</p>
                
                <div className="grid sm:grid-cols-3 gap-4">
                    <div className="bg-white border border-gray-200 p-4 rounded-xl text-center">
                        <CheckCircle className="mx-auto text-[#16a34a] mb-2" size={24} />
                        <p className="text-sm font-bold text-gray-800">Compliance</p>
                        <p className="text-xs text-gray-500 mt-1">Using product per applicable terms</p>
                    </div>
                    <div className="bg-white border border-gray-200 p-4 rounded-xl text-center">
                        <CheckCircle className="mx-auto text-[#16a34a] mb-2" size={24} />
                        <p className="text-sm font-bold text-gray-800">Compatibility</p>
                        <p className="text-xs text-gray-500 mt-1">Ensuring system compatibility</p>
                    </div>
                    <div className="bg-white border border-gray-200 p-4 rounded-xl text-center">
                        <CheckCircle className="mx-auto text-[#16a34a] mb-2" size={24} />
                        <p className="text-sm font-bold text-gray-800">Limitations</p>
                        <p className="text-xs text-gray-500 mt-1">Following usage limitations</p>
                    </div>
                </div>
                <p className="text-sm text-gray-500 mt-4 italic">Keyhox is not responsible for misuse of software licenses.</p>
            </section>

             {/* 3 & 4 Grid */}
            <div className="grid md:grid-cols-2 gap-8">
                 <section className="border border-gray-200 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4 text-gray-900">
                        <Send className="text-purple-600" />
                        <h2 className="text-lg font-bold">Delivery of License</h2>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">Software licenses are delivered digitally via:</p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600 mb-4">
                        <li>Email</li>
                        <li>Customer account access</li>
                    </ul>
                    <p className="text-xs text-gray-500">Customers are responsible for providing accurate contact information.</p>
                 </section>

                 <section className="border border-gray-200 rounded-2xl p-6 bg-gray-50">
                    <div className="flex items-center gap-3 mb-4 text-gray-900">
                        <AlertOctagon className="text-orange-600" />
                        <h2 className="text-lg font-bold">License Validity</h2>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">License validity depends on the specific product and usage conditions.</p>
                    <p className="text-sm font-bold text-gray-800 mt-2">Keyhox does not guarantee:</p>
                    <ul className="list-disc pl-5 space-y-1 text-xs text-gray-600 mt-1">
                        <li>Lifetime validity unless explicitly stated</li>
                        <li>Updates beyond the original license scope</li>
                        <li>Continued service if discontinued by publisher</li>
                    </ul>
                 </section>
            </div>

            {/* 5. Restrictions */}
            <section className="bg-red-50 border border-red-100 rounded-2xl p-8">
                 <h2 className="text-xl font-bold text-red-900 mb-4">Restrictions</h2>
                 <p className="text-sm text-red-800 mb-4">Customers agree NOT to:</p>
                 <div className="space-y-3">
                    <div className="flex items-center gap-3 bg-white/60 p-3 rounded-lg">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                        <span className="text-sm text-red-900">Resell licenses without authorization</span>
                    </div>
                    <div className="flex items-center gap-3 bg-white/60 p-3 rounded-lg">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                        <span className="text-sm text-red-900">Distribute or share licenses improperly</span>
                    </div>
                    <div className="flex items-center gap-3 bg-white/60 p-3 rounded-lg">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                        <span className="text-sm text-red-900">Use licenses for unlawful purposes</span>
                    </div>
                 </div>
                 <p className="text-xs text-red-700 mt-4 font-bold">Violation of these terms may result in service suspension.</p>
            </section>

            {/* 6. Support */}
             <div className="border-t border-gray-100 pt-8">
                <h2 className="text-lg font-bold text-gray-900 mb-2">Support</h2>
                <p className="text-sm text-gray-600 mb-2">
                    Keyhox provides assistance with access and delivery issues. However, Keyhox does not control software publisher policies.
                </p>
             </div>

             {/* Footer Info */}
             <div className="bg-[#1e2025] text-white p-6 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                    <h3 className="font-bold text-lg mb-1">Contact for Licenses</h3>
                    <p className="text-gray-400 text-sm">For license-related questions.</p>
                </div>
                 <div className="text-right flex flex-col items-end">
                    <a href="mailto:support@keyhox.com" className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors px-6 py-2 rounded-lg font-medium mb-1">
                        <Mail size={18} /> support@keyhox.com
                    </a>
                    <span className="text-xs text-gray-500">Keyhox • Worldwide Coverage</span>
                 </div>
            </div>

         </div>
      </div>
    </div>
  );
};

export default LicensePolicy;