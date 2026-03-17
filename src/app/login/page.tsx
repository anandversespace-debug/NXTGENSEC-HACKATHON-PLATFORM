'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, Github, Shield, ShieldAlert } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push('/dashboard');
    }
  };

  const handleGithubLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-6 bg-[#050505]">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-sm:px-4 max-w-sm"
      >
        <div className="bg-[#0c0c0c] border border-white/5 p-8 md:p-10 rounded-lg shadow-2xl">
          <div className="text-center mb-10">
             <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-900/40">
                <Shield className="w-5 h-5 text-white" />
             </div>
            <h1 className="text-xl font-bold mb-1 uppercase tracking-tight italic">Identity Link</h1>
            <p className="text-[10px] text-gray-600 font-bold uppercase tracking-[0.2em]">Platform Credential Verification</p>
          </div>

          {error && (
            <div className="bg-red-500/5 border border-red-500/10 text-red-500/80 p-3 rounded text-[10px] font-bold uppercase tracking-tighter mb-6 text-center italic flex items-center justify-center space-x-2">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
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
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-500 text-white w-full py-3 rounded-md text-[10px] font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center space-x-2 shadow-lg shadow-blue-900/20 disabled:opacity-50 mt-8"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>{loading ? 'Authenticating...' : 'Establish Link'}</span>
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/[0.03]"></div>
            </div>
            <div className="relative flex justify-center text-[9px] uppercase tracking-widest">
              <span className="bg-[#0c0c0c] px-3 text-gray-700">Secondary Protocols</span>
            </div>
          </div>

          <button
            onClick={handleGithubLogin}
            className="w-full py-2.5 px-4 bg-[#080808] border border-white/5 rounded-md hover:bg-white/[0.05] transition-all flex items-center justify-center space-x-3 text-gray-500 hover:text-white text-[10px] font-bold uppercase tracking-widest"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub_Auth</span>
          </button>

          <p className="mt-8 text-center text-[9px] font-bold text-gray-700 uppercase tracking-widest">
            Identity Not Found?{' '}
            <Link href="/signup" className="text-blue-600 hover:text-blue-500 underline underline-offset-4 decoration-blue-500/20">
              Create Node
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
