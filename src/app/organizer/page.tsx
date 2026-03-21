'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Users2, 
  FileCode, 
  Wallet, 
  Activity, 
  Trophy,
  ArrowUpRight,
  TrendingUp,
  Clock,
  Zap,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  BarChart4,
  CalendarDays,
  ShieldCheck,
  Layers,
  ArrowRight,
  Loader2,
  Bell
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  LineChart,
  Line,
  CartesianGrid,
  AreaChart,
  Area
} from 'recharts';

export default function OrganizerOverview() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);
  const [recentActions, setRecentActions] = useState<any[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const res = await fetch(`${baseUrl}/organizer/stats/overview`, {
          headers: { 
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (res.ok) {
           const data = await res.json();
           setStats(data);
        }
      } catch (err) {
        console.error('Stats error:', err);
      } finally {
        setLoading(false);
      }
    };

    const fetchActivity = async () => {
       try {
          const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
          const res = await fetch(`${baseUrl}/notifications`, {
             headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
          });
          if (res.ok) {
             const data = await res.json();
             setRecentActions(data.slice(0, 3));
          }
       } catch (err) {}
    };

    fetchStats();
    fetchActivity();
  }, []);

  const metricCards = [
    { label: 'Registrations', value: stats?.registrations || '0', icon: Users, color: 'blue', trend: '+15%' },
    { label: 'Total Teams', value: stats?.teams || '0', icon: Users2, color: 'blue', trend: '+8%' },
    { label: 'Submissions', value: stats?.submissions || '0', icon: FileCode, color: 'blue', trend: '+22%' },
    { label: 'Revenue Hub', value: `$${stats?.revenue?.toLocaleString() || '0'}`, icon: Wallet, color: 'blue', trend: 'Live' },
    { label: 'Active Fleet', value: stats?.activeUsers || '0', icon: Activity, color: 'blue', trend: 'Live' },
    { label: 'Hackathons', value: stats?.activeHackathons || '0', icon: Trophy, color: 'blue', trend: 'Active' },
  ];

  if (loading) {
     return (
       <div className="flex flex-col items-center justify-center h-[50vh] space-y-4">
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-700 italic">Syncing Hub Registry...</p>
       </div>
     );
  }

  return (
    <div className="space-y-8 pb-12 text-left">
      {/* Overview Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between items-start gap-6 border-b border-white/[0.03] pb-6">
         <div className="space-y-2 text-left">
            <div className="flex items-center space-x-2">
               <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
               <span className="text-[9px] font-black uppercase tracking-widest text-gray-700 italic">Central Terminal Overview</span>
            </div>
            <h1 className="text-2xl font-black italic uppercase tracking-tighter text-white">Organizer <span className="text-blue-500 ml-1">Dashboard</span></h1>
            <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest italic leading-relaxed max-w-lg">
               Monitoring pulse and telemetry from active event modules.
            </p>
         </div>
         <div className="bg-[#0c0c0c] border border-white/5 px-4 py-2.5 rounded-xl shadow-xl flex items-center space-x-3">
            <CalendarDays className="w-4 h-4 text-blue-500" />
            <span className="text-[9px] font-black tracking-widest text-white italic font-mono">{new Date().toLocaleDateString('en-CA').replace(/-/g, '.')}</span>
         </div>
      </header>

      {/* Grid: Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
         {metricCards.map((card, i) => (
            <motion.div 
               key={card.label}
               initial={{ opacity: 0, scale: 0.98 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: i * 0.05 }}
               className="bg-[#0c0c0c] border border-white/5 p-6 rounded-2xl relative overflow-hidden group hover:border-blue-500/20 transition-all shadow-xl"
            >
               <div className="relative z-10 flex items-center justify-between mb-6">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center border bg-blue-600/10 border-blue-600/20 text-blue-500 group-hover:scale-110 transition-transform">
                     <card.icon className="w-5 h-5" />
                  </div>
                  <div className="text-right">
                     <span className="text-[9px] font-black text-gray-700 uppercase tracking-widest block mb-1">{card.label}</span>
                     <span className="text-2xl font-black text-white italic tracking-tighter leading-none">{card.value}</span>
                  </div>
               </div>
               <div className="mt-4 flex items-center justify-between relative z-10">
                  <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-lg animate-pulse" />
                      <span className="text-[8px] font-black uppercase text-blue-500 tracking-widest italic">{card.trend}</span>
                  </div>
                  <Link href="#" className="p-1.5 bg-white/5 border border-white/10 rounded-lg text-gray-700 hover:text-white transition-all">
                     <ChevronRight className="w-4 h-4" />
                  </Link>
               </div>
               <div className="absolute bottom-0 left-0 w-full h-[1.5px] bg-white/[0.03] group-hover:bg-blue-500/20 transition-all" />
            </motion.div>
         ))}
      </div>

      {/* Grid: Charts & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
         {/* Trend Matrix */}
         <div className="lg:col-span-2 bg-[#0c0c0c] border border-white/5 rounded-2xl p-6 shadow-xl space-y-8">
            <header className="flex items-center justify-between mb-4 border-b border-white/[0.03] pb-4">
               <div className="space-y-1 text-left">
                  <h3 className="text-xs font-black italic uppercase tracking-tighter text-white flex items-center leading-none">
                     <TrendingUp className="w-4 h-4 mr-2 text-blue-500" />
                     Pulse <span className="text-blue-500 ml-2">Trends</span>
                  </h3>
                  <p className="text-[9px] text-gray-700 font-bold uppercase tracking-widest italic">Temporal Matrix History</p>
               </div>
               <div className="bg-blue-600/10 border border-blue-600/20 px-3 py-1 rounded-md text-[8px] font-black uppercase text-blue-500 italic">Sync Active</div>
            </header>

            <div className="h-48 w-full p-1">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={stats?.timeline || []}>
                     <defs>
                        <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                           <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="4 4" stroke="#1f2937" vertical={false} />
                     <XAxis dataKey="name" stroke="#4b5563" fontSize={9} tickLine={false} axisLine={false} tick={{ fontWeight: 800 }} />
                     <YAxis stroke="#4b5563" fontSize={9} tickLine={false} axisLine={false} tick={{ fontWeight: 800 }} />
                     <Tooltip 
                        contentStyle={{ backgroundColor: '#0c0c0c', border: '1px solid #3b82f633', borderRadius: '12px' }}
                        itemStyle={{ color: '#3b82f6', fontSize: '9px', fontWeight: '900', textTransform: 'uppercase' }}
                        labelStyle={{ fontSize: '8px', color: '#4b5563', marginBottom: '4px', fontWeight: 900 }}
                     />
                     <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorVal)" />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* Activity Log */}
         <div className="bg-[#0c0c0c] border border-white/5 rounded-2xl p-6 shadow-xl relative overflow-hidden flex flex-col">
            <header className="flex items-center justify-between mb-8 pb-4 border-b border-white/[0.05]">
               <div className="space-y-1 text-left">
                  <h3 className="text-xs font-black italic uppercase tracking-tighter text-white flex items-center">
                     <Zap className="w-4 h-4 mr-2 text-blue-500" />
                     Recent <span className="text-blue-500 ml-2">Pulse</span>
                  </h3>
               </div>
               <Link href="/organizer/communication" className="text-[9px] font-black text-blue-500 hover:text-white transition-colors italic uppercase tracking-widest">Logs →</Link>
            </header>

            <div className="space-y-3 flex-1">
               {recentActions.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-10 opacity-20 space-y-3">
                     <Bell className="w-8 h-8" />
                     <p className="text-[9px] font-black uppercase tracking-widest italic">Registry Empty</p>
                  </div>
               ) : (
                  recentActions.map((log: any, i: number) => (
                     <motion.div 
                        key={log._id}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center justify-between p-3 border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] rounded-xl transition-all shadow-md group cursor-pointer text-left"
                     >
                        <div className="flex items-center space-x-3">
                           <div className={cn(
                              "w-8 h-8 rounded-lg flex items-center justify-center border text-[10px] font-black",
                              log.type === 'error' ? "bg-red-600/10 border-red-600/20 text-red-500" : "bg-blue-600/10 border-blue-600/20 text-blue-500"
                           )}>
                              <Layers className="w-4 h-4" />
                           </div>
                           <div className="flex flex-col text-left">
                              <span className="text-[10px] font-black text-white uppercase italic tracking-tighter group-hover:text-blue-500 transition-colors truncate w-32">{log.title}</span>
                              <span className="text-[8px] font-black text-gray-700 italic uppercase">Log Entry</span>
                           </div>
                        </div>
                        <div className="text-right">
                           <div className="text-[7px] font-bold text-gray-800 flex items-center mt-1 uppercase italic font-mono"><Clock className="w-2 h-2 mr-1" /> {new Date(log.createdAt).toLocaleDateString()}</div>
                        </div>
                     </motion.div>
                  ))
               )}
            </div>
         </div>
      </div>

      {/* Call to Action Node */}
      <section className="bg-blue-600/5 border border-blue-600/10 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-8 text-left relative overflow-hidden group shadow-2xl">
         <div className="relative z-10 space-y-4 flex-1 text-left">
            <div className="flex items-center space-x-4">
               <Zap className="w-5 h-5 text-blue-500 animate-pulse" />
               <h3 className="text-xl font-black italic uppercase tracking-tighter text-white">Create your <span className="text-blue-500 ml-1">Next Event</span></h3>
            </div>
            <p className="text-[10px] font-bold text-gray-700 tracking-[0.2em] leading-relaxed max-w-xl italic uppercase font-mono">
               Initiate new hackathon modules and manage sub-node clusters.
            </p>
         </div>
         <div className="relative z-10 flex items-center space-x-4 w-full md:w-auto">
            <Link href="/organizer/hackathons" className="bg-blue-600 text-white text-[9px] font-black uppercase tracking-widest px-8 py-4 rounded-xl hover:bg-blue-500 transition-all shadow-xl active:scale-95 group italic">
               New Protocol <ArrowRight className="w-3.5 h-3.5 inline-block ml-2 group-hover:translate-x-1 transition-all" />
            </Link>
            <Link href="/organizer/communication" className="bg-white/5 border border-white/10 text-gray-800 text-[9px] font-black uppercase tracking-widest px-8 py-4 rounded-xl hover:bg-white/10 hover:text-white transition-all italic shadow-inner">
               Audit Logs
            </Link>
         </div>
      </section>
    </div>
  );
}
