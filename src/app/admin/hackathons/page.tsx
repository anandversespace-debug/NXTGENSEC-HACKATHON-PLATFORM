'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Calendar, Plus, Edit2, Eye, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

const AdminHackathons = () => {
  const events = [
    { id: 'h1', title: 'CyberShield Global', date: 'April 15-17', entries: 24, status: 'active', location: 'Virtual' },
    { id: 'h2', title: 'Quantum Secure 2024', date: 'May 20-22', entries: 0, status: 'upcoming', location: 'London' },
    { id: 'h3', title: 'DeFi Vulnerability Search', date: 'Mar 10-12', entries: 56, status: 'ended', location: 'Remote' },
  ];

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold mb-0.5">Events</h1>
          <p className="text-xs text-gray-500 font-medium">Logistic oversight.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-lg flex items-center space-x-2 transition-all">
           <Plus className="w-3.5 h-3.5" />
           <span className="text-[10px] font-bold uppercase tracking-wider">Deploy Event</span>
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event, i) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="bg-[#0c0c0c] border border-white/5 p-5 rounded-lg flex flex-col hover:border-white/10 transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <span className={cn(
                "text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-tighter border",
                event.status === 'active' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : 
                event.status === 'upcoming' ? "bg-blue-500/10 text-blue-400 border-blue-500/20" : 
                "bg-white/5 text-gray-500 border-white/5"
              )}>
                {event.status}
              </span>
              <div className="flex items-center space-x-1.5 text-gray-600">
                 <MapPin className="w-2.5 h-2.5" />
                 <span className="text-[8px] font-bold uppercase">{event.location}</span>
              </div>
            </div>

            <h3 className="text-sm font-bold mb-1 text-white uppercase tracking-tight">{event.title}</h3>
            <div className="flex items-center space-x-1.5 text-gray-600 mb-6 font-mono text-[9px]">
               <Calendar className="w-3 h-3" />
               <span>{event.date}</span>
            </div>

            <div className="bg-white/[0.01] border border-white/[0.03] rounded-lg p-3 mb-6 flex items-center justify-between">
               <div>
                  <p className="text-[8px] font-bold text-gray-500 uppercase tracking-widest mb-0.5">Entries</p>
                  <p className="text-lg font-bold text-gray-200 leading-none">{event.entries}</p>
               </div>
               <Trophy className="w-4 h-4 text-blue-500/30" />
            </div>

            <div className="mt-auto flex space-x-2">
              <button className="flex-1 flex items-center justify-center space-x-1.5 py-2 bg-white/[0.02] border border-white/5 rounded-md hover:bg-white/[0.05] transition-colors text-[9px] font-bold text-gray-400">
                 <Eye className="w-3 h-3" /> <span>Intel</span>
              </button>
              <button className="flex-1 flex items-center justify-center space-x-1.5 py-2 bg-blue-600/10 border border-blue-500/20 rounded-md hover:bg-blue-600/20 transition-colors text-[9px] font-bold text-blue-500">
                 <Edit2 className="w-3 h-3" /> <span>Manage</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminHackathons;
