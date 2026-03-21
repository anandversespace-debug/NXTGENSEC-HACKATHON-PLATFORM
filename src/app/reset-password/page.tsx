'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Lock, 
  ShieldCheck, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  ChevronRight,
  ShieldAlert,
  Zap,
  Loader2,
  LockKeyhole
} from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import AuthSection from '@/components/auth/AuthSection';
import { cn } from '@/lib/utils';

function ResetPasswordForm() {
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
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      setIsLoading(false);
      return;
    }

    try {
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
        setTimeout(() => router.push('/login'), 2500);
      } else {
        setError(data.error || 'Identity verification failed.');
      }
    } catch (err) {
      setError('Network failure. Connection lost.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthSection 
       title="Set Password" 
       subtitle={`Setup your new credentials for: ${email || 'your account'}`}
    >
          {success ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-left space-y-6 py-6">
               <div className="p-6 bg-blue-600/10 border border-blue-600/20 rounded-2xl flex items-center space-x-4 shadow-xl shadow-blue-900/10">
                  <div className="w-12 h-12 bg-blue-600/10 rounded-xl flex items-center justify-center border border-blue-500/10 shadow-lg">
                     <ShieldCheck className="w-6 h-6 text-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.2)] animate-pulse" />
                  </div>
                  <div className="flex flex-col text-left">
                     <p className="text-[11px] font-black text-white uppercase tracking-tighter italic">Password Updated</p>
                     <p className="text-[9px] text-blue-500/60 uppercase tracking-widest font-black mt-1 italic">Registry successfully sync</p>
                  </div>
               </div>
               <p className="text-[11px] text-gray-700 font-bold uppercase tracking-widest leading-relaxed italic max-w-sm">
                  Identity Secured... Synchronizing with login terminal.
               </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 text-left">
               {error && (
                 <motion.div 
                   initial={{ opacity: 0, scale: 0.95 }}
                   animate={{ opacity: 1, scale: 1 }}
                   className="bg-red-500/5 border border-red-500/10 text-red-500 p-4 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center space-x-3 italic shadow-sm"
                 >
                    <ShieldAlert className="w-4 h-4 shrink-0" />
                    <span className="text-left">{error}</span>
                 </motion.div>
               )}

               <div className="space-y-4">
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-gray-700 uppercase tracking-widest ml-1 italic">New Password</label>
                     <div className="relative group">
                        <input 
                           type={showPassword ? 'text' : 'password'}
                           required
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           placeholder="••••••••"
                           className="w-full bg-[#0a0b14] border border-white/5 rounded-xl py-3.5 pl-11 pr-12 text-xs text-white placeholder-gray-800 focus:outline-none focus:border-blue-600/40 transition-all font-medium italic"
                        />
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-700 group-focus-within:text-blue-500 transition-colors" />
                        <button 
                           type="button"
                           onClick={() => setShowPassword(!showPassword)}
                           className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-gray-700 hover:text-white transition-colors"
                        >
                           {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                     </div>
                  </div>

                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-gray-700 uppercase tracking-widest ml-1 italic">Confirm Password</label>
                     <div className="relative group">
                        <input 
                           type={showPassword ? 'text' : 'password'}
                           required
                           value={confirmPassword}
                           onChange={(e) => setConfirmPassword(e.target.value)}
                           placeholder="••••••••"
                           className="w-full bg-[#0a0b14] border border-white/5 rounded-xl py-3.5 pl-11 pr-4 text-xs text-white placeholder-gray-800 focus:outline-none focus:border-blue-600/40 transition-all font-medium italic"
                        />
                        <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-700 group-focus-within:text-blue-500 transition-colors" />
                     </div>
                  </div>
               </div>

               <button 
                  type="submit" 
                  disabled={isLoading}
                  className="group w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center space-x-3 shadow-lg disabled:opacity-20 italic active:scale-95"
               >
                  {isLoading ? (
                     <Loader2 className="w-4 h-4 animate-spin mx-auto text-white" />
                  ) : (
                    <>
                       <LockKeyhole className="w-4 h-4 group-hover:scale-110 transition-transform" />
                       <span>Reset Password</span>
                       <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
               </button>
            </form>
          )}

          <div className="mt-12 text-center border-t border-white/[0.03] pt-6 italic">
             <Link href="/login" className="flex items-center justify-center space-x-2 text-gray-700 hover:text-white transition-all group active:scale-95">
                <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1.5 transition-transform" />
                <span className="text-[10px] font-black uppercase tracking-widest underline underline-offset-8 decoration-white/5">Back to Login</span>
             </Link>
          </div>
    </AuthSection>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center space-y-4">
          <div className="w-9 h-9 border-2 border-blue-600/20 border-t-blue-500 rounded-full animate-spin shadow-lg" />
          <div className="text-blue-500 font-black italic animate-pulse tracking-widest uppercase text-[10px]">Syncing...</div>
      </div>
    }>
      <ResetPasswordForm />
    </Suspense>
  );
}
