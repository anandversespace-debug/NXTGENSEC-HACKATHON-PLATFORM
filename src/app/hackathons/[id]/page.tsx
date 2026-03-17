'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Calendar, Clock, Trophy, MapPin, Users, ArrowLeft, Shield, Users2, BrainCircuit } from 'lucide-react';
import { Hackathon } from '@/types';
import Link from 'next/link';

const HackathonDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const [hackathon, setHackathon] = useState<Hackathon | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHackathon = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/hackathons/${params.id}`);
        if (!res.ok) throw new Error('Hackathon not found');
        const data = await res.json();
        setHackathon(data);
      } catch (err) {
        console.error(err);
        router.push('/hackathons');
      } finally {
        setLoading(false);
      }
    };
    fetchHackathon();
  }, [params.id, router]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505]">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (!hackathon) return null;

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <Link href="/hackathons" className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors mb-12 group">
           <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
           <span className="font-medium text-sm">Back to Events</span>
        </Link>

        {/* Hero Section */}
        <div className="glass-card mb-12 overflow-hidden border-white/5">
           <div className="relative h-64 md:h-96">
              <img src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1200&h=400" className="w-full h-full object-cover grayscale opacity-30" alt="" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent"></div>
              <div className="absolute bottom-12 left-12 right-12">
                 <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                       <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-black rounded mb-4">OPEN FOR REGISTRATION</span>
                       <h1 className="text-4xl md:text-6xl font-bold tracking-tight">{hackathon.title}</h1>
                    </div>
                    <Link href={`/hackathons/register`} className="btn-primary py-4 px-12 shadow-[0_0_30px_rgba(37,99,235,0.4)]">
                        Register Now
                    </Link>
                 </div>
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
           {/* Detailed Information */}
           <div className="lg:col-span-2 space-y-12">
              <div className="space-y-6">
                 <h2 className="text-3xl font-bold">About the Challenge</h2>
                 <p className="text-gray-400 text-lg leading-relaxed">{hackathon.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {[
                   { label: 'Timeframe', value: '48 Hours', icon: Clock },
                   { label: 'Location', value: 'Worldwide (Virtual)', icon: MapPin },
                   { label: 'Participants', value: '500+ Devs', icon: Users }
                 ].map((item, i) => (
                   <div key={i} className="glass-card p-6 border-white/5">
                      <item.icon className="w-6 h-6 text-blue-500 mb-4" />
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">{item.label}</p>
                      <p className="font-bold text-white">{item.value}</p>
                   </div>
                 ))}
              </div>

              <div className="glass-card p-8">
                 <h3 className="text-2xl font-bold mb-8 flex items-center space-x-3">
                    <Trophy className="w-7 h-7 text-amber-500" />
                    <span>Prize Pool & Bounties</span>
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20 rounded-2xl">
                       <p className="text-sm font-bold text-amber-500 mb-1">Grand Champion</p>
                       <p className="text-3xl font-black text-white">$5,000</p>
                    </div>
                    <div className="p-6 bg-slate-500/10 border border-slate-500/20 rounded-2xl">
                       <p className="text-sm font-bold text-slate-400 mb-1">Innovation Lead</p>
                       <p className="text-3xl font-black text-white">$3,000</p>
                    </div>
                 </div>
              </div>
           </div>

           {/* Sidebar Timeline/Resources */}
           <div className="lg:col-span-1 space-y-8">
              <div className="glass-card p-8 bg-blue-600/5 border-blue-600/20">
                 <h3 className="text-lg font-bold mb-6">Event Timeline</h3>
                 <div className="space-y-8 relative">
                    <div className="absolute left-2.5 top-2 bottom-2 w-px bg-blue-600/30"></div>
                    {[
                      { title: 'Opening Ceremony', time: 'April 15, 09:00 AM', status: 'upcoming' },
                      { title: 'Development Phase', time: 'April 15 - 17', status: 'pending' },
                      { title: 'Judging & Demo', time: 'April 17, 04:00 PM', status: 'pending' }
                    ].map((step, i) => (
                      <div key={i} className="flex items-start space-x-6 relative z-10">
                         <div className={`w-5 h-5 rounded-full mt-1 border-2 border-[#0a0a0a] ${i === 0 ? 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'bg-gray-800'}`}></div>
                         <div>
                            <p className="text-sm font-bold text-white">{step.title}</p>
                            <p className="text-xs text-gray-500">{step.time}</p>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="glass-card p-8">
                 <h3 className="text-lg font-bold mb-6">Resources</h3>
                 <div className="space-y-4">
                    <button className="w-full text-left p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors flex items-center justify-between group">
                       <div className="flex items-center space-x-3">
                          <BrainCircuit className="w-5 h-5 text-violet-400" />
                          <span className="text-sm font-medium">Developer Guide</span>
                       </div>
                    </button>
                    <button className="w-full text-left p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors flex items-center justify-between group">
                       <div className="flex items-center space-x-3">
                          <Shield className="w-5 h-5 text-emerald-400" />
                          <span className="text-sm font-medium">Rules & Scoring</span>
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
