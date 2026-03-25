import React from 'react';
import { ShieldAlert, CheckCircle, XCircle, Clock, RefreshCcw, HelpCircle, FileText } from 'lucide-react';

const RefundPolicy: React.FC = () => {
  return (
    <div className="bg-white animate-in fade-in duration-500">
      {/* Header */}
      <div className="bg-[#1e2025] text-white py-16 md:py-24 relative overflow-hidden">
         {/* Background pattern similar to AboutUs */}
         <div className="absolute inset-0 opacity-5">
            <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0 100 C 20 0 50 0 100 100 Z" fill="#16a34a" />
            </svg>
        </div>
        <div className="max-w-[1440px] mx-auto px-4 md:px-10 relative z-10 text-center">
             <div className="inline-flex items-center gap-2 bg-[#16a34a]/10 border border-[#16a34a]/20 px-4 py-1.5 rounded-full text-[#16a34a] font-bold text-sm mb-6">
                <ShieldAlert size={16} /> Keyhox Policies
             </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4">Refund Policy</h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Transparency and trust are at the core of our business. Please read our refund guidelines for digital products below.
            </p>
            <p className="text-gray-500 text-sm mt-4 font-mono">Last Updated: January 2026</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-10 py-16 md:py-24">
         
         {/* Intro */}
         <div className="prose prose-lg max-w-none text-gray-600 mb-12">
            <p className="leading-relaxed">
                At <span className="font-bold text-gray-900">Keyhox</span>, we strive to provide a reliable and satisfactory experience for all our customers. As we offer digital products, please read our refund policy carefully before making a purchase.
            </p>
         </div>

         <div className="grid gap-12">
            {/* Nature of Digital Products */}
            <section className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 shrink-0">
                        <FileText size={24} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">Nature of Digital Products</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            All products sold on Keyhox are delivered digitally. Once a digital product has been delivered to the customer, it is considered used and cannot be physically returned.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                             Due to the nature of digital goods, refunds are limited to specific situations as described below.
                        </p>
                    </div>
                </div>
            </section>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Eligible Cases */}
                <section className="border border-green-100 bg-green-50/30 rounded-2xl p-8">
                     <div className="flex items-center gap-3 mb-6">
                        <CheckCircle className="text-green-600" size={28} />
                        <h2 className="text-xl font-bold text-gray-900">Eligible Refund Cases</h2>
                     </div>
                     <p className="text-sm text-gray-500 mb-4">A refund may be considered under the following conditions:</p>
                     <ul className="space-y-3">
                        {[
                            "The product was not delivered due to a verified technical issue on our side",
                            "The product delivered is significantly different from the product description",
                            "The product is proven to be defective or unusable, and our support team is unable to resolve the issue"
                        ].map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-gray-700 text-sm">
                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-500 shrink-0"></div>
                                {item}
                            </li>
                        ))}
                     </ul>
                     <p className="text-xs text-gray-500 mt-6 pt-4 border-t border-green-100">
                        * In such cases, customers must contact our support team with proper details and evidence.
                     </p>
                </section>

                {/* Non-Refundable */}
                <section className="border border-red-100 bg-red-50/30 rounded-2xl p-8">
                     <div className="flex items-center gap-3 mb-6">
                        <XCircle className="text-red-600" size={28} />
                        <h2 className="text-xl font-bold text-gray-900">Non-Refundable Situations</h2>
                     </div>
                     <p className="text-sm text-gray-500 mb-4">Refunds will <span className="font-bold text-red-600">not</span> be issued in the following situations:</p>
                     <ul className="space-y-3">
                        {[
                            "Change of mind after purchase",
                            "Incorrect purchase made by the customer",
                            "Incompatibility with the customer’s device or system",
                            "Failure to read product description before purchase",
                            "Issues caused by customer misuse, system configuration, or third-party interference"
                        ].map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-gray-700 text-sm">
                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 shrink-0"></div>
                                {item}
                            </li>
                        ))}
                     </ul>
                </section>
            </div>

            {/* Timeframe & Processing */}
            <div className="grid md:grid-cols-2 gap-8">
                <section className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                        <Clock className="text-[#16a34a]" size={24} />
                        <h2 className="text-lg font-bold text-gray-900">Refund Request Timeframe</h2>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                        Customers must submit refund requests within <span className="font-bold text-gray-900">7 days</span> of purchase.
                    </p>
                    <p className="text-gray-500 text-xs">
                        Requests submitted after this period may not be eligible for review.
                    </p>
                </section>

                <section className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                        <RefreshCcw className="text-[#16a34a]" size={24} />
                        <h2 className="text-lg font-bold text-gray-900">Refund Processing</h2>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex gap-2">
                             <span className="font-bold text-gray-400">•</span>
                             Refunds will be processed using the original payment method.
                        </li>
                        <li className="flex gap-2">
                             <span className="font-bold text-gray-400">•</span>
                             Processing time may take 5 to 10 business days, depending on the payment provider.
                        </li>
                    </ul>
                </section>
            </div>

            {/* Support Contact */}
            <section className="bg-[#1e2025] rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
                <div className="relative z-10">
                    <div className="w-16 h-16 bg-[#16a34a] rounded-2xl flex items-center justify-center mx-auto mb-6 text-white shadow-lg shadow-[#16a34a]/30">
                        <HelpCircle size={32} />
                    </div>
                    <h2 className="text-2xl font-bold mb-4">Support and Assistance</h2>
                    <p className="text-gray-400 max-w-xl mx-auto mb-8">
                        Our team is committed to helping customers resolve any issues. Before requesting a refund, customers are encouraged to contact support for assistance.
                    </p>
                    <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 text-sm">
                        <div className="bg-white/10 px-6 py-3 rounded-full hover:bg-white/20 transition-colors">
                            <span className="text-gray-400 mr-2">Contact Email:</span>
                            <a href="mailto:support@keyhox.com" className="font-bold text-white hover:text-[#16a34a]">support@keyhox.com</a>
                        </div>
                        <div className="bg-white/10 px-6 py-3 rounded-full">
                            <span className="text-gray-400 mr-2">Service Coverage:</span>
                            <span className="font-bold text-white">Worldwide</span>
                        </div>
                    </div>
                </div>
            </section>
            
            <p className="text-center text-gray-400 text-sm mt-8">
                Keyhox reserves the right to modify this refund policy at any time. Changes will be updated on this page.
            </p>

         </div>
      </div>
    </div>
  );
};

export default RefundPolicy;