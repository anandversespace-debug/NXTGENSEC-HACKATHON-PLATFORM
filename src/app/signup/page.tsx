'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, AtSign, UserPlus, ShieldAlert, CheckCircle2, Github, Loader2, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import AuthSection from '@/components/auth/AuthSection';
import { GoogleLogin } from '@react-oauth/google';

const SignupPage = () => {
  const [formData, setFormData] = useState({
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
      if (!res.ok) throw new Error(data.error || 'Authentication failed');
      localStorage.setItem('token', data.token);
      const { useAuthStore } = await import('@/store/useAuthStore');
      useAuthStore.getState().setUser(data.user);
      if (data.user?.role === 'admin') window.location.href = '/admin';
      else if (data.user?.role === 'organizer') window.location.href = '/organizer';
      else if (data.user && !data.user.onboarded) window.location.href = '/onboarding';
      else window.location.href = '/dashboard';
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      setLoading(false);
      return;
    }
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${baseUrl}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          username: formData.username,
          email: formData.email,
          password: formData.password
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Registration failed');
      setSuccess(true);
      setTimeout(() => router.push('/login'), 2000);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <AuthSection title="Signup" subtitle="Join the platform to start building projects.">
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

        {success ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10 space-y-4">
             <div className="w-16 h-16 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-blue-500/5">
                <CheckCircle2 className="w-8 h-8 text-blue-500 animate-pulse" />
             </div>
             <h3 className="text-xl font-black text-white italic uppercase tracking-tighter leading-none">Account Created</h3>
             <p className="text-[10px] text-gray-600 uppercase tracking-widest font-black italic">Redirecting to login hub...</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSignup} className="space-y-4 text-left">
            <div className="grid grid-cols-2 gap-3 text-left">
               <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-gray-700 uppercase tracking-widest block ml-1 italic">Full Name</label>
                  <div className="relative group">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-700 group-focus-within:text-blue-500 transition-all" />
                    <input
                      name="name"
                      type="text"
                      className="w-full bg-[#0a0b14] border border-white/5 rounded-xl py-3 pl-10 pr-3 text-[11px] text-white placeholder-gray-800 focus:outline-none focus:border-blue-600/40 transition-all font-medium italic"
                      placeholder="John Doe"
                      onChange={handleChange}
                      required
                    />
                  </div>
               </div>
               <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-gray-700 uppercase tracking-widest block ml-1 italic">Username</label>
                  <div className="relative group">
                    <AtSign className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-700 group-focus-within:text-blue-500 transition-all" />
                    <input
                      name="username"
                      type="text"
                      className="w-full bg-[#0a0b14] border border-white/5 rounded-xl py-3 pl-10 pr-3 text-[11px] text-white placeholder-gray-800 focus:outline-none focus:border-blue-600/40 transition-all font-medium italic"
                      placeholder="johndoe_99"
                      onChange={handleChange}
                      required
                    />
                  </div>
               </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[9px] font-black text-gray-700 uppercase tracking-widest block ml-1 italic">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-700 group-focus-within:text-blue-500 transition-all" />
                <input
                  name="email"
                  type="email"
                  className="w-full bg-[#0a0b14] border border-white/5 rounded-xl py-3 pl-10 pr-3 text-[11px] text-white placeholder-gray-800 focus:outline-none focus:border-blue-600/40 transition-all font-medium italic"
                  placeholder="name@email.com"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-left">
               <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-gray-700 uppercase tracking-widest block ml-1 italic">Password</label>
                  <div className="relative group">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-700 group-focus-within:text-blue-500 transition-all" />
                    <input
                      name="password"
                      type="password"
                      className="w-full bg-[#0a0b14] border border-white/5 rounded-xl py-3 pl-10 pr-3 text-[11px] text-white placeholder-gray-800 focus:outline-none focus:border-blue-600/40 transition-all font-medium italic"
                      placeholder="••••••••"
                      onChange={handleChange}
                      required
                    />
                  </div>
               </div>
               <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-gray-700 uppercase tracking-widest block ml-1 italic">Confirm</label>
                  <div className="relative group">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-700 group-focus-within:text-blue-500 transition-all" />
                    <input
                      name="confirmPassword"
                      type="password"
                      className="w-full bg-[#0a0b14] border border-white/5 rounded-xl py-3 pl-10 pr-3 text-[11px] text-white placeholder-gray-800 focus:outline-none focus:border-blue-600/40 transition-all font-medium italic"
                      placeholder="••••••••"
                      onChange={handleChange}
                      required
                    />
                  </div>
               </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center space-x-2 shadow-lg disabled:opacity-20 mt-2 active:scale-95 group italic"
            >
              {loading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <>
                   <UserPlus className="w-3.5 h-3.5" />
                   <span>Create Account</span>
                   <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </>
              )}
            </button>
          </form>
        )}

        <div className="mt-8 space-y-4">
             <div className="relative flex items-center">
                <div className="flex-grow border-t border-white/[0.03]"></div>
                <span className="flex-shrink mx-4 text-[9px] font-black text-gray-800 uppercase tracking-widest italic">Signup with</span>
                <div className="flex-grow border-t border-white/[0.03]"></div>
             </div>

             <div className="grid grid-cols-2 gap-3">
                <div className="flex justify-center w-full bg-[#0a0b14] rounded-xl border border-white/5 overflow-hidden transition-all p-0.5">
                  <GoogleLogin 
                    onSuccess={(c) => c.credential && handleOAuthSuccess(c.credential, 'google')}
                    onError={() => setError('Google failed')}
                    theme="filled_black" shape="pill" width="100%" text="signup_with"
                  />
                </div>
                
                <button 
                  onClick={() => {
                    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
                    window.location.href = `${baseUrl}/auth/github`;
                  }}
                  className="w-full bg-[#0a0b14] hover:bg-white/5 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center space-x-2 border border-white/5 group shadow-sm italic shadow-black/20"
                >
                   <Github className="w-3.5 h-3.5 text-gray-700 group-hover:text-white transition-colors" />
                   <span>GitHub</span>
                </button>
             </div>
        </div>

         <div className="mt-12 pt-6 border-t border-white/[0.03] text-center italic">
            <p className="text-[10px] font-black text-gray-700 uppercase tracking-widest leading-relaxed">
              Already have an account?{' '}
              <Link href="/login" className="text-blue-500 hover:text-blue-400 transition-colors ml-1 font-black underline underline-offset-4 decoration-blue-500/20">
                Login
              </Link>
            </p>
         </div>
    </AuthSection>
  );
};

export default SignupPage;
