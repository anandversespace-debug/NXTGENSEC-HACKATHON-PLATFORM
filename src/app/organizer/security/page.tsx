'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  Search, 
  Lock, 
  Key, 
  Users, 
  Activity, 
  AlertTriangle, 
  Eye, 
  ShieldAlert, 
  MoreVertical, 
  ChevronRight, 
  History, 
  Terminal as TerminalIcon, 
  Globe, 
  Zap, 
  CheckCircle2, 
  Settings,
  MoreHorizontal,
  RefreshCw,
  Loader2,
  Trash2,
  ArrowUpRight,
  Plus,
  Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function SecurityAuditHub() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'audit' | 'roles' | 'api'>('audit');
  const [auditLogs, setAuditLogs] = useState<any[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setAuditLogs([
        { id: 1, action: 'Admin Login', user: 'admin_node', ip: '192.168.1.1', status: 'success', time: '2m ago' },
        { id: 2, action: 'Role Update', user: 'jordan_pk', ip: '45.12.8.2', status: 'verified', time: '15m ago' },
        { id: 3, action: 'API Key Created', user: 'alex_dev', ip: '102.4.5.1', status: 'warning', time: '1h ago' },
        { id: 4, action: 'Backup Started', user: 'backup_task', ip: 'internal_cluster', status: 'success', time: '2h ago' },
        { id: 5, action: 'Access Denied', user: 'unknown_id', ip: '210.45.1.2', status: 'critical', time: '4h ago' },
      ]);
      setLoading(false);
    }, 1200);
  }, []);

  const StatusBadge = ({ status }: { status: string }) => {
    const styles: any = {
      success: "bg-blue-600/10 border-blue-600/20 text-blue-500 shadow-sm shadow-blue-500/5",
      verified: "bg-blue-500/10 border-blue-500/20 text-blue-400",
      warning: "bg-amber-500/10 border-amber-500/20 text-amber-500",
      critical: "bg-red-500/10 border-red-500/20 text-red-500 shadow-sm shadow-red-500/5",
    };
    return (
      <div className={cn("px-2.5 py-1 rounded-lg border text-[8px] font-black uppercase tracking-widest flex items-center italic transition-all", styles[status])}>
         <div className={cn("w-1 h-1 rounded-full mr-2", status === 'critical' ? "bg-red-500 animate-pulse" : status === 'warning' ? "bg-amber-500" : "bg-blue-500 shadow-lg")} />
         {status}
      </div>
    );
  };

  if (loading) {
     return (
       <div className="flex flex-col items-center justify-center h-[50vh] space-y-4 text-center">
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
          <p className="text-[9px] font-black uppercase tracking-widest text-gray-700 italic">Accessing Logs...</p>
       </div>
     );
  }

  return (
    <div className="space-y-8 pb-12 text-left">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between items-start gap-6 border-b border-white/[0.03] pb-6">
         <div className="space-y-2 text-left">
            <div className="flex items-center space-x-2">
               <ShieldCheck className="w-4 h-4 text-blue-500" />
               <span className="text-[9px] font-black uppercase tracking-widest text-gray-700 italic">Security Management</span>
            </div>
            <h1 className="text-2xl font-black italic uppercase tracking-tighter text-white">Security <span className="text-blue-500 ml-1">Terminal</span></h1>
            <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest italic leading-relaxed max-w-lg">
               Manage audit logs, user roles, and API access across your platform.
            </p>
         </div>

         <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-6 py-3 bg-white/5 border border-white/5 text-gray-500 hover:text-white rounded-xl transition-all group">
               <RefreshCw className="w-3.5 h-3.5 group-hover:rotate-180 transition-all duration-700" />
               <span className="text-[9px] font-black uppercase tracking-widest italic">Refresh Logs</span>
            </button>
            <button className="flex items-center space-x-2 px-8 py-3 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-500 transition-all active:scale-95 group">
                <ShieldAlert className="w-4 h-4" />
                <span className="text-[9px] font-black uppercase tracking-widest italic">Export Audit</span>
            </button>
         </div>
      </header>

      {/* Tabs & Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-left">
         <div className="bg-[#0c0c0c] border border-white/5 p-1 rounded-xl flex items-center w-full md:w-auto overflow-x-auto scrollbar-hide shadow-inner">
            {[
              { id: 'audit', label: 'Audit Logs', icon: TerminalIcon },
              { id: 'roles', label: 'Roles Hub', icon: Users },
              { id: 'api', label: 'API Keys', icon: Key }
            ].map((tab) => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                   "whitespace-nowrap flex items-center px-6 py-3 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all italic space-x-3 group",
                   activeTab === tab.id ? "bg-blue-600/10 border border-blue-600/20 text-blue-500 shadow-md scale-[1.02]" : "text-gray-600 hover:text-gray-400"
                )}
              >
                  <tab.icon className={cn("w-4 h-4 transition-transform", activeTab === tab.id ? "text-blue-500" : "")} />
                  <span>{tab.label}</span>
              </button>
            ))}
         </div>
         <div className="relative w-full md:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-700 group-focus-within:text-blue-500 transition-colors" />
            <input 
               type="text" 
               placeholder="Search activity records..." 
               className="w-full bg-[#0c0c0c] border border-white/5 rounded-xl py-3 pl-11 pr-5 text-[10px] text-white placeholder-gray-800 focus:outline-none focus:border-blue-500/20 transition-all font-bold italic shadow-inner"
            />
         </div>
      </div>

      {/* Audit Matrix */}
      <div className="bg-[#0c0c0c] border border-white/5 rounded-2xl overflow-hidden shadow-xl text-left">
         <div className="overflow-x-auto scrollbar-hide">
            <table className="w-full text-left min-w-[900px]">
               <thead>
                  <tr className="text-[9px] font-black text-gray-700 uppercase tracking-widest italic border-b border-white/[0.05]">
                     <th className="px-6 py-6">Activity Identity</th>
                     <th className="px-6 py-6">Identity Handle</th>
                     <th className="px-6 py-6">Source Node</th>
                     <th className="px-6 py-6">Risk Signal</th>
                     <th className="px-6 py-6">Time Trace</th>
                     <th className="px-6 py-6 text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-white/[0.03]">
                  {auditLogs.map((log, i) => (
                    <motion.tr 
                      key={log.id}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="group hover:bg-white/[0.01] transition-all"
                    >
                       <td className="px-6 py-5">
                          <div className="flex items-center space-x-4">
                             <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center group-hover:border-blue-500/20 transition-all text-gray-800">
                                <Activity className="w-4 h-4 group-hover:text-blue-500 transition-colors" />
                             </div>
                             <div className="flex flex-col text-left">
                                <span className={cn(
                                   "text-[10px] font-mono font-black italic uppercase mb-1 leading-none group-hover:text-blue-500 transition-colors",
                                   log.status === 'critical' ? "text-red-500" : "text-white"
                                )}>{log.action}</span>
                                <span className="text-[7px] font-bold text-gray-700 uppercase tracking-widest italic">Layer 7 Audit Logging</span>
                             </div>
                          </div>
                       </td>
                       <td className="px-6 py-5">
                            <span className="text-[10px] font-black text-white italic group-hover:text-blue-500 transition-colors underline underline-offset-4 decoration-white/5">@{log.user}</span>
                       </td>
                       <td className="px-6 py-5">
                          <code className="text-[9px] font-mono text-blue-500 uppercase italic opacity-70">{log.ip}</code>
                       </td>
                       <td className="px-6 py-5">
                          <div className="w-fit"><StatusBadge status={log.status} /></div>
                       </td>
                       <td className="px-6 py-5">
                          <span className="text-[9px] font-mono font-bold text-gray-700 uppercase italic flex items-center">
                             <Clock className="w-3.5 h-3.5 mr-2 opacity-30" /> {log.time}
                          </span>
                       </td>
                       <td className="px-6 py-5 text-right">
                          <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-all translate-x-1 group-hover:translate-x-0">
                             <button className="p-2 bg-white/5 border border-white/10 rounded-lg text-gray-700 hover:text-blue-500 transition-all"><Eye className="w-4 h-4" /></button>
                             <button className="p-2 bg-red-600/10 border border-red-600/20 rounded-lg text-red-500 hover:bg-red-600 hover:text-white transition-all"><Lock className="w-4 h-4" /></button>
                             <button className="p-2 bg-white/5 border border-white/10 rounded-lg text-gray-700 hover:text-white transition-all"><History className="w-4 h-4" /></button>
                          </div>
                       </td>
                    </motion.tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>

      {/* Grid: Access Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-left">
         {/* Role Hub */}
         <section className="bg-[#0c0c0c] border border-white/5 rounded-2xl p-8 space-y-6 relative overflow-hidden group shadow-xl">
            <div className="absolute top-0 right-0 p-8 opacity-[0.02] pointer-events-none group-hover:rotate-12 transition-transform duration-1000">
               <Users className="w-40 h-40 text-blue-500" />
            </div>
            <div className="relative z-10 space-y-2 text-left">
               <h3 className="text-xl font-black italic uppercase tracking-tighter text-white">Identity <span className="text-blue-500 ml-1">Roles Matrix</span></h3>
               <p className="text-[9px] text-gray-700 font-black uppercase tracking-widest italic">Global Role Access Governance HUB.</p>
            </div>
            <div className="bg-[#050505] p-6 rounded-2xl border border-white/5 space-y-4 shadow-inner relative z-10 hover:border-blue-500/10 transition-all">
               {[
                  { role: 'System Admin', count: 2, level: 'L1', active: true },
                  { role: 'Organizer', count: 12, level: 'L2', active: true },
                  { role: 'Judge Audit', count: 45, level: 'L3', active: true },
                  { role: 'Moderator', count: 0, level: 'L4', active: false }
               ].map((r, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-white/[0.02] rounded-xl border border-white/5 group/row hover:bg-white/[0.04] transition-all cursor-pointer">
                     <div className="flex flex-col text-left">
                        <span className="text-[11px] font-black text-white italic uppercase group-hover/row:text-blue-500 transition-colors uppercase">{r.role}</span>
                        <span className="text-[8px] font-bold text-gray-700 uppercase tracking-widest mt-1 italic font-mono">Active instances: {r.count}</span>
                     </div>
                     <div className="flex items-center space-x-6">
                        <span className="px-2.5 py-1 bg-blue-600/10 border border-blue-600/20 rounded-lg text-[8px] font-black text-blue-500 uppercase italic tracking-widest shadow-sm">Level {r.level} Clearance</span>
                        <Settings className="w-4 h-4 text-gray-800 hover:text-white cursor-pointer transition-colors" />
                     </div>
                  </div>
               ))}
            </div>
            <button className="relative z-10 w-full py-4 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest italic rounded-xl hover:bg-blue-500 transition-all shadow-xl disabled:opacity-20 active:scale-95 group">
               <Zap className="w-3.5 h-3.5 inline-block mr-2 group-hover:scale-110 transition-transform" />
               Provision New Role Access
            </button>
         </section>

         {/* API Keys */}
         <section className="bg-blue-600/5 border border-blue-600/10 rounded-2xl p-8 space-y-6 relative overflow-hidden group shadow-xl">
            <div className="absolute top-0 right-0 p-8 opacity-[0.02] pointer-events-none group-hover:scale-125 transition-transform duration-1000">
               <Key className="w-40 h-40 text-blue-500" />
            </div>
            <div className="relative z-10 space-y-2 text-left">
               <h3 className="text-xl font-black italic uppercase tracking-tighter text-white">API <span className="text-blue-500 ml-1">Access Hub</span></h3>
               <p className="text-[9px] text-gray-700 font-black uppercase tracking-widest italic">External system node integration governance grid.</p>
            </div>
            <div className="space-y-4 relative z-10">
               {[
                  { label: 'Platform Client Node', key: 'pk_live_4k83...2m01', active: true },
                  { label: 'Mobile Sync Synchronization', key: 'pk_live_9a21...h8s3', active: true },
                  { label: 'Legacy Auditor Hub', key: 'pk_test_x62k...v98k', active: false },
               ].map((api, i) => (
                  <div key={i} className="p-6 bg-[#090909] border border-white/5 rounded-2xl group/card hover:border-blue-500/30 transition-all shadow-lg hover:-translate-y-1">
                     <div className="flex justify-between items-start mb-4">
                        <div className="flex flex-col text-left space-y-2">
                           <span className="text-[10px] font-black text-gray-600 uppercase italic mb-1 group-hover/card:text-blue-500 transition-colors uppercase">{api.label}</span>
                           <code className="text-[11px] font-mono text-blue-500 mt-1 uppercase tracking-tighter bg-blue-600/10 px-3 py-1.5 rounded-lg border border-blue-600/10 shadow-inner">{api.key}</code>
                        </div>
                        <div className={cn("px-2.5 py-1 rounded-lg border text-[7px] font-black uppercase tracking-widest italic shadow-sm", api.active ? "bg-blue-600/20 border-blue-600/30 text-blue-500" : "bg-red-600/20 border-red-600/30 text-red-500")}>
                           {api.active ? 'Active' : 'Revoked'}
                        </div>
                     </div>
                     <div className="flex items-center space-x-6 opacity-0 group-hover/card:opacity-100 transition-all translate-y-1 group-hover/card:translate-y-0 text-left pt-2">
                        <button className="text-[9px] font-black uppercase tracking-widest text-gray-700 hover:text-blue-500 transition-all italic underline underline-offset-8 decoration-white/5">Regenerate Key</button>
                        <button className="text-[9px] font-black uppercase tracking-widest text-red-900 hover:text-red-500 transition-all italic underline underline-offset-8 decoration-red-900/10">Revoke Hub Access</button>
                     </div>
                  </div>
               ))}
               <button className="w-full py-4 border-2 border-dashed border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest italic text-gray-700 hover:text-white hover:border-blue-500/30 hover:bg-blue-600/5 transition-all flex items-center justify-center space-x-3 group shadow-lg">
                  <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                  <span>Provision New API Node access</span>
               </button>
            </div>
         </section>
      </div>

      {/* Risk Alert Alerting */}
      <section className="bg-red-600/5 border border-red-600/10 rounded-2xl p-10 flex flex-col md:flex-row items-center justify-between gap-10 group relative overflow-hidden text-left shadow-2xl">
         <div className="absolute top-0 right-10 -mt-20 opacity-[0.02] group-hover:rotate-12 transition-transform duration-1000 pointer-events-none">
            <AlertTriangle className="w-[300px] h-[300px] text-red-500" />
         </div>
         <div className="relative z-10 space-y-4 text-left flex-1">
            <div className="flex items-center space-x-4">
               <ShieldAlert className="w-6 h-6 text-red-500 animate-pulse" />
               <h3 className="text-xl font-black italic uppercase tracking-tighter text-white">System <span className="text-red-500 ml-1">Threat Hub Monitoring</span></h3>
            </div>
            <p className="text-[12px] font-bold text-gray-600 uppercase tracking-widest leading-relaxed max-w-2xl italic">
                Platform analytics indicate <span className="text-red-500 font-extrabold underline decoration-red-500/30 underline-offset-8">+12 suspicious activity logs</span> in the last cycle. Layer 5 encryption sequence in effect.
            </p>
         </div>
         <div className="relative z-10 w-full md:w-auto">
             <button className="w-full md:w-auto px-10 py-5 bg-[#0c0c0c] border border-white/10 text-white text-[11px] font-black uppercase tracking-widest italic rounded-2xl hover:border-red-500/30 hover:bg-red-500/5 transition-all shadow-3xl group active:scale-95">
                <Zap className="w-4 h-4 inline-block mr-3 group-hover:animate-pulse" />
                Execute Global Security Scan protocol
             </button>
         </div>
      </section>
    </div>
  );
}
