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
  Mail
} from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { cn } from '@/lib/utils';

const AdminSidebar = () => {
  const pathname = usePathname();
  const { role } = useAuthStore();

  const menuItems = [
    { name: 'Overview', href: '/admin', icon: BarChart3, roles: ['admin'] },
    { name: 'Users', href: '/admin/users', icon: Users, roles: ['admin'] },
    { name: 'Inbox', href: '/admin/inbox', icon: Mail, roles: ['admin'] },
    { name: 'Projects', href: '/admin/projects', icon: FolderLock, roles: ['admin'] },
    { name: 'Hackathons', href: '/admin/hackathons', icon: Trophy, roles: ['admin'] },
    { name: 'Judging', href: '/admin/judging', icon: Gavel, roles: ['admin', 'judge'] },
    { name: 'Settings', href: '/admin/settings', icon: Settings, roles: ['admin'] },
  ];

  const effectiveRole = role || 'admin'; 
  const filteredItems = menuItems.filter(item => item.roles.includes(effectiveRole));

  return (
    <div className="w-52 h-screen bg-[#080808] border-r border-white/5 flex flex-col fixed left-0 top-0 z-50">
      <div className="p-6 flex items-center space-x-2.5 mb-6">
        <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
          <ShieldAlert className="w-3.5 h-3.5 text-white" />
        </div>
        <span className="font-bold text-sm tracking-tight">Admin<span className="text-blue-500">Node</span></span>
      </div>

      <nav className="flex-grow px-3 space-y-0.5 overflow-y-auto custom-scrollbar">
        <p className="text-[9px] font-bold uppercase text-gray-600 tracking-wider mb-3 ml-3">Menu</p>
        {filteredItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center space-x-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all group",
                isActive 
                  ? "bg-white/5 text-blue-400" 
                  : "text-gray-500 hover:text-gray-300 hover:bg-white/[0.02]"
              )}
            >
              <item.icon className={cn("w-4 h-4", isActive ? "text-blue-500" : "text-gray-600 group-hover:text-gray-400")} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mt-auto border-t border-white/5 bg-black/20">
        <div className="flex items-center space-x-3 mb-4">
           <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-[10px] font-bold border border-white/5">A</div>
           <div className="min-w-0">
              <p className="text-[10px] font-bold text-white truncate leading-none mb-1">Administrator</p>
              <p className="text-[9px] text-blue-500 font-bold uppercase tracking-tighter">{role || 'Root'}</p>
           </div>
        </div>
        <Link href="/" className="flex items-center space-x-2 text-gray-500 hover:text-red-400 transition-colors text-[10px] font-bold">
          <LogOut className="w-3.5 h-3.5" />
          <span>Exit Panel</span>
        </Link>
      </div>
    </div>
  );
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <AdminSidebar />
      <main className="pl-52">
        <div className="p-8 max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
