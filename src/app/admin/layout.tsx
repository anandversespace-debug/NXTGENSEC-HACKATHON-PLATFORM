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
    { name: 'Users', href: '/admin/users', icon: Users },
    { name: 'Projects', href: '/admin/projects', icon: FolderLock },
    { name: 'Hackathons', href: '/admin/hackathons', icon: Trophy },
    { name: 'Submissions', href: '/admin/submissions', icon: Gavel },
    { name: 'Blogs', href: '/admin/blogs', icon: FileText },
    { name: 'Analytics', href: '/admin/analytics', icon: PieChart },
    { name: 'Notifications', href: '/admin/notifications', icon: Bell },
  ];

  const handleLogout = async () => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const endpoint = baseUrl.endsWith('/api') ? '/auth/logout' : '/api/auth/logout';
      await fetch(`${baseUrl}${endpoint}`, { credentials: 'include' });
    } catch (err) {
      console.error('Logout failed:', err);
    }
    localStorage.removeItem('token');
    logout();
    window.location.href = '/admin/login';
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
  const isAdminLogin = pathname === '/admin/login';

  if (isAdminLogin) {
    return (
      <div className="min-h-screen bg-[#050505] text-white">
        {children}
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
