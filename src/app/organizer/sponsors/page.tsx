'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BadgeDollarSign, 
  Search, 
  Plus, 
  Building2, 
  Target, 
  Layers, 
  Globe, 
  Zap, 
  Activity, 
  MoreVertical, 
  ChevronRight, 
  ShieldCheck, 
  Award, 
  CreditCard, 
  Loader2, 
  Filter,
  Trash2,
  Edit3,
  Eye,
  CheckCircle2,
  Lock,
  MessageSquare,
  Settings
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function SponsorsCluster() {
  const [loading, setLoading] = useState(true);
  const [sponsors, setSponsors] = useState<any[]>([]);

  useEffect(() => {
    // Simulated fetch for sponsor node registry
    setTimeout(() => {
      setSponsors([
        { id: 1, name: 'Google Cloud', tier: 'Title', amount: 50000, status: 'active', booths: 2, contacts: 3 },
        { id: 2, name: 'Stripe', tier: 'Gold', amount: 25000, status: 'active', booths: 1, contacts: 2 },
        { id: 3, name: 'GitHub', tier: 'Silver', amount: 10000, status: 'pending', booths: 0, contacts: 1 },
        { id: 4, name: 'DigitalOcean', tier: 'Bronze', amount: 5000, status: 'active', booths: 1, contacts: 1 },
      ]);
      setLoading(false);
    }, 1200);
  }, []);

  const StatusBadge = ({ status }: { status: string }) => {
    const styles: any = {
      active: "bg-blue-500/10 border-blue-500/20 text-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.1)]",
      pending: "bg-amber-500/10 border-amber-500/20 text-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.1)]",
    };
    return (
      <div className={cn("px-3 py-1 rounded-full border text-[9px] font-black uppercase tracking-widest flex items-center italic", styles[status])}>
         <div className={cn("w-1.5 h-1.5 rounded-full mr-2", status === 'active' ? "bg-blue-500" : "bg-amber-500 animate-pulse")} />
         {status}
      </div>
    );
  };

  if (loading) {
     return (
       <div className="flex flex-col items-center justify-center h-[60vh] space-y-6 text-center">
          <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-700 italic">Syncing Sponsor Ecosystem...</p>
       </div>
     );
  }

  return (
    <div className="space-y-12 pb-20 text-left">
      {/* Sponsor Context Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between items-start gap-8 border-b border-white/[0.03] pb-10">
         <div className="space-y-3 text-left">
            <div className="flex items-center space-x-2">
               <BadgeDollarSign className="w-4 h-4 text-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.3)]" />
               <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-700 italic underline underline-offset-4 decoration-blue-500/20">Sector: Global Sponsor & Partner Ecosystem</span>
            </div>
            <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white">Sponsors <span className="text-blue-500">Cluster</span></h1>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest italic max-w-lg leading-relaxed">
               Execute partner engagement protocols, audit tier sponsorship nodes, and manage brand visibility clusters across the platform hierarchy.
            </p>
         </div>

         <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-3 px-8 py-4 bg-white/5 border border-white/10 text-gray-400 hover:text-white rounded-xl transition-all shadow-xl group">
               <Layers className="w-4 h-4 text-blue-500" />
               <span className="text-[11px] font-black uppercase tracking-widest italic font-bold">Manage Tiers</span>
            </button>
            <button className="flex items-center space-x-3 px-10 py-4 bg-blue-600 text-white rounded-xl shadow-[0_0_30px_rgba(59,130,246,0.2)] hover:bg-blue-500 transition-all active:scale-95 group">
                <Plus className="w-4 h-4" />
                <span className="text-[11px] font-black uppercase tracking-widest italic font-bold">Onboard New Node</span>
            </button>
         </div>
      </header>

      {/* Control Interlink: Sponsor Search/Filter */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
         <div className="relative w-full md:w-[450px] group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-700 group-focus-within:text-blue-500 transition-colors" />
            <input 
               type="text" 
               placeholder="Query partner nodes by brand or tier hash..." 
               className="w-full bg-[#0c0c0c] border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-xs text-gray-300 placeholder-gray-800 focus:outline-none focus:border-white/10 transition-all font-medium italic"
            />
         </div>
         <div className="bg-[#0c0c0c] border border-white/5 p-1.5 rounded-2xl flex items-center w-full md:w-auto overflow-x-auto scrollbar-hide">
            {[
              { id: 'all', label: 'All Ecosystem Participants' },
              { id: 'title', label: 'Title Partners' },
              { id: 'active', label: 'Verified Nodes' },
              { id: 'pending', label: 'Under Review' }
            ].map((tab) => (
              <button 
                key={tab.id}
                className={cn(
                   "whitespace-nowrap px-6 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all italic",
                   tab.id === 'all' ? "bg-blue-600/10 border border-blue-600/20 text-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.1)]" : "text-gray-600 hover:text-gray-400"
                )}
              >
                  {tab.label}
              </button>
            ))}
         </div>
      </div>

      {/* Main Sponsor Hub matrix cluster */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
         {sponsors.map((s, i) => (
            <motion.div 
               key={s.id}
               initial={{ opacity: 0, scale: 0.98 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: i * 0.1 }}
               className="bg-[#0c0c0c] border border-white/5 rounded-[32px] overflow-hidden group hover:border-white/10 transition-all flex flex-col h-full text-left"
            >
               <div className="p-8 space-y-8 flex-1">
                  <div className="flex items-start justify-between">
                     <div className={cn(
                        "w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center shrink-0 group-hover:border-blue-500/20 transition-all text-blue-500"
                     )}>
                        <Building2 className="w-6 h-6" />
                     </div>
                     <StatusBadge status={s.status} />
                  </div>
                  
                  <div className="space-y-4">
                     <h3 className="text-xl font-black text-white italic uppercase tracking-tighter leading-none group-hover:text-blue-500 transition-colors">
                        {s.name}
                     </h3>
                     <div className="flex items-center space-x-2 text-[9px] font-black uppercase tracking-widest text-gray-600 italic">
                        <Award className="w-3.5 h-3.5 text-blue-500" />
                        <span>Tier Node: {s.tier} Status</span>
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="bg-white/[0.02] border border-white/5 p-4 rounded-xl flex flex-col items-center justify-center space-y-1">
                         <span className="text-[12px] font-black text-white italic">{s.booths} <span className="text-[8px] text-gray-700">MODS</span></span>
                         <span className="text-[8px] font-bold text-gray-700 uppercase tracking-widest leading-none">Global Booths</span>
                      </div>
                      <div className="bg-white/[0.02] border border-white/5 p-4 rounded-xl flex flex-col items-center justify-center space-y-1">
                         <span className="text-[12px] font-black text-white italic">{s.contacts} <span className="text-[8px] text-gray-700">NODES</span></span>
                         <span className="text-[8px] font-bold text-gray-700 uppercase tracking-widest leading-none">Active Ops</span>
                      </div>
                  </div>
               </div>

               <div className="px-8 pb-8 pt-4 flex items-center justify-between border-t border-white/[0.03]">
                  <div className="flex items-center space-x-2 text-gray-700">
                     <CreditCard className="w-3.5 h-3.5" />
                     <span className="text-[9px] font-black uppercase tracking-widest italic text-white">$ {(s.amount / 1000).toFixed(0)}k <span className="text-gray-800">::</span> Commitment</span>
                  </div>
                  <div className="flex items-center space-x-3 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                     <button className="p-2.5 bg-blue-600/10 border border-blue-600/20 rounded-xl text-blue-500 hover:bg-blue-600 hover:text-white transition-all shadow-xl" title="Manage Visibility"><Eye className="w-4 h-4" /></button>
                     <button className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-gray-600 hover:text-white transition-all hover:text-blue-500 hover:border-blue-500/20 shadow-md" title="Message Partner Nodes"><MessageSquare className="w-4 h-4" /></button>
                  </div>
               </div>
            </motion.div>
         ))}

         {/* Initiate Partnership Protocol Tile */}
         <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="border-2 border-dashed border-white/5 rounded-[32px] flex flex-col items-center justify-center p-12 group cursor-pointer hover:border-blue-600/30 transition-all text-center space-y-6 bg-white/[0.01]"
         >
            <div className="w-16 h-16 rounded-3xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:bg-blue-600/10 group-hover:border-blue-600/20 transition-all">
               <Plus className="w-8 h-8 text-gray-700 group-hover:text-blue-500" />
            </div>
            <div className="space-y-2 text-center">
               <span className="text-xl font-black text-gray-700 uppercase italic group-hover:text-white transition-colors">Start Engagement protocol</span>
               <p className="text-[9px] font-bold text-gray-800 uppercase tracking-widest leading-relaxed">Execute new partnership node across all platform segments.</p>
            </div>
         </motion.div>
      </div>

      {/* Advanced Global Sponsorship Hub Ops */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left">
         {/* Sponsor Tier matrix Node */}
         <section className="bg-blue-600/5 border border-blue-600/10 rounded-[40px] p-10 space-y-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none group-hover:rotate-12 transition-transform duration-1000">
               <Layers className="w-40 h-40 text-blue-500" />
            </div>
            <div className="relative z-10 space-y-2 text-left">
               <h3 className="text-2xl font-black italic uppercase tracking-tighter text-white">Structural <span className="text-blue-500">Tier Matrix</span></h3>
               <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest italic">Configure partnership hierarchy logic.</p>
            </div>
            <div className="bg-[#050505] p-6 rounded-3xl border border-white/5 space-y-4 shadow-inner relative z-10">
               {[
                  { tier: 'Title Layer', price: '$50k', benefit: 'Branding Max', limit: 1 },
                  { tier: 'Gold Node', price: '$25k', benefit: 'Cluster Booth', limit: 3 },
                  { tier: 'Silver Registry', price: '$10k', benefit: 'Logo Sync', limit: 10 }
               ].map((t, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-white/[0.03] rounded-2xl border border-white/5 group/row">
                     <div className="flex flex-col text-left">
                        <span className="text-[11px] font-black text-white italic uppercase group-hover/row:text-blue-500 transition-colors">{t.tier}</span>
                        <span className="text-[9px] font-bold text-gray-700 uppercase tracking-widest mt-1">Benefit: {t.benefit}</span>
                     </div>
                     <div className="flex items-center space-x-6">
                        <span className="text-[10px] font-black text-blue-500 italic">{t.price}</span>
                        <Settings className="w-4 h-4 text-gray-800 hover:text-white transition-colors cursor-pointer" />
                     </div>
                  </div>
               ))}
            </div>
            <button className="relative z-10 w-full py-4 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest italic rounded-2xl hover:bg-blue-500 transition-all shadow-xl shadow-blue-900/20">
               Execute Global Tier Protocol
            </button>
         </section>

         {/* Visibility & Branding Controls */}
         <section className="bg-blue-600/5 border border-blue-600/10 rounded-[40px] p-10 space-y-10 relative overflow-hidden group text-left">
            <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none group-hover:scale-125 transition-transform duration-1000">
               <Globe className="w-40 h-40 text-blue-500" />
            </div>
            <div className="relative z-10 space-y-2 text-left">
               <h3 className="text-2xl font-black italic uppercase tracking-tighter text-white">Global <span className="text-blue-500">Brand Visibility</span></h3>
               <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest italic">Manage partner hub visibility matrix.</p>
            </div>
            <div className="space-y-6 relative z-10 text-left">
               <div className="p-6 bg-[#090909] border border-white/5 rounded-3xl flex items-center justify-between group/inner">
                  <div className="flex flex-col text-left">
                     <span className="text-[10px] font-black text-gray-600 uppercase italic">Live Partner Feed Sync</span>
                     <span className="text-[8px] font-bold text-gray-800 uppercase tracking-widest mt-1">Nodes 1-12 active on global layer</span>
                  </div>
                  <div className="flex items-center space-x-3">
                     <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                     <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">ENABLED</span>
                  </div>
               </div>
               
               <p className="text-[11px] font-bold text-gray-700 uppercase tracking-tighter leading-relaxed italic max-w-sm">
                  Partner visibility controls allow you to instantly toggle brand presence across all solution nodes and global telemetry feeds.
               </p>
               
               <div className="grid grid-cols-2 gap-4">
                   <button className="py-3 px-6 bg-white/5 border border-white/10 text-gray-400 text-[9px] font-black uppercase tracking-widest italic rounded-xl hover:text-white transition-all hover:border-blue-500/20 hover:text-blue-500">Audit Booths</button>
                   <button className="py-3 px-6 bg-white/5 border border-white/10 text-gray-400 text-[9px] font-black uppercase tracking-widest italic rounded-xl hover:text-white transition-all hover:border-blue-500/20 hover:text-blue-500">Sync Banners</button>
               </div>
            </div>
         </section>
      </div>

      {/* Critical Partnership Audit Indicator */}
      <section className="bg-blue-600/5 border border-blue-600/10 rounded-[40px] p-10 flex flex-col md:flex-row items-center justify-between gap-10 group relative overflow-hidden text-left shadow-2xl">
         <div className="absolute top-0 right-10 -mt-20 opacity-[0.03] group-hover:rotate-12 transition-transform duration-1000">
            <CheckCircle2 className="w-96 h-96 text-blue-500" />
         </div>
         <div className="relative z-10 space-y-4 text-left">
            <h3 className="text-2xl font-black italic uppercase tracking-tighter text-white">Sponsor <span className="text-blue-500">Asset Sync Integrity</span></h3>
            <p className="text-[12px] font-bold text-gray-600 uppercase tracking-widest leading-relaxed max-w-2xl italic">
                All sponsorship assets (Logos, Booth Mods, Banners) have been <span className="text-white font-extrabold">verified across Layer 2 nodes</span>. Current partner ecosystem health is optimal at <span className="text-blue-500 font-extrabold">100% sync rate</span>.
            </p>
         </div>
         <div className="relative z-10 w-full md:w-auto flex items-center space-x-6">
             <button className="w-full md:w-auto px-12 py-5 bg-[#0c0c0c] border border-white/10 text-white text-[11px] font-black uppercase tracking-widest italic rounded-2xl hover:border-blue-500/40 hover:bg-white/[0.01] transition-all shadow-3xl">
                Execute Global Asset Audit
             </button>
         </div>
      </section>
    </div>
  );
}
