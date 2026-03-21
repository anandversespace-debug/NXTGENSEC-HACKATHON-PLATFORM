'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  FileCode, 
  Download, 
  Filter, 
  Calendar, 
  ArrowUpRight, 
  ArrowDownRight, 
  Globe, 
  Zap, 
  Activity, 
  PieChart as PieChartIcon, 
  Target,
  Loader2,
  ChevronRight,
  Info,
  Layers,
  Search
} from 'lucide-react';
import { cn } from '@/lib/utils';

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
  Area,
  PieChart,
  Pie
} from 'recharts';

export default function IntelligenceDashboard() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    setTimeout(() => {
      setData({
        registrationTrends: [
          { name: 'W1', users: 400, teams: 100 },
          { name: 'W2', users: 600, teams: 150 },
          { name: 'W3', users: 800, teams: 210 },
          { name: 'W4', users: 1200, teams: 320 },
          { name: 'W5', users: 1500, teams: 410 },
          { name: 'W6', users: 2450, teams: 612 },
        ],
        engagementDistribution: [
          { name: 'Developers', value: 55, color: '#3b82f6' },
          { name: 'Designers', value: 25, color: '#60a5fa' },
          { name: 'Mentors', value: 12, color: '#93c5fd' },
          { name: 'Others', value: 8, color: '#1e40af' },
        ],
        trafficSources: [
          { name: 'Social Media', value: 45 },
          { name: 'Referrals', value: 25 },
          { name: 'Paid Ads', value: 20 },
          { name: 'Organic', value: 10 },
        ],
        dropoffMatrix: [
          { step: 'Landing Page', value: 100 },
          { step: 'Signup Form', value: 85 },
          { step: 'Email Verified', value: 72 },
          { step: 'Team Created', value: 68 },
        ]
      });
      setLoading(false);
    }, 1500);
  }, []);

  if (loading) {
     return (
       <div className="flex flex-col items-center justify-center h-[50vh] space-y-4 text-center">
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
          <p className="text-[9px] font-black uppercase tracking-widest text-gray-700 italic">Finding Data...</p>
       </div>
     );
  }

  return (
    <div className="space-y-8 pb-12 text-left">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between items-start gap-6 border-b border-white/[0.03] pb-6">
         <div className="space-y-2 text-left">
            <div className="flex items-center space-x-2">
               <BarChart3 className="w-4 h-4 text-blue-500 shadow-md shadow-blue-500/10" />
               <span className="text-[9px] font-black uppercase tracking-widest text-gray-700 italic">Data Analytics</span>
            </div>
            <h1 className="text-2xl font-black italic uppercase tracking-tighter text-white">Event <span className="text-blue-500 ml-1">Insights</span></h1>
            <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest italic leading-relaxed max-w-lg">
               Track registrations, engagement, and conversion rates across your events.
            </p>
         </div>

         <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-6 py-3 bg-white/5 border border-white/5 text-gray-500 hover:text-white rounded-xl transition-all group shadow-sm">
               <Calendar className="w-3.5 h-3.5" />
               <span className="text-[9px] font-black uppercase tracking-widest italic font-bold">Last 30 Days</span>
            </button>
            <button className="flex items-center space-x-2 px-8 py-3 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-500 transition-all active:scale-95 group">
                <Download className="w-4 h-4" />
                <span className="text-[9px] font-black uppercase tracking-widest italic font-bold">Download Report</span>
            </button>
         </div>
      </header>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
         
         {/* Trends */}
         <div className="bg-[#0c0c0c] border border-white/5 rounded-2xl p-6 space-y-6 lg:col-span-2 relative overflow-hidden group shadow-xl">
            <header className="flex items-center justify-between">
               <div className="space-y-1 text-left">
                  <h3 className="text-lg font-black italic uppercase tracking-tighter text-white flex items-center">
                     <TrendingUp className="w-4 h-4 mr-2 text-blue-500" />
                     Registration <span className="text-blue-500 ml-2">Trends</span>
                  </h3>
                  <p className="text-[9px] text-gray-800 font-black uppercase tracking-widest italic">User growth over time</p>
               </div>
            </header>

            <div className="h-64 w-full relative z-10">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data?.registrationTrends || []}>
                     <defs>
                        <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                           <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                     <XAxis dataKey="name" stroke="#4b5563" fontSize={9} tickLine={false} axisLine={false} />
                     <YAxis stroke="#4b5563" fontSize={9} tickLine={false} axisLine={false} />
                     <Tooltip 
                        contentStyle={{ backgroundColor: '#0c0c0c', border: '1px solid #1f2937', borderRadius: '12px' }}
                        itemStyle={{ fontSize: '9px', fontWeight: 'bold', textTransform: 'uppercase' }}
                     />
                     <Area type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorUsers)" />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-2 gap-6 border-t border-white/[0.03] pt-6">
               <div className="flex items-center space-x-4 text-left">
                  <div className="w-1 h-8 bg-blue-500 rounded-full shadow-md" />
                  <div className="flex flex-col">
                     <span className="text-xl font-black text-white italic tracking-tighter">2,450</span>
                     <span className="text-[8px] font-black text-gray-800 uppercase tracking-widest flex items-center italic">
                        Users Joined <ArrowUpRight className="ml-1 w-3 h-3 text-blue-500" />
                     </span>
                  </div>
               </div>
                <div className="flex items-center space-x-4 text-left">
                  <div className="w-1 h-8 bg-blue-300 rounded-full" />
                  <div className="flex flex-col">
                     <span className="text-xl font-black text-white italic tracking-tighter">612</span>
                     <span className="text-[8px] font-black text-gray-800 uppercase tracking-widest flex items-center italic">
                        Teams Formed <ArrowUpRight className="ml-1 w-3 h-3 text-blue-500" />
                     </span>
                  </div>
               </div>
            </div>
         </div>

         {/* Distribution */}
         <div className="bg-[#0c0c0c] border border-white/5 rounded-2xl p-6 flex flex-col justify-between group overflow-hidden relative shadow-xl text-left">
            <div className="space-y-1 mb-8 text-left">
               <h3 className="text-lg font-black italic uppercase tracking-tighter text-white flex items-center">
                  <PieChartIcon className="w-4 h-4 mr-2 text-blue-500" />
                  User <span className="text-blue-500 ml-2">Roles</span>
               </h3>
               <p className="text-[9px] text-gray-800 font-black uppercase tracking-widest italic">Participant demographics</p>
            </div>
            
            <div className="h-48 relative z-10 flex items-center justify-center">
               <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                     <Pie
                        data={data?.engagementDistribution || []}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={75}
                        paddingAngle={8}
                        dataKey="value"
                     >
                        {data?.engagementDistribution.map((entry: any, index: number) => (
                           <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                        ))}
                     </Pie>
                     <Tooltip contentStyle={{ backgroundColor: '#0c0c0c', border: '1px solid #1f2937', borderRadius: '12px' }} />
                  </PieChart>
               </ResponsiveContainer>
               <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-2xl font-black text-white italic tracking-tighter">100%</span>
                  <span className="text-[7px] font-black text-gray-800 uppercase tracking-widest italic">Sync</span>
               </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-8">
               {data?.engagementDistribution.map((r: any) => (
                 <div key={r.name} className="flex flex-col bg-white/[0.02] border border-white/5 p-3 rounded-xl group/row hover:bg-blue-600/[0.02] transition-all text-left">
                    <div className="flex items-center space-x-2 mb-1">
                       <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: r.color }} />
                       <span className="text-[8px] font-black text-gray-700 uppercase italic group-hover/row:text-white transition-colors">{r.name}</span>
                    </div>
                    <span className="text-lg font-black text-white italic tracking-tighter">{r.value}%</span>
                 </div>
               ))}
            </div>
         </div>
      </div>

      {/* Secondary Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-left">
         {/* Traffic */}
         <section className="bg-[#0c0c0c] border border-white/5 rounded-2xl p-6 space-y-6 relative group overflow-hidden text-left shadow-xl">
            <div className="space-y-1 text-left">
               <h3 className="text-lg font-black italic uppercase tracking-tighter text-white flex items-center">
                  <Globe className="w-4 h-4 mr-2 text-blue-500" />
                  Traffic <span className="text-blue-500 ml-2">Origins</span>
               </h3>
               <p className="text-[9px] text-gray-800 font-black uppercase tracking-widest italic">Where users come from</p>
            </div>
            <div className="h-48 w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data?.trafficSources || []} layout="vertical">
                     <XAxis type="number" hide />
                     <YAxis dataKey="name" type="category" stroke="#4b5563" fontSize={9} width={90} tickLine={false} axisLine={false} />
                     <Tooltip contentStyle={{ backgroundColor: '#0c0c0c', border: '1px solid #1f2937', borderRadius: '12px' }} />
                     <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                        {data?.trafficSources.map((entry: any, index: number) => (
                           <Cell key={`cell-${index}`} fill={index === 0 ? '#3b82f6' : '#111827'} />
                        ))}
                     </Bar>
                  </BarChart>
               </ResponsiveContainer>
            </div>
            <div className="flex items-center space-x-4 text-left border-t border-white/[0.03] pt-6">
               <Info className="w-4 h-4 text-blue-500" />
               <p className="text-[10px] font-bold text-gray-700 uppercase tracking-widest leading-relaxed italic max-w-sm">
                  Most users are coming from social media links.
               </p>
            </div>
         </section>

         {/* Funnel */}
         <section className="bg-white/[0.01] border border-white/5 rounded-2xl p-6 space-y-6 relative group overflow-hidden text-left shadow-xl">
            <div className="space-y-1 text-left">
               <h3 className="text-lg font-black italic uppercase tracking-tighter text-white flex items-center">
                  <Layers className="w-4 h-4 mr-2 text-blue-500" />
                  User <span className="text-blue-500 ml-2">Funnel</span>
               </h3>
               <p className="text-[9px] text-gray-800 font-black uppercase tracking-widest italic">User journey drop-off rates</p>
            </div>
            <div className="space-y-6 pr-2">
               {data?.dropoffMatrix.map((step: any, i: number) => (
                  <div key={step.step} className="space-y-2">
                     <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest italic">
                        <span className="text-white group-hover:text-blue-500 transition-colors">{step.step}</span>
                        <span className="text-blue-500">{step.value}%</span>
                     </div>
                     <div className="w-full h-1.5 bg-white/[0.03] rounded-full overflow-hidden">
                        <motion.div 
                           initial={{ width: 0 }}
                           animate={{ width: `${step.value}%` }}
                           transition={{ duration: 1, delay: i * 0.1 }}
                           className={cn(
                               "h-full rounded-full bg-blue-600",
                               i === 3 ? "opacity-30" : "opacity-100"
                           )} 
                        />
                     </div>
                  </div>
               ))}
            </div>
            <div className="flex items-center justify-between pt-6 border-t border-white/[0.03]">
               <span className="text-[8px] font-black text-gray-800 uppercase tracking-widest italic">Conversion rate is normal.</span>
               <button className="text-[9px] font-black uppercase tracking-widest text-gray-700 hover:text-white transition-all italic underline underline-offset-4 decoration-white/10">Full Audit</button>
            </div>
         </section>
      </div>

      {/* Projections */}
      <section className="bg-blue-600/5 border border-blue-600/10 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-8 group relative overflow-hidden text-left shadow-2xl">
         <div className="absolute top-0 right-0 p-8 opacity-[0.02] pointer-events-none">
            <Target className="w-60 h-60 text-blue-500" />
         </div>
         <div className="relative z-10 space-y-2 text-left">
            <h3 className="text-xl font-black italic uppercase tracking-tighter text-white">Projected <span className="text-blue-500">Growth</span></h3>
            <p className="text-[11px] font-bold text-gray-800 uppercase tracking-widest leading-relaxed max-w-2xl italic">
               Registrations are expected to grow by <span className="text-blue-500 font-extrabold">+42%</span> next week. Your infrastructure is prepared for this increase.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
               {['Scaling: Active', 'System: Stable', 'Sync: 100%'].map((tag, i) => (
                  <span key={i} className="px-3 py-1 bg-blue-600/10 border border-blue-600/20 text-blue-500 text-[8px] font-black uppercase tracking-widest italic rounded-lg">{tag}</span>
               ))}
            </div>
         </div>
         <div className="relative z-10 shrink-0 w-full md:w-auto">
            <button className="w-full md:w-auto px-10 py-4 bg-[#0c0c0c] border border-white/10 text-white text-[10px] font-black uppercase tracking-widest italic rounded-xl hover:border-blue-500/20 transition-all shadow-lg shadow-black/50">
               Deep Audit
            </button>
         </div>
      </section>
    </div>
  );
}
