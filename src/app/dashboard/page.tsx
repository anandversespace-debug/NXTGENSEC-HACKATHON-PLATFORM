'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/store/useAuthStore';
import { LayoutDashboard, FolderCode, Trophy, MessageSquare, Settings, Bell, ExternalLink, Terminal, Gavel, Activity, ChevronRight, Clock, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function DashboardPage() {
  const user = useAuthStore((state) => state.user);
  const role = useAuthStore((state) => state.role) || 'viewer';
  const [stats, setStats] = useState<any>(null);
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingActivity, setLoadingActivity] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const res = await fetch(`${baseUrl}/users/stats`, {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          credentials: 'include'
        });
        if (res.ok) {
           const data = await res.json();
           setStats(data);
        }
      } catch (err: any) {
        console.error('Fetch Stats Critical Error:', err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchActivity = async () => {
       try {
          const token = localStorage.getItem('token');
          const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
          const res = await fetch(`${baseUrl}/notifications`, {
             headers: { 'Authorization': `Bearer ${token}` }
          });
          if (res.ok) {
             const data = await res.json();
             setActivities(data.slice(0, 3));
          }
       } catch (err) {
          console.error(err);
       } finally {
          setLoadingActivity(false);
       }
    };

    fetchStats();
    fetchActivity();
  }, []);

  const statItems = [
    { label: 'My Projects', value: stats?.activeProjects || 0, icon: FolderCode, color: 'text-blue-500' },
    { label: 'Events Joined', value: stats?.eventsJoined || 0, icon: Trophy, color: 'text-violet-500' },
    { label: 'Reputation Points', value: (stats?.totalPoints || 0).toLocaleString(), icon: Activity, color: 'text-emerald-500' },
  ];

  return (
    <div className="space-y-12 text-left">
      {/* Dashboard Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black italic uppercase tracking-tighter text-white mb-2 flex items-center space-x-4">
             <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-600/20 flex items-center justify-center">
                <LayoutDashboard className="w-6 h-6 text-blue-500" />
             </div>
             <span>{role} Dashboard</span>
          </h1>
          <p className="text-[10px] text-gray-700 font-bold uppercase tracking-[0.2em] italic flex items-center">
             <Activity className="w-3.5 h-3.5 mr-2 text-blue-500 animate-pulse" />
             Operator: <span className="text-gray-400 ml-1">@{user?.username || 'user'}</span> 
             <span className="mx-3 opacity-20">|</span> 
             Status: <span className="text-emerald-500 ml-1">Online</span>
          </p>
        </div>
        <div className="flex items-center space-x-4">
            <Link href="/dashboard/notifications" className="p-3 bg-[#0c0c0c] border border-white/5 rounded-xl hover:bg-white/[0.05] hover:border-blue-500/20 transition-all relative group shadow-xl">
               <Bell className="w-4 h-4 text-gray-700 group-hover:text-blue-500 transition-colors" />
               {activities.some(a => !a.isRead) && (
                 <span className="absolute top-3 right-3 w-1.5 h-1.5 bg-blue-500 rounded-full animate-ping"></span>
               )}
            </Link>
            <Link href="/dashboard/settings" className="bg-white/5 hover:bg-white/10 text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/5 flex items-center space-x-3 transition-all italic shadow-lg">
               <span>Edit Profile</span>
               <ExternalLink className="w-3.5 h-3.5" />
            </Link>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {loading ? (
          [1,2,3].map(i => (
            <div key={i} className="h-32 bg-[#0c0c0c] border border-white/5 rounded-2xl animate-pulse shadow-xl" />
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
                <stat.icon className={cn("w-6 h-6 transition-transform group-hover:scale-110", stat.color)} />
              </div>
              <div className="text-left">
                  <p className="text-3xl font-black text-white italic tracking-tighter group-hover:text-blue-400 transition-colors">{stat.value}</p>
                  <p className="text-[10px] font-black text-gray-700 uppercase tracking-widest mt-1 italic leading-none">{stat.label}</p>
              </div>
            </motion.div>
          ))
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left">
        {/* Quick Actions */}
        <div className="lg:col-span-1 space-y-6">
            <div className="bg-[#0c0c0c] border border-white/5 p-8 rounded-3xl relative overflow-hidden group shadow-2xl">
              <div className="absolute top-0 right-0 p-6 opacity-[0.01]">
                 <Terminal className="w-20 h-20" />
              </div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-800 mb-8 flex items-center space-x-3 italic">
                <Terminal className="w-4 h-4 text-blue-500" />
                <span>Command actions</span>
              </h3>
              <div className="space-y-3">
                  <Link href="/dashboard/projects/new" className="flex items-center justify-between p-5 bg-[#050505] border border-white/5 rounded-2xl hover:bg-blue-600/5 hover:border-blue-500/20 transition-all group/item">
                    <div className="flex items-center space-x-4">
                       <FolderCode className="w-4 h-4 text-gray-800 group-hover/item:text-blue-500 transition-colors" />
                       <span className="text-[10px] font-black uppercase tracking-widest text-gray-600 group-hover/item:text-white transition-colors italic">New Project</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-800 group-hover/item:text-blue-500 transition-colors" />
                  </Link>
                  <Link href="/dashboard/hackathons" className="flex items-center justify-between p-5 bg-[#050505] border border-white/5 rounded-2xl hover:bg-emerald-600/5 hover:border-emerald-500/20 transition-all group/item">
                    <div className="flex items-center space-x-4">
                       <Trophy className="w-4 h-4 text-gray-800 group-hover/item:text-emerald-500 transition-colors" />
                       <span className="text-[10px] font-black uppercase tracking-widest text-gray-600 group-hover/item:text-white transition-colors italic">Explore Events</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-800 group-hover/item:text-emerald-500 transition-colors" />
                  </Link>
                  <Link href="/dashboard/settings" className="flex items-center justify-between p-5 bg-[#050505] border border-white/5 rounded-2xl hover:bg-indigo-600/5 hover:border-indigo-500/20 transition-all group/item">
                    <div className="flex items-center space-x-4">
                       <Settings className="w-4 h-4 text-gray-800 group-hover/item:text-indigo-500 transition-colors" />
                       <span className="text-[10px] font-black uppercase tracking-widest text-gray-600 group-hover/item:text-white transition-colors italic">Settings hub</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-800 group-hover/item:text-indigo-500 transition-colors" />
                  </Link>
              </div>
            </div>
        </div>

        {/* Recent Activity (Synchronized Notifications) */}
        <div className="lg:col-span-2">
            <div className="bg-[#0c0c0c] border border-white/5 p-8 rounded-3xl relative group shadow-2xl h-full flex flex-col">
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/[0.03]">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-800 flex items-center space-x-3 italic">
                    <MessageSquare className="w-4 h-4 text-blue-500" />
                    <span>Recent activity logs</span>
                  </h3>
                  <Link href="/dashboard/notifications" className="text-[9px] text-gray-700 font-black uppercase tracking-widest hover:text-blue-500 transition-colors italic">All entries →</Link>
              </div>
              
              <div className="space-y-3 flex-1">
                  {loadingActivity ? (
                     <div className="flex items-center justify-center py-12 opacity-30">
                        <Loader2 className="w-6 h-6 animate-spin" />
                     </div>
                  ) : activities.length === 0 ? (
                     <div className="flex flex-col items-center justify-center py-12 opacity-20 space-y-4">
                        <Bell className="w-10 h-10" />
                        <p className="text-[9px] font-black uppercase italic tracking-widest leading-none">Registry clear</p>
                     </div>
                  ) : (
                    activities.map((item, i) => (
                      <motion.div 
                        key={item._id} 
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center space-x-6 p-4 bg-[#050505] border border-white/5 hover:border-blue-500/20 rounded-2xl transition-all shadow-inner group/log text-left"
                      >
                        <div className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-gray-800 group-hover/log:border-blue-500/30 group-hover/log:text-blue-500 transition-all shrink-0">
                           {item.type === 'security' ? <Gavel className="w-4 h-4" /> : item.type === 'hackathon' ? <Trophy className="w-4 h-4" /> : <Activity className="w-4 h-4" />}
                        </div>
                        <div className="flex-grow min-w-0">
                            <p className="text-[11px] font-bold text-gray-500 group-hover/log:text-white transition-colors uppercase tracking-tight italic truncate">{item.title}</p>
                            <div className="flex items-center justify-between mt-2">
                              <p className="text-[8px] text-gray-800 font-black uppercase tracking-widest font-mono">:: {new Date(item.createdAt).toLocaleDateString()}</p>
                              <span className={cn(
                                "text-[7px] font-black uppercase tracking-widest px-2 py-0.5 rounded border italic shadow-sm",
                                item.isRead ? "text-gray-700 border-white/5 bg-white/5" : "text-blue-500 border-blue-500/10 bg-blue-500/5 animate-pulse"
                              )}>
                                {item.isRead ? 'LOGGED' : 'ACTIVE'}
                              </span>
                            </div>
                        </div>
                      </motion.div>
                    ))
                  )}
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}
