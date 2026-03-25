import React from 'react';
import { ArrowLeft, Calendar, User, Clock, Share2, Facebook, Twitter, Linkedin, Tag } from 'lucide-react';
import { blogs } from './BlogData';

interface BlogPostProps {
  blogId: string;
  onBack: () => void;
}

const BlogPost: React.FC<BlogPostProps> = ({ blogId, onBack }) => {
  const blog = blogs.find(b => b.id === blogId);

  if (!blog) return <div className="text-center py-20">Blog post not found.</div>;

  return (
    <div className="bg-white animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Progress Bar (Optional Visual) */}
      <div className="h-1 bg-gray-100 w-full sticky top-0 z-50">
         <div className="h-full bg-[#16a34a] w-1/3"></div>
      </div>

      <article className="max-w-4xl mx-auto px-4 md:px-10 py-10 md:py-16">
        
        {/* Navigation */}
        <button 
          onClick={onBack}
          className="group flex items-center gap-2 text-gray-500 hover:text-[#16a34a] transition-colors mb-8 font-medium text-sm"
        >
          <div className="w-8 h-8 rounded-full bg-gray-50 group-hover:bg-[#16a34a] flex items-center justify-center transition-colors">
             <ArrowLeft size={16} className="text-gray-600 group-hover:text-white" />
          </div>
          Back to Blog
        </button>

        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-[#16a34a]/10 px-3 py-1 rounded-full text-[#16a34a] font-bold text-xs uppercase tracking-wider mb-6">
             <Tag size={12} /> {blog.category}
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
            {blog.title}
          </h1>
          
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500 font-medium">
            <span className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full">
                <User size={16} className="text-[#16a34a]" /> {blog.author}
            </span>
            <span className="flex items-center gap-2">
                <Calendar size={16} /> {blog.date}
            </span>
            <span className="flex items-center gap-2">
                <Clock size={16} /> {blog.readTime}
            </span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="rounded-3xl overflow-hidden shadow-2xl mb-12 border border-gray-100 aspect-video relative">
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none"></div>
            <img 
                src={blog.image} 
                alt={blog.title} 
                className="w-full h-full object-cover"
            />
        </div>

        {/* Content Body */}
        <div className="prose prose-lg md:prose-xl max-w-none text-gray-700 leading-relaxed">
           {/* Rendering HTML content safely */}
           <div dangerouslySetInnerHTML={{ __html: blog.content as string }} />
        </div>

        {/* Footer / Share */}
        <div className="mt-16 pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="font-bold text-gray-900">
                Share this article:
            </div>
            <div className="flex gap-4">
                <button className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:scale-110 transition-transform"><Facebook size={18} /></button>
                <button className="w-10 h-10 rounded-full bg-sky-500 text-white flex items-center justify-center hover:scale-110 transition-transform"><Twitter size={18} /></button>
                <button className="w-10 h-10 rounded-full bg-blue-700 text-white flex items-center justify-center hover:scale-110 transition-transform"><Linkedin size={18} /></button>
                <button className="w-10 h-10 rounded-full bg-gray-800 text-white flex items-center justify-center hover:scale-110 transition-transform"><Share2 size={18} /></button>
            </div>
        </div>

      </article>

      {/* Newsletter Signup */}
      <div className="bg-gray-50 py-16 border-t border-gray-200 mt-8">
         <div className="max-w-2xl mx-auto px-4 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Subscribe to our Newsletter</h3>
            <p className="text-gray-600 mb-6">Get the latest guides and software news directly in your inbox.</p>
            <div className="flex gap-2 max-w-md mx-auto">
                <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:border-[#16a34a] focus:ring-2 focus:ring-[#16a34a]/20 outline-none" />
                <button className="bg-[#1e2025] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#16a34a] transition-colors">Subscribe</button>
            </div>
         </div>
      </div>

    </div>
  );
};

export default BlogPost;