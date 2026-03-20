import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const reviews = [
    {
      id: 1,
      name: "Gaurav K.",
      role: "Happy Client",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Gaurav&backgroundColor=c0aede",
      text: "Service and product on time and they are not on to customer to buy product which is very good think unlike other sales source.",
      rating: 5
    },
    {
      id: 2,
      name: "Sarah Jenkins",
      role: "Verified Buyer",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah&backgroundColor=b6e3f4",
      text: "Instant delivery as promised! I was skeptical at first but the key worked perfectly for Windows 11 Pro. Will definitely buy again.",
      rating: 5
    },
    {
      id: 3,
      name: "Michael Chen",
      role: "Software Engineer",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael&backgroundColor=ffdfbf",
      text: "Great prices for legitimate software. The support team helped me through the installation process when I got stuck. Highly recommended.",
      rating: 4
    },
    {
      id: 4,
      name: "Emily Davis",
      role: "Creative Director",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily&backgroundColor=ffdfbf",
      text: "The checkout process was seamless and secure. I appreciate the variety of payment options available. Top notch service!",
      rating: 5
    }
  ];

  const nextReview = () => {
    setActiveIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(nextReview, 6000);
    return () => clearInterval(timer);
  }, []);

  const currentReview = reviews[activeIndex];

  return (
    <section className="bg-gray-50 py-10 md:py-16 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
                  </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-10 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
            <h3 className="text-[#16a34a] font-black uppercase tracking-widest text-sm mb-2">Testimonials</h3>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">Customer Reviews</h2>
            <div className="w-20 h-1.5 bg-[#16a34a] mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Carousel Container */}
        <div className="relative px-4 md:px-16">
            
            {/* Desktop Navigation Buttons */}
            <button 
                onClick={prevReview}
                className="absolute left-0 top-1/2 -translate-y-1/2 hidden md:flex w-12 h-12 rounded-full bg-white border border-gray-100 shadow-xl text-gray-400 hover:text-[#16a34a] hover:scale-110 transition-all items-center justify-center z-20 group"
                aria-label="Previous review"
            >
                <ChevronLeft size={24} className="group-hover:-translate-x-0.5 transition-transform" />
            </button>

            <button 
                onClick={nextReview}
                className="absolute right-0 top-1/2 -translate-y-1/2 hidden md:flex w-12 h-12 rounded-full bg-white border border-gray-100 shadow-xl text-gray-400 hover:text-[#16a34a] hover:scale-110 transition-all items-center justify-center z-20 group"
                aria-label="Next review"
            >
                <ChevronRight size={24} className="group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Main Review Card */}
            <div className="bg-white rounded-[2rem] p-6 md:p-10 shadow-2xl shadow-gray-200/60 border border-gray-100 text-center relative transition-all duration-500">
                
                {/* Floating Quote Badge - Compact */}
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#16a34a] text-white p-3 rounded-full shadow-lg ring-4 ring-white">
                    <Quote size={20} fill="currentColor" strokeWidth={0} />
                </div>

                <div className="mt-4 flex flex-col items-center animate-in fade-in zoom-in-95 duration-500" key={activeIndex}>
                    
                    {/* Avatar with Ring - Slightly smaller */}
                    <div className="relative mb-6 group">
                        <div className="absolute inset-0 bg-[#16a34a]/20 rounded-full blur-xl group-hover:blur-2xl transition-all opacity-50"></div>
                        <img 
                            src={currentReview.image} 
                            alt={currentReview.name} 
                            className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover bg-gray-50 border-4 border-white shadow-lg relative z-10"
                        />
                    </div>

                    {/* Star Rating - Compact */}
                    <div className="flex gap-1 mb-6 bg-gray-50 px-3 py-1.5 rounded-full">
                        {[...Array(5)].map((_, i) => (
                            <Star 
                                key={i} 
                                size={16} 
                                className={`${i < currentReview.rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`} 
                            />
                        ))}
                    </div>

                    {/* Review Text */}
                    <p className="text-gray-600 text-lg md:text-xl font-medium leading-relaxed mb-6 max-w-3xl">
                        "{currentReview.text}"
                    </p>

                    {/* Divider */}
                    <div className="w-12 h-px bg-gray-200 mb-4"></div>

                    {/* Author Info */}
                    <div className="space-y-0.5">
                        <h4 className="font-bold text-gray-900 text-lg">{currentReview.name}</h4>
                        <p className="text-[#16a34a] font-bold text-xs uppercase tracking-widest">{currentReview.role}</p>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation / Indicators */}
            <div className="flex justify-center items-center gap-3 mt-6 md:mt-8">
                <button onClick={prevReview} className="md:hidden p-2 text-gray-400"><ChevronLeft /></button>
                <div className="flex gap-2">
                    {reviews.map((_, idx) => (
                        <button 
                            key={idx}
                            onClick={() => setActiveIndex(idx)}
                            className={`transition-all duration-300 rounded-full ${activeIndex === idx ? 'bg-[#16a34a] w-6 h-1.5' : 'bg-gray-300 w-1.5 h-1.5 hover:bg-gray-400'}`}
                            aria-label={`Go to review ${idx + 1}`}
                        />
                    ))}
                </div>
                <button onClick={nextReview} className="md:hidden p-2 text-gray-400"><ChevronRight /></button>
            </div>

        </div>
      </div>
    </section>
  );
};

export default Testimonials;