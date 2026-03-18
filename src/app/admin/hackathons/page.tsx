'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Calendar, Plus, Edit2, Eye, MapPin, Loader2, X, Trash2, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Event {
  _id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  location?: string;
  prize_pool?: string;
  registration_link?: string;
  status?: string;
}

const AdminHackathons = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    start_date: '',
    end_date: '',
    location: '',
    prize_pool: '',
    registration_link: ''
  });

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem('token');
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${baseUrl}/hackathons`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setEvents(data);
      }
    } catch (err) {
      console.error('Failed to fetch hackathons:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const getStatus = (startDate: string, endDate: string) => {
    const today = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (today < start) return 'upcoming';
    if (today > end) return 'ended';
    return 'active';
  };

  const handleCreateOrUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    
    const method = editingEvent ? 'PUT' : 'POST';
    const url = editingEvent ? `${baseUrl}/hackathons/${editingEvent._id}` : `${baseUrl}/hackathons`;

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        fetchEvents();
        setShowModal(false);
        setEditingEvent(null);
        setFormData({ title: '', description: '', start_date: '', end_date: '', location: '', prize_pool: '', registration_link: '' });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Purge this event node from history?')) return;
    try {
      const token = localStorage.getItem('token');
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${baseUrl}/hackathons/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setEvents(prev => prev.filter(e => e._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const openEdit = (event: Event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      start_date: event.start_date.split('T')[0],
      end_date: event.end_date.split('T')[0],
      location: event.location || '',
      prize_pool: event.prize_pool || '',
      registration_link: event.registration_link || ''
    });
    setShowModal(true);
  };

  return (
    <div className="space-y-6 text-left">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black uppercase tracking-tighter italic">Global Events Registry</h1>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-none mt-1">Deploy and moderate ecosystem competitions.</p>
        </div>
        <button 
          onClick={() => { setEditingEvent(null); setFormData({ title: '', description: '', start_date: '', end_date: '', location: '', prize_pool: '', registration_link: '' }); setShowModal(true); }}
          className="bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black uppercase tracking-widest px-6 py-2.5 rounded-xl flex items-center space-x-2 transition-all shadow-xl shadow-blue-900/20 active:scale-95 italic"
        >
           <Plus className="w-4 h-4" />
           <span>Deploy Event Node</span>
        </button>
      </header>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, i) => {
            const status = getStatus(event.start_date, event.end_date);
            return (
              <motion.div
                key={event._id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="bg-[#0c0c0c] border border-white/5 p-6 rounded-2xl flex flex-col hover:border-blue-500/20 transition-all duration-300 group shadow-2xl relative"
              >
                <div className="flex items-center justify-between mb-5">
                   <span className={cn(
                     "text-[8px] font-black px-2 py-0.5 rounded-sm uppercase tracking-widest border italic",
                     status === 'active' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : 
                     status === 'upcoming' ? "bg-blue-500/10 text-blue-400 border-blue-500/20" : 
                     "bg-white/5 text-gray-500 border-white/5"
                   )}>
                     {status}
                   </span>
                   <div className="flex items-center space-x-2">
                      <button onClick={() => handleDelete(event._id)} className="p-1.5 text-gray-700 hover:text-red-500 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                   </div>
                </div>

                <h3 className="text-sm font-black mb-1 text-white uppercase tracking-tight group-hover:text-blue-500 transition-colors italic">{event.title}</h3>
                <div className="flex items-center space-x-1.5 text-gray-700 mb-8 font-mono text-[9px]">
                   <Calendar className="w-3 h-3 text-blue-500/50" />
                   <span>{new Date(event.start_date).toLocaleDateString()} — {new Date(event.end_date).toLocaleDateString()}</span>
                </div>

                <div className="bg-white/[0.01] border border-white/[0.03] rounded-xl p-4 mb-8 flex items-center justify-between">
                   <div className="text-left">
                      <p className="text-[8px] font-bold text-gray-600 uppercase tracking-widest mb-1.5">Prize Pool</p>
                      <p className="text-lg font-black text-white italic leading-none">{event.prize_pool || '$0.00'}</p>
                   </div>
                   <Trophy className="w-6 h-6 text-amber-500/20 group-hover:text-amber-500/40 transition-colors" />
                </div>

                <div className="mt-auto flex gap-3">
                  <button className="flex-1 flex items-center justify-center space-x-2 py-3 bg-white/[0.02] border border-white/5 rounded-xl hover:bg-white/[0.05] transition-all text-[9px] font-black uppercase tracking-widest text-gray-500 group-hover:text-gray-300 italic">
                     <Eye className="w-3.5 h-3.5" /> <span>Intel</span>
                  </button>
                  <button onClick={() => openEdit(event)} className="flex-1 flex items-center justify-center space-x-2 py-3 bg-blue-600/10 border border-blue-500/10 rounded-xl hover:bg-blue-600/20 transition-all text-[9px] font-black uppercase tracking-widest text-blue-500 italic">
                     <Edit2 className="w-3.5 h-3.5" /> <span>Configure</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
          {events.length === 0 && (
            <div className="col-span-full py-24 text-center border border-dashed border-white/5 rounded-3xl">
               <Trophy className="w-12 h-12 text-gray-800 mx-auto mb-4 opacity-30" />
               <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-700 italic">No events found in registry nodes.</p>
            </div>
          )}
        </div>
      )}

      {/* Editor Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 text-left">
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowModal(false)} className="absolute inset-0 bg-black/70 backdrop-blur-md" />
             <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-2xl bg-[#080808] border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
                <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
                   <h2 className="text-xs font-black uppercase tracking-[0.2em] text-white italic">{editingEvent ? 'Reconfigure Event Node' : 'Deploy New Competition Node'}</h2>
                   <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-white"><X className="w-5 h-5" /></button>
                </div>
                <form onSubmit={handleCreateOrUpdate} className="p-8 grid grid-cols-2 gap-6">
                   <div className="col-span-2">
                      <label className="text-[9px] font-black text-gray-700 uppercase tracking-widest mb-2 block italic">Event Title</label>
                      <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-[#050505] border border-white/10 rounded-xl p-4 text-xs text-white focus:border-blue-500 transition-all" placeholder="E.g., Quantum Secure 2024" />
                   </div>
                   <div className="col-span-2">
                      <label className="text-[9px] font-black text-gray-700 uppercase tracking-widest mb-2 block italic">Cyber Descriptor</label>
                      <textarea required rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-[#050505] border border-white/10 rounded-xl p-4 text-xs text-white focus:border-blue-500 transition-all resize-none" placeholder="Detailed mission objectives..." />
                   </div>
                   <div>
                      <label className="text-[9px] font-black text-gray-700 uppercase tracking-widest mb-2 block italic">Start Timestamp</label>
                      <input type="date" required value={formData.start_date} onChange={e => setFormData({...formData, start_date: e.target.value})} className="w-full bg-[#050505] border border-white/10 rounded-xl p-4 text-xs text-white focus:border-blue-500 transition-all" />
                   </div>
                   <div>
                      <label className="text-[9px] font-black text-gray-700 uppercase tracking-widest mb-2 block italic">End Timestamp</label>
                      <input type="date" required value={formData.end_date} onChange={e => setFormData({...formData, end_date: e.target.value})} className="w-full bg-[#050505] border border-white/10 rounded-xl p-4 text-xs text-white focus:border-blue-500 transition-all" />
                   </div>
                   <div>
                      <label className="text-[9px] font-black text-gray-700 uppercase tracking-widest mb-2 block italic">Deployment Zone</label>
                      <input value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full bg-[#050505] border border-white/10 rounded-xl p-4 text-xs text-white focus:border-blue-500 transition-all" placeholder="Virtual / Physical Location" />
                   </div>
                   <div>
                      <label className="text-[9px] font-black text-gray-700 uppercase tracking-widest mb-2 block italic">Reputation Pool</label>
                      <input value={formData.prize_pool} onChange={e => setFormData({...formData, prize_pool: e.target.value})} className="w-full bg-[#050505] border border-white/10 rounded-xl p-4 text-xs text-white focus:border-blue-500 transition-all" placeholder="$50,000 + Credits" />
                   </div>
                   <div className="col-span-2">
                      <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-xl flex items-center justify-center space-x-3 transition-all shadow-xl shadow-blue-900/20 active:scale-[0.98]">
                         <span className="text-[10px] font-black uppercase tracking-widest">{editingEvent ? 'Synchronize Matrix' : 'Initialize Deployment'}</span>
                         <CheckCircle2 className="w-4 h-4" />
                      </button>
                   </div>
                </form>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminHackathons;
