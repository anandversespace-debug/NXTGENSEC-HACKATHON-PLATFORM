'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Lock, User, UserPlus, Shield, ShieldCheck } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      setMessage({ type: 'error', text: error.message });
      setLoading(false);
    } else {
      setMessage({ type: 'success', text: 'Identity registered. Check email for confirmation.' });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-6 bg-[#050505]">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm"
      >
        <div className="bg-[#0c0c0c] border border-white/5 p-8 md:p-10 rounded-lg shadow-2xl">
          <div className="text-center mb-10">
             <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-900/40">
                <Shield className="w-5 h-5 text-white" />
             </div>
            <h1 className="text-xl font-bold mb-1 uppercase tracking-tight italic">Initialize Identity</h1>
            <p className="text-[10px] text-gray-600 font-bold uppercase tracking-[0.2em]">Create Platform Backbone Node</p>
          </div>

          {message && (
            <div className={`p-3 rounded text-[10px] font-bold uppercase tracking-tighter mb-6 text-center italic border flex items-center justify-center space-x-2 ${
              message.type === 'error' 
                ? 'bg-red-500/5 border-red-500/10 text-red-500/80' 
                : 'bg-emerald-500/5 border-emerald-500/10 text-emerald-500/80'
            }`}>
              {message.type === 'success' ? <ShieldCheck className="w-3.5 h-3.5" /> : <Shield className="w-3.5 h-3.5 text-red-500" />}
              <span>{message.text}</span>
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="text-[9px] font-bold text-gray-700 uppercase tracking-widest mb-1.5 block ml-1">Entity_Alias</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-700 font-bold" />
                <input
                  type="text"
                  className="w-full bg-[#080808] border border-white/5 rounded-md py-2.5 pl-10 pr-4 text-xs text-gray-300 focus:outline-none focus:border-blue-500/30 transition-all font-mono"
                  placeholder="USER_NAME"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-[9px] font-bold text-gray-700 uppercase tracking-widest mb-1.5 block ml-1">Credential_Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-700 font-bold" />
                <input
                  type="email"
                  className="w-full bg-[#080808] border border-white/5 rounded-md py-2.5 pl-10 pr-4 text-xs text-gray-300 focus:outline-none focus:border-blue-500/30 transition-all font-mono"
                  placeholder="USER_AUTH_ID"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-[9px] font-bold text-gray-700 uppercase tracking-widest mb-1.5 block ml-1">Encryption_Key</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-700" />
                <input
                  type="password"
                  className="w-full bg-[#080808] border border-white/5 rounded-md py-2.5 pl-10 pr-4 text-xs text-white focus:outline-none focus:border-blue-500/30 transition-all"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-500 text-white w-full py-3 rounded-md text-[10px] font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center space-x-2 shadow-lg shadow-blue-900/20 disabled:opacity-50 mt-8"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>{loading ? 'Processing...' : 'Deploy Identity'}</span>
            </button>
          </form>

          <p className="mt-8 text-center text-[9px] font-bold text-gray-700 uppercase tracking-widest">
            Identity already exists?{' '}
            <Link href="/login" className="text-blue-600 hover:text-blue-500 underline underline-offset-4 decoration-blue-500/20">
              Establish Link
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupPage;
