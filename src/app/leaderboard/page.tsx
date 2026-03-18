'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Crown, 
  TrendingUp, 
  Activity, 
  ShieldCheck, 
  Medal,
  Search,
  ChevronDown,
  User,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const LeaderboardPage = () => {
  const [activeTab, setActiveTab] = useState('all-time');
  const [developers, setDevelopers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const res = await fetch(`${baseUrl}/users/leaderboard`);
        if (!res.ok) throw new Error('Failed to load leaderboard.');
        const data = await res.json();
        setDevelopers(data);
      } catch (err) {
        console.error('Failed to fetch leaderboard data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDevelopers();
  }, []);

  const filteredDevelopers = developers.filter(dev => 
    (dev.name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) || 
    (dev.username?.toLowerCase() || '').includes(searchQuery.toLowerCase())
  );

  // Manually reorder for podium: [Second, First, Third]
  const podiumOrder: any[] = [];
  if (filteredDevelopers.length >= 2) podiumOrder.push(filteredDevelopers[1]);
  if (filteredDevelopers.length >= 1) podiumOrder.push(filteredDevelopers[0]);
  if (filteredDevelopers.length >= 3) podiumOrder.push(filteredDevelopers[2]);

  const others = filteredDevelopers.slice(3);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-20 px-6 bg-[#050505] flex items-center justify-center">
        <div className="text-blue-500 font-bold italic animate-pulse tracking-widest uppercase">Loading leaderboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 bg-[#050505]">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-end justify-between gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 bg-blue-600/10 border border-blue-600/20 rounded-full px-4 py-1.5 mb-6">
              <Trophy className="w-4 h-4 text-blue-500" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400">Rankings</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-white mb-4">
              Community <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">Leaderboard</span>
            </h1>
            <p className="text-gray-500 text-sm font-medium leading-relaxed max-w-xl uppercase tracking-tighter text-left">
              Celebrating our top contributors based on successful projects, hackathon wins, and community reputation points.
            </p>
          </div>
          
          <div className="flex bg-[#0c0c0c] border border-white/5 rounded-xl p-1 shrink-0">
             {['all-time', 'monthly', 'weekly'].map((tab) => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "px-6 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all",
                    activeTab === tab ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20" : "text-gray-500 hover:text-gray-300"
                  )}
                >
                  {tab}
                </button>
             ))}
          </div>
        </div>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end relative">
           {podiumOrder.map((user, idx) => {
              // rank logic based on position: 0 is second, 1 is first, 2 is third
              const rank = podiumOrder.indexOf(user) === 1 ? 1 : podiumOrder.indexOf(user) === 0 ? 2 : 3;
              const isFirst = rank === 1;
              return (
                <motion.div 
                  key={user._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={cn(
                    "bg-[#0c0c0c] border rounded-2xl flex flex-col items-center justify-end p-8 relative group transition-all duration-500",
                    isFirst 
                      ? "border-amber-500/20 h-[450px] bg-gradient-to-t from-amber-500/5 to-transparent z-10 scale-105" 
                      : "border-white/5 h-[380px] hover:border-white/10"
                  )}
                >
                   {isFirst && (
                     <>
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent opacity-50 blur-3xl pointer-events-none" />
                        <Crown className="w-12 h-12 text-amber-500 absolute -top-16 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)] animate-bounce" />
                     </>
                   )}
                   
                   <div className="relative mb-8">
                      <div className={cn(
                        "w-24 h-24 rounded-2xl bg-[#050505] border-2 flex items-center justify-center overflow-hidden p-1 group-hover:scale-105 transition-transform duration-700",
                        isFirst ? "border-amber-500/30" : "border-white/10"
                      )}>
                         {user.avatar_url ? (
                           <img src={user.avatar_url} alt={user.name} className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700 rounded-xl" />
                         ) : (
                           <User className="w-12 h-12 text-gray-800" />
                         )}
                      </div>
                      <div className={cn(
                        "absolute -bottom-3 -right-3 w-10 h-10 rounded-xl border-4 border-[#0c0c0c] flex items-center justify-center text-sm font-black italic",
                        isFirst ? "bg-amber-500 text-black shadow-[0_0_10px_rgba(245,158,11,0.5)]" : "bg-gray-200 text-black"
                      )}>
                        #{rank}
                      </div>
                   </div>

                   <div className="text-center space-y-1 mb-8 text-white">
                      <h2 className={cn("text-xl font-black uppercase tracking-tight italic", isFirst ? "text-amber-500" : "text-white")}>{user.name}</h2>
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{user.role}</p>
                   </div>

                   <div className="w-full space-y-4">
                      <div className="bg-white/5 rounded-xl p-4 text-center border border-white/5 group-hover:border-white/10 transition-colors">
                         <p className="text-[9px] font-bold text-gray-600 uppercase tracking-widest mb-1">Reputation Score</p>
                         <p className="text-2xl font-black text-white italic tracking-tighter">{(user.contributions || 0).toLocaleString()} <span className="text-xs text-blue-500">Pts</span></p>
                      </div>
                   </div>
                </motion.div>
              )
           })}
        </div>

        {/* Rankings Table */}
        <div className="bg-[#0c0c0c] border border-white/5 rounded-2xl overflow-hidden mt-20 text-white">
           <header className="p-8 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white/[0.01]">
              <div className="flex items-center space-x-3">
                 <div className="w-10 h-10 rounded-lg bg-blue-600/10 border border-blue-600/20 flex items-center justify-center">
                    <Medal className="w-5 h-5 text-blue-500" />
                 </div>
                 <div className="text-left">
                    <h3 className="text-base font-bold uppercase tracking-tight italic">All Members</h3>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Global community rankings</p>
                 </div>
              </div>
              <div className="relative">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-700" />
                 <input 
                   type="text" 
                   placeholder="Search members..." 
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   className="bg-[#050505] border border-white/10 rounded-xl py-3 pl-12 pr-6 text-xs text-white focus:outline-none focus:border-blue-500/50 transition-all w-full md:w-64 font-medium"
                 />
              </div>
           </header>

           <div className="overflow-x-auto">
              <table className="w-full text-left">
                 <thead>
                    <tr className="bg-[#080808] border-b border-white/5">
                       <th className="px-8 py-5 text-[9px] font-bold uppercase text-gray-500 tracking-wider">Rank</th>
                       <th className="px-8 py-5 text-[9px] font-bold uppercase text-gray-500 tracking-wider">Member</th>
                       <th className="px-8 py-5 text-[9px] font-bold uppercase text-gray-500 tracking-wider">Role</th>
                       <th className="px-8 py-5 text-[9px] font-bold uppercase text-gray-500 tracking-wider text-right">Reputation</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-white/[0.03]">
                    {others.map((user, idx) => (
                      <motion.tr 
                        key={user._id}
                        className="hover:bg-white/[0.01] transition-colors group cursor-pointer"
                        whileHover={{ x: 4 }}
                      >
                         <td className="px-8 py-6">
                            <div className="w-10 h-10 rounded bg-[#050505] border border-white/10 flex items-center justify-center text-xs font-black text-gray-500 group-hover:text-white transition-colors">
                                #{idx + 4}
                            </div>
                         </td>
                         <td className="px-8 py-6">
                            <div className="flex items-center space-x-4">
                               <div className="w-10 h-10 rounded bg-white/5 border border-white/5 overflow-hidden p-1">
                                  <div className="w-full h-full bg-blue-600/10 rounded-sm flex items-center justify-center text-[10px] font-bold text-blue-500">
                                    {user.avatar_url ? <img src={user.avatar_url} className="w-full h-full object-cover" /> : user.name[0]}
                                  </div>
                                </div>
                               <div>
                                  <p className="text-xs font-bold text-gray-200 uppercase tracking-tight mb-0.5">{user.name}</p>
                                  <div className="flex items-center space-x-2">
                                     <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                                     <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">Active</span>
                                  </div>
                               </div>
                            </div>
                         </td>
                         <td className="px-8 py-6">
                            <span className="text-[9px] font-bold text-gray-400 border border-white/10 px-3 py-1 rounded-full uppercase tracking-widest bg-white/5">{user.role}</span>
                         </td>
                         <td className="px-8 py-6 text-right">
                            <div className="flex flex-col items-end">
                               <span className="text-base font-black text-white italic tracking-tight">{(user.contributions || 0).toLocaleString()}</span>
                               <span className="text-[8px] font-bold text-blue-500 uppercase tracking-widest mt-0.5">Points</span>
                            </div>
                         </td>
                      </motion.tr>
                    ))}
                 </tbody>
              </table>
           </div>
           
           <div className="p-8 bg-[#080808] border-t border-white/5 text-center">
              <button className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 hover:text-white transition-colors flex items-center justify-center space-x-2 mx-auto">
                 <span>Load More Members</span>
                 <ChevronDown className="w-4 h-4" />
              </button>
           </div>
        </div>

      </div>
    </div>
  );
};

export default LeaderboardPage;
