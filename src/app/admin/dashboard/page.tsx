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
  Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

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
  const [pendingProjects, setPendingProjects] = useState<PendingProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    const headers: any = { 'Authorization': `Bearer ${token}` };

    Promise.all([
      fetch(`${baseUrl}/users/admin-stats`, { headers }).then(r => r.json()),
      fetch(`${baseUrl}/projects`, { headers }).then(r => r.json()),
    ])
      .then(([statsData, projectsData]) => {
        setStats(statsData);
        const pending = Array.isArray(projectsData) ? projectsData
          .filter((p: any) => p.status === 'pending')
          .slice(0, 5) : [];
        setPendingProjects(pending);
      })
      .catch(err => console.error('Admin stats fetch error:', err))
      .finally(() => setLoading(false));
  }, []);

  const statItems = [
    { label: 'Total Users', value: stats?.totalUsers ?? '—', icon: Users, color: 'text-blue-500' },
    { label: 'Live Projects', value: stats?.totalProjects ?? '—', icon: FolderLock, color: 'text-violet-500' },
    { label: 'Active Events', value: stats?.activeHackathons ?? '—', icon: Trophy, color: 'text-amber-500' },
    { label: 'Pending Review', value: stats?.pendingSubmissions ?? '—', icon: Activity, color: 'text-emerald-500' },
  ];

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-xl font-bold mb-1">Dashboard Overview</h1>
        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest leading-loose">Real-time platform activity.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statItems.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="bg-[#0c0c0c] border border-white/5 p-4 rounded-lg hover:border-white/10 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <stat.icon className={cn("w-4 h-4 opacity-70", stat.color)} />
            </div>
            {loading ? (
              <div className="h-8 w-16 bg-white/5 animate-pulse rounded mt-1" />
            ) : (
              <p className="text-xl font-bold mb-0.5 italic tracking-tighter">{typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}</p>
            )}
            <p className="text-[10px] text-gray-700 font-black uppercase tracking-widest">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Review Queue */}
        <div className="lg:col-span-2 border border-white/5 bg-[#0c0c0c] p-6 rounded-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-bold flex items-center space-x-2 text-gray-300 italic uppercase tracking-tight">
              <AlertCircle className="w-4 h-4 text-amber-500" />
              <span>Pending Review</span>
            </h2>
            <Link href="/admin/projects" className="text-[10px] font-bold uppercase tracking-widest text-blue-500 hover:text-blue-400 transition-colors">All Projects</Link>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
            </div>
          ) : pendingProjects.length > 0 ? (
            <div className="space-y-2">
              {pendingProjects.map((project) => (
                <div key={project._id} className="flex items-center justify-between p-3 bg-white/[0.01] border border-white/[0.03] rounded-md hover:bg-white/[0.03] transition-all group">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded bg-white/5 border border-white/5 flex items-center justify-center text-[10px] font-bold text-gray-400 group-hover:text-blue-400 transition-colors">
                      {project.title.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-200 uppercase tracking-tighter">{project.title}</h4>
                      <p className="text-[9px] text-gray-700 font-bold uppercase tracking-widest italic">
                        @{project.created_by?.username || 'unknown'} • {new Date(project.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Link href={`/projects/${project._id}`} className="p-1.5 text-gray-600 hover:text-white transition-colors">
                      <Eye className="w-3.5 h-3.5" />
                    </Link>
                    <Link href={`/admin/projects`} className="text-[9px] font-bold uppercase tracking-widest text-blue-500 px-3 py-1.5 hover:bg-blue-500/10 border border-blue-500/10 rounded transition-all">Audit</Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-3 opacity-50" />
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-600 italic">All nodes verified. No pending reviews.</p>
            </div>
          )}
        </div>

        {/* System Status */}
        <div className="lg:col-span-1 border border-white/5 bg-[#0c0c0c] p-6 rounded-lg">
          <h2 className="text-sm font-bold mb-6 text-gray-300 italic uppercase tracking-tight">System Hub</h2>
          <div className="space-y-4">
            {[
              { label: 'Auth Gateway', status: 'Healthy' },
              { label: 'MongoDB Atlas', status: 'Connected' },
              { label: 'Cloudinary CDN', status: 'Operational' },
              { label: 'Nodemailer SMTP', status: 'Active' },
            ].map((s, i) => (
              <div key={i} className="flex items-center justify-between py-1 border-b border-white/[0.02] last:border-0">
                <span className="text-xs text-gray-500 uppercase tracking-widest font-bold text-[10px]">{s.label}</span>
                <span className="flex items-center space-x-1.5 text-[9px] text-emerald-500 font-bold uppercase tracking-tighter italic">
                  <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_5px_rgba(16,185,129,0.5)]"></div>
                  <span>{s.status}</span>
                </span>
              </div>
            ))}
            
            <div className="mt-6 pt-6 border-t border-white/5">
              <div className="p-3 bg-blue-500/[0.02] rounded border border-blue-500/5">
                <div className="flex items-center space-x-2 mb-2">
                   <CheckCircle2 className="w-3.5 h-3.5 text-blue-500/50" />
                   <p className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">Platform Status</p>
                </div>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter italic leading-relaxed">All core infrastructure components are operational and responding within tolerance.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
