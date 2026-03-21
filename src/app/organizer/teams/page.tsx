'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users2, 
  Search, 
  Filter, 
  ChevronRight, 
  MoreVertical, 
  Edit3, 
  Trash2, 
  ShieldCheck, 
  Sword, 
  Network, 
  Zap,
  Loader2,
  GitBranch,
  Split,
  Ban,
  Download,
  Terminal,
  Clock,
  LayoutGrid,
  List,
  Eye,
  UserCheck,
  Award,
  AlertCircle,
  XCircle,
  Settings
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { OrganizerCrudModal } from '@/components/organizer/OrganizerCrudModal';

export default function TeamManagement() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [teams, setTeams] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<any>(null);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${baseUrl}/organizer/teams`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      if (res.ok) {
        setTeams(await res.json());
      }
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateTeamStatus = async (teamName: string, status: string) => {
    setSaving(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${baseUrl}/organizer/teams?name=${encodeURIComponent(teamName)}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ status })
      });
      if (res.ok) fetchTeams();
    } catch (err) {}
    finally { setSaving(false); setModalOpen(false); }
  };

  const StatusBadge = ({ status }: { status: string }) => {
    const styles: any = {
      verified: "bg-blue-600/10 border-blue-600/20 text-blue-500 shadow-sm shadow-blue-500/5",
      pending: "bg-white/5 border-white/10 text-gray-500",
      disqualified: "bg-red-500/10 border-red-500/20 text-red-500",
    };
    return (
      <div className={cn("px-2 py-0.5 rounded-lg border text-[8px] font-black uppercase tracking-widest flex items-center italic transition-all", styles[status])}>
         <div className={cn("w-1 h-1 rounded-full mr-2", status === 'verified' ? "bg-blue-500 shadow-lg" : status === 'pending' ? "bg-gray-700" : "bg-red-500")} />
         {status}
      </div>
    );
  };

  if (loading) {
     return (
       <div className="flex flex-col items-center justify-center h-[50vh] space-y-4 text-center">
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
          <p className="text-[9px] font-black uppercase tracking-widest text-gray-700 italic">Syncing Team Registry...</p>
       </div>
     );
  }

  return (
    <div className="space-y-8 pb-12 text-left">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between items-start gap-6 border-b border-white/[0.03] pb-6">
         <div className="space-y-2 text-left">
            <div className="flex items-center space-x-2">
               <Users2 className="w-4 h-4 text-blue-500" />
               <span className="text-[9px] font-black uppercase tracking-widest text-gray-700 italic">Central Team Matrix</span>
            </div>
            <h1 className="text-2xl font-black italic uppercase tracking-tighter text-white">Event <span className="text-blue-500 ml-1">Teams</span></h1>
            <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest italic leading-relaxed max-w-lg">
               Approve or disqualify solution teams to ensure platform integrity.
            </p>
         </div>

         <div className="flex items-center space-x-3">
             <div className="bg-[#0c0c0c] border border-white/10 rounded-xl flex items-center p-1 shadow-inner">
               <button onClick={() => setView('grid')} className={cn("p-2 rounded-lg transition-all", view === 'grid' ? "bg-blue-600/10 text-blue-500 shadow-sm" : "text-gray-700 hover:text-white")}>
                  <LayoutGrid className="w-3.5 h-3.5" />
               </button>
               <button onClick={() => setView('list')} className={cn("p-2 rounded-lg transition-all", view === 'list' ? "bg-blue-600/10 text-blue-500 shadow-sm" : "text-gray-700 hover:text-white")}>
                  <List className="w-3.5 h-3.5" />
               </button>
            </div>
            <button className="flex items-center space-x-2 px-8 py-3 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-500 transition-all active:scale-95 group">
                <Download className="w-4 h-4" />
                <span className="text-[9px] font-black uppercase tracking-widest italic font-bold text-white">Export Dataset</span>
            </button>
         </div>
      </header>

      {/* Grid View */}
      {view === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
           {teams.map((t, i) => (
             <motion.div 
               key={t.id}
               initial={{ opacity: 0, scale: 0.98 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: i * 0.05 }}
               className="bg-[#0c0c0c] border border-white/5 rounded-2xl overflow-hidden group hover:border-blue-500/20 transition-all flex flex-col h-full text-left relative shadow-xl"
             >
                <div className="p-6 space-y-6 flex-1 text-left">
                   <div className="flex items-start justify-between">
                      <StatusBadge status={t.status} />
                      <button onClick={() => { setSelectedTeam(t); setModalOpen(true); }} className="p-1.5 bg-white/5 border border-white/10 rounded-lg text-gray-700 hover:text-white transition-all">
                         <Settings className="w-4 h-4" />
                      </button>
                   </div>
                   
                   <div className="space-y-2 text-left">
                      <h3 className="text-xl font-black text-white italic uppercase tracking-tighter leading-none group-hover:text-blue-500 transition-colors line-clamp-1">
                         {t.name}
                      </h3>
                      <div className="flex items-center space-x-2 text-[8px] font-black uppercase tracking-widest text-gray-800 italic">
                         <Network className="w-3.5 h-3.5 text-blue-500/50" />
                         <span>Lead: @{t.leader}</span>
                      </div>
                   </div>

                   <div className="grid grid-cols-2 gap-3 items-center">
                      <div className="bg-white/[0.02] border border-white/5 p-4 rounded-xl flex flex-col items-center justify-center space-y-1 shadow-sm group-hover:bg-blue-600/[0.02] transition-all">
                         <span className="text-[14px] font-black text-white italic">{t.membersCount}</span>
                         <span className="text-[7px] font-bold text-gray-800 uppercase tracking-widest italic">Node Capacity</span>
                      </div>
                      <div className="bg-white/[0.02] border border-white/5 p-4 rounded-xl flex flex-col items-center justify-center space-y-1 shadow-sm group-hover:bg-blue-600/[0.02] transition-all">
                         <span className="text-[14px] font-black text-blue-500 italic">{t.score || 0}</span>
                         <span className="text-[7px] font-bold text-gray-800 uppercase tracking-widest italic">Audit Ranking</span>
                      </div>
                   </div>
                </div>

                <div className="px-6 pb-6 pt-4 flex items-center justify-between border-t border-white/[0.03] bg-white/[0.01]">
                   <div className="flex items-center space-x-2 text-gray-800">
                      <Terminal className="w-3 h-3 text-blue-500/50" />
                      <span className="text-[7px] font-black uppercase tracking-widest italic">{t.hackathon}</span>
                   </div>
                   <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-all translate-x-1 group-hover:translate-x-0">
                      <button onClick={() => { setSelectedTeam(t); setModalOpen(true); }} className="p-2 bg-white/5 border border-white/10 rounded-lg text-gray-700 hover:text-blue-500 transition-all shadow-sm"><Settings className="w-4 h-4" /></button>
                      <Link href={`/projects`} className="flex items-center space-x-2 px-4 py-2 bg-blue-600/10 border border-blue-600/20 text-blue-500 text-[9px] font-black uppercase italic rounded-lg hover:bg-blue-600 hover:text-white transition-all shadow-xl">
                         <span>Audit</span>
                         <ChevronRight className="w-3 h-3" />
                      </Link>
                   </div>
                </div>
             </motion.div>
           ))}
        </div>
      ) : (
        /* List View */
        <div className="bg-[#0c0c0c] border border-white/5 rounded-2xl overflow-hidden shadow-xl text-left transition-all">
           <table className="w-full text-left min-w-[900px]">
              <thead className="border-b border-white/[0.05]">
                 <tr className="text-[9px] font-black text-gray-700 uppercase tracking-widest italic">
                    <th className="px-6 py-6">Team / Cluster Identity</th>
                    <th className="px-6 py-6">Operational Lead</th>
                    <th className="px-6 py-6">Status</th>
                    <th className="px-6 py-6 text-right">Actions</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.03]">
                 {teams.map((t) => (
                    <tr key={t.id} className="group hover:bg-white/[0.01] transition-all">
                       <td className="px-6 py-5 text-left">
                          <div className="flex items-center space-x-4">
                             <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-blue-500/20 transition-colors text-gray-800 group-hover:text-blue-500 shadow-lg">
                                <Sword className="w-4 h-4" />
                             </div>
                             <div className="flex flex-col text-left">
                                <span className="text-[11px] font-black text-white uppercase italic tracking-tighter truncate leading-none mb-1 group-hover:text-blue-500 transition-colors">{t.name}</span>
                                <span className="text-[8px] font-bold text-gray-800 uppercase tracking-widest italic truncate">{t.hackathon}</span>
                             </div>
                          </div>
                       </td>
                       <td className="px-6 py-5 text-left">
                          <span className="text-[10px] font-black text-gray-600 uppercase italic group-hover:text-white transition-colors">@{t.leader}</span>
                       </td>
                       <td className="px-6 py-5 text-left">
                          <div className="w-fit"><StatusBadge status={t.status} /></div>
                       </td>
                       <td className="px-6 py-5 text-right">
                          <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-all translate-x-1 group-hover:translate-x-0">
                             <button onClick={() => { setSelectedTeam(t); setModalOpen(true); }} className="p-2 bg-white/5 border border-white/10 rounded-lg text-gray-700 hover:text-blue-500 transition-all shadow-sm"><Settings className="w-3.5 h-3.5" /></button>
                          </div>
                       </td>
                    </tr>
                 ))}
              </tbody>
           </table>
        </div>
      )}

      {/* CRUD Modal */}
      <OrganizerCrudModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Team Integrity Audit"
        subtitle={`Command tier for ${selectedTeam?.name || 'Selected Cluster'}`}
        loading={saving}
        onSave={() => selectedTeam && updateTeamStatus(selectedTeam.name, (selectedTeam.status === 'verified' ? 'pending' : 'verified'))}
        saveLabel={selectedTeam?.status === 'verified' ? "Request Re-Audit" : "Verify Protocol"}
        onDelete={() => selectedTeam && updateTeamStatus(selectedTeam.name, 'disqualified')}
        deleteLabel="Disqualify Module"
      >
        <div className="space-y-6">
           <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => selectedTeam && updateTeamStatus(selectedTeam.name, 'verified')}
                className="flex flex-col items-center justify-center p-8 bg-blue-600/5 border border-white/5 rounded-3xl hover:bg-blue-600/10 hover:border-blue-600/20 transition-all group"
              >
                 <UserCheck className="w-8 h-8 text-blue-500 mb-3 group-hover:scale-110 transition-transform" />
                 <span className="text-[10px] font-black uppercase tracking-widest italic text-white">Approve Team</span>
              </button>
              <button 
                onClick={() => selectedTeam && updateTeamStatus(selectedTeam.name, 'disqualified')}
                className="flex flex-col items-center justify-center p-8 bg-red-600/5 border border-white/5 rounded-3xl hover:bg-red-600/10 hover:border-red-600/20 transition-all group"
              >
                 <Ban className="w-8 h-8 text-red-500 mb-3 group-hover:scale-110 transition-transform" />
                 <span className="text-[10px] font-black uppercase tracking-widest italic text-white">Revoke Access</span>
              </button>
           </div>
           
            <div className="bg-white/[0.02] border border-white/5 p-6 rounded-3xl space-y-4 shadow-inner">
               <h4 className="text-[9px] font-black text-gray-700 uppercase tracking-widest flex items-center italic">
                  <Award className="w-4 h-4 mr-3 text-blue-500" /> Scoring Node Parameters
               </h4>
               <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest italic text-left pt-1">Solution Quality Registry</span>
                  <span className="text-[11px] font-black text-white italic">{selectedTeam?.score || 0}% Performance</span>
               </div>
               <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${selectedTeam?.score || 0}%` }} className="h-full bg-blue-600 shadow-[0_0_10px_rgba(59,130,246,0.4)]" />
               </div>
            </div>

            <div className="flex items-start space-x-4 bg-red-600/5 border border-red-600/10 p-6 rounded-3xl">
               <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
               <p className="text-[9px] text-gray-700 font-bold uppercase tracking-widest italic leading-relaxed">
                  Warning: Revoking access will immediately disqualify all active nodes in this team from the hackathon marketplace and archive their solution data.
               </p>
            </div>
        </div>
      </OrganizerCrudModal>
    </div>
  );
}
