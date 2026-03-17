'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Calendar, Clock, Trophy, MapPin, Users, ArrowLeft, Shield, Users2, BrainCircuit } from 'lucide-react';
import { Hackathon } from '@/types';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const HackathonDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const [hackathon, setHackathon] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHackathon = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const res = await fetch(`${baseUrl}/hackathons/${params.id}`);
        if (!res.ok) throw new Error('Hackathon not found in system registry.');
        const data = await res.json();
        setHackathon(data);
      } catch (err) {
        console.error('Failed to fetch hackathon detail:', err);
        router.push('/hackathons');
      } finally {
        setLoading(false);
      }
    };
    fetchHackathon();
  }, [params.id, router]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505]">
      <div className="w-12 h-12 bg-blue-600 rounded flex items-center justify-center animate-pulse shadow-2xl shadow-blue-500/20">
         <Shield className="w-6 h-6 text-white animate-spin" />
      </div>
    </div>
  );

  if (!hackathon) return null;

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        <Link href="/hackathons" className="flex items-center space-x-2 text-gray-500 hover:text-white transition-colors mb-12 group uppercase tracking-widest text-[10px] font-black italic">
           <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
           <span className="font-bold">Back to Event Registry</span>
        </Link>

        {/* Hero Section */}
        <div className="bg-[#0c0c0c] border border-white/5 mb-12 overflow-hidden rounded-3xl relative">
           <div className="relative h-64 md:h-96">
              <img src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1200&h=400" className="w-full h-full object-cover grayscale opacity-20 brightness-50" alt="" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
              <div className="absolute bottom-12 left-12 right-12">
                 <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                       <span className="inline-block px-3 py-1 bg-blue-600/10 border border-blue-600/20 text-blue-500 text-[10px] font-black rounded mb-4 uppercase tracking-[0.2em] italic shadow-2xl">STATUS: OPEN_FOR_REGISTRATION</span>
                       <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white drop-shadow-2xl">{hackathon.title}</h1>
                    </div>
                    <Link href={`/dashboard/hackathons/register/${hackathon._id}`} className="bg-blue-600 hover:bg-blue-500 text-white py-4 px-12 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-[0_0_30px_rgba(37,99,235,0.2)] hover:scale-105 active:scale-95">
                        Initialize Enrollment
                    </Link>
                 </div>
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
           {/* Detailed Information */}
           <div className="lg:col-span-2 space-y-12">
              <div className="space-y-6">
                 <h2 className="text-2xl font-black italic uppercase tracking-tight text-white border-l-4 border-blue-600 pl-6">Mission Parameters</h2>
                 <p className="text-gray-500 text-lg leading-snug font-bold uppercase tracking-tighter">{hackathon.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 {[
                   { label: 'Temporal Scale', value: '48H Sync', icon: Clock },
                   { label: 'Node Location', value: 'Global / Virtual', icon: MapPin },
                   { label: 'Network Capacity', value: '500+ Peers', icon: Users }
                 ].map((item, i) => (
                   <div key={i} className="bg-[#0c0c0c] border border-white/5 p-6 rounded-2xl group hover:border-blue-500/20 transition-colors">
                      <item.icon className="w-5 h-5 text-blue-500 mb-6 group-hover:scale-110 transition-transform" />
                      <p className="text-[9px] text-gray-700 font-bold uppercase tracking-widest mb-1 italic">{item.label}</p>
                      <p className="font-black text-white text-xs uppercase tracking-widest">{item.value}</p>
                   </div>
                 ))}
              </div>

              <div className="bg-[#0c0c0c] border border-white/5 p-10 rounded-3xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
                    <Trophy className="w-32 h-32" />
                 </div>
                 <h3 className="text-xl font-bold mb-10 flex items-center space-x-3 text-white italic uppercase tracking-tight">
                    <Trophy className="w-6 h-6 text-amber-500" />
                    <span>Incentive Matrix</span>
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                    <div className="p-8 bg-amber-500/5 border border-amber-500/10 rounded-2xl group-hover:border-amber-500/20 transition-all">
                       <p className="text-[10px] font-black text-amber-500 mb-2 uppercase tracking-widest italic">Rank I: Elite Auditor</p>
                       <p className="text-4xl font-black text-white italic tracking-tighter scale-95 origin-left group-hover:scale-100 transition-transform">$5,000</p>
                    </div>
                    <div className="p-8 bg-white/[0.02] border border-white/5 rounded-2xl group-hover:border-blue-500/10 transition-all">
                       <p className="text-[10px] font-black text-gray-500 mb-2 uppercase tracking-widest italic">Rank II: System Lead</p>
                       <p className="text-4xl font-black text-white italic tracking-tighter scale-95 origin-left group-hover:scale-100 transition-transform">$3,000</p>
                    </div>
                 </div>
              </div>
           </div>

           {/* Sidebar Timeline/Resources */}
           <div className="lg:col-span-1 space-y-8">
              <div className="bg-[#0c0c0c] border border-white/5 p-10 rounded-3xl relative">
                 <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Clock className="w-12 h-12 text-blue-900" />
                 </div>
                 <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 mb-10 border-l-2 border-blue-500 pl-4 italic">Execution Timeline</h3>
                 <div className="space-y-10 relative">
                    <div className="absolute left-2 top-2 bottom-2 w-[1px] bg-white/5"></div>
                    {[
                      { title: 'Sync Initialization', time: 'April 15, 09:00', status: 'upcoming' },
                      { title: 'Auditing Phase 0x7', time: 'April 15 - 17', status: 'pending' },
                      { title: 'Consensus & Demo', time: 'April 17, 16:00', status: 'pending' }
                    ].map((step, i) => (
                      <div key={i} className="flex items-start space-x-6 relative z-10 group">
                         <div className={cn(
                           "w-4 h-4 rounded-sm mt-1 border border-[#0a0a0a] transition-all",
                           i === 0 ? 'bg-blue-600 shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'bg-[#151515] group-hover:bg-blue-800'
                         )}></div>
                         <div>
                            <p className="text-[11px] font-black text-gray-200 uppercase tracking-tight group-hover:text-blue-500 transition-colors">{step.title}</p>
                            <p className="text-[9px] font-bold text-gray-600 uppercase tracking-[0.2em] mt-1">{step.time}</p>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="bg-[#0c0c0c] border border-white/5 p-10 rounded-3xl">
                 <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 mb-8 border-l-2 border-indigo-500 pl-4 italic">Metadata Nodes</h3>
                 <div className="space-y-4">
                    <button className="w-full text-left p-5 bg-white/[0.01] border border-white/5 rounded-2xl hover:bg-white/[0.04] hover:border-blue-500/20 transition-all flex items-center justify-between group">
                       <div className="flex items-center space-x-4">
                          <BrainCircuit className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
                          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 group-hover:text-gray-200">Engineer Protocols</span>
                       </div>
                    </button>
                    <button className="w-full text-left p-5 bg-white/[0.01] border border-white/5 rounded-2xl hover:bg-white/[0.04] hover:border-emerald-500/20 transition-all flex items-center justify-between group">
                       <div className="flex items-center space-x-4">
                          <Shield className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 group-hover:text-gray-200">Rules of Engagement</span>
                       </div>
                    </button>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default HackathonDetailPage;
