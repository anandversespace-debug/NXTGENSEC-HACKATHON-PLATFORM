'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Search, 
  Mail, 
  Shield, 
  ShieldCheck, 
  ShieldAlert, 
  Trash2, 
  MoreHorizontal,
  X,
  ExternalLink,
  MapPin,
  Calendar,
  Activity,
  Award,
  Send
} from 'lucide-react';
import { cn } from '@/lib/utils';

const AdminUsers = () => {
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('developer');
  const [inviting, setInviting] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/users`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
          }
        });
        if(res.ok) {
          const data = await res.json();
          setUsers(data);
        }
      } catch (err) {
        console.error('Failed to sync node identities:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!inviteEmail) return;
    setInviting(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/mail/invite`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        },
        body: JSON.stringify({ email: inviteEmail, role: inviteRole })
      });
      if(res.ok) {
        alert('Platform Invitation dispatched securely.');
        setShowInviteModal(false);
        setInviteEmail('');
      } else {
        const d = await res.json();
        alert('Auth Error: ' + d.error);
      }
    } catch(err) {
      console.error(err);
      alert('Network transmission failed');
    } finally {
      setInviting(false);
    }
  };

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold mb-0.5">Identities</h1>
          <p className="text-xs text-gray-400 font-medium">Platform access control.</p>
        </div>
        <div className="flex bg-[#0c0c0c] border border-white/5 rounded-lg p-1 w-64">
          <input 
            type="text" 
            placeholder="Filter entities..." 
            className="bg-transparent border-none focus:outline-none px-3 py-1.5 flex-grow text-white text-[11px]"
          />
          <button className="p-1.5 text-gray-500 hover:text-white transition-colors">
            <Search className="w-3.5 h-3.5" />
          </button>
        </div>
        <button 
           onClick={() => setShowInviteModal(true)}
           className="btn-primary py-2 px-6 ml-4 text-[10px] flex items-center space-x-2"
        >
           <Mail className="w-3.5 h-3.5" />
           <span>Issue Invitation</span>
        </button>
      </header>

      <div className="bg-[#0c0c0c] border border-white/5 rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-white/[0.02] border-b border-white/5">
            <tr>
              <th className="px-6 py-3 text-[9px] font-bold uppercase text-gray-500 tracking-wider">Entity</th>
              <th className="px-6 py-3 text-[9px] font-bold uppercase text-gray-500 tracking-wider">Privilege</th>
              <th className="px-6 py-3 text-[9px] font-bold uppercase text-gray-500 tracking-wider">Reputation</th>
              <th className="px-6 py-3 text-[9px] font-bold uppercase text-gray-500 tracking-wider">State</th>
              <th className="px-6 py-3 text-[9px] font-bold uppercase text-gray-500 tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.02]">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-white/[0.01] transition-colors group">
                <td className="px-6 py-3">
                   <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center font-bold text-[10px] text-gray-400">
                         {user.name[0]}
                      </div>
                      <div>
                         <p className="text-xs font-bold text-gray-200 tracking-tight leading-none mb-1">{user.name}</p>
                         <p className="text-[10px] text-gray-600 font-mono italic">@{user.username}</p>
                      </div>
                   </div>
                </td>
                <td className="px-6 py-3">
                   <div className="flex items-center space-x-2">
                      <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest px-2 py-0.5 bg-white/5 rounded">{user.role}</span>
                   </div>
                </td>
                <td className="px-6 py-3">
                   <span className="text-xs font-medium text-gray-400">{user.contributions} CP</span>
                </td>
                <td className="px-6 py-3">
                   <span className={cn(
                     "text-[8px] font-bold px-2 py-0.5 rounded uppercase tracking-tighter border",
                     user.status === 'active' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-red-500/10 text-red-500 border-red-500/20"
                   )}>
                      {user.status}
                   </span>
                </td>
                <td className="px-6 py-3 text-right">
                   <div className="flex items-center justify-end space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => setSelectedUser(user)}
                        className="p-1.5 text-gray-500 hover:text-blue-400 transition-colors"
                      >
                         <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1.5 text-gray-500 hover:text-red-400 transition-colors">
                         <Trash2 className="w-3.5 h-3.5" />
                      </button>
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Admin Invite New User Modal */}
      <AnimatePresence>
        {showInviteModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setShowInviteModal(false)}
               className="absolute inset-0 bg-black/70 backdrop-blur-md"
             />
             <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.95 }}
               className="relative w-full max-w-sm bg-[#080808] border border-white/10 rounded-xl shadow-2xl overflow-hidden"
             >
                <div className="p-6 border-b border-white/5 flex justify-between items-center">
                   <h2 className="text-sm font-bold uppercase tracking-widest text-white italic">Dispatch Invitation</h2>
                   <button onClick={() => setShowInviteModal(false)} className="text-gray-500 hover:text-white"><X className="w-4 h-4" /></button>
                </div>
                <form onSubmit={handleInvite} className="p-6 space-y-4">
                   <div>
                      <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-2 block">Target Email</label>
                      <input 
                        type="email" 
                        required 
                        value={inviteEmail}
                        onChange={(e) => setInviteEmail(e.target.value)}
                        className="w-full bg-[#050505] border border-white/10 rounded-lg p-3 text-xs text-white focus:border-blue-500 focus:outline-none"
                        placeholder="developer@node.com"
                      />
                   </div>
                   <div>
                      <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-2 block">Clearance Role</label>
                      <select 
                        value={inviteRole}
                        onChange={(e) => setInviteRole(e.target.value)}
                        className="w-full bg-[#050505] border border-white/10 rounded-lg p-3 text-xs text-white uppercase tracking-wider font-bold appearance-none focus:border-blue-500 focus:outline-none"
                      >
                         <option value="developer">Developer Node</option>
                         <option value="judge">Auditor / Judge</option>
                         <option value="admin">System Admin</option>
                      </select>
                   </div>
                   <button 
                     type="submit" 
                     disabled={inviting || !inviteEmail}
                     className="w-full btn-primary py-3 disabled:opacity-50 flex items-center justify-center space-x-2 mt-2"
                   >
                     {inviting ? <span className="text-[10px]">Processing...</span> : <><span>Transmit Token</span> <Send className="w-3.5 h-3.5 inline-block" /></>}
                   </button>
                </form>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* User QuickView Modal */}
      <AnimatePresence>
        {selectedUser && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setSelectedUser(null)}
               className="absolute inset-0 bg-black/70 backdrop-blur-md"
             />
             <motion.div 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, scale: 1.05 }}
               className="relative w-full max-w-lg bg-[#080808] border border-white/10 rounded-xl shadow-2xl overflow-hidden"
             >
                <div className="p-8">
                   <div className="flex items-start justify-between mb-8">
                      <div className="flex items-center space-x-4">
                         <div className="w-16 h-16 bg-blue-600/10 border border-blue-600/20 rounded-xl flex items-center justify-center font-bold text-2xl text-blue-500">
                            {selectedUser.name[0]}
                         </div>
                         <div>
                            <h2 className="text-lg font-bold text-white uppercase tracking-tight">{selectedUser.name}</h2>
                            <p className="text-[10px] text-gray-500 font-mono">ID: {selectedUser.id}</p>
                         </div>
                      </div>
                      <button 
                        onClick={() => setSelectedUser(null)}
                        className="p-2 text-gray-500 hover:text-white"
                      >
                         <X className="w-4 h-4" />
                      </button>
                   </div>

                   <div className="grid grid-cols-2 gap-4 mb-8">
                      {[
                        { label: 'Network Alias', value: '@' + selectedUser.username, icon: Users },
                        { label: 'Access Level', value: selectedUser.role, icon: Shield },
                        { label: 'Performance', value: selectedUser.contributions + ' CP', icon: Activity },
                        { label: 'Deployment', value: selectedUser.joined, icon: Calendar },
                      ].map((item, i) => (
                        <div key={i} className="p-3 bg-white/[0.02] border border-white/5 rounded-lg">
                           <p className="text-[8px] font-bold text-gray-600 uppercase mb-1 tracking-widest">{item.label}</p>
                           <p className="text-[11px] font-bold text-gray-300">{item.value}</p>
                        </div>
                      ))}
                   </div>

                   <div className="space-y-4">
                      <div className="p-4 bg-white/[0.02] border border-white/5 rounded-lg">
                         <p className="text-[8px] font-bold text-gray-600 uppercase mb-2 tracking-widest">Security Descriptor</p>
                         <p className="text-xs text-gray-400 italic leading-snug">"{selectedUser.bio}"</p>
                      </div>
                      <div className="flex gap-4">
                         <button className="flex-1 py-2.5 bg-white/5 border border-white/10 rounded-lg text-[10px] font-bold uppercase tracking-wider text-gray-400 hover:text-white transition-colors">Audit Logs</button>
                         <button className="flex-1 py-2.5 bg-blue-600 rounded-lg text-[10px] font-bold uppercase tracking-wider text-white hover:bg-blue-500 transition-colors">Grant Access</button>
                      </div>
                   </div>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminUsers;
