'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Trophy, ChevronRight, Clock, Shield } from 'lucide-react';
import { Hackathon } from '@/types';
import Link from 'next/link';

const HackathonsPage = () => {
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const res = await fetch(`${baseUrl}/hackathons`);
        if (!res.ok) throw new Error('System failed to synchronize hackathons.');
        const data = await res.json();
        
        // Transform MongoDB _id to id
        const transformedData = data.map((h: any) => ({
          ...h,
          id: h._id
        }));
        setHackathons(transformedData);
      } catch (err) {
        console.error('Failed to fetch hackathons:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchHackathons();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-20 px-6 bg-[#050505] flex items-center justify-center">
        <div className="text-blue-500 font-black italic animate-pulse tracking-widest uppercase">Loading Hackathons...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 bg-[#050505]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <p className="text-label mb-2">Events</p>
          <h1 className="text-2xl font-bold uppercase tracking-tight italic mb-3">Hackathons</h1>
          <p className="text-gray-500 text-[11px] font-bold uppercase tracking-tighter leading-snug max-w-xl">
            Compete in exciting challenges, solve real problems, and win prizes along the way.
          </p>
        </div>

        {/* Featured Card (Taking first hackathon as featured if exists) */}
        {hackathons.length > 0 && (
          <div className="bg-[#0c0c0c] border border-white/5 rounded-lg mb-12 overflow-hidden hover:border-blue-500/20 transition-all group">
            <div className="p-8 md:p-10 flex flex-col md:flex-row items-center justify-between">
              <div className="mb-8 md:mb-0 md:mr-8 flex-grow">
                <div className="flex items-center space-x-2 mb-4">
                   <Shield className="w-3.5 h-3.5 text-blue-500" />
                   <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-blue-500/80">Featured Event</span>
                </div>
                <h2 className="text-xl md:text-2xl font-bold mb-4 uppercase tracking-tight italic text-white underline underline-offset-8 decoration-blue-500/20">{hackathons[0].title}</h2>
                <p className="text-gray-500 text-[11px] mb-8 max-w-lg font-medium uppercase tracking-tighter leading-snug">
                  {hackathons[0].description}
                </p>
                <div className="flex flex-wrap gap-10 text-[10px] text-gray-600 font-bold uppercase tracking-widest mb-10">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-3.5 h-3.5 text-blue-500/50" />
                    <span>{new Date(hackathons[0].start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(hackathons[0].end_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-3.5 h-3.5 text-blue-500/50" />
                    <span>48H Sprint</span>
                  </div>
                  <div className="flex items-center space-x-2">
                     <Users className="w-3.5 h-3.5 text-blue-500/50" />
                     <span>Participants</span>
                  </div>
                </div>
                <Link href={`/hackathons/${hackathons[0].id}`} className="btn-primary px-8 py-3">Join Hackathon</Link>
              </div>
              <div className="w-full md:w-1/4 aspect-square bg-white/[0.01] rounded-lg border border-white/[0.03] flex items-center justify-center relative group-hover:scale-105 transition-transform duration-700">
                 <Trophy className="w-16 h-16 text-blue-500/10 group-hover:text-blue-500/20 transition-colors" />
              </div>
            </div>
          </div>
        )}

        {/* Events List */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 mb-8 ml-1">
             <Trophy className="w-3.5 h-3.5 text-gray-700" />
             <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600">All Events</p>
          </div>
          {hackathons.map((hack, idx) => (
            <motion.div
              key={hack.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-[#0c0c0c] border border-white/5 rounded-lg p-5 hover:border-white/10 transition-all group"
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex-grow">
                  <div className="flex items-center space-x-3 mb-2">
                     <h4 className="text-xs font-bold uppercase tracking-tight text-gray-200 group-hover:text-blue-500 transition-colors">{hack.title}</h4>
                     <span className="px-1.5 py-0.5 text-[8px] font-bold bg-emerald-500/5 text-emerald-500/80 rounded uppercase tracking-tighter">Registration Open</span>
                  </div>
                  <p className="text-gray-600 text-[10px] font-medium uppercase tracking-tighter max-w-2xl">
                    {hack.description}
                  </p>
                </div>
                
                <div className="flex items-center space-x-10">
                  <div className="text-right">
                    <p className="text-[8px] text-gray-700 uppercase font-bold tracking-widest mb-1">Grant Pool</p>
                    <p className="text-sm font-bold text-white italic">{hack.prize_pool}</p>
                  </div>
                  <Link 
                    href={`/hackathons/${hack.id}`}
                    className="p-2 border border-white/5 bg-white/[0.02] rounded-md hover:bg-blue-600 hover:text-white transition-all text-gray-600 shadow-lg shadow-black/20"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
          {hackathons.length === 0 && (
             <div className="py-20 text-center">
                <Trophy className="w-12 h-12 text-gray-800 mx-auto mb-4 opacity-50" />
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-600 italic">No hackathons available right now. Check back soon!</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HackathonsPage;
