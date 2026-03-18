'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Lock, 
  UserPlus, 
  User, 
  Shield, 
  ShieldAlert, 
  Terminal, 
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
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

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match. Please check again.');
      setLoading(false);
      return;
    }

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const endpoint = baseUrl.endsWith('/api') ? '/auth/register' : '/api/auth/register';

      const res = await fetch(`${baseUrl}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          name: formData.name,
          username: formData.username,
          role: 'developer'
        })
      });

      const data = await res.json();

        throw new Error(data.error || 'Failed to sign up.');

      setSuccess(true);
      
      // Redirect after a short delay
      setTimeout(() => router.push('/login?registered=true'), 3000);

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
       {/* Ambient Background */}
       <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03]">
          <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-blue-500 rounded-full blur-[150px]"></div>
          <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-indigo-500 rounded-full blur-[150px]"></div>
       </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-[#0c0c0c] border border-white/5 p-8 md:p-10 rounded-2xl shadow-2xl relative overflow-hidden">
           {/* Accent Line */}
           <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-600 to-indigo-600"></div>

          <div className="text-center mb-10">
             <div className="w-12 h-12 bg-white/[0.02] border border-white/10 rounded-xl flex items-center justify-center mx-auto mb-6 group hover:border-blue-500/30 transition-all duration-500">
                <ShieldCheck className="w-6 h-6 text-blue-500 group-hover:scale-110 transition-transform" />
             </div>
            <h1 className="text-2xl font-black italic uppercase tracking-tighter text-white mb-1">Sign <span className="text-blue-500">Up</span></h1>
            <p className="text-[10px] text-gray-600 font-bold uppercase tracking-[0.2em]">Join Us</p>
          </div>

          {success ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12 space-y-6">
               <div className="relative">
                  <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                     <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                  </div>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 border-2 border-emerald-500/30 rounded-full animate-ping opacity-20"></div>
               </div>
               <div className="text-left">
                  <h3 className="text-xl font-bold text-white uppercase tracking-tight mb-2 text-center">Sign Up Successful!</h3>
                  <p className="text-xs text-gray-500 font-medium leading-relaxed text-center">Your account has been created. Please check your email for a verification link.</p>
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
                    <span className="text-left">{error}</span>
                 </motion.div>
               )}

              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2 text-left">
                    <label className="text-[9px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">Full Name</label>
                    <div className="relative text-left">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-700" />
                      <input
                        type="text"
                        name="name"
                        required
                        className="w-full bg-[#050505] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-xs text-gray-300 focus:outline-none focus:border-blue-500/50 transition-all font-medium"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                 </div>
                 <div className="space-y-2 text-left">
                    <label className="text-[9px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">Username</label>
                    <div className="relative text-left">
                      <Terminal className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-700" />
                      <input
                        type="text"
                        name="username"
                        required
                        className="w-full bg-[#050505] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-xs text-gray-300 focus:outline-none focus:border-blue-500/50 transition-all font-medium"
                        placeholder="johndoe"
                        value={formData.username}
                        onChange={handleChange}
                      />
                    </div>
                 </div>
              </div>

              <div className="space-y-2 text-left">
                <label className="text-[9px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1 text-left">Email Address</label>
                <div className="relative text-left">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-700" />
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full bg-[#050505] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-xs text-gray-300 focus:outline-none focus:border-blue-500/50 transition-all font-medium"
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2 text-left">
                <label className="text-[9px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-700" />
                  <input
                    type="password"
                    name="password"
                    required
                    className="w-full bg-[#050505] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-xs text-gray-300 focus:outline-none focus:border-blue-500/50 transition-all font-medium"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2 text-left">
                <label className="text-[9px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">Confirm Password</label>
                <div className="relative">
                  <Shield className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-700" />
                  <input
                    type="password"
                    name="confirmPassword"
                    required
                    className="w-full bg-[#050505] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-xs text-gray-300 focus:outline-none focus:border-blue-500/50 transition-all font-medium"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-xl text-[10px] uppercase tracking-[0.3em] transition-all shadow-xl shadow-blue-900/20 flex items-center justify-center space-x-3 group disabled:opacity-50 mt-4 italic"
              >
                {loading ? (
                  <span className="animate-pulse">Signing up...</span>
                ) : (
                  <>
                    <span>Sign Up</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          )}

          <div className="mt-8 text-center border-t border-white/[0.03] pt-6">
            <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">
              Already have an account?{' '}
              <Link href="/login" className="text-blue-500 hover:text-blue-400 transition-colors ml-1 italic underline underline-offset-4 decoration-blue-500/20">
                Login
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
