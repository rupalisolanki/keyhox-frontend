import React from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import Logo from './Logo';

const Hero: React.FC = () => {
  return (
    <section className="bg-white pb-8 pt-6">
      <div className="max-w-[1440px] mx-auto px-4 md:px-10">
        {/* Main Hero Card */}
        <div className="flex flex-col md:flex-row h-auto md:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
            
            {/* Left Side - Dark with Product Image */}
            <div className="w-full md:w-1/2 bg-[#1e2025] relative flex flex-col items-center justify-center p-8 overflow-hidden group">
               {/* Background Faded Image Pattern */}
               <div className="absolute inset-0 opacity-20 transition-transform duration-700 group-hover:scale-110">
                   <img 
                     src="https://image.api.playstation.com/vulcan/ap/rnd/202311/1717/1d0034a7d65389d4948a60961bd473be3603417730e0085d.png" 
                     alt="Background" 
                     className="w-full h-full object-cover grayscale blur-sm"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-[#1e2025] via-transparent to-transparent"></div>
               </div>

               {/* Main Product Image (Floating) */}
               <div className="relative z-10 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#16a34a]/20 rounded-lg">
                  <img 
                    src="https://image.api.playstation.com/vulcan/ap/rnd/202311/1717/1d0034a7d65389d4948a60961bd473be3603417730e0085d.png" 
                    alt="EA Sports FC 24" 
                    className="w-48 md:w-64 rounded-lg shadow-2xl shadow-black/50"
                  />
               </div>

               {/* Brand Logo at bottom */}
               <div className="absolute bottom-6 z-10">
                  <Logo variant="light" className="opacity-90 scale-75" />
               </div>
            </div>

            {/* Right Side - Colored Brand Panel */}
            <div className="w-full md:w-1/2 bg-[#16a34a] relative flex flex-col items-center justify-center text-center p-8 md:p-12">
               {/* Nav Buttons (Absolute on desktop) */}
               <button className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-white text-[#16a34a] hover:bg-[#1e2025] hover:text-white rounded-r-full items-center justify-center shadow-lg transition-all z-20">
                  <ArrowLeft size={24} />
               </button>
               <button className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-white text-[#16a34a] hover:bg-[#1e2025] hover:text-white rounded-l-full items-center justify-center shadow-lg transition-all z-20">
                  <ArrowRight size={24} />
               </button>

               {/* Content */}
               <div className="max-w-md z-10 relative">
                  <span className="text-white text-sm font-bold tracking-widest uppercase mb-3 block opacity-90">
                    EA Origin - Available Now - Global
                  </span>
                  <h1 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight drop-shadow-sm">
                    EA SPORTS <br/>FC 24
                  </h1>
                  <button className="bg-[#1e2025] text-white px-10 py-4 rounded-lg font-bold hover:bg-black hover:scale-105 transition-all flex items-center gap-2 mx-auto shadow-xl">
                    Buy Now <ArrowRight size={20} />
                  </button>
               </div>

               {/* Pagination Dots */}
               <div className="absolute bottom-8 flex gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-white/40 cursor-pointer hover:bg-white transition-colors"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-white/40 cursor-pointer hover:bg-white transition-colors"></div>
                  <div className="w-10 h-2.5 rounded-full bg-white cursor-pointer shadow-sm"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-white/40 cursor-pointer hover:bg-white transition-colors"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-white/40 cursor-pointer hover:bg-white transition-colors"></div>
               </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;