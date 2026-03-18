'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/store/useAuthStore';
import { LayoutDashboard, FolderCode, Trophy, MessageSquare, Settings, Bell, ExternalLink, Terminal, Gavel, Activity, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function DashboardPage() {
  const user = useAuthStore((state) => state.user);
  const role = useAuthStore((state) => state.role) || 'viewer';
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const res = await fetch(`${baseUrl}/users/stats`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!res.ok) throw new Error('Failed to fetch telemetry data.');
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error('Fetch Stats Error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statItems = [
    { label: 'My Projects', value: stats?.activeProjects || 0, icon: FolderCode, color: 'text-blue-500' },
    { label: 'Events Joined', value: stats?.eventsJoined || 0, icon: Trophy, color: 'text-violet-500' },
    { label: 'Reputation Points', value: (stats?.totalPoints || 0).toLocaleString(), icon: Activity, color: 'text-emerald-500' },
  ];

  return (
    <div className="space-y-12">
      {/* Dashboard Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black italic uppercase tracking-tighter text-white mb-2 flex items-center space-x-4">
             <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-600/20 flex items-center justify-center">
                <LayoutDashboard className="w-6 h-6 text-blue-500" />
             </div>
             <span>{role} Dashboard</span>
          </h1>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] italic flex items-center">
             <Activity className="w-3.5 h-3.5 mr-2 text-blue-500 animate-pulse" />
             Logged in as: <span className="text-gray-300 ml-1">@{user?.username || 'user'}</span> 
             <span className="mx-3 opacity-20">|</span> 
             Status: <span className="text-emerald-500 ml-1">Online</span>
          </p>
        </div>
        <div className="flex items-center space-x-4">
            <button className="p-3 bg-[#0c0c0c] border border-white/5 rounded-xl hover:bg-white/[0.05] hover:border-blue-500/20 transition-all relative group">
              <Bell className="w-4 h-4 text-gray-700 group-hover:text-blue-500 transition-colors" />
              <span className="absolute top-3 right-3 w-1.5 h-1.5 bg-blue-500 rounded-full animate-ping"></span>
            </button>
            <Link href="/dashboard/profile" className="bg-white/5 hover:bg-white/10 text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/5 flex items-center space-x-3 transition-all italic">
              <span>Edit Profile</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {loading ? (
          [1,2,3].map(i => (
            <div key={i} className="h-32 bg-[#0c0c0c] border border-white/5 rounded-2xl animate-pulse" />
          ))
        ) : (
          statItems.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#0c0c0c] border border-white/5 p-8 rounded-2xl flex items-center space-x-8 hover:border-blue-500/20 hover:bg-white/[0.01] transition-all relative overflow-hidden group shadow-2xl"
            >
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-600 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="p-4 rounded-xl bg-[#050505] border border-white/5 group-hover:border-blue-500/30 transition-colors shadow-inner">
                <stat.icon className={cn("w-6 h-6", stat.color)} />
              </div>
              <div>
                  <p className="text-3xl font-black text-white italic tracking-tighter group-hover:text-blue-400 transition-colors">{stat.value}</p>
                  <p className="text-[10px] font-black text-gray-700 uppercase tracking-widest mt-1 italic">{stat.label}</p>
              </div>
            </motion.div>
          ))
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-1 space-y-6">
            <div className="bg-[#0c0c0c] border border-white/5 p-8 rounded-3xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-[0.02]">
                 <Terminal className="w-20 h-20" />
              </div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-700 mb-8 flex items-center space-x-3 italic">
                <Terminal className="w-4 h-4 text-blue-500" />
                <span>Quick Actions</span>
              </h3>
              <div className="space-y-3">
                  <Link href="/dashboard/projects/new" className="flex items-center justify-between p-5 bg-[#050505] border border-white/5 rounded-2xl hover:bg-blue-600/10 hover:border-blue-500/30 transition-all group/item">
                    <div className="flex items-center space-x-4">
                       <FolderCode className="w-4 h-4 text-gray-700 group-hover/item:text-blue-500 transition-colors" />
                       <span className="text-[10px] font-black uppercase tracking-widest text-gray-600 group-hover/item:text-white transition-colors italic">New Project</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-800 group-hover/item:text-blue-500 transition-colors" />
                  </Link>
                  <Link href="/dashboard/hackathons" className="flex items-center justify-between p-5 bg-[#050505] border border-white/5 rounded-2xl hover:bg-emerald-600/10 hover:border-emerald-500/30 transition-all group/item">
                    <div className="flex items-center space-x-4">
                       <Trophy className="w-4 h-4 text-gray-700 group-hover/item:text-emerald-500 transition-colors" />
                       <span className="text-[10px] font-black uppercase tracking-widest text-gray-600 group-hover/item:text-white transition-colors italic">My Hackathons</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-800 group-hover/item:text-emerald-500 transition-colors" />
                  </Link>
                  <Link href="/dashboard/settings" className="flex items-center justify-between p-5 bg-[#050505] border border-white/5 rounded-2xl hover:bg-indigo-600/10 hover:border-indigo-500/30 transition-all group/item">
                    <div className="flex items-center space-x-4">
                       <Settings className="w-4 h-4 text-gray-700 group-hover/item:text-indigo-500 transition-colors" />
                       <span className="text-[10px] font-black uppercase tracking-widest text-gray-600 group-hover/item:text-white transition-colors italic">Settings</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-800 group-hover/item:text-indigo-500 transition-colors" />
                  </Link>
              </div>
            </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2">
            <div className="bg-[#0c0c0c] border border-white/5 p-10 rounded-3xl relative group">
              <div className="flex items-center justify-between mb-10 pb-6 border-b border-white/[0.03]">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-700 flex items-center space-x-3 italic">
                    <MessageSquare className="w-4 h-4 text-blue-500" />
                    <span>Recent Activity</span>
                  </h3>
                  <button className="text-[9px] text-gray-700 font-black uppercase tracking-[0.1em] hover:text-blue-500 transition-colors italic">View All →</button>
              </div>
              
              <div className="space-y-4">
                  {[
                    { title: 'Project settings updated', time: '2h ago', status: 'DONE', icon: Activity },
                    { title: 'Joined upcoming hackathon', time: '1d ago', status: 'ACTIVE', icon: Trophy },
                    { title: 'Password changed successfully', time: '3d ago', status: 'DONE', icon: Gavel }
                  ].map((item, i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ x: 6 }}
                      className="flex items-center space-x-6 p-5 bg-[#050505] border border-white/5 hover:border-blue-500/20 rounded-2xl transition-all shadow-inner group/log"
                    >
                      <div className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-gray-800 group-hover/log:border-blue-500/20 group-hover/log:text-blue-500 transition-all">
                         <item.icon className="w-4 h-4" />
                      </div>
                      <div className="flex-grow">
                          <p className="text-[11px] font-bold text-gray-400 group-hover/log:text-white transition-colors uppercase tracking-tight italic">{item.title}</p>
                          <div className="flex items-center justify-between mt-3">
                            <p className="text-[9px] text-gray-700 font-black uppercase tracking-widest">:: {item.time}</p>
                            <span className="text-[8px] font-black uppercase tracking-widest text-blue-500 bg-blue-500/5 px-2.5 py-1 rounded border border-blue-500/10 italic shadow-2xl">{item.status}</span>
                          </div>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}
