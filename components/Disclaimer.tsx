import React from 'react';
import { AlertTriangle, ShieldAlert, FileWarning, Info, Mail } from 'lucide-react';

const Disclaimer: React.FC = () => {
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
                <AlertTriangle size={16} /> Legal Notice
             </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4">Disclaimer</h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Important information regarding the use of our website and services.
            </p>
            <p className="text-gray-500 text-sm mt-4 font-mono">Last Updated: January 2026</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-10 py-16 md:py-24">
         
         <div className="prose prose-lg max-w-none text-gray-600 mb-12">
            <p className="leading-relaxed">
                The information provided by <span className="font-bold text-gray-900">Keyhox</span> ("we," "our," or "us") on our website is for general informational and business purposes only.
            </p>
         </div>

         <div className="grid gap-8">
            
            {/* As-Is Basis */}
            <section className="bg-gray-50 border border-gray-100 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-4 text-gray-900">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                         <FileWarning size={20} />
                    </div>
                    <h2 className="text-xl font-bold">No Warranties</h2>
                </div>
                <p className="text-gray-600 leading-relaxed">
                    All products and services are provided on an <span className="font-bold">"as-is"</span> and <span className="font-bold">"as-available"</span> basis without any warranties of any kind, either express or implied.
                </p>
            </section>

             {/* Accuracy */}
            <section className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-4 text-gray-900">
                    <Info className="text-[#16a34a]" size={24} />
                    <h2 className="text-xl font-bold">Accuracy of Information</h2>
                </div>
                <p className="text-gray-600 leading-relaxed">
                    Keyhox makes reasonable efforts to ensure that all information on the website is accurate. However, we do not guarantee the completeness, reliability, or accuracy of any information.
                </p>
            </section>

             {/* Liability */}
            <section className="bg-red-50/50 border border-red-100 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6 text-gray-900">
                    <ShieldAlert className="text-red-500" size={24} />
                    <h2 className="text-xl font-bold">Limitation of Liability</h2>
                </div>
                <p className="text-sm text-gray-500 mb-4">Keyhox shall not be held responsible for:</p>
                <ul className="space-y-3">
                    {['Any errors or omissions on the website', 'Any losses or damages resulting from the use of our website or services', 'Any issues arising from misuse of products'].map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-700">
                             <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 shrink-0"></div>
                             {item}
                        </li>
                    ))}
                </ul>
            </section>

             {/* Responsibilty & Mods */}
            <div className="grid md:grid-cols-2 gap-8">
                 <div className="border border-gray-200 p-6 rounded-xl">
                    <h3 className="font-bold text-gray-900 mb-2">Customer Responsibility</h3>
                    <p className="text-sm text-gray-600">All purchases and use of products are the sole responsibility of the customer.</p>
                 </div>
                 <div className="border border-gray-200 p-6 rounded-xl">
                    <h3 className="font-bold text-gray-900 mb-2">Modifications</h3>
                    <p className="text-sm text-gray-600">Keyhox reserves the right to modify website content at any time without prior notice.</p>
                 </div>
            </div>

            {/* Contact */}
            <div className="bg-[#1e2025] text-white p-8 rounded-2xl mt-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <h3 className="font-bold text-lg mb-1">Questions?</h3>
                    <p className="text-gray-400 text-sm">Contact us regarding this disclaimer.</p>
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

export default Disclaimer;