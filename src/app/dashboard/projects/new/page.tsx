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
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardProjectNewPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tech_stack: '',
    github_url: '',
    demo_url: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('Deployment node synchronized successfully. Payload staged.');
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-10">
      <Link href="/dashboard/projects" className="flex items-center space-x-2 text-gray-500 hover:text-white transition-colors group w-fit">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-[10px] font-bold uppercase tracking-widest">Abort Process</span>
      </Link>

      <header>
        <h1 className="text-xl font-bold mb-0.5">Initialize Deployment</h1>
        <p className="text-xs text-gray-400 font-medium tracking-tight">Stage a new zero-trust architecture or project baseline into the ecosystem.</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-[#0c0c0c] border border-white/5 rounded-xl p-8 md:p-10 text-left relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-500 to-indigo-500"></div>
           
           <div className="space-y-8">
              {/* Primary Params */}
              <div>
                 <h2 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-6 flex items-center border-b border-white/[0.03] pb-4">
                   <Rocket className="w-3.5 h-3.5 mr-2 text-blue-500" /> Primary Descriptors
                 </h2>
                 <div className="space-y-6">
                    <div>
                      <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2 block ml-1">Project Identifier (Title)</label>
                      <input 
                        type="text" 
                        name="title"
                        required
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="E.g., zk-SNARK Authentication Router"
                        className="w-full bg-[#050505] border border-white/10 rounded-lg py-3 px-4 text-xs font-bold text-white focus:outline-none focus:border-blue-500/50 transition-colors shadow-inner"
                      />
                    </div>

                    <div>
                      <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center ml-1"><FileText className="w-3 h-3 mr-1" /> Executive Summary</label>
                      <textarea 
                        name="description"
                        required
                        rows={5}
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Describe the architectural mechanisms and threat models your project mitigates..."
                        className="w-full bg-[#050505] border border-white/10 rounded-lg py-3 px-4 text-xs font-medium text-gray-300 focus:outline-none focus:border-blue-500/50 transition-colors resize-none leading-relaxed shadow-inner"
                      />
                    </div>

                    <div>
                      <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center ml-1"><Code2 className="w-3 h-3 mr-1" /> Technology Stack</label>
                      <input 
                        type="text" 
                        name="tech_stack"
                        value={formData.tech_stack}
                        onChange={handleChange}
                        placeholder="Solidity, Rust, React, GraphQL (comma separated)"
                        className="w-full bg-[#050505] border border-white/10 rounded-lg py-3 px-4 text-xs font-mono text-blue-400 focus:outline-none focus:border-blue-500/50 transition-colors shadow-inner"
                      />
                    </div>
                 </div>
              </div>

              {/* Topology Links */}
              <div className="pt-4">
                 <h2 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-6 flex items-center border-b border-white/[0.03] pb-4">
                   <Globe className="w-3.5 h-3.5 mr-2" /> External Connectors
                 </h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2 block ml-1">VCS Repository (GitHub)</label>
                      <div className="relative">
                        <Github className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input 
                          type="url" 
                          name="github_url"
                          value={formData.github_url}
                          onChange={handleChange}
                          placeholder="https://github.com/org/repo"
                          className="w-full bg-[#050505] border border-white/10 rounded-lg py-3 pl-12 pr-4 text-xs font-mono text-gray-400 focus:outline-none focus:border-blue-500/50 transition-colors shadow-inner"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2 block ml-1">Live Endpoint (Demo)</label>
                      <div className="relative">
                        <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input 
                          type="url" 
                          name="demo_url"
                          value={formData.demo_url}
                          onChange={handleChange}
                          placeholder="https://sandbox.project.io"
                          className="w-full bg-[#050505] border border-white/10 rounded-lg py-3 pl-12 pr-4 text-xs font-mono text-gray-400 focus:outline-none focus:border-blue-500/50 transition-colors shadow-inner"
                        />
                      </div>
                    </div>
                 </div>
              </div>

              <div className="pt-8 flex justify-end items-center border-t border-white/[0.05]">
                 <button 
                   type="submit" 
                   disabled={loading}
                   className="btn-primary py-3 px-8 text-xs font-bold uppercase tracking-widest flex items-center space-x-2 disabled:opacity-50"
                 >
                    {loading ? <span className="animate-pulse">Staging Payload...</span> : <><span>Establish Deployment</span> <Upload className="w-3.5 h-3.5" /></>}
                 </button>
              </div>
           </div>
        </div>
      </form>
    </div>
  );
}
