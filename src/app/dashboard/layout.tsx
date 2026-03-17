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
  BarChart2
} from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { cn } from '@/lib/utils';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';

const DashboardSidebar = () => {
  const pathname = usePathname();
  const role = useAuthStore((state) => state.role);

  // Common routes every authenticated user gets inside dashboard
  const commonItems = [
    { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Profile', href: '/dashboard/profile', icon: User },
    { name: 'Notifications', href: '/dashboard/notifications', icon: Bell },
  ];

  // Developer specific routes
  const devItems = [
    { name: 'My Projects', href: '/dashboard/projects', icon: FolderLock },
    { name: 'Joined Hackathons', href: '/dashboard/hackathons', icon: Trophy },
    { name: 'My Submissions', href: '/dashboard/submissions', icon: CheckSquare },
    { name: 'Leaderboard', href: '/dashboard/leaderboard', icon: BarChart2 },
  ];

  // Judge specific routes
  const judgeItems = [
    { name: 'Assigned Judging', href: '/dashboard/judging', icon: Gavel },
    { name: 'Review Submissions', href: '/dashboard/submissions', icon: CheckSquare },
    { name: 'Leaderboard', href: '/dashboard/leaderboard', icon: BarChart2 },
  ];

  let roleItems: { name: string; href: string; icon: any }[] = [];
  if (role === 'developer' || role === 'admin') {
    roleItems = devItems;
  } else if (role === 'judge') {
    roleItems = judgeItems;
  }

  const menuItems = [...commonItems, ...roleItems];

  // We should deduplicate just in case (e.g. admin gets some duplicate paths in theory, though we handled it)
  const uniqueItems = menuItems.filter((item, index, self) =>
    index === self.findIndex((t) => t.href === item.href)
  );

  return (
    <div className="w-56 h-screen bg-[#0c0c0c] border-r border-white/5 flex flex-col fixed left-0 top-0 z-40 pt-20">
      <nav className="flex-grow px-4 space-y-1 overflow-y-auto custom-scrollbar mt-4">
        <p className="text-[9px] font-bold uppercase text-gray-500 tracking-wider mb-4 ml-3">Dashboard Menu</p>
        {uniqueItems.map((item) => {
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
      </nav>

      <div className="p-5 mt-auto border-t border-white/5 bg-[#050505]/50">
        <Link href="/" className="flex items-center space-x-2 text-gray-500 hover:text-red-400 transition-colors text-xs font-bold uppercase tracking-widest">
          <LogOut className="w-4 h-4" />
          <span>Platform Exit</span>
        </Link>
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
        <main className="flex-1 ml-56 pt-24 pb-12 px-8">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
