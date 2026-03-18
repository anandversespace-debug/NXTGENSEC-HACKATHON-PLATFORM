'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, Shield, ShieldAlert, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const endpoint = baseUrl.endsWith('/api') ? '/auth/login' : '/api/auth/login';

      const res = await fetch(`${baseUrl}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Authentication failure.');
      }

      // Check if user is admin
      if (data.user?.role !== 'admin' && data.user?.role !== 'judge') {
          throw new Error('Access denied. Admin credentials required.');
      }

      // Store JWT token
      localStorage.setItem('token', data.token);
      
      // We can't easily wait for the cookie to be set by the server 
      // if it's a JSON response, but our backend sets the cookie 
      // in the response header anyway.
      
      // Update global auth state
      const { useAuthStore } = await import('@/store/useAuthStore');
      useAuthStore.getState().setUser(data.user);

      window.location.href = '/admin/dashboard';
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-20 px-6 bg-[#050505] relative overflow-hidden">
       {/* Ambient Backing */}
       <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03]">
          <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-blue-600 rounded-full blur-[150px]"></div>
          <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-indigo-600 rounded-full blur-[150px]"></div>
       </div>

      <Link href="/" className="mb-12 flex items-center space-x-2 text-gray-600 hover:text-white transition-colors group z-10">
         <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
         <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Return to Site</span>
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm relative z-10"
      >
        <div className="bg-[#0c0c0c] border border-white/5 p-8 md:p-10 rounded-2xl shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-indigo-600"></div>

          <div className="text-center mb-10">
             <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-900/40">
                <Shield className="w-6 h-6 text-white" />
             </div>
            <h1 className="text-2xl font-black italic uppercase tracking-tighter text-white mb-1 leading-none">Admin <span className="text-blue-500">Access</span></h1>
            <p className="text-[9px] text-gray-700 font-bold uppercase tracking-[0.3em]">Authorized Personnel Only</p>
          </div>

          {error && (
            <div className="bg-red-500/5 border border-red-500/10 text-red-500 p-3 rounded-xl text-[10px] font-bold uppercase tracking-widest mb-6 text-center italic flex items-center justify-center space-x-2">
              <ShieldAlert className="w-4 h-4" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[9px] font-black text-gray-700 uppercase tracking-[0.2em] ml-1">Admin Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-700" />
                <input
                  type="email"
                  className="w-full bg-[#050505] border border-white/10 rounded-xl py-4 pl-12 pr-6 text-xs text-white focus:outline-none focus:border-blue-500/50 transition-all font-medium"
                  placeholder="admin@nxtgensec.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[9px] font-black text-gray-700 uppercase tracking-[0.2em] ml-1">Secret Key</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-700" />
                <input
                  type="password"
                  className="w-full bg-[#050505] border border-white/10 rounded-xl py-4 pl-12 pr-6 text-xs text-white focus:outline-none focus:border-blue-500/50 transition-all font-medium"
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
              className="bg-blue-600 hover:bg-blue-500 text-white w-full py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] transition-all flex items-center justify-center space-x-3 shadow-xl shadow-blue-900/40 disabled:opacity-50 mt-10 italic"
            >
              {loading ? (
                <span className="animate-pulse">Verifying...</span>
              ) : (
                <>
                  <span>Sign In</span>
                  <LogIn className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLoginPage;
