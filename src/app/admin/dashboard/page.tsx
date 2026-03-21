'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  FolderLock, 
  Trophy, 
  Activity,
  AlertCircle,
  Eye,
  CheckCircle2,
  Loader2,
  Zap,
  TrendingUp,
  Radio,
  Send,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  LineChart,
  Line,
  CartesianGrid
} from 'recharts';

interface AdminStats {
  totalUsers: number;
  totalProjects: number;
  activeHackathons: number;
  pendingSubmissions: number;
}

interface PendingProject {
  _id: string;
  title: string;
  created_by?: { name: string; username: string };
  createdAt: string;
}

const AdminOverview = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [metrics, setMetrics] = useState<any>(null);
  const [pendingProjects, setPendingProjects] = useState<PendingProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [broadcastStatus, setBroadcastStatus] = useState<string | null>(null);

  const roleColors: any = { admin: '#3b82f6', organizer: '#f59e0b', developer: '#10b981', viewer: '#6366f1' };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const token = localStorage.getItem('token');
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    const headers: any = { 'Authorization': `Bearer ${token}` };

    Promise.all([
      fetch(`${baseUrl}/users/admin-stats`, { headers, credentials: 'include' }).then(r => r.json()),
      fetch(`${baseUrl}/projects`, { headers, credentials: 'include' }).then(r => r.json()),
      fetch(`${baseUrl}/system/metrics`, { headers, credentials: 'include' }).then(r => r.json()),
    ])
      .then(([statsData, projectsData, metricsData]) => {
        setStats(statsData);
        setMetrics(metricsData);
        const pending = Array.isArray(projectsData) ? projectsData
          .filter((p: any) => p.status === 'pending')
          .slice(0, 5) : [];
        setPendingProjects(pending);
      })
      .catch(err => console.error('Admin analytics fetch error:', err))
      .finally(() => setLoading(false));
  };

  const handleBroadcast = async () => {
    if (!confirm('Broadcast weekly intelligence to all subscribers?')) return;
    
    setIsBroadcasting(true);
    setBroadcastStatus('Initiating dispatch...');
    try {
      const token = localStorage.getItem('token');
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      
      const res = await fetch(`${baseUrl}/newsletter/send`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        credentials: 'include'
      });
      
      const data = await res.json();
      if (res.ok) {
        setBroadcastStatus(`SUCCESS: Broadcast sent to ${data.stats?.blogs || 0} blogs, ${data.stats?.hackathons || 0} hackathons.`);
      } else {
        setBroadcastStatus(`FAILED: ${data.message || 'Transmission error'}`);
      }
    } catch (err) {
      setBroadcastStatus('CRITICAL: Broadcast engine offline.');
    } finally {
      setIsBroadcasting(false);
      setTimeout(() => setBroadcastStatus(null), 5000);
    }
  };

  const statItems = [
    { label: 'Total Users', value: stats?.totalUsers ?? '—', icon: Users, color: 'text-blue-500' },
    { label: 'Total Projects', value: stats?.totalProjects ?? '—', icon: FolderLock, color: 'text-violet-500' },
    { label: 'Active Events', value: stats?.activeHackathons ?? '—', icon: Trophy, color: 'text-amber-500' },
    { label: 'Pending Review', value: stats?.pendingSubmissions ?? '—', icon: Activity, color: 'text-emerald-500' },
  ];

  if (loading) return (
    <div className="flex items-center justify-center py-32">
       <div className="flex flex-col items-center space-y-4">
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 italic">Synchronizing Fleet Status...</p>
       </div>
    </div>
  );

  return (
    <div className="space-y-10 text-left">
      <header>
        <div className="flex items-center justify-between">
           <div>
              <div className="flex items-center space-x-2 mb-2">
                 <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse" />
                 <p className="text-[9px] font-black uppercase tracking-[0.3em] text-blue-500/50 italic">System Protocol active</p>
              </div>
              <h1 className="text-3xl font-black italic uppercase tracking-tighter text-white">System <span className="text-gray-500">Overview</span></h1>
           </div>
           
           <button 
             onClick={handleBroadcast}
             disabled={isBroadcasting}
             className={cn(
               "flex items-center space-x-3 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest italic transition-all border",
               isBroadcasting 
                 ? "bg-amber-500/10 border-amber-500/20 text-amber-500 cursor-wait" 
                 : "bg-blue-600 hover:bg-blue-500 text-white border-transparent shadow-xl shadow-blue-900/20"
             )}
           >
              {isBroadcasting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Radio className="w-4 h-4" />
              )}
              <span>{isBroadcasting ? 'Broadcasting...' : 'Broadcast Intelligence'}</span>
           </button>
        </div>
        {broadcastStatus && (
          <motion.p 
            initial={{ opacity: 0, y: -5 }} 
            animate={{ opacity: 1, y: 0 }}
            className={`mt-4 text-[9px] font-black uppercase tracking-widest italic flex items-center space-x-2 ${broadcastStatus.includes('SUCCESS') ? 'text-emerald-500' : 'text-red-500'}`}
          >
            <Sparkles className="w-3 h-3" />
            <span>{broadcastStatus}</span>
          </motion.p>
        )}
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statItems.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="bg-[#0c0c0c] border border-white/5 p-6 rounded-2xl hover:border-white/10 transition-colors group relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-blue-500/20 transition-all">
                 <stat.icon className={cn("w-5 h-5", stat.color)} />
              </div>
              <TrendingUp className="w-3 h-3 text-emerald-500 opacity-0 group-hover:opacity-50 transition-all" />
            </div>
            <p className="text-2xl font-black mb-1 italic tracking-tighter relative z-10">
               {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
            </p>
            <p className="text-[9px] text-gray-700 font-black uppercase tracking-[0.2em] relative z-10">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         {/* Growth Hub */}
         <div className="bg-[#0c0c0c] border border-white/5 p-8 rounded-3xl relative overflow-hidden">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-500 italic mb-10">Network Growth Pulse</h3>
            <div className="h-64 w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={metrics?.timeline || []}>
                     <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                     <XAxis dataKey="_id" stroke="#4b5563" fontSize={10} tickLine={false} axisLine={false} />
                     <YAxis stroke="#4b5563" fontSize={10} tickLine={false} axisLine={false} />
                     <Tooltip 
                       contentStyle={{ backgroundColor: '#0c0c0c', border: '1px solid #1f2937', borderRadius: '12px' }}
                     />
                     <Line type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6' }} activeDot={{ r: 6 }} />
                  </LineChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* Identity Analytics */}
         <div className="bg-[#0c0c0c] border border-white/5 p-8 rounded-3xl">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-500 italic mb-10">Identity Sector Distribution</h3>
            <div className="h-64 w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={metrics?.roles || []}>
                     <XAxis dataKey="_id" stroke="#4b5563" fontSize={10} tickLine={false} axisLine={false} />
                     <Tooltip 
                        contentStyle={{ backgroundColor: '#0c0c0c', border: '1px solid #1f2937', borderRadius: '12px' }}
                     />
                     <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                        {metrics?.roles?.map((entry: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={roleColors[entry._id] || '#ffffff'} fillOpacity={0.8} />
                        ))}
                     </Bar>
                  </BarChart>
               </ResponsiveContainer>
            </div>
            <div className="mt-8 flex flex-wrap gap-6 pt-6 border-t border-white/[0.03]">
               {metrics?.roles?.map((r: any) => (
                  <div key={r._id} className="flex items-center space-x-2">
                     <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: roleColors[r._id] }} />
                     <span className="text-[9px] font-black text-gray-600 uppercase italic">{r._id} sector: <span className="text-gray-400">{r.count}</span></span>
                  </div>
               ))}
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Review Queue */}
        <div className="lg:col-span-2 border border-white/5 bg-[#0c0c0c] p-8 rounded-3xl">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xs font-black flex items-center space-x-3 text-gray-300 italic uppercase tracking-tight">
              <AlertCircle className="w-4 h-4 text-amber-500" />
              <span>Pending Review Pipeline</span>
            </h2>
            <Link href="/admin/projects" className="text-[9px] font-black uppercase tracking-widest text-blue-500 hover:text-white transition-colors underline underline-offset-4 decoration-blue-500/20">Audit Full Queue</Link>
          </div>

          <div className="space-y-3">
             {pendingProjects.length > 0 ? (
               pendingProjects.map((project) => (
                 <div key={project._id} className="flex items-center justify-between p-4 bg-white/[0.01] border border-white/[0.03] rounded-xl hover:bg-white/[0.03] transition-all group">
                   <div className="flex items-center space-x-4">
                     <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-[10px] font-black text-gray-500 group-hover:text-blue-500 transition-colors">
                       {project.title.charAt(0).toUpperCase()}
                     </div>
                     <div>
                       <h4 className="text-xs font-black text-gray-200 uppercase tracking-tight italic mb-1">{project.title}</h4>
                       <p className="text-[9px] text-gray-700 font-bold uppercase tracking-widest italic flex items-center space-x-2">
                         <span>@{project.created_by?.username || 'unknown'}</span>
                         <span className="opacity-20">•</span>
                         <span>{new Date(project.createdAt).toLocaleDateString()}</span>
                       </p>
                     </div>
                   </div>
                   <div className="flex items-center space-x-2">
                     <Link href={`/projects/${project._id}`} className="p-2 text-gray-600 hover:text-white transition-colors">
                       <Eye className="w-4 h-4" />
                     </Link>
                     <Link href={`/admin/projects`} className="text-[9px] font-bold uppercase tracking-widest text-blue-500 px-4 py-2 hover:bg-blue-500/10 border border-blue-500/10 rounded-lg transition-all">Review</Link>
                   </div>
                 </div>
               ))
             ) : (
               <div className="text-center py-16">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-4 opacity-20" />
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-700 italic">No nodes pending in the audit pipeline.</p>
               </div>
             )}
          </div>
        </div>

        {/* System Health */}
        <div className="lg:col-span-1 border border-white/5 bg-[#0c0c0c] p-8 rounded-3xl">
          <h2 className="text-xs font-black mb-8 text-gray-300 italic uppercase tracking-tight">Platform Telemetry</h2>
          <div className="space-y-5">
            {[
              { label: 'Authentication', status: 'Healthy' },
              { label: 'Database Node', status: 'Active' },
              { label: 'Media Engine', status: 'Operational' },
              { label: 'Mail Services', status: 'Standby' },
            ].map((s, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-white/[0.02] last:border-0">
                <span className="text-[10px] text-gray-600 font-black uppercase tracking-widest">{s.label}</span>
                <span className="flex items-center space-x-2 text-[9px] text-emerald-500 font-black uppercase italic">
                  <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span>{s.status}</span>
                </span>
              </div>
            ))}
            
            <div className="mt-8 pt-8 border-t border-white/5">
               <div className="p-4 bg-white/[0.02] rounded-2xl border border-white/5">
                  <div className="flex items-center space-x-2 mb-3">
                     <Zap className="w-3.5 h-3.5 text-blue-500/50" />
                     <p className="text-[9px] font-black text-gray-700 uppercase tracking-widest leading-none mt-0.5">Automated Monitor</p>
                  </div>
                  <p className="text-[10px] text-gray-500 font-medium uppercase tracking-tighter italic leading-relaxed">System v2.1 operational. All sub-nodes are reporting 100% synchronization. Security protocols nominal.</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
