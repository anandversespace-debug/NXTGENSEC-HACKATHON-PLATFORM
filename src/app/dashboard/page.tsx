'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { useAppStore } from '@/store/useAppStore';
import { LayoutDashboard, FolderCode, Trophy, MessageSquare, Settings, Bell, ExternalLink } from 'lucide-react';
import Link from 'next/link';

const DashboardPage = () => {
  const { user } = useAppStore();

  const stats = [
    { label: 'Active Projects', value: '3', icon: FolderCode, color: 'text-blue-500' },
    { label: 'Events Joined', value: '2', icon: Trophy, color: 'text-violet-500' },
    { label: 'Total Points', value: '1,240', icon: Bell, color: 'text-emerald-500' },
  ];

  return (
    <ProtectedRoute>
      <div className="min-h-screen pt-24 pb-20 px-6 bg-[#050505]">
        <div className="max-w-6xl mx-auto">
          {/* Dashboard Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <p className="text-label mb-2">User Workspace</p>
              <h1 className="text-2xl font-bold uppercase tracking-tight italic mb-3 flex items-center space-x-3">
                <LayoutDashboard className="w-5 h-5 text-blue-600" />
                <span>Developer Dashboard</span>
              </h1>
              <p className="text-gray-500 text-[11px] font-bold uppercase tracking-tighter">Identity: {user?.name || 'Node_Active'} // Status: Backbone Online</p>
            </div>
            <div className="flex items-center space-x-3">
               <button className="p-2 bg-[#0c0c0c] border border-white/5 rounded hover:bg-white/[0.05] transition-colors relative group">
                  <Bell className="w-4 h-4 text-gray-500 group-hover:text-blue-500 transition-colors" />
                  <span className="absolute top-2 right-2 w-1 h-1 bg-blue-600 rounded-full animate-pulse"></span>
               </button>
               <Link href="/profile" className="btn-secondary flex items-center space-x-2">
                 <span>Identity Profile</span>
                 <ExternalLink className="w-3 h-3" />
               </Link>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="bg-[#0c0c0c] border border-white/5 p-6 rounded-lg flex items-center space-x-6 hover:border-white/10 transition-colors"
              >
                <div className="p-3 rounded bg-white/[0.02] border border-white/[0.03]">
                  <stat.icon className={cn("w-5 h-5", stat.color)} />
                </div>
                <div>
                   <p className="text-xl font-black text-white italic tracking-tight">{stat.value}</p>
                   <p className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Quick Actions */}
            <div className="lg:col-span-1 space-y-6">
               <div className="bg-[#0c0c0c] border border-white/5 p-6 rounded-lg">
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-6 flex items-center space-x-2">
                    <Terminal className="w-3.5 h-3.5" />
                    <span>Quick Access</span>
                  </h3>
                  <div className="space-y-2">
                     <Link href="/projects/new" className="flex items-center space-x-3 p-3 bg-white/[0.01] border border-white/[0.02] rounded-md hover:bg-white/[0.05] hover:border-white/5 transition-all group">
                        <FolderCode className="w-4 h-4 text-gray-600 group-hover:text-blue-500 transition-colors" />
                        <span className="text-[10px] font-bold uppercase tracking-tighter text-gray-500 group-hover:text-gray-200">Deploy Node</span>
                     </Link>
                     <Link href="/hackathons" className="flex items-center space-x-3 p-3 bg-white/[0.01] border border-white/[0.02] rounded-md hover:bg-white/[0.05] hover:border-white/5 transition-all group">
                        <Trophy className="w-4 h-4 text-gray-600 group-hover:text-blue-500 transition-colors" />
                        <span className="text-[10px] font-bold uppercase tracking-tighter text-gray-500 group-hover:text-gray-200">Registry List</span>
                     </Link>
                     <Link href="/settings" className="flex items-center space-x-3 p-3 bg-white/[0.01] border border-white/[0.02] rounded-md hover:bg-white/[0.05] hover:border-white/5 transition-all group">
                        <Settings className="w-4 h-4 text-gray-600 group-hover:text-blue-500 transition-colors" />
                        <span className="text-[10px] font-bold uppercase tracking-tighter text-gray-500 group-hover:text-gray-200">System Preferences</span>
                     </Link>
                  </div>
               </div>
            </div>

            {/* Recent Activity */}
            <div className="lg:col-span-2">
               <div className="bg-[#0c0c0c] border border-white/5 p-8 rounded-lg">
                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/[0.02]">
                     <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-600 flex items-center space-x-2">
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Recent Operations</span>
                     </h3>
                     <button className="text-[9px] text-gray-700 font-bold uppercase hover:text-blue-500 transition-colors">Audit History →</button>
                  </div>
                  
                  <div className="space-y-4">
                     {[
                       { title: 'Node "SecureVault" parameters updated', time: '2h ago', status: 'verified' },
                       { title: 'Subscribed to CyberShield sprint challenge', time: '1d ago', status: 'active' },
                       { title: 'Identity credential verification complete', time: '3d ago', status: 'verified' }
                     ].map((item, i) => (
                       <div key={i} className="flex items-start space-x-4 p-4 bg-white/[0.01] border border-white/[0.02] hover:border-white/5 rounded-md transition-all group">
                          <div className="w-2 h-2 mt-1 rounded-full bg-blue-600/30 group-hover:bg-blue-600 transition-colors"></div>
                          <div className="flex-grow">
                             <p className="text-[11px] font-bold text-gray-400 group-hover:text-white transition-colors uppercase tracking-tight">{item.title}</p>
                             <div className="flex items-center justify-between mt-2">
                                <p className="text-[9px] text-gray-700 font-bold uppercase tracking-widest">{item.time}</p>
                                <span className="text-[8px] font-bold uppercase tracking-tighter text-gray-600 bg-white/5 px-1.5 py-0.5 rounded">{item.status}</span>
                             </div>
                          </div>
                       </div>
                     ))}
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default DashboardPage;
