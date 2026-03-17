'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Search, 
  MapPin, 
  Calendar,
  Users,
  ChevronRight,
  ShieldCheck,
  Activity,
  ShieldAlert
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/useAuthStore';

export default function DashboardJudgingPage() {
  const [hackathons, setHackathons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const res = await fetch(`${baseUrl}/hackathons`);
        if (!res.ok) throw new Error('Failed to fetch event registry.');
        const data = await res.json();
        setHackathons(data);
      } catch (err) {
        console.error('Fetch Hackathons Error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchHackathons();
  }, []);

  const filteredHackathons = hackathons.filter(h => 
    h.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-xl font-black uppercase tracking-tight italic mb-8 text-white">Assigned Evaluations</h1>
          <p className="text-xs text-gray-500 font-bold uppercase tracking-widest leading-loose">Access hackathons configured for your Auditor clearance protocols.</p>
        </div>
        <div className="flex bg-[#0c0c0c] border border-white/5 rounded-lg p-1 w-64 transition-colors focus-within:border-blue-500/30">
          <input 
            type="text" 
            placeholder="Search assignments..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none focus:outline-none px-3 py-1.5 flex-grow text-white text-[11px] font-bold uppercase tracking-widest placeholder:text-gray-800"
          />
          <button className="p-1.5 text-gray-700 hover:text-white transition-colors">
            <Search className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {loading ? (
        <div className="py-20 text-center">
           <div className="text-blue-500 font-black italic animate-pulse tracking-widest uppercase text-xs">Synchronizing Audit Registry...</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {filteredHackathons.map((evt, idx) => {
            const isOngoing = new Date(evt.end_date) < new Date(); // Simple logic for demo
            return (
              <motion.div
                key={evt._id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-[#0c0c0c] border border-white/5 rounded-3xl p-8 flex flex-col group hover:border-blue-500/20 transition-all relative overflow-hidden group shadow-2xl"
              >
                {/* Status gradient bar */}
                <div className={cn(
                  "absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r transition-all duration-700",
                  isOngoing ? "from-blue-600 via-indigo-600 to-transparent" : "from-gray-800 to-transparent"
                )}></div>

                <div className="flex items-center justify-between mb-8">
                   <div className="p-3 rounded-xl bg-[#050505] border border-white/5 group-hover:border-blue-500/30 transition-colors shadow-inner">
                     <ShieldCheck className={cn("w-6 h-6", isOngoing ? "text-blue-500" : "text-gray-800")} />
                   </div>
                   <span className={cn(
                     "text-[9px] font-black px-3 py-1 rounded-sm uppercase tracking-tighter border italic shadow-xl transition-all duration-700",
                     isOngoing ? "bg-blue-600/10 text-blue-500 border-blue-500/20 animate-pulse" : "bg-white/5 text-gray-800 border-transparent opacity-50"
                   )}>
                     {isOngoing ? 'Audit Phase Ongoing' : 'Pre-Deployment'}
                   </span>
                </div>

                <div className="flex-grow">
                  <h3 className="text-lg font-black text-white uppercase tracking-tighter mb-2 group-hover:text-blue-400 transition-colors leading-tight italic">
                    {evt.title}
                  </h3>
                  
                  <p className="text-[10px] font-black text-gray-700 uppercase tracking-widest flex items-center mb-10 italic">
                    <Calendar className="w-3.5 h-3.5 mr-2 text-gray-800" /> SYNC_END: {new Date(evt.end_date).toLocaleDateString()}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-10">
                     <div className="bg-[#050505] border border-white/5 rounded-2xl p-4 text-center group-hover:border-white/10 transition-colors shadow-inner">
                        <p className="text-2xl font-black text-white italic tracking-tighter uppercase">500+</p>
                        <p className="text-[8px] font-black uppercase tracking-[0.2em] text-gray-800 mt-1">Total Binds</p>
                     </div>
                     <div className={cn(
                       "border rounded-2xl p-4 text-center transition-all shadow-inner",
                       isOngoing ? "bg-amber-500/5 border-amber-500/20" : "bg-[#050505] border-white/5"
                     )}>
                        <p className={cn("text-2xl font-black italic tracking-tighter uppercase", isOngoing ? "text-amber-500" : "text-gray-800")}>
                          {isOngoing ? '12+' : '0'}
                        </p>
                        <p className="text-[8px] font-black uppercase tracking-[0.2em] text-gray-800 mt-1 italic">Action Req.</p>
                     </div>
                  </div>
                </div>

                <Link 
                  href="/dashboard/submissions"
                  className={cn(
                    "w-full py-4 rounded-2xl flex items-center justify-center space-x-3 transition-all text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl italic",
                    isOngoing 
                      ? "bg-blue-600 text-white hover:bg-blue-500 shadow-blue-900/20 hover:scale-[1.02] active:scale-95"
                      : "bg-white/5 text-gray-800 pointer-events-none opacity-20"
                  )}
                >
                  <Activity className="w-4 h-4" />
                  <span>{isOngoing ? 'Execute Evaluation' : 'Locked Node'}</span>
                </Link>
                
                {/* Background Decor */}
                <div className="absolute -bottom-6 -right-6 text-9xl font-black italic text-white/[0.01] pointer-events-none group-hover:text-blue-500/[0.02] transition-colors">
                   {evt.title.slice(0, 1)}
                </div>
              </motion.div>
            )
          })}
          {filteredHackathons.length === 0 && (
            <div className="col-span-full py-20 text-center border border-dashed border-white/5 rounded-3xl">
               <ShieldAlert className="w-12 h-12 text-gray-800 mx-auto mb-6 opacity-30" />
               <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-800 italic">No assigned mission targets detected in auditor registry.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
