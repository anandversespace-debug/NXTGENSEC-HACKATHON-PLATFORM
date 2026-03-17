'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Github, Twitter, MapPin, Terminal, Hexagon, User } from 'lucide-react';
import Link from 'next/link';

const HubPage = () => {
  const [developers, setDevelopers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const res = await fetch(`${baseUrl}/users/leaderboard`);
        if (!res.ok) throw new Error('System failed to synchronize node registry.');
        const data = await res.json();
        setDevelopers(data);
      } catch (err) {
        console.error('Failed to fetch developer hub data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDevelopers();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-20 px-6 bg-[#050505] flex items-center justify-center">
        <div className="text-blue-500 font-black italic animate-pulse tracking-widest uppercase">Synchronizing Network Topology...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 bg-[#050505]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-16">
          <div className="max-w-xl">
             <p className="text-label mb-2">Network Topology</p>
             <h1 className="text-2xl font-bold uppercase tracking-tight italic mb-3 text-white italic uppercase">Developer <span className="text-blue-600">Hub</span></h1>
             <p className="text-gray-500 text-[11px] font-bold uppercase tracking-tighter leading-snug">Elite contributors securing the future of the NxtGenSec ecosystem.</p>
          </div>
          <div className="flex items-center space-x-12 p-5 bg-[#0c0c0c] border border-white/5 rounded-lg w-full md:w-auto">
            <div className="text-center">
              <p className="text-[9px] font-bold text-gray-700 uppercase tracking-widest mb-1">Cycle 04</p>
              <p className="text-xs font-bold text-blue-500 uppercase tracking-tighter">Backbone Active</p>
            </div>
            <div className="w-px h-6 bg-white/5" />
            <div className="text-center">
              <p className="text-[9px] font-bold text-gray-700 uppercase tracking-widest mb-1">Participants</p>
              <p className="text-xs font-bold text-white uppercase tracking-tighter">{developers.length} Nodes</p>
            </div>
          </div>
        </div>

        {/* Leaderboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20 text-white">
          {developers.map((dev, idx) => (
            <motion.div
              key={dev._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-[#0c0c0c] border border-white/5 flex flex-col items-center text-center p-8 rounded-lg relative overflow-hidden group hover:border-blue-500/20 transition-all"
            >
              <div className="absolute top-4 right-4 text-3xl font-black text-white/[0.03] italic leading-none">#{idx + 1}</div>
              
              <div className="relative mb-6">
                 <div className="w-20 h-20 rounded bg-white/5 border border-white/5 overflow-hidden p-1 group-hover:border-blue-500/30 transition-all flex items-center justify-center">
                    {dev.avatar_url ? (
                      <img src={dev.avatar_url} alt={dev.name} className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700 rounded-sm" />
                    ) : (
                      <User className="w-10 h-10 text-gray-700" />
                    )}
                 </div>
                 <div className="absolute -bottom-1 -right-1 bg-blue-600 rounded p-1.5 border border-[#0c0c0c] shadow-xl">
                    <Shield className="w-3 h-3 text-white" />
                 </div>
              </div>

              <h3 className="text-xs font-bold mb-1 text-gray-200 uppercase tracking-tight">{dev.name}</h3>
              <p className="text-[9px] font-bold text-blue-500 uppercase tracking-widest mb-4 italic">:: {dev.role}</p>
              <p className="text-gray-500 text-[10px] mb-6 leading-relaxed font-bold uppercase tracking-tighter line-clamp-2 italic">{dev.bio || 'Entity has not established a public intelligence profile.'}</p>

              <div className="flex items-center justify-center space-x-3 mb-8">
                 {dev.github && <a href={dev.github} target="_blank" className="p-1.5 text-gray-700 hover:text-white transition-colors"><Github className="w-3.5 h-3.5" /></a>}
                 {dev.twitter && <a href={dev.twitter} target="_blank" className="p-1.5 text-gray-700 hover:text-white transition-colors"><Twitter className="w-3.5 h-3.5" /></a>}
                 <div className="flex items-center space-x-1 text-[8px] font-bold text-gray-700 uppercase tracking-tighter ml-2"><MapPin className="w-2.5 h-2.5" /> <span>{dev.location || 'GLOBAL'}</span></div>
              </div>

              <div className="w-full pt-6 border-t border-white/[0.03] flex items-center justify-between">
                <div className="text-left">
                   <p className="text-[8px] text-gray-700 font-bold uppercase tracking-widest mb-0.5">Reputation</p>
                   <p className="text-sm font-black text-gray-300 italic">{(dev.contributions || 0).toLocaleString()} CP</p>
                </div>
                <Link href={`/profile/${dev.username}`} className="px-3 py-1.5 bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] rounded text-[9px] font-bold text-gray-500 uppercase tracking-widest transition-all">Node Link</Link>
              </div>
            </motion.div>
          ))}
          {developers.length === 0 && (
             <div className="col-span-full py-20 text-center border border-dashed border-white/5 rounded-lg">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-600 italic">No node participants detected in the network backbone.</p>
             </div>
          )}
        </div>

        {/* Categories Section */}
        <div className="flex items-center space-x-2 mb-8 ml-1">
           <Terminal className="w-3.5 h-3.5 text-gray-700" />
           <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600">Expertise Registry</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
           {['Smart Contracts', 'Kernel Dev', 'Cryptography', 'Cloud Infra', 'Malware Audit', 'App Security'].map(cat => (
             <div key={cat} className="bg-[#0c0c0c] border border-white/5 py-4 px-6 text-center hover:border-blue-500/20 cursor-pointer transition-all rounded-lg group">
               <span className="text-[9px] font-bold text-gray-600 group-hover:text-gray-300 transition-colors uppercase tracking-widest">{cat}</span>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default HubPage;
