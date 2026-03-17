'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  FolderLock, 
  Trophy, 
  Activity,
  AlertCircle,
  Eye,
  CheckCircle2
} from 'lucide-react';
import { cn } from '@/lib/utils';

const AdminOverview = () => {
  const stats = [
    { label: 'Total Users', value: '1,280', icon: Users, color: 'text-blue-500', trend: '+12%' },
    { label: 'Live Projects', value: '45', icon: FolderLock, color: 'text-violet-500', trend: '+8%' },
    { label: 'Active Events', value: '3', icon: Trophy, color: 'text-amber-500', trend: 'Stable' },
    { label: 'Submissions', value: '89', icon: Activity, color: 'text-emerald-500', trend: '+24%' },
  ];

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-xl font-bold mb-1">Dashboard</h1>
        <p className="text-xs text-gray-400">Real-time platform activity.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="bg-[#0c0c0c] border border-white/5 p-4 rounded-lg hover:border-white/10 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <stat.icon className={cn("w-4 h-4 opacity-70", stat.color)} />
              <span className="text-[9px] font-bold text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                {stat.trend}
              </span>
            </div>
            <p className="text-xl font-bold mb-0.5">{stat.value}</p>
            <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Submissions */}
        <div className="lg:col-span-2 border border-white/5 bg-[#0c0c0c] p-6 rounded-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-bold flex items-center space-x-2 text-gray-300">
              <AlertCircle className="w-4 h-4 text-amber-500" />
              <span>Pending Review</span>
            </h2>
            <button className="text-[10px] font-bold text-blue-500 hover:text-blue-400 transition-colors">Queue Details</button>
          </div>

          <div className="space-y-2">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center justify-between p-3 bg-white/[0.01] border border-white/[0.03] rounded-md hover:bg-white/[0.03] transition-all group">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded bg-white/5 border border-white/5 flex items-center justify-center text-[10px] font-bold text-gray-400 group-hover:text-blue-400 transition-colors">S</div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-200 uppercase tracking-tighter">SecureVault v2.0</h4>
                    <p className="text-[9px] text-gray-600 font-medium">@cipher • 2h ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-1.5 text-gray-600 hover:text-white transition-colors">
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                  <button className="text-[9px] font-bold uppercase tracking-widest text-blue-500 px-3 py-1.5 hover:bg-blue-500/10 border border-blue-500/10 rounded transition-all">Audit</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Status */}
        <div className="lg:col-span-1 border border-white/5 bg-[#0c0c0c] p-6 rounded-lg">
          <h2 className="text-sm font-bold mb-6 text-gray-300">Environment Hub</h2>
          <div className="space-y-4">
            {[
              { label: 'Auth Gateway', status: 'Healthy' },
              { label: 'Vector Store', status: 'Active' },
              { label: 'Media CDN', status: 'Operational' },
            ].map((s, i) => (
              <div key={i} className="flex items-center justify-between py-1 border-b border-white/[0.02] last:border-0">
                <span className="text-xs text-gray-500">{s.label}</span>
                <span className="flex items-center space-x-1.5 text-[10px] text-emerald-500 font-bold uppercase tracking-tighter">
                  <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_5px_rgba(16,185,129,0.5)]"></div>
                  <span>{s.status}</span>
                </span>
              </div>
            ))}
            
            <div className="mt-6 pt-6 border-t border-white/5">
              <div className="p-3 bg-blue-500/[0.02] rounded border border-blue-500/5">
                <div className="flex items-center space-x-2 mb-2">
                   <CheckCircle2 className="w-3.5 h-3.5 text-blue-500/50" />
                   <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Backups</p>
                </div>
                <p className="text-[10px] text-gray-500 font-medium italic leading-relaxed">System backbone is operational. Last sync 12m ago.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
