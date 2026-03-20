import React from 'react';
import { Shield, AlertCircle, Lock, Scale, Mail } from 'lucide-react';

const TermsAndConditions: React.FC = () => {
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
                <Scale size={16} /> Legal
             </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4">Terms & Conditions</h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Please read these terms carefully before using our platform.
            </p>
            <p className="text-gray-500 text-sm mt-4 font-mono">Last Updated: January 2026</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-10 py-16 md:py-24">
         
         <div className="prose prose-lg max-w-none text-gray-600 mb-12">
            <p className="leading-relaxed">
                Welcome to <span className="font-bold text-gray-900">Keyhox</span>. By accessing or using our website and services, you agree to comply with and be bound by the following Terms & Conditions.
                If you do not agree with any part of these terms, you should not use our services.
            </p>
         </div>

         <div className="space-y-12">
            
            {/* Section 1 & 2 */}
            <div className="grid md:grid-cols-2 gap-8">
                <section className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">1</div>
                        <h3 className="font-bold text-gray-900 text-lg">About Keyhox</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                        Keyhox is a digital distribution platform based in India, providing software products and digital services to customers worldwide through online delivery.
                    </p>
                    <p className="text-sm text-gray-600">
                        All products available on Keyhox are delivered electronically.
                    </p>
                </section>

                <section className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">2</div>
                        <h3 className="font-bold text-gray-900 text-lg">Use of Website</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">By using this website, you confirm that:</p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                        <li>You are at least 18 years of age, or using the website under supervision of a legal guardian</li>
                        <li>You will use the website only for lawful purposes</li>
                        <li>You will not use the website in any way that may damage, disrupt, or interfere with our services</li>
                    </ul>
                </section>
            </div>

            {/* Sections 3-5 */}
            <section className="border-l-4 border-[#16a34a] pl-6 py-2">
                <h3 className="font-bold text-gray-900 text-xl mb-4">3. Product Information</h3>
                <p className="text-gray-600 mb-4">
                    Keyhox makes every effort to ensure product descriptions and information are accurate. However, we do not guarantee that all descriptions, images, or specifications are completely error-free. Customers are responsible for reviewing product details before making a purchase.
                </p>
            </section>

             <section className="border-l-4 border-[#16a34a] pl-6 py-2">
                <h3 className="font-bold text-gray-900 text-xl mb-4">4. Digital Delivery</h3>
                <p className="text-gray-600 mb-4">
                    All products are delivered digitally via email or customer account access. Delivery time may vary depending on processing and verification requirements. Keyhox is not responsible for delays caused by incorrect customer information.
                </p>
            </section>

             <section className="border-l-4 border-[#16a34a] pl-6 py-2">
                <h3 className="font-bold text-gray-900 text-xl mb-4">5. Payments</h3>
                <p className="text-gray-600 mb-2">
                    Keyhox accepts secure online payments through approved payment providers. By making a purchase, you confirm that:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-gray-600 mb-2">
                    <li>You are authorized to use the selected payment method</li>
                    <li>The information provided is accurate</li>
                </ul>
                <p className="text-gray-600">
                    Keyhox reserves the right to cancel any order suspected of fraud or unauthorized activity.
                </p>
            </section>

            {/* Section 6-8: Grid */}
            <div className="grid md:grid-cols-3 gap-6">
                 <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <AlertCircle className="text-orange-500 mb-3" />
                    <h4 className="font-bold text-gray-900 mb-2">6. Refunds & Returns</h4>
                    <p className="text-xs text-gray-500">Refunds are subject to our Refund Policy. Customers are advised to review the Refund Policy before making any purchase.</p>
                 </div>
                 <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <Lock className="text-orange-500 mb-3" />
                    <h4 className="font-bold text-gray-900 mb-2">7. Account Responsibility</h4>
                    <p className="text-xs text-gray-500">You are responsible for maintaining the confidentiality of your account. Keyhox is not responsible for unauthorized access resulting from negligence.</p>
                 </div>
                 <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <Shield className="text-orange-500 mb-3" />
                    <h4 className="font-bold text-gray-900 mb-2">8. Limitation of Liability</h4>
                    <p className="text-xs text-gray-500">Keyhox shall not be liable for indirect losses, data loss, or issues arising from misuse. Products are provided "as-is".</p>
                 </div>
            </div>

             {/* Remaining Sections */}
            <div className="space-y-8">
                <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2">9. Intellectual Property</h3>
                    <p className="text-gray-600">All content on this website, including text, graphics, logos, and design, is the property of Keyhox and may not be copied or used without permission.</p>
                </div>
                <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2">10. Changes to Terms</h3>
                    <p className="text-gray-600">Keyhox reserves the right to update these Terms & Conditions at any time. Changes will be effective immediately upon posting on this page.</p>
                </div>
                 <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2">11. Governing Law</h3>
                    <p className="text-gray-600">These Terms & Conditions are governed by the laws of India.</p>
                </div>
            </div>

            {/* Contact Footer */}
             <div className="bg-[#f8fafc] p-8 rounded-2xl border border-gray-200 mt-12 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-1">12. Contact Information</h3>
                    <p className="text-gray-500 text-sm">For any questions regarding these Terms & Conditions.</p>
                </div>
                <div className="flex flex-col gap-2 text-right">
                    <a href="mailto:support@keyhox.com" className="flex items-center gap-2 text-[#16a34a] font-bold hover:underline justify-end">
                        <Mail size={16} /> support@keyhox.com
                    </a>
                    <div className="text-xs text-gray-400">
                        Location: India • Service Coverage: Worldwide
                    </div>
                </div>
            </div>

         </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;