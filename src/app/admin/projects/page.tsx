'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FolderLock, 
  Search, 
  ExternalLink, 
  Trash2, 
  Ban, 
  ShieldCheck,
  Code,
  Loader2,
  Plus,
  X,
  CheckCircle2,
  Edit2
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Project {
  _id: string;
  title: string;
  description: string;
  created_by: { _id: string; name: string; username: string };
  tech_stack: string[];
  status: string;
  stars: number;
  github_url: string;
  demo_url?: string;
}

const AdminProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tech_stack: '',
    github_url: '',
    demo_url: '',
    status: 'pending'
  });

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem('token');
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${baseUrl}/projects`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (err) {
      console.error('Failed to fetch projects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreateOrUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    
    const method = editingProject ? 'PUT' : 'POST';
    const url = editingProject ? `${baseUrl}/projects/${editingProject._id}` : `${baseUrl}/projects`;

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          tech_stack: formData.tech_stack.split(',').map(t => t.trim()).filter(t => t)
        })
      });

      if (res.ok) {
        fetchProjects();
        setShowModal(false);
        setEditingProject(null);
        setFormData({ title: '', description: '', tech_stack: '', github_url: '', demo_url: '', status: 'pending' });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const token = localStorage.getItem('token');
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${baseUrl}/projects/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setProjects(prev => prev.map(p => p._id === id ? { ...p, status: newStatus } : p));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Purge this project from registry?')) return;
    try {
      const token = localStorage.getItem('token');
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${baseUrl}/projects/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setProjects(prev => prev.filter(p => p._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const openEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      tech_stack: (project.tech_stack || []).join(', '),
      github_url: project.github_url || '',
      demo_url: project.demo_url || '',
      status: project.status
    });
    setShowModal(true);
  };

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.created_by?.username?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 text-left">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-xl font-black uppercase tracking-tighter italic">Projects Hub</h1>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-none mt-1">Audit, moderate and manage ecosystem codebases.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex bg-[#0c0c0c] border border-white/5 rounded-xl p-1 w-64 focus-within:border-blue-500/30 transition-all">
            <input 
              type="text" 
              placeholder="Search codebases..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none focus:outline-none px-3 py-1.5 flex-grow text-white text-[11px]"
            />
            <button className="p-1.5 text-gray-500 hover:text-white transition-colors">
              <Search className="w-4 h-4" />
            </button>
          </div>
          <button 
             onClick={() => { setEditingProject(null); setFormData({ title: '', description: '', tech_stack: '', github_url: '', demo_url: '', status: 'pending' }); setShowModal(true); }}
             className="bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black uppercase tracking-widest px-6 py-2.5 rounded-xl flex items-center space-x-2 transition-all shadow-xl shadow-blue-900/20 active:scale-95 italic"
          >
             <Plus className="w-4 h-4" />
             <span>Deploy Project Node</span>
          </button>
        </div>
      </header>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
        </div>
      ) : (
        <div className="space-y-4">
          {filteredProjects.map((project, i) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-[#0c0c0c] border border-white/5 p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between transition-all hover:bg-white/[0.01] group shadow-2xl"
            >
              <div className="flex items-center space-x-6 md:w-1/3">
                 <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:bg-blue-600/10 group-hover:border-blue-500/20 transition-all">
                    <Code className="w-6 h-6 text-blue-500" />
                 </div>
                 <div className="text-left">
                    <h3 className="text-sm font-black text-gray-200 uppercase tracking-tight italic group-hover:text-blue-500 transition-colors">{project.title}</h3>
                    <p className="text-[10px] text-gray-600 font-bold uppercase italic tracking-widest mt-0.5">@node_{project.created_by?.username || 'unknown'}</p>
                 </div>
              </div>

              <div className="flex items-center space-x-12 md:w-1/3 justify-center py-4 md:py-0">
                 <div className="text-center">
                    <p className="text-base font-black text-white italic tracking-tighter leading-none">{project.stars || 0}</p>
                    <p className="text-[9px] text-gray-600 font-black uppercase tracking-widest mt-2 italic shadow-sm">Reputation</p>
                 </div>
                 <div className="flex flex-wrap items-center gap-2 justify-center max-w-[150px]">
                    {(project.tech_stack || []).slice(0, 3).map(t => (
                      <span key={t} className="px-2 py-0.5 bg-white/5 text-gray-500 text-[9px] font-black rounded-sm uppercase tracking-widest italic border border-white/5">{t}</span>
                    ))}
                    {project.tech_stack?.length > 3 && <span className="text-[10px] text-gray-700 font-black italic">+{project.tech_stack.length - 3}</span>}
                 </div>
              </div>

              <div className="flex items-center space-x-4 md:w-1/3 justify-end">
                 <span className={cn(
                   "text-[9px] font-black px-3 py-1 rounded-sm uppercase tracking-widest border italic",
                   project.status === 'verified' || project.status === 'approved' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                   project.status === 'pending' ? "bg-amber-500/10 text-amber-500 border-amber-500/20" : "bg-red-500/10 text-red-500 border-red-500/20"
                 )}>
                    {project.status || 'pending'}
                 </span>
                 <div className="flex items-center space-x-2">
                    <a href={project.github_url} target="_blank" className="p-2 text-gray-600 hover:text-white bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition-all">
                       <ExternalLink className="w-4 h-4" />
                    </a>
                    <button onClick={() => openEdit(project)} className="p-2 text-gray-600 hover:text-blue-400 bg-white/5 rounded-xl border border-white/5 hover:border-blue-500/20 transition-all">
                       <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(project._id)} className="p-2 text-gray-600 hover:text-red-500 bg-white/5 rounded-xl border border-white/5 hover:border-red-500/20 transition-all">
                       <Trash2 className="w-4 h-4" />
                    </button>
                 </div>
              </div>
            </motion.div>
          ))}
          {filteredProjects.length === 0 && (
            <div className="py-24 text-center border border-dashed border-white/5 rounded-3xl">
               <FolderLock className="w-12 h-12 text-gray-800 mx-auto mb-4 opacity-30" />
               <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-700 italic">No project nodes found in registry.</p>
            </div>
          )}
        </div>
      )}

      {/* Project Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 text-left">
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowModal(false)} className="absolute inset-0 bg-black/70 backdrop-blur-md" />
             <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-3xl bg-[#080808] border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
                <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
                   <h2 className="text-xs font-black uppercase tracking-[0.2em] text-white italic">{editingProject ? 'Modify Project Configuration' : 'Initialize Project Node'}</h2>
                   <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-white"><X className="w-5 h-5" /></button>
                </div>
                <form onSubmit={handleCreateOrUpdate} className="p-8 space-y-6">
                   <div className="grid grid-cols-2 gap-6">
                      <div className="col-span-2">
                         <label className="text-[9px] font-black text-gray-700 uppercase tracking-widest mb-2 block italic">Core Identifier (Title)</label>
                         <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-[#050505] border border-white/10 rounded-xl p-4 text-xs text-white focus:border-blue-500 transition-all font-black uppercase italic italic tracking-tight" placeholder="PROJECT_CODENAME" />
                      </div>
                      <div className="col-span-2">
                         <label className="text-[9px] font-black text-gray-700 uppercase tracking-widest mb-2 block italic">Cyber Descriptor (Description)</label>
                         <textarea required rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-[#050505] border border-white/10 rounded-xl p-4 text-xs text-white focus:border-blue-500 transition-all resize-none italic font-medium leading-relaxed" placeholder="Detailed architectural description..." />
                      </div>
                      <div>
                         <label className="text-[9px] font-black text-gray-700 uppercase tracking-widest mb-2 block italic">Repository Link (GitHub)</label>
                         <input required value={formData.github_url} onChange={e => setFormData({...formData, github_url: e.target.value})} className="w-full bg-[#050505] border border-white/10 rounded-xl p-4 text-xs text-white focus:border-blue-500 transition-all font-mono" placeholder="https://github.com/node/repo" />
                      </div>
                      <div>
                         <label className="text-[9px] font-black text-gray-700 uppercase tracking-widest mb-2 block italic">Access Link (Demo)</label>
                         <input value={formData.demo_url} onChange={e => setFormData({...formData, demo_url: e.target.value})} className="w-full bg-[#050505] border border-white/10 rounded-xl p-4 text-xs text-white focus:border-blue-500 transition-all font-mono" placeholder="https://demo.node.xyz" />
                      </div>
                      <div>
                         <label className="text-[9px] font-black text-gray-700 uppercase tracking-widest mb-2 block italic">Tech Stack (comma separated)</label>
                         <input required value={formData.tech_stack} onChange={e => setFormData({...formData, tech_stack: e.target.value})} className="w-full bg-[#050505] border border-white/10 rounded-xl p-4 text-xs text-white focus:border-blue-500 transition-all font-mono" placeholder="React, Node.js, Rust" />
                      </div>
                      <div>
                         <label className="text-[9px] font-black text-gray-700 uppercase tracking-widest mb-2 block italic">Verification State</label>
                         <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full bg-[#050505] border border-white/10 rounded-xl p-4 text-xs text-white uppercase font-black appearance-none focus:border-blue-500 transition-all cursor-pointer italic">
                            <option value="pending">Awaiting Audit (Pending)</option>
                            <option value="verified">Verified Node (Verified)</option>
                            <option value="flagged">Vulnerability Detected (Flagged)</option>
                         </select>
                      </div>
                   </div>
                   <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-xl flex items-center justify-center space-x-3 transition-all shadow-xl shadow-blue-900/20 active:scale-[0.98]">
                      <span className="text-[10px] font-black uppercase tracking-widest">{editingProject ? 'Synchronize Matrix' : 'Initialize Node'}</span>
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

export default AdminProjects;
