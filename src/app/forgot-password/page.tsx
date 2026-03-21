'use client';

import React, { useState } from 'react';
import { Mail, ArrowLeft, Loader2, ShieldAlert, ShieldCheck, ChevronRight, Zap } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import AuthSection from '@/components/auth/AuthSection';
import { cn } from '@/lib/utils';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const endpoint = baseUrl.endsWith('/api') ? '/mail/forgot-password' : '/api/mail/forgot-password';

      const res = await fetch(`${baseUrl}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      if (res.ok) {
        setSuccess(true);
      } else {
        const data = await res.json();
        setError(data.error || 'Account not found.');
      }
    } catch (err) {
      setError('Network error. Connection lost.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthSection 
       title="Reset Password" 
       subtitle="Enter your email to receive a password reset link."
    >
        {success ? (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-left space-y-6 py-6">
             <div className="p-6 bg-blue-600/10 border border-blue-600/20 rounded-2xl flex items-center space-x-4 shadow-xl shadow-blue-900/10">
                <div className="w-12 h-12 bg-blue-600/10 rounded-xl flex items-center justify-center border border-blue-500/10 shadow-lg">
                   <ShieldCheck className="w-6 h-6 text-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.2)]" />
                </div>
                <div className="flex flex-col text-left">
                   <p className="text-[11px] font-black text-white uppercase tracking-tighter italic">Link Sent</p>
                   <p className="text-[9px] text-blue-500/60 uppercase tracking-widest font-black mt-1 italic">Check your email</p>
                </div>
             </div>
             <p className="text-[11px] text-gray-700 font-bold uppercase tracking-widest leading-relaxed italic max-w-sm">
                We have sent a reset link to your email. Please follow the instructions to reset your password.
             </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 text-left">
             {error && (
               <motion.div 
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="bg-red-500/5 border border-red-500/10 p-4 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center space-x-3 italic text-red-500 shadow-sm"
               >
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
               </motion.div>
             )}

             <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-700 uppercase tracking-widest ml-1 italic">Email Address</label>
                <div className="relative group">
                   <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-700 group-focus-within:text-blue-500 transition-colors" />
                   <input 
                     type="email"
                     required
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     placeholder="you@example.com"
                     className="w-full bg-[#0a0b14] border border-white/5 rounded-xl py-4 pl-12 pr-6 text-xs text-white placeholder-gray-800 focus:outline-none focus:border-blue-600/40 transition-all font-medium italic"
                   />
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
                     <Zap className="w-3.5 h-3.5 group-hover:animate-pulse" />
                     <span>Send Reset Link</span>
                     <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
             </button>
          </form>
        )}

        <div className="mt-12 text-center border-t border-white/[0.03] pt-6 italic">
           <Link href="/login" className="flex items-center justify-center space-x-2 text-gray-700 hover:text-white transition-all group active:scale-95">
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              <span className="text-[10px] font-black uppercase tracking-widest underline underline-offset-8 decoration-white/5">Back to Login</span>
           </Link>
        </div>
    </AuthSection>
  );
}
