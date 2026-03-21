'use client';

import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuthStore } from '@/store/useAuthStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, CheckCircle2, Zap, X, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

let socket: Socket | null = null;

export const SignalListener = () => {
  const { user, isAuthenticated } = useAuthStore();
  const [notification, setNotification] = useState<any>(null);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      if (socket) {
        socket.disconnect();
        socket = null;
      }
      return;
    }

    const getBaseUrl = () => {
      try {
        const url = new URL(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api');
        return `${url.protocol}//${url.host}`;
      } catch (e) {
        return 'http://localhost:5000';
      }
    };
    const baseUrl = getBaseUrl();
    
    if (!socket) {
      // Vercel Serverless Optimization: Sockets are not supported in standard Vercel functions.
      // We skip initialization if the host contains 'vercel.app' or matches the Vercel production domain.
      if (baseUrl.includes('vercel.app') || baseUrl.includes('anandverse.space')) {
        console.warn('[SIGNAL] Socket telemetry disabled for Serverless host.');
        return;
      }

      socket = io(baseUrl, {
        withCredentials: true,
        transports: ['websocket', 'polling'],
        reconnectionAttempts: 3 // Limit retries to avoid spam
      });

      socket.on('connect', () => {
        console.log('[SIGNAL] Linked to global node:', socket?.id);
        socket?.emit('join_user', user._id || user.id);
      });

      socket.on('project_status_change', (data) => {
        console.log('[SIGNAL] Project update received:', data);
        setNotification({
          type: 'success',
          title: 'Node Verified',
          desc: `Your project "${data.title}" has been authorized.`,
          points: data.pointsReward,
          id: Date.now()
        });

        // Auto-dismiss after 6 seconds
        setTimeout(() => setNotification(null), 6000);
      });
    }

    return () => {
      // We keep connection alive for the session
    };
  }, [isAuthenticated, user]);

  return (
    <AnimatePresence>
      {notification && (
        <motion.div
          initial={{ opacity: 0, x: 100, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
          className="fixed bottom-10 right-10 z-[100] w-80 bg-[#0c0c0c] border border-blue-500/30 rounded-2xl shadow-[0_0_50px_rgba(59,130,246,0.15)] overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-1 h-full bg-blue-600" />
          <div className="p-6">
             <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center border border-blue-600/20">
                   <Trophy className="w-5 h-5 text-blue-500" />
                </div>
                <button onClick={() => setNotification(null)} className="text-gray-700 hover:text-white transition-colors">
                   <X className="w-4 h-4" />
                </button>
             </div>
             
             <div className="space-y-1 mb-6">
                <h4 className="text-sm font-black text-white uppercase italic tracking-tight">{notification.title}</h4>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-relaxed">
                   {notification.desc}
                </p>
             </div>

             <div className="flex items-center space-x-3 bg-blue-600/5 border border-blue-500/10 p-3 rounded-xl">
                <Zap className="w-4 h-4 text-amber-500" />
                <div className="flex flex-col">
                   <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest leading-none">Reputation Reward</span>
                   <span className="text-sm font-black text-blue-400 italic">+{notification.points} CP ADDED</span>
                </div>
             </div>
             
             <div className="mt-4 pt-4 border-t border-white/[0.03] flex items-center justify-between">
                <span className="text-[8px] font-black text-gray-800 uppercase tracking-[0.2em] italic underline decoration-blue-500/20 underline-offset-4">Identity System Verified</span>
                <CheckCircle2 className="w-3 h-3 text-emerald-500 opacity-50" />
             </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
