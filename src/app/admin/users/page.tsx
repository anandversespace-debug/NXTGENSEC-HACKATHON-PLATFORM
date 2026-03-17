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
  Award
} from 'lucide-react';
import { cn } from '@/lib/utils';

const AdminUsers = () => {
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const users = [
    { 
      id: 'u1', 
      name: 'Alex Chen', 
      username: 'cipher_nexus',
      email: 'alex@dev.com', 
      role: 'admin', 
      status: 'active', 
      joined: '2024-01-12',
      contributions: 4850,
      skills: ['Rust', 'Wasm', 'Kernel'],
      bio: 'Security architect focusing on zero-trust infrastructure.'
    },
    { 
      id: 'u2', 
      name: 'Sarah Miller', 
      username: 'block_sarah',
      email: 'sarah@dev.com', 
      role: 'judge', 
      status: 'active', 
      joined: '2024-02-05',
      contributions: 1200,
      skills: ['Solidity', 'Audit'],
      bio: 'DeFi security researcher and smart contract auditor.'
    },
    { 
      id: 'u3', 
      name: 'Jake Ross', 
      username: 'jake_r',
      email: 'jake@dev.com', 
      role: 'developer', 
      status: 'active', 
      joined: '2024-03-01',
      contributions: 850,
      skills: ['Next.js', 'Go'],
      bio: 'Fullstack developer specializing in decentralized frontends.'
    },
    { 
      id: 'u4', 
      name: 'Emma Wilson', 
      username: 'em_codes',
      email: 'emma@dev.com', 
      role: 'developer', 
      status: 'flagged', 
      joined: '2024-03-10',
      contributions: 120,
      skills: ['Python', 'ML'],
      bio: 'Data scientist exploring AI-driven threat detection.'
    },
  ];

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
