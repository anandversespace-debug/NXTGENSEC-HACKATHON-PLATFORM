'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  Shield, 
  Database, 
  Globe, 
  Lock,
  Save,
  Server,
  Key
} from 'lucide-react';
import { cn } from '@/lib/utils';

const AdminSettings = () => {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-xl font-bold mb-0.5">Settings</h1>
        <p className="text-xs text-gray-500 font-medium">Core configuration.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
           {/* Security */}
           <div className="bg-[#0c0c0c] border border-white/5 p-6 rounded-lg">
              <div className="flex items-center space-x-2 mb-6">
                 <Shield className="w-4 h-4 text-blue-500" />
                 <h2 className="text-sm font-bold text-gray-200">Security Policies</h2>
              </div>
              
              <div className="space-y-1">
                 {[
                   { label: 'Strict MFA', desc: 'Require 2FA for root access.', status: true },
                   { label: 'Submissions', desc: 'Accept new project data.', status: true },
                   { label: 'Auto Audit', desc: 'Run heuristic checks.', status: true },
                 ].map((item, i) => (
                   <div key={i} className="flex items-center justify-between py-3 border-b border-white/[0.02] last:border-0">
                      <div>
                         <p className="text-xs font-bold text-gray-300 mb-0.5 uppercase tracking-tighter">{item.label}</p>
                         <p className="text-[10px] text-gray-600">{item.desc}</p>
                      </div>
                      <button className={`w-8 h-4 rounded-full relative transition-all ${item.status ? 'bg-blue-600' : 'bg-gray-800'}`}>
                         <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${item.status ? 'left-4.5' : 'left-0.5'}`}></div>
                      </button>
                   </div>
                 ))}
              </div>
           </div>

           {/* Platform Constants */}
           <div className="bg-[#0c0c0c] border border-white/5 p-6 rounded-lg">
              <div className="flex items-center space-x-2 mb-6">
                 <Globe className="w-4 h-4 text-violet-500" />
                 <h2 className="text-sm font-bold text-gray-200">System Parameters</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="space-y-1.5">
                    <label className="text-[9px] font-bold uppercase text-gray-600 tracking-wider">Node Alias</label>
                    <input type="text" defaultValue="NxtGen Ecology" className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/30" />
                 </div>
                 <div className="space-y-1.5">
                    <label className="text-[9px] font-bold uppercase text-gray-600 tracking-wider">Revision</label>
                    <input type="text" defaultValue="1.0.4-LTS" disabled className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-xs text-gray-600 cursor-not-allowed" />
                 </div>
              </div>
           </div>
        </div>

        <div className="lg:col-span-1 space-y-4">
           <div className="bg-[#0c0c0c] border border-white/5 p-6 rounded-lg">
              <h3 className="text-[9px] font-bold uppercase text-gray-600 tracking-wider mb-6">Environment Health</h3>
              <div className="space-y-4">
                 {[
                   { label: 'Edge Port', val: '99.9% Up', icon: Server, color: 'text-emerald-500' },
                   { label: 'Core DB', val: '2.4ms', icon: Database, color: 'text-blue-500' },
                   { label: 'Auth Node', val: 'Sync OK', icon: Key, color: 'text-violet-500' },
                 ].map((s, i) => (
                   <div key={i} className="flex items-center space-x-3">
                      <div className="p-2 bg-white/5 rounded-md">
                         <s.icon className={cn("w-3.5 h-3.5", s.color)} />
                      </div>
                      <div>
                         <p className="text-[10px] font-bold text-gray-300">{s.label}</p>
                         <p className="text-[9px] text-gray-600">{s.val}</p>
                      </div>
                   </div>
                 ))}
              </div>

              <button className="w-full mt-8 py-2.5 bg-blue-600 rounded-lg font-bold text-[10px] uppercase tracking-widest text-white flex items-center justify-center space-x-2 shadow-lg shadow-blue-900/20">
                 <Save className="w-3 h-3" />
                 <span>Apply Node Changes</span>
              </button>
           </div>

           <div className="p-6 bg-amber-500/[0.02] border border-amber-500/10 rounded-lg">
              <div className="flex items-center space-x-2 text-amber-500/70 mb-2">
                 <Lock className="w-3.5 h-3.5" />
                 <h3 className="text-[9px] font-bold uppercase tracking-widest">Audit Ledger</h3>
              </div>
              <p className="text-[10px] text-gray-600 leading-relaxed mb-4">Operations are recorded to an immutable compliance ledger.</p>
              <button className="text-[9px] font-bold text-amber-500 hover:text-amber-400 uppercase tracking-tighter">View Compliance →</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
