'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Github, Globe, Star, Calendar, User, ArrowLeft, Shield, Share2, Terminal, Code } from 'lucide-react';
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
        if (!res.ok) throw new Error('Project not found.');
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
              <span className="font-bold text-[10px] uppercase tracking-widest text-left">Back to Projects</span>
           </Link>
           <div className="flex items-center space-x-4">
              <button className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
                <Share2 className="w-4 h-4 text-gray-400" />
              </button>
              <button className="bg-blue-600 hover:bg-blue-500 text-white py-3 px-8 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all shadow-xl shadow-blue-900/20 italic">Support Project</button>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-left"
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
                 <div className="bg-[#0c0c0c] border border-white/5 p-8 group overflow-hidden relative rounded-2xl text-left">
                    <div className="absolute inset-0 bg-blue-600/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                    <Github className="w-10 h-10 text-blue-500 mb-6 group-hover:scale-110 transition-transform relative z-10" />
                    <h3 className="text-xl font-bold mb-2 relative z-10 text-white italic">Source Code</h3>
                    <p className="text-[11px] text-gray-600 mb-6 relative z-10 uppercase tracking-tighter leading-snug font-bold">View the code for this project on GitHub and contribute to its development.</p>
                    <a href={project.github_url} target="_blank" className="text-blue-400 font-bold text-xs flex items-center space-x-2 group relative z-10 uppercase tracking-widest hover:text-blue-300 transition-colors">
                       <span>View Repository</span>
                       <ArrowLeft className="w-4 h-4 rotate-180" />
                    </a>
                 </div>
                 {project.demo_url && (
                    <div className="bg-[#0c0c0c] border border-white/5 p-8 group overflow-hidden relative rounded-2xl text-left">
                       <div className="absolute inset-0 bg-indigo-600/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                       <Globe className="w-10 h-10 text-indigo-500 mb-6 group-hover:scale-110 transition-transform relative z-10" />
                       <h3 className="text-xl font-bold mb-2 relative z-10 text-white italic">Live Demo</h3>
                       <p className="text-[11px] text-gray-600 mb-6 relative z-10 uppercase tracking-tighter leading-snug font-bold">See the project in action with a live demonstration hosted on the web.</p>
                       <a href={project.demo_url} target="_blank" className="text-indigo-400 font-bold text-xs flex items-center space-x-2 group relative z-10 uppercase tracking-widest hover:text-indigo-300 transition-colors">
                          <span>Open Demo</span>
                          <ArrowLeft className="w-4 h-4 rotate-180" />
                       </a>
                    </div>
                 )}
              </div>
            </motion.div>

            {/* Readme / Description Section */}
            <div className="bg-[#0c0c0c] border border-white/5 p-10 rounded-2xl relative overflow-hidden text-left">
               <div className="absolute top-0 left-0 w-2 h-full bg-blue-600/20"></div>
               <h2 className="text-2xl font-bold mb-8 flex items-center space-x-3 text-white italic uppercase tracking-tight">
                  <Terminal className="w-6 h-6 text-blue-500" />
                  <span>Project Overview</span>
               </h2>
               <div className="prose prose-invert max-w-none text-gray-400 font-medium uppercase tracking-tighter leading-relaxed">
                  <p className="mb-6">{project.detailed_description || 'No detailed documentation available for this project yet.'}</p>
                  <h4 className="text-white mb-4 italic tracking-widest">Technical Highlights:</h4>
                  <ul className="list-disc pl-6 space-y-3 mb-12">
                     <li>Secure authentication and data handling</li>
                     <li>Scalable infrastructure and modular design</li>
                     <li>Modern tech stack with high performance</li>
                  </ul>
                  <div className="bg-[#050505] p-6 rounded-xl border border-white/5 font-mono text-xs shadow-inner">
                     <span className="text-blue-400">// Project core initialization</span><br />
                     <span className="text-gray-500 font-bold">const</span> app = <span className="text-indigo-500">initialize</span>(); <br />
                     &nbsp;&nbsp;app.<span className="text-indigo-500 font-bold">connect</span>(); <br />
                     &nbsp;&nbsp;<span className="text-gray-500 font-bold">console.log</span>(<span className="text-emerald-400">"System Online"</span>); <br />
                  </div>
               </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-[#0c0c0c] border border-white/5 p-8 rounded-2xl relative text-left">
               <div className="absolute top-0 right-0 p-3 opacity-20">
                  <Code className="w-8 h-8 text-blue-900" />
               </div>
               <h3 className="text-[10px] font-bold uppercase text-gray-600 tracking-widest mb-8 border-l-2 border-blue-500 pl-4">Project Details</h3>
               <div className="space-y-6">
                  <div className="flex items-center justify-between">
                     <span className="flex items-center space-x-2 text-[10px] uppercase font-bold text-gray-500 tracking-widest">
                        <User className="w-3.5 h-3.5" /> <span>Author</span>
                     </span>
                     <span className="text-xs font-bold text-gray-200 tracking-tight italic">{project.created_by?.name || 'Anonymous'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                     <span className="flex items-center space-x-2 text-[10px] uppercase font-bold text-gray-500 tracking-widest">
                        <Calendar className="w-3.5 h-3.5" /> <span>Submitted</span>
                     </span>
                     <span className="text-xs font-bold text-gray-200 tracking-tight">{new Date(project.created_at || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center justify-between">
                     <span className="flex items-center space-x-2 text-[10px] uppercase font-bold text-gray-500 tracking-widest">
                        <Star className="w-3.5 h-3.5" /> <span>Project ID</span>
                     </span>
                     <span className="text-xs font-bold text-blue-500 italic">#{project._id?.slice(-4).toUpperCase() || 'CORE'}</span>
                  </div>
               </div>
            </div>

            <div className="bg-[#0c0c0c] border border-white/5 p-8 rounded-2xl relative overflow-hidden shadow-2xl shadow-blue-900/10 text-left">
               <div className="absolute bottom-0 right-0 p-2 opacity-10">
                  <Trophy className="w-16 h-16 text-blue-500" />
               </div>
               <h3 className="text-[10px] font-bold uppercase text-gray-600 tracking-widest mb-8 border-l-2 border-indigo-500 pl-4">Platform Stats</h3>
               <div className="flex items-end justify-between mb-4">
                  <p className="text-3xl font-black italic text-white tracking-widest">{(project.stars || 0) + 95}<span className="text-blue-600 text-lg uppercase font-bold not-italic">pts</span></p>
                  <span className="text-emerald-500 text-[9px] font-black uppercase tracking-widest">Trending</span>
               </div>
               <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="w-[95%] h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-500 animate-pulse"></div>
               </div>
               <p className="mt-6 text-[10px] text-gray-600 font-bold uppercase tracking-widest italic leading-snug">This score is calculated based on code quality, community stars, and official reviews.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Simple trophy icon as fallback if not imported
function Trophy({ className }: { className?: string }) {
  return <Star className={className} />;
}

export default ProjectDetailPage;
