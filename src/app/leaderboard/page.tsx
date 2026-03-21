'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, 
  Search, 
  Crown, 
  Star, 
  Code, 
  Zap, 
  Users, 
  ArrowUpRight, 
  Loader2,
  Terminal,
  ShieldCheck,
  Award,
  Filter,
  Flame,
  Globe,
  Github,
  Twitter,
  ExternalLink,
  Milestone
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

interface UserNode {
  _id: string;
  name: string;
  username: string;
  role: string;
  bio: string;
  location: string;
  contributions: number;
  skills: string[];
  picture?: string;
}

export default function GlobalLeaderboard() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<UserNode[]>([]);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'global' | 'developers' | 'organizers'>('global');

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${baseUrl}/users/leaderboard`);
      if (res.ok) {
        setUsers(await res.json());
      }
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = users.filter(u => {
    const matchesSearch = u.username.toLowerCase().includes(search.toLowerCase()) || u.name.toLowerCase().includes(search.toLowerCase());
    if (activeTab === 'global') return matchesSearch;
    return matchesSearch && u.role === (activeTab === 'developers' ? 'developer' : 'organizer');
  });

  if (loading) {
     return (
       <div className="flex flex-col items-center justify-center min-h-screen bg-[#050505] space-y-4 text-center">
          <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-700 italic">Decrypting Reputation Matrix...</p>
       </div>
     );
  }

  const topThree = users.slice(0, 3);
  const others = filtered.slice((activeTab === 'global' && search === '') ? 3 : 0);

  return (
    <div className="min-h-screen bg-[#050505] pt-32 pb-24 px-6 md:px-12 text-left relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-900/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16">
         {/* Header */}
         <header className="flex flex-col md:flex-row md:items-end justify-between items-start gap-8 border-b border-white/[0.03] pb-12">
            <div className="space-y-4 text-left">
               <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-600/10 border border-blue-600/20 rounded-xl">
                     <Trophy className="w-5 h-5 text-blue-500" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-700 italic">Platform Reputation Registry</span>
               </div>
               <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-white">Global <span className="text-blue-500">Reputation</span></h1>
               <p className="text-xs text-gray-600 font-bold uppercase tracking-widest italic leading-relaxed max-w-2xl">
                  Monitoring top-tier contributors and solution architects within the distributed matrix.
               </p>
            </div>

            <div className="flex flex-col md:items-end gap-6 w-full md:w-auto">
                <div className="bg-[#0c0c0c] border border-white/5 p-1 rounded-2xl flex items-center shadow-inner self-start md:self-auto">
                   {['global', 'developers', 'organizers'].map((tab) => (
                      <button 
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={cn(
                           "px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all italic",
                           activeTab === tab ? "bg-blue-600/10 border border-blue-600/20 text-blue-500 shadow-md scale-[1.05]" : "text-gray-700 hover:text-white"
                        )}
                      >
                         {tab}
                      </button>
                   ))}
                </div>
                <div className="relative w-full md:w-80 group">
                   <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-700 group-focus-within:text-blue-500 transition-colors" />
                   <input 
                      type="text" 
                      placeholder="Search node identity..." 
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full bg-[#0c0c0c] border border-white/5 rounded-2xl py-4 pl-14 pr-6 text-xs text-white placeholder-gray-800 focus:outline-none focus:border-blue-600/20 transition-all font-bold italic shadow-xl"
                   />
                </div>
            </div>
         </header>

         {/* Podium */}
         {activeTab === 'global' && search === '' && (
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end pb-12">
              {/* Silver #2 */}
              <motion.div 
                 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                 className="relative group order-2 md:order-1"
              >
                 <div className="absolute inset-0 bg-blue-500/5 blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity" />
                 <div className="bg-[#0c0c0c] border border-white/5 rounded-[40px] p-8 space-y-6 relative overflow-hidden h-[380px] flex flex-col items-center justify-center text-center shadow-2xl group-hover:border-blue-500/20 transition-all">
                    <div className="absolute top-4 right-4 text-[10px] font-black text-gray-800 italic uppercase">#2 Silver</div>
                    <div className="relative w-24 h-24 mb-4">
                       <div className="absolute inset-x-0 -bottom-2 h-1 bg-gray-500/40 blur-md rounded-full" />
                       <div className="w-full h-full rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
                          {topThree[1]?.picture ? <Image src={topThree[1].picture} alt="P2" width={96} height={96} /> : <Users className="w-8 h-8 text-gray-800" />}
                       </div>
                       <div className="absolute -top-3 -right-3 w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-gray-400 rotate-12 group-hover:rotate-0 transition-transform">
                          <Award className="w-5 h-5 shadow-sm" />
                       </div>
                    </div>
                    <div className="space-y-1">
                       <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter line-clamp-1">{topThree[1]?.name || 'Analyzing...'}</h3>
                       <p className="text-[10px] text-gray-700 font-bold uppercase tracking-widest italic">@{topThree[1]?.username}</p>
                    </div>
                    <div className="pt-4 space-y-2">
                       <span className="text-3xl font-black text-white italic tracking-tighter">{topThree[1]?.contributions || 0}</span>
                       <span className="text-[8px] text-gray-800 font-black uppercase tracking-widest block italic">Reputation Capacity</span>
                    </div>
                    <Link href={`/profile/${topThree[1]?.username}`} className="mt-4 px-8 py-3 bg-white/5 border border-white/10 rounded-xl text-[9px] font-black uppercase italic text-gray-700 hover:text-white transition-all shadow-sm">Audit Profile</Link>
                 </div>
              </motion.div>

              {/* Gold #1 */}
              <motion.div 
                 initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                 className="relative group z-10 order-1 md:order-2"
              >
                 <div className="absolute -inset-2 bg-blue-600/10 blur-[60px] opacity-100 group-hover:bg-blue-600/20 transition-all" />
                 <div className="bg-[#0e0e0e] border border-blue-600/20 rounded-[50px] p-10 space-y-8 relative overflow-hidden h-[450px] flex flex-col items-center justify-center text-center shadow-[0_0_100px_rgba(59,130,246,0.1)] group-hover:border-blue-500/40 transition-all scale-105 md:scale-110">
                    <div className="absolute top-6 right-6 text-[11px] font-black text-blue-500 italic uppercase flex items-center animate-bounce">
                       <Crown className="w-4 h-4 mr-2" /> #1 Protocol
                    </div>
                    <div className="relative w-32 h-32 mb-4">
                       <div className="absolute inset-x-0 -bottom-4 h-2 bg-blue-500/40 blur-xl rounded-full" />
                       <div className="w-full h-full rounded-[40px] bg-blue-600/10 border border-blue-600/20 flex items-center justify-center overflow-hidden relative shadow-2xl">
                          {topThree[0]?.picture ? <Image src={topThree[0].picture} alt="P1" width={128} height={128} /> : <Users className="w-12 h-12 text-blue-500" />}
                          <div className="absolute inset-0 bg-blue-500/5 animate-pulse" />
                       </div>
                    </div>
                    <div className="space-y-2">
                       <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter line-clamp-1">{topThree[0]?.name || 'Analyzing...'}</h3>
                       <div className="flex items-center justify-center space-x-2">
                          <ShieldCheck className="w-3.5 h-3.5 text-blue-500/50" />
                          <p className="text-[11px] text-gray-600 font-bold uppercase tracking-widest italic">@{topThree[0]?.username}</p>
                       </div>
                    </div>
                    <div className="pt-2 space-y-2">
                       <span className="text-5xl font-black text-blue-500 italic tracking-tighter drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]">{topThree[0]?.contributions || 0}</span>
                       <span className="text-[9px] text-gray-700 font-black uppercase tracking-widest block italic">Dominance Index</span>
                    </div>
                    <Link href={`/profile/${topThree[0]?.username}`} className="mt-4 px-10 py-4 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase italic shadow-xl shadow-blue-500/20 hover:bg-blue-500 transition-all active:scale-95">Identity Verification</Link>
                 </div>
              </motion.div>

              {/* Bronze #3 */}
              <motion.div 
                 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                 className="relative group order-3"
              >
                 <div className="absolute inset-0 bg-blue-900/5 blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity" />
                 <div className="bg-[#0c0c0c] border border-white/5 rounded-[40px] p-8 space-y-6 relative overflow-hidden h-[340px] flex flex-col items-center justify-center text-center shadow-2xl group-hover:border-blue-500/20 transition-all">
                    <div className="absolute top-4 right-4 text-[10px] font-black text-gray-800 italic uppercase">#3 Bronze</div>
                    <div className="relative w-20 h-20 mb-4">
                       <div className="absolute inset-x-0 -bottom-2 h-1 bg-amber-900/40 blur-md rounded-full" />
                       <div className="w-full h-full rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden shadow-lg">
                          {topThree[2]?.picture ? <Image src={topThree[2].picture} alt="P3" width={80} height={80} /> : <Users className="w-6 h-6 text-gray-800" />}
                       </div>
                    </div>
                    <div className="space-y-1">
                       <h3 className="text-xl font-black text-white italic uppercase tracking-tighter line-clamp-1">{topThree[2]?.name || 'Analyzing...'}</h3>
                       <p className="text-[10px] text-gray-700 font-bold uppercase tracking-widest italic">@{topThree[2]?.username}</p>
                    </div>
                    <div className="pt-2 space-y-2">
                       <span className="text-2xl font-black text-white italic tracking-tighter">{topThree[2]?.contributions || 0}</span>
                       <span className="text-[8px] text-gray-800 font-black uppercase tracking-widest block italic">Mission Pts</span>
                    </div>
                    <Link href={`/profile/${topThree[2]?.username}`} className="mt-4 px-6 py-2.5 bg-white/5 border border-white/10 rounded-xl text-[8px] font-black uppercase italic text-gray-700 hover:text-white transition-all shadow-sm">View Node</Link>
                 </div>
              </motion.div>
           </div>
         )}

         {/* Extended List */}
         <div className="bg-[#0c0c0c] border border-white/5 rounded-[40px] overflow-hidden shadow-2xl relative">
            <div className="absolute inset-0 bg-white/[0.01] pointer-events-none" />
            <table className="w-full text-left relative z-10 border-collapse">
               <thead>
                  <tr className="border-b border-white/[0.05] bg-white/[0.01]">
                     <th className="px-10 py-10 text-[10px] font-black text-gray-700 uppercase tracking-widest italic">Rank Node</th>
                     <th className="px-10 py-10 text-[10px] font-black text-gray-700 uppercase tracking-widest italic">Identity Identifier</th>
                     <th className="px-10 py-10 text-[10px] font-black text-gray-700 uppercase tracking-widest italic">Platform Role</th>
                     <th className="px-10 py-10 text-[10px] font-black text-gray-700 uppercase tracking-widest italic">Skill Module</th>
                     <th className="px-10 py-10 text-[10px] font-black text-gray-700 uppercase tracking-widest italic text-right">Telemetrics</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-white/[0.03]">
                  {others.map((u, i) => {
                     const rank = (activeTab === 'global' && search === '') ? i + 4 : i + 1;
                     return (
                        <motion.tr 
                          key={u._id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.02 }}
                          className="group hover:bg-white/[0.015] transition-all cursor-crosshair border-l-2 border-l-transparent hover:border-l-blue-600"
                        >
                           <td className="px-10 py-8">
                              <span className="text-sm font-black text-gray-800 group-hover:text-blue-500 transition-colors font-mono italic">#{rank.toString().padStart(2, '0')}</span>
                           </td>
                           <td className="px-10 py-8">
                              <div className="flex items-center space-x-5">
                                 <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-blue-500/20 transition-colors shadow-lg relative overflow-hidden mt-1 pt-1">
                                    {u.picture ? <Image src={u.picture} alt={u.username} fill className="object-cover" /> : <Users className="w-5 h-5 text-gray-800" />}
                                 </div>
                                 <div className="flex flex-col text-left space-y-1">
                                    <Link href={`/profile/${u.username}`} className="text-sm font-black text-white hover:text-blue-500 transition-colors uppercase italic tracking-tighter leading-tight">{u.name}</Link>
                                    <span className="text-[9px] font-bold text-gray-700 uppercase tracking-widest italic">@{u.username}</span>
                                 </div>
                              </div>
                           </td>
                           <td className="px-10 py-8">
                              <div className={cn(
                                 "px-3 py-1 rounded-lg border text-[8px] font-black uppercase tracking-widest italic inline-flex items-center shadow-sm",
                                 u.role === 'admin' ? "bg-red-500/10 border-red-500/20 text-red-500" :
                                 u.role === 'organizer' ? "bg-blue-600/10 border-blue-600/20 text-blue-500" :
                                 "bg-white/5 border-white/10 text-gray-600"
                              )}>
                                 <div className={cn("w-1 h-1 rounded-full mr-2", u.role === 'admin' ? "bg-red-500" : u.role === 'organizer' ? "bg-blue-500" : "bg-gray-700")} />
                                 {u.role}
                              </div>
                           </td>
                           <td className="px-10 py-8">
                              <div className="flex flex-wrap gap-2 max-w-[200px]">
                                 {u.skills.slice(0, 3).map((s, si) => (
                                    <span key={si} className="text-[7px] font-black text-gray-800 uppercase tracking-widest italic border border-white/5 px-2 py-0.5 rounded shadow-inner">{s}</span>
                                 ))}
                                 {u.skills.length > 3 && <span className="text-[7px] text-gray-800 italic">+{u.skills.length - 3}</span>}
                              </div>
                           </td>
                           <td className="px-10 py-8 text-right">
                              <div className="flex flex-col items-end space-y-1">
                                 <span className="text-xl font-black text-white italic tracking-tighter group-hover:text-blue-500 transition-colors">{u.contributions || 0}</span>
                                 <div className="flex items-center space-x-2 text-[7px] font-black uppercase tracking-widest text-emerald-500 italic opacity-0 group-hover:opacity-100 transition-all translate-y-1 group-hover:translate-y-0">
                                    <Flame className="w-3 h-3 fill-emerald-500/20" />
                                    <span>Rising Integrity</span>
                                 </div>
                              </div>
                           </td>
                        </motion.tr>
                     );
                  })}

                  {others.length === 0 && (
                     <tr>
                        <td colSpan={5} className="py-24 text-center">
                           <div className="flex flex-col items-center justify-center opacity-30 space-y-4">
                              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                                 <Filter className="w-6 h-6" />
                              </div>
                              <p className="text-[10px] font-black uppercase tracking-widest italic">Identity match negative. Registry scan complete.</p>
                           </div>
                        </td>
                     </tr>
                  )}
               </tbody>
            </table>
         </div>

         {/* Bottom Hub */}
         <div className="flex flex-col md:flex-row gap-8 text-left">
            <section className="flex-1 bg-white/[0.01] border border-white/5 p-10 rounded-[40px] space-y-6 group hover:border-blue-600/20 transition-all shadow-xl">
               <div className="flex items-center space-x-4">
                  <Flame className="w-6 h-6 text-blue-500" />
                  <h4 className="text-xl font-black text-white italic uppercase tracking-tighter">Rising <span className="text-blue-500">Talent</span></h4>
               </div>
               <p className="text-[11px] text-gray-600 font-bold uppercase tracking-widest leading-relaxed italic max-w-sm">
                  Nodes with high signal velocity in the last 7 cycles. Performance metrics are recalculated every 24 hours.
               </p>
               <div className="pt-4 flex items-center space-x-4 opacity-50 group-hover:opacity-100 transition-all">
                  <div className="flex -space-x-3">
                     {[1,2,3,4].map(i => (
                        <div key={i} className="w-10 h-10 rounded-xl bg-[#0c0c0c] border-2 border-[#050505] overflow-hidden" />
                     ))}
                  </div>
                  <button className="text-[9px] font-black text-blue-500 uppercase tracking-widest italic hover:text-white transition-colors flex items-center">
                     View Signal Analysis <ArrowUpRight className="w-3.5 h-3.5 ml-2" />
                  </button>
               </div>
            </section>

            <section className="flex-1 bg-blue-600/5 border border-blue-600/10 p-10 rounded-[40px] flex flex-col justify-center space-y-8 relative overflow-hidden shadow-2xl">
               <div className="absolute top-0 right-0 p-10 opacity-[0.02] pointer-events-none group-hover:scale-110 transition-transform">
                  <Terminal className="w-40 h-40" />
               </div>
               <div className="space-y-2 relative z-10 text-left">
                  <h4 className="text-xl font-black text-white italic uppercase tracking-tighter">Signal <span className="text-blue-500">Integrity</span></h4>
                  <p className="text-[11px] text-gray-700 font-bold uppercase tracking-widest italic">Verified by decentralized audit protocol.</p>
               </div>
               <div className="flex items-center space-x-4 relative z-10 pt-2 font-black italic">
                  <button className="px-10 py-4 bg-blue-600 text-white rounded-2xl text-[10px] uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:bg-blue-500 transition-all active:scale-95">Claim Node</button>
                  <button className="px-10 py-4 border border-white/5 rounded-2xl text-[10px] text-gray-700 hover:text-white transition-all shadow-sm">Audit Rules</button>
               </div>
            </section>
         </div>
      </div>
    </div>
  );
}
