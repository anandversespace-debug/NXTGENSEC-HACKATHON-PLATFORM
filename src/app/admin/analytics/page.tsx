'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Activity, 
  Users, 
  ShieldAlert,
  TerminalSquare,
  TrendingUp,
  LineChart
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AdminAnalyticsPage() {
  const metrics = [
    { label: 'Active Developer Nodes', value: '420', icon: Users, change: '+12%', positive: true },
    { label: 'Global Hackathon Entries', value: '84', icon: TerminalSquare, change: '+5%', positive: true },
    { label: 'Platform Audits Completed', value: '1,240', icon: ShieldAlert, change: '-2%', positive: false },
    { label: 'Daily Contract Interactions', value: '8.4k', icon: Activity, change: '+24%', positive: true },
  ];

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold mb-0.5">Telemetry & Analytics</h1>
          <p className="text-xs text-gray-400 font-medium tracking-tight">System-wide performance monitoring and ecosystem metrics.</p>
        </div>
        <button className="bg-[#0c0c0c] border border-white/5 text-gray-400 hover:text-white transition-colors px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest flex items-center space-x-2">
          <LineChart className="w-3.5 h-3.5" />
          <span>Export CSV Report</span>
        </button>
      </header>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        {metrics.map((metric, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-[#0c0c0c] border border-white/5 rounded-xl p-6 group hover:border-white/15 transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-white/[0.02] border border-white/[0.03] flex items-center justify-center">
                 <metric.icon className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
              </div>
              <span className={cn(
                "text-[9px] font-bold flex items-center px-2 py-0.5 rounded border uppercase tracking-widest",
                metric.positive ? "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" : "text-red-500 bg-red-500/10 border-red-500/20"
              )}>
                <TrendingUp className={cn("w-3 h-3 mr-1", !metric.positive && "rotate-180")} />
                {metric.change}
              </span>
            </div>
            <p className="text-3xl font-black text-white italic tracking-tight">{metric.value}</p>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">{metric.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Placeholder for complex charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <div className="lg:col-span-2 bg-[#0c0c0c] border border-white/5 rounded-xl p-8 h-96 flex flex-col items-center justify-center text-center">
            <BarChart3 className="w-12 h-12 text-gray-700 mb-4" />
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest">Growth Velocity Chart</h3>
            <p className="text-xs text-gray-600 font-medium max-w-sm mt-2">D3.js or Recharts visualization container initialized. Ready for telemetry stream injection.</p>
         </div>

         <div className="bg-[#0c0c0c] border border-white/5 rounded-xl p-8">
            <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-6 flex items-baseline">
               Top Active Sectors
            </h3>
            
            <div className="space-y-6">
               {[
                 { name: 'DeFi Security Audits', perc: 45 },
                 { name: 'Zero-Knowledge Infra', perc: 30 },
                 { name: 'L2 Scaling Nodes', perc: 15 },
                 { name: 'Wallet Integrations', perc: 10 }
               ].map((item, i) => (
                  <div key={i}>
                     <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider mb-2">
                       <span className="text-gray-400">{item.name}</span>
                       <span className="text-blue-500">{item.perc}%</span>
                     </div>
                     <div className="w-full bg-[#050505] border border-white/5 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-blue-600 h-full rounded-full" style={{ width: `${item.perc}%` }}></div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
}
