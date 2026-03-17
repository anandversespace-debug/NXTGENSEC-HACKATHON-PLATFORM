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
        if (!res.ok) throw new Error('System failed to synchronize blog nodes.');
        const data = await res.json();
        
        // Transform MongoDB _id to id
        const transformedData = data.map((b: any) => ({
          ...b,
          id: b._id
        }));
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
    <div className="min-h-screen pt-32 pb-20 px-6 bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        {/* Blog Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-white italic uppercase">Security <span className="text-blue-600">Insights</span></h1>
            <p className="text-gray-400 text-lg leading-relaxed font-medium uppercase tracking-tighter">Deep dives into cryptography, threat intelligence, and secure engineering practices from the NxtGenSec core team.</p>
          </div>
          <div className="flex bg-white/5 border border-white/10 rounded-2xl p-2 w-full md:w-[400px]">
             <input 
              type="text" 
              placeholder="Filter by topic or tech..." 
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
                className="group flex flex-col h-full bg-[#0a0a0a] border border-white/5 hover:border-blue-500/20 transition-all overflow-hidden rounded-2xl"
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
                   <div className="flex items-center space-x-4 mb-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                      <div className="flex items-center space-x-1"><Calendar className="w-3 h-3" /> <span>{new Date(post.createdAt).toLocaleDateString()}</span></div>
                      <span>•</span>
                      <div className="flex items-center space-x-1"><Clock className="w-3 h-3" /> <span>8 MIN READ</span></div>
                   </div>

                   <h3 className="text-xl font-bold mb-4 group-hover:text-blue-400 transition-colors leading-tight text-white">
                     {post.title}
                   </h3>
                   <p className="text-gray-500 text-sm mb-10 line-clamp-2 leading-relaxed">
                     {post.excerpt}
                   </p>

                   <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                     <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-[10px] text-white">
                           {post.author?.name?.[0] || 'A'}
                        </div>
                        <span className="text-xs font-bold text-gray-300 tracking-tight">{post.author?.name || 'Authorized Member'}</span>
                     </div>
                     <Link href={`/blog/${post.id}`} className="p-2 hover:bg-white/10 rounded-lg transition-colors text-blue-500">
                        <ArrowRight className="w-5 h-5" />
                     </Link>
                   </div>
                </div>
              </motion.div>
            ))}
            {blogs.length === 0 && (
               <div className="col-span-full py-20 text-center border border-dashed border-white/5 rounded-2xl">
                  <Bookmark className="w-12 h-12 text-gray-800 mx-auto mb-4 opacity-50" />
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-600 italic">No intelligence reports archived in the network.</p>
               </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
