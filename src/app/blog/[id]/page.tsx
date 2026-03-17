'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowLeft, Bookmark, Share2, MessageCircle, Send } from 'lucide-react';
import { BlogEntry } from '@/store/useAppStore';
import Link from 'next/link';

interface Comment {
  id: string;
  user_name: string;
  content: string;
  created_at: string;
}

const BlogDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState<(BlogEntry & { comments: Comment[] }) | null>(null);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/blogs/${params.id}`);
        if (!res.ok) throw new Error('Blog not found');
        const data = await res.json();
        setBlog(data);
      } catch (err) {
        console.error(err);
        router.push('/blog');
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [params.id, router]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    // Implementation would call backend POST /api/blogs/comment
    const comment = {
      id: Date.now().toString(),
      user_name: 'Anonymized Dev',
      content: newComment,
      created_at: new Date().toISOString()
    };
    
    setBlog(prev => prev ? { ...prev, comments: [comment, ...prev.comments] } : null);
    setNewComment('');
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505]">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (!blog) return null;

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/blog" className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors mb-12 group">
           <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
           <span className="font-medium text-sm">Back to Insights</span>
        </Link>

        {/* Article Header */}
        <header className="mb-12">
           <span className="inline-block px-3 py-1 bg-blue-500/10 text-blue-400 text-xs font-bold rounded mb-6 border border-blue-500/20">{blog.category}</span>
           <h1 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">{blog.title}</h1>
           
           <div className="flex items-center justify-between py-6 border-y border-white/5">
              <div className="flex items-center space-x-4">
                 <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center font-bold text-lg">
                    {blog.author_name[0]}
                 </div>
                 <div>
                    <p className="text-sm font-bold text-white">{blog.author_name}</p>
                    <p className="text-xs text-gray-500">Security Researcher</p>
                 </div>
              </div>
              <div className="flex items-center space-x-6">
                 <div className="hidden md:flex items-center space-x-2 text-xs text-gray-500 font-bold uppercase tracking-widest">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                 </div>
                 <div className="flex items-center space-x-2">
                    <button className="p-2 hover:bg-white/5 rounded-lg transition-colors"><Bookmark className="w-5 h-5 text-gray-400" /></button>
                    <button className="p-2 hover:bg-white/5 rounded-lg transition-colors"><Share2 className="w-5 h-5 text-gray-400" /></button>
                 </div>
              </div>
           </div>
        </header>

        {/* Article Body */}
        <div className="mb-20">
           <img src={blog.image} className="w-full aspect-video object-cover rounded-2xl mb-12 border border-white/5 shadow-2xl" alt="" />
           <article className="prose prose-invert max-w-none text-gray-300 text-lg leading-relaxed">
              <p className="mb-8">{blog.content}</p>
              <p className="mb-8">The integration of zero-trust architecture is no longer optional in the current threat landscape. As we scale decentralized applications, the surface area for potential exploits increases exponentially. Developers must prioritize cryptographic verification at every touchpoint.</p>
              <h3 className="text-white text-2xl font-bold mb-6">Key Implementation Strategies</h3>
              <ul className="list-disc pl-6 space-y-4 mb-12">
                 <li>Hardware Security Module (HSM) based key derivation</li>
                 <li>End-to-end identity rotation via ZK-proofs</li>
                 <li>Heuristic-based rate limiting on sensitive API endpoints</li>
              </ul>
              <div className="bg-blue-600/5 border border-blue-600/20 rounded-2xl p-8 italic text-blue-400">
                 "Security is not a feature, it is a foundation. Without trust, the ecosystem cannot scale to the next billion users."
              </div>
           </article>
        </div>

        {/* Comment Section */}
        <section className="pt-12 border-t border-white/5">
           <h3 className="text-2xl font-bold mb-10 flex items-center space-x-3">
              <MessageCircle className="w-6 h-6 text-blue-500" />
              <span>Community Discussion ({blog.comments.length})</span>
           </h3>

           <form onSubmit={handleCommentSubmit} className="mb-12">
              <div className="relative">
                 <textarea 
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share your technical perspective..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 min-h-[120px] text-white focus:outline-none focus:border-blue-500/50 transition-colors resize-none"
                 />
                 <button 
                  type="submit"
                  className="absolute bottom-4 right-4 p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-500 transition-all"
                 >
                    <Send className="w-5 h-5" />
                 </button>
              </div>
           </form>

           <div className="space-y-8">
              {blog.comments.map(comment => (
                <motion.div 
                  key={comment.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 bg-white/5 rounded-2xl border border-white/5"
                >
                   <div className="flex items-center justify-between mb-4">
                      <p className="text-sm font-bold text-white tracking-tight">{comment.user_name}</p>
                      <p className="text-xs text-gray-500">{new Date(comment.created_at).toLocaleDateString()}</p>
                   </div>
                   <p className="text-gray-400 text-sm leading-relaxed">{comment.content}</p>
                </motion.div>
              ))}
           </div>
        </section>
      </div>
    </div>
  );
};

export default BlogDetailPage;
