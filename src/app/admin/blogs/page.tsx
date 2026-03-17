'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Search, 
  Trash2, 
  Edit3, 
  Plus,
  Eye,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const AdminBlogs = () => {
  const blogs = [
    { 
      id: 'b1', 
      title: 'Zero-Trust Architecture in 2024', 
      author: 'Cipher_Nexus', 
      status: 'published',
      views: 1240, 
      date: 'Oct 12, 2024'
    },
    { 
      id: 'b2', 
      title: 'Auditing EVM Smart Contracts', 
      author: 'Block_Sarah', 
      status: 'draft',
      views: 0, 
      date: 'Oct 15, 2024'
    },
    { 
      id: 'b3', 
      title: 'Understanding zk-SNARKs', 
      author: 'Math_Guru', 
      status: 'published',
      views: 8400, 
      date: 'Sep 29, 2024'
    },
  ];

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold mb-0.5">Content Registry</h1>
          <p className="text-xs text-gray-400 font-medium tracking-tight">Manage ecosystem publications and technical briefs.</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex bg-[#0c0c0c] border border-white/5 rounded-lg p-1 w-64 transition-colors focus-within:border-blue-500/30">
            <input 
              type="text" 
              placeholder="Search documents..." 
              className="bg-transparent border-none focus:outline-none px-3 py-1.5 flex-grow text-white text-[11px]"
            />
            <button className="p-1.5 text-gray-500 hover:text-white transition-colors">
              <Search className="w-3.5 h-3.5" />
            </button>
          </div>
          <button className="btn-primary text-[10px] px-4 py-2 flex items-center space-x-2">
            <Plus className="w-3.5 h-3.5" />
            <span>Create Dispatch</span>
          </button>
        </div>
      </header>

      <div className="bg-[#0c0c0c] border border-white/5 rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-white/[0.02] border-b border-white/5">
            <tr>
              <th className="px-6 py-4 text-[9px] font-bold uppercase text-gray-500 tracking-wider">Document Ledger</th>
              <th className="px-6 py-4 text-[9px] font-bold uppercase text-gray-500 tracking-wider">Author Node</th>
              <th className="px-6 py-4 text-[9px] font-bold uppercase text-gray-500 tracking-wider">Metrics</th>
              <th className="px-6 py-4 text-[9px] font-bold uppercase text-gray-500 tracking-wider">Status</th>
              <th className="px-6 py-4 text-[9px] font-bold uppercase text-gray-500 tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.02]">
            {blogs.map((blog, i) => (
              <tr key={blog.id} className="hover:bg-white/[0.01] transition-colors group">
                <td className="px-6 py-4">
                   <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center">
                         <FileText className="w-4 h-4 text-blue-500" />
                      </div>
                      <div>
                         <p className="text-xs font-bold text-gray-200 uppercase tracking-tight mb-1">{blog.title}</p>
                         <p className="text-[9px] text-gray-600 font-mono italic">ID: {blog.id}</p>
                      </div>
                   </div>
                </td>
                <td className="px-6 py-4">
                   <p className="text-[10px] font-bold text-gray-300 uppercase tracking-wider">@{blog.author}</p>
                   <p className="text-[8px] text-gray-600 mt-1 uppercase tracking-widest">{blog.date}</p>
                </td>
                <td className="px-6 py-4">
                   <div className="flex items-center space-x-2 text-gray-400">
                      <Eye className="w-3.5 h-3.5" />
                      <span className="text-sm font-black text-white">{blog.views.toLocaleString()}</span>
                   </div>
                </td>
                <td className="px-6 py-4">
                   <span className={cn(
                     "text-[8px] font-bold px-2 py-0.5 rounded uppercase tracking-tighter border",
                     blog.status === 'published' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                   )}>
                      {blog.status}
                   </span>
                </td>
                <td className="px-6 py-4 text-right">
                   <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-gray-500 hover:text-white bg-white/5 rounded border border-transparent hover:border-white/10 transition-colors">
                         <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1.5 text-gray-500 hover:text-red-400 bg-white/5 rounded border border-transparent hover:border-red-500/20 transition-colors">
                         <Trash2 className="w-3.5 h-3.5" />
                      </button>
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminBlogs;
