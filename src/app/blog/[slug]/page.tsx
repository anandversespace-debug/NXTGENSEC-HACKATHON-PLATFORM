'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Calendar, User as UserIcon, ArrowLeft, Bookmark, Share2, MessageCircle, Send, Shield } from 'lucide-react';
import Link from 'next/link';

interface Comment {
  _id: string;
  user: {
    name: string;
  };
  content: string;
  createdAt: string;
}

const BlogDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const res = await fetch(`${baseUrl}/blogs/${params.slug}`);
        if (!res.ok) throw new Error('Blog entry not found in archive.');
        const data = await res.json();
        setBlog(data);
      } catch (err) {
        console.error('Failed to fetch blog detail:', err);
        router.push('/blog');
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [params.slug, router]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    // Placeholder for backend comment integration
    const comment = {
      _id: Date.now().toString(),
      user: { name: 'Anonymous Entity' },
      content: newComment,
      createdAt: new Date().toISOString()
    };
    
    setBlog((prev: any) => prev ? { ...prev, comments: [comment, ...(prev.comments || [])] } : null);
    setNewComment('');
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505]">
      <div className="w-12 h-12 bg-blue-600 rounded flex items-center justify-center animate-pulse shadow-2xl shadow-blue-500/20">
         <Shield className="w-6 h-6 text-white animate-spin" />
      </div>
    </div>
  );

  if (!blog) return null;

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 bg-[#050505]">
      <div className="max-w-4xl mx-auto">
        <Link href="/blog" className="flex items-center space-x-2 text-gray-500 hover:text-white transition-colors mb-12 group uppercase tracking-widest text-[10px] font-black italic">
           <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
           <span className="font-bold">Back to Insights Register</span>
        </Link>

        {/* Article Header */}
        <header className="mb-12">
           <span className="inline-block px-3 py-1 bg-blue-500/10 text-blue-400 text-[10px] font-black rounded mb-6 border border-blue-500/20 uppercase tracking-widest italic">{blog.category}</span>
           <h1 className="text-4xl md:text-5xl font-black mb-8 leading-tight text-white uppercase italic tracking-tighter">{blog.title}</h1>
           
           <div className="flex items-center justify-between py-6 border-y border-white/5">
              <div className="flex items-center space-x-4">
                 <div className="w-12 h-12 rounded bg-[#0c0c0c] border border-white/10 flex items-center justify-center font-black text-blue-500 text-lg italic uppercase">
                    {blog.author?.name?.[0] || 'U'}
                 </div>
                 <div>
                    <p className="text-[11px] font-black text-white uppercase tracking-tighter italic">{blog.author?.name || 'Anonymous Researcher'}</p>
                    <p className="text-[9px] text-gray-600 font-bold uppercase tracking-widest">Security Node: {blog.author?.role || 'Contributor'}</p>
                 </div>
              </div>
              <div className="flex items-center space-x-6">
                 <div className="hidden md:flex items-center space-x-2 text-[10px] text-gray-600 font-black uppercase tracking-widest">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                 </div>
                 <div className="flex items-center space-x-2">
                    <button className="p-2 hover:bg-white/5 rounded-lg transition-colors"><Bookmark className="w-5 h-5 text-gray-700" /></button>
                    <button className="p-2 hover:bg-white/5 rounded-lg transition-colors"><Share2 className="w-5 h-5 text-gray-700" /></button>
                 </div>
              </div>
           </div>
        </header>

        {/* Article Body */}
        <div className="mb-20">
           {blog.image && (
             <div className="relative group overflow-hidden rounded-2xl mb-12 border border-white/5 shadow-2xl">
                <img src={blog.image} className="w-full aspect-video object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700" alt="" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-50"></div>
             </div>
           )}
           <article className="prose prose-invert max-w-none text-gray-500 text-lg leading-relaxed font-bold uppercase tracking-tighter">
              <p className="mb-8">{blog.content}</p>
              <div className="bg-[#0c0c0c] border border-white/5 p-10 rounded-3xl relative overflow-hidden group mb-12">
                 <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
                    <Shield className="w-32 h-32" />
                 </div>
                 <h3 className="text-xl font-black italic uppercase tracking-tight text-white mb-6">Abstract: Cyber-Ecosystem Resilience</h3>
                 <p className="text-[13px] leading-relaxed text-gray-400">The integration of zero-trust architecture is no longer optional in the current threat landscape. As we scale decentralized applications, the surface area for potential exploits increases exponentially. Developers must prioritize cryptographic verification at every touchpoint.</p>
              </div>
              <h3 className="text-white text-2xl font-black italic uppercase tracking-tight mb-6">Key Engineering Strategies</h3>
              <ul className="list-disc pl-6 space-y-4 mb-12 text-[14px]">
                 <li>Hardware Security Module (HSM) based key derivation for sub-milli latency verification</li>
                 <li>End-to-end identity rotation via ZK-proofs across distributed node network</li>
                 <li>Heuristic-based rate limiting on sensitive API endpoints utilizing tokenized traffic</li>
              </ul>
              <div className="bg-blue-600/5 border border-blue-600/20 rounded-2xl p-8 italic text-blue-500 font-black text-center uppercase tracking-widest scale-95 group-hover:scale-100 transition-transform">
                 "Security is not a feature, it is a foundation. Without trust, the ecosystem cannot scale to the next billion nodes."
              </div>
           </article>
        </div>

        {/* Comment Section */}
        <section className="pt-12 border-t border-white/5">
           <h3 className="text-xl font-black italic uppercase tracking-tight text-white mb-10 flex items-center space-x-3">
              <MessageCircle className="w-6 h-6 text-blue-500" />
              <span>Discussion Archive ({blog.comments?.length || 0})</span>
           </h3>

           <form onSubmit={handleCommentSubmit} className="mb-12">
              <div className="relative group">
                 <textarea 
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Broadcast your technical perspective to the network..."
                  className="w-full bg-[#0c0c0c] border border-white/10 rounded-2xl p-8 min-h-[140px] text-white focus:outline-none focus:border-blue-500/30 transition-all resize-none text-xs font-bold uppercase tracking-widest placeholder:text-gray-800"
                 />
                 <button 
                  type="submit"
                  className="absolute bottom-6 right-6 p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-500 transition-all shadow-xl shadow-blue-900/20"
                 >
                    <Send className="w-5 h-5" />
                 </button>
              </div>
           </form>

           <div className="space-y-6">
              {(blog.comments || []).map((comment: any) => (
                <motion.div 
                   key={comment._id}
                   initial={{ opacity: 0, x: -10 }}
                   animate={{ opacity: 1, x: 0 }}
                   className="p-8 bg-[#0c0c0c] border border-white/5 rounded-2xl hover:border-blue-500/10 transition-colors group"
                >
                   <div className="flex items-center justify-between mb-4">
                      <p className="text-[10px] font-black text-white uppercase tracking-widest italic group-hover:text-blue-500 transition-colors">:: {comment.user?.name || 'Anonymous User'}</p>
                      <p className="text-[9px] text-gray-700 font-bold uppercase tracking-widest">{new Date(comment.createdAt).toLocaleDateString()}</p>
                   </div>
                   <p className="text-gray-500 text-[11px] font-bold uppercase tracking-tight leading-snug">{comment.content}</p>
                </motion.div>
              ))}
              {(blog.comments || []).length === 0 && (
                <div className="text-center py-10 opacity-20">
                   <p className="text-[9px] font-black uppercase tracking-[0.4em]">Discussion node offline</p>
                </div>
              )}
           </div>
        </section>
      </div>
    </div>
  );
};

export default BlogDetailPage;
