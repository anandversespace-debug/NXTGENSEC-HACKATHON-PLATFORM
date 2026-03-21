'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Rocket, 
  Code2, 
  Github, 
  Globe, 
  FileText,
  Upload,
  ArrowLeft,
  Image,
  CheckCircle2,
  Loader2
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function DashboardProjectNewPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tech_stack: '',
    github_url: '',
    demo_url: '',
    image: ''
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setUploading(true);
    try {
      const token = localStorage.getItem('token');
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const fd = new FormData();
      fd.append('file', file);
      
      const res = await fetch(`${baseUrl}/uploads/single`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        credentials: 'include',
        body: fd
      });
      
      const data = await res.json();
      if (res.ok && data.url) {
        setFormData(prev => ({ ...prev, image: data.url }));
      } else {
        setError('Image upload failed. Try again.');
      }
    } catch (err) {
      console.error('Upload error:', err);
      setError('Image upload failed.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      
      const payload = {
        title: formData.title,
        description: formData.description,
        tech_stack: formData.tech_stack.split(',').map(s => s.trim()).filter(s => s),
        github_url: formData.github_url,
        demo_url: formData.demo_url,
        image: formData.image
      };

      const res = await fetch(`${baseUrl}/projects`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        credentials: 'include',
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => router.push('/dashboard/projects'), 2000);
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to create project.');
      }
    } catch (err) {
      setError('Network failure. Could not save your project.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (success) {
    return (
      <div className="max-w-4xl mx-auto flex items-center justify-center py-32">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8 text-emerald-500" />
          </div>
          <h3 className="text-lg font-bold text-white uppercase tracking-tight mb-2">Project Saved</h3>
          <p className="text-xs text-gray-500 font-medium">Redirecting to your projects...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-10">
      <Link href="/dashboard/projects" className="flex items-center space-x-2 text-gray-500 hover:text-white transition-colors group w-fit">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-[10px] font-bold uppercase tracking-widest italic">Go Back</span>
      </Link>

      <header className="text-left">
        <h1 className="text-xl font-black italic uppercase tracking-tighter text-white mb-0.5">Add New Project</h1>
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest italic leading-loose">Share your latest work with the community.</p>
      </header>

      {error && (
        <div className="bg-red-500/5 border border-red-500/10 text-red-500 p-4 rounded-xl text-[10px] font-bold uppercase tracking-widest italic text-left">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-[#0c0c0c] border border-white/5 rounded-3xl p-8 md:p-12 text-left relative overflow-hidden shadow-2xl">
           <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-500 to-indigo-500"></div>
           
           <div className="space-y-10">
              {/* Primary Params */}
              <div>
                 <h2 className="text-[10px] font-black italic text-gray-700 uppercase tracking-[0.3em] mb-8 flex items-center border-b border-white/[0.03] pb-6 leading-none">
                   <Rocket className="w-4 h-4 mr-3 text-blue-500" /> Project Details
                 </h2>
                 <div className="space-y-8">
                    <div className="space-y-3">
                      <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-2 block ml-1 italic leading-none">Project Title</label>
                      <input 
                        type="text" 
                        name="title"
                        required
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="E.g., Website Security Tool"
                        className="w-full bg-[#050505] border border-white/10 rounded-xl py-4 px-6 text-xs font-bold text-white focus:outline-none focus:border-blue-500/50 transition-all shadow-inner uppercase tracking-tight"
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-2 flex items-center ml-1 italic leading-none"><FileText className="w-3.5 h-3.5 mr-2" /> Project Description</label>
                      <textarea 
                        name="description"
                        required
                        rows={5}
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Explain what your project does and how it works..."
                        className="w-full bg-[#050505] border border-white/10 rounded-xl py-4 px-6 text-xs font-medium text-gray-300 focus:outline-none focus:border-blue-500/50 transition-all resize-none leading-relaxed shadow-inner"
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-2 flex items-center ml-1 italic leading-none"><Code2 className="w-3.5 h-3.5 mr-2" /> Tech Stack</label>
                      <input 
                        type="text" 
                        name="tech_stack"
                        value={formData.tech_stack}
                        onChange={handleChange}
                        placeholder="React, Node.js, Tailwind (comma separated)"
                        className="w-full bg-[#050505] border border-white/10 rounded-xl py-4 px-6 text-xs font-mono text-blue-500 focus:outline-none focus:border-blue-500/50 transition-all shadow-inner"
                      />
                    </div>
                 </div>
              </div>

              {/* Project Image Upload */}
              <div className="pt-4">
                 <h2 className="text-[10px] font-black italic text-gray-700 uppercase tracking-[0.3em] mb-8 flex items-center border-b border-white/[0.03] pb-6 leading-none">
                   <Image className="w-4 h-4 mr-3" /> Project Image
                 </h2>
                 <div className="flex items-center space-x-8">
                   {formData.image ? (
                     <div className="w-40 h-28 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                       <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                     </div>
                   ) : (
                     <div className="w-40 h-28 rounded-2xl border border-dashed border-white/10 flex items-center justify-center bg-black/20">
                       <Image className="w-8 h-8 text-gray-800" />
                     </div>
                   )}
                   <div>
                     <label className="cursor-pointer inline-flex items-center space-x-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl px-6 py-3.5 transition-all">
                       {uploading ? (
                         <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
                       ) : (
                         <Upload className="w-4 h-4 text-gray-600" />
                       )}
                       <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 italic">
                         {uploading ? 'Uploading...' : formData.image ? 'Change Photo' : 'Upload Photo'}
                       </span>
                       <input 
                         type="file" 
                         accept="image/*" 
                         onChange={handleImageUpload}
                         className="hidden" 
                         disabled={uploading}
                       />
                     </label>
                     <p className="text-[9px] text-gray-700 mt-3 ml-1 font-black uppercase tracking-tighter italic">PNG, JPG, WebP. Max 5MB.</p>
                   </div>
                 </div>
              </div>

              {/* External Links */}
              <div className="pt-4">
                 <h2 className="text-[10px] font-black italic text-gray-700 uppercase tracking-[0.3em] mb-8 flex items-center border-b border-white/[0.03] pb-6 leading-none">
                   <Globe className="w-4 h-4 mr-3" /> External Links
                 </h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-2 block ml-1 italic leading-none">GitHub Link</label>
                      <div className="relative">
                        <Github className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-700" />
                        <input 
                          type="url" 
                          name="github_url"
                          value={formData.github_url}
                          onChange={handleChange}
                          placeholder="https://github.com/..."
                          className="w-full bg-[#050505] border border-white/10 rounded-xl py-4 pl-12 pr-6 text-xs font-mono text-gray-400 focus:outline-none focus:border-blue-500/50 transition-all shadow-inner"
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-2 block ml-1 italic leading-none">Demo Link</label>
                      <div className="relative">
                        <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-700" />
                        <input 
                          type="url" 
                          name="demo_url"
                          value={formData.demo_url}
                          onChange={handleChange}
                          placeholder="https://test-link.com"
                          className="w-full bg-[#050505] border border-white/10 rounded-xl py-4 pl-12 pr-6 text-xs font-mono text-gray-400 focus:outline-none focus:border-blue-500/50 transition-all shadow-inner"
                        />
                      </div>
                    </div>
                 </div>
              </div>

              <div className="pt-10 flex justify-end items-center border-t border-white/[0.05]">
                 <button 
                   type="submit" 
                   disabled={loading}
                   className="bg-blue-600 hover:bg-blue-500 text-white py-4 px-10 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center space-x-3 transition-all shadow-xl shadow-blue-900/30 disabled:opacity-50 italic"
                 >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-white/50" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <span>Save Project</span>
                        <CheckCircle2 className="w-4 h-4" />
                      </>
                    )}
                 </button>
              </div>
           </div>
        </div>
      </form>
    </div>
  );
}
