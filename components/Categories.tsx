import React from 'react';
import { Gamepad2, MonitorPlay, Bot, Gift, SwitchCamera, Crosshair, RefreshCw, Cpu } from 'lucide-react';

const categories = [
  { name: 'STEAM', icon: <Gamepad2 size={40} className="text-gray-400 group-hover:text-[#16a34a] transition-colors" /> },
  { name: 'XBOX', icon: <div className="p-1 rounded-full border-[3px] border-gray-400 group-hover:border-[#16a34a] w-12 h-12 flex items-center justify-center transition-colors"><span className="font-bold text-xl text-gray-400 group-hover:text-[#16a34a] transition-colors">X</span></div> },
  { name: 'PLAYSTATION', icon: <MonitorPlay size={40} className="text-gray-400 group-hover:text-[#16a34a] transition-colors" /> },
  { name: 'RANDOM KEYS', icon: <Gift size={40} className="text-gray-400 group-hover:text-[#16a34a] transition-colors" /> },
  { name: 'AI', icon: <Cpu size={40} className="text-gray-400 group-hover:text-[#16a34a] transition-colors" /> },
  { name: 'NINTENDO', icon: <SwitchCamera size={40} className="text-gray-400 group-hover:text-[#16a34a] transition-colors" /> },
  { name: 'CS SKINS', icon: <Crosshair size={40} className="text-gray-400 group-hover:text-[#16a34a] transition-colors" /> },
  { name: 'SUBSCRIPTIONS', icon: <RefreshCw size={40} className="text-gray-400 group-hover:text-[#16a34a] transition-colors" /> },
];

const Categories: React.FC = () => {
  return (
    <section className="bg-white py-12">
      <div className="max-w-[1440px] mx-auto px-4 md:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
          {categories.map((cat, idx) => (
            <div 
              key={idx} 
              className="group bg-gray-50 rounded-2xl p-4 flex flex-col items-center justify-center gap-3 shadow-sm hover:shadow-lg hover:shadow-[#16a34a]/10 hover:bg-white transition-all cursor-pointer aspect-square hover:-translate-y-1 border border-transparent hover:border-[#16a34a]/20"
            >
              <div className="opacity-80 group-hover:opacity-100 transition-opacity transform group-hover:scale-110 duration-300">
                {cat.icon}
              </div>
              <h3 className="font-bold text-[11px] md:text-xs text-center text-gray-700 group-hover:text-[#16a34a] uppercase tracking-wider transition-colors">
                {cat.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;