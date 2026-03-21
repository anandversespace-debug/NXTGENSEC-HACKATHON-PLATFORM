'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, 
  ShieldAlert, 
  Trophy, 
  CheckCircle,
  Clock,
  Trash2,
  Loader2,
  Info,
  AlertTriangle
} from 'lucide-react';
import { cn } from '@/lib/utils';

const iconMap: Record<string, any> = {
  security: ShieldAlert,
  hackathon: Trophy,
  system: CheckCircle,
  info: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  error: ShieldAlert,
  default: Bell
};

const colorMap: Record<string, string> = {
  security: 'text-red-500',
  hackathon: 'text-blue-500',
  system: 'text-emerald-500',
  info: 'text-blue-400',
  warning: 'text-amber-500',
  success: 'text-emerald-500',
  error: 'text-red-500',
  default: 'text-gray-400'
};

const bgMap: Record<string, string> = {
  security: 'bg-red-500/10',
  hackathon: 'bg-blue-500/10',
  system: 'bg-emerald-500/10',
  info: 'bg-blue-500/10',
  warning: 'bg-amber-500/10',
  success: 'bg-emerald-500/10',
  error: 'bg-red-500/10',
  default: 'bg-white/5'
};

export default function UserNotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${baseUrl}/notifications`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setNotifications(data);
      }
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${baseUrl}/notifications/read`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ notificationId: id })
      });
      if (res.ok) {
        setNotifications(prev => prev.map(n => n._id === id ? { ...n, isRead: true } : n));
      }
    } catch (err) {
      console.error('Read error:', err);
    }
  };

  const markAllRead = async () => {
    // Ideally the backend has a "mark all" endpoint. If not, we iterate or just update UI for now.
    // For now, let's just mark visible ones.
    const unreadIds = notifications.filter(n => !n.isRead).map(n => n._id);
    for (const id of unreadIds) {
      await markAsRead(id);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
        <p className="text-[10px] font-black uppercase tracking-widest text-gray-700 italic">Syncing message registry...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-10">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
           <div className="flex items-center space-x-2 mb-1">
              <Bell className="w-4 h-4 text-blue-500" />
              <span className="text-[9px] font-black uppercase tracking-widest text-gray-700 italic">Communication System</span>
           </div>
           <h1 className="text-2xl font-black italic uppercase tracking-tighter text-white">Latest <span className="text-blue-500">Notifications</span></h1>
           <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest italic leading-relaxed max-w-sm">
             View platform updates, project status alerts, and security notifications.
           </p>
        </div>
        <div className="flex gap-4">
          <button onClick={markAllRead} className="text-[9px] font-black uppercase tracking-widest text-blue-500 hover:text-blue-400 transition-all active:scale-95 italic">
            Synchronize All Read
          </button>
          <button className="text-[9px] font-black uppercase tracking-widest text-gray-700 hover:text-red-500 transition-all flex items-center space-x-2 italic">
            <Trash2 className="w-3.5 h-3.5" /> <span>Clear Cache</span>
          </button>
        </div>
      </header>

      <div className="bg-[#0c0c0c] border border-white/5 rounded-2xl overflow-hidden mt-8 shadow-2xl">
         {notifications.map((notif, idx) => {
           const Icon = iconMap[notif.type] || iconMap.default;
           const color = colorMap[notif.type] || colorMap.default;
           const bg = bgMap[notif.type] || bgMap.default;
           
           return (
             <motion.div
               key={notif._id}
               initial={{ opacity: 0, scale: 0.98 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: idx * 0.05 }}
               className={cn(
                 "p-6 border-b border-white/[0.03] last:border-0 flex gap-6 items-start transition-all relative group",
                 !notif.isRead ? "bg-white/[0.02]" : "hover:bg-white/[0.01]"
               )}
             >
                {/* Unread indicator */}
                {!notif.isRead && (
                  <div className="absolute left-0 top-0 h-full w-[2px] bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.3)]"></div>
                )}
                
                <div className={cn("w-10 h-10 rounded-xl shrink-0 flex items-center justify-center border border-white/5 shadow-sm", bg)}>
                   <Icon className={cn("w-5 h-5", color)} />
                </div>

                <div className="flex-grow text-left">
                   <div className="flex justify-between items-start mb-1">
                      <h3 className={cn("text-[11px] font-black uppercase tracking-tighter italic", !notif.isRead ? "text-white" : "text-gray-500")}>
                        {notif.title}
                      </h3>
                      <span className="text-[8px] font-black uppercase tracking-widest text-gray-800 flex items-center shrink-0 ml-4 font-mono group-hover:text-gray-600 transition-colors">
                         <Clock className="w-3 h-3 mr-1.5 opacity-30" /> {new Date(notif.createdAt).toLocaleDateString()}
                      </span>
                   </div>
                   <p className="text-[10px] font-bold text-gray-600 leading-relaxed uppercase tracking-widest italic group-hover:text-gray-400 transition-colors">
                      {notif.message}
                   </p>
                </div>
                
                {/* Action Hover */}
                {!notif.isRead && (
                  <button 
                    onClick={() => markAsRead(notif._id)}
                    className="opacity-0 group-hover:opacity-100 transition-all p-2 text-gray-700 hover:text-white shrink-0 absolute right-6 top-1/2 -translate-y-1/2 bg-[#050505] rounded-lg border border-white/5 shadow-xl hover:bg-blue-600/10 hover:border-blue-500/20"
                  >
                     <CheckCircle className="w-4 h-4" />
                  </button>
                )}
             </motion.div>
           )
         })}

         {notifications.length === 0 && (
            <div className="p-20 text-center">
              <div className="w-16 h-16 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner">
                 <Bell className="w-6 h-6 text-gray-800" />
              </div>
              <h3 className="text-xl font-black text-white italic uppercase tracking-tighter mb-2">No active messages</h3>
              <p className="text-[9px] text-gray-700 font-bold uppercase tracking-widest italic">The communication registry is currently clear.</p>
            </div>
         )}
      </div>
    </div>
  );
}
