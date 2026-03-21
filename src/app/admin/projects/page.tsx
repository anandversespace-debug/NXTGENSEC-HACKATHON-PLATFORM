'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Workflow, 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Eye, 
  MoreVertical,
  ChevronRight,
  ShieldCheck,
  Zap,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Loader from '@/components/ui/Loader';

interface Project {
  _id: string;
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'auditing' | 'verified';
  created_by: { name: string; username: string };
  tech_stack: string[];
  createdAt: string;
}

const AdminProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'auditing' | 'verified'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem('token');
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${baseUrl}/projects`, {
        headers: { 'Authorization': `Bearer ${token}` },
        credentials: 'include'
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

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      const token = localStorage.getItem('token');
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${baseUrl}/projects/${id}/status`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        credentials: 'include',
        body: JSON.stringify({ status: newStatus })
      });

      if (res.ok) {
        setProjects(prev => prev.map(p => p._id === id ? { ...p, status: newStatus as any } : p));
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredProjects = projects.filter(p => {
    const matchesFilter = filter === 'all' || p.status === filter;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.tech_stack.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  if (loading) return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center space-y-6">
       <Loader />
       <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-700 italic">Accessing Project Registry...</p>
    </div>
  );

  return (
    <div className="space-y-10 pb-20 text-left">
      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div className="space-y-4">
           <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-blue-500" />
              <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-500/50 italic">Administrative Access</h2>
           </div>
           <h1 className="text-3xl font-black italic uppercase tracking-tighter text-white">Project <span className="text-gray-500">Audit Hub</span></h1>
        </div>
        
        <div className="flex flex-col md:flex-row items-center gap-4">
           <div className="flex bg-[#0c0c0c] border border-white/5 rounded-xl p-1.5 focus-within:border-blue-500/20 transition-all w-full md:w-80 group">
              <Search className="w-4 h-4 text-gray-700 ml-2 group-focus-within:text-blue-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Search audit pipeline..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none focus:outline-none px-3 py-1.5 text-xs text-white flex-grow uppercase font-black italic tracking-widest"
              />
           </div>

           <div className="flex bg-[#0c0c0c] border border-white/5 p-1 rounded-xl">
              {['all', 'pending', 'auditing', 'verified'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f as any)}
                  className={cn(
                    "px-5 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all italic",
                    filter === f ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20" : "text-gray-600 hover:text-gray-400"
                  )}
                >
                  {f}
                </button>
              ))}
           </div>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: idx * 0.03 }}
              className="bg-[#0c0c0c] border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-all group relative overflow-hidden"
            >
               {/* Background Accent */}
               <div className={cn(
                  "absolute top-0 right-0 w-1/3 h-full opacity-10 blur-3xl pointer-events-none transition-opacity",
                  project.status === 'verified' ? "bg-emerald-500/20" : project.status === 'pending' ? "bg-amber-500/20" : "bg-blue-500/20"
               )} />

               <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
                  <div className="flex items-center space-x-6">
                     <div className="w-12 h-12 rounded-xl bg-[#050505] border border-white/5 flex items-center justify-center text-lg font-black text-gray-700 italic group-hover:text-blue-500 transition-colors">
                        {project.title.charAt(0).toUpperCase()}
                     </div>
                     <div>
                        <div className="flex items-center space-x-3 mb-1">
                           <h3 className="text-base font-black text-white italic uppercase tracking-tight">{project.title}</h3>
                           <span className={cn(
                              "text-[8px] font-black px-2 py-0.5 rounded border uppercase tracking-widest italic",
                              project.status === 'verified' ? "border-emerald-500/20 text-emerald-500 bg-emerald-500/5" :
                              project.status === 'auditing' ? "border-blue-500/20 text-blue-500 bg-blue-500/5" :
                              "border-amber-500/20 text-amber-500 bg-amber-500/5 animate-pulse"
                           )}>
                              {project.status}
                           </span>
                        </div>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest flex items-center space-x-2">
                           <span className="text-gray-700 font-black">Author:</span> 
                           <span className="text-blue-500/80 italic">@{project.created_by?.username}</span>
                           <span className="mx-2 opacity-20">|</span>
                           <span>{new Date(project.createdAt).toLocaleDateString()}</span>
                        </p>
                     </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 w-full md:w-auto mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-0 border-white/5">
                     <div className="flex space-x-1 pr-6 border-r border-white/5 hidden lg:flex">
                        {project.tech_stack.slice(0, 3).map(tech => (
                           <span key={tech} className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[8px] font-bold text-gray-600 uppercase tracking-tighter">
                              {tech}
                           </span>
                        ))}
                     </div>
                     
                     <div className="flex items-center space-x-2 ml-auto">
                        <Link href={`/projects/${project._id}`} className="p-2.5 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors group/btn">
                           <Eye className="w-4 h-4 text-gray-600 group-hover/btn:text-white" />
                        </Link>
                        
                        <div className="flex bg-[#050505] p-1 rounded-xl border border-white/5">
                           <button 
                             onClick={() => handleStatusUpdate(project._id, 'auditing')}
                             disabled={updatingId === project._id || project.status === 'auditing'}
                             className={cn(
                               "p-2.5 rounded-lg transition-all",
                               project.status === 'auditing' ? "bg-blue-600 text-white shadow-lg" : "text-gray-700 hover:text-blue-400"
                             )}
                             title="Audit Mode"
                           >
                              <Clock className="w-4 h-4" />
                           </button>
                           <button 
                             onClick={() => handleStatusUpdate(project._id, 'verified')}
                             disabled={updatingId === project._id || project.status === 'verified'}
                             className={cn(
                               "p-2.5 rounded-lg transition-all",
                               project.status === 'verified' ? "bg-emerald-600 text-white shadow-lg" : "text-gray-700 hover:text-emerald-400"
                             )}
                             title="Verify Node"
                           >
                              <CheckCircle2 className="w-4 h-4" />
                           </button>
                           <button 
                             onClick={() => handleStatusUpdate(project._id, 'pending')}
                             disabled={updatingId === project._id || project.status === 'pending'}
                             className={cn(
                               "p-2.5 rounded-lg transition-all",
                               project.status === 'pending' ? "bg-amber-600 text-white shadow-lg" : "text-gray-700 hover:text-amber-400"
                             )}
                             title="Reset Status"
                           >
                              <ShieldAlert className="w-4 h-4" />
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredProjects.length === 0 && (
          <div className="py-32 text-center bg-[#0c0c0c] border border-dashed border-white/5 rounded-3xl">
             <Workflow className="w-12 h-12 text-gray-800 mx-auto mb-6 opacity-20" />
             <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-700 italic">Static. No projects detected in this filter.</p>
          </div>
        )}
      </div>

      {/* Audit Guide */}
      <div className="bg-blue-600/5 border border-blue-500/10 p-8 rounded-2xl flex items-start space-x-6">
         <div className="w-12 h-12 rounded-xl bg-blue-600/10 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6 text-blue-500" />
         </div>
         <div>
            <h4 className="text-sm font-black text-blue-400 uppercase tracking-widest italic mb-2">Audit Intelligence</h4>
            <p className="text-[10px] text-gray-500 font-medium uppercase tracking-tighter leading-relaxed max-w-2xl">
              Verification is a final state. Once a project node is transition to <span className="text-emerald-500 font-bold">Verified</span>, the creator is automatically rewarded with <span className="text-blue-400 font-bold">100 Reputation Points</span>. Use <span className="text-blue-400 font-bold">Audit Mode</span> for technical screenings before final entry.
            </p>
         </div>
      </div>
    </div>
  );
};

export default AdminProjectsPage;
