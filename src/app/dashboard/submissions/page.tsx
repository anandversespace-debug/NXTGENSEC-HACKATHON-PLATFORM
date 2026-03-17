'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckSquare, 
  Search, 
  Code2, 
  Clock, 
  CheckCircle, 
  XCircle, 
  ChevronRight,
  TrendingUp,
  Activity,
  Award,
  ShieldAlert
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/useAuthStore';

export default function DashboardSubmissionsPage() {
  const user = useAuthStore((state) => state.user);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const token = localStorage.getItem('token');
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const res = await fetch(`${baseUrl}/projects/submissions`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!res.ok) throw new Error('Failed to fetch submission registry.');
        const data = await res.json();
        setSubmissions(data);
      } catch (err) {
        console.error('Fetch Submissions Error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSubmissions();
  }, []);

  const filteredSubmissions = submissions.filter(sub => 
    sub.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    sub.hackathon_id?.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isJudge = user?.role === 'judge' || user?.role === 'admin';

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-xl font-black uppercase tracking-tight italic mb-8 text-white">
            {isJudge ? 'Audit Queue' : 'Submission Logs'}
          </h1>
          <p className="text-xs text-gray-500 font-bold uppercase tracking-widest leading-loose">
            {isJudge 
              ? 'Evaluate and verify incoming project nodes for hackathon compliance.' 
              : 'Monitor the validation status and performance metrics of your active entries.'}
          </p>
        </div>
        
        <div className="flex bg-[#0c0c0c] border border-white/5 rounded-lg p-1 w-64 transition-colors focus-within:border-blue-500/30">
          <input 
            type="text" 
            placeholder="Search entries..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none focus:outline-none px-3 py-1.5 flex-grow text-white text-[11px] font-bold uppercase tracking-widest placeholder:text-gray-800"
          />
          <button className="p-1.5 text-gray-700 hover:text-white transition-colors">
            <Search className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {loading ? (
        <div className="py-20 text-center">
           <div className="text-blue-500 font-black italic animate-pulse tracking-widest uppercase text-xs">Accessing Submission Matrix...</div>
        </div>
      ) : (
        <div className="bg-[#0c0c0c] border border-white/5 rounded-2xl overflow-hidden mt-8 shadow-2xl">
          <table className="w-full text-left">
            <thead className="bg-[#080808] border-b border-white/[0.03]">
              <tr>
                <th className="px-8 py-5 text-[9px] font-black uppercase text-gray-700 tracking-[0.2em] italic">Project Node</th>
                <th className="px-8 py-5 text-[9px] font-black uppercase text-gray-700 tracking-[0.2em] italic">Mission Target</th>
                {isJudge && <th className="px-8 py-5 text-[9px] font-black uppercase text-gray-700 tracking-[0.2em] italic">Identity</th>}
                <th className="px-8 py-5 text-[9px] font-black uppercase text-gray-700 tracking-[0.2em] italic">Reputation</th>
                <th className="px-8 py-5 text-[9px] font-black uppercase text-gray-700 tracking-[0.2em] italic">Phase Status</th>
                <th className="px-8 py-5 text-[9px] font-black uppercase text-gray-700 tracking-[0.2em] italic text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.01]">
              {filteredSubmissions.map((sub, i) => (
                <tr key={sub._id} className="hover:bg-white/[0.01] transition-all group border-b border-white/[0.01] last:border-0">
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-xl bg-[#050505] border border-white/5 flex items-center justify-center group-hover:border-blue-500/30 transition-colors shadow-inner">
                        <Code2 className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform" />
                      </div>
                      <div>
                        <p className="text-xs font-black text-gray-200 uppercase tracking-tight mb-1 italic group-hover:text-blue-400 transition-colors">{sub.title}</p>
                        <p className="text-[8px] text-gray-700 font-black uppercase tracking-widest">SEQ: {sub._id.slice(-6).toUpperCase()}</p>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-8 py-6">
                    <span className="text-[10px] font-black text-gray-500 italic uppercase tracking-widest opacity-80 group-hover:opacity-100 transition-opacity">:: {sub.hackathon_id?.title || 'GENERAL_HUB'}</span>
                  </td>

                  {isJudge && (
                    <td className="px-8 py-6">
                      <span className="text-[10px] font-black text-gray-700 uppercase tracking-[0.15em] italic">
                        {sub.created_by?.name || 'ANON_NODE'}
                      </span>
                    </td>
                  )}
                  
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-2">
                       <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                       <span className="text-sm font-black text-white italic tracking-tighter">{sub.score}<span className="text-gray-800 text-[10px] ml-0.5">/100 CP</span></span>
                    </div>
                  </td>
                  
                  <td className="px-8 py-6">
                    <div className={cn(
                      "flex items-center space-x-2 text-[8px] font-black uppercase tracking-[0.2em] w-fit px-3 py-1 rounded border italic shadow-xl",
                      sub.status === 'verified' ? "text-emerald-500 border-emerald-500/20 bg-emerald-500/10" : 
                      sub.status === 'auditing' ? "text-blue-500 border-blue-500/20 bg-blue-500/10" :
                      "text-amber-500 border-amber-500/20 bg-amber-500/10"
                    )}>
                      {sub.status === 'verified' && <CheckCircle className="w-3 h-3" />}
                      {sub.status === 'auditing' && <Activity className="w-3 h-3 animate-pulse" />}
                      {sub.status === 'pending' && <Clock className="w-3 h-3" />}
                      <span>{sub.status}</span>
                    </div>
                  </td>
                  
                  <td className="px-8 py-6 text-right">
                    <Link 
                      href={`/dashboard/submissions/${sub._id}`}
                      className="inline-flex items-center justify-center space-x-2 px-5 py-2.5 bg-white/5 hover:bg-blue-600 hover:text-white text-gray-700 rounded-xl border border-white/5 hover:border-blue-500/30 transition-all text-[9px] font-black uppercase tracking-widest italic hover:scale-105 active:scale-95"
                    >
                      <span>{isJudge ? 'Execute Audit' : 'Node Logs'}</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </td>
                </tr>
              ))}
              {filteredSubmissions.length === 0 && (
                <tr>
                  <td colSpan={isJudge ? 6 : 5} className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center">
                       <ShieldAlert className="w-10 h-10 text-gray-800 mb-6 opacity-30" />
                       <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-800 italic">No entry logs detected in current matrix sector.</p>
                       {!isJudge && (
                         <Link href="/dashboard/hackathons" className="mt-8 text-blue-500 hover:text-blue-400 text-[9px] font-black uppercase tracking-widest italic border-b border-blue-500/20 pb-0.5">Initiate Submission</Link>
                       )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
