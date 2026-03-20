import React from 'react';
import { Copyright, FileWarning, Mail, ShieldAlert, CheckCircle } from 'lucide-react';

const DmcaPolicy: React.FC = () => {
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
                <Copyright size={16} /> Intellectual Property
             </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4">DMCA Policy</h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Keyhox respects intellectual property rights and complies with applicable copyright laws.
            </p>
            <p className="text-gray-500 text-sm mt-4 font-mono">Last Updated: January 2026</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-10 py-16 md:py-24">
         
         <div className="prose prose-lg max-w-none text-gray-600 mb-12">
            <p className="leading-relaxed">
                If you believe that any content on our website infringes your copyright, you may submit a DMCA notice.
            </p>
         </div>

         <div className="grid gap-12">
            
            {/* Requirements Section */}
            <section className="bg-gray-50 border border-gray-100 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                         <FileWarning size={20} />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Submitting a DMCA Notice</h2>
                </div>
                
                <p className="text-gray-600 mb-4">Your DMCA notice must include the following information:</p>

                <ul className="space-y-4">
                    {[
                        "Your full name and contact information",
                        "Description of the copyrighted work",
                        "Exact URL of the infringing content",
                        "Statement that you have a good faith belief that the use is unauthorized",
                        "Statement that your notice is accurate"
                    ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-700 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                             <CheckCircle className="text-[#16a34a] shrink-0 mt-0.5" size={18} />
                             <span className="text-sm font-medium">{item}</span>
                        </li>
                    ))}
                </ul>
            </section>

             {/* Actions & Consequences */}
            <div className="grid md:grid-cols-2 gap-8">
                 <section className="border border-gray-200 p-8 rounded-2xl">
                    <h3 className="font-bold text-gray-900 mb-3 text-lg">Our Response</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        Upon receiving a valid notice, we will review and take appropriate action, including removal of content if necessary.
                    </p>
                 </section>

                 <section className="border border-red-100 bg-red-50/30 p-8 rounded-2xl">
                    <div className="flex items-center gap-2 mb-3">
                        <ShieldAlert className="text-red-500" size={20} />
                        <h3 className="font-bold text-gray-900 text-lg">Account Termination</h3>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        Keyhox reserves the right to terminate accounts involved in copyright violations.
                    </p>
                 </section>
            </div>

            {/* Contact */}
            <div className="bg-[#1e2025] text-white p-8 md:p-12 rounded-3xl text-center">
                <h3 className="font-bold text-2xl mb-4">Submit a Notice</h3>
                <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                    Please send your DMCA notice to our designated email address.
                </p>
                <a href="mailto:support@keyhox.com" className="inline-flex items-center gap-3 bg-[#16a34a] hover:bg-[#15803d] text-white px-8 py-4 rounded-full font-bold transition-all shadow-lg hover:shadow-[#16a34a]/20">
                    <Mail size={20} /> support@keyhox.com
                </a>
            </div>

         </div>
      </div>
    </div>
  );
};

export default DmcaPolicy;