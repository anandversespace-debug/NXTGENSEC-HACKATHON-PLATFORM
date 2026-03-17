'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy,
  Activity,
  Award,
  Crown,
  User
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/useAuthStore';

export default function DashboardLeaderboardPage() {
  const [developers, setDevelopers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const res = await fetch(`${baseUrl}/users/leaderboard`);
        if (!res.ok) throw new Error('System failed to synchronize node registry.');
        const data = await res.json();
        setDevelopers(data);
      } catch (err) {
        console.error('Failed to fetch dashboard leaderboard data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDevelopers();
  }, []);

  const leaderboard = developers.slice(0, 5);
  const podiumOrder: any[] = [];
  if (leaderboard.length >= 2) podiumOrder.push(leaderboard[1]);
  if (leaderboard.length >= 1) podiumOrder.push(leaderboard[0]);
  if (leaderboard.length >= 3) podiumOrder.push(leaderboard[2]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-blue-500 font-black italic animate-pulse tracking-widest uppercase text-xs">Accessing Hierarchy Registry...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-xl font-black uppercase tracking-tight italic mb-0.5 text-white">Global Hierarchy</h1>
          <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Real-time compilation of network contributors by reputation.</p>
        </div>
      </header>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 pb-6 hidden md:grid items-end">
         {podiumOrder.map((user, idx) => {
            const rank = podiumOrder.indexOf(user) === 1 ? 1 : podiumOrder.indexOf(user) === 0 ? 2 : 3;
            const isWinner = rank === 1;
            return (
              <motion.div 
                key={user._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={cn(
                  "bg-[#0c0c0c] border rounded-t-xl flex flex-col items-center justify-end p-6 relative group transition-all duration-500",
                  isWinner ? "border-amber-500/30 h-64 bg-gradient-to-t from-amber-500/10 to-transparent" : "border-white/5 h-48"
                )}
              >
                 {isWinner && <Crown className="w-8 h-8 text-amber-500 absolute -top-12 animate-pulse" />}
                 
                 <div className="w-16 h-16 rounded-full bg-[#050505] border border-white/10 flex items-center justify-center text-xl font-black mb-4 z-10 overflow-hidden">
                    {user.avatar_url ? (
                      <img src={user.avatar_url} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-gray-700">{user.name[0]}</span>
                    )}
                 </div>
                 
                 <h2 className={cn("text-base font-black uppercase tracking-tight italic text-center", isWinner ? "text-amber-500" : "text-gray-200")}>{user.name}</h2>
                 <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mt-1 italic">:: {user.role}</p>
                 <p className="text-xl font-black text-white mt-4 italic">{(user.contributions || 0).toLocaleString()} <span className="text-[10px] text-gray-600 font-bold not-italic font-mono">CP</span></p>

                 {/* Rank Number Behind overlay */}
                 <div className="absolute bottom-4 opacity-5 pointer-events-none text-9xl font-black italic text-white">
                   {rank}
                 </div>
              </motion.div>
            )
         })}
      </div>

      <div className="bg-[#0c0c0c] border border-white/5 rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[#080808] border-b border-white/5">
            <tr>
              <th className="px-6 py-4 text-[9px] font-bold uppercase text-gray-500 tracking-wider w-16 text-center">Rank</th>
              <th className="px-6 py-4 text-[9px] font-bold uppercase text-gray-500 tracking-wider">Identity</th>
              <th className="px-6 py-4 text-[9px] font-bold uppercase text-gray-500 tracking-wider">Classification</th>
              <th className="px-6 py-4 text-[9px] font-bold uppercase text-gray-500 tracking-wider text-right">Reputation (CP)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.02]">
            {(leaderboard || []).map((user, i) => (
              <tr key={user._id} className={cn("transition-colors group", i < 3 ? "hidden md:table-row" : "hover:bg-white/[0.01]")}>
                <td className="px-6 py-4">
                   <div className="w-8 h-8 mx-auto rounded bg-[#050505] border border-white/5 flex items-center justify-center text-xs font-black text-gray-700 group-hover:text-blue-500 transition-colors">
                     #{i + 1}
                   </div>
                </td>
                <td className="px-6 py-4">
                   <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 rounded bg-white/5 flex items-center justify-center overflow-hidden">
                         {user.avatar_url ? <img src={user.avatar_url} className="w-full h-full object-cover" /> : <User className="w-3 h-3 text-gray-700" />}
                      </div>
                      <p className="text-xs font-bold text-gray-200 uppercase tracking-tight italic">{user.name}</p>
                   </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-[9px] font-bold text-gray-500 border border-white/10 px-2 py-0.5 rounded uppercase tracking-widest bg-white/5 italic">{user.role}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="text-sm font-black text-white italic tracking-tighter">{(user.contributions || 0).toLocaleString()}</span>
                </td>
              </tr>
            ))}
            {leaderboard.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-20 text-center text-gray-600 text-[10px] font-bold uppercase tracking-widest italic">No network identities synchronized.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
