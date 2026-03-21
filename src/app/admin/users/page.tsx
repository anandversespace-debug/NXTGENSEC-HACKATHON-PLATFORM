'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Search, 
  Mail, 
  Shield, 
  Trash2, 
  X,
  ExternalLink,
  Calendar,
  Activity,
  Send,
  Loader2,
  Check
} from 'lucide-react';
import { cn } from '@/lib/utils';

const AdminUsers = () => {
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('developer');
  const [inviting, setInviting] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  const [target, setTarget] = useState('all'); // all, developers, organizers
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/users`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        },
        credentials: 'include'
      });
      if(res.ok) {
        const data = await res.json();
        setUsers(data);
      }
    } catch (err) {
      console.error('Failed to sync users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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
        credentials: 'include',
        body: JSON.stringify({ email: inviteEmail, role: inviteRole })
      });
      if(res.ok) {
        alert('Invitation sent successfully.');
        setShowInviteModal(false);
        setInviteEmail('');
      } else {
        const d = await res.json();
        alert('Auth Error: ' + d.error);
      }
    } catch(err) {
      console.error(err);
      alert('Failed to send invitation.');
    } finally {
      setInviting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/users/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token') || ''}` }
      });
      if (res.ok) {
        setUsers(prev => prev.filter(u => u._id !== id));
        if (selectedUser?._id === id) setSelectedUser(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateUser = async (id: string, updates: any) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        },
        body: JSON.stringify(updates)
      });
      if (res.ok) {
        const updated = await res.json();
        setUsers(prev => prev.map(u => u._id === id ? updated : u));
        setSelectedUser(updated);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredUsers = users.filter(u => 
    u.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.username?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 text-left">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black uppercase tracking-tighter italic">Users</h1>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-none mt-1">Manage user accounts, roles, and access.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-[#0c0c0c] border border-white/5 rounded-xl p-1 w-64 focus-within:border-blue-500/30 transition-all">
            <input 
              type="text" 
              placeholder="Search users..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none focus:outline-none px-3 py-1.5 flex-grow text-white text-[11px]"
            />
            <button className="p-1.5 text-gray-500 hover:text-white transition-colors">
              <Search className="w-3.5 h-3.5" />
            </button>
          </div>
          <button 
             onClick={() => setShowInviteModal(true)}
             className="bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black uppercase tracking-widest px-6 py-2.5 rounded-xl flex items-center space-x-2 transition-all shadow-xl shadow-blue-900/20 italic"
          >
             <Mail className="w-3.5 h-3.5" />
             <span>Invite User</span>
          </button>
        </div>
      </header>

      {loading ? (
        <div className="flex items-center justify-center py-20">
           <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
        </div>
      ) : (
        <div className="bg-[#0c0c0c] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
          <table className="w-full text-left">
            <thead className="bg-white/[0.02] border-b border-white/5">
              <tr>
                <th className="px-8 py-5 text-[9px] font-black uppercase text-gray-700 tracking-[0.2em]">User</th>
                <th className="px-8 py-5 text-[9px] font-black uppercase text-gray-700 tracking-[0.2em]">Role</th>
                <th className="px-8 py-5 text-[9px] font-black uppercase text-gray-700 tracking-[0.2em]">Points</th>
                <th className="px-8 py-5 text-[9px] font-black uppercase text-gray-700 tracking-[0.2em]">Status</th>
                <th className="px-8 py-5 text-[9px] font-black uppercase text-gray-700 tracking-[0.2em] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.03]">
              {filteredUsers.map((user, idx) => (
                <tr key={user._id || idx} className="hover:bg-white/[0.01] transition-colors group">
                  <td className="px-8 py-5">
                     <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center font-black text-xs text-gray-400 group-hover:bg-blue-600/10 group-hover:border-blue-500/20 group-hover:text-blue-500 transition-all">
                           {user.name?.[0] || 'U'}
                        </div>
                        <div>
                           <p className="text-xs font-black text-gray-200 uppercase tracking-tight italic mb-1">{user.name}</p>
                           <p className="text-[10px] text-gray-600 font-mono italic">@{user.username}</p>
                        </div>
                     </div>
                  </td>
                  <td className="px-8 py-5 text-left">
                     <select 
                       value={user.role} 
                       onChange={(e) => handleUpdateUser(user._id, { role: e.target.value })}
                       className="bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-[9px] font-black text-gray-400 uppercase tracking-widest focus:outline-none focus:border-blue-500/50 appearance-none hover:text-white transition-colors cursor-pointer"
                     >
                        <option value="developer">Developer</option>
                        <option value="organizer">Organizer</option>
                        <option value="admin">System Admin</option>
                     </select>
                  </td>
                  <td className="px-8 py-5 text-left">
                     <span className="text-xs font-black text-white italic tracking-tighter">{(user.contributions || 0).toLocaleString()} <span className="text-blue-500 text-[10px] ml-1">CP</span></span>
                  </td>
                  <td className="px-8 py-5 text-left">
                     <span onClick={() => handleUpdateUser(user._id, { status: user.status === 'active' ? 'suspended' : 'active' })} className={cn(
                       "text-[8px] font-black px-2 py-0.5 rounded-sm uppercase tracking-widest border italic cursor-pointer transition-all",
                       user.status === 'active' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20 hover:bg-emerald-500/20" : "bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500/20"
                     )}>
                        {user.status || 'active'}
                     </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                     <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => setSelectedUser(user)}
                          className="p-2 text-gray-500 hover:text-white bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition-all"
                        >
                           <ExternalLink className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(user._id)}
                          className="p-2 text-gray-500 hover:text-red-400 bg-white/5 rounded-xl border border-white/5 hover:border-red-500/20 transition-all"
                        >
                           <Trash2 className="w-4 h-4" />
                        </button>
                     </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredUsers.length === 0 && (
            <div className="py-24 text-center">
               <Users className="w-12 h-12 text-gray-800 mx-auto mb-4 opacity-30" />
               <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-700 italic">No users found.</p>
            </div>
          )}
        </div>
      )}

      {/* Admin Invite Modal */}
      <AnimatePresence>
        {showInviteModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowInviteModal(false)} className="absolute inset-0 bg-black/70 backdrop-blur-md" />
             <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-sm bg-[#080808] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
                <div className="p-6 border-b border-white/5 flex justify-between items-center">
                   <h2 className="text-xs font-black uppercase tracking-[0.2em] text-white italic">Invite User</h2>
                   <button onClick={() => setShowInviteModal(false)} className="text-gray-500 hover:text-white"><X className="w-4 h-4" /></button>
                </div>
                <form onSubmit={handleInvite} className="p-8 space-y-6">
                    <div>
                      <label className="text-[9px] font-black text-gray-700 uppercase tracking-widest mb-2 block italic">Email Address</label>
                      <input type="email" required value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} className="w-full bg-[#050505] border border-white/10 rounded-xl p-4 text-xs text-white focus:border-blue-500/50 focus:outline-none transition-all" placeholder="user@example.com" />
                   </div>
                   <div>
                      <label className="text-[9px] font-black text-gray-700 uppercase tracking-widest mb-2 block italic">Role</label>
                      <select value={inviteRole} onChange={(e) => setInviteRole(e.target.value)} className="w-full bg-[#050505] border border-white/10 rounded-xl p-4 text-xs text-white uppercase tracking-wider font-bold appearance-none focus:border-blue-500/50 focus:outline-none transition-all cursor-pointer">
                          <option value="developer">Developer</option>
                          <option value="organizer">Organizer</option>
                          <option value="admin">Admin</option>
                      </select>
                   </div>
                   <button type="submit" disabled={inviting || !inviteEmail} className="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-xl disabled:opacity-50 flex items-center justify-center space-x-3 transition-all active:scale-[0.98] shadow-lg shadow-blue-900/20">
                     {inviting ? <Loader2 className="w-4 h-4 animate-spin" /> : <><span className="text-[10px] font-black uppercase tracking-widest">Send Invitation</span> <Send className="w-3.5 h-3.5" /></>}
                   </button>
                </form>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* User QuickView Modal */}
      <AnimatePresence>
        {selectedUser && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 text-left">
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedUser(null)} className="absolute inset-0 bg-black/70 backdrop-blur-md" />
             <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 1.05 }} className="relative w-full max-w-lg bg-[#080808] border border-white/10 rounded-2xl shadow-2xl overflow-hidden p-8">
                <div className="flex items-start justify-between mb-8">
                   <div className="flex items-center space-x-6">
                      <div className="w-20 h-20 bg-blue-600/10 border border-blue-600/20 rounded-2xl flex items-center justify-center font-black text-4xl text-blue-500 italic drop-shadow-2xl">
                         {selectedUser.name?.[0]}
                      </div>
                      <div>
                         <h2 className="text-lg font-black text-white uppercase tracking-tight italic">{selectedUser.name}</h2>
                         <p className="text-[10px] text-gray-600 font-mono tracking-tighter mt-1">{selectedUser.email}</p>
                         <div className="flex items-center space-x-2 mt-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Verified</span>
                         </div>
                      </div>
                   </div>
                   <button onClick={() => setSelectedUser(null)} className="p-2 text-gray-500 hover:text-white"><X className="w-5 h-5" /></button>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                   {[
                     { label: 'Alias', value: '@' + selectedUser.username, icon: Users },
                     { label: 'Role', value: selectedUser.role, icon: Shield },
                     { label: 'Points', value: selectedUser.contributions + ' CP', icon: Activity },
                     { label: 'Joined', value: new Date(selectedUser.createdAt).toLocaleDateString(), icon: Calendar },
                   ].map((item, i) => (
                     <div key={i} className="p-4 bg-white/[0.02] border border-white/5 rounded-xl group hover:border-white/10 transition-colors">
                        <p className="text-[9px] font-black text-gray-700 uppercase mb-2 tracking-widest italic">{item.label}</p>
                        <p className="text-xs font-black text-gray-300 uppercase italic tracking-tight">{item.value}</p>
                     </div>
                   ))}
                </div>

                <div className="space-y-6">
                   <div className="p-5 bg-white/[0.01] border border-white/5 rounded-xl border-l-2 border-l-blue-600">
                      <p className="text-[9px] font-black text-gray-700 uppercase mb-3 tracking-widest italic">Bio</p>
                      <p className="text-xs text-gray-400 italic leading-relaxed">"{selectedUser.bio || 'No bio found for this user.'}"</p>
                   </div>
                   <div className="flex gap-4">
                      <button onClick={() => handleUpdateUser(selectedUser._id, { status: 'suspended' })} className="flex-1 py-3 bg-red-600/10 border border-red-500/20 rounded-xl text-[10px] font-black uppercase tracking-widest text-red-500 hover:bg-red-500/20 transition-colors italic">Suspend User</button>
                      <button onClick={() => handleDelete(selectedUser._id)} className="flex-1 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-white transition-colors italic">Delete User</button>
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
