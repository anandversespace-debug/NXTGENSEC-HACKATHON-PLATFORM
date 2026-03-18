'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Gavel, 
  Search, 
  CheckCircle, 
  Clock,
  ExternalLink,
  Code2,
  Loader2,
  X,
  Trophy,
  Trash2,
  CheckCircle2
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Submission {
  _id: string;
  title: string;
  created_by: { name: string; username: string };
  hackathon_id: { _id: string; title: string };
  status: string;
  score?: number;
  github_url?: string;
  createdAt: string;
}

const AdminSubmissions = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSub, setSelectedSub] = useState<Submission | null>(null);
  const [grading, setGrading] = useState(false);
  const [formData, setFormData] = useState({ score: 0, status: 'pending' });

  const fetchSubmissions = async () => {
    try {
      const token = localStorage.getItem('token');
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${baseUrl}/projects/submissions`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setSubmissions(data);
      }
    } catch (err) {
      console.error('Failed to fetch submissions:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const handleGrade = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSub) return;
    setGrading(true);
    try {
      const token = localStorage.getItem('token');
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${baseUrl}/projects/${selectedSub._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        fetchSubmissions();
        setSelectedSub(null);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setGrading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Reject and purge this submission?')) return;
    try {
      const token = localStorage.getItem('token');
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${baseUrl}/projects/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setSubmissions(prev => prev.filter(s => s._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const openGrading = (sub: Submission) => {
    setSelectedSub(sub);
    setFormData({ score: sub.score || 0, status: sub.status });
  };

  const filteredSubmissions = submissions.filter(s => 
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.hackathon_id?.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 text-left">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-xl font-black uppercase tracking-tighter italic">Audit Queue</h1>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-none mt-1">Evaluate event entries and finalize rankings for live events.</p>
        </div>
        <div className="flex bg-[#0c0c0c] border border-white/5 rounded-xl p-1 w-64 focus-within:border-blue-500/30 transition-all">
          <input 
            type="text" 
            placeholder="Search entries..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none focus:outline-none px-3 py-1.5 flex-grow text-white text-[11px]"
          />
          <button className="p-1.5 text-gray-500 hover:text-white transition-colors">
            <Search className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
        </div>
      ) : (
        <div className="bg-[#0c0c0c] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
          <table className="w-full text-left">
            <thead className="bg-white/[0.02] border-b border-white/5">
              <tr>
                <th className="px-8 py-5 text-[9px] font-black uppercase text-gray-700 tracking-[0.2em]">Project Entry</th>
                <th className="px-8 py-5 text-[9px] font-black uppercase text-gray-700 tracking-[0.2em]">Target Event</th>
                <th className="px-8 py-5 text-[9px] font-black uppercase text-gray-700 tracking-[0.2em]">Audit Score</th>
                <th className="px-8 py-5 text-[9px] font-black uppercase text-gray-700 tracking-[0.2em]">Status</th>
                <th className="px-8 py-5 text-[9px] font-black uppercase text-gray-700 tracking-[0.2em] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.03]">
              {filteredSubmissions.map((sub, i) => (
                <tr key={sub._id} className="hover:bg-white/[0.01] transition-colors group">
                  <td className="px-8 py-5">
                     <div className="flex items-center space-x-4">
                        <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:bg-blue-600/10 group-hover:border-blue-500/30 transition-all">
                           <Code2 className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                        </div>
                        <div className="text-left">
                           <p className="text-xs font-black text-gray-200 uppercase tracking-tight mb-1 italic group-hover:text-blue-400 transition-all">{sub.title}</p>
                           <p className="text-[10px] text-gray-600 font-bold uppercase italic tracking-tighter">By @{sub.created_by?.username || 'unknown'}</p>
                        </div>
                     </div>
                  </td>
                  <td className="px-8 py-5 text-left">
                     <p className="text-[10px] font-black text-gray-200 italic uppercase tracking-tight tracking-widest">{sub.hackathon_id?.title || 'Standalone Project'}</p>
                     <p className="text-[9px] text-gray-700 mt-1.5 uppercase font-bold tracking-widest">{new Date(sub.createdAt).toLocaleDateString()}</p>
                  </td>
                  <td className="px-8 py-5 text-left">
                     {sub.score ? (
                        <span className="text-base font-black text-white italic">{sub.score}<span className="text-blue-500 text-[11px] ml-1">Pts</span></span>
                     ) : (
                        <span className="text-[10px] text-gray-600 italic font-bold uppercase tracking-widest leading-none">Awaiting evaluation</span>
                     )}
                  </td>
                  <td className="px-8 py-5 text-left">
                     <span className={cn(
                       "flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest w-fit italic px-2 py-0.5 rounded border",
                       sub.status === 'winner' ? "text-amber-500 border-amber-500/20 bg-amber-500/5" :
                       sub.status === 'verified' || sub.status === 'approved' ? "text-emerald-500 border-emerald-500/20 bg-emerald-500/5" : "text-blue-500 border-blue-500/20 bg-blue-500/5"
                     )}>
                        {sub.status === 'winner' && <CheckCircle className="w-3 h-3" />}
                        {sub.status === 'verified' && <CheckCircle className="w-3 h-3" />}
                        {sub.status === 'pending' && <Clock className="w-3 h-3" />}
                        <span>{sub.status || 'pending'}</span>
                     </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                     <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <a href={sub.github_url || '#'} target="_blank" className="p-2 text-gray-500 hover:text-white bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition-all">
                           <ExternalLink className="w-4 h-4" />
                        </a>
                        <button onClick={() => openGrading(sub)} className="p-2 text-gray-500 hover:text-blue-400 bg-white/5 rounded-xl border border-white/5 hover:border-blue-500/20 transition-all">
                           <Gavel className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(sub._id)} className="p-2 text-gray-500 hover:text-red-400 bg-white/5 rounded-xl border border-white/5 hover:border-red-500/20 transition-all">
                           <Trash2 className="w-4 h-4" />
                        </button>
                     </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredSubmissions.length === 0 && (
            <div className="py-24 text-center border-t border-white/5">
                <Gavel className="w-12 h-12 text-gray-800 mx-auto mb-4 opacity-30" />
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-700 italic">Audit queue is currently empty.</p>
            </div>
          )}
        </div>
      )}

      {/* Grading Modal */}
      <AnimatePresence>
        {selectedSub && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 text-left">
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedSub(null)} className="absolute inset-0 bg-black/70 backdrop-blur-md" />
             <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-lg bg-[#080808] border border-white/10 rounded-3xl shadow-2xl overflow-hidden p-8">
                <div className="flex items-start justify-between mb-8">
                   <div>
                      <h2 className="text-lg font-black text-white uppercase tracking-tight italic">Evaluate Entry</h2>
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">{selectedSub.title}</p>
                   </div>
                   <button onClick={() => setSelectedSub(null)} className="p-2 text-gray-500 hover:text-white"><X className="w-5 h-5" /></button>
                </div>

                <form onSubmit={handleGrade} className="space-y-6">
                   <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2 p-4 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center justify-between">
                         <div className="text-left">
                            <p className="text-[9px] font-black text-gray-700 uppercase tracking-widest mb-2 italic">Submission Score</p>
                            <input type="number" value={formData.score} onChange={e => setFormData({...formData, score: parseInt(e.target.value) || 0})} className="bg-transparent text-3xl font-black text-white focus:outline-none w-24 italic" />
                         </div>
                         <Trophy className="w-8 h-8 text-amber-500/30" />
                      </div>
                      <div className="col-span-2">
                         <label className="text-[9px] font-black text-gray-700 uppercase tracking-widest mb-2 block italic">Status Assignment</label>
                         <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full bg-[#050505] border border-white/10 rounded-xl p-4 text-xs text-white uppercase font-black appearance-none focus:border-blue-500 transition-all cursor-pointer italic">
                            <option value="pending">Under Review (Pending)</option>
                            <option value="verified">Verified Node (Approved)</option>
                            <option value="winner">Event Winner (Trophy)</option>
                         </select>
                      </div>
                   </div>

                   <button type="submit" disabled={grading} className="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-xl flex items-center justify-center space-x-3 transition-all shadow-xl shadow-blue-900/20 active:scale-[0.98]">
                      {grading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><span className="text-[10px] font-black uppercase tracking-widest">Commit Evaluation</span> <CheckCircle2 className="w-4 h-4" /></>}
                   </button>
                </form>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminSubmissions;
