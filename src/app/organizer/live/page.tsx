'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, 
  Megaphone, 
  Clock, 
  Play, 
  Pause, 
  Calendar, 
  Send, 
  List, 
  History, 
  Bell, 
  Timer, 
  Zap,
  MoreVertical,
  Loader2,
  AlertTriangle,
  Monitor,
  CheckCircle2,
  ShieldAlert,
  Loader
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function LiveControlCenter() {
  const [loading, setLoading] = useState(true);
  const [isEventLive, setIsEventLive] = useState(true);
  const [timer, setTimer] = useState("32:14:05");
  const [announcement, setAnnouncement] = useState('');

  useEffect(() => {
    // Simulated fetch for live telemetry
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  if (loading) {
     return (
       <div className="flex flex-col items-center justify-center h-[60vh] space-y-6 text-center">
          <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-700 italic">Synchronizing Real-time Feed...</p>
       </div>
     );
  }

  return (
    <div className="space-y-12 pb-20 text-left">
      {/* Real-time Context Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between items-start gap-8 border-b border-white/[0.03] pb-10">
         <div className="space-y-3">
            <div className="flex items-center space-x-2">
               <Activity className="w-4 h-4 text-blue-500 animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.3)]" />
               <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-700 italic underline underline-offset-4 decoration-blue-500/20">Sector: Real-time Operational Control</span>
            </div>
            <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white">Live <span className="text-blue-500">Control</span></h1>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest italic max-w-lg leading-relaxed">
               Execute immediate broadcasts, manage temporal event flow, and monitor live telemetry streams from the platform ecosystem.
            </p>
         </div>

         <div className="bg-[#0c0c0c] border border-white/5 p-6 rounded-3xl flex items-center space-x-8 shadow-2xl relative overflow-hidden group">
            <div className="absolute right-0 top-0 opacity-5 group-hover:scale-110 transition-transform">
               <Timer className="w-20 h-20 text-blue-500" />
            </div>
            <div className="flex flex-col items-start relative z-10">
               <span className="text-[10px] font-black text-gray-700 uppercase tracking-widest leading-none mb-1">Temporal Clock</span>
               <span className="text-3xl font-mono font-black text-white italic tracking-tighter underline underline-offset-4 decoration-white/10">{timer}</span>
            </div>
            <div className="w-[1px] h-12 bg-white/5 relative z-10" />
            <div className="flex items-center space-x-3 relative z-10">
                <button onClick={() => setIsEventLive(!isEventLive)} className={cn(
                   "p-3 rounded-2xl transition-all shadow-xl active:scale-95",
                   isEventLive ? "bg-blue-600 border border-blue-600 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)]" : "bg-emerald-600 border border-emerald-600 text-white shadow-emerald-900/40"
                )}>
                   {isEventLive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </button>
                <div className="flex flex-col">
                   <span className="text-[9px] font-black text-gray-700 uppercase tracking-widest leading-none">Operational Status</span>
                   <span className={cn("text-[10px] font-black uppercase italic tracking-tighter mt-1", isEventLive ? "text-blue-500" : "text-emerald-500")}>
                      {isEventLive ? 'Live Stream Active' : 'Operation Resumed'}
                   </span>
                </div>
            </div>
         </div>
      </header>

      {/* Primary Ops Terminal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 text-left">
         {/* Command Broadcast Node */}
         <section className="bg-[#0c0c0c] border border-white/5 rounded-[40px] p-10 space-y-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none group-hover:rotate-12 transition-transform duration-1000">
               <Megaphone className="w-40 h-40 text-blue-500" />
            </div>
            <div className="relative z-10 space-y-2">
               <h3 className="text-xl font-black italic uppercase tracking-tighter text-white font-mono">BROADCAST_COMMAND</h3>
               <p className="text-[10px] text-gray-700 font-black uppercase tracking-widest italic">Signal transmission center.</p>
            </div>
            <div className="relative z-10 space-y-4">
               <textarea 
                 rows={4} 
                 value={announcement}
                 onChange={(e) => setAnnouncement(e.target.value)}
                 placeholder="Input global announcement parameters here..." 
                 className="w-full bg-[#050505] border border-white/10 rounded-3xl p-6 text-xs text-blue-500 font-mono focus:outline-none focus:border-blue-500/40 transition-all placeholder:text-gray-800"
               />
               <div className="flex items-center justify-between">
                   <div className="flex items-center space-x-3 overflow-x-auto scrollbar-hide py-1">
                      {['All Nodes', 'Staff Access', 'Global Feed'].map((tag, i) => (
                         <div key={i} className="px-3 py-1.5 bg-white/5 border border-white/5 rounded-lg text-[8px] font-black uppercase tracking-widest text-gray-600 whitespace-nowrap italic">{tag}</div>
                      ))}
                   </div>
                   <button className="flex items-center space-x-3 px-8 py-4 bg-blue-600 text-white rounded-2xl shadow-xl shadow-blue-900/20 hover:bg-blue-500 transition-all active:scale-95 group">
                      <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      <span className="text-[10px] font-black uppercase tracking-widest italic">Execute Signal</span>
                   </button>
               </div>
            </div>
            <div className="relative z-10 pt-4 border-t border-white/[0.03] flex items-center justify-between">
               <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-2 text-[9px] font-black uppercase tracking-widest text-gray-600 hover:text-white transition-colors">
                     <Calendar className="w-3.5 h-3.5" />
                     <span>Schedule Transmission</span>
                  </button>
                   <button className="flex items-center space-x-2 text-[9px] font-black uppercase tracking-widest text-gray-600 hover:text-white transition-colors">
                     <Bell className="w-3.5 h-3.5" />
                     <span>Push Notification Only</span>
                  </button>
               </div>
               <span className="text-[8px] font-mono text-gray-800 uppercase tracking-widest">Target: Broadcast Layer 1</span>
            </div>
         </section>

         {/* Operational Logs Hub */}
         <section className="bg-[#0c0c0c] border border-white/5 rounded-[40px] p-10 flex flex-col h-full relative overflow-hidden group">
            <header className="flex items-center justify-between mb-8 border-b border-white/[0.03] pb-6 relative z-10 text-left">
               <div className="space-y-1 text-left">
                  <h3 className="text-xl font-black italic uppercase tracking-tighter text-white">Activity <span className="text-blue-500">Matrix</span></h3>
                  <p className="text-[10px] text-gray-700 font-black uppercase tracking-widest italic">Real-time telemetry feed.</p>
               </div>
               <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                  <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest italic">Live Signal Intercepted</span>
               </div>
            </header>
            <div className="flex-1 space-y-4 overflow-y-auto scrollbar-hide max-h-[250px] relative z-10 text-left">
               {[
                  { id: 1, action: 'NODE_REGISTERED', user: 'jordan_pk', hub: 'Cluster Beta', time: '1s ago' },
                  { id: 2, action: 'SOLUTION_DEPLOYED', user: 'team_alpha', hub: 'Submission Hub', time: '12s ago' },
                  { id: 3, action: 'SIGNAL_BROADCASTED', user: 'SYSTEM_ADMIN', hub: 'Global Layer', time: '1m ago' },
                  { id: 4, action: 'ACCESS_GRANTED', user: 'sarah_c', hub: 'Developer Node', time: '2m ago' },
                  { id: 5, action: 'SECURITY_SCAN_COMPLETE', user: 'AI_AUDIT', hub: 'Global Registry', time: '5m ago' },
               ].map((log, i) => (
                  <motion.div 
                    key={log.id} 
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex flex-col space-y-1 border-l-2 border-l-white/5 pl-4 hover:border-l-blue-500 transition-all py-1 group/item text-left"
                  >
                     <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black text-white italic group-hover/item:text-blue-500 transition-colors uppercase tracking-tight">{log.action}</span>
                        <span className="text-[8px] font-mono text-gray-700 uppercase tracking-widest">{log.time}</span>
                     </div>
                     <p className="text-[9px] font-bold text-gray-600 uppercase tracking-widest italic">
                        Node Identity: <span className="text-white mx-1">{log.user}</span> <span className="text-gray-800">::</span> Hub: <span className="text-white ml-1">{log.hub}</span>
                     </p>
                  </motion.div>
               ))}
            </div>
            <div className="mt-8 pt-6 border-t border-white/[0.03] text-center relative z-10">
                <button className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-700 hover:text-white transition-all italic">VIEW_COMPREHENSIVE_LOGS_NODE</button>
            </div>
         </section>
      </div>

      {/* Global Event Metrics Stream */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left relative z-10">
         {[
            { label: 'Active Socket Connections', value: '4.2k', icon: Monitor, color: 'blue', progress: 85 },
            { label: 'Average Sync Latency', value: '14ms', icon: HighIntensityActivity, color: 'blue', progress: 100 },
            { label: 'Intelligence Reports Sent', value: '840', icon: CheckCircle2, color: 'blue', progress: 40 },
            { label: 'Security Threats Deflected', value: '12', icon: ShieldAlert, color: 'red', progress: 12 },
         ].map((card, i) => (
            <motion.div 
               key={i}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
               className="bg-[#0c0c0c] border border-white/5 p-6 rounded-3xl hover:border-white/10 transition-all relative group overflow-hidden"
            >
               <div className="relative z-10 flex items-center justify-between mb-4">
                  <div className={cn(
                     "w-8 h-8 rounded-xl flex items-center justify-center border transition-all group-hover:scale-110",
                     card.color === 'blue' ? "bg-blue-600/10 border-blue-600/20 text-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.1)]" :
                     "bg-red-600/10 border-red-600/20 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.1)] animate-pulse"
                  )}>
                     {card.label === 'Average Sync Latency' ? <Zap className="w-4 h-4" /> : <card.icon className="w-4 h-4" />}
                  </div>
                  <MoreVertical className="w-3.5 h-3.5 text-gray-800" />
               </div>
               <div className="relative z-10 space-y-1 text-left">
                  <p className="text-[8px] font-black text-gray-700 uppercase tracking-widest italic">{card.label}</p>
                  <p className="text-xl font-black italic uppercase tracking-tighter text-white">{card.value}</p>
               </div>
               <div className="mt-4 space-y-2 relative z-10">
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                     <motion.div initial={{ width: 0 }} animate={{ width: `${card.progress}%` }} className={cn(
                        "h-full rounded-full transition-all",
                        card.color === 'blue' ? "bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.3)]" : "bg-red-500"
                     )} />
                  </div>
                  <div className="flex justify-between items-center text-[7px] font-black text-gray-700 uppercase tracking-widest italic">
                     <span>Registry Sync</span>
                     <span>98.4%</span>
                  </div>
               </div>
               <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-white/5 to-transparent transition-all group-hover:via-blue-500/20" />
            </motion.div>
         ))}
      </section>

      {/* Manual Emergency Control Unit */}
      <section className="bg-red-600/5 border border-red-600/10 rounded-[40px] p-10 flex flex-col md:flex-row items-center justify-between gap-10 group relative overflow-hidden text-left">
         <div className="absolute top-0 right-10 -mt-20 opacity-[0.03] group-hover:rotate-12 transition-transform duration-1000">
            <Activity className="w-96 h-96 text-red-500" />
         </div>
         <div className="relative z-10 space-y-4 text-left">
            <h3 className="text-xl font-black italic uppercase tracking-tighter text-white">Manual Event <span className="text-red-500">Overlock</span></h3>
            <p className="text-[11px] font-bold text-gray-600 uppercase tracking-tighter leading-relaxed max-w-lg italic">
               Initiating an emergency overlock will immediately freeze all socket connections, suspend transmission hubs, and put all solution nodes into read-only mode for maintenance or security evaluation.
            </p>
         </div>
         <div className="relative z-10 w-full md:w-auto flex items-center space-x-4">
             <button className="flex-1 md:flex-none px-10 py-4 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest italic text-gray-400 hover:text-white transition-all">
                Audit Registry
             </button>
             <button className="flex-1 md:flex-none px-10 py-4 bg-red-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest italic shadow-xl shadow-red-900/20 hover:bg-red-500 active:scale-95 text-white">
                EXECUTE OVERLOCK
             </button>
         </div>
      </section>
    </div>
  );
}

function HighIntensityActivity() {
   return <Activity className="w-4 h-4" />;
}
