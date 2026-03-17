'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Award, Code, Globe, Github, Edit3 } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';

const ProfilePage = () => {
  const { user, isAuthenticated } = useAuthStore();
  const router = useRouter();

  if (!isAuthenticated) {
    router.push('/login');
    return null;
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            <div className="glass-card text-center p-8">
              <div className="w-32 h-32 rounded-full bg-blue-600 mx-auto mb-6 flex items-center justify-center text-4xl font-bold border-4 border-white/10 shadow-xl">
                {user?.name?.[0]}
              </div>
              <h1 className="text-2xl font-bold mb-1">{user?.name}</h1>
              <p className="text-blue-400 font-semibold mb-6 flex items-center justify-center space-x-2">
                 <Award className="w-4 h-4" /> <span>Elite Developer</span>
              </p>
              <div className="pt-6 border-t border-white/5 space-y-4 text-left">
                <div className="flex items-center space-x-3 text-sm text-gray-400">
                  <Mail className="w-4 h-4" /> <span>{user?.email}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-400">
                  <Globe className="w-4 h-4" /> <span>anandverse.space</span>
                </div>
              </div>
              <button className="btn-primary w-full mt-8 py-3 text-sm flex items-center justify-center space-x-2">
                 <Edit3 className="w-4 h-4" /> <span>Edit Profile</span>
              </button>
            </div>

            <div className="glass-card p-6">
               <h3 className="text-sm font-bold uppercase text-gray-500 tracking-widest mb-6">Social Links</h3>
               <div className="space-y-4">
                  <a href="#" className="flex items-center justify-between text-sm text-gray-400 hover:text-white transition-colors">
                     <span className="flex items-center space-x-2"><Github className="w-4 h-4" /> <span>GitHub</span></span>
                     <span className="text-xs">/anand</span>
                  </a>
               </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {[
                 { label: 'Total Projects', value: '12', icon: Code },
                 { label: 'Rank', value: '#42', icon: Award },
                 { label: 'Contributions', value: '850', icon: Shield }
               ].map((stat, i) => (
                 <div key={i} className="glass-card p-6 text-center">
                    <stat.icon className="w-6 h-6 text-blue-500 mx-auto mb-3" />
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-tight">{stat.label}</p>
                 </div>
               ))}
            </div>

            <div className="glass-card p-8">
               <h2 className="text-xl font-bold mb-8">Active Contributions</h2>
               <div className="space-y-6">
                  {[1, 2].map(i => (
                    <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                       <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                             <Shield className="w-5 h-5 text-blue-500" />
                          </div>
                          <div>
                             <p className="text-sm font-bold text-white">CyberShield Hackathon {i}</p>
                             <p className="text-xs text-gray-500">Registered • Starts in 12 days</p>
                          </div>
                       </div>
                       <span className="text-xs font-bold text-blue-500 bg-blue-500/10 px-2 py-1 rounded">PENDING</span>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Placeholder for Shield icon which was missing in first import
const Shield = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
);

export default ProfilePage;
