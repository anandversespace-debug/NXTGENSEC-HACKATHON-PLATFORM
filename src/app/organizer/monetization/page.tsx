'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wallet, 
  Search, 
  ArrowUpRight, 
  ArrowDownRight, 
  Download, 
  Filter, 
  CreditCard, 
  Building2, 
  Zap, 
  Clock, 
  Activity, 
  PieChart as PieChartIcon, 
  Target,
  Loader2,
  ChevronRight,
  Info,
  DollarSign,
  TrendingUp,
  Settings,
  MoreVertical,
  CheckCircle2,
  ShieldCheck,
  Globe,
  MoreHorizontal,
  History
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
  Area
} from 'recharts';

export default function MonetizationHub() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    // Simulated fetch for financial telemetry
    setTimeout(() => {
      setData({
        revenueTimeline: [
          { name: 'JAN', value: 4200 },
          { name: 'FEB', value: 5800 },
          { name: 'MAR', value: 8200 },
          { name: 'APR', value: 12540 },
          { name: 'MAY', value: 15400 },
          { name: 'JUN', value: 24500 },
        ],
        recentTransactions: [
          { id: 1, type: 'Sponsorship', source: 'Cyberdyne Systems', amount: 5000, status: 'verified', time: '1h ago' },
          { id: 2, type: 'Registration', source: 'alex_dev', amount: 25, status: 'verified', time: '2h ago' },
          { id: 3, type: 'Payout', source: 'Stripe_Connect', amount: -1200, status: 'processing', time: '4h ago' },
          { id: 4, type: 'Refund', source: 'jordan_pk', amount: -25, status: 'warning', time: '1d ago' },
        ]
      });
      setLoading(false);
    }, 1500);
  }, []);

  const StatusBadge = ({ status }: { status: string }) => {
    const styles: any = {
      verified: "bg-blue-600/10 border-blue-600/20 text-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.1)]",
      processing: "bg-blue-500/10 border-blue-500/20 text-blue-400",
      warning: "bg-red-500/10 border-red-500/20 text-red-500",
    };
    return (
      <div className={cn("px-4 py-1.5 rounded-full border text-[9px] font-black uppercase tracking-widest flex items-center italic transition-all", styles[status])}>
         <div className={cn("w-1.5 h-1.5 rounded-full mr-2.5", status === 'verified' ? "bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.6)]" : status === 'processing' ? "bg-blue-400" : "bg-red-500")} />
         {status}
      </div>
    );
  };

  if (loading) {
     return (
       <div className="flex flex-col items-center justify-center h-[60vh] space-y-6 text-center">
          <Loader2 className="w-12 h-12 text-blue-500 animate-spin shadow-[0_0_20px_rgba(59,130,246,0.2)]" />
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-700 italic">Syncing Financial Ledger Hub...</p>
       </div>
     );
  }

  return (
    <div className="space-y-12 pb-20 text-left">
      {/* Financial Context Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between items-start gap-8 border-b border-white/[0.03] pb-10">
         <div className="space-y-4 text-left">
            <div className="flex items-center space-x-2">
               <Wallet className="w-4.5 h-4.5 text-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.3)]" />
               <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-700 italic underline underline-offset-4 decoration-blue-500/20">Sector: Global Financial & Revenue Governance HUB</span>
            </div>
            <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white">Revenue <span className="text-blue-500">Node Hub</span></h1>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest italic max-w-lg leading-relaxed">
               Audit global revenue streams, execute payout protocols, and generate financial intelligence reports across all platform sponsorship organizational clusters.
            </p>
         </div>

         <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-3 px-8 py-5 bg-[#0c0c0c] border border-white/5 rounded-2xl text-[11px] font-black uppercase tracking-widest italic text-gray-400 hover:text-white hover:border-blue-500/30 transition-all shadow-xl group">
                <Settings className="w-4.5 h-4.5 text-gray-600 group-hover:text-blue-500 transition-colors" />
                <span>Configure Payout Nodes</span>
            </button>
            <button className="flex items-center space-x-3 px-12 py-5 bg-blue-600 text-white rounded-2xl shadow-2xl shadow-blue-500/20 hover:bg-blue-500 transition-all active:scale-95 group">
                <Download className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="text-[11px] font-black uppercase tracking-widest italic font-bold">Export Ledger Master Node</span>
            </button>
         </div>
      </header>

      {/* Financial High-Intensity Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
         {[
            { label: 'Cumulative Revenue', value: '$125.4k', icon: DollarSign, trend: '+42%', color: 'blue' },
            { label: 'Pending Payouts', value: '$12.2k', icon: CreditCard, trend: '-5%', color: 'blue' },
            { label: 'Sponsorship Injected', value: '$85.0k', icon: Building2, trend: '+12%', color: 'blue' },
            { label: 'Burn Rate Cluster', value: '$4.2k/mo', icon: Activity, trend: 'Stable', color: 'blue' },
         ].map((card, i) => (
            <motion.div 
               key={i}
               initial={{ opacity: 0, scale: 0.98 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: i * 0.05 }}
               className="bg-[#0c0c0c] border border-white/5 p-10 rounded-[40px] hover:border-blue-500/30 transition-all relative overflow-hidden group shadow-2xl"
            >
               <div className="relative z-10 flex items-center justify-between mb-8">
                  <div className={cn(
                     "w-12 h-12 rounded-2xl flex items-center justify-center border transition-all group-hover:scale-110 shadow-lg bg-blue-600/10 border-blue-600/20 text-blue-500 shadow-blue-500/10"
                  )}>
                     <card.icon className="w-6 h-6" />
                  </div>
                  <MoreHorizontal className="w-5.5 h-5.5 text-gray-800" />
               </div>
               <div className="relative z-10 space-y-2 text-left">
                  <p className="text-[11px] font-black text-gray-700 uppercase tracking-widest italic underline underline-offset-4 decoration-blue-500/10">{card.label}</p>
                  <p className="text-4xl font-black italic uppercase tracking-tighter text-white group-hover:text-blue-500 transition-colors">{card.value}</p>
               </div>
               <div className="mt-8 flex items-center space-x-3 relative z-10">
                  <div className={cn("px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest italic shadow-md", card.trend.startsWith('+') ? "bg-blue-600/20 text-blue-500" : card.trend.startsWith('-') ? "bg-red-600/20 text-red-500" : "bg-white/5 text-gray-800")}>
                     {card.trend}
                  </div>
                  <span className="text-[9px] font-bold text-gray-800 uppercase tracking-widest italic">Growth Dynamics Profile</span>
               </div>
               <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-white/5 to-transparent transition-all group-hover:via-blue-500/40" />
            </motion.div>
         ))}
      </div>

      {/* Revenue Matrix Intelligence */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left">
         {/* Revenue Timeline Node */}
         <div className="bg-[#0c0c0c] border border-white/5 rounded-[40px] p-10 space-y-12 lg:col-span-2 relative overflow-hidden group shadow-2xl">
            <header className="flex items-center justify-between">
               <div className="space-y-2 text-left">
                  <h3 className="text-2xl font-black italic uppercase tracking-tighter text-white flex items-center">
                     <TrendingUp className="w-6 h-6 mr-4 text-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.3)]" />
                     Monetization <span className="text-blue-500 ml-3 italic">Velocity HUB</span>
                  </h3>
                  <p className="text-[11px] text-gray-700 font-bold uppercase tracking-widest italic">Revenue Accumulation Over 6 Global Platform Cycles</p>
               </div>
               <div className="px-5 py-2 bg-blue-600/5 border border-blue-600/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-blue-400 italic shadow-lg">Unified Fiscal Ledger Protocol</div>
            </header>

            <div className="h-80 w-full relative z-10 p-2">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data?.revenueTimeline || []}>
                     <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                           <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="4 4" stroke="#1f2937" vertical={false} />
                     <XAxis dataKey="name" stroke="#4b5563" fontSize={11} tickLine={false} axisLine={false} tick={{ fontWeight: 900, fontSize: 10 }} />
                     <YAxis stroke="#4b5563" fontSize={11} tickLine={false} axisLine={false} tick={{ fontWeight: 900, fontSize: 10 }} />
                     <Tooltip 
                        contentStyle={{ backgroundColor: '#0c0c0c', border: '1px solid #3b82f633', borderRadius: '24px', boxShadow: '0 0 40px rgba(59,130,246,0.1)' }}
                        itemStyle={{ fontSize: '11px', fontWeight: '900', textTransform: 'uppercase', color: '#3b82f6' }}
                        labelStyle={{ fontSize: '10px', color: '#4b5563', marginBottom: '8px', fontWeight: 900 }}
                     />
                     <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={5} fillOpacity={1} fill="url(#colorRevenue)" />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* Latest Transaction Signal Feed */}
         <div className="bg-[#0c0c0c] border border-white/5 rounded-[40px] p-10 flex flex-col h-full group overflow-hidden relative shadow-2xl text-left">
             <header className="flex items-center justify-between mb-10 border-b border-white/[0.05] pb-8 relative z-10">
               <div className="space-y-2 text-left">
                  <h3 className="text-2xl font-black italic uppercase tracking-tighter text-white">Fiscal <span className="text-blue-500">Intercept HUB</span></h3>
                  <p className="text-[11px] text-gray-700 font-black uppercase tracking-widest italic">Live dynamic transaction telemetry node.</p>
               </div>
               <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-800 group-hover:border-blue-500/40 transition-all cursor-pointer shadow-lg group-hover:scale-110">
                  <History className="w-6 h-6 text-blue-500/50 group-hover:text-blue-500 transition-colors" />
               </div>
            </header>
            <div className="space-y-7 relative z-10 flex-1">
               {data?.recentTransactions.map((tx: any, i: number) => (
                  <motion.div 
                    key={tx.id} 
                    initial={{ opacity: 0, x: -10 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center justify-between p-5 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.05] hover:border-blue-500/20 transition-all group/tx shadow-md cursor-crosshair"
                  >
                     <div className="flex items-center space-x-5">
                        <div className={cn(
                           "w-11 h-11 rounded-xl flex items-center justify-center border shadow-lg transition-all group-hover/tx:scale-110",
                           tx.amount > 0 ? "bg-blue-600/10 border-blue-600/30 text-blue-500" : "bg-red-600/10 border-red-600/30 text-red-500"
                        )}>
                           {tx.amount > 0 ? <ArrowUpRight className="w-6 h-6" /> : <ArrowDownRight className="w-6 h-6" />}
                        </div>
                        <div className="flex flex-col text-left">
                           <span className="text-[11px] font-black text-white italic uppercase tracking-tight group-hover/tx:text-blue-500 transition-colors">{tx.source}</span>
                           <span className="text-[9px] font-bold text-gray-700 uppercase tracking-widest italic">{tx.type} Node Sync</span>
                        </div>
                     </div>
                     <div className="flex flex-col items-end">
                        <span className={cn("text-[14px] font-black italic tracking-tighter", tx.amount > 0 ? "text-blue-500" : "text-white")}>
                           {tx.amount > 0 ? `+ $${tx.amount.toLocaleString()}` : `- $${Math.abs(tx.amount).toLocaleString()}`}
                        </span>
                        <span className="text-[8px] font-mono text-gray-800 uppercase tracking-[0.2em] mt-1">{tx.time}</span>
                     </div>
                  </motion.div>
               ))}
            </div>
            <div className="mt-10 pt-8 border-t border-white/[0.05] text-center relative z-10">
               <button className="text-[11px] font-black uppercase tracking-[0.4em] text-gray-700 hover:text-blue-500 transition-all italic underline underline-offset-8 decoration-blue-500/10 hover:decoration-blue-500/40">View Global Settlement Node Ledger</button>
            </div>
         </div>
      </div>

      {/* Advanced Payout Protocol Control */}
      <section className="bg-blue-600/5 border border-blue-600/10 rounded-[40px] p-15 flex flex-col md:flex-row items-center justify-between gap-15 group relative overflow-hidden text-left shadow-2xl">
         <div className="absolute top-0 right-10 -mt-20 opacity-[0.03] group-hover:rotate-12 transition-transform duration-1000 pointer-events-none">
            <Globe className="w-[500px] h-[500px] text-blue-500" />
         </div>
         <div className="relative z-10 space-y-8 flex-1 text-left">
            <div className="flex items-center space-x-5">
               <ShieldCheck className="w-8 h-8 text-blue-500 animate-pulse" />
               <h3 className="text-3xl font-black italic uppercase tracking-tighter text-white">Payout <span className="text-blue-500">Synchronization Matrix Node</span></h3>
            </div>
            <p className="text-[14px] font-bold text-gray-600 uppercase tracking-widest leading-relaxed max-w-2xl italic">
                Platform protocols indicate <span className="text-blue-500 font-extrabold">$12,240</span> awaiting global synchronization to external banking clusters. All fiscal audit logs must be verified before executing the final distribution sequence.
            </p>
            <div className="flex flex-wrap gap-5 pt-4">
               {['Global Tax Protocol: Active', 'Bank Node Sync: Verified', 'Gateway HUB: Stripe L4'].map((tag, i) => (
                  <span key={i} className="px-6 py-2.5 bg-blue-600/10 border border-blue-600/20 text-blue-500 text-[10px] font-black uppercase tracking-widest italic rounded-2xl shadow-lg border-blue-500/30">{tag}</span>
               ))}
            </div>
         </div>
         <div className="relative z-10 shrink-0 w-full md:w-auto">
            <button className="w-full md:w-auto px-15 py-7 bg-[#0c0c0c] border border-white/10 text-white text-[12px] font-black uppercase tracking-widest italic rounded-2xl hover:border-blue-500/40 hover:bg-blue-600/5 transition-all shadow-3xl active:scale-95 group">
               <Zap className="w-5 h-5 inline-block mr-4 group-hover:scale-125 transition-transform" />
               Execute Settlement Protocol Sequence
            </button>
         </div>
      </section>

      {/* Critical Fiscal Monitoring Alarm */}
      <section className="bg-red-600/5 border border-red-600/10 rounded-[40px] p-12 flex flex-col md:flex-row items-center justify-between gap-12 group relative overflow-hidden text-left shadow-2xl">
         <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:scale-125 transition-transform duration-1000 pointer-events-none">
            <ShieldCheck className="w-64 h-64 text-red-500" />
         </div>
         <div className="relative z-10 space-y-5 text-left">
            <h3 className="text-2xl font-black italic uppercase tracking-tighter text-white text-left">Tactical Refund & <span className="text-red-500">Anomaly Governance Node</span></h3>
            <p className="text-[13px] font-bold text-gray-600 uppercase tracking-tighter leading-relaxed max-w-xl italic">
                Suspected transaction anomaly detected in cluster <span className="text-white font-black underline decoration-red-500/50 underline-offset-4">TX_92K_OMEGA</span>. Initiating an emergency audit will lock all outgoing payout nodes for human verification protocols.
            </p>
         </div>
         <div className="relative z-10 flex items-center space-x-6 w-full md:w-auto">
             <button className="flex-1 md:flex-none px-12 py-5 bg-white/5 border border-white/10 rounded-2xl text-[11px] font-black uppercase tracking-widest italic text-gray-500 hover:text-white transition-all shadow-xl group/btn">
                <History className="w-4 h-4 inline-block mr-3 group-hover/btn:text-blue-500" />
                Registry Audit History
             </button>
             <button className="flex-1 md:flex-none px-12 py-5 bg-red-600 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest italic shadow-2xl shadow-red-900/40 hover:bg-red-500 active:scale-95 transition-all">
                Lock Global Payout Nodes
             </button>
         </div>
      </section>
    </div>
  );
}
