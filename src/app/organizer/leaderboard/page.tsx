'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Award, 
  Search, 
  Trophy, 
  Star, 
  ChevronRight, 
  ChevronDown, 
  MoreVertical, 
  Zap, 
  ShieldCheck, 
  Target, 
  Layers, 
  Edit3, 
  MoreHorizontal, 
  Settings,
  ArrowUp,
  ArrowDown,
  Loader2,
  Trash2,
  Eye,
  CheckCircle2,
  Users,
  Plus
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function LeaderboardTerminal() {
  const [loading, setLoading] = useState(true);
  const [activeSegment, setActiveSegment] = useState<'overall' | 'technical' | 'innovation' | 'security'>('overall');
  const [teams, setTeams] = useState<any[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setTeams([
        { id: 1, rank: 1, name: 'CyberShield Alpha', score: 98.4, status: 'locked', members: 4, drift: 'up' },
        { id: 2, rank: 2, name: 'The Grid Protocol', score: 96.2, status: 'locked', members: 5, drift: 'none' },
        { id: 3, rank: 3, name: 'AgriTech Force', score: 92.8, status: 'judging', members: 3, drift: 'up' },
        { id: 4, rank: 4, name: 'Skynet Killers', score: 85.0, status: 'judging', members: 2, drift: 'down' },
        { id: 5, rank: 5, name: 'Sentinel Hub', score: 82.5, status: 'locked', members: 4, drift: 'none' },
      ]);
      setLoading(false);
    }, 1500);
  }, []);

  const StatusBadge = ({ status }: { status: string }) => {
    const styles: any = {
      locked: "bg-blue-600/10 border-blue-600/20 text-blue-500 shadow-sm shadow-blue-500/5",
      judging: "bg-white/5 border-white/10 text-gray-500",
      completed: "bg-blue-600/10 border-blue-600/20 text-blue-500 shadow-sm shadow-blue-500/5",
    };
    return (
      <div className={cn("px-2.5 py-1 rounded-lg border text-[8px] font-black uppercase tracking-widest flex items-center italic transition-all", styles[status] || styles.judging)}>
         <div className={cn("w-1 h-1 rounded-full mr-2", status === 'locked' ? "bg-blue-500 shadow-lg" : "bg-gray-700 animate-pulse")} />
         {status}
      </div>
    );
  };

  if (loading) {
     return (
       <div className="flex flex-col items-center justify-center h-[50vh] space-y-4 text-center">
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
          <p className="text-[9px] font-black uppercase tracking-widest text-gray-700 italic">Calculating Rankings...</p>
       </div>
     );
  }

  return (
    <div className="space-y-8 pb-12 text-left">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between items-start gap-6 border-b border-white/[0.03] pb-6">
         <div className="space-y-2 text-left">
            <div className="flex items-center space-x-2">
               <Award className="w-4 h-4 text-blue-500 shadow-md shadow-blue-500/10" />
               <span className="text-[9px] font-black uppercase tracking-widest text-gray-700 italic">Live Rankings</span>
            </div>
            <h1 className="text-2xl font-black italic uppercase tracking-tighter text-white">Event <span className="text-blue-500 ml-1">Leaderboard</span></h1>
            <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest italic leading-relaxed max-w-lg">
               Track team performance, manage judging, and final scores.
            </p>
         </div>

         <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-6 py-3 bg-white/5 border border-white/5 text-gray-500 hover:text-white rounded-xl transition-all group">
               <Settings className="w-3.5 h-3.5" />
               <span className="text-[9px] font-black uppercase tracking-widest italic font-bold">Scoring Settings</span>
            </button>
            <button className="flex items-center space-x-2 px-8 py-3 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-500 transition-all active:scale-95 group">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-[9px] font-black uppercase tracking-widest italic font-bold">Lock Scores</span>
            </button>
         </div>
      </header>

      {/* Segments & Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-left">
         <div className="bg-[#0c0c0c] border border-white/5 p-1 rounded-xl flex items-center w-full md:w-auto overflow-x-auto scrollbar-hide shadow-inner">
            {[
              { id: 'overall', label: 'Overall', icon: Trophy },
              { id: 'technical', label: 'Technical', icon: Target },
              { id: 'innovation', label: 'Innovation', icon: Zap },
              { id: 'security', label: 'Security', icon: ShieldCheck }
            ].map((tab) => (
              <button 
                key={tab.id}
                onClick={() => setActiveSegment(tab.id as any)}
                className={cn(
                   "whitespace-nowrap flex items-center px-6 py-3 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all italic space-x-3 group",
                   activeSegment === tab.id ? "bg-blue-600/10 border border-blue-600/20 text-blue-500 shadow-md scale-[1.02]" : "text-gray-600 hover:text-gray-400"
                )}
              >
                  <tab.icon className={cn("w-3.5 h-3.5", activeSegment === tab.id ? "text-blue-500" : "")} />
                  <span>{tab.label}</span>
              </button>
            ))}
         </div>
         <div className="relative w-full md:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-700 group-focus-within:text-blue-500 transition-colors" />
            <input 
               type="text" 
               placeholder="Search by team name..." 
               className="w-full bg-[#0c0c0c] border border-white/5 rounded-xl py-2.5 pl-11 pr-5 text-[10px] text-white placeholder-gray-800 focus:outline-none focus:border-blue-500/20 transition-all font-bold italic shadow-inner"
            />
         </div>
      </div>

      {/* Table */}
      <div className="bg-[#0c0c0c] border border-white/5 rounded-2xl overflow-hidden shadow-xl text-left">
         <div className="overflow-x-auto scrollbar-hide">
            <table className="w-full text-left min-w-[900px]">
               <thead>
                  <tr className="text-[9px] font-black text-gray-700 uppercase tracking-widest italic border-b border-white/[0.05]">
                     <th className="px-6 py-6 w-32">Rank</th>
                     <th className="px-6 py-6">Team</th>
                     <th className="px-6 py-6">Total Score</th>
                     <th className="px-6 py-6">Status</th>
                     <th className="px-6 py-6">Trend</th>
                     <th className="px-6 py-6 text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-white/[0.03]">
                  {teams.map((t, i) => (
                    <motion.tr 
                      key={t.id}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="group hover:bg-white/[0.01] transition-all"
                    >
                       <td className="px-6 py-5">
                          <div className="flex items-center space-x-4">
                             <span className={cn(
                                "text-xl font-black italic tracking-tighter leading-none",
                                i === 0 ? "text-blue-500" : i === 1 ? "text-blue-400" : i === 2 ? "text-blue-300" : "text-gray-800"
                             )}>
                                #{t.rank}
                             </span>
                             {i < 3 && <Trophy className={cn("w-4 h-4", i === 0 ? "text-blue-500 shadow-md" : i === 1 ? "text-blue-400" : "text-blue-300")} />}
                          </div>
                       </td>
                       <td className="px-6 py-5">
                          <div className="flex items-center space-x-4">
                             <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center shrink-0 group-hover:border-blue-500/30 transition-all text-gray-800">
                                <Award className="w-4 h-4 group-hover:text-blue-500 transition-colors" />
                             </div>
                             <div className="flex flex-col text-left">
                                <span className="text-[11px] font-black text-white uppercase italic tracking-tighter group-hover:text-blue-500 transition-colors mb-1">{t.name}</span>
                                <span className="text-[8px] font-bold text-gray-700 uppercase tracking-widest italic">{t.members} Members</span>
                             </div>
                          </div>
                       </td>
                       <td className="px-6 py-5">
                            <div className="flex flex-col space-y-1.5 min-w-[120px] text-left">
                              <span className="text-[14px] font-black text-white italic leading-none group-hover:text-blue-500 transition-colors">{t.score} <span className="text-[8px] text-gray-800 font-bold uppercase ml-1">Pts</span></span>
                              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden shadow-inner">
                                 <motion.div initial={{ width: 0 }} animate={{ width: `${t.score}%` }} transition={{ duration: 1 }} className="h-full bg-blue-600 shadow-lg" />
                              </div>
                            </div>
                       </td>
                       <td className="px-6 py-5">
                          <div className="w-fit"><StatusBadge status={t.status} /></div>
                       </td>
                       <td className="px-6 py-5 text-left">
                          <div className="flex items-center space-x-2">
                             {t.drift === 'up' ? <ArrowUp className="w-3.5 h-3.5 text-blue-500" /> : t.drift === 'down' ? <ArrowDown className="w-3.5 h-3.5 text-red-500" /> : <MoreHorizontal className="w-3.5 h-3.5 text-gray-800" />}
                             <span className={cn("text-[9px] font-black uppercase tracking-widest italic", t.drift === 'up' ? "text-blue-500" : t.drift === 'down' ? "text-red-500" : "text-gray-800")}>
                                {t.drift === 'none' ? 'Stable' : t.drift === 'up' ? 'Rising' : 'Falling'}
                             </span>
                          </div>
                       </td>
                       <td className="px-6 py-5 text-right">
                          <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-all translate-x-1 group-hover:translate-x-0">
                             <button className="p-2 bg-white/5 border border-white/10 rounded-lg text-gray-700 hover:text-blue-500 transition-all shadow-sm"><Edit3 className="w-3.5 h-3.5" /></button>
                             <button className="p-2 bg-white/5 border border-white/10 rounded-lg text-gray-700 hover:text-blue-500 transition-all shadow-sm"><Eye className="w-3.5 h-3.5" /></button>
                             <button className="p-2 bg-white/5 border border-white/10 rounded-lg text-gray-700 hover:text-white transition-all"><ChevronRight className="w-3.5 h-3.5" /></button>
                          </div>
                       </td>
                    </motion.tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>

      {/* Grid: Judging & Prizes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-left">
         {/* Judge List */}
         <section className="bg-[#0c0c0c] border border-white/5 rounded-2xl p-8 space-y-6 relative overflow-hidden group shadow-xl">
            <div className="absolute top-0 right-0 p-8 opacity-[0.02] pointer-events-none group-hover:rotate-12 transition-transform duration-1000">
               <Users className="w-40 h-40 text-blue-500" />
            </div>
            <div className="relative z-10 space-y-2 text-left">
               <h3 className="text-xl font-black italic uppercase tracking-tighter text-white">Event <span className="text-blue-500 ml-1">Judges</span></h3>
               <p className="text-[9px] text-gray-700 font-black uppercase tracking-widest italic">Manage evaluators for this event.</p>
            </div>
            <div className="bg-[#050505] p-5 rounded-2xl border border-white/5 space-y-4 shadow-inner relative z-10 hover:border-blue-500/10 transition-all">
               {[
                  { name: 'Dr. Sarah Connor', hub: 'Security', load: '12/20' },
                  { name: 'Kevin Flynn', hub: 'Technical', load: '18/20' },
               ].map((j, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-white/[0.02] rounded-xl border border-white/5 group/row hover:bg-white/[0.05] transition-all cursor-pointer">
                     <div className="flex flex-col text-left">
                        <span className="text-[11px] font-black text-white italic uppercase group-hover/row:text-blue-500 transition-colors">{j.name}</span>
                        <span className="text-[8px] font-bold text-gray-700 uppercase tracking-widest mt-1 italic">Focus: {j.hub}</span>
                     </div>
                     <span className="text-[10px] font-black text-blue-500 italic uppercase">{j.load} Done</span>
                  </div>
               ))}
               <button className="w-full py-4 border-2 border-dashed border-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest italic text-gray-700 hover:text-white hover:border-blue-500/20 transition-all flex items-center justify-center space-x-2 group">
                  <Plus className="w-4 h-4" />
                  <span>Assign Judge</span>
               </button>
            </div>
         </section>

         {/* Prizes */}
         <section className="bg-blue-600/5 border border-blue-600/10 rounded-2xl p-8 space-y-8 relative overflow-hidden group shadow-xl text-left">
            <div className="absolute top-0 right-0 p-8 opacity-[0.02] pointer-events-none group-hover:scale-125 transition-transform duration-1000">
               <Star className="w-40 h-40 text-blue-500" />
            </div>
            <div className="relative z-10 space-y-2 text-left">
               <h3 className="text-xl font-black italic uppercase tracking-tighter text-white">Prize <span className="text-blue-500 ml-1">Pool</span></h3>
               <p className="text-[9px] text-gray-700 font-black uppercase tracking-widest italic">Configure rewards for winners.</p>
            </div>
            <div className="grid grid-cols-2 gap-4 relative z-10">
               {[
                  { label: 'Grand Prize', value: '$10,000' },
                  { label: 'Runner Up', value: '$5,000' },
                  { label: 'Innovation', value: '$2,500' },
                  { label: 'Best Security', value: '$1,000' },
               ].map((p, i) => (
                  <div key={i} className="bg-[#090909] border border-white/5 p-5 rounded-2xl group/card hover:border-blue-500/40 transition-all shadow-lg hover:-translate-y-1 text-left">
                     <span className="text-[9px] font-black text-gray-700 uppercase italic block mb-1">{p.label}</span>
                     <span className="text-xl font-black text-white italic tracking-tighter leading-none group-hover/card:text-blue-500 transition-colors">{p.value}</span>
                  </div>
               ))}
            </div>
            <button className="relative z-10 w-full py-4 bg-white/5 border border-white/10 text-gray-700 text-[10px] font-black uppercase tracking-widest italic rounded-xl hover:bg-white/10 hover:text-white transition-all shadow-md group">
               <Zap className="w-3.5 h-3.5 inline-block mr-2 text-blue-500/50" />
               View Reward Settings
            </button>
         </section>
      </div>

      {/* Verification Check */}
      <section className="bg-blue-600/5 border border-blue-600/10 rounded-2xl p-10 flex flex-col md:flex-row items-center justify-between gap-10 group relative overflow-hidden text-left shadow-2xl">
         <div className="absolute top-0 right-10 -mt-20 opacity-[0.02] pointer-events-none">
            <CheckCircle2 className="w-[300px] h-[300px] text-blue-500" />
         </div>
         <div className="relative z-10 space-y-3 text-left">
            <div className="flex items-center space-x-4">
               <CheckCircle2 className="w-6 h-6 text-blue-500 animate-pulse" />
               <h3 className="text-xl font-black italic uppercase tracking-tighter text-white">Final Score <span className="text-blue-500 ml-1">Verification</span></h3>
            </div>
            <p className="text-[12px] font-bold text-gray-600 uppercase tracking-widest leading-relaxed max-w-2xl italic">
                <span className="text-blue-500 font-extrabold">92% of projects</span> have been graded. Review remaining items before making the leaderboard public.
            </p>
         </div>
         <button className="relative z-10 w-full md:w-auto px-10 py-5 bg-blue-600 text-white text-[11px] font-black uppercase tracking-widest italic rounded-2xl hover:bg-blue-500 transition-all shadow-3xl active:scale-95 group">
            <Zap className="w-4 h-4 inline-block mr-3 group-hover:animate-pulse" />
            Verify All Scores
         </button>
      </section>
    </div>
  );
}
