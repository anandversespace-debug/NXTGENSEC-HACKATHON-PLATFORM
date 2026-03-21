'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle2, ShieldAlert, Loader2, ArrowRight, ShieldCheck, Terminal } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';
import AuthSection from '@/components/auth/AuthSection';

function VerifyContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');
    const email = searchParams.get('email');

    if (!token || !email) {
      setStatus('error');
      setMessage('Invalid or missing verification information.');
      return;
    }

    const verifyEmail = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const res = await fetch(`${baseUrl}/auth/verify?token=${token}&email=${encodeURIComponent(email)}`);
        const data = await res.json();

        if (res.ok) {
          setStatus('success');
          setMessage(data.message || 'Account verified successfully!');
          setTimeout(() => router.push('/login'), 3000);
        } else {
          setStatus('error');
          setMessage(data.error || 'Verification failed.');
        }
      } catch (err) {
        setStatus('error');
        setMessage('System connection failure. Please try again.');
      }
    };

    verifyEmail();
  }, [searchParams, router]);

  return (
    <AuthSection 
       title={status === 'loading' ? 'Verifying Email' : status === 'success' ? 'Email Verified' : 'Verification Failed'} 
       subtitle={status === 'loading' ? 'Please wait while we verify your account...' : status === 'success' ? 'Your email has been successfully verified.' : 'The link is invalid or has expired.'}
    >
          <div className="mb-10">
             <div className={`w-20 h-20 rounded-3xl flex items-center justify-center transition-all duration-700 shadow-2xl ${status === 'success' ? 'bg-emerald-500/10 border border-emerald-500/20 shadow-emerald-500/10' : status === 'error' ? 'bg-red-500/10 border border-red-500/20 shadow-red-500/10' : 'bg-blue-600/10 border border-blue-600/20 shadow-blue-500/10'}`}>
                {status === 'loading' && <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />}
                {status === 'success' && <CheckCircle2 className="w-8 h-8 text-emerald-500 animate-bounce" />}
                {status === 'error' && <ShieldAlert className="w-8 h-8 text-red-500" />}
             </div>
          </div>

          <div className="mb-10">
             <p className={`text-[10px] font-bold uppercase tracking-widest leading-relaxed max-w-sm ${status === 'error' ? 'text-red-500' : 'text-gray-400'}`}>
                {message || 'Checking your verification link...'}
             </p>
          </div>

          {status !== 'loading' && (
             <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
               <Link 
                 href="/login"
                 className="w-full bg-[#4f46e5] hover:bg-[#4338ca] text-white py-3.5 rounded-xl text-xs font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center space-x-3 shadow-xl italic"
               >
                 <span>Proceed to Login</span>
                 <ArrowRight className="w-4 h-4" />
               </Link>
             </motion.div>
          )}

          <div className="mt-12 pt-12 border-t border-white/[0.03]">
             <div className="flex items-center space-x-2 text-gray-800">
                <Terminal className="w-3.5 h-3.5" />
                <span className="text-[9px] font-bold uppercase tracking-widest italic">Auth Protocol: SHA-512 Verification</span>
             </div>
          </div>
    </AuthSection>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#05060f] flex items-center justify-center">
         <div className="text-blue-500 font-black italic animate-pulse tracking-widest uppercase text-xs">Awaiting Repository...</div>
      </div>
    }>
      <VerifyContent />
    </Suspense>
  );
}
