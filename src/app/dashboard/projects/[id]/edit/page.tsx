'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Rocket, 
  Code2, 
  Github, 
  Globe, 
  FileText,
  Save,
  ArrowLeft,
  Trash2
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function DashboardProjectEditPage({ params }: { params: { id: string } }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tech_stack: '',
    github_url: '',
    demo_url: ''
  });

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const res = await fetch(`${baseUrl}/projects/${params.id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!res.ok) throw new Error('Project not found.');
        const data = await res.json();
        setFormData({
          title: data.title || '',
          description: data.description || '',
          tech_stack: Array.isArray(data.tech_stack) ? data.tech_stack.join(', ') : (data.tech_stack || ''),
          github_url: data.github_url || '',
          demo_url: data.demo_url || ''
        });
      } catch (err) {
        console.error('Failed to load project:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      
      const payload = {
        title: formData.title,
        description: formData.description,
        tech_stack: formData.tech_stack.split(',').map(s => s.trim()).filter(s => s),
        github_url: formData.github_url,
        demo_url: formData.demo_url
      };

      const res = await fetch(`${baseUrl}/projects/${params.id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        alert('Project updated successfully.');
        router.push('/dashboard/projects');
      } else {
        const data = await res.json();
        alert(data.error || 'Update failed.');
      }
    } catch (err) {
      console.error('Update Error:', err);
      alert('Network failure.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this project? This will remove it from all hackathons.')) return;
    
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${baseUrl}/projects/${params.id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (res.ok) {
        alert('Project purged from system.');
        router.push('/dashboard/projects');
      } else {
        const data = await res.json();
        alert(data.error || 'Deactivation failed.');
      }
    } catch (err) {
      console.error('Delete Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-10">
      <Link href="/dashboard/projects" className="flex items-center space-x-2 text-gray-500 hover:text-white transition-colors group w-fit">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-[10px] font-bold uppercase tracking-widest">Cancel</span>
      </Link>

      <header className="flex items-center justify-between">
         <div>
           <h1 className="text-xl font-bold mb-0.5">Edit Project</h1>
           <p className="text-xs text-gray-400 font-medium tracking-tight">Update the details of your project.</p>
         </div>
         <button 
           onClick={handleDelete}
           className="text-[10px] font-bold uppercase tracking-widest text-red-500 bg-red-500/10 hover:bg-red-500 hover:text-white transition-colors border border-red-500/20 px-4 py-2 rounded-lg flex items-center space-x-2 shadow-[0_0_10px_rgba(239,68,68,0.1)]"
         >
           <Trash2 className="w-3.5 h-3.5" />
           <span>Delete Project</span>
         </button>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6 mt-8">
        <div className="bg-[#0c0c0c] border border-white/5 rounded-xl p-8 md:p-10 text-left relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-amber-500 to-amber-700"></div>
           
           <div className="space-y-8">
              {/* Primary Params */}
              <div>
                 <h2 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-6 flex items-center border-b border-white/[0.03] pb-4">
                   <Rocket className="w-3.5 h-3.5 mr-2 text-amber-500" /> Basic Details
                 </h2>
                 <div className="space-y-6">
                    <div>
                      <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2 block ml-1">Project Title</label>
                      <input 
                        type="text" 
                        name="title"
                        required
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full bg-[#050505] border border-white/10 rounded-lg py-3 px-4 text-xs font-bold text-white focus:outline-none focus:border-amber-500/50 transition-colors shadow-inner"
                      />
                    </div>

                    <div>
                      <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center ml-1"><FileText className="w-3 h-3 mr-1" /> Description</label>
                      <textarea 
                        name="description"
                        required
                        rows={5}
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full bg-[#050505] border border-white/10 rounded-lg py-3 px-4 text-xs font-medium text-gray-300 focus:outline-none focus:border-amber-500/50 transition-colors resize-none leading-relaxed shadow-inner"
                      />
                    </div>

                    <div>
                      <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center ml-1"><Code2 className="w-3 h-3 mr-1" /> Technology Stack</label>
                      <input 
                        type="text" 
                        name="tech_stack"
                        value={formData.tech_stack}
                        onChange={handleChange}
                        className="w-full bg-[#050505] border border-white/10 rounded-lg py-3 px-4 text-xs font-mono text-blue-400 focus:outline-none focus:border-amber-500/50 transition-colors shadow-inner"
                      />
                    </div>
                 </div>
              </div>

              {/* Topology Links */}
              <div className="pt-4">
                 <h2 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-6 flex items-center border-b border-white/[0.03] pb-4">
                   <Globe className="w-3.5 h-3.5 mr-2" /> External Links
                 </h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2 block ml-1">GitHub Link</label>
                      <div className="relative">
                        <Github className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input 
                          type="url" 
                          name="github_url"
                          value={formData.github_url}
                          onChange={handleChange}
                          className="w-full bg-[#050505] border border-white/10 rounded-lg py-3 pl-12 pr-4 text-xs font-mono text-gray-400 focus:outline-none focus:border-amber-500/50 transition-colors shadow-inner"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2 block ml-1">Demo Link</label>
                      <div className="relative">
                        <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input 
                          type="url" 
                          name="demo_url"
                          value={formData.demo_url}
                          onChange={handleChange}
                          className="w-full bg-[#050505] border border-white/10 rounded-lg py-3 pl-12 pr-4 text-xs font-mono text-gray-400 focus:outline-none focus:border-amber-500/50 transition-colors shadow-inner"
                        />
                      </div>
                    </div>
                 </div>
              </div>

              <div className="pt-8 flex justify-end items-center border-t border-white/[0.05]">
                 <button 
                   type="submit" 
                   disabled={loading}
                   className="btn-primary bg-amber-600 hover:bg-amber-500 shadow-[0_0_20px_rgba(217,119,6,0.2)] py-3 px-8 text-xs font-bold uppercase tracking-widest flex items-center space-x-2 disabled:opacity-50"
                 >
                    {loading ? <span className="animate-pulse">Saving...</span> : <><span>Save Changes</span> <Save className="w-3.5 h-3.5" /></>}
                 </button>
              </div>
           </div>
        </div>
      </form>
    </div>
  );
}
