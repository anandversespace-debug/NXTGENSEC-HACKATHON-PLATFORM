'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Lock, 
  ShieldCheck, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  AlertCircle,
  Terminal,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (password !== confirmPassword) {
      setError('Cryptographic hashes do not match. Please re-verify.');
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password complexity insufficient. Minimum 6 characters required.');
      setIsLoading(false);
      return;
    }

    try {
      // Sending to backend which will handle MongoDB update
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const endpoint = baseUrl.endsWith('/api') ? '/auth/reset-password' : '/api/auth/reset-password';
      
      const res = await fetch(`${baseUrl}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, new_password: password })
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => router.push('/login'), 2000);
      } else {
        setError(data.error || 'System failed to rotate cryptographic credentials.');
      }
    } catch (err) {
      setError('Inbound network failure. Node connection lost.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-6 relative overflow-hidden">
       {/* High-Clearance Background Visuals */}
       <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent pointer-events-none opacity-50 blur-3xl"></div>
       <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
       
       <motion.div 
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         className="w-full max-w-md relative z-10"
       >
          <header className="text-center mb-10">
             <div className="w-16 h-16 rounded-2xl bg-[#0c0c0c] border border-white/5 flex items-center justify-center mx-auto mb-6 shadow-2xl relative group">
                <div className="absolute inset-0 bg-blue-600/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-full"></div>
                <Lock className="w-8 h-8 text-blue-500" />
             </div>
             <h1 className="text-2xl font-black italic uppercase tracking-tighter text-white mb-2">Rotate Access Keys</h1>
             <p className="text-xs text-gray-500 font-bold uppercase tracking-widest leading-loose">
               Establishing secure channel for <span className="text-blue-500">{email || 'unidentified_node'}</span>
             </p>
          </header>

          <div className="bg-[#0c0c0c] border border-white/5 p-8 rounded-2xl shadow-2xl relative overflow-hidden">
             {/* Security Line Accent */}
             <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-600 to-indigo-600"></div>

             {success ? (
               <motion.div 
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="text-center py-10"
               >
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-6">
                     <ShieldCheck className="w-6 h-6 text-emerald-500" />
                  </div>
                  <h3 className="text-lg font-bold text-white uppercase tracking-tight mb-2">Key Synchronized</h3>
                  <p className="text-xs text-gray-400 font-medium">Redirecting to primary login gateway...</p>
               </motion.div>
             ) : (
               <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl flex items-start space-x-3"
                    >
                       <ShieldAlert className="w-4 h-4 text-red-500 mt-0.5" />
                       <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">{error}</span>
                    </motion.div>
                  )}

                  <div className="space-y-2">
                     <label className="text-[9px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">Establish New Payload</label>
                     <div className="relative group">
                        <input 
                          type={showPassword ? 'text' : 'password'}
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full bg-[#050505] border border-white/10 rounded-xl py-4 pl-12 pr-12 text-xs text-white focus:outline-none focus:border-blue-500/50 transition-all font-medium shadow-inner"
                        />
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-700 group-focus-within:text-blue-500 transition-colors" />
                        <button 
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-gray-700 hover:text-white transition-colors"
                        >
                           {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                     </div>
                  </div>

                  <div className="space-y-2">
                     <label className="text-[9px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">Confirm Payload</label>
                     <div className="relative group">
                        <input 
                          type={showPassword ? 'text' : 'password'}
                          required
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full bg-[#050505] border border-white/10 rounded-xl py-4 pl-12 pr-12 text-xs text-white focus:outline-none focus:border-blue-500/50 transition-all font-medium shadow-inner"
                        />
                        <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-700 group-focus-within:text-indigo-500 transition-colors" />
                     </div>
                  </div>

                  <div className="pt-4">
                     <button 
                       type="submit" 
                       disabled={isLoading}
                       className="w-full group bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-xl text-xs font-bold uppercase tracking-[0.2em] shadow-xl shadow-blue-900/20 disabled:opacity-50 transition-all flex items-center justify-center space-x-2"
                     >
                        {isLoading ? (
                           <span className="animate-pulse">Locking In...</span>
                        ) : (
                           <>
                              <span>Authorize Rotation</span>
                              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                           </>
                        )}
                     </button>
                  </div>
               </form>
             )}
          </div>

          <div className="mt-8 text-center">
             <Link href="/login" className="flex items-center justify-center space-x-2 text-gray-600 hover:text-white transition-colors group">
                <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
                <span className="text-[10px] font-black uppercase tracking-widest">Abort Process</span>
             </Link>
          </div>
       </motion.div>

       {/* System Telemetry Mock */}
       <div className="fixed bottom-6 left-6 flex items-center space-x-2 opacity-50">
          <Terminal className="w-3.5 h-3.5 text-blue-500" />
          <span className="text-[8px] font-bold text-gray-600 uppercase tracking-widest italic">Channel Secured via SHA-256 Rotation</span>
       </div>
    </div>
  );
}
