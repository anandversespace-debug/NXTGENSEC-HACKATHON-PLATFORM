'use client';

import React, { useState } from 'react';
import { 
  Settings, 
  Shield, 
  Globe, 
  Lock, 
  Terminal, 
  Cpu, 
  Save, 
  RefreshCw,
  Mail,
  Zap,
  Key,
  Database,
  Cloud,
  FileCode,
  CheckCircle2,
  HardDrive
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function AdminSettings() {
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 1500);
  };

  const sections = [
    {
      title: 'Global Infrastructure',
      id: 'infra',
      icon: HardDrive,
      settings: [
        { label: 'Platform Mode', value: 'Production', type: 'select', options: ['Development', 'Staging', 'Production'] },
        { label: 'Maintenance Mode', value: false, type: 'toggle' },
        { label: 'Public Indexing', value: true, type: 'toggle' }
      ]
    },
    {
      title: 'Security Protocols',
      id: 'security',
      icon: Lock,
      settings: [
        { label: '2FA Requirement', value: 'Optional', type: 'select', options: ['None', 'Optional', 'Enforced'] },
        { label: 'Session Timeout', value: '7 Days', type: 'text' },
        { label: 'Rate Limiting', value: 'Active (Global)', type: 'select', options: ['Relaxed', 'Standard', 'Aggressive'] }
      ]
    },
    {
      title: 'Email Matrix',
      id: 'mail',
      icon: Mail,
      settings: [
        { label: 'SMTP Service', value: 'Nodemailer (Relay)', type: 'text' },
        { label: 'Auto-Verification', value: true, type: 'toggle' },
        { label: 'Digest Emails', value: 'Weekly', type: 'select', options: ['None', 'Daily', 'Weekly'] }
      ]
    }
  ];

  return (
    <div className="space-y-12 text-left pb-24">
      <header className="flex items-center justify-between border-b border-white/[0.03] pb-10">
         <div>
            <div className="flex items-center space-x-3 mb-2">
               <div className="p-2 bg-blue-600/10 border border-blue-600/20 rounded-xl">
                  <Cpu className="w-5 h-5 text-blue-500" />
               </div>
               <span className="text-[10px] font-black uppercase tracking-widest text-gray-700 italic">Core Configuration</span>
            </div>
            <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white">System <span className="text-blue-500">Integrations</span></h1>
         </div>

         <button 
           onClick={handleSave}
           disabled={saving}
           className="px-8 py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center space-x-3 transition-all active:scale-95 shadow-xl shadow-blue-500/20"
         >
            {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : (success ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Save className="w-4 h-4" />)}
            <span>{saving ? 'Syncing...' : (success ? 'Parameters Synced' : 'Commit Changes')}</span>
         </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
         {/* Main Config */}
         <div className="lg:col-span-2 space-y-12">
            {sections.map((section, idx) => (
               <section key={section.id} className="space-y-6">
                  <div className="flex items-center space-x-4 border-l-2 border-l-blue-600 pl-6">
                     <section.icon className="w-5 h-5 text-blue-500/50" />
                     <h2 className="text-sm font-black uppercase italic tracking-[0.2em] text-white">{section.title}</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {section.settings.map((s, si) => (
                        <div key={si} className="bg-[#0c0c0c] border border-white/5 p-6 rounded-2xl flex items-center justify-between group hover:border-blue-500/20 transition-all">
                           <div className="space-y-1">
                              <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">{s.label}</p>
                              <p className="text-[11px] font-black text-white italic uppercase tracking-tight">{String(s.value)}</p>
                           </div>

                           {s.type === 'toggle' ? (
                              <div className={cn(
                                "w-10 h-10 rounded-xl border flex items-center justify-center transition-all",
                                s.value ? "bg-blue-600/10 border-blue-600/20 text-blue-500" : "bg-white/5 border-white/5 text-gray-700"
                              )}>
                                 <Zap className={cn("w-4 h-4", s.value ? "fill-blue-500/20" : "")} />
                              </div>
                           ) : (
                              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-700">
                                 <Terminal className="w-4 h-4" />
                              </div>
                           )}
                        </div>
                     ))}
                  </div>
               </section>
            ))}
         </div>

         {/* Sidebar integrations */}
         <aside className="space-y-8">
            <div className="bg-blue-600/5 border border-blue-600/10 p-8 rounded-[40px] space-y-8">
               <h3 className="text-sm font-black text-white italic uppercase tracking-tighter">Active <span className="text-blue-500">Pipes</span></h3>
               <div className="space-y-6">
                  {[
                    { label: 'Cloudinary CDN', desc: 'Sync Active', icon: Cloud },
                    { label: 'MongoDB Atlas', desc: 'Cluster Online', icon: Database },
                    { label: 'Google GSI', desc: 'OAuth Ready', icon: Key },
                    { label: 'System Logs', desc: 'Recording', icon: FileCode },
                  ].map((pipe, pi) => (
                     <div key={pi} className="flex items-center space-x-4 group">
                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:border-blue-500/20 transition-all">
                           <pipe.icon className="w-4 h-4 text-gray-700 group-hover:text-blue-500" />
                        </div>
                        <div>
                           <p className="text-[10px] font-black text-white uppercase italic tracking-widest leading-none">{pipe.label}</p>
                           <p className="text-[8px] text-gray-700 font-bold uppercase tracking-[0.2em] mt-1 italic">{pipe.desc}</p>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            <div className="bg-[#0c0c0c] border border-white/5 p-8 rounded-[40px] space-y-4">
               <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] italic">System Hash</h3>
               <div className="p-4 bg-black/60 rounded-2xl font-mono text-[8px] text-gray-700 break-all leading-relaxed uppercase italic">
                  f3a8b2c1d9e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0
               </div>
               <p className="text-[8px] text-gray-800 font-bold uppercase tracking-widest italic leading-relaxed pt-2">
                  This identity sector is encrypted. All changes are logged to the audit pipeline.
               </p>
            </div>
         </aside>
      </div>
    </div>
  );
}
