'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { 
  Bell, 
  Search, 
  LayoutDashboard,
  Trophy,
  FolderLock,
  CheckSquare,
  BarChart2,
  Settings
} from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import Link from 'next/link';

const DashboardHeader = () => {
  const pathname = usePathname();
  const user = useAuthStore((state) => state.user);
  const [hasUnread, setHasUnread] = useState(false);

  useEffect(() => {
    const checkUnread = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const res = await fetch(`${baseUrl}/notifications`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (res.ok) {
          const data = await res.json();
          setHasUnread(data.some((n: any) => !n.isRead));
        }
      } catch (err) {
        // Silent fail
      }
    };
    checkUnread();
    // Re-check periodically
    const interval = setInterval(checkUnread, 30000);
    return () => clearInterval(interval);
  }, []);

  const getPageTitle = () => {
    const path = pathname.split('/').pop();
    if (path === 'dashboard') return 'Overview';
    return path ? path.charAt(0).toUpperCase() + path.slice(1) : 'Overview';
  };

  const menuIcons: Record<string, any> = {
    'dashboard': LayoutDashboard,
    'projects': FolderLock,
    'hackathons': Trophy,
    'submissions': CheckSquare,
    'leaderboard': BarChart2,
    'notifications': Bell,
    'settings': Settings,
  };

  const Icon = menuIcons[pathname.split('/').pop() || 'dashboard'] || LayoutDashboard;

  return (
    <header className="fixed top-0 left-56 right-0 h-16 bg-[#050505]/80 backdrop-blur-md border-b border-white/5 z-30 px-8 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="w-8 h-8 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center">
            <Icon className="w-4 h-4 text-blue-500" />
        </div>
        <h1 className="text-sm font-black uppercase tracking-widest italic text-white flex items-center">
          {getPageTitle()}
          <span className="mx-3 text-gray-800 font-normal">/</span>
          <span className="text-[10px] text-gray-500 font-bold tracking-tighter normal-case not-italic">User Terminal</span>
        </h1>
      </div>

      <div className="flex items-center space-x-6">
        {/* Search */}
        <div className="hidden lg:flex items-center bg-white/[0.03] border border-white/5 rounded-full px-4 py-1.5 focus-within:border-blue-500/30 transition-all w-64">
          <Search className="w-3.5 h-3.5 text-gray-500 mr-2" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="bg-transparent border-none focus:outline-none text-[10px] text-gray-300 w-full font-bold tracking-tight"
          />
        </div>

        {/* Notifications */}
        <Link href="/dashboard/notifications" className="relative p-2 text-gray-500 hover:text-white transition-colors group">
          <Bell className="w-4 h-4" />
          {hasUnread && (
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full border border-[#050505] animate-pulse shadow-[0_0_5px_rgba(59,130,246,0.5)]"></span>
          )}
        </Link>

        {/* User Profile Summary */}
        <div className="flex items-center space-x-3 pl-6 border-l border-white/5">
          <div className="text-right hidden sm:block text-left">
            <p className="text-[10px] font-black text-gray-200 uppercase tracking-tighter leading-none mb-0.5 italic text-right">{user?.name || 'Operator Node'}</p>
            <p className="text-[9px] text-gray-600 font-bold uppercase tracking-widest leading-none text-right">@{user?.username || 'unknown'}</p>
          </div>
          <Link href="/dashboard/settings" className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600/20 to-violet-600/20 border border-white/10 flex items-center justify-center font-black text-[10px] text-blue-400 shadow-xl shadow-blue-900/10 active:scale-95 transition-transform cursor-pointer overflow-hidden">
            {user?.picture ? (
              <img src={user.picture} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              (user?.name?.[0] || 'U').toUpperCase()
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
