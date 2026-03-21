'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Send, 
  Bell, 
  MessageSquare, 
  Zap, 
  Users, 
  Clock, 
  Search, 
  Plus, 
  CheckCircle2, 
  ChevronRight, 
  History, 
  Layout, 
  Settings,
  ShieldCheck,
  AlertTriangle,
  Loader2,
  CalendarDays,
  Target,
  Megaphone,
  MoreVertical,
  Tag,
  AlignLeft,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { OrganizerCrudModal } from '@/components/organizer/OrganizerCrudModal';

export default function CommunicationCenter() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'campaigns' | 'automation' | 'broadcast'>('campaigns');
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    type: 'broadcast',
    target: 'all'
  });

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${baseUrl}/notifications`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setCampaigns(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBroadcast = async () => {
    setSaving(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${baseUrl}/notifications/broadcast`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setModalOpen(false);
        fetchHistory();
      }
    } catch (err) {}
    finally { setSaving(false); }
  };

  const StatusBadge = ({ status }: { status: string }) => {
    const styles: any = {
      active: "bg-blue-600/10 border-blue-600/20 text-blue-500 shadow-sm shadow-blue-500/5",
      sent: "bg-white/5 border-white/10 text-gray-500",
      draft: "bg-white/5 border-white/10 text-gray-500",
    };
    return (
      <div className={cn("px-2.5 py-1 rounded-lg border text-[8px] font-black uppercase tracking-widest flex items-center italic transition-all", styles[status] || styles.sent)}>
         <div className={cn("w-1 h-1 rounded-full mr-2", status === 'active' ? "bg-blue-500 shadow-lg animate-pulse" : "bg-gray-700")} />
         {status || 'Sent'}
      </div>
    );
  };

  if (loading) {
     return (
       <div className="flex flex-col items-center justify-center h-[50vh] space-y-4 text-center">
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
          <p className="text-[9px] font-black uppercase tracking-widest text-gray-700 italic">Syncing message registry...</p>
       </div>
     );
  }

  return (
    <div className="space-y-8 pb-12 text-left">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between items-start gap-6 border-b border-white/[0.03] pb-6">
         <div className="space-y-2 text-left">
            <div className="flex items-center space-x-2">
               <Mail className="w-4 h-4 text-blue-500" />
               <span className="text-[9px] font-black uppercase tracking-widest text-gray-700 italic">Central Messaging Station</span>
            </div>
            <h1 className="text-2xl font-black italic uppercase tracking-tighter text-white">Event <span className="text-blue-500 ml-1">Communications</span></h1>
            <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest italic leading-relaxed max-w-lg">
               Initialize platform announcements and automated triggers for solution nodes.
            </p>
         </div>

         <div className="flex items-center space-x-3">
            <button onClick={() => setModalOpen(true)} className="flex items-center space-x-2 px-8 py-3 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-500 transition-all active:scale-95 group">
               <Plus className="w-4 h-4" />
               <span className="text-[9px] font-black uppercase tracking-widest italic font-bold">New Message</span>
            </button>
         </div>
      </header>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
         {/* New Campaign Card */}
         <motion.div 
            onClick={() => setModalOpen(true)}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center p-8 group cursor-pointer hover:border-blue-600/30 transition-all text-center space-y-4 bg-white/[0.01] shadow-inner min-h-[200px]"
         >
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:bg-blue-600/10 group-hover:border-blue-600/20 transition-all text-gray-800 group-hover:text-blue-500 shadow-sm">
               <Plus className="w-6 h-6" />
            </div>
            <div className="space-y-1 text-center">
               <span className="text-lg font-black text-gray-700 uppercase italic group-hover:text-white transition-colors block leading-none">Initialize Broadcast</span>
               <p className="text-[8px] font-bold text-gray-800 uppercase tracking-widest italic opacity-50">Global node transmission.</p>
            </div>
         </motion.div>

         {campaigns.map((c, i) => (
            <motion.div 
               key={c._id}
               initial={{ opacity: 0, scale: 0.98 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: i * 0.05 }}
               className="bg-[#0c0c0c] border border-white/5 rounded-2xl overflow-hidden group hover:border-blue-500/20 transition-all flex flex-col h-full text-left shadow-xl relative"
            >
               <div className="p-6 space-y-6 flex-1 text-left">
                  <div className="flex items-start justify-between">
                     <div className={cn("p-1.5 rounded-lg bg-white/5 border border-white/10 shadow-sm", c.type === 'error' ? "text-red-500" : "text-blue-500")}>
                        <Mail className="w-4 h-4" />
                     </div>
                     <StatusBadge status={c.isRead ? 'sent' : 'active'} />
                  </div>
                  
                  <div className="space-y-2 text-left">
                     <h3 className="text-lg font-black text-white italic uppercase tracking-tighter leading-none group-hover:text-blue-500 transition-colors line-clamp-2">
                        {c.title}
                     </h3>
                     <div className="flex items-center space-x-2 text-[8px] font-black uppercase tracking-widest text-gray-800 italic">
                        <Clock className="w-3.5 h-3.5 text-blue-500/30" />
                        <span>Sent: {new Date(c.createdAt).toLocaleDateString()}</span>
                     </div>
                  </div>

                  <p className="text-[9px] font-bold text-gray-600 line-clamp-2 italic uppercase leading-relaxed text-left">{c.message}</p>
               </div>

               <div className="px-6 pb-6 pt-4 flex items-center justify-between border-t border-white/[0.03] bg-white/[0.01]">
                  <div className="flex items-center space-x-2 text-gray-800">
                     <span className="text-[8px] font-black uppercase tracking-widest italic font-mono">{c.type || 'INFO'} PROTOCOL</span>
                  </div>
                  <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-all translate-x-1 group-hover:translate-x-0">
                     <button className="p-2 bg-blue-600/10 border border-blue-600/20 rounded-lg text-blue-500 hover:bg-blue-600 hover:text-white transition-all shadow-md"><Send className="w-4 h-4" /></button>
                  </div>
               </div>
            </motion.div>
         ))}
      </div>

      <OrganizerCrudModal
         isOpen={modalOpen}
         onClose={() => setModalOpen(false)}
         title="Initialize Broadcast"
         subtitle="Transmit a global mission announcement to solution nodes"
         loading={saving}
         onSave={handleBroadcast}
         saveLabel="Execute Broadcast"
      >
         <div className="space-y-6 text-left">
            <div className="space-y-2 text-left text-left">
               <label className="flex items-center space-x-2"><Tag className="w-3.5 h-3.5" /> <span>Message Header</span></label>
               <input 
                 type="text" 
                 value={formData.title}
                 onChange={(e) => setFormData({...formData, title: e.target.value})}
                 className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-800 focus:outline-none focus:border-blue-500/30 transition-all font-black text-[10px]"
                 placeholder="Announcement title..."
               />
            </div>

            <div className="space-y-2 text-left">
               <label className="flex items-center space-x-2 text-left"><AlignLeft className="w-3.5 h-3.5" /> <span>Transmission Payload</span></label>
               <textarea 
                 rows={4}
                 value={formData.message}
                 onChange={(e) => setFormData({...formData, message: e.target.value})}
                 className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-800 focus:outline-none focus:border-blue-500/30 transition-all font-black text-[10px] resize-none"
                 placeholder="Message body..."
               />
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2 text-left">
                  <label className="flex items-center space-x-2"><Target className="w-3.5 h-3.5" /> <span>Target Node Group</span></label>
                  <select 
                    value={formData.target}
                    onChange={(e) => setFormData({...formData, target: e.target.value})}
                    className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/30 transition-all font-black text-[10px]"
                  >
                     <option value="all">Global (All Nodes)</option>
                     <option value="developers">Solution Leads Only</option>
                     <option value="organizers">Cluster Admins Only</option>
                  </select>
               </div>
               <div className="space-y-2 text-left">
                  <label className="flex items-center space-x-2"><Megaphone className="w-3.5 h-3.5" /> <span>Signal Priority</span></label>
                  <select 
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/30 transition-all font-black text-[10px]"
                  >
                     <option value="info">Standard Info</option>
                     <option value="warning">Mission Warning</option>
                     <option value="success">Victory Protocol</option>
                  </select>
               </div>
            </div>

            <div className="bg-blue-600/5 border border-blue-600/10 p-6 rounded-3xl flex items-start space-x-4">
               <AlertCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
               <p className="text-[9px] text-gray-700 font-bold uppercase tracking-widest italic leading-relaxed">
                  Mission Note: Broadcast signals are delivered immediately to all selected nodes via real-time telemetry protocols and encrypted email clusters.
               </p>
            </div>
         </div>
      </OrganizerCrudModal>
    </div>
  );
}
