import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminProducts, createProduct, updateProduct, deleteProduct } from '../store/slices/productsSlice';
import { fetchKeysByProduct, addKeys, deleteKey, fetchInventory, clearKeys } from '../store/slices/keysSlice';
import type { AppDispatch, RootState } from '../store/store';
import { Plus, Search, Edit, Trash2, X, Key, Save, Upload } from 'lucide-react';

interface AdminPanelProps {
  products: any[];
  onAddProduct: (product: any) => void;
  onUpdateProduct: (product: any) => void;
  onDeleteProduct: (id: string) => void;
  onLogout: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onLogout }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { items: products, loading: productsLoading, error: productsError } = useSelector((state: RootState) => state.products);
  const { keys, counts, loading: keysLoading, error: keysError } = useSelector((state: RootState) => state.keys);

  const [activeTab, setActiveTab] = useState<'products' | 'keys'>('products');
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [keysInput, setKeysInput] = useState('');
  const [addKeysMsg, setAddKeysMsg] = useState('');

  const [formData, setFormData] = useState<any>({
    name: '', subtitle: '', price: 0, oldPrice: 0, category: 'Software', imageUrl: '', logo: '', imageColor: 'bg-blue-600'
  });

  // Extended fields
  const [descBulletsInput, setDescBulletsInput] = useState('');
  const [descSectionTitle, setDescSectionTitle] = useState('Overview');
  const [descSectionText, setDescSectionText] = useState('');
  const [activationStepsInput, setActivationStepsInput] = useState('');
  const [activationNote, setActivationNote] = useState('');
  const [sysReq, setSysReq] = useState({ os: '', processor: '', memory: '', storage: '', graphics: '' });

  useEffect(() => {
    dispatch(fetchAdminProducts());
  }, [dispatch]);

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setFormData({
      name: product.name, subtitle: product.subtitle || '', price: parseFloat(product.price),
      oldPrice: product.oldPrice || 0, category: product.category, imageUrl: product.imageUrl || '',
      logo: product.logo || '', imageColor: product.imageColor || 'bg-blue-600'
    });
    setDescBulletsInput(product.description?.bullets?.join('\n') || '');
    setDescSectionTitle(product.description?.sections?.[0]?.title || 'Overview');
    setDescSectionText(product.description?.sections?.[0]?.text || '');
    setActivationStepsInput(product.activationGuide?.steps?.join('\n') || '');
    setActivationNote(product.activationGuide?.note || '');
    setSysReq({
      os: product.systemRequirements?.os || '', processor: product.systemRequirements?.processor || '',
      memory: product.systemRequirements?.memory || '', storage: product.systemRequirements?.storage || '',
      graphics: product.systemRequirements?.graphics || ''
    });
    setKeysInput('');
    setIsEditing(true);
  };

  const handleAddNew = () => {
    setEditingProduct(null);
    setFormData({ name: '', subtitle: '', price: 0, oldPrice: 0, category: 'Software', imageUrl: '', logo: '', imageColor: 'bg-blue-600' });
    setDescBulletsInput(''); setDescSectionTitle('Overview'); setDescSectionText('');
    setActivationStepsInput(''); setActivationNote('');
    setSysReq({ os: '', processor: '', memory: '', storage: '', graphics: '' });
    setKeysInput('');
    setIsEditing(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      description: {
        bullets: descBulletsInput.split('\n').filter(k => k.trim()),
        sections: [{ title: descSectionTitle, text: descSectionText }]
      },
      activationGuide: {
        steps: activationStepsInput.split('\n').filter(k => k.trim()),
        note: activationNote
      },
      systemRequirements: sysReq,
    };
    if (editingProduct) {
      await dispatch(updateProduct({ id: editingProduct.id, data: payload }));
    } else {
      await dispatch(createProduct(payload));
    }
    setIsEditing(false);
    dispatch(fetchAdminProducts());
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this product?')) return;
    await dispatch(deleteProduct(id));
  };

  const handleViewKeys = (productId: string) => {
    setSelectedProductId(productId);
    dispatch(fetchKeysByProduct({ productId }));
    setActiveTab('keys');
  };

  const handleAddKeys = async () => {
    if (!selectedProductId || !keysInput.trim()) return;
    const keysList = keysInput.split('\n').filter(k => k.trim());
    const result = await dispatch(addKeys({ productId: selectedProductId, keys: keysList }));
    if (addKeys.fulfilled.match(result)) {
      setAddKeysMsg(`Added ${result.payload.summary?.added || 0} keys`);
      setKeysInput('');
      dispatch(fetchKeysByProduct({ productId: selectedProductId }));
    }
  };

  const handleDeleteKey = async (keyId: string) => {
    await dispatch(deleteKey(keyId));
  };

  const filteredProducts = products.filter(p =>
    p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.id?.toLowerCase().includes(searchTerm.toLowerCase())
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
            onClick={() => setActiveTab('keys')}
            className={`px-6 py-3 rounded-xl font-bold transition-colors ${activeTab === 'keys' ? 'bg-white text-[#16a34a] shadow-sm' : 'text-gray-500 hover:bg-white/50'}`}
          >
            Keys Management
          </button>
        </div>

        {activeTab === 'products' && (
          <>
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
              <button onClick={handleAddNew} className="flex items-center gap-2 px-6 py-3 bg-[#16a34a] text-white rounded-xl font-bold hover:bg-[#15803d] transition-colors shadow-lg">
                <Plus size={20} /> Add New Product
              </button>
            </div>

            {productsError && <p className="text-red-500 mb-4">{productsError}</p>}

            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Product</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Price</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Category</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Stock</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {productsLoading ? (
                    <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-400">Loading...</td></tr>
                  ) : filteredProducts.map(product => (
                    <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center text-gray-600 text-xs font-bold overflow-hidden">
                            {product.imageUrl ? <img src={product.imageUrl} alt="" className="w-full h-full object-cover" /> : product.name?.substring(0, 2)}
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">{product.name}</p>
                            <p className="text-xs text-gray-500">{product.slug}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium">₹{parseFloat(product.price).toFixed(2)}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{product.category}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {product.stock ?? 0} Available
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => handleViewKeys(product.id)} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Manage Keys">
                            <Key size={18} />
                          </button>
                          <button onClick={() => handleEdit(product)} className="p-2 text-gray-400 hover:text-[#16a34a] hover:bg-green-50 rounded-lg transition-colors">
                            <Edit size={18} />
                          </button>
                          <button onClick={() => handleDelete(product.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
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

        {activeTab === 'keys' && (
          <div className="space-y-6">
            <div className="flex gap-4 items-center flex-wrap">
              <select
                value={selectedProductId}
                onChange={e => { setSelectedProductId(e.target.value); if (e.target.value) dispatch(fetchKeysByProduct({ productId: e.target.value })); dispatch(clearKeys()); setAddKeysMsg(''); }}
                className="px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#16a34a] outline-none"
              >
                <option value="">Select a product</option>
                {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
              {counts && (
                <div className="flex gap-3 text-sm">
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full font-bold">{counts.available} Available</span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full font-bold">{counts.sold} Sold</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-bold">{counts.total} Total</span>
                </div>
              )}
            </div>

            {selectedProductId && (
              <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
                <h3 className="font-bold text-gray-900">Add Keys</h3>
                <textarea
                  value={keysInput}
                  onChange={e => setKeysInput(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#16a34a] outline-none h-28 font-mono text-sm"
                  placeholder="KEY-XXXX-XXXX&#10;KEY-YYYY-YYYY"
                />
                {addKeysMsg && <p className="text-green-600 text-sm font-medium">{addKeysMsg}</p>}
                {keysError && <p className="text-red-500 text-sm">{keysError}</p>}
                <button onClick={handleAddKeys} disabled={keysLoading} className="px-6 py-2 bg-[#16a34a] text-white rounded-xl font-bold hover:bg-[#15803d] disabled:opacity-60 transition-colors">
                  {keysLoading ? 'Adding...' : 'Add Keys'}
                </button>
              </div>
            )}

            {keys.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase">License Key</th>
                      <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase">Added</th>
                      <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {keys.map((k: any) => (
                      <tr key={k.id} className="hover:bg-gray-50">
                        <td className="px-6 py-3 font-mono text-sm">{k.licenseKey}</td>
                        <td className="px-6 py-3">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${k.status === 'AVAILABLE' ? 'bg-green-100 text-green-700' : k.status === 'SOLD' ? 'bg-gray-100 text-gray-600' : 'bg-yellow-100 text-yellow-700'}`}>
                            {k.status}
                          </span>
                        </td>
                        <td className="px-6 py-3 text-sm text-gray-500">{new Date(k.createdAt).toLocaleDateString()}</td>
                        <td className="px-6 py-3 text-right">
                          {k.status === 'AVAILABLE' && (
                            <button onClick={() => handleDeleteKey(k.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                              <Trash2 size={16} />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Edit/Add Modal */}
        {isEditing && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
                <h3 className="text-xl font-bold text-gray-900">{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
                <button onClick={() => setIsEditing(false)} className="p-2 text-gray-400 hover:bg-gray-100 rounded-full"><X size={24} /></button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-6">

                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Product Name</label>
                    <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#16a34a] outline-none" required />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Subtitle</label>
                    <input type="text" value={formData.subtitle} onChange={e => setFormData({...formData, subtitle: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#16a34a] outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Price (₹)</label>
                    <input type="number" step="0.01" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#16a34a] outline-none" required />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Original Price (₹)</label>
                    <input type="number" step="0.01" value={formData.oldPrice} onChange={e => setFormData({...formData, oldPrice: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#16a34a] outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                    <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#16a34a] outline-none">
                      <option>Software</option>
                      <option>Creative Tools</option>
                      <option>AI Tools</option>
                      <option>Office</option>
                      <option>Security</option>
                      <option>Games</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Logo Text</label>
                    <input type="text" value={formData.logo} onChange={e => setFormData({...formData, logo: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#16a34a] outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Product Image</label>
                    <div className="flex items-center gap-3">
                      {formData.imageUrl && (
                        <img src={formData.imageUrl} alt="preview" className="w-14 h-14 rounded-lg object-cover border border-gray-200" />
                      )}
                      <label className="flex-1 cursor-pointer flex items-center gap-2 px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#16a34a] transition-colors text-sm text-gray-500 hover:text-[#16a34a]">
                        <Upload size={16} />
                        {formData.imageUrl ? 'Change Image' : 'Upload Image'}
                        <input type="file" accept="image/*" className="hidden" onChange={e => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          const reader = new FileReader();
                          reader.onload = () => setFormData({...formData, imageUrl: reader.result as string});
                          reader.readAsDataURL(file);
                        }} />
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Background Color Class</label>
                    <input type="text" value={formData.imageColor} onChange={e => setFormData({...formData, imageColor: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#16a34a] outline-none" placeholder="bg-blue-600" />
                  </div>
                </div>

                {/* Product Details */}
                <div className="border-t border-gray-100 pt-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-4">Product Details</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Feature Bullets (one per line)</label>
                      <textarea value={descBulletsInput} onChange={e => setDescBulletsInput(e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#16a34a] outline-none h-24" placeholder="Feature 1&#10;Feature 2" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="md:col-span-1">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Description Title</label>
                        <input type="text" value={descSectionTitle} onChange={e => setDescSectionTitle(e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#16a34a] outline-none" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Description Text</label>
                        <textarea value={descSectionText} onChange={e => setDescSectionText(e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#16a34a] outline-none h-24" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Activation Guide */}
                <div className="border-t border-gray-100 pt-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-4">Activation Guide</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Activation Steps (one per line)</label>
                      <textarea value={activationStepsInput} onChange={e => setActivationStepsInput(e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#16a34a] outline-none h-24" placeholder="Step 1: Download...&#10;Step 2: Install..." />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Activation Note</label>
                      <input type="text" value={activationNote} onChange={e => setActivationNote(e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#16a34a] outline-none" placeholder="Important: Disconnect internet before installing..." />
                    </div>
                  </div>
                </div>

                {/* System Requirements */}
                <div className="border-t border-gray-100 pt-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-4">System Requirements</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {(['os','processor','memory','storage','graphics'] as const).map(field => (
                      <div key={field}>
                        <label className="block text-sm font-bold text-gray-700 mb-2 capitalize">{field}</label>
                        <input type="text" value={sysReq[field]} onChange={e => setSysReq({...sysReq, [field]: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#16a34a] outline-none" placeholder={field === 'os' ? 'Windows 10/11' : field === 'processor' ? 'Intel Core i5' : field === 'memory' ? '8 GB RAM' : field === 'storage' ? '4 GB available' : 'DirectX 12'} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* License Keys */}
                <div className="border-t border-gray-100 pt-6">
                  <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <Key size={16} /> License Keys / Accounts (one per line)
                  </label>
                  <textarea value={keysInput} onChange={e => setKeysInput(e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#16a34a] outline-none h-32 font-mono text-sm" placeholder="KEY-XXXX-XXXX-XXXX&#10;user@email.com:password" />
                  <p className="text-xs text-gray-500 mt-1">These keys will be distributed to customers upon purchase.</p>
                </div>

                <div className="flex justify-end gap-4 pt-4 border-t border-gray-100">
                  <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-2.5 text-gray-600 font-bold hover:bg-gray-100 rounded-xl transition-colors">Cancel</button>
                  <button type="submit" className="px-6 py-2.5 bg-[#16a34a] text-white font-bold rounded-xl hover:bg-[#15803d] transition-colors shadow-lg">Save Product</button>
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
