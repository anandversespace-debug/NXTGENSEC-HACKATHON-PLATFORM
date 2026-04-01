'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  BarChart3, 
  Users, 
  FolderLock, 
  Trophy, 
  Settings, 
  ShieldAlert, 
  Gavel,
  LayoutDashboard,
  LogOut,
  Mail,
  PieChart,
  Bell,
  FileText
} from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { cn } from '@/lib/utils';

const AdminSidebar = () => {
  const pathname = usePathname();
  const role = useAuthStore((state) => state.role);
  const logout = useAuthStore((state) => state.logout);

  // JSON Mapping: ["Dashboard", "Users", "Projects", "Hackathons", "Submissions", "Blogs", "Analytics", "Notifications"]

  const menuItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Nodes & Roles', href: '/admin/users', icon: ShieldAlert },
    { name: 'Infrastructure', href: '/admin/projects', icon: FolderLock },
    { name: 'Global Events', href: '/admin/hackathons', icon: Trophy },
    { name: 'Audit Pipeline', href: '/admin/submissions', icon: Gavel },
    { name: 'Intelligence', href: '/admin/blogs', icon: FileText },
    { name: 'Telemetry', href: '/admin/analytics', icon: PieChart },
    { name: 'Broadcast', href: '/admin/notifications', icon: Bell },
    { name: 'Configuration', href: '/admin/settings', icon: Settings },
  ];

  const handleLogout = async () => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const logoutUrl = `${baseUrl.replace(/\/$/, '')}/auth/logout`;
      await fetch(logoutUrl, { method: 'GET', credentials: 'include' }).catch(() => {});
    } catch (err) {
      console.warn('Admin logout signal failed, purging locally.');
    } finally {
      localStorage.removeItem('token');
      logout();
      window.location.href = '/login';
    }
  };

  return (
    <div className="w-52 h-screen bg-[#080808] border-r border-white/5 flex flex-col fixed left-0 top-0 z-50 overflow-hidden">
      <div className="p-6 flex items-center space-x-2.5 mb-6">
        <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center shadow-lg shadow-blue-900/10">
          <ShieldAlert className="w-3.5 h-3.5 text-white" />
        </div>
        <span className="font-bold text-sm tracking-tight">Admin <span className="text-blue-500">Panel</span></span>
      </div>

      <nav className="flex-grow px-3 space-y-0.5 overflow-y-auto custom-scrollbar pb-8 mt-2">
        <p className="text-[9px] font-bold uppercase text-gray-600 tracking-wider mb-3 ml-3">Menu</p>
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center space-x-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all group",
                isActive 
                  ? "bg-blue-600/10 text-blue-400 border border-blue-500/10" 
                  : "text-gray-500 hover:text-gray-300 hover:bg-white/[0.02]"
              )}
            >
              <item.icon className={cn("w-4 h-4", isActive ? "text-blue-500" : "text-gray-600 group-hover:text-gray-400")} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mt-auto border-t border-white/5 bg-black/20 space-y-1">
        <Link href="/" className="flex items-center space-x-2 text-gray-500 hover:text-white transition-colors text-[10px] font-bold px-3 py-2 rounded-lg hover:bg-white/[0.02]">
           <LayoutDashboard className="w-3.5 h-3.5" />
           <span>Public Home</span>
        </Link>
        <button 
          onClick={handleLogout}
          className="flex items-center space-x-2 text-gray-500 hover:text-red-400 transition-colors text-[10px] font-bold w-full text-left px-3 py-2 rounded-lg hover:bg-red-500/5 transition-all"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { role, isAuthenticated, isLoading } = useAuthStore();
  const isAdminLogin = pathname === '/login';

  if (isAdminLogin) {
    return (
      <div className="min-h-screen bg-[#050505] text-white">
        {children}
      </div>
    );
  }

  // Handle Loading state to prevent flickering
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
         <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle Unauthorized state
  // We use an "Access Denied" message instead of a hard redirect to prevent loops with the middleware
  if (!isAuthenticated || (role !== 'admin' && role !== 'organizer')) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
          <ShieldAlert className="w-8 h-8 text-red-500" />
        </div>
        <h1 className="text-xl font-bold mb-2 uppercase tracking-tighter">Access Denied</h1>
        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest leading-loose mb-8 max-w-xs">
          Your node does not have the administrative clearance required for this sector.
        </p>
        <Link href="/login" className="px-8 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg text-xs font-black uppercase tracking-widest transition-all">
          Re-authenticate
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <AdminSidebar />
      <main className="pl-52 min-h-screen overflow-x-hidden">
        <div className="p-8 max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
