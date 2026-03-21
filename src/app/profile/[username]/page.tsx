'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { User, Github, Globe, Award, Code, Shield, Mail, ArrowLeft, Twitter, ExternalLink, Terminal, Activity, Zap } from 'lucide-react';
import Link from 'next/link';
import { Project } from '@/types';
import { cn } from '@/lib/utils';
import Loader from '@/components/ui/Loader';

const PublicProfilePage = () => {
  const params = useParams();
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        
        // Fetch user profile by username
        const userRes = await fetch(`${baseUrl}/users/profile/${params.username}`);
        if (!userRes.ok) throw new Error('User not found.');
        const userData = await userRes.json();
        setProfile(userData);

        // Fetch projects by author
        const projRes = await fetch(`${baseUrl}/projects`);
        if (projRes.ok) {
           const allProjects = await projRes.json();
           const userProjects = allProjects
             .filter((p: any) => (p.created_by?._id || p.created_by) === (userData._id || userData.id))
             .map((p: any) => ({ ...p, id: p._id }));
           setProjects(userProjects);
        }
      } catch (err) {
        console.error('Failed to fetch profile data:', err);
        router.push('/community');
      } finally {
        setLoading(false);
      }
    };
    fetchProfileData();
  }, [params.username, router]);

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#050505] space-y-6">
       <Loader />
       <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-700 italic">Loading Profile...</p>
    </div>
  );

  if (!profile) return null;

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 bg-[#050505]">
      <div className="max-w-6xl mx-auto">
        <Link href="/community" className="flex items-center space-x-2 text-gray-600 hover:text-white transition-colors mb-10 group">
           <ArrowLeft className="w-4 h-4" />
           <span className="text-[10px] font-bold uppercase tracking-widest">Back to Community</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           {/* Sidebar Profile Card */}
           <div className="lg:col-span-1 space-y-4">
              <div className="bg-[#0c0c0c] border border-white/5 p-8 rounded-lg relative overflow-hidden text-center">
                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-transparent to-blue-600"></div>
                 <div className="relative mb-6">
                     <div className="w-24 h-24 rounded border border-white/5 bg-white/[0.02] mx-auto overflow-hidden flex items-center justify-center text-3xl font-black text-gray-400 italic shadow-2xl">
                       {profile.picture || profile.avatar_url ? (
                         <img src={profile.picture || profile.avatar_url} alt={profile.name} className="w-full h-full object-cover" />
                       ) : (
                         profile.name?.[0] || 'U'
                       )}
                     </div>
                    <div className="absolute -bottom-1 right-1/2 translate-x-12 bg-blue-600 p-1.5 rounded border border-[#0c0c0c] shadow-lg">
                       <Shield className="w-3.5 h-3.5 text-white" />
                    </div>
                 </div>
                 <h1 className="text-xl font-bold mb-1 uppercase tracking-tight italic text-white">{profile.name}</h1>
                 <p className="text-blue-500 font-bold text-[10px] tracking-widest uppercase mb-8">@{profile.username}</p>
                 
                 <div className="flex flex-wrap gap-1.5 justify-center mb-10">
                    {profile.skills?.slice(0, 5).map((skill: string) => (
                      <span key={skill} className="px-2 py-0.5 bg-white/[0.02] border border-white/5 rounded text-[8px] font-bold text-gray-600 uppercase tracking-tighter">
                         {skill}
                      </span>
                    ))}
                 </div>

                 <div className="grid grid-cols-2 gap-2 pt-8 border-t border-white/[0.03]">
                    <a href={profile.github} target="_blank" className="flex items-center justify-center space-x-2 py-2.5 bg-white/[0.02] border border-white/5 rounded-md hover:bg-white/[0.05] transition-colors">
                       <Github className="w-3.5 h-3.5 text-gray-600" /> <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">GitHub</span>
                    </a>
                    <button className="flex items-center justify-center space-x-2 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors shadow-lg shadow-blue-900/40">
                       <Mail className="w-3.5 h-3.5" /> <span className="text-[10px] font-bold uppercase tracking-widest">Message</span>
                    </button>
                 </div>
              </div>

              <div className="bg-[#0c0c0c] border border-white/5 p-6 rounded-lg text-left">
                 <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-700 mb-6 flex items-center space-x-2">
                    <Globe className="w-3.5 h-3.5" />
                    <span>Social Links</span>
                 </p>
                 <div className="space-y-4">
                    <div className="flex items-center justify-between py-2 border-b border-white/[0.03]">
                       <div className="flex items-center space-x-2 text-[10px] font-bold text-gray-600 uppercase tracking-tight">
                          <Twitter className="w-3.5 h-3.5" /> <span>Twitter</span>
                       </div>
                       <span className="text-[9px] font-bold text-blue-400">@{profile.twitter || 'none'}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-white/[0.03]">
                       <div className="flex items-center space-x-2 text-[10px] font-bold text-gray-600 uppercase tracking-tight">
                          <Globe className="w-3.5 h-3.5" /> <span>Website</span>
                       </div>
                       <span className="text-[9px] font-bold text-blue-500 uppercase tracking-tighter">{profile.portfolio ? 'VISIT' : 'NONE'}</span>
                    </div>
                 </div>
              </div>
           </div>

           {/* Content Sections */}
           <div className="lg:col-span-2 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 {[
                   { label: 'Points', value: (profile.contributions || 0).toLocaleString(), icon: Zap },
                   { label: 'Projects', value: projects.length.toString(), icon: Code },
                   { label: 'Joined', value: new Date(profile.createdAt || Date.now()).getFullYear().toString(), icon: User }
                 ].map((stat, i) => (
                   <div key={i} className="bg-[#0c0c0c] border border-white/5 p-6 flex flex-col items-center text-center rounded-lg">
                      <stat.icon className={cn("w-4 h-4 mb-4", stat.label === 'Points' ? "text-amber-500" : "text-blue-500")} />
                      <p className="text-xl font-black mb-1 italic text-gray-200">{stat.value}</p>
                      <p className="text-[9px] text-gray-700 font-bold uppercase tracking-widest">{stat.label}</p>
                   </div>
                 ))}
              </div>

              <div className="space-y-6">
                 <div className="flex items-center justify-between px-1">
                    <div className="flex items-center space-x-2">
                       <Terminal className="w-3.5 h-3.5 text-blue-600" />
                       <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">Projects</h2>
                    </div>
                    <span className="text-[10px] text-gray-700 font-bold uppercase tracking-tighter italic">{projects.length} Found</span>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {projects.map((project, idx) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        className="bg-[#0c0c0c] border border-white/5 p-6 hover:border-blue-500/20 transition-all group rounded-lg text-left"
                      >
                         <h4 className="text-xs font-bold mb-2 group-hover:text-blue-500 transition-colors uppercase tracking-tight italic text-gray-300">{project.title}</h4>
                         <p className="text-gray-600 text-[10px] mb-6 line-clamp-2 leading-snug uppercase tracking-tighter">{project.description}</p>
                         <div className="flex items-center justify-between pt-4 border-t border-white/[0.02]">
                            <div className="flex space-x-1.5">
                               {project.tech_stack?.slice(0, 2).map(t => (
                                 <span key={t} className="px-1.5 py-0.5 bg-white/[0.02] border border-white/5 rounded text-[8px] font-bold text-gray-600 uppercase tracking-tighter">{t}</span>
                               ))}
                            </div>
                            <Link href={`/projects/${project.id}`} className="text-[9px] font-bold text-blue-600 hover:text-blue-500 uppercase tracking-widest">View →</Link>
                         </div>
                      </motion.div>
                    ))}
                    {projects.length === 0 && (
                       <div className="col-span-full py-20 text-center bg-white/[0.01] border border-dashed border-white/5 rounded-lg">
                          <p className="text-[9px] font-bold uppercase tracking-widest text-gray-600 italic">No projects found for this member.</p>
                       </div>
                    )}
                 </div>
              </div>

              <div className="bg-[#0c0c0c] border border-white/5 p-8 rounded-lg relative overflow-hidden group text-left">
                 <div className="absolute top-0 right-0 p-4 opacity-5">
                    <User className="w-24 h-24" />
                 </div>
                 <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-6 underline underline-offset-8 decoration-white/5">About</h2>
                 <p className="text-gray-600 text-[11px] font-medium uppercase tracking-tighter leading-snug mb-8 max-w-lg">{profile.bio || 'This member has not written about themselves yet.'}</p>
                 <div className="flex items-center space-x-6">
                    <div className="flex -space-x-2">
                       {[1,2,3,4].map(i => (
                         <div key={i} className="w-7 h-7 rounded-full border-2 border-[#0c0c0c] bg-white/5 flex items-center justify-center text-[9px] font-bold text-gray-700">U{i}</div>
                       ))}
                    </div>
                    <span className="text-[9px] text-gray-800 font-bold uppercase tracking-widest italic">Member of the community</span>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default PublicProfilePage;
