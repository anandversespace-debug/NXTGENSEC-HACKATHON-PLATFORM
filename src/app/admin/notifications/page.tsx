'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Megaphone, 
  Send, 
  History, 
  Settings2,
  Users,
  AlertCircle
} from 'lucide-react';

export default function AdminNotificationsPage() {
  const [message, setMessage] = useState('');
  const [target, setTarget] = useState('all'); // all, developers, judges
  const [type, setType] = useState('info'); // info, warning, urgent
  const [loading, setLoading] = useState(false);

  const history = [
    {
      id: 1,
      target: 'All Nodes',
      type: 'urgent',
      message: 'Maintenance window initialized for DB indexing. Read-only mode active.',
      timestamp: '2 hours ago',
    },
    {
      id: 2,
      target: 'Developers',
      type: 'info',
      message: 'New CyberShield hackathon guidelines published.',
      timestamp: '1 day ago',
    }
  ];

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/mail/broadcast`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}` // Assuming backend needs auth or uses cookies natively
        },
        body: JSON.stringify({ target, type, message })
      });
      
      const data = await res.json();
      if (res.ok) {
        alert(`Broadcast successful! Sent to ${data.count || 'all'} users.`);
        setMessage('');
      } else {
        alert(`Error: ${data.error || 'Failed to send broadcast'}`);
      }
    } catch (err) {
      console.error(err);
      alert('Internal transmission error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold mb-0.5">Global Broadcast</h1>
          <p className="text-xs text-gray-400 font-medium tracking-tight">Push system-wide announcements to all active identities.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
         {/* Compose Broadcast */}
         <div className="bg-[#0c0c0c] border border-white/5 rounded-xl p-6 lg:p-8">
            <div className="flex items-center space-x-3 mb-8 border-b border-white/[0.03] pb-4">
               <div className="w-8 h-8 rounded bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                  <Megaphone className="w-4 h-4 text-blue-500" />
               </div>
               <div>
                  <h2 className="text-lg font-bold uppercase tracking-tight italic">Compose Broadcast</h2>
               </div>
            </div>

            <form onSubmit={handleSend} className="space-y-6">
               <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2 block ml-1 flex items-center"><Users className="w-3 h-3 mr-1" /> Target Group</label>
                    <select 
                      value={target}
                      onChange={(e) => setTarget(e.target.value)}
                      className="w-full bg-[#050505] border border-white/10 rounded-lg py-2.5 px-4 text-[11px] font-bold uppercase text-gray-200 focus:outline-none focus:border-blue-500/50 appearance-none shadow-inner"
                    >
                      <option value="all">All Ecosystem Nodes</option>
                      <option value="developers">Active Developers</option>
                      <option value="judges">Auditor Panel</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2 block ml-1 flex items-center"><AlertCircle className="w-3 h-3 mr-1" /> Severity Level</label>
                    <select 
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      className="w-full bg-[#050505] border border-white/10 rounded-lg py-2.5 px-4 text-[11px] font-bold uppercase text-gray-200 focus:outline-none focus:border-blue-500/50 appearance-none shadow-inner"
                    >
                      <option value="info">Standard Information</option>
                      <option value="warning">System Warning</option>
                      <option value="urgent">Critical Alert</option>
                    </select>
                  </div>
               </div>

               <div>
                  <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2 block ml-1">Payload Content</label>
                  <textarea 
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    className="w-full bg-[#050505] border border-white/10 rounded-lg py-3 px-4 text-xs font-mono text-gray-200 focus:outline-none focus:border-blue-500/50 resize-none shadow-inner"
                    placeholder="Enter system announcement text..."
                  />
               </div>

                <div className="pt-2 flex justify-end">
                  <button disabled={loading} type="submit" className="btn-primary py-3 px-6 text-[10px] flex items-center space-x-2 disabled:opacity-50">
                     <Send className="w-3.5 h-3.5" />
                     <span>{loading ? 'Transmitting...' : 'Transmit Payload'}</span>
                  </button>
               </div>
            </form>
         </div>

         {/* Broadcast History */}
         <div className="bg-[#0c0c0c] border border-white/5 rounded-xl p-6 lg:p-8">
            <div className="flex items-center space-x-3 mb-8 border-b border-white/[0.03] pb-4">
               <div className="w-8 h-8 rounded bg-white/5 border border-white/10 flex items-center justify-center">
                  <History className="w-4 h-4 text-gray-500" />
               </div>
               <div>
                  <h2 className="text-lg font-bold uppercase tracking-tight italic text-gray-300">Transmission History</h2>
               </div>
            </div>

            <div className="space-y-4">
               {history.map((h, i) => (
                  <motion.div 
                    key={h.id}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-4 bg-[#050505] border border-white/5 rounded-lg flex flex-col group relative overflow-hidden"
                  >
                     <div className={`absolute top-0 left-0 w-1 h-full ${h.type === 'urgent' ? 'bg-red-500' : 'bg-blue-500'}`}></div>
                     
                     <div className="flex justify-between items-center mb-2 pl-3">
                        <span className="text-[8px] font-bold text-gray-500 uppercase tracking-widest border border-white/10 bg-white/5 px-2 py-0.5 rounded">To: {h.target}</span>
                        <span className="text-[9px] text-gray-600 font-mono">{h.timestamp}</span>
                     </div>
                     <p className="text-xs text-gray-300 pl-3 leading-relaxed">
                        {h.message}
                     </p>
                  </motion.div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
}
