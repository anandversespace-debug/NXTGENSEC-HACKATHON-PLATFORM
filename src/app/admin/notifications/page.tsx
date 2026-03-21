'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Megaphone, 
  Send, 
  History, 
  Settings2,
  Users,
  AlertCircle,
  Clock,
  Trash2,
  Loader2,
  Mail,
  Target
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AdminNotificationsPage() {
  const [message, setMessage] = useState('');
  const [target, setTarget] = useState('all');
  const [type, setType] = useState('info');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<any[]>([]);
  const [fetchingHistory, setFetchingHistory] = useState(true);

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
        // Since admin might want only broadcasts, but the route returns user-specific too, 
        // we might filter for global ones or just show all if admin.
        setHistory(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setFetchingHistory(false);
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${baseUrl}/notifications/broadcast`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        },
        body: JSON.stringify({ target, type, message, title: 'ADMIN BROADCAST' }) 
      });
      
      const data = await res.json();
      if (res.ok) {
        setMessage('');
        fetchHistory(); // Refresh
      } else {
        alert(`Error: ${data.error || 'Failed to send notification'}`);
      }
    } catch (err) {
      console.error(err);
      alert('Error sending notification.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 pb-12 text-left">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between items-start gap-6 border-b border-white/[0.03] pb-6">
         <div className="space-y-2 text-left">
            <div className="flex items-center space-x-2">
               <Megaphone className="w-4 h-4 text-blue-500 shadow-md shadow-blue-500/10" />
               <span className="text-[9px] font-black uppercase tracking-widest text-gray-700 italic">Global Broadcast Console</span>
            </div>
            <h1 className="text-2xl font-black italic uppercase tracking-tighter text-white">Create <span className="text-blue-500 ml-1">Announcement</span></h1>
            <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest italic leading-relaxed max-w-sm">
               Transmit messages across all platform segments and user terminal nodes.
            </p>
         </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left">
         {/* Broadcast Form */}
         <section className="bg-[#0c0c0c] border border-white/5 rounded-2xl p-8 space-y-8 relative overflow-hidden group shadow-xl">
            <div className="absolute top-0 right-0 p-8 opacity-[0.02] pointer-events-none group-hover:rotate-12 transition-transform duration-1000">
               <Send className="w-40 h-40 text-blue-500" />
            </div>
            <div className="relative z-10 space-y-2 text-left">
               <h3 className="text-xl font-black italic uppercase tracking-tighter text-white">Initiate <span className="text-blue-500 ml-1">Protocol</span></h3>
               <p className="text-[9px] text-gray-700 font-black uppercase tracking-widest italic">Configure transmission parameters for global node message.</p>
            </div>

            <form onSubmit={handleSend} className="space-y-6 relative z-10 text-left">
               <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-[9px] font-black text-gray-700 uppercase tracking-widest mb-2 block ml-1 italic">Target Segment</label>
                    <div className="relative group">
                       <Target className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-800 transition-colors group-focus-within:text-blue-500" />
                        <select 
                          value={target}
                          onChange={(e) => setTarget(e.target.value)}
                          className="w-full bg-[#050505] border border-white/10 rounded-xl py-3 pl-11 pr-5 text-[10px] font-black uppercase text-white focus:outline-none focus:border-blue-500/30 appearance-none shadow-inner"
                        >
                          <option value="all">All Terminals</option>
                          <option value="developers">Operator Base</option>
                          <option value="organizers">High Nodes</option>
                        </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-[9px] font-black text-gray-700 uppercase tracking-widest mb-2 block ml-1 italic">Transmission Tier</label>
                    <div className="relative group">
                       <AlertCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-800 transition-colors group-focus-within:text-blue-500" />
                        <select 
                          value={type}
                          onChange={(e) => setType(e.target.value)}
                          className="w-full bg-[#050505] border border-white/10 rounded-xl py-3 pl-11 pr-5 text-[10px] font-black uppercase text-white focus:outline-none focus:border-blue-500/30 appearance-none shadow-inner"
                        >
                          <option value="info">Tier 1: General</option>
                          <option value="warning">Tier 2: Alert</option>
                          <option value="urgent">Tier 3: Critical</option>
                        </select>
                    </div>
                  </div>
               </div>

               <div>
                  <label className="text-[9px] font-black text-gray-700 uppercase tracking-widest mb-2 block ml-1 italic">Message Payload</label>
                  <textarea 
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    className="w-full bg-[#050505] border border-white/10 rounded-xl py-4 px-5 text-[10px] font-mono text-gray-300 focus:outline-none focus:border-blue-500/30 resize-none shadow-inner leading-relaxed"
                    placeholder="Enter message content for broadcast dispatch..."
                  />
               </div>

                <div className="pt-2 flex justify-end">
                  <button disabled={loading} type="submit" className="w-full md:w-auto px-10 py-4 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest italic rounded-xl hover:bg-blue-500 transition-all shadow-xl active:scale-95 disabled:opacity-50 flex items-center justify-center space-x-3 group">
                     <Send className={cn("w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1", loading && "animate-pulse")} />
                     <span>{loading ? 'Disseminating...' : 'Execute Dispatch'}</span>
                  </button>
               </div>
            </form>
         </section>

         {/* Log / History */}
         <section className="bg-white/[0.01] border border-white/5 rounded-2xl p-8 flex flex-col h-full overflow-hidden group shadow-xl text-left">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/[0.03]">
               <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shadow-inner">
                     <History className="w-5 h-5 text-gray-700" />
                  </div>
                  <div className="text-left">
                     <h2 className="text-lg font-black italic uppercase tracking-tighter text-gray-400">Log <span className="text-gray-700 uppercase ml-2">History</span></h2>
                     <p className="text-[8px] font-black uppercase tracking-widest text-gray-800 italic">Previous Dispatches</p>
                  </div>
               </div>
               <button onClick={fetchHistory} className="p-2 text-gray-700 hover:text-blue-500 transition-colors"><Clock className="w-4 h-4" /></button>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 space-y-4 scrollbar-hide">
               {fetchingHistory ? (
                  <div className="flex flex-col items-center justify-center py-20 space-y-4 opacity-30">
                     <Loader2 className="w-6 h-6 animate-spin" />
                     <span className="text-[8px] font-black uppercase tracking-widest italic">Scanning logs...</span>
                  </div>
               ) : history.length === 0 ? (
                  <div className="text-center py-20 opacity-20">
                     <Trash2 className="w-8 h-8 mx-auto mb-4" />
                     <p className="text-[9px] font-black uppercase italic tracking-widest">Registry empty</p>
                  </div>
               ) : (
                  history.map((h, i) => (
                     <motion.div 
                       key={h._id}
                       initial={{ opacity: 0, x: 10 }}
                       animate={{ opacity: 1, x: 0 }}
                       transition={{ delay: i * 0.05 }}
                       className="p-5 bg-[#0c0c0c] border border-white/5 rounded-xl flex flex-col relative group/log overflow-hidden hover:border-blue-500/20 transition-all shadow-md"
                     >
                        <div className={cn("absolute top-0 left-0 w-1.5 h-full opacity-60", h.type === 'urgent' ? 'bg-red-500' : h.type === 'warning' ? 'bg-amber-500' : 'bg-blue-500')}></div>
                        
                        <div className="flex justify-between items-center mb-3 pl-2">
                           <span className="text-[8px] font-black text-gray-700 uppercase tracking-widest bg-white/5 border border-white/10 px-2 py-1 rounded-lg">To: {h.target || 'Global'}</span>
                           <span className="text-[8px] text-gray-800 font-black italic uppercase tracking-widest">{new Date(h.createdAt).toLocaleDateString()}</span>
                        </div>
                        <p className="text-[10px] font-bold text-gray-500 pl-2 leading-relaxed uppercase italic group-hover/log:text-gray-300 transition-colors">
                           {h.message}
                        </p>
                     </motion.div>
                  ))
               )}
            </div>
         </section>
      </div>

      {/* Security Disclaimer */}
      <div className="bg-blue-600/5 border border-blue-600/10 rounded-2xl p-6 flex items-center space-x-6 text-left shadow-xl group overflow-hidden relative">
         <div className="absolute top-0 right-0 p-6 opacity-[0.02] pointer-events-none group-hover:scale-125 transition-transform duration-1000">
            <Settings2 className="w-40 h-40 text-blue-500" />
         </div>
         <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-600/20 flex items-center justify-center shrink-0">
            <AlertCircle className="w-5 h-5 text-blue-500" />
         </div>
         <p className="text-[10px] font-bold text-gray-700 uppercase tracking-widest leading-relaxed max-w-2xl italic">
            Transmission protocols ensure platform-wide delivery. High priority dispatches override non-essential user notifications across all active terminal nodes.
         </p>
      </div>
    </div>
  );
}
