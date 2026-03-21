'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FolderLock, 
  Trophy, 
  Bell, 
  User, 
  LayoutDashboard,
  LogOut,
  Gavel,
  CheckSquare,
  BarChart2,
  Settings,
  MessageSquare
} from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { cn } from '@/lib/utils';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import DashboardHeader from '@/components/layout/DashboardHeader';

const DashboardSidebar = () => {
  const pathname = usePathname();
  const role = useAuthStore((state) => state.role);
  const logout = useAuthStore((state) => state.logout);

  // JSON Mapping: ["Overview", "Projects", "Hackathons", "Submissions", "Leaderboard", "Notifications", "Settings"]
  
  const commonItems = [
    { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Projects', href: '/dashboard/projects', icon: FolderLock },
    { name: 'Hackathons', href: '/dashboard/hackathons', icon: Trophy },
    { name: 'Submissions', href: '/dashboard/submissions', icon: CheckSquare },
    { name: 'Leaderboard', href: '/dashboard/leaderboard', icon: BarChart2 },
    { name: 'Notifications', href: '/dashboard/notifications', icon: Bell },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];

  // Specific items that might not be in the direct "primary" sidebar list but needed for judges
  const judgeExtraItems = [
    { name: 'Judging', href: '/dashboard/judging', icon: Gavel },
    { name: 'Feedback', href: '/dashboard/feedback', icon: MessageSquare },
  ];

  const handleLogout = async () => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      // Robust URL joining
      const logoutUrl = `${baseUrl.replace(/\/$/, '')}/auth/logout`;
      await fetch(logoutUrl, { method: 'GET', credentials: 'include' }).catch(() => {});
    } catch (err) {
      console.warn('Network logout signal failed, proceeding with local purge.');
    } finally {
      localStorage.removeItem('token');
      logout();
      window.location.href = '/login';
    }
  };

  return (
    <div className="w-56 h-screen bg-[#0c0c0c] border-r border-white/5 flex flex-col fixed left-0 top-0 z-40 overflow-hidden">
      <div className="p-6 flex items-center space-x-3 mb-2 border-b border-white/[0.03]">
        <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/20">
          <FolderLock className="w-4 h-4 text-white" />
        </div>
        <span className="font-black text-xs tracking-tighter uppercase italic">
          User <span className="text-blue-500">Terminal</span>
        </span>
      </div>
      <nav className="flex-grow px-4 space-y-1 overflow-y-auto custom-scrollbar mt-4 pb-8">
        <p className="text-[9px] font-bold uppercase text-gray-500 tracking-wider mb-4 ml-3">Menu</p>
        
        {commonItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group",
                isActive 
                  ? "bg-blue-600/10 text-blue-400 border border-blue-500/20" 
                  : "text-gray-400 hover:text-gray-200 hover:bg-white/[0.02] border border-transparent"
              )}
            >
              <item.icon className={cn("w-4 h-4", isActive ? "text-blue-500" : "text-gray-500 group-hover:text-gray-400")} />
              <span>{item.name}</span>
            </Link>
          );
        })}

        {/* Organizer specific section if applicable */}
        {(role === 'organizer' || role === 'admin') && (
          <>
            <div className="pt-8 pb-3">
               <p className="text-[9px] font-black uppercase text-gray-700 tracking-[0.2em] ml-3 italic">Autonomous Organizer</p>
            </div>
            <Link
              href="/organizer"
              className={cn(
                "flex items-center space-x-3 px-3 py-3 rounded-xl text-sm font-black transition-all group",
                pathname.startsWith('/organizer')
                  ? "bg-amber-600/10 text-amber-500 border border-amber-500/20 shadow-lg shadow-amber-900/10" 
                  : "text-gray-500 hover:text-amber-400 hover:bg-amber-600/[0.05] border border-transparent"
              )}
            >
              <Gavel className="w-4 h-4 text-amber-500" />
              <span className="uppercase tracking-tighter italic">Organizer Portal</span>
            </Link>
            
            {/* Keeping submission link as it was useful for evaluation before */}
            <Link
              href="/dashboard/submissions"
              className={cn(
                "flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group mt-2 text-gray-500 hover:text-gray-300 hover:bg-white/[0.02]"
              )}
            >
              <CheckSquare className="w-4 h-4 text-gray-700" />
              <span>Submission Queue</span>
            </Link>
          </>
        )}
      </nav>

      <div className="p-5 border-t border-white/5 bg-[#050505]/50 space-y-3">
        <Link href="/dashboard/profile" className="flex items-center space-x-3 text-gray-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest pl-3">
           <User className="w-4 h-4" />
           <span>Profile</span>
        </Link>
        <button 
          onClick={handleLogout}
          className="flex items-center space-x-3 text-gray-500 hover:text-red-400 transition-colors text-xs font-bold uppercase tracking-widest w-full text-left pl-3"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#050505] text-white flex">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <DashboardHeader />
          <main className="ml-56 pt-24 pb-12 px-8">
            <div className="max-w-6xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
