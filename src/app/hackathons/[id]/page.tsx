'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Calendar, Clock, Trophy, MapPin, Users, ArrowLeft, Shield, Users2, BrainCircuit, ChevronRight } from 'lucide-react';
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
        if (!res.ok) throw new Error('Hackathon details not found.');
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
      <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center animate-pulse shadow-2xl shadow-blue-500/20">
         <Shield className="w-6 h-6 text-white animate-spin" />
      </div>
    </div>
  );

  if (!hackathon) return null;

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 bg-[#050505] overflow-hidden">
      <div className="max-w-7xl mx-auto text-left relative z-10">
        <Link href="/hackathons" className="flex items-center space-x-2 text-gray-500 hover:text-white transition-colors mb-12 group uppercase tracking-widest text-[10px] font-black italic">
           <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
           <span className="font-bold">Back to Hackathons</span>
        </Link>

        {/* Hero Section */}
        <div className="bg-[#0c0c0c] border border-white/5 mb-16 overflow-hidden rounded-3xl relative shadow-2xl">
           <div className="relative h-64 md:h-96">
              <img src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1200&h=400" className="w-full h-full object-cover grayscale opacity-[0.05] brightness-50" alt="" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-[#0c0c0c]/80 to-transparent"></div>
              <div className="absolute bottom-12 left-12 right-12">
                 <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
                    <div className="text-left">
                       <span className="inline-block px-3 py-1 bg-blue-600/10 border border-blue-600/20 text-blue-500 text-[10px] font-black rounded mb-4 uppercase tracking-[0.2em] italic shadow-2xl">STATUS: OPEN FOR ENTRY</span>
                       <h1 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter text-white drop-shadow-2xl leading-none">{hackathon.title}</h1>
                    </div>
                    <Link href={`/dashboard/hackathons/register/${hackathon._id}`} className="bg-blue-600 hover:bg-blue-500 text-white py-5 px-14 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all shadow-[0_0_40px_rgba(37,99,235,0.3)] hover:scale-105 active:scale-95 italic">
                        Register Now
                    </Link>
                 </div>
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
           {/* Detailed Information */}
           <div className="lg:col-span-2 space-y-16">
              <div className="space-y-8">
                 <h2 className="text-2xl font-black italic uppercase tracking-tight text-white border-l-4 border-blue-600 pl-8 leading-none">About Event</h2>
                 <p className="text-gray-400 text-sm md:text-base leading-relaxed font-bold uppercase tracking-tight text-left max-w-3xl">{hackathon.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {[
                   { label: 'Event Duration', value: '48 Hours', icon: Clock },
                   { label: 'Location Format', value: 'Global / Virtual', icon: MapPin },
                   { label: 'Member Capacity', value: '500+ Expected', icon: Users }
                 ].map((item, i) => (
                   <div key={i} className="bg-[#0c0c0c] border border-white/5 p-8 rounded-2xl group hover:border-blue-500/20 transition-all text-left shadow-2xl">
                      <div className="w-10 h-10 rounded-xl bg-[#050505] border border-white/5 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-blue-600/10 group-hover:border-blue-500/20 transition-all">
                        <item.icon className="w-5 h-5 text-blue-500" />
                      </div>
                      <p className="text-[9px] text-gray-700 font-bold uppercase tracking-widest mb-1 italic">{item.label}</p>
                      <p className="font-black text-white text-xs uppercase tracking-widest italic">{item.value}</p>
                   </div>
                 ))}
              </div>

              <div className="bg-[#0c0c0c] border border-white/5 p-12 rounded-3xl relative overflow-hidden group shadow-2xl">
                 <div className="absolute top-0 right-0 p-10 opacity-[0.02]">
                    <Trophy className="w-48 h-48" />
                 </div>
                 <h3 className="text-2xl font-black mb-12 flex items-center space-x-4 text-white italic uppercase tracking-tighter">
                    <Trophy className="w-8 h-8 text-amber-500" />
                    <span>Prize Distribution</span>
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                    <div className="p-10 bg-amber-500/5 border border-amber-500/10 rounded-2xl group-hover:border-amber-500/30 transition-all text-left">
                       <p className="text-[10px] font-black text-amber-500 mb-2 uppercase tracking-widest italic">First Place: Elite Rank</p>
                       <p className="text-5xl font-black text-white italic tracking-tighter transform group-hover:scale-105 transition-transform origin-left leading-none">$5,000</p>
                    </div>
                    <div className="p-10 bg-white/[0.02] border border-white/10 rounded-2xl group-hover:border-blue-500/20 transition-all text-left">
                       <p className="text-[10px] font-black text-gray-500 mb-2 uppercase tracking-widest italic">Second Place: Pro Rank</p>
                       <p className="text-5xl font-black text-white italic tracking-tighter transform group-hover:scale-105 transition-transform origin-left leading-none">$3,000</p>
                    </div>
                 </div>
              </div>
           </div>

           {/* Sidebar Timeline/Resources */}
           <div className="lg:col-span-1 space-y-8">
              <div className="bg-[#0c0c0c] border border-white/5 p-12 rounded-3xl relative shadow-2xl overflow-hidden">
                 <div className="absolute top-0 right-0 p-6 opacity-[0.03]">
                    <Clock className="w-20 h-20 text-blue-900" />
                 </div>
                 <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-700 mb-12 border-l-2 border-blue-500 pl-6 italic">Event Schedule</h3>
                 <div className="space-y-12 relative">
                    <div className="absolute left-[7px] top-2 bottom-2 w-[1px] bg-white/5"></div>
                    {[
                      { title: 'Kickoff Start', time: 'April 15, 09:00', status: 'upcoming' },
                      { title: 'Development Phase', time: 'April 15 - 17', status: 'pending' },
                      { title: 'Final Review', time: 'April 17, 16:00', status: 'pending' }
                    ].map((step, i) => (
                      <div key={i} className="flex items-start space-x-8 relative z-10 group/item text-left">
                         <div className={cn(
                           "w-4 h-4 rounded-sm mt-1.5 border border-[#0a0a0a] transition-all relative z-10",
                           i === 0 ? 'bg-blue-600 shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'bg-[#151515] group-hover/item:border-blue-500/30 group-hover/item:bg-blue-600/50'
                         )}></div>
                         <div>
                            <p className="text-[12px] font-black text-gray-300 uppercase tracking-tight group-hover/item:text-blue-500 transition-colors italic leading-none">{step.title}</p>
                            <p className="text-[9px] font-bold text-gray-600 uppercase tracking-[0.2em] mt-3 italic">{step.time}</p>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="bg-[#0c0c0c] border border-white/5 p-12 rounded-3xl shadow-2xl text-left">
                 <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-700 mb-10 border-l-2 border-indigo-500 pl-6 italic">Support Hub</h3>
                 <div className="space-y-4">
                    <button className="w-full text-left p-6 bg-white/[0.01] border border-white/5 rounded-2xl hover:bg-white/[0.04] hover:border-blue-500/20 transition-all flex items-center justify-between group/btn">
                       <div className="flex items-center space-x-4">
                          <BrainCircuit className="w-5 h-5 text-indigo-500 group-hover/btn:scale-110 transition-transform" />
                          <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 group-hover/btn:text-white transition-colors italic leading-none">Technical Docs</span>
                       </div>
                       <ChevronRight className="w-4 h-4 text-gray-800 group-hover/btn:text-blue-500 transition-colors" />
                    </button>
                    <button className="w-full text-left p-6 bg-white/[0.01] border border-white/5 rounded-2xl hover:bg-white/[0.04] hover:border-emerald-500/20 transition-all flex items-center justify-between group/btn">
                       <div className="flex items-center space-x-4">
                          <Shield className="w-5 h-5 text-emerald-500 group-hover/btn:scale-110 transition-transform" />
                          <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 group-hover/btn:text-white transition-colors italic leading-none">Official Rules</span>
                       </div>
                       <ChevronRight className="w-4 h-4 text-gray-800 group-hover/btn:text-emerald-500 transition-colors" />
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
