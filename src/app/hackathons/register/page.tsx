'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Users, Shield, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';

const HackathonRegisterPage = () => {
  const { isAuthenticated, user } = useAuthStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [teamMode, setTeamMode] = useState<'individual' | 'team'>('individual');
  const [teamName, setTeamName] = useState('');

  if (!isAuthenticated) {
    router.push('/login');
    return null;
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Mock registration API call
    setTimeout(() => {
      setSuccess(true);
      setLoading(false);
    }, 1500);
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card text-center max-w-md p-12"
        >
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Registration Success!</h1>
          <p className="text-gray-400 mb-8">You are officially registered for the event. Check your dashboard for next steps.</p>
          <button 
            onClick={() => router.push('/hub')}
            className="btn-primary w-full"
          >
            Go to Hub
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-2xl mx-auto">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="glass-card p-10"
        >
          <div className="mb-10 text-center">
             <span className="inline-block px-3 py-1 bg-blue-500/10 text-blue-400 text-xs font-bold rounded-full mb-4 border border-blue-500/20">EVENT REGISTRATION</span>
             <h1 className="text-3xl font-bold mb-2">Confirm Your Participation</h1>
             <p className="text-gray-400">Join the elite ranks of security innovators.</p>
          </div>

          <div className="flex bg-white/5 p-1 rounded-xl mb-10">
            <button 
              className={`flex-1 py-3 rounded-lg text-sm font-bold flex items-center justify-center space-x-2 transition-all ${teamMode === 'individual' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}
              onClick={() => setTeamMode('individual')}
            >
              <User className="w-4 h-4" />
              <span>Individual</span>
            </button>
            <button 
              className={`flex-1 py-3 rounded-lg text-sm font-bold flex items-center justify-center space-x-2 transition-all ${teamMode === 'team' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}
              onClick={() => setTeamMode('team')}
            >
              <Users className="w-4 h-4" />
              <span>Team</span>
            </button>
          </div>

          <form onSubmit={handleRegister} className="space-y-8">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
              <div className="flex items-center space-x-4 mb-4">
                 <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold">
                    {user?.name?.[0]}
                 </div>
                 <div>
                    <p className="text-sm font-bold text-white">{user?.name}</p>
                    <p className="text-xs text-gray-500">Registered as {user?.role}</p>
                 </div>
              </div>
              <p className="text-xs text-gray-500 italic">By registering, you agree to the Hackathon Rules and Code of Conduct.</p>
            </div>

            {teamMode === 'team' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
              >
                <label className="block text-sm font-medium text-gray-400 mb-3">Team Name</label>
                <input
                  type="text"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 transition-colors"
                  placeholder="e.g. CyberPhantoms"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  required={teamMode === 'team'}
                />
              </motion.div>
            )}

            <div className="flex items-start space-x-3 mb-8">
               <div className="p-2 bg-blue-500/20 rounded-lg shrink-0">
                  <Shield className="w-5 h-5 text-blue-500" />
               </div>
               <p className="text-sm text-gray-400 leading-relaxed">
                  Your participation will be tracked in the **Contribution Leaderboard**. Higher rankings grant access to exclusive developer bounties.
               </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-4 flex items-center justify-center space-x-2 disabled:opacity-50 shadow-[0_0_30px_rgba(59,130,246,0.3)]"
            >
              <span>{loading ? 'Processing...' : 'Complete Registration'}</span>
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default HackathonRegisterPage;
