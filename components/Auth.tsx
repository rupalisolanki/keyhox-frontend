import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight, Eye, EyeOff, Check, Apple } from 'lucide-react';
import Logo from './Logo';

interface AuthProps {
    onLoginSuccess?: (user: any) => void;
}

const Auth: React.FC<AuthProps> = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value});
    if (error) setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
        // Temp User Logic
        if (formData.email === 'support@keyhox.com' && formData.password === 'keyhox') {
            console.log("Login Successful");
            const userData = {
                name: 'Keyhox Admin',
                email: 'support@keyhox.com',
                phone: '+91 98765 43210',
                joinDate: 'January 2024'
            };
            if (onLoginSuccess) {
                onLoginSuccess(userData);
            }
        } else {
            setError('Invalid email or password. Try support@keyhox.com / keyhox');
        }
    } else {
        // Registration Logic (Mock)
        alert("Registration is currently closed for public. Please contact support.");
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({ name: '', email: '', password: '', confirmPassword: '' }); // Reset form
    setError('');
  };

  return (
    <div className="min-h-[calc(100vh-80px)] md:min-h-screen bg-white flex items-center justify-center p-4 md:p-0 animate-in fade-in duration-500">
      
      <div className="w-full max-w-[1440px] flex flex-col md:flex-row h-full md:min-h-screen overflow-hidden rounded-3xl md:rounded-none shadow-2xl md:shadow-none border border-gray-100 md:border-none">
        
        {/* Left Side - Visuals (Hidden on Mobile) */}
        <div className="hidden md:flex md:w-1/2 bg-[#1e2025] relative items-center justify-center p-16 text-white overflow-hidden">
             {/* Background Effects */}
             <div className="absolute inset-0">
                <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] bg-[#16a34a]/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-600/10 rounded-full blur-3xl"></div>
                <svg className="absolute inset-0 w-full h-full opacity-[0.05]" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0 100 C 20 0 50 0 100 100 Z" fill="#fff" />
                </svg>
             </div>

             <div className="relative z-10 max-w-lg">
                 <div className="mb-12 transform hover:scale-105 transition-transform duration-500 origin-left">
                     <Logo variant="light" className="scale-110" />
                 </div>
                 
                 <h2 className="text-5xl font-black mb-6 leading-tight">
                    {isLogin ? "Welcome Back to" : "Join the Future of"} <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#16a34a] to-emerald-400">
                        Digital Software
                    </span>
                 </h2>
                 
                 <p className="text-gray-400 text-lg mb-10 leading-relaxed">
                    Access premium software keys, instant delivery, and 24/7 support. 
                    Join over <span className="text-white font-bold">70,000+</span> happy customers today.
                 </p>

                 <div className="space-y-4">
                     {[
                         "Instant Digital Delivery",
                         "100% Official Licenses",
                         "Secure Encrypted Payments",
                         "24/7 Customer Support"
                     ].map((item, idx) => (
                         <div key={idx} className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl backdrop-blur-sm border border-white/5 hover:bg-white/10 transition-colors">
                             <div className="w-8 h-8 rounded-full bg-[#16a34a] flex items-center justify-center shrink-0">
                                 <Check size={16} strokeWidth={3} />
                             </div>
                             <span className="font-medium">{item}</span>
                         </div>
                     ))}
                 </div>
             </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-6 md:p-16 relative">
             <div className="w-full max-w-md">
                 
                 {/* Mobile Logo */}
                 <div className="md:hidden flex justify-center mb-8">
                     <Logo />
                 </div>

                 {/* Header */}
                 <div className="text-center mb-10">
                     <h2 className="text-3xl font-bold text-gray-900 mb-2">{isLogin ? "Sign In" : "Create Account"}</h2>
                     <p className="text-gray-500 text-sm">
                         {isLogin ? "Enter your email and password to access your account." : "Get started with your free account today."}
                     </p>
                 </div>

                 {/* Social Auth */}
                 <div className="grid grid-cols-2 gap-4 mb-8">
                     <button className="flex items-center justify-center gap-2 border border-gray-200 p-3 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all group">
                         <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                         <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900">Google</span>
                     </button>
                     <button className="flex items-center justify-center gap-2 border border-gray-200 p-3 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all group">
                         <Apple size={20} className="text-gray-900" />
                         <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900">Apple</span>
                     </button>
                 </div>

                 <div className="relative mb-8">
                     <div className="absolute inset-0 flex items-center">
                         <div className="w-full border-t border-gray-100"></div>
                     </div>
                     <div className="relative flex justify-center text-sm">
                         <span className="px-4 bg-white text-gray-400 font-medium">Or continue with email</span>
                     </div>
                 </div>

                 {/* Form */}
                 <form onSubmit={handleSubmit} className="space-y-5">
                     
                     {!isLogin && (
                         <div className="group">
                             <label className="block text-sm font-bold text-gray-700 mb-1.5 ml-1">Full Name</label>
                             <div className="relative">
                                 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#16a34a] transition-colors">
                                     <User size={20} />
                                 </div>
                                 <input 
                                     type="text" 
                                     name="name"
                                     value={formData.name}
                                     onChange={handleChange}
                                     placeholder="John Doe" 
                                     className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#16a34a] focus:ring-4 focus:ring-[#16a34a]/10 outline-none transition-all font-medium text-gray-900 placeholder-gray-400"
                                     required={!isLogin}
                                 />
                             </div>
                         </div>
                     )}

                     <div className="group">
                         <label className="block text-sm font-bold text-gray-700 mb-1.5 ml-1">Email Address</label>
                         <div className="relative">
                             <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#16a34a] transition-colors">
                                 <Mail size={20} />
                             </div>
                             <input 
                                 type="email" 
                                 name="email"
                                 value={formData.email}
                                 onChange={handleChange}
                                 placeholder="name@example.com" 
                                 className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#16a34a] focus:ring-4 focus:ring-[#16a34a]/10 outline-none transition-all font-medium text-gray-900 placeholder-gray-400"
                                 required
                             />
                         </div>
                     </div>

                     <div className="group">
                         <label className="block text-sm font-bold text-gray-700 mb-1.5 ml-1">Password</label>
                         <div className="relative">
                             <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#16a34a] transition-colors">
                                 <Lock size={20} />
                             </div>
                             <input 
                                 type={showPassword ? "text" : "password"} 
                                 name="password"
                                 value={formData.password}
                                 onChange={handleChange}
                                 placeholder="••••••••" 
                                 className="w-full pl-11 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#16a34a] focus:ring-4 focus:ring-[#16a34a]/10 outline-none transition-all font-medium text-gray-900 placeholder-gray-400"
                                 required
                             />
                             <button 
                                type="button" 
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer transition-colors"
                             >
                                 {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                             </button>
                         </div>
                     </div>

                     {!isLogin && (
                         <div className="group">
                             <label className="block text-sm font-bold text-gray-700 mb-1.5 ml-1">Confirm Password</label>
                             <div className="relative">
                                 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#16a34a] transition-colors">
                                     <Lock size={20} />
                                 </div>
                                 <input 
                                     type="password"
                                     name="confirmPassword"
                                     value={formData.confirmPassword}
                                     onChange={handleChange}
                                     placeholder="••••••••" 
                                     className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#16a34a] focus:ring-4 focus:ring-[#16a34a]/10 outline-none transition-all font-medium text-gray-900 placeholder-gray-400"
                                     required={!isLogin}
                                 />
                             </div>
                         </div>
                     )}
                     
                     {error && (
                         <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-red-500 text-sm font-bold text-center animate-in fade-in slide-in-from-top-2">
                             {error}
                         </div>
                     )}

                     {isLogin && (
                         <div className="flex items-center justify-between text-sm">
                             <label className="flex items-center gap-2 cursor-pointer group">
                                 <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#16a34a] focus:ring-[#16a34a] cursor-pointer" />
                                 <span className="text-gray-500 group-hover:text-gray-700 transition-colors">Remember me</span>
                             </label>
                             <a href="#" className="font-bold text-[#16a34a] hover:text-[#15803d] transition-colors">Forgot Password?</a>
                         </div>
                     )}

                     <button className="w-full bg-[#1e2025] hover:bg-[#16a34a] text-white font-bold py-4 rounded-xl transition-all shadow-xl hover:shadow-[#16a34a]/20 flex items-center justify-center gap-2 text-lg group">
                         {isLogin ? "Sign In" : "Create Account"}
                         <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                     </button>
                 </form>

                 {/* Toggle Mode */}
                 <div className="mt-8 text-center">
                     <p className="text-gray-500">
                         {isLogin ? "Don't have an account?" : "Already have an account?"} {' '}
                         <button 
                            onClick={toggleMode}
                            className="font-bold text-[#16a34a] hover:text-[#15803d] hover:underline transition-all"
                         >
                             {isLogin ? "Register Now" : "Login Here"}
                         </button>
                     </p>
                 </div>

             </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;