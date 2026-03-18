'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Lock, 
  UserPlus, 
  User, 
  ShieldAlert, 
  Terminal, 
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  KeyRound
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SetupAdminPage() {
  const [formData, setFormData] = useState({
    setup_key: '',
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError('Cryptographic hashes do not match. Verify your encryption key.');
      setLoading(false);
      return;
    }

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const endpoint = baseUrl.endsWith('/api') ? '/auth/setup' : '/api/auth/setup';

      const res = await fetch(`${baseUrl}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          setup_key: formData.setup_key,
          email: formData.email,
          password: formData.password,
          name: formData.name,
          username: formData.username
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Admin initialization failed.');
      }

      setSuccess(true);
      
      // Redirect after a short delay
      setTimeout(() => router.push('/login?admin=true'), 3000);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-6 bg-[#050505] relative overflow-hidden">
       {/* Ambient Backing Vectors */}
       <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03]">
          <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-emerald-500 rounded-full blur-[150px]"></div>
          <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-blue-500 rounded-full blur-[150px]"></div>
       </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-[#0c0c0c] border border-white/5 p-8 md:p-10 rounded-2xl shadow-2xl relative overflow-hidden">
           {/* Security Line Accent */}
           <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-emerald-600 to-blue-600"></div>

          <div className="text-center mb-10">
             <div className="w-12 h-12 bg-white/[0.02] border border-white/10 rounded-xl flex items-center justify-center mx-auto mb-6 group hover:border-emerald-500/30 transition-all duration-500">
                <ShieldCheck className="w-6 h-6 text-emerald-500 group-hover:scale-110 transition-transform" />
             </div>
            <h1 className="text-2xl font-black italic uppercase tracking-tighter text-white mb-1">Commander <span className="text-emerald-500">Initialization</span></h1>
            <p className="text-[10px] text-gray-600 font-bold uppercase tracking-[0.2em]">Network Root Administrator Setup</p>
          </div>

          {success ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12 space-y-6">
               <div className="relative">
                  <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                     <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                  </div>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 border-2 border-emerald-500/30 rounded-full animate-ping opacity-20"></div>
               </div>
               <div>
                  <h3 className="text-xl font-bold text-white uppercase tracking-tight mb-2">Admin Registered</h3>
                  <p className="text-xs text-gray-500 font-medium leading-relaxed">Highest privileges granted. Redirecting to primary login.</p>
               </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSignup} className="space-y-4">
               {error && (
                 <motion.div 
                   initial={{ opacity: 0, x: -10 }}
                   animate={{ opacity: 1, x: 0 }}
                   className="bg-red-500/5 border border-red-500/10 text-red-500 p-3 rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center space-x-3 mb-6"
                 >
                    <ShieldAlert className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                 </motion.div>
               )}

              <div className="space-y-2">
                <label className="text-[9px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1 text-emerald-500/70">Master Setup Key</label>
                <div className="relative">
                  <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-emerald-500" />
                  <input
                    type="password"
                    name="setup_key"
                    required
                    className="w-full bg-[#050505] border border-emerald-500/20 rounded-xl py-3 pl-11 pr-4 text-xs text-emerald-500 focus:outline-none focus:border-emerald-500/80 transition-all font-mono shadow-inner shadow-emerald-900/10 border-dashed"
                    placeholder="REQUIRED_KEY"
                    value={formData.setup_key}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                 <div className="space-y-2">
                   <label className="text-[9px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">Commander Name</label>
                   <div className="relative">
                     <User className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-700" />
                     <input
                       type="text"
                       name="name"
                       required
                       className="w-full bg-[#050505] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-xs text-gray-300 focus:outline-none focus:border-emerald-500/50 transition-all font-medium"
                       placeholder="Identity"
                       value={formData.name}
                       onChange={handleChange}
                     />
                   </div>
                 </div>
                 <div className="space-y-2">
                   <label className="text-[9px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">Entity Alias</label>
                   <div className="relative">
                     <Terminal className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-700" />
                     <input
                       type="text"
                       name="username"
                       required
                       className="w-full bg-[#050505] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-xs text-emerald-500 focus:outline-none focus:border-emerald-500/50 transition-all font-mono lowercase"
                       placeholder="root_node"
                       value={formData.username}
                       onChange={handleChange}
                     />
                   </div>
                 </div>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">Inbound Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-700 font-bold" />
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full bg-[#050505] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-xs text-gray-300 focus:outline-none focus:border-emerald-500/50 transition-all font-medium"
                    placeholder="admin@network.io"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">Encryption Key</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-700" />
                  <input
                    type="password"
                    name="password"
                    required
                    className="w-full bg-[#050505] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-xs text-white focus:outline-none focus:border-emerald-500/50 transition-all"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">Confirm Encryption</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-700" />
                  <input
                    type="password"
                    name="confirmPassword"
                    required
                    className="w-full bg-[#050505] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-xs text-white focus:outline-none focus:border-emerald-500/50 transition-all"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group relative w-full bg-emerald-600 hover:bg-emerald-500 text-white py-4 rounded-xl text-xs font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center space-x-2 shadow-xl shadow-emerald-900/20 disabled:opacity-50 mt-8"
              >
                {loading ? (
                   <span className="animate-pulse">Synthesizing Admin...</span>
                ) : (
                   <>
                     <UserPlus className="w-4 h-4" />
                     <span>Establish Admin Node</span>
                     <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                   </>
                )}
              </button>
            </form>
          )}

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/[0.03]"></div>
            </div>
            <div className="relative flex justify-center text-[9px] uppercase tracking-widest leading-none">
              <span className="bg-[#0c0c0c] px-3 text-gray-700">Protocol Registry</span>
            </div>
          </div>

          <p className="text-center text-[9px] font-bold text-gray-700 uppercase tracking-widest">
            Standard Initialization?{' '}
            <Link href="/signup" className="text-emerald-600 hover:text-emerald-500 underline underline-offset-4 decoration-emerald-500/20">
              Access Node Setup
            </Link>
          </p>
        </div>
      </motion.div>
      
      {/* Platform Telemetry Footer */}
      <div className="fixed bottom-10 flex items-center justify-center w-full space-x-12 opacity-30 select-none pointer-events-none">
          {['AUTH_CORE_V2', 'ADMIN_ELEVATION', 'SSL_HANDSHAKE_READY'].map(label => (
             <div key={label} className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                <span className="text-[8px] font-black tracking-widest text-gray-400">{label}</span>
             </div>
          ))}
      </div>
    </div>
  );
}
