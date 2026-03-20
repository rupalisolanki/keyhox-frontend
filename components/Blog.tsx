import React from 'react';
import { Calendar, User, ArrowRight, BookOpen } from 'lucide-react';
import { blogs } from './BlogData';

interface BlogProps {
  onReadMore: (id: string) => void;
}

const Blog: React.FC<BlogProps> = ({ onReadMore }) => {
  return (
    <div className="bg-white animate-in fade-in duration-500">
      
      {/* Blog Hero */}
      <div className="bg-[#1e2025] text-white py-16 md:py-24 relative overflow-hidden">
         <div className="absolute inset-0 opacity-5">
            <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0 100 C 20 0 50 0 100 100 Z" fill="#16a34a" />
            </svg>
        </div>
        <div className="max-w-[1440px] mx-auto px-4 md:px-10 relative z-10 text-center">
             <div className="inline-flex items-center gap-2 bg-[#16a34a]/10 border border-[#16a34a]/20 px-4 py-1.5 rounded-full text-[#16a34a] font-bold text-sm mb-6">
                <BookOpen size={16} /> Keyhox Blog
             </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4">Latest Tech Insights</h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Guides, tutorials, and news about software, security, and digital productivity.
            </p>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-10 py-16 md:py-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-10">
          {blogs.map((blog) => (
            <div 
              key={blog.id} 
              className="group bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-2xl hover:shadow-[#16a34a]/10 transition-all duration-300 flex flex-col h-full hover:-translate-y-1 cursor-pointer"
              onClick={() => onReadMore(blog.id)}
            >
              {/* Image Container */}
              <div className="h-64 overflow-hidden relative">
                <img 
                  src={blog.image} 
                  alt={blog.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#16a34a] uppercase tracking-wide">
                  {blog.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-4 font-medium">
                  <span className="flex items-center gap-1.5"><User size={14} /> {blog.author}</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <span className="flex items-center gap-1.5"><Calendar size={14} /> {blog.date}</span>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#16a34a] transition-colors leading-tight">
                  {blog.title}
                </h2>
                
                <p className="text-gray-600 line-clamp-3 mb-6 leading-relaxed">
                  {blog.excerpt}
                </p>

                <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                  <span className="text-xs text-gray-400 font-medium">{blog.readTime}</span>
                  <span className="text-[#16a34a] font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                    Read Article <ArrowRight size={16} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;