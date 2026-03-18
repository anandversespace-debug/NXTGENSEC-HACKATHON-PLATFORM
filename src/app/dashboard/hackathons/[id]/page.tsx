'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Trophy, ChevronRight, Github, ExternalLink, Calendar, MapPin, Users, Activity, Code2, ShieldAlert } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function DashboardHackathonDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [hackathon, setHackathon] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHackathon = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const res = await fetch(`${baseUrl}/hackathons/${params.id}`);
        if (!res.ok) throw new Error('Hackathon not found.');
        const data = await res.json();
        setHackathon(data);
      } catch (err) {
        console.error(err);
        router.push('/dashboard/hackathons');
      } finally {
        setLoading(false);
      }
    };
    fetchHackathon();
  }, [params.id, router]);

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <div className="text-blue-500 font-black italic animate-pulse tracking-widest uppercase text-xs">Loading Details...</div>
    </div>
  );

  return (
    <div className="space-y-8 pb-10">
      <div className="bg-[#0c0c0c] border border-white/5 rounded-2xl p-8 relative overflow-hidden group">
         <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-blue-600 via-emerald-600 to-transparent"></div>
         <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 relative z-10">
            <div>
               <div className="flex items-center space-x-3 mb-6">
                  <span className="text-[9px] font-black px-3 py-1 rounded bg-blue-600/10 text-blue-500 border border-blue-500/20 uppercase tracking-[0.2em] italic shadow-2xl animate-pulse">
                     Active
                  </span>
                  <span className="text-[9px] font-bold text-gray-700 uppercase tracking-widest italic tracking-tighter">ID: {hackathon._id.slice(-4).toUpperCase()}</span>
               </div>
               <h1 className="text-3xl font-black italic tracking-tighter uppercase mb-4 text-white group-hover:text-blue-400 transition-colors duration-700">{hackathon.title}</h1>
               <div className="flex items-center space-x-6 text-[10px] text-gray-600 font-bold uppercase tracking-widest mt-6">
                  <span className="flex items-center italic"><Calendar className="w-3.5 h-3.5 mr-2 text-blue-500" /> {new Date(hackathon.start_date).toLocaleDateString()} — {new Date(hackathon.end_date).toLocaleDateString()}</span>
                  <span className="flex items-center italic"><MapPin className="w-3.5 h-3.5 mr-2 text-gray-700" /> ONLINE</span>
               </div>
            </div>
            
            <div className="flex flex-col items-end">
               <div className="text-right bg-[#050505] border border-white/5 rounded-2xl p-8 group-hover:border-emerald-500/20 transition-all duration-700 shadow-inner">
                   <p className="text-[9px] font-black text-gray-700 uppercase tracking-widest mb-3 italic">Prize Pool</p>
                  <p className="text-3xl font-black italic uppercase text-emerald-500 tracking-tighter scale-95 group-hover:scale-100 transition-transform origin-right">{hackathon.prize_pool || '$0 USD'}</p>
               </div>
            </div>
         </div>
      </div>

      <div className="flex border-b border-white/[0.03] space-x-12 relative">
        <button 
          onClick={() => setActiveTab('overview')}
          className={`pb-5 text-[10px] font-black uppercase tracking-[0.2em] transition-all relative italic ${activeTab === 'overview' ? 'text-blue-500' : 'text-gray-700 hover:text-gray-400 group'}`}
        >
          Overview
          {activeTab === 'overview' && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>}
        </button>
        <button 
          onClick={() => setActiveTab('submission')}
          className={`pb-5 text-[10px] font-black uppercase tracking-[0.2em] transition-all relative italic ${activeTab === 'submission' ? 'text-blue-500' : 'text-gray-700 hover:text-gray-400 group'}`}
        >
          My Project
          {activeTab === 'submission' && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>}
        </button>
      </div>

      {activeTab === 'overview' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 space-y-8">
              <div className="bg-[#0c0c0c] border border-white/5 rounded-3xl p-10 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-8 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
                    <Trophy className="w-32 h-32" />
                 </div>
                 <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-700 mb-8 italic border-l-2 border-blue-500 pl-4">Description</h2>
                 <p className="text-[13px] text-gray-500 leading-relaxed font-bold uppercase tracking-widest">{hackathon.description}</p>
              </div>
           </div>
           <div className="space-y-8">
              <div className="bg-[#0c0c0c] border border-white/5 rounded-3xl p-8 group hover:border-white/10 transition-colors">
                 <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-700 mb-8 italic">Event Stats</h2>
                 <div className="space-y-6">
                    <div className="flex justify-between items-center border-b border-white/[0.03] pb-5 group/item">
                       <span className="text-[10px] text-gray-600 font-bold uppercase tracking-widest flex items-center italic group-hover/item:text-blue-500 transition-colors"><Users className="w-3.5 h-3.5 mr-3" /> Participants</span>
                       <span className="text-xs font-black text-gray-200 tracking-widest italic">{hackathon.participants?.length || 0} Members</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 group/item">
                       <span className="text-[10px] text-gray-600 font-bold uppercase tracking-widest flex items-center italic group-hover/item:text-emerald-500 transition-colors"><Activity className="w-3.5 h-3.5 mr-3" /> STATUS</span>
                       <span className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-500 bg-blue-500/5 px-3 py-1 rounded border border-blue-500/20 italic shadow-xl">IN PROGRESS</span>
                    </div>
                 </div>
              </div>
           </div>
        </motion.div>
      )}

      {activeTab === 'submission' && (
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}>
           <div className="bg-[#0c0c0c] border border-white/5 rounded-3xl p-16 text-center max-w-2xl mx-auto mt-10 relative group overflow-hidden">
              <div className="absolute inset-0 bg-white/[0.01] group-hover:bg-white/[0.02] transition-colors" />
              <div className="w-20 h-20 bg-[#050505] border border-white/5 rounded-2xl flex items-center justify-center mx-auto mb-10 group-hover:border-blue-500/30 transition-all duration-700 shadow-xl group-hover:scale-110">
                 <Code2 className="w-8 h-8 text-gray-800 group-hover:text-blue-500 transition-colors" />
              </div>
              <h3 className="text-xl font-black text-white uppercase tracking-tighter italic mb-4">No Project Found</h3>
              <p className="text-[11px] text-gray-600 font-bold uppercase tracking-widest leading-loose mb-10 max-w-sm mx-auto italic">
                 You haven't submitted a project to this hackathon yet. Submit your project to join the competition.
              </p>
              <Link href="/dashboard/projects/new" className="bg-blue-600 hover:bg-blue-500 text-white inline-flex items-center space-x-3 py-4 px-10 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-blue-900/10 transition-all hover:scale-105 active:scale-95 italic">
                 <Activity className="w-4 h-4" />
                 <span>Submit Project</span>
              </Link>
           </div>
        </motion.div>
      )}
    </div>
  );
}
