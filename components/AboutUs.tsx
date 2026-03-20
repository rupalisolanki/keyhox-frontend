import React from 'react';
import { Target, Globe, ShieldCheck, Zap, Server, Users, Mail, MapPin, Award, Layers } from 'lucide-react';

const AboutUs: React.FC = () => {
  return (
    <div className="bg-white animate-in fade-in duration-500">
      
      {/* Hero Section */}
      <section className="relative bg-[#1e2025] text-white py-20 md:py-32 overflow-hidden">
        {/* Abstract Background Pattern */}
        <div className="absolute inset-0 opacity-10">
            <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0 100 C 20 0 50 0 100 100 Z" fill="#16a34a" />
            </svg>
        </div>
        
        <div className="max-w-[1440px] mx-auto px-4 md:px-10 relative z-10 text-center md:text-left">
            <div className="max-w-3xl">
                <span className="text-[#16a34a] font-bold tracking-widest uppercase text-sm mb-4 block">Est. 2024 • India Based • Global Reach</span>
                <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                    Empowering Your <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#16a34a] to-green-400">Digital World</span>
                </h1>
                <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl">
                    Welcome to Keyhox — your trusted global destination for modern software solutions. 
                    We bridge the gap between premium technology and accessibility.
                </p>
            </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 md:px-10">
            <div className="flex flex-col md:flex-row gap-12 items-center">
                <div className="w-full md:w-1/2">
                    <div className="relative">
                        <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#16a34a]/10 rounded-full blur-xl"></div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 relative z-10">Who We Are</h2>
                        <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                            Keyhox is an India-based digital distribution platform founded in 2024 with a singular vision: providing reliable, accessible, and efficient software solutions to customers worldwide.
                        </p>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            We specialize in delivering a wide range of digital software products and subscriptions designed to support individuals, professionals, and businesses in today’s technology-driven world. Our platform operates entirely online, allowing customers from across the globe to access digital products conveniently, securely, and instantly.
                        </p>
                    </div>
                </div>
                <div className="w-full md:w-1/2 grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-center hover:shadow-lg transition-shadow">
                        <Users size={32} className="text-[#16a34a] mx-auto mb-3" />
                        <h4 className="font-bold text-gray-900">Customer First</h4>
                        <p className="text-sm text-gray-500 mt-1">Dedicated to your satisfaction</p>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-center hover:shadow-lg transition-shadow">
                        <ShieldCheck size={32} className="text-[#16a34a] mx-auto mb-3" />
                        <h4 className="font-bold text-gray-900">100% Secure</h4>
                        <p className="text-sm text-gray-500 mt-1">Safe & encrypted platform</p>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-center hover:shadow-lg transition-shadow">
                        <Zap size={32} className="text-[#16a34a] mx-auto mb-3" />
                        <h4 className="font-bold text-gray-900">Instant Access</h4>
                        <p className="text-sm text-gray-500 mt-1">Digital delivery in minutes</p>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-center hover:shadow-lg transition-shadow">
                        <Globe size={32} className="text-[#16a34a] mx-auto mb-3" />
                        <h4 className="font-bold text-gray-900">Global Reach</h4>
                        <p className="text-sm text-gray-500 mt-1">Serving worldwide</p>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-24 bg-gray-50 border-y border-gray-100">
        <div className="max-w-[1440px] mx-auto px-4 md:px-10">
            <div className="grid md:grid-cols-2 gap-8 md:gap-16">
                {/* Mission */}
                <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Target size={120} className="text-[#16a34a]" />
                    </div>
                    <div className="relative z-10">
                        <div className="w-14 h-14 bg-[#16a34a]/10 rounded-xl flex items-center justify-center text-[#16a34a] mb-6">
                            <Target size={28} />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            Our mission is to simplify access to essential digital tools by providing a seamless and dependable platform where customers can discover and obtain software solutions with confidence.
                        </p>
                        <p className="text-gray-600 leading-relaxed font-medium">
                            We are committed to building a trusted global brand that focuses on customer satisfaction, service reliability, and long-term value.
                        </p>
                    </div>
                </div>

                {/* Vision */}
                <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Award size={120} className="text-[#16a34a]" />
                    </div>
                    <div className="relative z-10">
                        <div className="w-14 h-14 bg-[#16a34a]/10 rounded-xl flex items-center justify-center text-[#16a34a] mb-6">
                            <Award size={28} />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            Our vision is to become a globally recognized digital software distribution platform known for reliability, professionalism, and customer-focused service.
                        </p>
                        <p className="text-gray-600 leading-relaxed font-medium">
                            We aim to grow Keyhox into a trusted name in the digital software industry by consistently delivering value and maintaining strong customer relationships.
                        </p>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 md:px-10">
            <div className="text-center mb-16">
                <span className="text-[#16a34a] font-bold uppercase tracking-widest text-sm">Our Offerings</span>
                <h2 className="text-3xl md:text-5xl font-black text-gray-900 mt-2">What We Do</h2>
                <div className="w-20 h-1.5 bg-[#16a34a] mx-auto mt-6 rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {[
                    { title: "OS & Productivity", icon: <Layers size={24} />, desc: "Latest Operating Systems and office productivity tools to keep you working efficiently." },
                    { title: "Security Solutions", icon: <ShieldCheck size={24} />, desc: "Top-tier antivirus and security software to protect your digital life." },
                    { title: "Business Applications", icon: <Server size={24} />, desc: "Professional grade software for creative, business, and utility needs." },
                    { title: "Cloud Subscriptions", icon: <Globe size={24} />, desc: "Seamless access to modern cloud-based services and subscriptions." },
                    { title: "Global Delivery", icon: <Zap size={24} />, desc: "All products delivered digitally ensuring fast processing for everyone." },
                    { title: "24/7 Support", icon: <Users size={24} />, desc: "Dedicated support team to assist you whenever you need help." }
                ].map((item, idx) => (
                    <div key={idx} className="group p-8 rounded-2xl border border-gray-100 hover:border-[#16a34a] hover:shadow-xl hover:shadow-[#16a34a]/5 transition-all duration-300 bg-white">
                        <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-600 group-hover:bg-[#16a34a] group-hover:text-white transition-colors mb-6">
                            {item.icon}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                        <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Global Approach Banner */}
      <section className="py-16 md:py-24 bg-[#1e2025] relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/World_map_blank_without_borders.svg/2000px-World_map_blank_without_borders.svg.png')] opacity-5 bg-center bg-no-repeat bg-contain pointer-events-none"></div>
          
          <div className="max-w-[1440px] mx-auto px-4 md:px-10 relative z-10 text-center">
              <div className="max-w-3xl mx-auto">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Our Global Approach</h2>
                  <p className="text-gray-400 text-lg leading-relaxed mb-10">
                      Although Keyhox is based in India, our services are designed for a worldwide audience. 
                      Our digital infrastructure enables secure transactions, efficient delivery, and reliable customer communication globally, 
                      providing a smooth experience regardless of your location.
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-gray-800 pt-10">
                      <div>
                          <div className="text-[#16a34a] font-black text-4xl mb-1">2024</div>
                          <div className="text-gray-500 text-sm uppercase tracking-wider">Founded</div>
                      </div>
                      <div>
                          <div className="text-[#16a34a] font-black text-4xl mb-1">100%</div>
                          <div className="text-gray-500 text-sm uppercase tracking-wider">Digital</div>
                      </div>
                      <div>
                          <div className="text-[#16a34a] font-black text-4xl mb-1">24/7</div>
                          <div className="text-gray-500 text-sm uppercase tracking-wider">Support</div>
                      </div>
                      <div>
                          <div className="text-[#16a34a] font-black text-4xl mb-1">Global</div>
                          <div className="text-gray-500 text-sm uppercase tracking-wider">Coverage</div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 md:px-10">
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center md:text-left flex flex-col md:flex-row items-center gap-10">
                <div className="flex-1">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Get in Touch</h2>
                    <p className="text-gray-600 mb-8">
                        If you have any questions, business inquiries, or support requests, we are here to help.
                    </p>
                    
                    <div className="space-y-4">
                        <div className="flex items-center justify-center md:justify-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-[#16a34a]/10 flex items-center justify-center text-[#16a34a]">
                                <Mail size={20} />
                            </div>
                            <div className="text-left">
                                <div className="text-xs text-gray-500 uppercase font-bold">Business Email</div>
                                <a href="mailto:support@keyhox.com" className="text-gray-900 font-medium hover:text-[#16a34a]">support@keyhox.com</a>
                            </div>
                        </div>

                         <div className="flex items-center justify-center md:justify-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-[#16a34a]/10 flex items-center justify-center text-[#16a34a]">
                                <MapPin size={20} />
                            </div>
                            <div className="text-left">
                                <div className="text-xs text-gray-500 uppercase font-bold">Location</div>
                                <span className="text-gray-900 font-medium">India (Serving Worldwide)</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-auto bg-[#1e2025] p-8 rounded-2xl text-white min-w-[300px] text-center">
                    <div className="text-sm text-gray-400 uppercase tracking-widest mb-2">Need Help?</div>
                    <div className="text-2xl font-bold mb-6">Contact Support</div>
                    <button className="bg-[#16a34a] hover:bg-[#15803d] text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg hover:shadow-[#16a34a]/20 w-full">
                        Contact Us
                    </button>
                </div>
            </div>
        </div>
      </section>

    </div>
  );
};

export default AboutUs;