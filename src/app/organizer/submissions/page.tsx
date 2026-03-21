'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileCode, 
  Search, 
  Filter, 
  Lock, 
  Unlock, 
  Download, 
  Github, 
  ExternalLink, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  MoreVertical, 
  ChevronRight, 
  Loader2, 
  Zap, 
  History,
  Eye,
  Settings,
  ShieldAlert,
  Award,
  Trash2,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { OrganizerCrudModal } from '@/components/organizer/OrganizerCrudModal';

export default function SubmissionManagement() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [locked, setLocked] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSub, setSelectedSub] = useState<any>(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${baseUrl}/organizer/submissions`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      if (res.ok) {
        setSubmissions(await res.json());
      }
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateSub = async (id: string, updates: any) => {
    setSaving(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${baseUrl}/organizer/submissions/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(updates)
      });
      if (res.ok) fetchSubmissions();
    } catch (err) {}
    finally { setSaving(false); setModalOpen(false); }
  };

  const deleteSub = async (id: string) => {
    if (!confirm('Delete this solution forever?')) return;
    setSaving(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      await fetch(`${baseUrl}/organizer/submissions/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      fetchSubmissions();
    } catch (err) {}
    finally { setSaving(false); setModalOpen(false); }
  };

  const handleOpenModal = (sub: any) => {
    setSelectedSub(sub);
    setScore(sub.score || 0);
    setModalOpen(true);
  };

  const StatusBadge = ({ status }: { status: string }) => {
    const styles: any = {
      verified: "bg-blue-500/10 border-blue-500/20 text-blue-500 shadow-sm",
      completed: "bg-blue-500/10 border-blue-500/20 text-blue-500",
      pending: "bg-white/5 border-white/10 text-gray-500",
      rejected: "bg-red-500/10 border-red-500/20 text-red-500",
    };
    return (
      <div className={cn("px-2.5 py-1 rounded-lg border text-[8px] font-black uppercase tracking-widest flex items-center italic transition-all", styles[status] || styles.pending)}>
         <div className={cn("w-1 h-1 rounded-full mr-2", (status === 'verified' || status === 'completed') ? "bg-blue-500 shadow-lg animate-pulse" : status === 'pending' ? "bg-gray-700" : "bg-red-500")} />
         {status}
      </div>
    );
  };

  if (loading) {
     return (
       <div className="flex flex-col items-center justify-center h-[50vh] space-y-4 text-center">
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
          <p className="text-[9px] font-black uppercase tracking-widest text-gray-700 italic">Syncing Audit Registry...</p>
       </div>
     );
  }

  return (
    <div className="space-y-8 pb-12 text-left">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between items-start gap-6 border-b border-white/[0.03] pb-6">
         <div className="space-y-2 text-left">
            <div className="flex items-center space-x-2">
               <FileCode className="w-4 h-4 text-blue-500" />
               <span className="text-[9px] font-black uppercase tracking-widest text-gray-700 italic">Submission Audit Center</span>
            </div>
            <h1 className="text-2xl font-black italic uppercase tracking-tighter text-white">Solution <span className="text-blue-500 ml-1">Nodes</span></h1>
            <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest italic leading-relaxed max-w-lg">
               Verify project files, audit tech stacks, and verify hackathon submissions.
            </p>
         </div>

         <div className="flex items-center space-x-4">
            <button 
              onClick={() => setLocked(!locked)}
              className={cn(
                 "flex items-center space-x-3 px-8 py-3 rounded-xl transition-all shadow-xl active:scale-95 group",
                 locked ? "bg-red-600/10 border border-red-600/20 text-red-500" : "bg-blue-600/10 border border-blue-600/20 text-blue-500"
              )}
            >
               {locked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
               <span className="text-[9px] font-black uppercase tracking-widest italic text-white">{locked ? 'Terminal Locked' : 'Accepting Submissions'}</span>
            </button>
         </div>
      </header>

      {/* Table */}
      <div className="bg-[#0c0c0c] border border-white/5 rounded-2xl overflow-hidden shadow-xl text-left">
         <table className="w-full text-left min-w-[1000px]">
            <thead>
               <tr className="text-[9px] font-black text-gray-700 uppercase tracking-widest italic border-b border-white/[0.05]">
                  <th className="px-6 py-6 font-black capitalize italic">Solution Node</th>
                  <th className="px-6 py-6 font-black capitalize italic">Lead Hub</th>
                  <th className="px-6 py-6 font-black capitalize italic">Verification Status</th>
                  <th className="px-6 py-6 font-black capitalize italic">Performance Index</th>
                  <th className="px-6 py-6 text-right font-black capitalize italic">Actions</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.03]">
               {submissions.map((s, i) => (
                 <tr key={s._id} className="group hover:bg-white/[0.01] transition-all">
                    <td className="px-6 py-5 text-left">
                       <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-blue-500/20 transition-all shadow-lg">
                             <FileCode className="w-5 h-5 text-gray-800 group-hover:text-blue-500" />
                          </div>
                          <div className="flex flex-col text-left">
                             <span className="text-[11px] font-black text-white uppercase italic tracking-tighter truncate leading-none mb-1 group-hover:text-blue-500">{s.title}</span>
                             <div className="flex items-center space-x-2">
                                <Github className="w-3 h-3 text-gray-800" />
                                <span className="text-[8px] font-bold text-gray-700 uppercase tracking-widest truncate max-w-[150px] italic">{s.github_url || 'N/A'}</span>
                             </div>
                          </div>
                       </div>
                    </td>
                    <td className="px-6 py-5 text-left">
                        <span className="text-[10px] font-black text-white italic group-hover:text-blue-500 transition-colors uppercase">@{s.created_by?.username || 'unknown'}</span>
                    </td>
                    <td className="px-6 py-5 text-left">
                       <div className="w-fit"><StatusBadge status={s.status} /></div>
                    </td>
                    <td className="px-6 py-5 text-left">
                       <div className="flex flex-col space-y-1.5 min-w-[120px]">
                          <span className="text-[10px] font-black text-blue-500 italic leading-none">{s.score || 0} PTS</span>
                          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden shadow-inner">
                             <motion.div initial={{ width: 0 }} animate={{ width: `${s.score || 0}%` }} className="h-full bg-blue-600 shadow-[0_0_10px_rgba(59,130,246,0.4)]" />
                          </div>
                       </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                       <div className="flex items-center justify-end space-x-2">
                          <button onClick={() => handleOpenModal(s)} className="p-2 bg-white/5 border border-white/10 rounded-lg text-gray-700 hover:text-blue-500 transition-all shadow-sm"><Settings className="w-3.5 h-3.5" /></button>
                          <Link href={s.github_url || '#'} target="_blank" className="p-2 bg-white/5 border border-white/10 rounded-lg text-gray-700 hover:text-white transition-all shadow-sm"><ExternalLink className="w-3.5 h-3.5" /></Link>
                       </div>
                    </td>
                 </tr>
               ))}
            </tbody>
         </table>
      </div>

      <OrganizerCrudModal
         isOpen={modalOpen}
         onClose={() => setModalOpen(false)}
         title="Solution Verification Node"
         subtitle={`Audit protocol for ${selectedSub?.title || 'Selected Solution'}`}
         loading={saving}
         onSave={() => selectedSub && updateSub(selectedSub._id, { score, status: 'verified' })}
         saveLabel="Finalize Audit"
         onDelete={() => selectedSub && deleteSub(selectedSub._id)}
         deleteLabel="Purge Node"
      >
         <div className="space-y-8 text-left">
            <div className="space-y-4 text-left">
               <label className="flex items-center space-x-2"><Award className="w-4 h-4 text-blue-500" /> <span>Quality Score Matrix</span></label>
               <input 
                 type="range" 
                 min="0" 
                 max="100" 
                 value={score} 
                 onChange={(e) => setScore(Number(e.target.value))}
                 className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-600"
               />
               <div className="flex justify-between items-center bg-[#050505] p-4 rounded-xl border border-white/5 shadow-inner">
                  <span className="text-[12px] font-black text-white italic tracking-widest">{score}%</span>
                  <span className="text-[8px] font-bold text-gray-700 uppercase tracking-widest italic">{score > 80 ? 'Exceptional Node' : score > 50 ? 'Standard Protocol' : 'Low Integrity'}</span>
               </div>
            </div>

            <div className="space-y-2 text-left">
                <label className="flex items-center space-x-2 text-left"><Zap className="w-3.5 h-3.5" /> <span>Protocol Status Access</span></label>
                <div className="grid grid-cols-2 gap-3">
                   {['verified', 'auditing', 'rejected'].map(s => (
                      <button 
                        key={s}
                        onClick={() => selectedSub && updateSub(selectedSub._id, { status: s })}
                        className={cn(
                           "px-4 py-3 rounded-xl border text-[9px] font-black uppercase tracking-widest italic text-left transition-all",
                           s === 'verified' ? "hover:bg-blue-600/10 hover:border-blue-600/20 hover:text-blue-500" : "hover:bg-white/5 hover:border-white/10 text-gray-600 hover:text-white"
                        )}
                      >
                         {s} Status
                      </button>
                   ))}
                </div>
            </div>

            <div className="flex items-start space-x-4 bg-red-600/5 border border-red-600/10 p-6 rounded-3xl">
               <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
               <p className="text-[9px] text-gray-700 font-bold uppercase tracking-widest italic leading-relaxed">
                  Warning: Solution verification is a permanent audit protocol modification. Deleting a node will remove all associated telemetry and source links.
               </p>
            </div>
         </div>
      </OrganizerCrudModal>
    </div>
  );
}
