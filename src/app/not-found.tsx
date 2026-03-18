'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldAlert, ArrowLeft, Home, Zap, Terminal } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 overflow-hidden relative">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/[0.03] blur-[150px] rounded-full -z-10" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="max-w-md w-full text-center relative z-10">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.5 }}
           className="mb-8 relative inline-block"
        >
           <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center mx-auto shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <ShieldAlert className="w-10 h-10 text-blue-500 animate-pulse" />
           </div>
           {/* Glitchy 404 text behind icon */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 select-none opacity-10">
              <span className="text-[140px] font-black italic tracking-tighter uppercase">404</span>
           </div>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, y: 15 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5, delay: 0.2 }}
        >
           <h1 className="text-2xl font-black uppercase italic tracking-tight text-white mb-2">Page Not Found</h1>
           <p className="text-[11px] text-gray-500 font-bold uppercase tracking-widest italic mb-10">The page you are looking for does not exist.</p>
           
           <div className="flex flex-col space-y-3">
              <Link 
                href="/" 
                className="flex items-center justify-center space-x-3 bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl shadow-blue-900/20 group"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Go to Home Page</span>
              </Link>
              
              <button 
                onClick={() => window.history.back()}
                className="flex items-center justify-center space-x-3 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Go Back</span>
              </button>
           </div>
        </motion.div>

        {/* Footer info */}
        <div className="mt-20 flex items-center justify-center space-x-8 opacity-20">
           <div className="flex items-center space-x-2">
              <Zap className="w-3 h-3 text-amber-500" />
              <span className="text-[8px] font-black uppercase tracking-widest">Protocol Version 1.0.4</span>
           </div>
           <div className="w-px h-3 bg-white/10" />
           <span className="text-[8px] font-black uppercase tracking-widest italic">NxtGenSec Dev Division</span>
        </div>
      </div>
    </div>
  );
}
