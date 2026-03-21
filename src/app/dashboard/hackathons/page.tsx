'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, ChevronRight, Activity, Calendar, Award } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function DashboardHackathonsPage() {
  const [hackathons, setHackathons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyHackathons = async () => {
      try {
        const token = localStorage.getItem('token');
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const res = await fetch(`${baseUrl}/hackathons/my`, {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          credentials: 'include'
        });
        if (!res.ok) throw new Error('Failed to fetch your hackathons.');
        const data = await res.json();
        setHackathons(data);
      } catch (err) {
        console.error('Fetch My Hackathons Error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMyHackathons();
  }, []);

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-xl font-black uppercase tracking-tight italic mb-8 text-white">My Hackathons</h1>
          <p className="text-xs text-gray-500 font-bold uppercase tracking-widest leading-loose">Track the progress of hackathons you joined.</p>
        </div>
        <Link href="/hackathons" className="bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white text-[10px] font-black uppercase tracking-widest px-6 py-2.5 rounded-lg border border-white/5 transition-all italic">
          Browse All →
        </Link>
      </header>

      {loading ? (
        <div className="py-20 text-center">
           <div className="text-blue-500 font-black italic animate-pulse tracking-widest uppercase text-xs">Loading...</div>
        </div>
      ) : (
        <div className="space-y-6 mt-8">
          {hackathons.map((hackathon, idx) => (
            <motion.div
              key={hackathon._id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-[#0c0c0c] border border-white/5 p-8 rounded-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-6 group hover:border-blue-500/20 transition-all pointer-events-auto relative overflow-hidden"
            >
              <div className="flex items-center space-x-8 relative z-10">
                <div className="w-16 h-16 bg-[#050505] border border-white/5 rounded-xl flex items-center justify-center text-blue-500 group-hover:border-blue-500/30 group-hover:scale-105 transition-all duration-700 shadow-inner">
                  <Trophy className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-center space-x-4 mb-3">
                    <h3 className="text-base font-black text-gray-200 uppercase tracking-tight group-hover:text-blue-400 transition-colors italic">
                      {hackathon.title}
                    </h3>
                    <span className="text-[8px] font-black px-3 py-1 rounded-sm uppercase tracking-tighter border bg-blue-600/10 text-blue-500 border-blue-500/20 italic animate-pulse">
                      Active
                    </span>
                  </div>
                  <div className="flex items-center space-x-6 text-[10px] text-gray-600 font-bold uppercase tracking-widest italic">
                    <span className="flex items-center"><Activity className="w-3.5 h-3.5 mr-2 text-gray-800" /> Team: {hackathon.team_name}</span>
                    <span className="flex items-center"><Calendar className="w-3.5 h-3.5 mr-2 text-gray-800" /> Ends: {new Date(hackathon.end_date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between lg:justify-end space-x-12 border-t lg:border-t-0 border-white/[0.03] pt-6 lg:pt-0 relative z-10">
                 <div className="text-left lg:text-right">
                    <p className="text-[8px] font-black text-gray-700 uppercase tracking-widest mb-1 italic">Current Standing</p>
                    <p className="text-lg font-black italic text-white flex items-center space-x-3">
                      <Award className="w-5 h-5 text-emerald-500" />
                      <span className="uppercase tracking-widest text-xs font-black">Not Ranked</span>
                    </p>
                 </div>
                 <Link href={`/dashboard/hackathons/${hackathon._id}`} className="bg-white/5 hover:bg-blue-600 text-gray-700 hover:text-white p-4 rounded-xl border border-transparent hover:border-blue-500/30 transition-all shadow-xl group-hover:scale-110">
                    <ChevronRight className="w-5 h-5" />
                 </Link>
              </div>
              
              {/* Background Label */}
              <div className="absolute top-1/2 -translate-y-1/2 -right-8 text-8xl font-black italic text-white/[0.01] pointer-events-none uppercase tracking-tighter">
                 {hackathon.title.slice(0, 4)}
              </div>
            </motion.div>
          ))}
          {hackathons.length === 0 && (
            <div className="py-20 text-center border border-dashed border-white/5 rounded-3xl">
               <Trophy className="w-12 h-12 text-gray-800 mx-auto mb-4 opacity-50" />
               <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-700 italic">You haven&apos;t joined any hackathons yet.</p>
               <Link href="/hackathons" className="mt-8 inline-block text-[10px] font-black uppercase tracking-widest text-blue-500 hover:text-blue-400 transition-colors">Browse Hackathons</Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
