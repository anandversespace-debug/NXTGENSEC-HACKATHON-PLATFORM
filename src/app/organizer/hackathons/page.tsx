'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit3, 
  Eye, 
  Trash2, 
  Copy, 
  FileText,
  CheckCircle2,
  Clock,
  LayoutGrid,
  List,
  ChevronRight,
  Loader2,
  Calendar,
  Lock,
  Globe,
  Settings,
  Mail,
  Zap,
  Tag,
  AlignLeft,
  DollarSign,
  Link2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { OrganizerCrudModal } from '@/components/organizer/OrganizerCrudModal';

export default function OrganizerHackathons() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [hackathons, setHackathons] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    start_date: '',
    end_date: '',
    prize_pool: 'Negotiable',
    status: 'draft',
    visibility: 'public'
  });

  useEffect(() => {
    fetchHackathons();
  }, []);

  const fetchHackathons = async () => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${baseUrl}/hackathons`);
      if (res.ok) {
        const data = await res.json();
        setHackathons(data);
      }
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (hack?: any) => {
    if (hack) {
      setEditingId(hack._id);
      setFormData({
        title: hack.title,
        description: hack.description,
        start_date: new Date(hack.start_date).toISOString().split('T')[0],
        end_date: new Date(hack.end_date).toISOString().split('T')[0],
        prize_pool: hack.prize_pool || 'Negotiable',
        status: hack.status || 'draft',
        visibility: hack.visibility || 'public'
      });
    } else {
      setEditingId(null);
      setFormData({
        title: '',
        description: '',
        start_date: '',
        end_date: '',
        prize_pool: 'Negotiable',
        status: 'draft',
        visibility: 'public'
      });
    }
    setModalOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `${baseUrl}/hackathons/${editingId}` : `${baseUrl}/hackathons`;
      
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        setModalOpen(false);
        fetchHackathons();
      }
    } catch (err) {
      console.error('Save error:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!editingId || !confirm('Delete this event node forever?')) return;
    
    setSaving(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${baseUrl}/hackathons/${editingId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (res.ok) {
        setModalOpen(false);
        fetchHackathons();
      }
    } catch (err) {
      console.error('Delete error:', err);
    } finally {
      setSaving(false);
    }
  };

  const StatusBadge = ({ status }: { status: string }) => {
    const styles: any = {
      live: "bg-blue-600/10 border-blue-600/20 text-blue-500 shadow-sm shadow-blue-500/5",
      draft: "bg-white/5 border-white/10 text-gray-500",
      completed: "bg-emerald-500/10 border-emerald-500/20 text-emerald-500 shadow-sm shadow-emerald-500/5",
    };
    const isActive = status === 'live' || status === 'active';
    return (
      <div className={cn("px-2.5 py-1 rounded-lg border text-[8px] font-black uppercase tracking-widest flex items-center italic transition-all", styles[status] || styles.draft)}>
         <div className={cn("w-1 h-1 rounded-full mr-2", isActive ? "bg-blue-500 shadow-lg animate-pulse" : "bg-gray-500")} />
         {status}
      </div>
    );
  };

  if (loading) {
     return (
       <div className="flex flex-col items-center justify-center h-[50vh] space-y-4 text-center">
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
          <p className="text-[9px] font-black uppercase tracking-widest text-gray-700 italic">Syncing Central Matrix...</p>
       </div>
     );
  }

  return (
    <div className="space-y-8 pb-12 text-left">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between items-start gap-6 border-b border-white/[0.03] pb-6">
         <div className="space-y-2 text-left">
            <div className="flex items-center space-x-2">
               <Trophy className="w-4 h-4 text-blue-500 shadow-md shadow-blue-500/10" />
               <span className="text-[9px] font-black uppercase tracking-widest text-gray-700 italic">Event Marketplace Command</span>
            </div>
            <h1 className="text-2xl font-black italic uppercase tracking-tighter text-white">Event <span className="text-blue-500 ml-1">Center</span></h1>
            <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest italic leading-relaxed max-w-lg">
               Initialize and monitor your hackathon clusters and participant nodes.
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
            <button onClick={() => handleOpenModal()} className="flex items-center space-x-2 px-8 py-3 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-500 transition-all active:scale-95 group">
                <Plus className="w-4 h-4" />
                <span className="text-[9px] font-black uppercase tracking-widest italic font-bold">New Hackathon</span>
            </button>
         </div>
      </header>

      {/* Grid View */}
      {view === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
           {hackathons.map((h, i) => (
             <motion.div 
               key={h._id}
               initial={{ opacity: 0, scale: 0.98 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: i * 0.05 }}
               className="bg-[#0c0c0c] border border-white/5 rounded-2xl overflow-hidden group hover:border-blue-500/20 transition-all flex flex-col h-full text-left relative shadow-xl"
             >
                <div className="p-6 space-y-6 flex-1 text-left">
                   <div className="flex items-start justify-between">
                      <StatusBadge status={h.status} />
                      <button onClick={() => handleOpenModal(h)} className="p-1.5 bg-white/5 border border-white/10 rounded-lg text-gray-700 hover:text-white transition-all">
                         <Settings className="w-4 h-4" />
                      </button>
                   </div>
                   
                   <div className="space-y-2 text-left">
                      <h3 className="text-xl font-black text-white italic uppercase tracking-tighter leading-none group-hover:text-blue-500 transition-colors line-clamp-1">
                         {h.title}
                      </h3>
                      <div className="flex items-center space-x-2 text-[8px] font-black uppercase tracking-widest text-gray-800 italic">
                         <Calendar className="w-3.5 h-3.5 text-blue-500/50" />
                         <span>Ends: {new Date(h.end_date).toLocaleDateString()}</span>
                      </div>
                   </div>

                   <p className="text-[9px] text-gray-600 font-bold uppercase tracking-widest italic line-clamp-2 leading-relaxed">
                      {h.description}
                   </p>
                </div>

                <div className="px-6 pb-6 pt-4 flex items-center justify-between border-t border-white/[0.03] bg-white/[0.01]">
                   <div className="flex items-center space-x-2 text-gray-800">
                      {h.visibility === 'public' ? <Globe className="w-3 h-3 text-blue-500/50" /> : <Lock className="w-3 h-3 text-red-500/50" />}
                      <span className="text-[7px] font-black uppercase tracking-widest italic">{h.visibility}</span>
                   </div>
                   <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-all translate-x-1 group-hover:translate-x-0">
                      <button onClick={() => handleOpenModal(h)} className="p-2 bg-white/5 border border-white/10 rounded-lg text-gray-700 hover:text-blue-500 transition-all" title="Edit"><Edit3 className="w-4 h-4" /></button>
                      <Link href={`/projects`} className="flex items-center space-x-2 px-4 py-2 bg-blue-600/10 border border-blue-600/20 text-blue-500 text-[9px] font-black uppercase italic rounded-lg hover:bg-blue-600 hover:text-white transition-all">
                         <span>Overview</span>
                         <ChevronRight className="w-3 h-3" />
                      </Link>
                   </div>
                </div>
             </motion.div>
           ))}

           {/* Create New Project Tile */}
           <motion.div 
             onClick={() => handleOpenModal()}
             initial={{ opacity: 0, scale: 0.98 }}
             animate={{ opacity: 1, scale: 1 }}
             className="border-2 border-dashed border-white/5 rounded-2xl flex flex-col items-center justify-center p-8 group cursor-pointer hover:border-blue-600/30 transition-all text-center space-y-4 bg-white/[0.01] shadow-inner min-h-[250px]"
           >
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:bg-blue-600/10 group-hover:border-blue-600/20 transition-all text-gray-800 group-hover:text-blue-500 shadow-sm">
                 <Plus className="w-6 h-6" />
              </div>
              <div className="space-y-1 text-center">
                 <span className="text-lg font-black text-gray-700 uppercase italic group-hover:text-white transition-colors block">New Event Node</span>
                 <p className="text-[8px] font-bold text-gray-800 uppercase tracking-widest italic opacity-50">Transmit a new event to marketplace.</p>
              </div>
           </motion.div>
        </div>
      ) : (
        /* List View */
        <div className="bg-[#0c0c0c] border border-white/5 rounded-2xl overflow-hidden shadow-xl text-left transition-all">
           <table className="w-full text-left min-w-[900px]">
              <thead className="border-b border-white/[0.05]">
                 <tr className="text-[9px] font-black text-gray-700 uppercase tracking-widest italic">
                    <th className="px-6 py-6">Hackathon Node</th>
                    <th className="px-6 py-6">Status</th>
                    <th className="px-6 py-6">End Date</th>
                    <th className="px-6 py-6">Visibility</th>
                    <th className="px-6 py-6 text-right">Actions</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.03]">
                 {hackathons.map((h) => (
                    <tr key={h._id} className="group hover:bg-white/[0.01] transition-all">
                       <td className="px-6 py-5">
                          <div className="flex items-center space-x-4">
                             <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-blue-500/20 transition-colors text-gray-800 group-hover:text-blue-500">
                                <Trophy className="w-4 h-4" />
                             </div>
                             <div className="flex flex-col text-left">
                                <span className="text-[11px] font-black text-white uppercase italic tracking-tighter truncate leading-none mb-1 group-hover:text-blue-500 transition-colors">{h.title}</span>
                                <span className="text-[8px] font-bold text-gray-800 uppercase tracking-widest italic truncate">{h.prize_pool || 'Negotiable'} Prize</span>
                             </div>
                          </div>
                       </td>
                       <td className="px-6 py-5">
                          <div className="w-fit text-left"><StatusBadge status={h.status} /></div>
                       </td>
                       <td className="px-6 py-5 text-left">
                          <span className="text-[10px] font-mono font-bold text-gray-700 uppercase italic flex items-center">
                             <Clock className="w-3.5 h-3.5 mr-2 text-blue-500/50" /> {new Date(h.end_date).toLocaleDateString()}
                          </span>
                       </td>
                       <td className="px-6 py-5 text-left">
                          <span className="text-[8px] font-black uppercase tracking-widest italic text-gray-700">{h.visibility}</span>
                       </td>
                       <td className="px-6 py-5 text-right">
                          <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-all">
                             <button onClick={() => handleOpenModal(h)} className="p-2 bg-white/5 border border-white/10 rounded-lg text-gray-700 hover:text-blue-500 transition-all shadow-sm"><Edit3 className="w-3.5 h-3.5" /></button>
                             <button onClick={() => { setEditingId(h._id); handleDelete(); }} className="p-2 bg-white/5 border border-white/10 rounded-lg text-gray-700 hover:text-red-500 transition-all shadow-sm"><Trash2 className="w-3.5 h-3.5" /></button>
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
        title={editingId ? "Update Event Node" : "Initialize New Event"}
        subtitle={editingId ? `Refining protocol for ${formData.title}` : "Define mission parameters for marketplace broadcast"}
        onSave={handleSave}
        onDelete={editingId ? handleDelete : undefined}
        loading={saving}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {/* Title */}
           <div className="md:col-span-2 space-y-2">
              <label className="flex items-center space-x-2"><Tag className="w-3.5 h-3.5" /> <span>Event Identity</span></label>
              <input 
                type="text" 
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-800 focus:outline-none focus:border-blue-500/30 transition-all font-black text-[10px]"
                placeholder="Enter event name..."
              />
           </div>

           {/* Description */}
           <div className="md:col-span-2 space-y-2">
              <label className="flex items-center space-x-2"><AlignLeft className="w-3.5 h-3.5" /> <span>Payload details</span></label>
              <textarea 
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-800 focus:outline-none focus:border-blue-500/30 transition-all font-black text-[10px] resize-none"
                placeholder="Deployment summary..."
              />
           </div>

           {/* Start Date */}
           <div className="space-y-2">
              <label className="flex items-center space-x-2"><Calendar className="w-3.5 h-3.5" /> <span>Launch date</span></label>
              <input 
                type="date" 
                value={formData.start_date}
                onChange={(e) => setFormData({...formData, start_date: e.target.value})}
                className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/30 transition-all font-black text-[10px]"
              />
           </div>

           {/* End Date */}
           <div className="space-y-2">
              <label className="flex items-center space-x-2"><Clock className="w-3.5 h-3.5" /> <span>Terminal lock</span></label>
              <input 
                type="date" 
                value={formData.end_date}
                onChange={(e) => setFormData({...formData, end_date: e.target.value})}
                className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/30 transition-all font-black text-[10px]"
              />
           </div>

            {/* Prize Pool */}
            <div className="space-y-2">
               <label className="flex items-center space-x-2"><DollarSign className="w-3.5 h-3.5" /> <span>Reward module</span></label>
               <input 
                 type="text" 
                 value={formData.prize_pool}
                 onChange={(e) => setFormData({...formData, prize_pool: e.target.value})}
                 className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/30 transition-all font-black text-[10px]"
                 placeholder="e.g. $10,000"
               />
            </div>

            {/* Status */}
            <div className="space-y-2">
               <label className="flex items-center space-x-2"><Zap className="w-3.5 h-3.5" /> <span>Operational Tier</span></label>
               <select 
                 value={formData.status}
                 onChange={(e) => setFormData({...formData, status: e.target.value})}
                 className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/30 transition-all font-black text-[10px]"
               >
                  <option value="draft">Draft Protocol</option>
                  <option value="live">Live Transmission</option>
                  <option value="completed">Archive Entry</option>
               </select>
            </div>

            {/* Visibility */}
            <div className="space-y-2">
               <label className="flex items-center space-x-2"><Globe className="w-3.5 h-3.5" /> <span>Broadcast network</span></label>
               <select 
                 value={formData.visibility}
                 onChange={(e) => setFormData({...formData, visibility: e.target.value})}
                 className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/30 transition-all font-black text-[10px]"
               >
                  <option value="public">Global Node</option>
                  <option value="private">Encrypted Node</option>
               </select>
            </div>
        </div>
      </OrganizerCrudModal>
    </div>
  );
}
