'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, LogIn, ShieldAlert, Fingerprint, Loader2, KeyRound, ArrowLeft, Github } from 'lucide-react';
import { useRouter } from 'next/navigation';
import AuthSection from '@/components/auth/AuthSection';
import { GoogleLogin } from '@react-oauth/google';
import { startAuthentication } from '@simplewebauthn/browser';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otpToken, setOtpToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [requires2fa, setRequires2fa] = useState(false);
  const [pendingUserId, setPendingUserId] = useState<string | null>(null);
  const router = useRouter();

  const handleOAuthSuccess = async (token: string, provider: 'google' | 'github') => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${baseUrl}/auth/${provider}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
        credentials: 'include'
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');
      localStorage.setItem('token', data.token);
      const { useAuthStore } = await import('@/store/useAuthStore');
      useAuthStore.getState().setUser(data.user);
      finalizeLogin(data.user);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${baseUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');
      if (data.requires2fa) {
        setRequires2fa(true);
        setPendingUserId(data.userId);
        setLoading(false);
        return;
      }
      localStorage.setItem('token', data.token);
      const { useAuthStore } = await import('@/store/useAuthStore');
      useAuthStore.getState().setUser(data.user);
      finalizeLogin(data.user);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handle2faVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${baseUrl}/auth/2fa/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: otpToken, userId: pendingUserId }),
        credentials: 'include'
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Invalid code');
      localStorage.setItem('token', data.token);
      const { useAuthStore } = await import('@/store/useAuthStore');
      useAuthStore.getState().setUser(data.user);
      finalizeLogin(data.user);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handlePasskeyLogin = async () => {
    if (!email) {
      setError('Enter your email to use passkey login.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const optionsRes = await fetch(`${baseUrl}/auth/passkey/login/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
        credentials: 'include'
      });
      if (!optionsRes.ok) throw new Error('No passkey found.');
      const options = await optionsRes.json();
      const assertion = await startAuthentication(options);
      const finishRes = await fetch(`${baseUrl}/auth/passkey/login/finish`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ body: assertion, email }),
        credentials: 'include'
      });
      const data = await finishRes.json();
      if (!finishRes.ok) throw new Error(data.error || 'Verification failed');
      localStorage.setItem('token', data.token);
      const { useAuthStore } = await import('@/store/useAuthStore');
      useAuthStore.getState().setUser(data.user);
      finalizeLogin(data.user);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const finalizeLogin = (user: any) => {
    if (user?.role === 'admin') window.location.href = '/admin';
    else if (user?.role === 'organizer') window.location.href = '/organizer';
    else if (user && !user.onboarded) window.location.href = '/onboarding';
    else window.location.href = '/dashboard';
  };

  return (
    <AuthSection 
       title={requires2fa ? "Verification" : "Welcome Back"} 
       subtitle={requires2fa ? "Enter the 6-digit code from your authenticator app." : "Signin to access your account dashboard."}
    >
        {error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-500/5 border border-red-500/10 text-red-500 p-3.5 rounded-xl text-[10px] font-bold uppercase tracking-widest mb-6 flex items-center space-x-3 italic shadow-sm"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>{error}</span>
            </motion.div>
        )}

        {!requires2fa ? (
          <>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="text-left space-y-2">
                <label className="text-[10px] font-black text-gray-700 uppercase tracking-widest mb-1 block ml-1 italic">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-700 group-focus-within:text-blue-500 transition-all" />
                  <input
                    type="email"
                    className="w-full bg-[#0a0b14] border border-white/5 rounded-xl py-4 pl-12 pr-6 text-xs text-white placeholder-gray-800 focus:outline-none focus:border-blue-600/40 transition-all font-medium italic"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="text-left space-y-2">
                <div className="flex items-center justify-between mb-1 px-1">
                  <label className="text-[10px] font-black text-gray-700 uppercase tracking-widest italic">Password</label>
                  <Link href="/forgot-password" title="Access Recovery" className="text-[9px] font-black text-blue-500 hover:text-blue-400 uppercase tracking-widest transition-colors italic">
                    Forgot?
                  </Link>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-700 group-focus-within:text-blue-500 transition-all" />
                  <input
                    type="password"
                    className="w-full bg-[#0a0b14] border border-white/5 rounded-xl py-4 pl-12 pr-6 text-xs text-white placeholder-gray-800 focus:outline-none focus:border-blue-600/40 transition-all font-medium italic"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 font-black italic">
                 <button
                   type="submit"
                   disabled={loading}
                   className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center space-x-2 shadow-lg disabled:opacity-20 active:scale-95"
                 >
                   {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <LogIn className="w-3.5 h-3.5" />}
                   <span>Login</span>
                 </button>

                 <button
                   type="button"
                   disabled={loading}
                   onClick={handlePasskeyLogin}
                   className="w-full bg-white/5 border border-white/5 text-gray-600 hover:text-white py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center space-x-2 shadow-sm italic"
                 >
                   <Fingerprint className="w-3.5 h-3.5" />
                   <span>Passkey</span>
                 </button>
              </div>
            </form>

            <div className="mt-8 space-y-4">
                <div className="relative flex items-center">
                   <div className="flex-grow border-t border-white/[0.03]"></div>
                   <span className="flex-shrink mx-4 text-[9px] font-black text-gray-800 uppercase tracking-widest italic">Quick Link</span>
                   <div className="flex-grow border-t border-white/[0.03]"></div>
                </div>

                 <div className="grid grid-cols-2 gap-3">
                   <div className="flex justify-center w-full bg-[#0a0b14] rounded-xl border border-white/5 overflow-hidden transition-all p-0.5">
                     <GoogleLogin 
                       onSuccess={(c) => c.credential && handleOAuthSuccess(c.credential, 'google')}
                       onError={() => setError('Google link failed')}
                       theme="filled_black" shape="pill" width={320} text="continue_with"
                     />
                   </div>
                   
                   <button 
                     onClick={() => {
                       const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
                       window.location.href = `${baseUrl}/auth/github`;
                     }}
                     className="w-full bg-[#0a0b14] hover:bg-white/5 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center space-x-2 border border-white/5 group shadow-sm italic"
                   >
                      <Github className="w-3.5 h-3.5 text-gray-700 group-hover:text-white transition-colors" />
                      <span>GitHub</span>
                   </button>
                 </div>
            </div>
          </>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}>
            <form onSubmit={handle2faVerify} className="space-y-6">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center mb-6 shadow-xl">
                   <KeyRound className="w-8 h-8 text-blue-500 animate-pulse" />
                </div>
                
                <div className="space-y-4 w-full">
                  <label className="text-[10px] font-black text-gray-700 uppercase tracking-widest text-center block italic">Authenticator Code</label>
                  <input
                    type="text"
                    className="w-full bg-[#0a0b14] border border-white/5 rounded-2xl py-5 px-4 text-center text-3xl font-mono tracking-[0.4em] text-white placeholder-gray-900 focus:outline-none focus:border-blue-500/50 transition-all font-black"
                    placeholder="000000"
                    value={otpToken}
                    onChange={(e) => setOtpToken(e.target.value)}
                    required
                    autoFocus
                  />
                </div>
              </div>

              <div className="flex flex-col space-y-3 pt-2 font-black italic">
                 <button
                   type="submit"
                   disabled={loading || otpToken.length < 6}
                   className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all shadow-xl disabled:opacity-20 active:scale-95"
                 >
                   {loading ? <Loader2 className="w-4 h-4 animate-spin mx-auto text-white" /> : 'Confirm Code'}
                 </button>
                 
                 <button
                   type="button"
                   onClick={() => setRequires2fa(false)}
                   className="w-full py-3 text-[9px] font-black text-gray-700 hover:text-white transition-all uppercase tracking-widest italic underline underline-offset-8"
                 >
                   Cancel
                 </button>
              </div>
            </form>
          </motion.div>
        )}

        <div className="mt-12 pt-6 border-t border-white/[0.03] text-center italic">
          <p className="text-[10px] font-black text-gray-700 uppercase tracking-widest leading-relaxed">
            Need an account?{' '}
            <Link href="/signup" className="text-blue-500 hover:text-blue-400 transition-colors ml-1 font-black underline underline-offset-4 decoration-blue-500/20">
              Signup
            </Link>
          </p>
        </div>
    </AuthSection>
  );
};

export default LoginPage;
