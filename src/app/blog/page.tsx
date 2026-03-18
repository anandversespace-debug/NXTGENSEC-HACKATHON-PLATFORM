'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, Bookmark, Search, Clock } from 'lucide-react';
import Link from 'next/link';

interface BlogEntry {
  id: string;
  _id?: string;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  image: string;
  author: {
    name: string;
    username: string;
  };
  createdAt: string;
}

const BlogPage = () => {
  const [blogs, setBlogs] = useState<BlogEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const res = await fetch(`${baseUrl}/blogs`);
        if (!res.ok) throw new Error('Failed to load blog posts.');
        const data = await res.json();
        
        // Transform MongoDB _id to id
        const transformedData = Array.isArray(data) ? data.map((b: any) => ({
          ...b,
          id: b._id
        })) : [];
        setBlogs(transformedData);
      } catch (err) {
        console.error('Failed to fetch blogs:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 bg-[#050505] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Blog Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl text-left">
            <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-white italic uppercase">Platform <span className="text-blue-600">Blog</span></h1>
            <p className="text-gray-400 text-xs md:text-sm leading-relaxed font-bold uppercase tracking-widest text-left">Latest news, updates, and articles about software security and our community events.</p>
          </div>
          <div className="flex bg-white/5 border border-white/10 rounded-2xl p-2 w-full md:w-[400px]">
             <input 
              type="text" 
              placeholder="Search by topic..." 
              className="bg-transparent border-none focus:outline-none px-4 py-2 flex-grow text-white text-sm"
             />
             <button className="bg-blue-600 p-3 rounded-xl hover:bg-blue-500 transition-colors">
                <Search className="w-5 h-5" />
             </button>
          </div>
        </div>

        {/* Blog Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-[450px] animate-pulse bg-white/5 rounded-2xl border border-white/5"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {blogs.map((post, idx) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group flex flex-col h-full bg-[#0c0c0c] border border-white/5 hover:border-blue-500/20 transition-all overflow-hidden rounded-2xl text-left shadow-2xl"
              >
                <div className="aspect-video relative overflow-hidden">
                   {post.image ? (
                     <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" 
                     />
                   ) : (
                     <div className="w-full h-full bg-blue-900/10 flex items-center justify-center">
                        <Bookmark className="w-10 h-10 text-blue-500/20" />
                     </div>
                   )}
                   <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-tighter rounded-lg border border-white/10">
                         {post.category}
                      </span>
                   </div>
                </div>

                <div className="p-8 flex flex-col flex-grow">
                   <div className="flex items-center space-x-4 mb-6 text-[10px] font-bold text-gray-700 uppercase tracking-widest italic">
                      <div className="flex items-center space-x-1"><Calendar className="w-3.5 h-3.5" /> <span>{new Date(post.createdAt).toLocaleDateString()}</span></div>
                      <span>•</span>
                      <div className="flex items-center space-x-1"><Clock className="w-3.5 h-3.5" /> <span>Article</span></div>
                   </div>

                   <h3 className="text-xl font-bold mb-4 group-hover:text-blue-400 transition-colors leading-tight text-white uppercase italic tracking-tighter">
                     {post.title}
                   </h3>
                   <p className="text-gray-500 text-[11px] mb-10 line-clamp-3 leading-relaxed font-medium">
                     {post.excerpt}
                   </p>

                   <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                     <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-[10px] text-white">
                           {post.author?.name?.[0] || 'A'}
                        </div>
                        <span className="text-[10px] font-black text-gray-400 tracking-widest uppercase italic">{post.author?.name || 'Authorized Member'}</span>
                     </div>
                     <Link href={`/blog/${post.id}`} className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-blue-500 transition-all transform group-hover:translate-x-1">
                        <ArrowRight className="w-4 h-4" />
                     </Link>
                   </div>
                </div>
              </motion.div>
            ))}
            {blogs.length === 0 && (
               <div className="col-span-full py-24 text-center border-2 border-dashed border-white/5 rounded-3xl bg-white/[0.01]">
                  <Bookmark className="w-16 h-16 text-gray-800 mx-auto mb-6 opacity-30" />
                  <h3 className="text-lg font-black italic text-white uppercase tracking-tight mb-2">No Posts Found</h3>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-600 italic">We haven&apos;t published any articles yet. Check back soon!</p>
               </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
