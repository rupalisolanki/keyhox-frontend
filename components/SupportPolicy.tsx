import React from 'react';
import { Headset, Clock, Mail, CheckCircle, XCircle, MessageCircle } from 'lucide-react';

const SupportPolicy: React.FC = () => {
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
                <Headset size={16} /> Customer Care
             </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4">Support Policy</h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Keyhox provides customer support to assist with product access and general inquiries.
            </p>
            <p className="text-gray-500 text-sm mt-4 font-mono">Last Updated: January 2026</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-10 py-16 md:py-24">
         
         <div className="prose prose-lg max-w-none text-gray-600 mb-12">
            <p className="leading-relaxed">
                We are committed to providing professional and timely assistance to ensure your experience with Keyhox is seamless.
            </p>
         </div>

         <div className="grid gap-8">
            
            {/* Contact & Hours */}
            <div className="grid md:grid-cols-2 gap-8">
                <section className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                             <Mail size={20} />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">Contact Channel</h2>
                    </div>
                    <p className="text-gray-600 mb-4">Support is provided through email.</p>
                    <a href="mailto:support@keyhox.com" className="flex items-center gap-2 text-[#16a34a] font-bold text-lg hover:underline">
                        support@keyhox.com
                    </a>
                </section>

                <section className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center text-orange-600">
                             <Clock size={20} />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">Support Hours</h2>
                    </div>
                    <div className="space-y-2">
                        <p className="font-medium text-gray-900">Monday to Saturday</p>
                        <p className="text-gray-600">9:00 AM – 6:00 PM (IST)</p>
                    </div>
                </section>
            </div>

            {/* Response Time */}
            <section className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                    <MessageCircle className="text-[#16a34a]" size={24} />
                    <h2 className="text-xl font-bold text-gray-900">Response Time</h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                     <div className="flex items-center gap-3 bg-white p-4 rounded-xl border border-gray-100">
                        <div className="w-2 h-2 rounded-full bg-[#16a34a]"></div>
                        <span className="text-gray-700">Most inquiries answered within 24 hours</span>
                     </div>
                     <div className="flex items-center gap-3 bg-white p-4 rounded-xl border border-gray-100">
                        <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                        <span className="text-gray-700">Complex issues may require additional time</span>
                     </div>
                </div>
            </section>

            {/* Scope of Support */}
            <div className="grid md:grid-cols-2 gap-8 mt-4">
                {/* Covered */}
                <section className="border border-green-100 bg-green-50/30 rounded-2xl p-8">
                     <div className="flex items-center gap-3 mb-6">
                        <CheckCircle className="text-green-600" size={24} />
                        <h2 className="text-lg font-bold text-gray-900">Support Covers</h2>
                     </div>
                     <ul className="space-y-3">
                        {['Order assistance', 'Product access guidance', 'General technical support'].map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-gray-700 text-sm">
                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-500 shrink-0"></div>
                                {item}
                            </li>
                        ))}
                     </ul>
                </section>

                {/* Not Covered */}
                <section className="border border-red-100 bg-red-50/30 rounded-2xl p-8">
                     <div className="flex items-center gap-3 mb-6">
                        <XCircle className="text-red-600" size={24} />
                        <h2 className="text-lg font-bold text-gray-900">Does Not Cover</h2>
                     </div>
                     <ul className="space-y-3">
                        {['Customer device configuration', 'Third-party software issues', 'Issues unrelated to our products'].map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-gray-700 text-sm">
                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 shrink-0"></div>
                                {item}
                            </li>
                        ))}
                     </ul>
                </section>
            </div>

         </div>
      </div>
    </div>
  );
};

export default SupportPolicy;