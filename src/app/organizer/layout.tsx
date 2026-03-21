'use client';

import React, { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { 
  ShieldAlert, 
  ArrowLeft,
  LayoutDashboard,
  Trophy,
  Users,
  Users2,
  FileCode,
  Activity,
  GraduationCap,
  Mail,
  BarChart3,
  Award,
  FileBadge,
  BadgeDollarSign,
  Wallet,
  ShieldCheck,
  Brush,
  Puzzle,
  ChevronRight,
  Menu,
  X,
  Zap,
  Clock,
  Settings,
  Bell,
  Search,
  Plus
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_ITEMS = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard, href: '/organizer' },
  { id: 'hackathons', label: 'Hackathons', icon: Trophy, href: '/organizer/hackathons' },
  { id: 'registrations', label: 'Participants', icon: Users, href: '/organizer/registrations' },
  { id: 'teams', label: 'Teams', icon: Users2, href: '/organizer/teams' },
  // { id: 'submissions', label: 'Submissions', icon: FileCode, href: '/organizer/submissions' },
  { id: 'communication', label: 'Messages', icon: Mail, href: '/organizer/communication' },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, href: '/organizer/analytics' },
  { id: 'leaderboard', label: 'Leaderboard', icon: Award, href: '/organizer/leaderboard' },
  { id: 'customization', label: 'Customization', icon: Brush, href: '/organizer/customization' },
];

export default function OrganizerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const role = useAuthStore((state) => state.role);
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentTime, setCurrentTime] = useState('');
  const [hasUnread, setHasUnread] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const checkUnread = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const res = await fetch(`${baseUrl}/notifications`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        if (res.ok) {
          const data = await res.json();
          setHasUnread(data.some((n: any) => !n.isRead));
        }
      } catch (err) {}
    };
    checkUnread();
    const interval = setInterval(checkUnread, 60000);
    return () => clearInterval(interval);
  }, []);

  if (!isAuthenticated || (role !== 'admin' && role !== 'organizer')) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-red-600/10 rounded-2xl flex items-center justify-center mb-6 border border-red-600/20 shadow-xl animate-pulse">
          <ShieldAlert className="w-8 h-8 text-red-600" />
        </div>
        <h1 className="text-2xl font-black text-white italic uppercase tracking-tighter mb-2 text-center">Access Denied</h1>
        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest max-w-sm mb-8 leading-relaxed italic text-center">
          You don&apos;t have permission to access the Organizer terminal.
        </p>
        <Link href="/dashboard" className="px-8 py-3 bg-blue-600/10 border border-blue-600/20 rounded-xl text-[10px] font-black uppercase tracking-widest text-blue-500 hover:bg-blue-600 hover:text-white transition-all">
          Go to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white flex overflow-hidden font-sans text-left">
      
      {/* Sidebar */}
      <aside className={cn(
        "fixed lg:relative z-[60] h-screen bg-[#0c0c0c] border-r border-white/5 transition-all duration-300",
        sidebarOpen ? "w-56" : "w-16"
      )}>
        <div className="flex flex-col h-full">
           {/* Sidebar Header */}
           <div className="p-6 h-16 border-b border-white/[0.03] flex items-center justify-between">
              <AnimatePresence mode="wait">
                {sidebarOpen ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                       <ShieldCheck className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest italic leading-none text-white font-mono">NODE:ORG</span>
                  </motion.div>
                ) : (
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mx-auto">
                     <ShieldCheck className="w-4 h-4 text-white" />
                  </div>
                )}
              </AnimatePresence>
              
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="hidden lg:flex p-1.5 hover:bg-white/5 rounded-lg text-gray-800 hover:text-blue-500">
                 {sidebarOpen ? <X className="w-3.5 h-3.5" /> : <Menu className="w-3.5 h-3.5" />}
              </button>
           </div>

           {/* Navigation */}
           <nav className="flex-1 overflow-y-auto py-6 px-3 scrollbar-hide space-y-1">
              {NAV_ITEMS.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link 
                    key={item.id} 
                    href={item.href}
                    className={cn(
                      "flex items-center py-2.5 px-3 rounded-lg transition-all group relative",
                      active ? "bg-blue-600/10 text-white" : "text-gray-600 hover:bg-white/[0.02] hover:text-gray-300",
                      sidebarOpen ? "space-x-4" : "justify-center"
                    )}
                  >
                    <item.icon className={cn("w-4 h-4 shrink-0 transition-transform group-hover:scale-110", active ? "text-blue-500" : "")} />
                    {sidebarOpen && (
                      <span className="text-[10px] font-black uppercase tracking-widest italic">{item.label}</span>
                    )}
                    {active && sidebarOpen && (
                      <div className="absolute right-2 w-1 h-1 bg-blue-500 rounded-full" />
                    )}
                  </Link>
                );
              })}
           </nav>

           {/* User Profile */}
           <div className="p-4 border-t border-white/[0.03] space-y-3">
              <Link href="/dashboard" className={cn(
                "flex items-center py-3 px-3 rounded-xl bg-white/[0.02] border border-white/5 text-gray-700 hover:text-white transition-all hover:bg-white/5",
                sidebarOpen ? "space-x-3" : "justify-center"
              )}>
                 <ArrowLeft className="w-4 h-4" />
                 {sidebarOpen && <span className="text-[9px] font-black uppercase tracking-widest italic">User Base</span>}
              </Link>
           </div>
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden overflow-y-auto relative bg-[#050505] scrollbar-hide text-left">
         {/* Top Header */}
         <header className="h-16 border-b border-white/[0.03] bg-[#050505]/60 backdrop-blur-xl flex items-center justify-between px-8 sticky top-0 z-40 shrink-0">
            <div className="flex items-center space-x-3">
               <span className="text-[9px] font-black text-gray-700 uppercase tracking-widest italic font-mono">:: {currentTime || '00:00:00'}</span>
            </div>

            <div className="flex items-center space-x-6">
                <div className="hidden md:flex items-center space-x-6">
                   <Link href="/organizer/hackathons" className="flex items-center space-x-2 px-6 py-2 bg-blue-600 rounded-lg shadow-xl hover:bg-blue-500 transition-all text-white active:scale-95">
                      <Plus className="w-3.5 h-3.5" />
                      <span className="text-[9px] font-black uppercase tracking-widest italic">New Hackathon</span>
                   </Link>
                    <Link href="/organizer/communication" className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center relative hover:bg-white/5 transition-all group">
                       <Bell className="w-4 h-4 text-gray-700 group-hover:text-blue-500 transition-colors" />
                       {hasUnread && (
                         <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-blue-500 border border-[#050505] animate-pulse" />
                       )}
                    </Link>
                    <div className="w-px h-4 bg-white/10" />
                    <div className="flex items-center space-x-3 pl-2">
                       <div className="text-right">
                          <p className="text-[10px] font-black text-white uppercase italic tracking-tighter leading-none">{user?.username || 'OR Node'}</p>
                          <p className="text-[8px] font-bold text-gray-700 uppercase tracking-widest leading-none mt-1">Authorized</p>
                       </div>
                    </div>
                </div>
            </div>
         </header>

         {/* Content Area */}
         <main className="p-8 pb-12 relative z-10 text-left">
            <div className="max-w-6xl mx-auto">
               {children}
            </div>
         </main>
      </div>

      <style jsx global>{`
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: #050505; }
        ::-webkit-scrollbar-thumb { background: #111111; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #3b82f644; }
      `}</style>
    </div>
  );
}
