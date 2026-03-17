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
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/projects/${params.id}`);
        if (!res.ok) throw new Error('Project not found');
        const data = await res.json();
        setProject(data);
      } catch (err) {
        console.error(err);
        router.push('/projects');
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [params.id, router]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505]">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (!project) return null;

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between mb-12">
           <Link href="/projects" className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors group">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium text-sm">Back to Ecosystem</span>
           </Link>
           <div className="flex items-center space-x-4">
              <button className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="btn-primary py-3 px-8">Audit Now</button>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">{project.title}</h1>
              <div className="flex flex-wrap gap-3 mb-12">
                {project.tech_stack.map(tech => (
                  <span key={tech} className="px-3 py-1 bg-blue-500/10 text-blue-400 text-xs font-bold rounded-lg border border-blue-500/20">
                    {tech}
                  </span>
                ))}
              </div>
              <p className="text-xl text-gray-400 leading-relaxed mb-12 max-w-2xl">{project.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="glass-card p-8 group overflow-hidden relative">
                    <div className="absolute inset-0 bg-blue-600/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                    <Github className="w-10 h-10 text-blue-500 mb-6 group-hover:scale-110 transition-transform relative z-10" />
                    <h3 className="text-xl font-bold mb-2 relative z-10">GitHub Core</h3>
                    <p className="text-sm text-gray-500 mb-6 relative z-10">Access the open-source repository and contribute to the logic.</p>
                    <a href={project.github_url} target="_blank" className="text-blue-400 font-bold flex items-center space-x-2 group relative z-10">
                       <span>Explore Repository</span>
                       <ArrowLeft className="w-4 h-4 rotate-180" />
                    </a>
                 </div>
                 {project.demo_url && (
                    <div className="glass-card p-8 group overflow-hidden relative">
                       <div className="absolute inset-0 bg-violet-600/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                       <Globe className="w-10 h-10 text-violet-500 mb-6 group-hover:scale-110 transition-transform relative z-10" />
                       <h3 className="text-xl font-bold mb-2 relative z-10">Live Portal</h3>
                       <p className="text-sm text-gray-500 mb-6 relative z-10">Experience the application logic in a live environment.</p>
                       <a href={project.demo_url} target="_blank" className="text-violet-400 font-bold flex items-center space-x-2 group relative z-10">
                          <span>Live Demo</span>
                          <ArrowLeft className="w-4 h-4 rotate-180" />
                       </a>
                    </div>
                 )}
              </div>
            </motion.div>

            {/* Readme Section Mockup */}
            <div className="glass-card p-10 border border-white/5">
               <h2 className="text-2xl font-bold mb-8 flex items-center space-x-3">
                  <Shield className="w-6 h-6 text-blue-500" />
                  <span>Security Whitepaper</span>
               </h2>
               <div className="prose prose-invert max-w-none text-gray-400">
                  <p className="mb-6">This project implements a multi-layer security architecture consisting of zero-knowledge proofs and hardware security module (HSM) support.</p>
                  <h4 className="text-white mb-4">Core Components:</h4>
                  <ul className="list-disc pl-6 space-y-3 mb-12">
                     <li>Layer 1: End-to-end encryption with AES-256</li>
                     <li>Layer 2: Decentralized identity management</li>
                     <li>Layer 3: Real-time threat detection heuristics</li>
                  </ul>
                  <div className="bg-[#050505] p-6 rounded-xl border border-white/5 font-mono text-sm">
                     <span className="text-blue-400">// Initialization code module</span><br />
                     <span className="text-gray-500">async</span> func <span className="text-amber-500">initializeVault</span>() {"{"} <br />
                     &nbsp;&nbsp;await <span className="text-violet-400">SecureLayer</span>.<span className="text-amber-500">arm</span>(); <br />
                     &nbsp;&nbsp;<span className="text-gray-500">return</span> <span className="text-green-400">"VAULT_ACTIVE"</span>; <br />
                     {"}"}
                  </div>
               </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            <div className="glass-card p-8">
               <h3 className="text-sm font-bold uppercase text-gray-500 tracking-widest mb-8">Metadata</h3>
               <div className="space-y-6">
                  <div className="flex items-center justify-between">
                     <span className="flex items-center space-x-2 text-sm text-gray-400">
                        <User className="w-4 h-4" /> <span>Developer</span>
                     </span>
                     <span className="text-sm font-bold text-white">Anand Verse</span>
                  </div>
                  <div className="flex items-center justify-between">
                     <span className="flex items-center space-x-2 text-sm text-gray-400">
                        <Calendar className="w-4 h-4" /> <span>Created</span>
                     </span>
                     <span className="text-sm font-bold text-white">Mar 17, 2024</span>
                  </div>
                  <div className="flex items-center justify-between">
                     <span className="flex items-center space-x-2 text-sm text-gray-400">
                        <Star className="w-4 h-4" /> <span>Ecosystem Rank</span>
                     </span>
                     <span className="text-sm font-bold text-blue-500">Top 1%</span>
                  </div>
               </div>
            </div>

            <div className="glass-card p-8">
               <h3 className="text-sm font-bold uppercase text-gray-500 tracking-widest mb-8">Ecosystem Health</h3>
               <div className="flex items-end justify-between mb-4">
                  <p className="text-3xl font-bold">98/100</p>
                  <span className="text-green-500 text-xs font-bold font-mono">+2.4%</span>
               </div>
               <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="w-[98%] h-full bg-gradient-to-r from-blue-600 to-emerald-500 animate-pulse"></div>
               </div>
               <p className="mt-4 text-xs text-gray-500">Calculated based on code quality, audit frequency, and community trust.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
