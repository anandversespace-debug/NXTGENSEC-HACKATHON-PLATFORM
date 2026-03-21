'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FolderCode, Plus, Search, ExternalLink, Trash2, Edit3, Settings2 } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function DashboardProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyProjects = async () => {
      try {
        const token = localStorage.getItem('token');
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const res = await fetch(`${baseUrl}/projects/my`, {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          credentials: 'include'
        });
        if (!res.ok) throw new Error('Failed to fetch personal projects.');
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        console.error('Fetch My Projects Error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMyProjects();
  }, []);

  const handleDeleteProject = async (projectId: string) => {
    if (!confirm('Are you sure you want to delete this project? This operation cannot be undone.')) return;

    try {
      const token = localStorage.getItem('token');
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${baseUrl}/projects/${projectId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (res.ok) {
        setProjects(prev => prev.filter(p => p._id !== projectId));
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to delete project.');
      }
    } catch (err) {
      console.error('Delete Project Error:', err);
    }
  };

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-xl font-black uppercase tracking-tight italic mb-8 text-white">My Projects</h1>
          <p className="text-xs text-gray-500 font-bold uppercase tracking-widest leading-loose">Manage your projects and see how they are doing.</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex bg-[#0c0c0c] border border-white/5 rounded-lg p-1 w-64 transition-colors focus-within:border-blue-500/30">
            <input 
              type="text" 
              placeholder="Search projects..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none focus:outline-none px-3 py-1.5 flex-grow text-white text-[11px] font-bold uppercase tracking-widest placeholder:text-gray-800"
            />
            <button className="p-1.5 text-gray-700 hover:text-white transition-colors">
              <Search className="w-3.5 h-3.5" />
            </button>
          </div>
          <Link href="/dashboard/projects/new" className="bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black italic uppercase tracking-widest px-6 py-2.5 rounded-lg flex items-center space-x-2 transition-all shadow-xl shadow-blue-900/10">
            <Plus className="w-3.5 h-3.5" />
            <span>Add Project</span>
          </Link>
        </div>
      </header>

      {loading ? (
        <div className="py-20 text-center">
           <div className="text-blue-500 font-black italic animate-pulse tracking-widest uppercase text-xs">Loading...</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-[#0c0c0c] border border-white/5 p-8 rounded-2xl group hover:border-blue-500/20 transition-all flex flex-col relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-4 relative z-10">
                 <div className="p-2.5 rounded bg-white/5 border border-white/5 group-hover:border-blue-500/20 transition-colors">
                    <FolderCode className="w-4 h-4 text-blue-500" />
                 </div>
                 <div className="flex items-center space-x-2">
                    <span className="text-[8px] font-black px-2 py-0.5 rounded uppercase tracking-tighter border bg-emerald-500/10 text-emerald-500 border-emerald-500/20 italic">
                      {project.status || 'Active'}
                    </span>
                 </div>
              </div>

              <div className="flex-grow relative z-10">
                 <h3 className="text-sm font-black text-gray-200 uppercase tracking-tight mb-2 group-hover:text-blue-400 transition-colors italic">
                   {project.title}
                 </h3>
                 <p className="text-gray-500 text-[11px] font-bold uppercase tracking-tighter leading-snug line-clamp-2">
                   {project.description}
                 </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/[0.03] flex flex-col gap-4 relative z-10">
                 <div className="flex flex-wrap gap-2">
                    {(project.tech_stack || []).map((t: string) => (
                      <span key={t} className="text-[8px] font-bold text-gray-600 bg-white/5 border border-white/5 px-2 py-0.5 rounded-sm uppercase tracking-widest group-hover:text-gray-400 transition-colors">{t}</span>
                    ))}
                 </div>
                 
                 <div className="flex items-center justify-between pt-2">
                    <span className="text-[8px] text-gray-700 font-black tracking-[0.2em] uppercase italic flex items-center">
                      <Settings2 className="w-3 h-3 mr-1.5" />
                      ID: {project._id.slice(-6).toUpperCase()}
                    </span>
                    <div className="flex items-center space-x-2">
                       <Link href={`/dashboard/projects/${project._id}/edit`} className="p-2 text-gray-700 hover:text-white transition-all bg-white/5 rounded-lg border border-transparent hover:border-white/10">
                          <Edit3 className="w-3.5 h-3.5" />
                       </Link>
                       <button 
                         onClick={() => handleDeleteProject(project._id)}
                         className="p-2 text-gray-700 hover:text-red-500 transition-all bg-white/5 rounded-lg border border-transparent hover:border-red-500/20"
                       >
                          <Trash2 className="w-3.5 h-3.5" />
                       </button>
                    </div>
                 </div>
              </div>
              
              {/* Decorative Rank Number */}
              <div className="absolute -bottom-4 -right-2 text-8xl font-black italic text-white/[0.01] pointer-events-none group-hover:text-blue-500/[0.02] transition-colors">
                 {idx + 1}
              </div>
            </motion.div>
          ))}
          {filteredProjects.length === 0 && (
            <div className="col-span-full py-20 text-center border border-dashed border-white/5 rounded-3xl">
               <FolderCode className="w-12 h-12 text-gray-800 mx-auto mb-4 opacity-50" />
               <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-700 italic">No projects found.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
