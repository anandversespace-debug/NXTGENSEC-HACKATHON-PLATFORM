'use client';

import React, { useState } from 'react';
import { ShieldCheck, Mail, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/mail/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      
      const data = await res.json();
      if (res.ok) {
        setSent(true);
      } else {
        setError(data.error || 'Failed to dispatch recovery email.');
      }
    } catch (err) {
      console.error(err);
      setError('Internal dispatch error. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] p-6">
      <div className="w-full max-w-md bg-[#0c0c0c] border border-white/5 rounded-2xl p-8 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[100px] bg-blue-600/20 blur-[60px] pointer-events-none" />
        
        <div className="text-center mb-10 relative z-10">
          <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-6">
             <ShieldCheck className="w-6 h-6 text-blue-500" />
          </div>
          <h1 className="text-2xl font-black italic uppercase tracking-tight text-white mb-2">Reset Credentials</h1>
          <p className="text-gray-400 text-xs font-medium leading-relaxed max-w-[280px] mx-auto">
            Enter your node address. We will dispatch a secure recovery token directly to your inbox.
          </p>
        </div>

        {sent ? (
          <div className="text-center space-y-6 relative z-10">
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
               <p className="text-sm font-bold text-emerald-500 mb-1">Dispatch Successful</p>
               <p className="text-[10px] text-emerald-500/70 uppercase tracking-widest font-mono">Token Transmitted</p>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
               Please check <strong>{email}</strong> for instructions on how to reset your password. The link will expire shortly for security purposes.
            </p>
            <Link href="/login" className="btn-primary block w-full py-4 text-xs">
              Return to Authentication
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            {error && (
               <div className="p-3 bg-red-500/10 border border-red-500/20 rounded text-xs text-red-500 font-medium text-center">
                 {error}
               </div>
            )}
            
            <div className="space-y-2">
              <label htmlFor="email" className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1 flex items-center">
                 <Mail className="w-3 h-3 mr-1.5" /> Node Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#050505] border border-white/10 rounded-xl py-3 px-4 text-sm font-medium text-white focus:outline-none focus:border-blue-500/50 transition-colors placeholder:text-gray-600"
                placeholder="developer@example.com"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !email}
              className="w-full btn-primary py-4 text-xs flex justify-center items-center disabled:opacity-50 transition-all hover:scale-[1.02] active:scale-95"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Request Recovery Token</span>}
            </button>

            <div className="text-center pt-4">
              <Link href="/login" className="inline-flex items-center text-[10px] font-bold text-gray-500 hover:text-white uppercase tracking-widest transition-colors">
                <ArrowLeft className="w-3 h-3 mr-1" /> Abort & Return
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
