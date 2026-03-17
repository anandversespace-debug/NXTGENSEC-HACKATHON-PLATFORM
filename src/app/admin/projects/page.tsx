'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  FolderLock, 
  Search, 
  ExternalLink, 
  Trash2, 
  Ban, 
  ShieldCheck,
  Code
} from 'lucide-react';
import { cn } from '@/lib/utils';

const AdminProjects = () => {
  const projects = [
    { id: '1', title: 'CyberGuard AI', dev: '@anand', tech: ['Next.js', 'Rust'], status: 'approved', audits: 12 },
    { id: '2', title: 'SecureVault', dev: '@cipher', tech: ['React', 'Go'], status: 'pending', audits: 0 },
    { id: '3', title: 'DeepAudit', dev: '@matrix', tech: ['Python'], status: 'flagged', audits: 3 },
  ];

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold mb-0.5">Projects</h1>
          <p className="text-xs text-gray-500 font-medium">Moderation and audits.</p>
        </div>
        <div className="flex bg-[#0c0c0c] border border-white/5 rounded-lg p-1 w-64">
          <input 
            type="text" 
            placeholder="Search projects..." 
            className="bg-transparent border-none focus:outline-none px-3 py-1.5 flex-grow text-white text-[11px]"
          />
          <button className="p-1.5 text-gray-500 hover:text-white transition-colors">
            <Search className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      <div className="space-y-3">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-[#0c0c0c] border border-white/5 p-4 rounded-lg flex items-center justify-between transition-all hover:bg-white/[0.01]"
          >
            <div className="flex items-center space-x-4 w-1/3">
               <div className="w-10 h-10 rounded bg-white/5 border border-white/5 flex items-center justify-center">
                  <Code className="w-5 h-5 text-blue-500" />
               </div>
               <div>
                  <h3 className="text-xs font-bold text-gray-200 uppercase tracking-tight">{project.title}</h3>
                  <p className="text-[9px] text-gray-600 font-bold uppercase">{project.dev}</p>
               </div>
            </div>

            <div className="flex items-center space-x-8 w-1/3 justify-center">
               <div className="text-center">
                  <p className="text-sm font-bold text-gray-300 leading-none">{project.audits}</p>
                  <p className="text-[8px] text-gray-600 font-black uppercase tracking-tighter mt-1">Audits</p>
               </div>
               <div className="flex items-center space-x-2">
                  {project.tech.map(t => (
                    <span key={t} className="px-1.5 py-0.5 bg-white/5 text-gray-500 text-[8px] font-bold rounded uppercase">{t}</span>
                  ))}
               </div>
            </div>

            <div className="flex items-center space-x-4 w-1/3 justify-end">
               <span className={cn(
                 "text-[8px] font-bold px-2 py-0.5 rounded uppercase tracking-tighter border",
                 project.status === 'approved' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                 project.status === 'pending' ? "bg-amber-500/10 text-amber-500 border-amber-500/20" : "bg-red-500/10 text-red-500 border-red-500/20"
               )}>
                  {project.status}
               </span>
               <div className="flex items-center space-x-1">
                  <button className="p-1.5 text-gray-600 hover:text-white transition-colors">
                     <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                  <button className="p-1.5 text-gray-600 hover:text-emerald-500 transition-colors">
                     <ShieldCheck className="w-3.5 h-3.5" />
                  </button>
                  <button className="p-1.5 text-gray-600 hover:text-red-500 transition-colors">
                     <Ban className="w-3.5 h-3.5" />
                  </button>
               </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminProjects;
