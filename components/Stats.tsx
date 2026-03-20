import React from 'react';
import { UserCheck, Star, CheckCircle, Lock, ShieldCheck, Zap, Phone, BadgePercent } from 'lucide-react';

const Stats: React.FC = () => {
  return (
    <section className="bg-gray-50 py-10">
      <div className="max-w-[1440px] mx-auto px-4 md:px-10">
        {/* Main Stats Banner - 2x2 Grid on Mobile, 1x4 Row on Desktop */}
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 mb-8 border border-gray-100">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4">
                
                {/* Item 1 */}
                <div className="flex items-center gap-3">
                    <UserCheck className="text-[#16a34a] shrink-0" size={28} />
                    <div className="min-w-0">
                        <h3 className="text-gray-900 text-lg md:text-xl font-bold truncate">70k+</h3>
                        <p className="text-gray-500 text-xs md:text-sm truncate">Happy Customers</p>
                    </div>
                </div>

                {/* Item 2 */}
                <div className="flex items-center gap-3">
                    <div className="flex items-center shrink-0">
                        <Star className="fill-[#16a34a] text-[#16a34a]" size={28} />
                    </div>
                    <div className="min-w-0">
                        <h3 className="text-gray-900 text-lg md:text-xl font-bold flex items-center gap-1">
                            4.8 <Star className="inline fill-[#16a34a] text-[#16a34a] -mt-0.5" size={14}/>
                        </h3>
                        <p className="text-gray-500 text-xs md:text-sm truncate">Customer Rating</p>
                    </div>
                </div>

                {/* Item 3 */}
                <div className="flex items-center gap-3">
                    <CheckCircle className="text-[#16a34a] shrink-0" size={28} />
                    <div className="min-w-0">
                        <h3 className="text-gray-900 text-lg md:text-xl font-bold truncate">100k+</h3>
                        <p className="text-gray-500 text-xs md:text-sm truncate">Licenses Delivered</p>
                    </div>
                </div>

                {/* Item 4 */}
                <div className="flex items-center gap-3">
                    <Lock className="text-[#16a34a] shrink-0" size={28} />
                    <div className="min-w-0">
                        <h3 className="text-gray-900 text-lg md:text-xl font-bold truncate">100%</h3>
                        <p className="text-gray-500 text-xs md:text-sm truncate">Secure Payment</p>
                    </div>
                </div>

            </div>
        </div>

        {/* Trust Features Strip - 2x2 on Mobile */}
        <div className="grid grid-cols-2 md:flex md:flex-wrap md:justify-center gap-4 md:gap-16 text-gray-600 text-sm font-medium">
            <div className="flex items-center justify-center md:justify-start gap-2">
                <ShieldCheck size={18} className="text-gray-800" />
                <span>100% Genuine</span>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-2">
                <Zap size={18} className="text-gray-800" />
                <span>Instant Delivery</span>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-2">
                <Phone size={18} className="text-gray-800" />
                <span>24/7 Support</span>
            </div>
             <div className="flex items-center justify-center md:justify-start gap-2">
                <BadgePercent size={18} className="text-gray-800" />
                <span>Best Prices</span>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;