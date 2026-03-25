import React, { useEffect, useState } from 'react';
import { CheckCircle, Download, Copy, ExternalLink, ShieldCheck, Mail, ArrowRight, Home, Lock } from 'lucide-react';
import { CartItem, Product } from '../types';
import { useCurrency } from '../context/CurrencyContext';

interface OrderSuccessProps {
  order: any;
  products: Product[];
  onNavigateHome: () => void;
}

const OrderSuccess: React.FC<OrderSuccessProps> = ({ order, products, onNavigateHome }) => {
  const { formatPrice } = useCurrency();
  const [revealedKeys, setRevealedKeys] = useState<Record<string, boolean>>({});

  // Mock function to get a key for a product
  const getProductKey = (productId: string, index: number) => {
    const product = products.find(p => p.id === productId);
    if (product && product.keys && product.keys.length > index) {
      return product.keys[index];
    }
    // Fallback mock key if none exist in DB or we run out of pre-defined keys
    return `XXXX-XXXX-XXXX-XXXX-${index + 1}`;
  };

  const getActivationGuide = (productId: string) => {
      const product = products.find(p => p.id === productId);
      return product?.activationGuide;
  }

  const toggleKeyReveal = (uniqueKeyId: string) => {
    setRevealedKeys(prev => ({
      ...prev,
      [uniqueKeyId]: !prev[uniqueKeyId]
    }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  if (!order) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Success Header */}
      <div className="text-center mb-12">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} className="text-[#16a34a]" />
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Order Successful!</h1>
        <p className="text-gray-500 text-lg">Thank you for your purchase. Your order has been confirmed.</p>
        <p className="text-sm text-gray-400 mt-2">Order ID: #{Math.floor(Math.random() * 1000000)} • {new Date().toLocaleDateString()}</p>
      </div>

      {/* Digital Delivery Section */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden mb-10">
        <div className="bg-[#1e2025] text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Download className="text-[#16a34a]" />
            <h2 className="font-bold text-lg">Your Digital Licenses</h2>
          </div>
          <span className="text-xs bg-[#16a34a] px-3 py-1 rounded-full font-bold">Instant Delivery</span>
        </div>

        <div className="divide-y divide-gray-100">
          {order.items.map((item: CartItem, itemIndex: number) => {
            const guide = getActivationGuide(item.id);

            return (
              <div key={itemIndex} className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
                  <div className="flex items-start gap-4">
                    <div className={`w-16 h-16 rounded-xl ${item.imageColor} flex items-center justify-center text-white font-bold text-xl shrink-0`}>
                      {item.logo ? (item.logo.includes('http') ? <img src={item.logo} className="w-8 h-8 object-contain"/> : item.logo.substring(0, 2)) : 'DL'}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">{item.title}</h3>
                      <p className="text-sm text-gray-500">{item.subtitle}</p>
                      <div className="mt-2 inline-flex items-center gap-2 text-xs font-medium bg-blue-50 text-blue-700 px-2 py-1 rounded">
                        <ShieldCheck size={12} /> Official License
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900 text-lg">{formatPrice(item.price)}</p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                </div>

                {/* License Key Boxes - Render one for each quantity */}
                <div className="space-y-4 mb-6">
                    {Array.from({ length: item.quantity }).map((_, qtyIndex) => {
                        const uniqueKeyId = `${item.id}-${qtyIndex}`;
                        const productKey = getProductKey(item.id, qtyIndex);
                        const isRevealed = revealedKeys[uniqueKeyId];

                        return (
                            <div key={uniqueKeyId} className="bg-gray-50 border border-gray-200 rounded-xl p-5 relative group">
                                <div className="flex justify-between items-center mb-2">
                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                                        License Key #{qtyIndex + 1}
                                    </p>
                                </div>
                                <div className="flex items-center justify-between gap-4 bg-white border border-gray-200 rounded-lg p-3">
                                    <code className="font-mono text-lg font-bold text-gray-800 tracking-wide break-all">
                                    {isRevealed ? productKey : "••••-••••-••••-••••"}
                                    </code>
                                    <div className="flex items-center gap-2 shrink-0">
                                    <button 
                                        onClick={() => toggleKeyReveal(uniqueKeyId)}
                                        className="text-sm font-bold text-[#16a34a] hover:underline"
                                    >
                                        {isRevealed ? "Hide" : "Reveal"}
                                    </button>
                                    {isRevealed && (
                                        <button 
                                        onClick={() => copyToClipboard(productKey)}
                                        className="p-2 hover:bg-gray-100 rounded-md text-gray-500 transition-colors"
                                        title="Copy"
                                        >
                                        <Copy size={16} />
                                        </button>
                                    )}
                                    </div>
                                </div>
                                {!isRevealed && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-gray-50/50 backdrop-blur-[2px] rounded-xl cursor-pointer" onClick={() => toggleKeyReveal(uniqueKeyId)}>
                                        <span className="bg-white shadow-md border border-gray-200 px-4 py-2 rounded-full text-sm font-bold text-gray-700 flex items-center gap-2">
                                            <Lock size={14} /> Click to Reveal Key
                                        </span>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Activation Steps */}
                {guide && (
                    <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-5">
                        <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <ExternalLink size={16} className="text-blue-600" /> How to Activate
                        </h4>
                        <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600 ml-1">
                            {guide.steps.map((step, i) => (
                                <li key={i} className="leading-relaxed">{step}</li>
                            ))}
                        </ol>
                        {guide.note && (
                            <p className="mt-3 text-xs text-orange-600 font-medium bg-orange-50 p-2 rounded border border-orange-100 inline-block">
                                Note: {guide.note}
                            </p>
                        )}
                    </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Order Summary */}
      <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4">Order Summary</h3>
              <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>{formatPrice(order.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                      <span>Discount</span>
                      <span className="text-green-600">-{formatPrice(order.discount)}</span>
                  </div>
                  <div className="flex justify-between text-gray-900 font-bold pt-2 border-t border-gray-200 mt-2">
                      <span>Total Paid</span>
                      <span className="text-[#16a34a]">{formatPrice(order.total)}</span>
                  </div>
              </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4">Billing Information</h3>
              <div className="text-sm text-gray-600 space-y-1">
                  <p className="font-bold text-gray-900">{order.firstName} {order.lastName}</p>
                  <p>{order.email}</p>
                  <p>{order.phone}</p>
                  <p>{order.streetAddress}, {order.city}</p>
                  <p>{order.state}, {order.country} - {order.zip}</p>
              </div>
          </div>
      </div>

      <div className="mt-12 flex justify-center">
          <button 
            onClick={onNavigateHome}
            className="bg-[#1e2025] hover:bg-[#16a34a] text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg transition-all flex items-center gap-2"
          >
              <Home size={20} /> Return to Home
          </button>
      </div>

    </div>
  );
};

export default OrderSuccess;
