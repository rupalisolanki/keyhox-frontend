import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Mail, Ticket, Upload, Send, HelpCircle, FileText, ShieldCheck, BookOpen, AlertCircle, X, Check, Paperclip, AlertTriangle } from 'lucide-react';

interface ContactUsProps {
    onNavigateRefund?: () => void;
    onNavigateTerms?: () => void;
    onNavigatePrivacy?: () => void;
}

const ContactUs: React.FC<ContactUsProps> = ({ onNavigateRefund, onNavigateTerms, onNavigatePrivacy }) => {
  // Main Contact Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    orderId: '',
    issueType: 'Delivery',
    message: ''
  });
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Ticket Modal State
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [ticketForm, setTicketForm] = useState({
      subject: '',
      email: '',
      department: 'Technical Support',
      priority: 'Medium',
      orderId: '',
      description: ''
  });
  const [ticketFile, setTicketFile] = useState<File | null>(null);
  const ticketFileRef = useRef<HTMLInputElement>(null);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showTicketModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [showTicketModal]);

  // Main Form Handlers
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    console.log("Attached File:", selectedFile);
    alert('Thank you for contacting us. We have received your request.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedFile(null);
    if (fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  };

  // Ticket Modal Handlers
  const handleTicketChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setTicketForm({
        ...ticketForm,
        [e.target.name]: e.target.value
    });
  };

  const handleTicketFileClick = () => {
    ticketFileRef.current?.click();
  }

  const handleTicketFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
          setTicketFile(e.target.files[0]);
      }
  }

  const removeTicketFile = (e: React.MouseEvent) => {
      e.stopPropagation();
      setTicketFile(null);
      if (ticketFileRef.current) ticketFileRef.current.value = '';
  }

  const handleTicketSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // Simulate API call
      setTimeout(() => {
          alert(`Ticket Created! Reference ID: #${Math.floor(Math.random() * 100000)}`);
          setShowTicketModal(false);
          setTicketForm({ subject: '', email: '', department: 'Technical Support', priority: 'Medium', orderId: '', description: '' });
          setTicketFile(null);
      }, 500);
  }

  return (
    <div className="bg-white animate-in fade-in duration-500 relative">
      
      {/* Hero Section */}
      <div className="bg-[#1e2025] text-white py-16 md:py-24 relative overflow-hidden">
         <div className="absolute inset-0 opacity-5">
            <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0 100 C 20 0 50 0 100 100 Z" fill="#16a34a" />
            </svg>
        </div>
        <div className="max-w-[1440px] mx-auto px-4 md:px-10 relative z-10 text-center">
             <div className="inline-flex items-center gap-2 bg-[#16a34a]/10 border border-[#16a34a]/20 px-4 py-1.5 rounded-full text-[#16a34a] font-bold text-sm mb-6">
                <HelpCircle size={16} /> 24/7 Support Center
             </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4">Contact Support</h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Need help with an order or activation? Choose a support option below.
            </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-10 py-12 md:py-20">
         
         {/* Support Options Cards */}
         <div className="grid md:grid-cols-3 gap-6 mb-16 -mt-24 relative z-20">
            {/* Card 1: WhatsApp */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:-translate-y-1 transition-transform duration-300 flex flex-col items-center text-center group">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-[#25D366] mb-6 group-hover:bg-[#25D366] group-hover:text-white transition-colors">
                    <MessageCircle size={32} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">WhatsApp Support</h3>
                <p className="text-gray-500 text-sm mb-6 h-10">Fastest response for order and activation help</p>
                <a href="https://wa.me/918305319636" target="_blank" rel="noopener noreferrer" className="w-full bg-[#25D366] hover:bg-[#20b858] text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-green-200 flex items-center justify-center gap-2">
                    <MessageCircle size={18} /> Chat on WhatsApp
                </a>
            </div>

            {/* Card 2: Email */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:-translate-y-1 transition-transform duration-300 flex flex-col items-center text-center group">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Mail size={32} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Email Support</h3>
                <p className="text-gray-500 text-sm mb-6 h-10">We reply within 24 hours (Mon–Sat)</p>
                <a href="mailto:support@keyhox.com" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-blue-200 flex items-center justify-center gap-2">
                    <Mail size={18} /> support@keyhox.com
                </a>
            </div>

            {/* Card 3: Ticket */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:-translate-y-1 transition-transform duration-300 flex flex-col items-center text-center group">
                <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center text-orange-600 mb-6 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                    <Ticket size={32} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Raise a Ticket</h3>
                <p className="text-gray-500 text-sm mb-6 h-10">Best for tracking ongoing complex issues</p>
                <button 
                    onClick={() => setShowTicketModal(true)}
                    className="w-full bg-[#1e2025] hover:bg-black text-white font-bold py-3 rounded-xl transition-colors shadow-lg flex items-center justify-center gap-2"
                >
                    <Ticket size={18} /> Create Support Ticket
                </button>
            </div>
         </div>

         <div className="grid lg:grid-cols-3 gap-12">
            
            {/* Contact Form Section */}
            <div className="lg:col-span-2">
                <div className="bg-white border border-gray-200 rounded-3xl p-6 md:p-10 shadow-sm">
                    <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-100">
                        <div className="w-10 h-10 bg-[#16a34a]/10 rounded-full flex items-center justify-center text-[#16a34a]">
                            <Send size={20} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">Send us a Message</h2>
                            <p className="text-gray-500 text-sm">Please include Order ID for faster help.</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 block">Full Name <span className="text-red-500">*</span></label>
                                <input 
                                    type="text" 
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:border-[#16a34a] focus:ring-4 focus:ring-[#16a34a]/10 outline-none transition-all placeholder:text-gray-400"
                                    placeholder="Enter your name"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 block">Email Address <span className="text-red-500">*</span></label>
                                <input 
                                    type="email" 
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:border-[#16a34a] focus:ring-4 focus:ring-[#16a34a]/10 outline-none transition-all placeholder:text-gray-400"
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 block">Order ID <span className="text-gray-400 font-normal">(Optional)</span></label>
                                <input 
                                    type="text" 
                                    name="orderId"
                                    value={formData.orderId}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:border-[#16a34a] focus:ring-4 focus:ring-[#16a34a]/10 outline-none transition-all placeholder:text-gray-400"
                                    placeholder="e.g. #ORD-12345"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 block">Issue Type <span className="text-red-500">*</span></label>
                                <select 
                                    name="issueType"
                                    required
                                    value={formData.issueType}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:border-[#16a34a] focus:ring-4 focus:ring-[#16a34a]/10 outline-none transition-all"
                                >
                                    <option value="Delivery">Delivery Issue</option>
                                    <option value="Activation">Product Activation</option>
                                    <option value="Billing">Billing & Payment</option>
                                    <option value="Refund">Refund Request</option>
                                    <option value="Other">Other Inquiry</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 block">Message <span className="text-red-500">*</span></label>
                            <textarea 
                                name="message"
                                required
                                value={formData.message}
                                onChange={handleChange}
                                rows={5}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:border-[#16a34a] focus:ring-4 focus:ring-[#16a34a]/10 outline-none transition-all resize-none placeholder:text-gray-400"
                                placeholder="Describe your issue in detail..."
                            ></textarea>
                        </div>

                        <div className="space-y-2">
                             <label className="text-sm font-bold text-gray-700 block">Attachment <span className="text-gray-400 font-normal">(Screenshot of error)</span></label>
                             <input 
                                type="file" 
                                ref={fileInputRef} 
                                className="hidden" 
                                onChange={handleFileChange} 
                                accept=".jpg,.jpeg,.png,.svg,.pdf"
                             />
                             <div 
                                onClick={handleFileClick}
                                className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors cursor-pointer group ${selectedFile ? 'border-[#16a34a] bg-[#16a34a]/5' : 'border-gray-200 hover:bg-gray-50'}`}
                             >
                                {selectedFile ? (
                                    <div className="flex flex-col items-center">
                                        <div className="bg-[#16a34a] text-white p-2 rounded-full mb-2">
                                            <Upload size={20} />
                                        </div>
                                        <p className="text-sm font-bold text-gray-900">{selectedFile.name}</p>
                                        <p className="text-xs text-gray-500 mt-1">{(selectedFile.size / 1024).toFixed(2)} KB</p>
                                        <button 
                                            onClick={removeFile}
                                            className="mt-3 text-red-500 text-xs font-bold hover:underline flex items-center gap-1"
                                        >
                                            <X size={12} /> Remove File
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <Upload className="mx-auto text-gray-400 group-hover:text-[#16a34a] mb-2 transition-colors" size={24} />
                                        <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                                        <p className="text-xs text-gray-400 mt-1">SVG, PNG, JPG or PDF (max. 5MB)</p>
                                    </>
                                )}
                             </div>
                        </div>

                        <button type="submit" className="w-full bg-[#16a34a] hover:bg-[#15803d] text-white font-bold py-4 rounded-xl transition-all shadow-xl hover:shadow-[#16a34a]/20 flex items-center justify-center gap-2 text-lg">
                            Submit Request
                        </button>
                    </form>
                </div>
            </div>

            {/* Help Links / FAQ Sidebar */}
            <div className="lg:col-span-1 space-y-6">
                
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                    <h3 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
                        <BookOpen size={20} className="text-[#16a34a]" /> Quick Help
                    </h3>
                    <div className="space-y-3">
                        <button className="w-full flex items-center justify-between p-3 bg-white rounded-xl border border-gray-200 text-gray-700 hover:border-[#16a34a] hover:text-[#16a34a] transition-all group text-left shadow-sm">
                            <span className="text-sm font-medium">Delivery & Access</span>
                            <span className="text-gray-400 group-hover:text-[#16a34a]">&rarr;</span>
                        </button>
                        <button className="w-full flex items-center justify-between p-3 bg-white rounded-xl border border-gray-200 text-gray-700 hover:border-[#16a34a] hover:text-[#16a34a] transition-all group text-left shadow-sm">
                            <span className="text-sm font-medium">Activation Guides</span>
                            <span className="text-gray-400 group-hover:text-[#16a34a]">&rarr;</span>
                        </button>
                        <button onClick={onNavigateRefund} className="w-full flex items-center justify-between p-3 bg-white rounded-xl border border-gray-200 text-gray-700 hover:border-[#16a34a] hover:text-[#16a34a] transition-all group text-left shadow-sm">
                            <span className="text-sm font-medium">Refund Policy</span>
                            <span className="text-gray-400 group-hover:text-[#16a34a]">&rarr;</span>
                        </button>
                         <button onClick={onNavigateTerms} className="w-full flex items-center justify-between p-3 bg-white rounded-xl border border-gray-200 text-gray-700 hover:border-[#16a34a] hover:text-[#16a34a] transition-all group text-left shadow-sm">
                            <span className="text-sm font-medium">Terms & Conditions</span>
                            <span className="text-gray-400 group-hover:text-[#16a34a]">&rarr;</span>
                        </button>
                        <button onClick={onNavigatePrivacy} className="w-full flex items-center justify-between p-3 bg-white rounded-xl border border-gray-200 text-gray-700 hover:border-[#16a34a] hover:text-[#16a34a] transition-all group text-left shadow-sm">
                            <span className="text-sm font-medium">Privacy Policy</span>
                            <span className="text-gray-400 group-hover:text-[#16a34a]">&rarr;</span>
                        </button>
                    </div>
                </div>

                <div className="bg-[#fff7ed] border border-[#ffedd5] rounded-2xl p-6">
                    <h3 className="font-bold text-[#c2410c] text-lg mb-2 flex items-center gap-2">
                        <AlertCircle size={20} /> Note on Payments
                    </h3>
                    <p className="text-sm text-[#ea580c] leading-relaxed">
                        If you are facing issues with payments, please check if your card supports international transactions or try using a different payment method like UPI for faster processing.
                    </p>
                </div>

                 <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
                    <h3 className="font-bold text-blue-800 text-lg mb-2 flex items-center gap-2">
                        <ShieldCheck size={20} /> Secure Support
                    </h3>
                    <p className="text-sm text-blue-700 leading-relaxed">
                        Keyhox support agents will never ask for your password or payment PIN. Please do not share sensitive credentials.
                    </p>
                </div>

            </div>

         </div>

      </div>

      {/* TICKET CREATION MODAL OVERLAY */}
      {showTicketModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-200 relative flex flex-col">
                
                {/* Modal Header */}
                <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center text-orange-600">
                             <Ticket size={20} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">Create New Ticket</h2>
                            <p className="text-xs text-gray-500">Trackable issue resolution</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => setShowTicketModal(false)}
                        className="p-2 hover:bg-gray-100 rounded-full text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-6 md:p-8">
                     <form onSubmit={handleTicketSubmit} className="space-y-6">
                        
                        {/* Row 1 */}
                        <div className="grid md:grid-cols-2 gap-6">
                             <div className="space-y-1.5">
                                 <label className="text-sm font-bold text-gray-700">Email Address <span className="text-red-500">*</span></label>
                                 <input 
                                     type="email" 
                                     name="email"
                                     value={ticketForm.email}
                                     onChange={handleTicketChange}
                                     required
                                     className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-900 focus:border-orange-400 focus:ring-4 focus:ring-orange-400/10 outline-none transition-all"
                                     placeholder="Your registered email"
                                 />
                             </div>
                             <div className="space-y-1.5">
                                 <label className="text-sm font-bold text-gray-700">Order ID <span className="text-gray-400 font-normal">(Optional)</span></label>
                                 <input 
                                     type="text" 
                                     name="orderId"
                                     value={ticketForm.orderId}
                                     onChange={handleTicketChange}
                                     className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-900 focus:border-orange-400 focus:ring-4 focus:ring-orange-400/10 outline-none transition-all"
                                     placeholder="#ORD-12345"
                                 />
                             </div>
                        </div>

                        {/* Row 2 */}
                        <div className="grid md:grid-cols-2 gap-6">
                             <div className="space-y-1.5">
                                 <label className="text-sm font-bold text-gray-700">Department</label>
                                 <select 
                                     name="department"
                                     value={ticketForm.department}
                                     onChange={handleTicketChange}
                                     className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-900 focus:border-orange-400 focus:ring-4 focus:ring-orange-400/10 outline-none transition-all appearance-none"
                                 >
                                     <option>Technical Support</option>
                                     <option>Billing & Refunds</option>
                                     <option>Sales Inquiry</option>
                                     <option>Partnership</option>
                                 </select>
                             </div>
                             <div className="space-y-1.5">
                                 <label className="text-sm font-bold text-gray-700">Priority</label>
                                 <div className="flex gap-2">
                                     {['Low', 'Medium', 'High'].map(p => (
                                         <button
                                            key={p}
                                            type="button"
                                            onClick={() => setTicketForm({...ticketForm, priority: p})}
                                            className={`flex-1 py-2.5 text-sm font-medium rounded-lg border transition-all ${
                                                ticketForm.priority === p 
                                                ? 'bg-orange-50 border-orange-200 text-orange-700 ring-2 ring-orange-500/20' 
                                                : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                                            }`}
                                         >
                                             {p}
                                         </button>
                                     ))}
                                 </div>
                             </div>
                        </div>

                        <div className="space-y-1.5">
                             <label className="text-sm font-bold text-gray-700">Subject <span className="text-red-500">*</span></label>
                             <input 
                                 type="text" 
                                 name="subject"
                                 value={ticketForm.subject}
                                 onChange={handleTicketChange}
                                 required
                                 className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-900 focus:border-orange-400 focus:ring-4 focus:ring-orange-400/10 outline-none transition-all"
                                 placeholder="Brief summary of the issue"
                             />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-bold text-gray-700">Description <span className="text-red-500">*</span></label>
                            <textarea 
                                name="description"
                                value={ticketForm.description}
                                onChange={handleTicketChange}
                                required
                                rows={4}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-900 focus:border-orange-400 focus:ring-4 focus:ring-orange-400/10 outline-none transition-all resize-none"
                                placeholder="Please describe the issue in detail..."
                            ></textarea>
                        </div>

                        {/* File Upload for Ticket */}
                        <div>
                             <input 
                                type="file" 
                                ref={ticketFileRef} 
                                className="hidden" 
                                onChange={handleTicketFileChange} 
                             />
                             <div className="flex items-center gap-4">
                                 <button 
                                    type="button" 
                                    onClick={handleTicketFileClick}
                                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                                 >
                                     <Paperclip size={16} /> Attach File
                                 </button>
                                 {ticketFile && (
                                     <div className="flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-lg border border-green-100">
                                         <span className="text-xs text-green-700 font-medium truncate max-w-[150px]">{ticketFile.name}</span>
                                         <button onClick={removeTicketFile} className="text-red-500 hover:bg-red-100 rounded p-0.5"><X size={12} /></button>
                                     </div>
                                 )}
                             </div>
                        </div>

                        {/* Footer Actions */}
                        <div className="pt-4 border-t border-gray-100 flex gap-4">
                            <button 
                                type="button" 
                                onClick={() => setShowTicketModal(false)}
                                className="flex-1 py-3.5 rounded-xl border border-gray-200 font-bold text-gray-600 hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit" 
                                className="flex-[2] py-3.5 rounded-xl bg-[#1e2025] hover:bg-black text-white font-bold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                            >
                                <Send size={18} /> Submit Ticket
                            </button>
                        </div>

                     </form>
                </div>
            </div>
        </div>
      )}

      {/* Floating WhatsApp Button */}
      <a href="https://wa.me/918305319636" target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20b858] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center">
          <MessageCircle size={32} fill="white" className="text-white" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-white">1</span>
      </a>

    </div>
  );
};

export default ContactUs;