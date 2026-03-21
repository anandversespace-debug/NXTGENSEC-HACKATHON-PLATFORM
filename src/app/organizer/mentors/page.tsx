'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GraduationCap, 
  Search, 
  Target, 
  Users2, 
  MessageSquare, 
  MoreVertical, 
  ChevronRight, 
  CheckCircle2, 
  XCircle, 
  Plus, 
  ShieldCheck, 
  History, 
  Activity, 
  Zap, 
  CalendarDays,
  Loader2,
  Filter,
  ArrowUpRight,
  UserCheck,
  Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function MentorManagement() {
  const [loading, setLoading] = useState(true);
  const [mentors, setMentors] = useState<any[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setMentors([
        { id: 1, name: 'Dr. Emily Vance', role: 'Security Architect', expertise: 'Cryptography', status: 'verified', sessions: 12, teams: 4 },
        { id: 2, name: 'Marcus Steel', role: 'Full Stack Dev', expertise: 'AWS/Deployment', status: 'pending', sessions: 0, teams: 0 },
        { id: 3, name: 'Ava Lovelace', role: 'AI Strategist', expertise: 'Neural Networks', status: 'verified', sessions: 8, teams: 3 },
        { id: 4, name: 'Ben Kenobi', role: 'Cloud Engineer', expertise: 'Serverless', status: 'verified', sessions: 15, teams: 5 },
      ]);
      setLoading(false);
    }, 1200);
  }, []);

  const StatusBadge = ({ status }: { status: string }) => {
    const styles: any = {
      verified: "bg-blue-600/10 border-blue-600/20 text-blue-500 shadow-sm shadow-blue-500/5",
      pending: "bg-amber-500/10 border-amber-500/20 text-amber-500 shadow-sm shadow-amber-500/5",
    };
    return (
      <div className={cn("px-2.5 py-1 rounded-lg border text-[8px] font-black uppercase tracking-widest flex items-center italic transition-all", styles[status])}>
         <div className={cn("w-1 h-1 rounded-full mr-2", status === 'verified' ? "bg-blue-500 shadow-lg" : "bg-amber-500 animate-pulse")} />
         {status}
      </div>
    );
  };

  if (loading) {
     return (
       <div className="flex flex-col items-center justify-center h-[50vh] space-y-4 text-center">
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
          <p className="text-[9px] font-black uppercase tracking-widest text-gray-700 italic">Finding Mentors...</p>
       </div>
     );
  }

  return (
    <div className="space-y-8 pb-12 text-left">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between items-start gap-6 border-b border-white/[0.03] pb-6">
         <div className="space-y-2 text-left">
            <div className="flex items-center space-x-2">
               <GraduationCap className="w-4 h-4 text-blue-500 shadow-md shadow-blue-500/10" />
               <span className="text-[9px] font-black uppercase tracking-widest text-gray-700 italic">Mentorship Program</span>
            </div>
            <h1 className="text-2xl font-black italic uppercase tracking-tighter text-white">Mentor <span className="text-blue-500 ml-1">List</span></h1>
            <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest italic leading-relaxed max-w-lg">
               Manage mentors, approve applications, and assign them to teams.
            </p>
         </div>

         <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-6 py-3 bg-white/5 border border-white/5 text-gray-500 hover:text-white rounded-xl transition-all group">
               <Users2 className="w-3.5 h-3.5" />
               <span className="text-[9px] font-black uppercase tracking-widest italic font-bold">Assign Teams</span>
            </button>
            <button className="flex items-center space-x-2 px-8 py-3 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-500 transition-all active:scale-95 group">
                <Plus className="w-4 h-4" />
                <span className="text-[9px] font-black uppercase tracking-widest italic font-bold">Add Mentor</span>
            </button>
         </div>
      </header>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-left">
         <div className="relative w-full md:w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-700 group-focus-within:text-blue-500 transition-colors" />
            <input 
               type="text" 
               placeholder="Search by name or expertise..." 
               className="w-full bg-[#0c0c0c] border border-white/5 rounded-xl py-3 pl-11 pr-5 text-[10px] text-white placeholder-gray-800 focus:outline-none focus:border-blue-500/20 transition-all font-bold italic shadow-inner"
            />
         </div>
         <div className="bg-[#0c0c0c] border border-white/5 p-1 rounded-xl flex items-center w-full md:w-auto overflow-x-auto scrollbar-hide shadow-inner">
            {[
              { id: 'all', label: 'All Mentors' },
              { id: 'security', label: 'Security' },
              { id: 'ai', label: 'AI' }
            ].map((tab) => (
              <button 
                key={tab.id}
                className={cn(
                   "whitespace-nowrap px-6 py-3 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all italic",
                   tab.id === 'all' ? "bg-blue-600/10 border border-blue-600/20 text-blue-500 shadow-md" : "text-gray-600 hover:text-gray-400"
                )}
              >
                  {tab.label}
              </button>
            ))}
         </div>
      </div>

      {/* Table */}
      <div className="bg-[#0c0c0c] border border-white/5 rounded-2xl overflow-hidden shadow-xl text-left">
         <div className="overflow-x-auto scrollbar-hide">
            <table className="w-full text-left min-w-[900px]">
               <thead>
                  <tr className="text-[9px] font-black text-gray-700 uppercase tracking-widest italic border-b border-white/[0.05]">
                     <th className="px-6 py-6">Mentor Name</th>
                     <th className="px-6 py-6">Expertise</th>
                     <th className="px-6 py-6">Teams Assigned</th>
                     <th className="px-6 py-6">Status</th>
                     <th className="px-6 py-6">Sessions</th>
                     <th className="px-6 py-6 text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-white/[0.03]">
                  {mentors.map((m, i) => (
                    <motion.tr 
                      key={m.id}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="group hover:bg-white/[0.01] transition-all"
                    >
                       <td className="px-6 py-5">
                          <div className="flex items-center space-x-4">
                             <div className="w-9 h-9 rounded-lg bg-blue-600/10 border border-blue-600/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                <GraduationCap className="w-4 h-4 text-blue-500 shadow-sm" />
                             </div>
                             <div className="flex flex-col text-left">
                                <span className="text-[10px] font-black text-white italic uppercase tracking-tighter truncate group-hover:text-blue-500 transition-colors">{m.name}</span>
                                <span className="text-[8px] font-bold text-gray-700 uppercase tracking-widest italic">{m.role}</span>
                             </div>
                          </div>
                       </td>
                       <td className="px-6 py-5">
                            <span className="px-2.5 py-1 bg-white/5 border border-white/5 rounded-lg text-[8px] font-black text-gray-500 uppercase italic tracking-widest transition-all group-hover:border-blue-500/20 group-hover:text-blue-400">{m.expertise}</span>
                       </td>
                       <td className="px-6 py-5">
                          <div className="flex flex-col space-y-1 text-left">
                             <span className="text-[9px] font-black text-white italic leading-none">{m.teams} Teams</span>
                             <div className="w-12 h-1 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 shadow-lg" style={{ width: `${(m.teams / 5) * 100}%` }} />
                             </div>
                          </div>
                       </td>
                       <td className="px-6 py-5">
                          <div className="w-fit"><StatusBadge status={m.status} /></div>
                       </td>
                       <td className="px-6 py-5">
                          <div className="flex flex-col items-start space-y-1 text-left">
                             <span className="text-[9px] font-black text-white italic">{m.sessions} Logs</span>
                             <span className="text-[7px] font-bold text-gray-800 uppercase tracking-widest">Activity Score</span>
                          </div>
                       </td>
                       <td className="px-6 py-5 text-right">
                          <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-all translate-x-1 group-hover:translate-x-0">
                             {m.status === 'pending' && <button className="p-2 bg-blue-600/10 border border-blue-600/20 rounded-lg text-blue-500 hover:bg-blue-600 hover:text-white transition-all shadow-md" title="Approve"><UserCheck className="w-4 h-4" /></button>}
                             <button className="p-2 bg-white/5 border border-white/10 rounded-lg text-gray-700 hover:text-blue-500 transition-all shadow-sm"><MessageSquare className="w-3.5 h-3.5" /></button>
                             <button className="p-2 bg-white/5 border border-white/10 rounded-lg text-gray-700 hover:text-white transition-all shadow-sm"><History className="w-3.5 h-3.5" /></button>
                             <button className="p-2 bg-white/5 border border-white/10 rounded-lg text-gray-700 hover:text-white transition-all"><MoreVertical className="w-3.5 h-3.5" /></button>
                          </div>
                       </td>
                    </motion.tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>

      {/* Grid: Feedback & Manual Assign */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-left">
         {/* Manual Assignment */}
         <section className="bg-[#0c0c0c] border border-white/5 rounded-2xl p-8 space-y-6 relative overflow-hidden group shadow-xl">
            <div className="absolute top-0 right-0 p-8 opacity-[0.02] pointer-events-none group-hover:rotate-12 transition-transform duration-1000">
               <Target className="w-40 h-40 text-blue-500" />
            </div>
            <div className="relative z-10 space-y-2 text-left">
               <h3 className="text-xl font-black italic uppercase tracking-tighter text-white">Manual <span className="text-blue-500 ml-1">Team Assignment</span></h3>
               <p className="text-[9px] text-gray-700 font-black uppercase tracking-widest italic">Assign mentors to specific teams.</p>
            </div>
            <div className="bg-[#050505] p-5 rounded-2xl border border-white/5 space-y-4 shadow-inner relative z-10 hover:border-blue-500/10 transition-all">
               <div className="grid grid-cols-2 gap-3">
                  <div className="p-5 bg-white/[0.02] border border-white/5 rounded-xl text-center group/card hover:border-blue-500/30 transition-all cursor-pointer shadow-md">
                     <span className="text-[8px] font-black text-gray-700 uppercase italic block mb-2">Auto Match</span>
                     <Zap className="w-5 h-5 text-blue-500 mx-auto group-hover:animate-pulse" />
                  </div>
                   <div className="p-5 bg-white/[0.02] border border-white/5 rounded-xl text-center group/card hover:border-blue-500/30 transition-all cursor-pointer shadow-md">
                     <span className="text-[8px] font-black text-gray-700 uppercase italic block mb-2">History</span>
                     <History className="w-5 h-5 text-gray-700 group-hover/card:text-blue-500 transition-all mx-auto" />
                  </div>
               </div>
            </div>
            <button className="relative z-10 w-full py-4 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest italic rounded-xl hover:bg-blue-500 transition-all shadow-xl active:scale-95 group">
               Start Matching Protocol
            </button>
         </section>

         {/* Feedback Feed */}
         <section className="bg-blue-600/5 border border-blue-600/10 rounded-2xl p-8 space-y-8 relative overflow-hidden group shadow-xl text-left">
            <div className="absolute top-0 right-0 p-8 opacity-[0.02] pointer-events-none group-hover:scale-125 transition-transform duration-1000">
               <MessageSquare className="w-40 h-40 text-blue-500" />
            </div>
            <div className="relative z-10 space-y-2 text-left">
               <h3 className="text-xl font-black italic uppercase tracking-tighter text-white">Mentor <span className="text-blue-500 ml-1">Feedback</span></h3>
               <p className="text-[9px] text-gray-700 font-black uppercase tracking-widest italic">Live updates from mentor-team sessions.</p>
            </div>
            <div className="space-y-4 relative z-10 max-h-[180px] overflow-y-auto scrollbar-hide pr-2">
               {[
                  { mentor: 'Dr. Emily Vance', msg: 'The team has a strong security plan.', time: '12m ago' },
                  { mentor: 'Ava Lovelace', msg: 'High quality AI implementation observed.', time: '45m ago' },
                  { mentor: 'Ben Kenobi', msg: 'AWS configuration finalized successfully.', time: '1h ago' },
               ].map((f, i) => (
                  <div key={i} className="flex flex-col space-y-1 border-l-2 border-l-blue-500/20 pl-4 py-1.5 hover:border-l-blue-500 transition-all group/item text-left">
                     <div className="flex justify-between items-center mb-1">
                        <span className="text-[9px] font-black text-white italic uppercase group-hover/item:text-blue-500 transition-colors">@{f.mentor}</span>
                        <span className="text-[8px] font-mono text-gray-800 uppercase tracking-widest italic">{f.time}</span>
                     </div>
                     <p className="text-[10px] font-bold text-gray-600 italic tracking-tight uppercase leading-relaxed group-hover/item:text-gray-400 transition-colors">
                        {f.msg}
                     </p>
                  </div>
               ))}
            </div>
            <div className="relative z-10 pt-4 border-t border-white/[0.03]">
               <button className="text-[9px] font-black uppercase tracking-widest text-gray-700 hover:text-white transition-all italic underline underline-offset-8 decoration-white/5">View Full Log Hub</button>
            </div>
         </section>
      </div>
    </div>
  );
}
