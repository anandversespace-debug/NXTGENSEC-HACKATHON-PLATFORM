'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, 
  ShieldAlert, 
  Trophy, 
  CheckCircle,
  Clock,
  Trash2
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function UserNotificationsPage() {
  const notifications = [
    {
      id: 1,
      type: 'security',
      title: 'Login Detected from New IP',
      message: 'Node access recorded from 192.168.1.1. If this was not you, please rotate your cryptographic key immediately.',
      time: '10 mins ago',
      read: false,
      icon: ShieldAlert,
      color: 'text-red-500',
      bg: 'bg-red-500/10'
    },
    {
      id: 2,
      type: 'hackathon',
      title: 'Audit Phase Initiated',
      message: 'The CyberShield Global 2024 sprint has transitioned into the audit phase. Judgments will be processed over the next 72 hours.',
      time: '2 hours ago',
      read: false,
      icon: Trophy,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10'
    },
    {
      id: 3,
      type: 'system',
      title: 'Architectural Submission Accepted',
      message: 'Your payload "ZeroKnowledge Protocol Auth" has been successfully injected into the ecosystem repository.',
      time: '1 day ago',
      read: true,
      icon: CheckCircle,
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-10">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold mb-0.5">System Broadcasts</h1>
          <p className="text-xs text-gray-400 font-medium tracking-tight">Monitor inbound network alerts, payload status, and clearance updates.</p>
        </div>
        <div className="flex gap-4">
          <button className="text-[10px] font-bold uppercase tracking-widest text-blue-500 hover:text-blue-400 transition-colors">
            Mark All Verified
          </button>
          <button className="text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-red-500 transition-colors flex items-center space-x-1">
            <Trash2 className="w-3.5 h-3.5" /> <span>Flush Logs</span>
          </button>
        </div>
      </header>

      <div className="bg-[#0c0c0c] border border-white/5 rounded-xl overflow-hidden mt-8 shadow-2xl">
         {notifications.map((notif, idx) => {
           const Icon = notif.icon;
           return (
             <motion.div
               key={notif.id}
               initial={{ opacity: 0, x: -10 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: idx * 0.1 }}
               className={cn(
                 "p-6 border-b border-white/[0.03] last:border-0 flex gap-6 items-start transition-colors relative group",
                 !notif.read ? "bg-white/[0.02]" : "hover:bg-white/[0.01]"
               )}
             >
                {/* Unread indicator */}
                {!notif.read && (
                  <div className="absolute left-0 top-0 h-full w-[2px] bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                )}
                
                <div className={cn("w-10 h-10 rounded-lg shrink-0 flex items-center justify-center border border-white/5", notif.bg)}>
                   <Icon className={cn("w-5 h-5", notif.color)} />
                </div>

                <div className="flex-grow">
                   <div className="flex justify-between items-start mb-1">
                      <h3 className={cn("text-sm font-bold uppercase tracking-tight", !notif.read ? "text-white" : "text-gray-300")}>
                        {notif.title}
                      </h3>
                      <span className="text-[9px] font-bold uppercase tracking-widest text-gray-600 flex items-center shrink-0 ml-4">
                         <Clock className="w-3 h-3 mr-1" /> {notif.time}
                      </span>
                   </div>
                   <p className="text-xs font-medium text-gray-400 leading-relaxed">
                      {notif.message}
                   </p>
                </div>
                
                {/* Action Hover */}
                {!notif.read && (
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 text-gray-500 hover:text-white shrink-0 absolute right-6 top-1/2 -translate-y-1/2 bg-[#050505] rounded-full border border-white/10 shadow-lg">
                     <CheckCircle className="w-4 h-4" />
                  </button>
                )}
             </motion.div>
           )
         })}

         {notifications.length === 0 && (
            <div className="p-16 text-center">
              <div className="w-16 h-16 bg-white/[0.02] border border-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                 <Bell className="w-6 h-6 text-gray-600" />
              </div>
              <h3 className="text-lg font-bold text-white uppercase tracking-tight italic mb-2">Zero Broadcasts Found</h3>
              <p className="text-xs text-gray-400 font-medium">Your telemetry logs are currently clear.</p>
            </div>
         )}
      </div>
    </div>
  );
}
