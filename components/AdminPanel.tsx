import React, { useState } from 'react';
import { Product } from '../types';
import { Plus, Search, Edit, Trash2, Save, X, Key, Upload, Image as ImageIcon } from 'lucide-react';

interface AdminPanelProps {
  products: Product[];
  onAddProduct: (product: Product) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (id: string) => void;
  onLogout: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ 
  products, onAddProduct, onUpdateProduct, onDeleteProduct, onLogout 
}) => {
  const [activeTab, setActiveTab] = useState<'products' | 'orders'>('products');
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<Product>>({
    title: '',
    subtitle: '',
    price: 0,
    oldPrice: 0,
    category: 'Software',
    rating: 5,
    reviews: 0,
    logo: '',
    imageColor: 'bg-blue-600',
    keys: []
  });

  const [keysInput, setKeysInput] = useState('');

  // Extended Details State
  const [descBulletsInput, setDescBulletsInput] = useState('');
  const [descSectionTitle, setDescSectionTitle] = useState('');
  const [descSectionText, setDescSectionText] = useState('');
  const [activationStepsInput, setActivationStepsInput] = useState('');
  const [activationNote, setActivationNote] = useState('');
  const [sysReq, setSysReq] = useState({
      os: '',
      processor: '',
      memory: '',
      storage: '',
      graphics: ''
  });

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData(product);
    setKeysInput(product.keys ? product.keys.join('\n') : '');
    
    // Load extended details
    setDescBulletsInput(product.description?.bullets?.join('\n') || '');
    setDescSectionTitle(product.description?.sections?.[0]?.title || 'Overview');
    setDescSectionText(product.description?.sections?.[0]?.text || '');
    setActivationStepsInput(product.activationGuide?.steps?.join('\n') || '');
    setActivationNote(product.activationGuide?.note || '');
    setSysReq({
        os: product.systemRequirements?.os || '',
        processor: product.systemRequirements?.processor || '',
        memory: product.systemRequirements?.memory || '',
        storage: product.systemRequirements?.storage || '',
        graphics: product.systemRequirements?.graphics || ''
    });

    setIsEditing(true);
  };

  const handleAddNew = () => {
    setEditingProduct(null);
    setFormData({
      id: `prod-${Date.now()}`,
      title: '',
      subtitle: '',
      price: 0,
      oldPrice: 0,
      category: 'Software',
      rating: 5,
      reviews: 0,
      logo: '',
      imageColor: 'bg-blue-600',
      keys: []
    });
    setKeysInput('');
    
    // Reset extended details
    setDescBulletsInput('');
    setDescSectionTitle('Overview');
    setDescSectionText('');
    setActivationStepsInput('');
    setActivationNote('');
    setSysReq({ os: '', processor: '', memory: '', storage: '', graphics: '' });

    setIsEditing(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const keysArray = keysInput.split('\n').filter(k => k.trim() !== '');
    const descBulletsArray = descBulletsInput.split('\n').filter(k => k.trim() !== '');
    const activationStepsArray = activationStepsInput.split('\n').filter(k => k.trim() !== '');
    
    const productData: Product = {
      ...formData as Product,
      keys: keysArray,
      id: editingProduct?.id || `prod-${Date.now()}`,
      features: descBulletsArray, // Map bullets to features for top section display
      description: {
          bullets: descBulletsArray,
          sections: [{ title: descSectionTitle, text: descSectionText }]
      },
      activationGuide: {
          steps: activationStepsArray,
          note: activationNote
      },
      systemRequirements: sysReq
    };

    if (editingProduct) {
      onUpdateProduct(productData);
    } else {
      onAddProduct(productData);
    }
    
    setIsEditing(false);
  };

  const filteredProducts = products.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <header className="bg-[#1e2025] text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#16a34a] rounded-lg flex items-center justify-center font-bold">A</div>
            <span className="font-bold text-lg">Admin Panel</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">admin@keyhox.com</span>
            <button 
              onClick={onLogout}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-bold transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button 
            onClick={() => setActiveTab('products')}
            className={`px-6 py-3 rounded-xl font-bold transition-colors ${activeTab === 'products' ? 'bg-white text-[#16a34a] shadow-sm' : 'text-gray-500 hover:bg-white/50'}`}
          >
            Products Management
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`px-6 py-3 rounded-xl font-bold transition-colors ${activeTab === 'orders' ? 'bg-white text-[#16a34a] shadow-sm' : 'text-gray-500 hover:bg-white/50'}`}
          >
            Orders & Keys
          </button>
        </div>

        {activeTab === 'products' && (
          <>
            {/* Actions Bar */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border-none shadow-sm focus:ring-2 focus:ring-[#16a34a] outline-none"
                />
              </div>
              <button 
                onClick={handleAddNew}
                className="flex items-center gap-2 px-6 py-3 bg-[#16a34a] text-white rounded-xl font-bold hover:bg-[#15803d] transition-colors shadow-lg hover:shadow-xl"
              >
                <Plus size={20} /> Add New Product
              </button>
            </div>

            {/* Products List */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Product</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Price</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Category</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Keys Stock</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredProducts.map(product => (
                    <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg ${product.imageColor || 'bg-gray-200'} flex items-center justify-center text-white text-xs font-bold overflow-hidden`}>
                            {product.coverImage ? (
                                <img src={product.coverImage} alt="" className="w-full h-full object-cover" />
                            ) : (
                                product.logo ? product.logo.substring(0, 2) : 'NA'
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">{product.title}</p>
                            <p className="text-xs text-gray-500">{product.subtitle}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium">₹{product.price}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{product.category}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${product.keys && product.keys.length > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {product.keys ? product.keys.length : 0} Available
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => handleEdit(product)}
                            className="p-2 text-gray-400 hover:text-[#16a34a] hover:bg-green-50 rounded-lg transition-colors"
                          >
                            <Edit size={18} />
                          </button>
                          <button 
                            onClick={() => onDeleteProduct(product.id)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* Edit/Add Modal */}
        {isEditing && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
                <h3 className="text-xl font-bold text-gray-900">
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h3>
                <button 
                  onClick={() => setIsEditing(false)}
                  className="p-2 text-gray-400 hover:bg-gray-100 rounded-full"
                >
                  <X size={24} />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Product Name</label>
                    <input 
                      type="text" 
                      value={formData.title} 
                      onChange={e => setFormData({...formData, title: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#16a34a] outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Subtitle</label>
                    <input 
                      type="text" 
                      value={formData.subtitle} 
                      onChange={e => setFormData({...formData, subtitle: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#16a34a] outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Price (₹)</label>
                    <input 
                      type="number" 
                      value={formData.price} 
                      onChange={e => setFormData({...formData, price: Number(e.target.value)})}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#16a34a] outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Original Price (₹)</label>
                    <input 
                      type="number" 
                      value={formData.oldPrice} 
                      onChange={e => setFormData({...formData, oldPrice: Number(e.target.value)})}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#16a34a] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                    <select 
                      value={formData.category} 
                      onChange={e => setFormData({...formData, category: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#16a34a] outline-none"
                    >
                      <option value="Software">Software</option>
                      <option value="Creative Tools">Creative Tools</option>
                      <option value="AI Tools">AI Tools</option>
                      <option value="Games">Games</option>
                      <option value="Office">Office</option>
                      <option value="Security">Security</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Logo Text/URL</label>
                    <input 
                      type="text" 
                      value={formData.logo} 
                      onChange={e => setFormData({...formData, logo: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#16a34a] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Cover Image URL</label>
                    <input 
                      type="text" 
                      value={formData.coverImage || ''} 
                      onChange={e => setFormData({...formData, coverImage: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#16a34a] outline-none"
                      placeholder="https://..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Background Color Class</label>
                    <input 
                      type="text" 
                      value={formData.imageColor} 
                      onChange={e => setFormData({...formData, imageColor: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#16a34a] outline-none"
                      placeholder="bg-blue-600"
                    />
                  </div>
                </div>

                {/* Detailed Information Section */}
                <div className="border-t border-gray-100 pt-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-4">Product Details</h4>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Feature Bullets (One per line)</label>
                            <textarea 
                                value={descBulletsInput}
                                onChange={e => setDescBulletsInput(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#16a34a] outline-none h-24"
                                placeholder="Feature 1&#10;Feature 2"
                            ></textarea>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                             <div className="md:col-span-1">
                                <label className="block text-sm font-bold text-gray-700 mb-2">Description Title</label>
                                <input 
                                    type="text" 
                                    value={descSectionTitle} 
                                    onChange={e => setDescSectionTitle(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#16a34a] outline-none"
                                />
                             </div>
                             <div className="md:col-span-2">
                                <label className="block text-sm font-bold text-gray-700 mb-2">Description Text</label>
                                <textarea 
                                    value={descSectionText}
                                    onChange={e => setDescSectionText(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#16a34a] outline-none h-24"
                                ></textarea>
                             </div>
                        </div>
                    </div>
                </div>

                {/* Activation Guide Section */}
                <div className="border-t border-gray-100 pt-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-4">Activation Guide</h4>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Activation Steps (One per line)</label>
                            <textarea 
                                value={activationStepsInput}
                                onChange={e => setActivationStepsInput(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#16a34a] outline-none h-24"
                                placeholder="Step 1: Download...&#10;Step 2: Install..."
                            ></textarea>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Activation Note</label>
                            <input 
                                type="text" 
                                value={activationNote} 
                                onChange={e => setActivationNote(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#16a34a] outline-none"
                                placeholder="Important: Disconnect internet before installing..."
                            />
                        </div>
                    </div>
                </div>

                {/* System Requirements Section */}
                <div className="border-t border-gray-100 pt-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-4">System Requirements</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">OS</label>
                            <input 
                                type="text" 
                                value={sysReq.os} 
                                onChange={e => setSysReq({...sysReq, os: e.target.value})}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#16a34a] outline-none"
                                placeholder="Windows 10/11"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Processor</label>
                            <input 
                                type="text" 
                                value={sysReq.processor} 
                                onChange={e => setSysReq({...sysReq, processor: e.target.value})}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#16a34a] outline-none"
                                placeholder="Intel Core i5"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Memory</label>
                            <input 
                                type="text" 
                                value={sysReq.memory} 
                                onChange={e => setSysReq({...sysReq, memory: e.target.value})}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#16a34a] outline-none"
                                placeholder="8 GB RAM"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Storage</label>
                            <input 
                                type="text" 
                                value={sysReq.storage} 
                                onChange={e => setSysReq({...sysReq, storage: e.target.value})}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#16a34a] outline-none"
                                placeholder="4 GB available space"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Graphics</label>
                            <input 
                                type="text" 
                                value={sysReq.graphics} 
                                onChange={e => setSysReq({...sysReq, graphics: e.target.value})}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#16a34a] outline-none"
                                placeholder="DirectX 12 compatible"
                            />
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-6">
                  <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <Key size={16} /> License Keys / Accounts (One per line)
                  </label>
                  <textarea 
                    value={keysInput}
                    onChange={e => setKeysInput(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#16a34a] outline-none h-32 font-mono text-sm"
                    placeholder="KEY-XXXX-XXXX-XXXX&#10;user@email.com:password"
                  ></textarea>
                  <p className="text-xs text-gray-500 mt-1">These keys will be distributed to customers upon purchase.</p>
                </div>

                <div className="flex justify-end gap-4 pt-4 border-t border-gray-100">
                  <button 
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-2.5 text-gray-600 font-bold hover:bg-gray-100 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-6 py-2.5 bg-[#16a34a] text-white font-bold rounded-xl hover:bg-[#15803d] transition-colors shadow-lg"
                  >
                    Save Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
