'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Brush, 
  Globe, 
  Palette, 
  Type, 
  Layout, 
  Mail, 
  Smartphone, 
  Monitor, 
  Save, 
  RotateCcw, 
  Plus, 
  Eye, 
  ChevronRight, 
  Loader2,
  CheckCircle2,
  Lock,
  Zap,
  ShieldCheck,
  Settings,
  MoreVertical
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function BrandingHub() {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'theme' | 'domain' | 'templates'>('theme');

  return (
    <div className="space-y-12 pb-20 text-left">
      {/* Branding Context Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between items-start gap-8 border-b border-white/[0.03] pb-10">
         <div className="space-y-3">
            <div className="flex items-center space-x-2">
               <Brush className="w-4 h-4 text-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.3)]" />
               <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-700 italic underline underline-offset-4 decoration-blue-500/20">Sector: Global Brand & Identity Controller</span>
            </div>
            <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white">Identity <span className="text-blue-500">Hub</span></h1>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest italic max-w-lg leading-relaxed">
               Execute theme customization protocols, manage domain clusters, and audit email visual nodes across all event clusters.
            </p>
         </div>

         <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-3 px-8 py-4 bg-white/5 border border-white/10 text-gray-400 hover:text-white rounded-xl transition-all shadow-xl group">
               <RotateCcw className="w-4 h-4 text-blue-500 group-hover:rotate-180 transition-transform duration-700" />
               <span className="text-[11px] font-black uppercase tracking-widest italic font-bold">Resync Defaults</span>
            </button>
            <button className="flex items-center space-x-3 px-10 py-4 bg-blue-600 text-white rounded-xl shadow-[0_0_30px_rgba(59,130,246,0.2)] hover:bg-blue-500 transition-all active:scale-95 group">
                <Save className="w-4 h-4" />
                <span className="text-[11px] font-black uppercase tracking-widest italic font-bold">Apply Variations Global</span>
            </button>
         </div>
      </header>

      {/* Control Interlink: Identity Module Switching */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
         <div className="bg-[#0c0c0c] border border-white/5 p-1.5 rounded-2xl flex items-center w-full md:w-auto overflow-x-auto scrollbar-hide">
            {[
              { id: 'theme', label: 'Theme Matrix', icon: Palette },
              { id: 'domain', label: 'Domain Cluster', icon: Globe },
              { id: 'templates', label: 'Mail Templates', icon: Mail }
            ].map((tab) => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                   "whitespace-nowrap flex items-center px-8 py-4 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all italic space-x-3 group",
                   activeTab === tab.id ? "bg-blue-600/10 border border-blue-600/20 text-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.1)]" : "text-gray-600 hover:text-gray-400"
                )}
              >
                   <tab.icon className={cn("w-4 h-4 transition-transform group-hover:scale-110", activeTab === tab.id ? "text-blue-500" : "")} />
                   <span>{tab.label}</span>
              </button>
            ))}
         </div>
         <div className="flex items-center space-x-2 bg-[#0c0c0c] border border-white/5 p-1 rounded-xl">
             <button className="p-3 bg-white/5 rounded-lg text-white"><Monitor className="w-4 h-4" /></button>
             <button className="p-3 text-gray-700 hover:text-white transition-all"><Smartphone className="w-4 h-4" /></button>
         </div>
      </div>

      {/* Main Structural Hub matrix cluster */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left">
         {/* Theme Parameters Control */}
         <div className="bg-[#0c0c0c] border border-white/5 rounded-[40px] p-10 space-y-10 lg:col-span-1 relative overflow-hidden group h-fit">
            <div className="space-y-1 text-left">
               <h3 className="text-xl font-black italic uppercase tracking-tighter text-white flex items-center">
                  <Palette className="w-5 h-5 mr-3 text-blue-500" />
                  Primary <span className="text-gray-500 ml-2">DNA</span>
               </h3>
               <p className="text-[10px] text-gray-700 font-bold uppercase tracking-widest">Global Color & Style Attributes</p>
            </div>
            
            <div className="space-y-8 relative z-10">
               <div className="space-y-4">
                  <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest italic block">Accent Signal Node</span>
                  <div className="flex flex-wrap gap-4">
                     {['#3b82f6', '#10b981', '#ef4444', '#a855f7'].map((c) => (
                       <div key={c} className="w-10 h-10 rounded-xl border-2 border-transparent hover:border-white transition-all cursor-pointer shadow-xl" style={{ backgroundColor: c }} />
                     ))}
                     <div className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-gray-600 hover:text-white transition-all cursor-pointer"><Plus className="w-4 h-4" /></div>
                  </div>
               </div>
               
               <div className="space-y-4">
                  <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest italic block">Font Typography Hub</span>
                  <div className="space-y-3">
                     {[
                        { name: 'Inter Display', font: 'sans-serif', active: true },
                        { name: 'JetBrains Mono', font: 'monospace', active: false },
                        { name: 'Outfit Black', font: 'cursive', active: false }
                     ].map((f, i) => (
                       <div key={i} className={cn("p-4 rounded-2xl border flex items-center justify-between transition-all cursor-pointer group/font", f.active ? "bg-blue-600/10 border-blue-600/20 text-white" : "bg-[#090909] border-white/5 text-gray-700 hover:text-gray-400")}>
                          <span className="text-[11px] font-black uppercase italic" style={{ fontFamily: f.font }}>{f.name}</span>
                          {f.active && <CheckCircle2 className="w-4 h-4 text-blue-500" />}
                       </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>

         {/* Visual Preview Node */}
         <div className="bg-[#0c0c0c] border border-white/5 rounded-[40px] p-10 flex flex-col items-center justify-center space-y-10 lg:col-span-2 relative group overflow-hidden border-dashed">
            <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-1000">
               <Layout className="w-64 h-64 text-blue-500" />
            </div>
            <div className="relative z-10 text-center space-y-4 max-w-lg">
               <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-[24px] flex items-center justify-center mx-auto mb-6 group-hover:border-blue-500/30 transition-all overflow-hidden p-2 shadow-inner">
                  <div className="w-full h-full bg-blue-600 rounded-[18px] flex items-center justify-center text-white"><Zap className="w-6 h-6" /></div>
               </div>
               <h3 className="text-3xl font-black italic uppercase tracking-tighter text-white">Live <span className="text-blue-500">Node Preview</span></h3>
               <p className="text-[12px] font-bold text-gray-700 uppercase tracking-widest leading-relaxed italic">
                  Synchronization active. All modifications to the branding DNA will propagate to the global end-user registry instantly upon execution.
               </p>
            </div>
            <div className="relative z-10 w-full bg-[#050505] p-1 rounded-3xl border border-white/5 shadow-3xl overflow-hidden aspect-video group/preview">
               <div className="w-full h-full bg-[#080808] p-8 flex flex-col justify-between text-left">
                  <div className="flex justify-between items-center mb-8">
                     <div className="w-20 h-4 bg-blue-600/20 rounded-md" />
                     <div className="flex space-x-4">
                        <div className="w-4 h-4 bg-white/5 rounded-full" />
                        <div className="w-4 h-4 bg-white/5 rounded-full" />
                     </div>
                  </div>
                  <div className="space-y-4">
                     <div className="h-4 w-3/4 bg-white/5 rounded-full" />
                     <div className="h-4 w-1/2 bg-white/5 rounded-full" />
                  </div>
                  <div className="mt-8 flex space-x-4">
                     <div className="h-10 w-32 bg-blue-600 rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.2)]" />
                     <div className="h-10 w-32 bg-white/5 rounded-xl border border-white/10" />
                  </div>
               </div>
               <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/5 to-transparent opacity-0 group-hover/preview:opacity-100 transition-opacity" />
            </div>
         </div>
      </div>

      {/* Advanced Domain Cluster Ops */}
      <section className="bg-blue-600/5 border border-blue-600/10 rounded-[40px] p-12 flex flex-col md:flex-row items-center justify-between gap-12 group relative overflow-hidden text-left shadow-2xl">
         <div className="absolute top-0 right-10 -mt-20 opacity-[0.03] group-hover:rotate-12 transition-transform duration-1000">
            <Globe className="w-96 h-96 text-blue-500" />
         </div>
         <div className="relative z-10 space-y-6 flex-1 text-left">
            <h3 className="text-3xl font-black italic uppercase tracking-tighter text-white">Domain <span className="text-blue-500">Synchronization Hub</span></h3>
            <p className="text-[12px] font-bold text-gray-700 uppercase tracking-widest leading-relaxed max-w-2xl italic">
                Secure SSL Layer 4 enabled. Point your custom A/CNAME records to the global load balancer nodes at <span className="text-blue-500 font-extrabold underline underline-offset-4 decoration-blue-500/20">LB_PRIMARY_01</span>. All branding nodes will route through this identity cluster.
            </p>
            <div className="bg-[#0c0c0c] border border-white/5 p-6 rounded-3xl flex items-center justify-between">
               <div className="flex flex-col text-left">
                  <span className="text-[12px] font-black text-white italic">hack.yourdomain.com</span>
                  <span className="text-[8px] font-bold text-gray-700 uppercase tracking-widest mt-1">Registry Alignment Status: 100% Correct</span>
               </div>
               <div className="flex items-center space-x-3">
                  <span className="text-[9px] font-black text-emerald-500 uppercase italic">ACTIVE</span>
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
               </div>
            </div>
         </div>
         <div className="relative z-10 shrink-0 w-full md:w-auto">
            <button className="w-full md:w-auto px-12 py-5 bg-[#0c0c0c] border border-white/10 text-white text-[11px] font-black uppercase tracking-widest italic rounded-2xl hover:border-blue-500/40 hover:bg-white/[0.02] transition-all shadow-3xl">
               Update Domain Map
            </button>
         </div>
      </section>
    </div>
  );
}
