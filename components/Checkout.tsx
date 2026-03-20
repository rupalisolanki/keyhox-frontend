import React, { useState } from 'react';
import { ShieldCheck, CreditCard, Smartphone, Globe, Lock, CheckCircle, Tag } from 'lucide-react';
import { CartItem } from '../types';
import { useCurrency } from '../context/CurrencyContext';

interface CheckoutProps {
  items: CartItem[];
  cartTotal: number;
  onPlaceOrder: (details: any) => void;
}

const Checkout: React.FC<CheckoutProps> = ({ items, cartTotal, onPlaceOrder }) => {
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);
  const { formatPrice } = useCurrency();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    country: 'India',
    streetAddress: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    email: '',
    notes: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const finalTotal = cartTotal - discount;

  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate API call/processing time
    onPlaceOrder({ ...formData, paymentMethod, items, subtotal: cartTotal, discount, total: finalTotal });
  };

  const handleApplyCoupon = () => {
      if (!couponCode.trim()) {
          setDiscount(0);
          setCouponMessage(null);
          return;
      }

      if (couponCode.trim().toLowerCase() === 'keyhox') {
          const discountAmount = cartTotal * 0.025; // 2.5%
          setDiscount(discountAmount);
          setCouponMessage({ type: 'success', text: `Coupon applied! You saved ${formatPrice(discountAmount)} (2.5%)` });
      } else {
          setDiscount(0);
          setCouponMessage({ type: 'error', text: 'Invalid coupon code. Try "Keyhox"' });
      }
  };

  if (items.length === 0) {
      return (
          <div className="max-w-[1440px] mx-auto px-4 py-20 text-center">
              <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
              <p className="text-gray-500">Please add items to your cart before checking out.</p>
          </div>
      )
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-10 py-8 md:py-16 animate-in fade-in duration-500">
      <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-8 md:mb-12 flex items-center gap-3">
        Checkout <span className="text-gray-300 font-light">/</span> <span className="text-[#16a34a] text-xl md:text-2xl font-bold">Secure Payment</span>
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-8 lg:gap-16">
        
        {/* LEFT COLUMN - BILLING DETAILS */}
        <div className="flex-1">
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-[#16a34a]/10 text-[#16a34a] flex items-center justify-center text-sm">1</span>
                Billing Details
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">First Name <span className="text-red-500">*</span></label>
                    <input 
                        type="text" 
                        name="firstName" 
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:border-[#16a34a] focus:ring-4 focus:ring-[#16a34a]/10 outline-none transition-all"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Last Name <span className="text-red-500">*</span></label>
                    <input 
                        type="text" 
                        name="lastName" 
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:border-[#16a34a] focus:ring-4 focus:ring-[#16a34a]/10 outline-none transition-all"
                    />
                </div>
            </div>

            <div className="space-y-2 mb-6">
                <label className="text-sm font-bold text-gray-700">Country / Region <span className="text-red-500">*</span></label>
                <select 
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:border-[#16a34a] focus:ring-4 focus:ring-[#16a34a]/10 outline-none transition-all"
                >
                    <option value="India">India</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                </select>
            </div>

            <div className="space-y-2 mb-6">
                <label className="text-sm font-bold text-gray-700">Street Address <span className="text-red-500">*</span></label>
                <input 
                    type="text" 
                    name="streetAddress" 
                    placeholder="House number and street name"
                    required
                    value={formData.streetAddress}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:border-[#16a34a] focus:ring-4 focus:ring-[#16a34a]/10 outline-none transition-all"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Town / City <span className="text-red-500">*</span></label>
                    <input 
                        type="text" 
                        name="city" 
                        required
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:border-[#16a34a] focus:ring-4 focus:ring-[#16a34a]/10 outline-none transition-all"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">State <span className="text-red-500">*</span></label>
                    <input 
                        type="text" 
                        name="state" 
                        required
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:border-[#16a34a] focus:ring-4 focus:ring-[#16a34a]/10 outline-none transition-all"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">PIN / ZIP Code <span className="text-red-500">*</span></label>
                    <input 
                        type="text" 
                        name="zip" 
                        required
                        value={formData.zip}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:border-[#16a34a] focus:ring-4 focus:ring-[#16a34a]/10 outline-none transition-all"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Phone <span className="text-red-500">*</span></label>
                    <input 
                        type="tel" 
                        name="phone" 
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:border-[#16a34a] focus:ring-4 focus:ring-[#16a34a]/10 outline-none transition-all"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Email Address <span className="text-red-500">*</span></label>
                    <input 
                        type="email" 
                        name="email" 
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:border-[#16a34a] focus:ring-4 focus:ring-[#16a34a]/10 outline-none transition-all"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Order Notes (Optional)</label>
                <textarea 
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:border-[#16a34a] focus:ring-4 focus:ring-[#16a34a]/10 outline-none transition-all resize-none"
                    placeholder="Notes about your order, e.g. special notes for delivery."
                ></textarea>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN - ORDER SUMMARY & PAYMENT */}
        <div className="w-full lg:w-[450px] shrink-0">
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-xl sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-[#16a34a]/10 text-[#16a34a] flex items-center justify-center text-sm">2</span>
                    Your Order
                </h2>

                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                    <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 pb-2 border-b border-gray-200">
                        <span>Product</span>
                        <span>Subtotal</span>
                    </div>
                    <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                        {items.map((item) => (
                            <div key={item.id} className="flex justify-between items-start text-sm">
                                <div className="text-gray-600">
                                    <span className="text-gray-900 font-medium">{item.title}</span> 
                                    <span className="text-xs text-gray-500 ml-1">x {item.quantity}</span>
                                </div>
                                <div className="font-bold text-gray-900">{formatPrice(item.price * item.quantity)}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-3 mb-6 pb-6 border-b border-gray-100">
                    <div className="flex justify-between text-gray-600">
                        <span>Subtotal</span>
                        <span className="font-bold text-gray-900">{formatPrice(cartTotal)}</span>
                    </div>
                    {discount > 0 && (
                        <div className="flex justify-between text-green-600 bg-green-50 px-2 py-1 rounded-md animate-in fade-in">
                            <span className="flex items-center gap-1"><Tag size={12}/> Discount (2.5%)</span>
                            <span className="font-bold">- {formatPrice(discount)}</span>
                        </div>
                    )}
                    <div className="flex justify-between text-gray-600">
                        <span>Shipping</span>
                        <span className="text-[#16a34a] font-bold text-xs">Digital Delivery (Free)</span>
                    </div>
                    <div className="flex justify-between text-gray-900 font-bold text-lg pt-2">
                        <span>Total</span>
                        <span className="text-[#16a34a]">{formatPrice(finalTotal)}</span>
                    </div>
                </div>

                {/* Coupon */}
                <div className="mb-8">
                     <p className="text-sm font-bold text-gray-700 mb-2">Have a coupon?</p>
                     <div className="flex gap-2 mb-2">
                        <input 
                            type="text" 
                            placeholder="Coupon code" 
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            className="flex-1 px-3 py-2.5 bg-white border border-gray-200 rounded-lg focus:border-[#16a34a] outline-none text-sm text-gray-900"
                        />
                        <button 
                            type="button" 
                            onClick={handleApplyCoupon}
                            className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-lg text-sm transition-colors"
                        >
                            Apply
                        </button>
                     </div>
                     {couponMessage && (
                         <div className={`text-xs font-bold ${couponMessage.type === 'success' ? 'text-green-600' : 'text-red-500'} animate-in fade-in`}>
                             {couponMessage.text}
                         </div>
                     )}
                </div>

                {/* Payment Methods */}
                <h3 className="text-sm font-bold text-gray-700 mb-3">Select Payment Method</h3>
                <div className="space-y-3 mb-8">
                    {/* UPI */}
                    <label className={`flex items-start gap-3 p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'upi' ? 'border-[#16a34a] bg-[#16a34a]/5' : 'border-gray-200 hover:border-gray-300'}`}>
                        <input 
                            type="radio" 
                            name="payment" 
                            value="upi" 
                            checked={paymentMethod === 'upi'} 
                            onChange={() => setPaymentMethod('upi')}
                            className="mt-1 text-[#16a34a] focus:ring-[#16a34a]"
                        />
                        <div className="flex-1">
                            <div className="flex justify-between items-center mb-1">
                                <span className="font-bold text-gray-900">UPI / QR Code</span>
                                <Smartphone size={18} className="text-[#16a34a]" />
                            </div>
                            <p className="text-xs text-gray-500">Pay securely using Google Pay, PhonePe, Paytm or any UPI app.</p>
                        </div>
                    </label>

                    {/* Cards */}
                    <label className={`flex items-start gap-3 p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-[#16a34a] bg-[#16a34a]/5' : 'border-gray-200 hover:border-gray-300'}`}>
                        <input 
                            type="radio" 
                            name="payment" 
                            value="card" 
                            checked={paymentMethod === 'card'} 
                            onChange={() => setPaymentMethod('card')}
                            className="mt-1 text-[#16a34a] focus:ring-[#16a34a]"
                        />
                        <div className="flex-1">
                            <div className="flex justify-between items-center mb-1">
                                <span className="font-bold text-gray-900">Credit / Debit Card</span>
                                <CreditCard size={18} className="text-gray-500" />
                            </div>
                            <p className="text-xs text-gray-500">Visa, Mastercard, RuPay, and Maestro accepted.</p>
                        </div>
                    </label>

                    {/* Net Banking */}
                    <label className={`flex items-start gap-3 p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'netbanking' ? 'border-[#16a34a] bg-[#16a34a]/5' : 'border-gray-200 hover:border-gray-300'}`}>
                        <input 
                            type="radio" 
                            name="payment" 
                            value="netbanking" 
                            checked={paymentMethod === 'netbanking'} 
                            onChange={() => setPaymentMethod('netbanking')}
                            className="mt-1 text-[#16a34a] focus:ring-[#16a34a]"
                        />
                        <div className="flex-1">
                            <div className="flex justify-between items-center mb-1">
                                <span className="font-bold text-gray-900">Net Banking</span>
                                <Globe size={18} className="text-gray-500" />
                            </div>
                            <p className="text-xs text-gray-500">Pay via your preferred bank's internet banking portal.</p>
                        </div>
                    </label>
                </div>

                <div className="text-xs text-gray-500 mb-6 flex gap-2">
                    <CheckCircle size={14} className="text-[#16a34a] shrink-0" />
                    <p>Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our <a href="#" className="text-[#16a34a] underline">privacy policy</a>.</p>
                </div>

                <button 
                    type="submit"
                    disabled={isProcessing}
                    className={`w-full bg-[#1e2025] hover:bg-black text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 ${isProcessing ? 'opacity-75 cursor-not-allowed' : ''}`}
                >
                    {isProcessing ? (
                        <>Processing Payment...</>
                    ) : (
                        <><Lock size={18} /> Place Order {formatPrice(finalTotal)}</>
                    )}
                </button>
                
                <div className="mt-4 flex justify-center items-center gap-2 text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                    <ShieldCheck size={12} /> Secure SSL Encrypted Payment
                </div>

            </div>
        </div>

      </form>
    </div>
  );
};

export default Checkout;