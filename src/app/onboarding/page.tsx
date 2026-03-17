'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  MapPin, 
  Code2, 
  Github, 
  Twitter, 
  Globe, 
  ArrowRight, 
  CheckCircle2, 
  Rocket,
  ShieldCheck,
  Terminal,
  ChevronRight,
  Loader2
} from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function OnboardingContent() {
  const { user, setUser } = useAuthStore();
  const router = useRouter();
  
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    bio: '',
    location: '',
    skills: '',
    github: '',
    twitter: '',
    portfolio: ''
  });

  // Verify if user is logged in, if not, they might need to login first
  // Unless we auto-login them or find them by email if searching by email?
  // User should be logged in to onboard.
  useEffect(() => {
    if (!user && !loading) {
       // If no user is logged in, and we have an email in URL, we could suggest logging in
       // But for now let's assume they are logged in or will be redirected to login
    }
  }, [user, loading]);

  const totalSteps = 3;

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleComplete = async () => {
    if (!user) {
      alert('Authentication required to synchronize identity.');
      router.push('/login');
      return;
    }
    
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      
      const payload = {
        bio: formData.bio,
        location: formData.location,
        github: formData.github,
        twitter: formData.twitter,
        portfolio: formData.portfolio,
        skills: formData.skills.split(',').map(s => s.trim()).filter(s => s !== ''),
        onboarded: true
      };

      const res = await fetch(`${baseUrl}/users/profile`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const updatedUser = await res.json();
        setUser(updatedUser);
        setStep(4); // Success step
        setTimeout(() => router.push('/dashboard'), 2000);
      } else {
        alert('Failed to synchronize identity registry.');
      }
    } catch (err) {
      console.error(err);
      alert('Registry synchronization failure.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Visuals */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent opacity-50"></div>
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>

      <div className="w-full max-w-xl relative z-10">
        {step < 4 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-600/20 flex items-center justify-center">
                  <Terminal className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <h1 className="text-xl font-black italic uppercase tracking-tighter">Identity <span className="text-blue-500">Synthesis</span></h1>
                  <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Protocol Version 2.0.26</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Clearance Level</p>
                <p className="text-xs font-black text-white italic">{step} / {totalSteps}</p>
              </div>
            </div>
            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: `${(step / totalSteps) * 100}%` }}
                 className="h-full bg-blue-600"
               ></motion.div>
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-[#0c0c0c] border border-white/5 p-8 md:p-10 rounded-2xl shadow-2xl relative overflow-hidden"
            >
               <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-600 to-transparent"></div>
               <h2 className="text-lg font-bold text-white uppercase tracking-tight mb-8 flex items-center">
                 <User className="w-5 h-5 mr-3 text-blue-500" /> Professional Identity
               </h2>
               
               <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Mission Strategy (Bio)</label>
                    <textarea 
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      rows={4}
                      placeholder="e.g. Systems architect focused on ZK-proofs and secure node consensus..."
                      className="w-full bg-[#050505] border border-white/10 rounded-xl p-4 text-xs text-gray-300 focus:outline-none focus:border-blue-500/50 transition-all resize-none font-medium leading-relaxed"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Physical Node Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                      <input 
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="e.g. San Francisco, CA or Distributed"
                        className="w-full bg-[#050505] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-xs text-gray-300 focus:outline-none focus:border-blue-500/50 transition-all font-medium"
                      />
                    </div>
                  </div>
               </div>

               <div className="mt-12 flex justify-end">
                  <button onClick={nextStep} className="group btn-primary px-8 py-4 text-xs flex items-center space-x-3">
                    <span>Analyze & Continue</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
               </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-[#0c0c0c] border border-white/5 p-8 md:p-10 rounded-2xl shadow-2xl relative overflow-hidden"
            >
               <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-indigo-600 to-transparent"></div>
               <h2 className="text-lg font-bold text-white uppercase tracking-tight mb-8 flex items-center">
                 <Code2 className="w-5 h-5 mr-3 text-indigo-500" /> Technical Arsenal
               </h2>

               <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Tech Stack (Comma Separated)</label>
                    <div className="relative">
                      <Terminal className="absolute left-4 top-4 w-4 h-4 text-indigo-500" />
                      <textarea 
                        name="skills"
                        value={formData.skills}
                        onChange={handleChange}
                        placeholder="Next.js, Rust, Solidity, Go, TailwindCSS..."
                        rows={3}
                        className="w-full bg-[#050505] border border-white/10 rounded-xl pt-4 pl-12 pr-4 text-xs text-indigo-400 focus:outline-none focus:border-indigo-500/50 transition-all font-mono font-medium leading-relaxed"
                      />
                    </div>
                    <p className="text-[9px] text-gray-600 font-bold uppercase tracking-tighter mt-2 ml-1 italic">
                      // Input your primary cryptographic and development languages
                    </p>
                  </div>
               </div>

               <div className="mt-12 flex justify-between items-center">
                  <button onClick={prevStep} className="text-[10px] font-bold text-gray-600 hover:text-white uppercase tracking-widest transition-colors">
                    Backtrack
                  </button>
                  <button onClick={nextStep} className="group btn-primary px-8 py-4 text-xs flex items-center space-x-3 bg-indigo-600 hover:bg-indigo-500">
                    <span>Register Skills</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
               </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-[#0c0c0c] border border-white/5 p-8 md:p-10 rounded-2xl shadow-2xl relative overflow-hidden"
            >
               <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-emerald-600 to-transparent"></div>
               <h2 className="text-lg font-bold text-white uppercase tracking-tight mb-8 flex items-center">
                 <Globe className="w-5 h-5 mr-3 text-emerald-500" /> Connection Nodes
               </h2>

               <div className="space-y-5">
                  <div className="relative group">
                    <Github className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-white transition-colors" />
                    <input 
                      type="url"
                      name="github"
                      value={formData.github}
                      onChange={handleChange}
                      placeholder="GitHub URL (e.g. github.com/username)"
                      className="w-full bg-[#050505] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-xs text-gray-300 focus:outline-none focus:border-emerald-500/50 transition-all font-mono"
                    />
                  </div>
                  <div className="relative group">
                    <Twitter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-blue-400 transition-colors" />
                    <input 
                      type="url"
                      name="twitter"
                      value={formData.twitter}
                      onChange={handleChange}
                      placeholder="X / Twitter URL"
                      className="w-full bg-[#050505] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-xs text-gray-300 focus:outline-none focus:border-emerald-500/50 transition-all font-mono"
                    />
                  </div>
                  <div className="relative group">
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-emerald-400 transition-colors" />
                    <input 
                      type="url"
                      name="portfolio"
                      value={formData.portfolio}
                      onChange={handleChange}
                      placeholder="Portfolio / Personal Registry"
                      className="w-full bg-[#050505] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-xs text-gray-300 focus:outline-none focus:border-emerald-500/50 transition-all font-mono"
                    />
                  </div>
                  <p className="text-[9px] text-gray-700 font-bold uppercase tracking-widest text-center mt-4">
                    Optional fields. Identity remains secure regardless.
                  </p>
               </div>

               <div className="mt-12 flex justify-between items-center">
                  <button onClick={prevStep} className="text-[10px] font-bold text-gray-600 hover:text-white uppercase tracking-widest transition-colors">
                    Backtrack
                  </button>
                  <button 
                    onClick={handleComplete} 
                    disabled={loading}
                    className="group btn-primary px-8 py-4 text-xs flex items-center space-x-3 bg-emerald-600 hover:bg-emerald-500 shadow-xl shadow-emerald-900/20"
                  >
                    {loading ? (
                       <>
                         <Loader2 className="w-4 h-4 animate-spin" />
                         <span>Syncing Registry...</span>
                       </>
                    ) : (
                       <>
                         <span>Authorize Initialization</span>
                         <Rocket className="w-4 h-4 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                       </>
                    )}
                  </button>
               </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
               <div className="relative inline-block mb-10">
                  <div className="w-24 h-24 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                     <ShieldCheck className="w-12 h-12 text-emerald-500" />
                  </div>
                  <div className="absolute top-0 left-0 w-full h-full border-4 border-emerald-500/30 rounded-full animate-ping opacity-20"></div>
               </div>
               <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white mb-4">Node Identity <span className="text-emerald-500">Established</span></h2>
               <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.3em] mb-10">Broadcasting Status: Active // Deployment: Successful</p>
               <div className="flex justify-center space-x-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse delay-75"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse delay-150"></div>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Info */}
      {step < 4 && (
        <div className="mt-12 flex items-center space-x-8 opacity-30 select-none pointer-events-none">
           {['VERIFIED_SECURE', 'PULSE_SYNC_ON', 'LATENCY_SUB_10MS'].map(label => (
             <div key={label} className="flex items-center space-x-2">
                <div className="w-1 h-1 rounded-full bg-blue-500"></div>
                <span className="text-[8px] font-black tracking-widest text-gray-400">{label}</span>
             </div>
           ))}
        </div>
      )}
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
         <div className="text-blue-500 font-black italic animate-pulse tracking-widest uppercase text-xs">Synchronizing Identity Protocol...</div>
      </div>
    }>
      <OnboardingContent />
    </Suspense>
  );
}
