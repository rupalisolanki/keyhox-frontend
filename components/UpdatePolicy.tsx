import React from 'react';
import { RefreshCw, AlertCircle, Server, Mail, Ban, Laptop } from 'lucide-react';

const UpdatePolicy: React.FC = () => {
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
                <RefreshCw size={16} /> Product Updates
             </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4">Update Policy</h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Information regarding software updates, upgrades, and product availability.
            </p>
            <p className="text-gray-500 text-sm mt-4 font-mono">Last Updated: January 2026</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-10 py-16 md:py-24">
         
         <div className="prose prose-lg max-w-none text-gray-600 mb-12">
            <p className="leading-relaxed">
                Keyhox provides digital products and services based on availability at the time of purchase. Updates and upgrades depend on the specific product and service type acquired.
            </p>
         </div>

         <div className="grid gap-8">
            
            {/* Guarantee Limitations */}
            <section className="bg-gray-50 border border-gray-100 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                         <Ban size={20} />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Limitation of Guarantee</h2>
                </div>
                
                <p className="text-gray-600 mb-4 font-medium">Keyhox does not guarantee:</p>

                <ul className="space-y-3">
                    {['Lifetime updates', 'Future upgrades', 'Continuous support beyond the original service scope'].map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-700 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                             <div className="mt-2 w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0"></div>
                             <span className="text-sm font-medium">{item}</span>
                        </li>
                    ))}
                </ul>
                <p className="text-xs text-gray-500 mt-6 pt-4 border-t border-gray-200">
                    Any updates provided will depend on product availability and service conditions.
                </p>
            </section>

             {/* Customer Responsibility & Rights */}
            <div className="grid md:grid-cols-2 gap-8">
                 <section className="border border-gray-200 p-8 rounded-2xl">
                    <div className="flex items-center gap-2 mb-3 text-gray-900">
                        <Laptop className="text-[#16a34a]" size={20} />
                        <h3 className="font-bold text-lg">System Compatibility</h3>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        Customers are responsible for maintaining their own systems and ensuring compatibility with any updates that may be released by software manufacturers.
                    </p>
                 </section>

                 <section className="border border-gray-200 p-8 rounded-2xl">
                    <div className="flex items-center gap-2 mb-3 text-gray-900">
                        <Server className="text-[#16a34a]" size={20} />
                        <h3 className="font-bold text-lg">Modifications</h3>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        Keyhox reserves the right to modify or discontinue products or services at any time without prior notice.
                    </p>
                 </section>
            </div>

            {/* Contact */}
            <div className="bg-[#1e2025] text-white p-8 rounded-2xl mt-4 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <h3 className="font-bold text-lg mb-1 flex items-center gap-2">
                        <AlertCircle size={20} className="text-[#16a34a]" /> 
                        Update Questions?
                    </h3>
                    <p className="text-gray-400 text-sm">Contact us regarding updates or version queries.</p>
                </div>
                <a href="mailto:support@keyhox.com" className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors px-6 py-3 rounded-lg font-medium">
                    <Mail size={18} /> support@keyhox.com
                </a>
            </div>

         </div>
      </div>
    </div>
  );
};

export default UpdatePolicy;