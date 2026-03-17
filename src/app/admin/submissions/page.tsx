'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Gavel, 
  Search, 
  CheckCircle, 
  XCircle, 
  Clock,
  ExternalLink,
  Code2
} from 'lucide-react';
import { cn } from '@/lib/utils';

const AdminSubmissions = () => {
  const submissions = [
    { 
      id: 's1', 
      project: 'QuantumSecure Node', 
      team: 'Team Alpha', 
      hackathon: 'CyberShield Global',
      score: 94, 
      status: 'winner',
      submitted_at: '2 days ago'
    },
    { 
      id: 's2', 
      project: 'DeFi Threat Radar', 
      team: '0xSecurity', 
      hackathon: 'DeFi Vulnerability Search',
      score: 82, 
      status: 'reviewed',
      submitted_at: '1 week ago'
    },
    { 
      id: 's3', 
      project: 'Zero Knowledge Chat', 
      team: 'PrivacyFirst', 
      hackathon: 'CyberShield Global',
      score: null, 
      status: 'pending',
      submitted_at: '5 hours ago'
    },
  ];

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold mb-0.5">Submissions</h1>
          <p className="text-xs text-gray-400 font-medium">Verify outputs and judge assignments.</p>
        </div>
        <div className="flex bg-[#0c0c0c] border border-white/5 rounded-lg p-1 w-64">
          <input 
            type="text" 
            placeholder="Search entries..." 
            className="bg-transparent border-none focus:outline-none px-3 py-1.5 flex-grow text-white text-[11px]"
          />
          <button className="p-1.5 text-gray-500 hover:text-white transition-colors">
            <Search className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      <div className="bg-[#0c0c0c] border border-white/5 rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-white/[0.02] border-b border-white/5">
            <tr>
              <th className="px-6 py-4 text-[9px] font-bold uppercase text-gray-500 tracking-wider">Project Entry</th>
              <th className="px-6 py-4 text-[9px] font-bold uppercase text-gray-500 tracking-wider">Target Event</th>
              <th className="px-6 py-4 text-[9px] font-bold uppercase text-gray-500 tracking-wider">Audit Score</th>
              <th className="px-6 py-4 text-[9px] font-bold uppercase text-gray-500 tracking-wider">Status</th>
              <th className="px-6 py-4 text-[9px] font-bold uppercase text-gray-500 tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.02]">
            {submissions.map((sub, i) => (
              <tr key={sub.id} className="hover:bg-white/[0.01] transition-colors group">
                <td className="px-6 py-4">
                   <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center">
                         <Code2 className="w-4 h-4 text-gray-400" />
                      </div>
                      <div>
                         <p className="text-xs font-bold text-gray-200 uppercase tracking-tight mb-1">{sub.project}</p>
                         <p className="text-[10px] text-gray-500 font-bold uppercase">By {sub.team}</p>
                      </div>
                   </div>
                </td>
                <td className="px-6 py-4">
                   <span className="text-[10px] font-bold text-gray-400 italic">{sub.hackathon}</span>
                   <p className="text-[9px] text-gray-600 mt-1 uppercase tracking-widest">{sub.submitted_at}</p>
                </td>
                <td className="px-6 py-4">
                   {sub.score ? (
                      <span className="text-sm font-black text-white">{sub.score}<span className="text-gray-600 text-[10px]">/100</span></span>
                   ) : (
                      <span className="text-[10px] text-gray-600 italic font-medium">Awaiting judging</span>
                   )}
                </td>
                <td className="px-6 py-4">
                   <span className={cn(
                     "flex items-center space-x-1.5 text-[9px] font-bold uppercase tracking-widest w-fit",
                     sub.status === 'winner' ? "text-amber-500" :
                     sub.status === 'reviewed' ? "text-emerald-500" : "text-blue-500"
                   )}>
                      {sub.status === 'winner' && <CheckCircle className="w-3.5 h-3.5" />}
                      {sub.status === 'reviewed' && <CheckCircle className="w-3.5 h-3.5" />}
                      {sub.status === 'pending' && <Clock className="w-3.5 h-3.5" />}
                      <span>{sub.status}</span>
                   </span>
                </td>
                <td className="px-6 py-4 text-right">
                   <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-gray-500 hover:text-white bg-white/5 rounded transition-colors">
                         <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1.5 text-gray-500 hover:text-blue-400 bg-white/5 rounded transition-colors">
                         <Gavel className="w-3.5 h-3.5" />
                      </button>
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminSubmissions;
