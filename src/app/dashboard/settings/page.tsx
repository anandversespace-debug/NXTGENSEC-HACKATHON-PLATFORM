'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Key, 
  Bell, 
  Trash2,
  Lock,
  EyeOff,
  Eye,
  Settings2,
  MailWarning
} from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';

export default function UserSettingsPage() {
  const user = useAuthStore((state) => state.user);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      alert('Account deleted.');
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold mb-0.5">Settings</h1>
          <p className="text-xs text-gray-400 font-medium tracking-tight">Manage your account security and notifications.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
        
        {/* Nav Sidebar */}
        <div className="lg:col-span-1 border-r border-white/5 pr-4 hidden lg:block">
           <ul className="space-y-2 sticky top-24 relative">
             <div className="absolute left-0 top-0 w-1 h-full bg-white/[0.02] rounded-full">
                <div className="w-1 h-8 bg-blue-500 rounded-full transition-all"></div>
             </div>
             {['Security', 'Notifications', 'Options', 'Delete Account'].map((item, i) => (
                <li key={item} className={`px-5 py-2 cursor-pointer transition-colors text-[10px] font-bold uppercase tracking-widest ${i === 0 ? 'text-blue-400' : 'text-gray-500 hover:text-gray-300'}`}>
                  {item}
                </li>
             ))}
           </ul>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3 space-y-12">
           
           {/* Section 1: Authentication */}
           <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="flex items-center space-x-3 mb-6 border-b border-white/[0.05] pb-4">
                 <div className="w-8 h-8 rounded bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                    <Key className="w-4 h-4 text-blue-500" />
                 </div>
                 <div>
                    <h2 className="text-lg font-bold uppercase tracking-tight italic">Change Password</h2>
                 </div>
              </div>

              <div className="bg-[#0c0c0c] border border-white/5 rounded-xl p-8 space-y-6">
                 <div>
                    <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-2 block ml-1"><Lock className="w-3 h-3 inline-block mr-1 -mt-0.5" /> Current Password</label>
                    <div className="relative">
                      <input 
                        type={showCurrentPassword ? 'text' : 'password'} 
                        className="w-full bg-[#050505] border border-white/10 rounded-lg py-3 px-4 text-xs font-mono text-gray-300 focus:outline-none focus:border-blue-500/50 transition-colors"
                        placeholder="••••••••••••"
                      />
                      <button onClick={() => setShowCurrentPassword(!showCurrentPassword)} type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400">
                         {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                 </div>

                 <div>
                    <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-2 block ml-1"><Lock className="w-3 h-3 inline-block mr-1 -mt-0.5" /> New Password</label>
                    <div className="relative">
                      <input 
                        type={showNewPassword ? 'text' : 'password'} 
                        className="w-full bg-[#050505] border border-white/10 rounded-lg py-3 px-4 text-xs font-mono text-white focus:outline-none focus:border-blue-500/50 transition-colors"
                        placeholder="New Password"
                      />
                      <button onClick={() => setShowNewPassword(!showNewPassword)} type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400">
                         {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                 </div>
                 
                 <div className="pt-2 flex justify-end">
                    <button type="button" className="btn-primary py-2.5 px-6 text-xs font-bold uppercase tracking-widest bg-blue-600">
                      Save Password
                    </button>
                 </div>
              </div>
           </motion.section>

           {/* Section 2: Notifications */}
           <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-6">
              <div className="flex items-center space-x-3 mb-6 border-b border-white/[0.05] pb-4">
                 <div className="w-8 h-8 rounded bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                    <Bell className="w-4 h-4 text-emerald-500" />
                 </div>
                 <div>
                    <h2 className="text-lg font-bold uppercase tracking-tight italic">Email Notifications</h2>
                 </div>
              </div>

              <div className="bg-[#0c0c0c] border border-white/5 rounded-xl p-8 divide-y divide-white/[0.05]">
                 {[
                   { id: '1', title: 'Security Updates', desc: 'Important updates about your account security.', checked: true, req: true },
                   { id: '2', title: 'Hackathon Updates', desc: 'Notifications about hackathons you are participating in.', checked: true },
                   { id: '3', title: 'Weekly Newsletter', desc: 'Stay updated with the latest news and trends.', checked: false }
                 ].map((opt) => (
                    <div key={opt.id} className="py-5 first:pt-0 last:pb-0 flex items-center justify-between">
                       <div>
                          <p className="text-xs font-bold text-gray-200 uppercase tracking-widest mb-1.5 flex items-center">
                            {opt.title} 
                            {opt.req && <span className="ml-2 text-[8px] bg-red-500/20 text-red-500 px-1.5 py-0.5 rounded border border-red-500/20">Required</span>}
                          </p>
                          <p className="text-[10px] text-gray-500 leading-relaxed font-medium">{opt.desc}</p>
                       </div>
                       <label className="relative inline-flex items-center cursor-pointer ml-4 shrink-0">
                         <input type="checkbox" className="sr-only peer" defaultChecked={opt.checked} disabled={opt.req} />
                         <div className={`w-9 h-5 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all ${opt.req ? 'bg-emerald-600 opacity-50 cursor-not-allowed' : 'bg-gray-700 peer-checked:bg-emerald-500'}`}></div>
                       </label>
                    </div>
                 ))}
              </div>
           </motion.section>

           {/* Section 4: Danger Zone */}
           <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="space-y-6 pt-10">
              <div className="flex items-center space-x-3 mb-6 border-b border-red-500/10 pb-4">
                 <div className="w-8 h-8 rounded bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                    <Trash2 className="w-4 h-4 text-red-500" />
                 </div>
                 <div>
                    <h2 className="text-lg font-bold uppercase tracking-tight italic text-red-500">Delete Account</h2>
                 </div>
              </div>

              <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                 <div>
                    <p className="text-xs font-black text-red-400 uppercase tracking-widest mb-2 flex items-center"><MailWarning className="w-3.5 h-3.5 mr-1" /> Warning</p>
                    <p className="text-[11px] font-medium text-gray-400 leading-relaxed max-w-lg">
                      Deleting your account will permanently remove all your projects, points, and account data. This action cannot be undone.
                    </p>
                 </div>
                 <button 
                   onClick={handleDelete}
                   className="shrink-0 bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white border border-red-500/30 hover:border-transparent transition-all px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(239,68,68,0.1)]"
                 >
                   Delete Account
                 </button>
               </div>
           </motion.section>

        </div>
      </div>
    </div>
  );
}
