'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Search, 
  Filter, 
  MessageSquare, 
  Github, 
  Twitter, 
  Mail,
  Zap,
  ShieldCheck,
  Code2,
  Terminal,
  Activity,
  Globe,
  User
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const CommunityPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [developers, setDevelopers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All Members' },
    { id: 'developer', label: 'Developers' },
    { id: 'judge', label: 'Judges' },
    { id: 'admin', label: 'Admins' },
  ];

  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const res = await fetch(`${baseUrl}/users`);
        if (!res.ok) throw new Error('Failed to load community members.');
        const data = await res.json();
        setDevelopers(data);
      } catch (err) {
        console.error('Failed to fetch community data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDevelopers();
  }, []);

  const filteredDevelopers = developers.filter(dev => {
    const matchesSearch = (dev.name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) || 
                          (dev.username?.toLowerCase() || '').includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'all' || dev.role === activeFilter;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-20 px-6 bg-[#050505] flex items-center justify-center">
        <div className="text-blue-500 font-bold italic animate-pulse tracking-widest uppercase text-xs">Loading community members...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 bg-[#050505] overflow-hidden">
      {/* Decorative Network Grid Backing */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-[0.02] inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
             <div className="inline-flex items-center space-x-2 bg-blue-600/10 border border-blue-600/20 rounded-full px-4 py-1.5 mb-6">
                <Users className="w-4 h-4 text-blue-500" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400">Community</span>
             </div>
             <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-white mb-4">
                Developer <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 italic">Directory</span>
             </h1>
             <p className="text-gray-500 text-sm font-bold uppercase tracking-tighter leading-relaxed max-w-xl text-left">
                Connect with the best developers, security experts, and designers in the ecosystem. Every member contributes to the growth and security of the platform.
             </p>
          </div>
          <div className="flex bg-[#0c0c0c] border border-white/5 rounded-xl p-6 md:p-8 space-x-12 shrink-0">
             <div className="text-center">
                <p className="text-[9px] font-bold text-gray-700 uppercase tracking-widest mb-1 font-black">Total Members</p>
                <p className="text-2xl font-black text-white italic tracking-tighter">{developers.length}</p>
             </div>
             <div className="w-px h-full bg-white/5" />
             <div className="text-center">
                <p className="text-[9px] font-bold text-gray-700 uppercase tracking-widest mb-1 font-black">Status</p>
                <p className="text-2xl font-black text-blue-500 italic tracking-tighter uppercase px-2">Online</p>
             </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
           <div className="flex space-x-2 bg-[#0c0c0c] border border-white/5 p-1 rounded-xl overflow-x-auto w-full md:w-auto">
              {categories.map((cat) => (
                <button 
                  key={cat.id}
                  onClick={() => setActiveFilter(cat.id)}
                  className={cn(
                    "px-6 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-all",
                    activeFilter === cat.id ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20" : "text-gray-500 hover:text-gray-300"
                  )}
                >
                  {cat.label}
                </button>
              ))}
           </div>
           
           <div className="w-full md:w-96 relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-700 group-hover:text-blue-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Search by name or username..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0c0c0c] border border-white/10 rounded-xl py-3.5 pl-12 pr-6 text-xs text-white focus:outline-none focus:border-blue-500/50 transition-all font-medium shadow-2xl"
              />
           </div>
        </div>

        {/* Developer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20 text-white">
           {filteredDevelopers.map((dev, idx) => (
             <motion.div 
               key={dev._id}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: idx * 0.05 }}
               className="bg-[#0c0c0c] border border-white/5 rounded-2xl p-8 relative overflow-hidden group hover:border-blue-500/20 transition-all duration-500"
             >
                {/* Status Indicator */}
                <div className="absolute top-8 right-8 flex items-center space-x-1.5">
                   <div className="w-1.5 h-1.5 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.3)] bg-emerald-500 animate-pulse"></div>
                   <span className="text-[8px] font-bold text-gray-600 uppercase tracking-widest">Active</span>
                </div>

                <div className="flex items-start space-x-6 mb-8">
                   <div className="relative">
                      <div className="w-16 h-16 rounded-xl bg-[#050505] border border-white/10 overflow-hidden p-1 group-hover:border-blue-500/30 transition-all duration-700 flex items-center justify-center">
                         {dev.avatar_url ? (
                           <img src={dev.avatar_url} alt={dev.name} className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700 rounded-lg" />
                         ) : (
                           <User className="w-8 h-8 text-gray-800" />
                         )}
                      </div>
                      <div className="absolute -bottom-1 -right-1 bg-blue-600 rounded p-1 border border-[#0c0c0c] shadow-xl">
                         <ShieldCheck className="w-3.5 h-3.5 text-white" />
                      </div>
                   </div>
                   <div className="pt-1 text-left">
                      <h3 className="text-sm font-black text-gray-200 uppercase tracking-tight group-hover:text-blue-400 transition-colors mb-1">{dev.name}</h3>
                      <p className="text-[9px] font-bold text-blue-500 uppercase tracking-[0.2em] italic">:: {dev.role}</p>
                   </div>
                </div>

                <p className="text-[10px] text-gray-500 leading-relaxed font-bold uppercase tracking-tighter h-10 mb-8 border-l-2 border-white/5 pl-4 group-hover:border-blue-500/30 transition-colors line-clamp-2 text-left">
                  {dev.bio || 'Member has not set up their public profile yet.'}
                </p>

                <div className="flex flex-wrap gap-2 mb-8 h-[52px] content-start overflow-hidden">
                   {(dev.skills || ['Core Member']).map((skill: string, i: number) => (
                     <span key={i} className="text-[8px] font-bold text-gray-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded-sm uppercase tracking-widest">{skill}</span>
                   ))}
                </div>

                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/[0.03]">
                   <div className="text-left">
                      <p className="text-[8px] text-gray-700 font-bold uppercase tracking-widest mb-1.5 italic">User ID</p>
                      <div className="flex items-center space-x-2">
                        <Activity className="w-3.5 h-3.5 text-blue-500" />
                        <span className="text-xs font-black text-gray-300 italic">#{dev._id.slice(-4).toUpperCase()}</span>
                      </div>
                   </div>
                   <div className="text-left">
                      <p className="text-[8px] text-gray-700 font-bold uppercase tracking-widest mb-1.5 italic">Reputation</p>
                      <div className="flex items-center space-x-2">
                        <Zap className="w-3.5 h-3.5 text-amber-500" />
                        <span className="text-xs font-black text-gray-300 italic">{(dev.contributions || 0).toLocaleString()}</span>
                      </div>
                   </div>
                </div>

                <div className="mt-8 flex items-center justify-between">
                   <div className="flex space-x-3">
                      {dev.github && <a href={dev.github} target="_blank" className="p-2 text-gray-700 hover:text-white hover:bg-white/5 rounded-lg border border-transparent hover:border-white/10 transition-all"><Github className="w-4 h-4" /></a>}
                      {dev.twitter && <a href={dev.twitter} target="_blank" className="p-2 text-gray-700 hover:text-white hover:bg-white/5 rounded-lg border border-transparent hover:border-white/10 transition-all"><Twitter className="w-4 h-4" /></a>}
                      <a href="#" className="p-2 text-gray-700 hover:text-white hover:bg-white/5 rounded-lg border border-transparent hover:border-white/10 transition-all"><Globe className="w-4 h-4" /></a>
                   </div>
                   <Link href={`/profile/${dev.username}`} className="bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-blue-600 hover:border-transparent px-5 py-2 rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all">
                     View Profile
                   </Link>
                </div>
             </motion.div>
           ))}
           {filteredDevelopers.length === 0 && (
             <div className="col-span-full py-20 text-center border border-dashed border-white/5 rounded-2xl">
                <Users className="w-12 h-12 text-gray-800 mx-auto mb-4 opacity-50" />
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-600 italic">No members found matching your search.</p>
             </div>
           )}
        </div>

      </div>
    </div>
  );
};

export default CommunityPage;
