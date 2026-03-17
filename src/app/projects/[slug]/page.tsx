'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Github, Globe, Star, Calendar, User, ArrowLeft, Shield, Share2 } from 'lucide-react';
import { Project } from '@/types';
import Link from 'next/link';

const ProjectDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const res = await fetch(`${baseUrl}/projects/${params.slug}`);
        if (!res.ok) throw new Error('Project not found in registry.');
        const data = await res.json();
        setProject(data);
      } catch (err) {
        console.error('Failed to fetch project detail:', err);
        router.push('/projects');
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [params.slug, router]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505]">
      <div className="w-12 h-12 bg-blue-600 rounded flex items-center justify-center animate-pulse shadow-2xl shadow-blue-500/20">
         <Shield className="w-6 h-6 text-white animate-spin" />
      </div>
    </div>
  );

  if (!project) return null;

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between mb-12">
           <Link href="/projects" className="flex items-center space-x-2 text-gray-500 hover:text-white transition-colors group">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-bold text-[10px] uppercase tracking-widest">Back to Ecosystem Registry</span>
           </Link>
           <div className="flex items-center space-x-4">
              <button className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
                <Share2 className="w-4 h-4 text-gray-400" />
              </button>
              <button className="bg-blue-600 hover:bg-blue-500 text-white py-3 px-8 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all shadow-xl shadow-blue-900/20">Audit Now</button>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-white italic uppercase">{project.title}</h1>
              <div className="flex flex-wrap gap-3 mb-12">
                {project.tech_stack?.map((tech: string) => (
                  <span key={tech} className="px-3 py-1 bg-blue-500/10 text-blue-400 text-xs font-bold rounded-lg border border-blue-500/20 uppercase tracking-tighter transition-all hover:bg-blue-500/20 cursor-default">
                    {tech}
                  </span>
                ))}
              </div>
              <p className="text-xl text-gray-400 leading-relaxed mb-12 max-w-2xl font-medium uppercase tracking-tighter leading-snug">{project.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="bg-[#0c0c0c] border border-white/5 p-8 group overflow-hidden relative rounded-2xl">
                    <div className="absolute inset-0 bg-blue-600/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                    <Github className="w-10 h-10 text-blue-500 mb-6 group-hover:scale-110 transition-transform relative z-10" />
                    <h3 className="text-xl font-bold mb-2 relative z-10 text-white italic">GitHub Core</h3>
                    <p className="text-[11px] text-gray-600 mb-6 relative z-10 uppercase tracking-tighter leading-snug font-bold">Access the open-source repository and contribute to the logic nodes of this deployment.</p>
                    <a href={project.github_url} target="_blank" className="text-blue-400 font-bold text-xs flex items-center space-x-2 group relative z-10 uppercase tracking-widest hover:text-blue-300 transition-colors">
                       <span>Explore Repository</span>
                       <ArrowLeft className="w-4 h-4 rotate-180" />
                    </a>
                 </div>
                 {project.demo_url && (
                    <div className="bg-[#0c0c0c] border border-white/5 p-8 group overflow-hidden relative rounded-2xl">
                       <div className="absolute inset-0 bg-indigo-600/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                       <Globe className="w-10 h-10 text-indigo-500 mb-6 group-hover:scale-110 transition-transform relative z-10" />
                       <h3 className="text-xl font-bold mb-2 relative z-10 text-white italic">Live Portal</h3>
                       <p className="text-[11px] text-gray-600 mb-6 relative z-10 uppercase tracking-tighter leading-snug font-bold">Experience the application logic in a live deployment environment on the global network.</p>
                       <a href={project.demo_url} target="_blank" className="text-indigo-400 font-bold text-xs flex items-center space-x-2 group relative z-10 uppercase tracking-widest hover:text-indigo-300 transition-colors">
                          <span>Live Demo</span>
                          <ArrowLeft className="w-4 h-4 rotate-180" />
                       </a>
                    </div>
                 )}
              </div>
            </motion.div>

            {/* Readme Section Mockup */}
            <div className="bg-[#0c0c0c] border border-white/5 p-10 rounded-2xl relative overflow-hidden">
               <div className="absolute top-0 left-0 w-2 h-full bg-blue-600/20"></div>
               <h2 className="text-2xl font-bold mb-8 flex items-center space-x-3 text-white italic uppercase tracking-tight">
                  <Shield className="w-6 h-6 text-blue-500" />
                  <span>Security Whitepaper</span>
               </h2>
               <div className="prose prose-invert max-w-none text-gray-400 font-medium uppercase tracking-tighter leading-relaxed">
                  <p className="mb-6">This project implements a multi-layer security architecture consisting of zero-knowledge proofs and hardware security module (HSM) support for automated node verification.</p>
                  <h4 className="text-white mb-4 italic tracking-widest">Core Infrastructure:</h4>
                  <ul className="list-disc pl-6 space-y-3 mb-12">
                     <li>Layer 1: End-to-end encryption with AES-256 Rotation</li>
                     <li>Layer 2: Decentralized Identity Gateway (DIG)</li>
                     <li>Layer 3: Real-time threat detection heuristics</li>
                  </ul>
                  <div className="bg-[#050505] p-6 rounded-xl border border-white/5 font-mono text-xs shadow-inner">
                     <span className="text-blue-400">// Initialization code module 0x7F</span><br />
                     <span className="text-gray-500 font-bold">async</span> func <span className="text-indigo-500">initializeVault</span>() {"{"} <br />
                     &nbsp;&nbsp;await <span className="text-violet-400 italic">SecureLayer</span>.<span className="text-indigo-500 font-bold">arm</span>(); <br />
                     &nbsp;&nbsp;<span className="text-gray-500 font-bold">return</span> <span className="text-emerald-400">"VAULT_ACTIVE_SYMMETRIC"</span>; <br />
                     {"}"}
                  </div>
               </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-[#0c0c0c] border border-white/5 p-8 rounded-2xl relative">
               <div className="absolute top-0 right-0 p-3 opacity-20">
                  <Shield className="w-8 h-8 text-blue-900" />
               </div>
               <h3 className="text-[10px] font-bold uppercase text-gray-600 tracking-widest mb-8 border-l-2 border-blue-500 pl-4">Node Metadata</h3>
               <div className="space-y-6">
                  <div className="flex items-center justify-between">
                     <span className="flex items-center space-x-2 text-[10px] uppercase font-bold text-gray-500 tracking-widest">
                        <User className="w-3.5 h-3.5" /> <span>Developer</span>
                     </span>
                     <span className="text-xs font-bold text-gray-200 tracking-tight italic">{project.created_by?.name || 'Anonymous User'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                     <span className="flex items-center space-x-2 text-[10px] uppercase font-bold text-gray-500 tracking-widest">
                        <Calendar className="w-3.5 h-3.5" /> <span>Created</span>
                     </span>
                     <span className="text-xs font-bold text-gray-200 tracking-tight">{new Date(project.created_at || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center justify-between">
                     <span className="flex items-center space-x-2 text-[10px] uppercase font-bold text-gray-500 tracking-widest">
                        <Star className="w-3.5 h-3.5" /> <span>Reputation Rank</span>
                     </span>
                     <span className="text-xs font-bold text-blue-500 italic">ID_{project._id?.slice(-4).toUpperCase() || 'CORE'}</span>
                  </div>
               </div>
            </div>

            <div className="bg-[#0c0c0c] border border-white/5 p-8 rounded-2xl relative overflow-hidden shadow-2xl shadow-blue-900/10">
               <div className="absolute bottom-0 right-0 p-2 opacity-10">
                  <Shield className="w-16 h-16 text-blue-500" />
               </div>
               <h3 className="text-[10px] font-bold uppercase text-gray-600 tracking-widest mb-8 border-l-2 border-indigo-500 pl-4">Ecosystem Integrity</h3>
               <div className="flex items-end justify-between mb-4">
                  <p className="text-3xl font-black italic text-white tracking-widest">98<span className="text-blue-600 text-lg uppercase font-bold not-italic">pts</span></p>
                  <span className="text-emerald-500 text-[9px] font-black uppercase tracking-widest">+2.4%</span>
               </div>
               <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="w-[98%] h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-500 animate-pulse"></div>
               </div>
               <p className="mt-6 text-[10px] text-gray-600 font-bold uppercase tracking-widest italic leading-snug">Calculated based on code quality audit, cryptographic strength, and community trust nodes.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
