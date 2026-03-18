'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Shield, ShieldCheck, Trophy, ArrowRight, Loader2, Users, Code2, Globe } from 'lucide-react';
import Link from 'next/link';

export default function HackathonRegistrationPage() {
  const params = useParams();
  const router = useRouter();
  const [hackathon, setHackathon] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHackathon = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const res = await fetch(`${baseUrl}/hackathons/${params.id}`);
        if (!res.ok) throw new Error('Hackathon not found.');
        const data = await res.json();
        setHackathon(data);
      } catch (err) {
        console.error(err);
        router.push('/dashboard/hackathons');
      } finally {
        setLoading(false);
      }
    };
    fetchHackathon();
  }, [params.id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${baseUrl}/hackathons/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          hackathon_id: params.id,
          team_name: teamName
        })
      });

      if (res.ok) {
        router.push('/dashboard/hackathons?registered=true');
      } else {
        const data = await res.json();
        setError(data.error || 'Registration failed.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505]">
      <div className="text-blue-500 font-black italic animate-pulse tracking-widest uppercase text-xs">Loading...</div>
    </div>
  );

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 bg-[#050505]">
      <div className="max-w-2xl mx-auto">
        <header className="mb-12 text-center">
           <div className="w-16 h-16 rounded-2xl bg-[#0c0c0c] border border-white/5 flex items-center justify-center mx-auto mb-8 shadow-2xl relative group">
              <div className="absolute inset-0 bg-blue-600/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity rounded-full"></div>
              <ShieldCheck className="w-8 h-8 text-blue-500" />
           </div>
           <h1 className="text-3xl font-black italic uppercase tracking-tighter text-white mb-2">Join Hackathon</h1>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest leading-loose">
               You are joining <span className="text-white italic">{hackathon.title}</span>
            </p>
        </header>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#0c0c0c] border border-white/5 p-10 rounded-3xl relative overflow-hidden"
        >
           <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-600 via-indigo-600 to-transparent"></div>
           
           <form onSubmit={handleSubmit} className="space-y-8">
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl text-[10px] font-black italic uppercase tracking-widest text-red-500 text-center">
                  Error: {error}
                </div>
              )}

              <div className="space-y-4">
                 <div className="bg-[#080808] border border-white/5 p-6 rounded-2xl">
                     <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 mb-4 italic">About the Event</h3>
                    <div className="grid grid-cols-2 gap-4">
                       <div>
                          <p className="text-[8px] font-bold text-gray-700 uppercase tracking-widest mb-1">Event</p>
                          <p className="text-xs font-bold text-gray-300 uppercase tracking-tight">{hackathon.title}</p>
                       </div>
                       <div>
                          <p className="text-[8px] font-bold text-gray-700 uppercase tracking-widest mb-1">Prize Pool</p>
                           <p className="text-xs font-black text-emerald-500 italic tracking-tighter">{hackathon.prize_pool || 'Coming Soon'}</p>
                       </div>
                    </div>
                 </div>

                 <div className="space-y-3">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1 italic">Team Name</label>
                    <div className="relative group">
                       <input 
                         type="text"
                         required
                         value={teamName}
                         onChange={(e) => setTeamName(e.target.value)}
                         placeholder="e.g. Dream Team"
                         className="w-full bg-[#050505] border border-white/10 rounded-xl py-4 px-6 text-xs text-white focus:outline-none focus:border-blue-500/50 transition-all font-bold uppercase tracking-widest placeholder:text-gray-800"
                       />
                       <Users className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-800 group-focus-within:text-blue-500 transition-colors" />
                    </div>
                    <p className="text-[9px] text-gray-700 font-bold uppercase tracking-widest ml-1">This name will be used for your team in this hackathon.</p>
                 </div>
              </div>

              <div className="pt-4">
                 <button 
                   type="submit"
                   disabled={submitting}
                   className="w-full group bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all shadow-2xl shadow-blue-900/20 disabled:opacity-50 flex items-center justify-center space-x-3 active:scale-95"
                 >
                    {submitting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                         <span>Join Now</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                 </button>
              </div>
           </form>
        </motion.div>

        <div className="mt-12 flex items-center justify-center space-x-6 opacity-30">
           <Code2 className="w-4 h-4 text-white" />
           <Globe className="w-4 h-4 text-white" />
           <Shield className="w-4 h-4 text-white" />
        </div>
      </div>
    </div>
  );
}
