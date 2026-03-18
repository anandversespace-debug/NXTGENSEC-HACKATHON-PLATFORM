'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Search, 
  Trash2, 
  Edit3, 
  Plus,
  Eye,
  CheckCircle,
  XCircle,
  Loader2,
  X,
  CheckCircle2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface Blog {
  _id: string;
  title: string;
  content: string;
  author: { _id: string; name: string; username: string };
  status: string;
  views: number;
  tags?: string[];
  createdAt: string;
}

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    status: 'draft',
    tags: ''
  });

  const fetchBlogs = async () => {
    try {
      const token = localStorage.getItem('token');
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${baseUrl}/blogs`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setBlogs(data);
      }
    } catch (err) {
      console.error('Failed to fetch blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleCreateOrUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    
    const method = editingBlog ? 'PUT' : 'POST';
    const url = editingBlog ? `${baseUrl}/blogs/${editingBlog._id}` : `${baseUrl}/blogs`;

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.split(',').map(t => t.trim()).filter(t => t)
        })
      });

      if (res.ok) {
        fetchBlogs();
        setShowModal(false);
        setEditingBlog(null);
        setFormData({ title: '', content: '', status: 'draft', tags: '' });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Purge this content node?')) return;
    try {
      const token = localStorage.getItem('token');
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${baseUrl}/blogs/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setBlogs(prev => prev.filter(b => b._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const openEdit = (blog: Blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      content: blog.content,
      status: blog.status,
      tags: (blog.tags || []).join(', ')
    });
    setShowModal(true);
  };

  const filteredBlogs = blogs.filter(b => 
    b.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    b.author?.username?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 text-left">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-xl font-black uppercase tracking-tighter italic">Content Ledger</h1>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-none mt-1">Manage ecosystem publications and technical briefings.</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex bg-[#0c0c0c] border border-white/5 rounded-xl p-1 w-64 focus-within:border-blue-500/30 transition-all">
            <input 
              type="text" 
              placeholder="Filter titles..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none focus:outline-none px-3 py-1.5 flex-grow text-white text-[11px]"
            />
            <button className="p-1.5 text-gray-500 hover:text-white transition-colors">
              <Search className="w-4 h-4" />
            </button>
          </div>
          <button 
            onClick={() => { setEditingBlog(null); setFormData({ title: '', content: '', status: 'draft', tags: '' }); setShowModal(true); }}
            className="bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black uppercase tracking-widest px-6 py-2.5 rounded-xl flex items-center space-x-2 transition-all shadow-xl shadow-blue-900/20 active:scale-95 italic"
          >
            <Plus className="w-4 h-4" />
            <span>New Dispatch</span>
          </button>
        </div>
      </header>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
        </div>
      ) : (
        <div className="bg-[#0c0c0c] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
          <table className="w-full text-left">
            <thead className="bg-white/[0.02] border-b border-white/5">
              <tr>
                <th className="px-8 py-5 text-[9px] font-black uppercase text-gray-700 tracking-[0.2em]">Document Ledger</th>
                <th className="px-8 py-5 text-[9px] font-black uppercase text-gray-700 tracking-[0.2em]">Author Node</th>
                <th className="px-8 py-5 text-[9px] font-black uppercase text-gray-700 tracking-[0.2em]">Metrics</th>
                <th className="px-8 py-5 text-[9px] font-black uppercase text-gray-700 tracking-[0.2em]">Status</th>
                <th className="px-8 py-5 text-[9px] font-black uppercase text-gray-700 tracking-[0.2em] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.03]">
              {filteredBlogs.map((blog, i) => (
                <tr key={blog._id} className="hover:bg-white/[0.01] transition-colors group">
                  <td className="px-8 py-5">
                     <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:bg-blue-600/10 group-hover:border-blue-500/20 transition-all">
                           <FileText className="w-4 h-4 text-blue-500 group-hover:text-blue-400 transition-colors" />
                        </div>
                        <div className="text-left">
                           <p className="text-xs font-black text-gray-200 uppercase tracking-tight mb-1 italic line-clamp-1">{blog.title}</p>
                           <p className="text-[9px] text-gray-600 font-bold italic tracking-tighter uppercase whitespace-nowrap">ID: {blog._id.slice(-6).toUpperCase()}</p>
                        </div>
                     </div>
                  </td>
                  <td className="px-8 py-5 text-left">
                     <p className="text-[10px] font-black text-gray-200 uppercase tracking-widest italic leading-none mb-1.5">@{blog.author?.username || 'unknown'}</p>
                     <p className="text-[9px] text-gray-700 font-bold uppercase tracking-widest">{new Date(blog.createdAt).toLocaleDateString()}</p>
                  </td>
                  <td className="px-8 py-5 text-left">
                     <div className="flex items-center space-x-2 text-gray-500">
                        <Eye className="w-4 h-4 opacity-50" />
                        <span className="text-sm font-black text-white italic tracking-tighter">{(blog.views || 0).toLocaleString()}</span>
                     </div>
                  </td>
                  <td className="px-8 py-5 text-left">
                     <span className={cn(
                       "text-[8px] font-black px-2 py-0.5 rounded-sm uppercase tracking-widest border italic",
                       blog.status === 'published' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                     )}>
                        {blog.status || 'draft'}
                     </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                     <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => openEdit(blog)} className="p-2 text-gray-500 hover:text-white bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition-all">
                           <Edit3 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(blog._id)} className="p-2 text-gray-500 hover:text-red-400 bg-white/5 rounded-xl border border-white/5 hover:border-red-500/20 transition-all">
                           <Trash2 className="w-4 h-4" />
                        </button>
                     </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredBlogs.length === 0 && (
            <div className="py-24 text-center border-t border-white/5">
               <FileText className="w-12 h-12 text-gray-800 mx-auto mb-4 opacity-30" />
               <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-700 italic">No publications match your filter node.</p>
            </div>
          )}
        </div>
      )}

      {/* Blog Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 text-left">
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowModal(false)} className="absolute inset-0 bg-black/70 backdrop-blur-md" />
             <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-3xl bg-[#080808] border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
                <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
                   <h2 className="text-xs font-black uppercase tracking-[0.2em] text-white italic">{editingBlog ? 'Edit Publication Node' : 'Initialize New Publication'}</h2>
                   <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-white"><X className="w-5 h-5" /></button>
                </div>
                <form onSubmit={handleCreateOrUpdate} className="p-8 space-y-6">
                   <div>
                      <label className="text-[9px] font-black text-gray-700 uppercase tracking-widest mb-2 block italic">Document Title</label>
                      <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-[#050505] border border-white/10 rounded-xl p-4 text-xs text-white focus:border-blue-500 transition-all font-bold uppercase italic tracking-tight" placeholder="E.g., Zero Knowledge Protocols Explained" />
                   </div>
                   <div className="grid grid-cols-2 gap-6">
                      <div>
                         <label className="text-[9px] font-black text-gray-700 uppercase tracking-widest mb-2 block italic">Node State</label>
                         <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full bg-[#050505] border border-white/10 rounded-xl p-4 text-xs text-white uppercase font-black appearance-none focus:border-blue-500 transition-all cursor-pointer italic shadow-inner">
                            <option value="draft">Draft Node</option>
                            <option value="published">Broadcast Live</option>
                         </select>
                      </div>
                      <div>
                         <label className="text-[9px] font-black text-gray-700 uppercase tracking-widest mb-2 block italic">Classification Tags (comma separated)</label>
                         <input value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} className="w-full bg-[#050505] border border-white/10 rounded-xl p-4 text-xs text-white focus:border-blue-500 transition-all font-mono" placeholder="security, blockchain, web3" />
                      </div>
                   </div>
                   <div>
                      <label className="text-[9px] font-black text-gray-700 uppercase tracking-widest mb-2 block italic">Document Payload (Markdown Supported)</label>
                      <textarea required rows={10} value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} className="w-full bg-[#050505] border border-white/10 rounded-xl p-4 text-xs text-white focus:border-blue-500 transition-all resize-none font-mono leading-relaxed" placeholder="Begin transmission..." />
                   </div>
                   <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-xl flex items-center justify-center space-x-3 transition-all shadow-xl shadow-blue-900/20 active:scale-[0.98]">
                      <span className="text-[10px] font-black uppercase tracking-widest">{editingBlog ? 'Synchronize Publication' : 'Broadcast Dispatch'}</span>
                      <CheckCircle2 className="w-4 h-4" />
                   </button>
                </form>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminBlogs;
