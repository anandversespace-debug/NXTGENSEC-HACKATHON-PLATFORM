'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  ChevronRight, 
  MoreVertical, 
  Download, 
  Upload, 
  UserPlus,
  Mail,
  ShieldCheck,
  Zap,
  Loader2,
  Trash2,
  ArrowUpRight,
  UserCheck,
  Plus,
  Settings,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { OrganizerCrudModal } from '@/components/organizer/OrganizerCrudModal';

export default function RegistrationManagement() {
  const [loading, setLoading] = useState(true);
  const [participants, setParticipants] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'approved' | 'waitlist' | 'rejected'>('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${baseUrl}/organizer/registrations`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      if (res.ok) {
        setParticipants(await res.json());
      }
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    setSaving(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${baseUrl}/organizer/registrations/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ status })
      });
      if (res.ok) fetchRegistrations();
    } catch (err) {}
    finally { setSaving(false); setModalOpen(false); }
  };

  const deleteEntry = async (id: string) => {
    if (!confirm('Delete this registration forever?')) return;
    setSaving(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      await fetch(`${baseUrl}/organizer/registrations/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      fetchRegistrations();
    } catch (err) {}
    finally { setSaving(false); setModalOpen(false); }
  };

  const StatusBadge = ({ status }: { status: string }) => {
    const styles: any = {
      approved: "bg-blue-600/10 border-blue-600/20 text-blue-500 shadow-sm shadow-blue-500/5",
      pending: "bg-white/5 border-white/10 text-gray-500",
      waitlist: "bg-blue-500/5 border-blue-500/10 text-blue-400 opacity-80",
      rejected: "bg-red-500/10 border-red-500/20 text-red-500",
    };
    return (
      <div className={cn("px-2.5 py-1 rounded-lg border text-[8px] font-black uppercase tracking-widest flex items-center italic transition-all", styles[status])}>
         <div className={cn("w-1 h-1 rounded-full mr-2", status === 'approved' ? "bg-blue-500 shadow-lg" : status === 'pending' ? "bg-gray-700" : status === 'waitlist' ? "bg-blue-400" : "bg-red-500")} />
         {status}
      </div>
    );
  };

  if (loading) {
     return (
       <div className="flex flex-col items-center justify-center h-[50vh] space-y-4 text-center">
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
          <p className="text-[9px] font-black uppercase tracking-widest text-gray-700 italic">Syncing Matrix Hub...</p>
       </div>
     );
  }

  const filtered = participants.filter(p => activeTab === 'all' || p.status === activeTab);

  return (
    <div className="space-y-8 pb-12 text-left">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between items-start gap-6 border-b border-white/[0.03] pb-6">
         <div className="space-y-2 text-left">
            <div className="flex items-center space-x-2">
               <Users className="w-4 h-4 text-blue-500" />
               <span className="text-[9px] font-black uppercase tracking-widest text-gray-700 italic">Participant Repository</span>
            </div>
            <h1 className="text-2xl font-black italic uppercase tracking-tighter text-white">Platform <span className="text-blue-500 ml-1">Registrations</span></h1>
            <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest italic leading-relaxed max-w-lg">
               Approve solutions, manage waitlists, and audit participant access.
            </p>
         </div>

         <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-8 py-3 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-500 transition-all active:scale-95 group">
                <Download className="w-4 h-4" />
                <span className="text-[9px] font-black uppercase tracking-widest italic font-bold">Export Logs</span>
            </button>
         </div>
      </header>

      {/* Tabs */}
      <div className="bg-[#0c0c0c] border border-white/5 p-1 rounded-xl flex items-center w-full md:w-auto overflow-x-auto scrollbar-hide shadow-inner">
         {['all', 'pending', 'approved', 'waitlist', 'rejected'].map((tab) => (
           <button 
             key={tab}
             onClick={() => setActiveTab(tab as any)}
             className={cn(
                "whitespace-nowrap px-6 py-2.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all italic",
                activeTab === tab ? "bg-blue-600/10 border border-blue-600/20 text-blue-500 shadow-sm" : "text-gray-700 hover:text-white"
             )}
           >
               {tab}
           </button>
         ))}
      </div>

      {/* Table */}
      <div className="bg-[#0c0c0c] border border-white/5 rounded-2xl overflow-hidden shadow-xl text-left">
         <table className="w-full text-left min-w-[900px]">
            <thead>
               <tr className="text-[9px] font-black text-gray-700 uppercase tracking-widest italic border-b border-white/[0.05]">
                  <th className="px-6 py-6">Identity Node</th>
                  <th className="px-6 py-6">Mission Module</th>
                  <th className="px-6 py-6">Status</th>
                  <th className="px-6 py-6">Team Hub</th>
                  <th className="px-6 py-6 text-right">Actions</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.03]">
               {filtered.map((p, i) => (
                 <tr key={p.id} className="group hover:bg-white/[0.01] transition-all">
                    <td className="px-6 py-5 text-left">
                       <div className="flex items-center space-x-4">
                          <div className="w-9 h-9 rounded-lg bg-blue-600/10 border border-blue-600/20 flex items-center justify-center text-[10px] font-black text-gray-600 group-hover:text-blue-500 transition-colors">
                             {p.username.substring(0, 2).toUpperCase()}
                          </div>
                          <div className="flex flex-col text-left">
                             <span className="text-[10px] font-black text-white uppercase italic tracking-tighter group-hover:text-blue-500 transition-colors">{p.name}</span>
                             <span className="text-[8px] font-bold text-gray-700 uppercase tracking-widest truncate">@{p.username}</span>
                          </div>
                       </div>
                    </td>
                    <td className="px-6 py-5 text-left">
                        <span className="text-[10px] font-black text-gray-600 uppercase italic whitespace-nowrap">{p.hackathon}</span>
                    </td>
                    <td className="px-6 py-5 text-left">
                       <div className="w-fit"><StatusBadge status={p.status} /></div>
                    </td>
                    <td className="px-6 py-5 text-left">
                       <span className="text-[9px] font-black uppercase tracking-widest italic text-blue-500/50">{p.team}</span>
                    </td>
                    <td className="px-6 py-5 text-right">
                       <div className="flex items-center justify-end space-x-2">
                          <button onClick={() => { setSelectedId(p.id); setModalOpen(true); }} className="p-2 bg-white/5 border border-white/10 rounded-lg text-gray-700 hover:text-blue-500 transition-all shadow-sm"><Settings className="w-4 h-4" /></button>
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
         title="Protocol Management"
         subtitle="Audit participant clearance and module status"
         loading={saving}
         onDelete={() => selectedId && deleteEntry(selectedId)}
         saveLabel="Update Integrity"
      >
         <div className="space-y-6">
            <div className="space-y-2">
               <label className="flex items-center space-x-2"><Zap className="w-3.5 h-3.5" /> <span>Operational Tier</span></label>
               <div className="grid grid-cols-2 gap-3">
                  {['approved', 'pending', 'waitlist', 'rejected'].map(s => (
                     <button 
                       key={s}
                       onClick={() => selectedId && updateStatus(selectedId, s)}
                       className={cn(
                          "px-4 py-3 rounded-xl border text-[9px] font-black uppercase tracking-widest italic text-left transition-all",
                          s === 'approved' ? "hover:bg-blue-600/10 hover:border-blue-600/20 hover:text-blue-500" : "hover:bg-white/5 hover:border-white/10 text-gray-600 hover:text-white"
                       )}
                     >
                        {s} Protocol
                     </button>
                  ))}
               </div>
            </div>
            
            <div className="bg-red-600/5 border border-red-600/10 p-6 rounded-2xl flex items-start space-x-4">
               <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
               <p className="text-[9px] text-gray-700 font-bold uppercase tracking-widest italic leading-relaxed">
                  Warning: Changing user node clearance may affect team integrity and project submission protocols in real-time.
               </p>
            </div>
         </div>
      </OrganizerCrudModal>
    </div>
  );
}
