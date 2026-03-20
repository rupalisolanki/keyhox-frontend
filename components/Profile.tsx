import React, { useState, useEffect } from 'react';
import { User, Package, Key, MapPin, LogOut, Settings, CreditCard, ChevronRight, Copy, Eye, EyeOff, Check, Shield, Download } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

interface ProfileProps {
  onLogout: () => void;
  user: {
      name: string;
      email: string;
      phone: string;
      joinDate: string;
  };
  initialTab?: 'dashboard' | 'orders' | 'licenses' | 'address' | 'settings';
}

const Profile: React.FC<ProfileProps> = ({ onLogout, user, initialTab = 'dashboard' }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'licenses' | 'address' | 'settings'>('dashboard');
  const { formatPrice } = useCurrency();

  // Sync internal state if initialTab changes (e.g. from header navigation)
  useEffect(() => {
      if (initialTab) {
          setActiveTab(initialTab);
      }
  }, [initialTab]);

  // Mock Data
  const orders = [
      { id: 'DH-2491', date: 'Feb 02, 2026', total: 699.00, status: 'Completed', items: ['CapCut Pro - 6 Months'] },
      { id: 'DH-2488', date: 'Jan 28, 2026', total: 299.00, status: 'Completed', items: ['Windows 11 Pro Retail Key'] },
      { id: 'DH-2452', date: 'Jan 15, 2026', total: 1499.00, status: 'Refunded', items: ['Adobe Acrobat Pro DC 2020'] },
  ];

  const licenses = [
      { 
          id: 1, 
          product: 'Windows 11 Pro Retail', 
          type: 'License Key',
          key: 'W269N-WFGWX-YVC9B-4J6C9-T83GX',
          date: 'Jan 28, 2026',
          status: 'Active'
      },
      { 
          id: 2, 
          product: 'CapCut Pro (6 Months)', 
          type: 'Account Credentials',
          key: 'Email: support@keyhox.com | Pass: TempPass123!',
          date: 'Feb 02, 2026',
          status: 'Active'
      }
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-10 animate-in fade-in duration-500">
      <div className="max-w-[1440px] mx-auto px-4 md:px-10">
        
        {/* Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
                <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">My Account</h1>
                <p className="text-gray-500">Welcome back, <span className="font-bold text-[#16a34a]">{user.name}</span></p>
            </div>
            <button 
                onClick={onLogout}
                className="flex items-center gap-2 px-6 py-2.5 bg-white border border-gray-200 text-red-500 font-bold rounded-xl hover:bg-red-50 hover:border-red-100 transition-colors shadow-sm w-fit"
            >
                <LogOut size={18} /> Sign Out
            </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Sidebar Navigation */}
            <div className="w-full lg:w-72 shrink-0">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
                    <div className="p-6 border-b border-gray-100 bg-[#1e2025] text-white">
                        <div className="w-16 h-16 bg-[#16a34a] rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 border-4 border-[#1e2025] shadow-lg">
                            {user.name.charAt(0)}
                        </div>
                        <h3 className="font-bold text-lg truncate">{user.name}</h3>
                        <p className="text-gray-400 text-xs truncate">{user.email}</p>
                    </div>
                    <nav className="p-4 space-y-1">
                        {[
                            { id: 'dashboard', label: 'Dashboard', icon: User },
                            { id: 'orders', label: 'Order History', icon: Package },
                            { id: 'licenses', label: 'My Licenses', icon: Key },
                            { id: 'address', label: 'Addresses', icon: MapPin },
                            { id: 'settings', label: 'Account Details', icon: Settings },
                        ].map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id as any)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                                    activeTab === item.id 
                                    ? 'bg-[#16a34a]/10 text-[#16a34a]' 
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                            >
                                <item.icon size={20} />
                                {item.label}
                            </button>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1">
                
                {/* Dashboard Tab */}
                {activeTab === 'dashboard' && (
                    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                                    <Package size={24} />
                                </div>
                                <h3 className="text-gray-500 text-sm font-medium">Total Orders</h3>
                                <p className="text-3xl font-black text-gray-900">{orders.length}</p>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center mb-4">
                                    <Key size={24} />
                                </div>
                                <h3 className="text-gray-500 text-sm font-medium">Active Licenses</h3>
                                <p className="text-3xl font-black text-gray-900">{licenses.length}</p>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-4">
                                    <CreditCard size={24} />
                                </div>
                                <h3 className="text-gray-500 text-sm font-medium">Total Spent</h3>
                                <p className="text-3xl font-black text-gray-900">{formatPrice(orders.reduce((acc, curr) => acc + (curr.status !== 'Refunded' ? curr.total : 0), 0))}</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-6">Recent Orders</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
                                            <th className="pb-4 pl-2">Order ID</th>
                                            <th className="pb-4">Date</th>
                                            <th className="pb-4">Status</th>
                                            <th className="pb-4">Total</th>
                                            <th className="pb-4 text-right pr-2">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm">
                                        {orders.slice(0, 3).map((order) => (
                                            <tr key={order.id} className="border-b border-gray-50 last:border-none group">
                                                <td className="py-4 pl-2 font-medium text-gray-900">#{order.id}</td>
                                                <td className="py-4 text-gray-500">{order.date}</td>
                                                <td className="py-4">
                                                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                                                        order.status === 'Completed' ? 'bg-green-100 text-green-700' : 
                                                        order.status === 'Refunded' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                                                    }`}>
                                                        {order.status}
                                                    </span>
                                                </td>
                                                <td className="py-4 font-bold text-gray-900">{formatPrice(order.total)}</td>
                                                <td className="py-4 text-right pr-2">
                                                    <button 
                                                        onClick={() => setActiveTab('orders')}
                                                        className="text-[#16a34a] font-bold hover:underline"
                                                    >
                                                        View
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* Orders Tab */}
                {activeTab === 'orders' && (
                     <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 animate-in slide-in-from-right-4 duration-300">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Order History</h2>
                        <div className="space-y-6">
                            {orders.map((order) => (
                                <div key={order.id} className="border border-gray-200 rounded-xl overflow-hidden hover:border-[#16a34a]/30 transition-colors">
                                    <div className="bg-gray-50 p-4 flex flex-wrap items-center justify-between gap-4 text-sm">
                                        <div className="flex gap-6">
                                            <div>
                                                <span className="block text-gray-500 text-xs uppercase font-bold">Order Placed</span>
                                                <span className="font-medium text-gray-900">{order.date}</span>
                                            </div>
                                            <div>
                                                <span className="block text-gray-500 text-xs uppercase font-bold">Total</span>
                                                <span className="font-medium text-gray-900">{formatPrice(order.total)}</span>
                                            </div>
                                            <div>
                                                <span className="block text-gray-500 text-xs uppercase font-bold">Order #</span>
                                                <span className="font-medium text-gray-900">{order.id}</span>
                                            </div>
                                        </div>
                                        <button className="text-[#16a34a] font-bold hover:text-[#15803d] text-xs uppercase tracking-wide border border-[#16a34a] px-3 py-1.5 rounded-lg hover:bg-[#16a34a] hover:text-white transition-all">
                                            Invoice
                                        </button>
                                    </div>
                                    <div className="p-4 md:p-6">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                            <div>
                                                <h4 className="font-bold text-gray-900 mb-1">{order.status}</h4>
                                                <p className="text-sm text-gray-600">{order.items.join(', ')}</p>
                                            </div>
                                            <div className="flex gap-3">
                                                <button className="px-4 py-2 bg-[#1e2025] text-white text-sm font-bold rounded-lg hover:bg-black transition-colors">
                                                    Buy Again
                                                </button>
                                                {order.status === 'Completed' && (
                                                    <button 
                                                        onClick={() => setActiveTab('licenses')}
                                                        className="px-4 py-2 border border-gray-200 text-gray-700 text-sm font-bold rounded-lg hover:bg-gray-50 transition-colors"
                                                    >
                                                        View License
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                     </div>
                )}

                {/* Licenses Tab */}
                {activeTab === 'licenses' && (
                     <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 animate-in slide-in-from-right-4 duration-300">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            My Licenses & Keys <Shield size={18} className="text-[#16a34a]" />
                        </h2>
                        
                        <div className="space-y-6">
                            {licenses.map((license) => (
                                <LicenseItem key={license.id} license={license} />
                            ))}
                        </div>
                     </div>
                )}

                {/* Address Tab */}
                {activeTab === 'address' && (
                     <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 animate-in slide-in-from-right-4 duration-300">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-gray-900">Saved Addresses</h2>
                            <button className="text-sm font-bold text-[#16a34a] hover:underline">+ Add New</button>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="border border-[#16a34a] bg-[#16a34a]/5 p-6 rounded-xl relative">
                                <span className="absolute top-4 right-4 bg-[#16a34a] text-white text-[10px] font-bold px-2 py-0.5 rounded">DEFAULT</span>
                                <h4 className="font-bold text-gray-900 mb-2">{user.name}</h4>
                                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                                    123 Tech Park, Indiranagar,<br/>
                                    Bangalore, Karnataka, 560038<br/>
                                    India
                                </p>
                                <div className="flex gap-4 text-xs font-bold text-gray-500">
                                    <button className="hover:text-gray-900">Edit</button>
                                    <button className="hover:text-red-500">Remove</button>
                                </div>
                            </div>
                        </div>
                     </div>
                )}

                {/* Settings Tab */}
                {activeTab === 'settings' && (
                     <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 animate-in slide-in-from-right-4 duration-300">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Account Details</h2>
                        
                        <form className="space-y-6 max-w-2xl">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700">Full Name</label>
                                    <input 
                                        type="text" 
                                        defaultValue={user.name} 
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 focus:border-[#16a34a] focus:ring-4 focus:ring-[#16a34a]/10 outline-none transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700">Phone Number</label>
                                    <input 
                                        type="text" 
                                        defaultValue={user.phone} 
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 focus:border-[#16a34a] focus:ring-4 focus:ring-[#16a34a]/10 outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700">Email Address</label>
                                <input 
                                    type="email" 
                                    defaultValue={user.email} 
                                    disabled
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-100 text-gray-500 cursor-not-allowed"
                                />
                                <p className="text-xs text-gray-400">Email address cannot be changed.</p>
                            </div>

                            <div className="pt-6 border-t border-gray-100">
                                <h3 className="font-bold text-gray-900 mb-4">Password Change</h3>
                                <div className="space-y-4">
                                    <input 
                                        type="password" 
                                        placeholder="Current Password" 
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:border-[#16a34a] outline-none"
                                    />
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <input 
                                            type="password" 
                                            placeholder="New Password" 
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:border-[#16a34a] outline-none"
                                        />
                                        <input 
                                            type="password" 
                                            placeholder="Confirm New Password" 
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:border-[#16a34a] outline-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            <button type="button" className="px-8 py-3 bg-[#1e2025] hover:bg-black text-white font-bold rounded-xl transition-colors shadow-lg">
                                Save Changes
                            </button>
                        </form>
                     </div>
                )}

            </div>
        </div>
      </div>
    </div>
  );
};

// Helper component for Licenses to handle reveal state individually
const LicenseItem: React.FC<{ license: any }> = ({ license }) => {
    const [revealed, setRevealed] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(license.key);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div>
                    <span className="text-xs font-bold text-[#16a34a] bg-green-50 px-2 py-1 rounded uppercase tracking-wider mb-2 inline-block">{license.type}</span>
                    <h3 className="font-bold text-gray-900 text-lg">{license.product}</h3>
                    <p className="text-sm text-gray-500">Purchased on {license.date}</p>
                </div>
                <button className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-[#16a34a] transition-colors border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50">
                    <Download size={16} /> Download Guide
                </button>
            </div>

            <div className="bg-gray-900 rounded-lg p-4 flex items-center justify-between gap-4 relative overflow-hidden">
                <div className="font-mono text-white text-sm md:text-base break-all">
                    {revealed ? license.key : '•••••-•••••-•••••-•••••-•••••'}
                </div>
                <div className="flex items-center gap-2 shrink-0">
                     <button 
                        onClick={() => setRevealed(!revealed)}
                        className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                        title={revealed ? "Hide" : "Reveal"}
                     >
                         {revealed ? <EyeOff size={18} /> : <Eye size={18} />}
                     </button>
                     <button 
                        onClick={handleCopy}
                        className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                        title="Copy"
                     >
                         {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                     </button>
                </div>
            </div>
            <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                <Shield size={12} /> Keep this key secret. Never share it with anyone.
            </p>
        </div>
    );
}

export default Profile;