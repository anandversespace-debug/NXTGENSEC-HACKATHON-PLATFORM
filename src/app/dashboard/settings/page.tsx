'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  Key, 
  Bell, 
  Trash2,
  Lock,
  EyeOff,
  Eye,
  Settings2,
  MailWarning,
  Loader2,
  CheckCircle2,
  QrCode,
  Fingerprint,
  Smartphone,
  Info,
  ShieldCheck
} from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { startRegistration } from '@simplewebauthn/browser';

export default function UserSettingsPage() {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const logout = useAuthStore((state) => state.logout);
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  // 2FA Setup State
  const [show2faSetup, setShow2faSetup] = useState(false);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [totpSecret, setTotpSecret] = useState<string | null>(null);
  const [otpToken, setOtpToken] = useState('');
  const [setupLoading, setSetupLoading] = useState(false);

  const showStatus = (type: 'success' | 'error', text: string) => {
    setStatusMessage({ type, text });
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) return;
    setIsUpdating(true);
    try {
      const token = localStorage.getItem('token');
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${baseUrl}/users/change-password`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ currentPassword, newPassword }),
        credentials: 'include'
      });
      const data = await res.json();
      if (res.ok) {
        showStatus('success', 'Credentials Rotated');
        setCurrentPassword('');
        setNewPassword('');
      } else {
        showStatus('error', data.error || 'Check current password');
      }
    } catch (err) {
       showStatus('error', 'Update transmission failed');
    } finally {
       setIsUpdating(false);
    }
  };

  const toggleNewsletter = async () => {
    setIsUpdating(true);
    try {
      const token = localStorage.getItem('token');
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${baseUrl}/newsletter/subscribe`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });
      const data = await res.json();
      if (res.ok) {
        if (user) setUser({ ...user, newsletterSubscribed: data.subscribed });
        showStatus('success', data.message);
      }
    } catch (err) {
      showStatus('error', 'Network failure node');
    } finally {
      setIsUpdating(false);
    }
  };

  const updateNotifications = async (field: string, value: boolean) => {
    setIsUpdating(true);
    try {
      const token = localStorage.getItem('token');
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const updatedNotifications = { ...user?.notifications, [field]: value };
      
      const res = await fetch(`${baseUrl}/users/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ notifications: updatedNotifications }),
        credentials: 'include'
      });
      
      if (res.ok) {
        const data = await res.json();
        setUser(data);
        showStatus('success', 'Segment updated');
      }
    } catch (err) {
      showStatus('error', 'Update failed');
    } finally {
      setIsUpdating(false);
    }
  };

  const handle2faSetup = async () => {
    setSetupLoading(true);
    try {
      const token = localStorage.getItem('token');
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${baseUrl}/auth/2fa/setup`, {
        headers: { 'Authorization': `Bearer ${token}` },
        credentials: 'include'
      });
      const data = await res.json();
      if (res.ok) {
        setQrCode(data.qrCode);
        setTotpSecret(data.secret);
        setShow2faSetup(true);
      }
    } catch (err) {
      showStatus('error', '2FA engine offline');
    } finally {
      setSetupLoading(false);
    }
  };

  const verify2fa = async () => {
    setSetupLoading(true);
    try {
      const token = localStorage.getItem('token');
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${baseUrl}/auth/2fa/verify`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: otpToken }),
        credentials: 'include'
      });
      if (res.ok) {
        if (user) setUser({ ...user, twoFactorEnabled: true });
        setShow2faSetup(false);
        showStatus('success', 'TOTP Activated');
      } else {
        const d = await res.json();
        alert(d.error);
      }
    } catch (err) {
      alert('Verification aborted');
    } finally {
      setSetupLoading(false);
    }
  };

  const registerPasskey = async () => {
    setIsUpdating(true);
    try {
      const token = localStorage.getItem('token');
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const optionsRes = await fetch(`${baseUrl}/auth/passkey/register/start`, {
        method: 'POST', headers: { 'Authorization': `Bearer ${token}` }, credentials: 'include'
      });
      const options = await optionsRes.json();
      const attestation = await startRegistration(options);
      const finishRes = await fetch(`${baseUrl}/auth/passkey/register/finish`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(attestation),
        credentials: 'include'
      });
      if (finishRes.ok) showStatus('success', 'Passkey Synced');
    } catch (err) {
      showStatus('error', 'Aborted');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (confirm('CRITICAL: Initializing account purge. All projects, points, and identity data will be permanently destroyed. Confirm?')) {
      const token = localStorage.getItem('token');
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      try {
        const res = await fetch(`${baseUrl}/users/${user?.id || user?._id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` },
          credentials: 'include'
        });
        if (res.ok) {
           alert('Node purged successfully.');
           logout();
           window.location.href = '/';
        }
      } catch (err) {
        alert('Purge command failed.');
      }
    }
  };

  return (
    <div className="pb-20 relative min-h-screen">
      {/* Global Status HUD */}
      <AnimatePresence>
        {statusMessage && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`fixed bottom-10 right-10 px-6 py-3 rounded-2xl border backdrop-blur-3xl shadow-2xl z-[200] flex items-center space-x-3 text-[10px] font-black uppercase tracking-widest ${
              statusMessage.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 'bg-red-500/10 border-red-500/20 text-red-500'
            }`}
          >
            {statusMessage.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <Info className="w-4 h-4" />}
            <span>{statusMessage.text}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col lg:flex-row gap-12 items-start h-full">
        <aside className="lg:w-1/4 lg:sticky lg:top-[96px] h-fit space-y-12 self-start z-10 shrink-0">
          <header className="space-y-3">
             <div className="flex items-center space-x-2 opacity-50 mb-1">
                <Settings2 className="w-3 h-3" />
                <span className="text-[8px] font-black uppercase tracking-[0.2em]">Platform Core</span>
             </div>
             <h1 className="text-3xl font-black italic uppercase tracking-tighter text-white">Settings</h1>
             <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-relaxed max-w-[180px]">
                Manage your account security and notifications.
             </p>
          </header>

          <nav className="border-l border-white/5 pl-6 hidden lg:block text-left">
            <ul className="space-y-6">
              {[
                { label: 'Security Panel', active: true },
                { label: 'Intelligence Segments', active: false },
                { label: 'Registry Purge', active: false, danger: true }
              ].map((item) => (
                <li key={item.label} className={`cursor-pointer transition-all text-[10px] font-black uppercase tracking-[0.2em] italic ${item.active ? 'text-blue-500' : 'text-gray-700 hover:text-gray-400'} ${item.danger ? 'hover:text-red-500' : ''}`}>
                  {item.label}
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <main className="lg:w-3/4 space-y-16">
          <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <div className="flex items-center space-x-4 border-b border-white/[0.03] pb-6">
              <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-600/20 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-blue-500" />
              </div>
              <h2 className="text-xl font-black uppercase tracking-tighter italic text-white">Security Credentials</h2>
            </div>

            <div className="bg-[#0c0c0c] border border-white/5 rounded-3xl p-10 space-y-10 shadow-2xl">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-8">
                    <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 italic">Advanced Protection</h3>
                    
                    <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl space-y-4">
                       <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                             <Smartphone className="w-4 h-4 text-emerald-500" />
                             <span className="text-[10px] font-black uppercase tracking-widest text-white italic">Multi-Factor Auth</span>
                          </div>
                          <span className={`text-[8px] font-black uppercase px-2 py-1 rounded border ${user?.twoFactorEnabled ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 'bg-white/5 border-white/10 text-gray-500'}`}>
                             {user?.twoFactorEnabled ? 'ACTIVE' : 'INACTIVE'}
                          </span>
                       </div>
                       <p className="text-[9px] text-gray-600 uppercase font-bold tracking-tight italic leading-relaxed">Secure your terminal with TOTP apps like Google Authenticator or Authy.</p>
                       <button onClick={handle2faSetup} disabled={isUpdating || setupLoading} className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-[9px] font-black uppercase tracking-widest italic transition-all disabled:opacity-20">
                          {user?.twoFactorEnabled ? 'Reconfigure 2FA' : 'Activate 2FA'}
                       </button>
                    </div>

                    <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl space-y-4">
                       <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                             <Fingerprint className="w-4 h-4 text-blue-500" />
                             <span className="text-[10px] font-black uppercase tracking-widest text-white italic">Passkey Access</span>
                          </div>
                       </div>
                       <p className="text-[9px] text-gray-600 uppercase font-bold tracking-tight italic leading-relaxed">Passwordless login using hardware identity, biometrics, or device PIN.</p>
                       <button onClick={registerPasskey} disabled={isUpdating} className="w-full py-3 bg-blue-600/10 hover:bg-blue-600/20 border border-blue-600/20 text-blue-500 rounded-xl text-[9px] font-black uppercase tracking-widest italic transition-all disabled:opacity-20">
                          Synchronize Passkey
                       </button>
                    </div>
                  </div>

                  <form onSubmit={handlePasswordChange} className="space-y-10 pt-10 md:pt-0">
                    <div className="space-y-3 text-left">
                      <label className="text-[9px] font-black text-gray-700 uppercase tracking-[0.3em] block italic ml-1">
                        <Lock className="w-3 h-3 inline-block mr-2 -mt-0.5 text-blue-500/50" /> Current Password
                      </label>
                      <div className="relative">
                        <input 
                          type={showCurrentPassword ? 'text' : 'password'} 
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          className="w-full bg-[#050505] border border-white/10 rounded-xl py-4 px-6 text-xs font-mono text-gray-300 focus:outline-none focus:border-blue-500 transition-all shadow-inner" 
                          placeholder="••••••••••••" 
                        />
                        <button onClick={() => setShowCurrentPassword(!showCurrentPassword)} type="button" className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-600 hover:text-blue-500 transition-colors">
                          {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-3 text-left">
                      <label className="text-[9px] font-black text-gray-700 uppercase tracking-[0.3em] block italic ml-1">
                        <Lock className="w-3 h-3 inline-block mr-2 -mt-0.5 text-blue-500/50" /> New Password
                      </label>
                      <div className="relative">
                        <input 
                          type={showNewPassword ? 'text' : 'password'} 
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="w-full bg-[#050505] border border-white/10 rounded-xl py-4 px-6 text-xs font-mono text-white focus:outline-none focus:border-blue-500 transition-all shadow-inner" 
                          placeholder="New Password" 
                        />
                        <button onClick={() => setShowNewPassword(!showNewPassword)} type="button" className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-600 hover:text-blue-500 transition-colors">
                          {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    
                    <div className="pt-4 flex justify-end">
                      <button 
                        type="submit" 
                        disabled={isUpdating || !currentPassword || !newPassword}
                        className="bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black uppercase tracking-widest px-10 py-4 rounded-xl transition-all shadow-xl shadow-blue-900/20 active:scale-95 italic disabled:opacity-20"
                      >
                        {isUpdating ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save Changes'}
                      </button>
                    </div>
                  </form>
               </div>
            </div>
          </motion.section>

          <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-8">
            <div className="flex items-center space-x-4 border-b border-white/[0.03] pb-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-600/10 border border-emerald-600/20 flex items-center justify-center">
                <Bell className="w-5 h-5 text-emerald-500" />
              </div>
              <h2 className="text-xl font-black uppercase tracking-tighter italic text-white">Intelligence Segments</h2>
            </div>

            <div className="bg-[#0c0c0c] border border-white/5 rounded-3xl p-10 divide-y divide-white/[0.03] shadow-2xl">
              {[
                { 
                  id: 'security', 
                  title: 'Security Notifications', 
                  desc: 'Critical alerts regarding account integrity.', 
                  checked: user?.notifications?.security ?? true, 
                  req: true 
                },
                { 
                  id: 'hackathons', 
                  title: 'Active Sprints', 
                  desc: 'Updates about events and challenges.', 
                  checked: user?.notifications?.hackathons ?? true,
                  action: (v: boolean) => updateNotifications('hackathons', v)
                },
                { 
                  id: 'recommendations', 
                  title: 'Curated Intelligence', 
                  desc: 'Platform recommendations based on your node activity.', 
                  checked: user?.notifications?.recommendations ?? true,
                  action: (v: boolean) => updateNotifications('recommendations', v)
                },
                { 
                  id: 'newsletter', 
                  title: 'Weekly Intelligence', 
                  desc: 'Platform-wide dispatches across all sectors.', 
                  checked: user?.newsletterSubscribed || false,
                  action: toggleNewsletter 
                }
              ].map((opt) => (
                <div key={opt.id} className="py-8 first:pt-0 last:pb-0 flex items-center justify-between group">
                  <div className="text-left py-2">
                    <p className="text-xs font-black text-gray-200 uppercase tracking-widest mb-2 flex items-center italic">
                      {opt.title} 
                      {opt.req && <span className="ml-4 text-[8px] bg-red-500/10 text-red-500 px-3 py-1 rounded border border-red-500/20 font-black not-italic">Required</span>}
                    </p>
                    <p className="text-[10px] text-gray-600 font-bold uppercase tracking-tight leading-relaxed italic max-w-sm">{opt.desc}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer ml-6">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={opt.checked} 
                      disabled={opt.req || isUpdating} 
                      onChange={(e) => opt.action && opt.action(e.target.checked)} 
                    />
                    <div className={`w-11 h-6 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all ${
                      opt.req ? 'bg-emerald-600/50 opacity-10 cursor-not-allowed' : isUpdating ? 'bg-white/5 opacity-50 cursor-wait' : 'bg-white/5 border border-white/10 peer-checked:bg-emerald-500 shadow-inner'}`}></div>
                  </label>
                </div>
              ))}
            </div>
          </motion.section>

          <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="space-y-8 pt-10">
            <div className="flex items-center space-x-4 border-b border-red-500/10 pb-6">
              <div className="w-10 h-10 rounded-xl bg-red-600/10 border border-red-600/20 flex items-center justify-center">
                <Trash2 className="w-5 h-5 text-red-500" />
              </div>
              <h2 className="text-xl font-black uppercase tracking-tighter italic text-red-500">Registry Purge</h2>
            </div>

            <div className="bg-red-500/5 border border-red-500/10 rounded-3xl p-10 flex flex-col md:flex-row md:items-center justify-between gap-10 shadow-2xl">
              <div className="text-left">
                <p className="text-xs font-black text-red-400 uppercase tracking-[0.2em] mb-3 flex items-center italic"><MailWarning className="w-4 h-4 mr-2" /> WARNING: DESTRUCTIVE ACTION</p>
                <p className="text-[11px] font-bold text-gray-500 uppercase tracking-tighter leading-relaxed max-w-lg italic">
                  Initiating a registry purge will permanently destroy all projects, contribution points, and identity metadata associated with this node. This action is terminal and irreversible.
                </p>
              </div>
              <button 
                onClick={handleDelete} 
                disabled={isUpdating}
                className="shrink-0 bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white border border-red-500/20 hover:border-transparent transition-all px-12 py-4 rounded-xl text-xs font-black uppercase tracking-widest shadow-xl shadow-red-900/10 active:scale-95 italic disabled:opacity-20"
              >
                Purge Node
              </button>
            </div>
          </motion.section>
        </main>
      </div>

      <AnimatePresence>
        {show2faSetup && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 text-left">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={() => setShow2faSetup(false)} />
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="bg-[#0c0c0c] border border-white/10 p-10 rounded-[40px] max-w-md w-full relative z-110 shadow-3xl">
               <h2 className="text-2xl font-black uppercase tracking-tighter italic text-white mb-2">Configure 2FA</h2>
               <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest mb-10 italic">Secure your account with TOTP cluster</p>
               <div className="space-y-8">
                  <div className="flex flex-col items-center justify-center p-8 bg-white/5 rounded-3xl border border-white/5">
                     {qrCode ? (
                        <div className="bg-white p-2 rounded-xl mb-6"><img src={qrCode} alt="2FA QR Code" className="w-40 h-40" /></div>
                     ) : (
                        <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-6" />
                     )}
                     <div className="text-center space-y-2">
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight italic flex items-center justify-center"><QrCode className="w-3 h-3 mr-2 text-blue-500" />Scan with Authenticator App</p>
                        <p className="text-[8px] text-gray-600 font-mono break-all">{totpSecret}</p>
                     </div>
                  </div>
                  <div className="space-y-3">
                     <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest italic ml-1">Authentication Code</label>
                     <input type="text" value={otpToken} onChange={(e) => setOtpToken(e.target.value)} placeholder="000 000" className="w-full bg-[#050505] border border-white/10 rounded-2xl py-4 px-6 text-center text-xl font-mono tracking-[0.5em] text-white focus:outline-none focus:border-blue-500" />
                  </div>
                  <button disabled={setupLoading || otpToken.length < 6} onClick={verify2fa} className="w-full py-5 bg-blue-600 hover:bg-blue-500 disabled:opacity-20 disabled:cursor-not-allowed text-white text-[10px] font-black uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-blue-900/20 italic">
                    {setupLoading ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : 'Confirm Activation'}
                  </button>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
