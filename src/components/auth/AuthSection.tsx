'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, ShieldCheck, Trophy, Users, Activity, Globe, Zap, Target } from 'lucide-react';
import Link from 'next/link';

interface AuthSectionProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

const AuthSection: React.FC<AuthSectionProps> = ({ children, title, subtitle }) => {
  const stats = [
    { label: 'Active Users', value: '12K+', icon: Users },
    { label: 'Fast Sync', value: '4ms', icon: Zap },
    { label: 'Secure', value: '100%', icon: ShieldCheck },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#030303] py-12 px-6 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[120px] -mr-48 -mt-48 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[100px] -ml-32 -mb-32 pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl w-full bg-[#0c0c0c] border border-white/[0.05] rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row relative z-10"
      >
        {/* Left Column */}
        <div className="w-full lg:w-[45%] p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-white/[0.04]">
          <div className="max-w-sm mx-auto h-full flex flex-col justify-center">
            <Link href="/" className="mb-12 flex items-center space-x-3 group">
               <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Shield className="w-5 h-5 text-white" />
               </div>
               <span className="text-lg font-black italic uppercase tracking-tighter text-white">Hack<span className="text-blue-500">Center</span></span>
            </Link>

            <div className="mb-10 space-y-3">
                <div className="flex items-center space-x-2">
                   <div className="w-6 h-[2.5px] bg-blue-600 rounded-full" />
                   <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest italic">User Portal</span>
                </div>
                <h1 className="text-2xl font-black text-white italic uppercase tracking-tighter leading-none">{title}</h1>
                <p className="text-[10px] text-gray-600 font-bold leading-relaxed uppercase tracking-widest italic">{subtitle}</p>
             </div>

             <div className="relative">
                {children}
             </div>
           </div>
        </div>

        {/* Right Column */}
        <div className="hidden lg:flex lg:w-[50%] bg-[#080808] relative items-center justify-center p-12 overflow-hidden border-l border-white/[0.02]">
           {/* Mesh Effect */}
           <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#3b82f6_1.5px,transparent_1.5px)] [background-size:24px_24px]" />
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-blue-500/5 rounded-full animate-pulse" />
           
           <div className="text-center space-y-10 relative z-10 w-full">
              <div className="flex flex-col items-center">
                 <div className="w-16 h-16 bg-blue-600/10 border border-blue-600/20 rounded-2xl flex items-center justify-center mb-8 shadow-xl group cursor-pointer transition-transform hover:scale-105">
                    <Target className="w-8 h-8 text-blue-500" />
                 </div>
                 <h2 className="text-2xl font-black italic uppercase tracking-tighter text-white mb-3">Event <span className="text-blue-500">Platform</span></h2>
                 <p className="text-gray-600 text-[10px] font-bold uppercase tracking-widest leading-relaxed max-w-sm italic">
                    The simplest way to manage your hackathons, teams, and submissions.
                 </p>
              </div>

              <div className="grid grid-cols-3 gap-8 pt-12 border-t border-white/[0.05]">
                 {stats.map((stat, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 + (i * 0.1) }}
                      className="space-y-3"
                    >
                        <div className="p-2.5 bg-white/[0.03] border border-white/[0.05] rounded-lg w-fit mx-auto">
                           <stat.icon className="w-4 h-4 text-blue-500/60" />
                        </div>
                        <div>
                           <p className="text-xl font-black italic text-white tracking-tighter mb-0.5">{stat.value}</p>
                           <p className="text-[8px] font-black text-gray-800 uppercase tracking-widest italic">{stat.label}</p>
                        </div>
                    </motion.div>
                 ))}
              </div>
           </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthSection;
