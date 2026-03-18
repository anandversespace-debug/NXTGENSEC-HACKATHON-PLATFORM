'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Shield, Search, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/useAuthStore';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Projects', href: '/projects' },
  { name: 'Hackathons', href: '/hackathons' },
  { name: 'Community', href: '/community' },
  { name: 'Blog', href: '/blog' },
  { name: 'Leaderboard', href: '/leaderboard' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const user = useAuthStore((state) => state.user);
  const role = useAuthStore((state) => state.role);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    window.location.href = '/login';
  };

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-3',
        isScrolled ? 'bg-black/90 backdrop-blur-md border-b border-white/5 py-2' : 'bg-transparent'
      )}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 group shrink-0">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center transition-transform duration-300 group-hover:scale-95 shadow-lg shadow-blue-900/20">
            <Shield className="text-white w-4 h-4" />
          </div>
          <span className="text-sm font-bold tracking-tight uppercase italic">
            NxtGen<span className="text-blue-500">Sec</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8 lg:space-x-12">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="nav-link text-[11px] font-bold uppercase text-gray-400 hover:text-white transition-colors tracking-widest px-1 py-1"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4 lg:space-x-6 shrink-0">
          <Link href="/search" className="p-1.5 text-gray-500 hover:text-white transition-colors">
            <Search className="w-4 h-4" />
          </Link>
          
          {isAuthenticated ? (
            <div className="flex items-center space-x-4 lg:space-x-6">
              {(role === 'admin' || role === 'judge') && (
                <Link href="/admin" className="text-[10px] font-bold uppercase text-blue-500 hover:text-blue-400 tracking-[0.2em] transition-colors border-r border-white/10 pr-4 lg:pr-6">
                  Admin
                </Link>
              )}
              <Link href="/dashboard" className="flex items-center space-x-2 text-xs font-bold text-gray-400 hover:text-white transition-colors">
                <div className="w-6 h-6 rounded bg-white/5 border border-white/10 flex items-center justify-center text-[9px] font-bold text-gray-500">
                  {user?.name?.[0] || 'U'}
                </div>
                <span className="hidden lg:inline">Dashboard</span>
              </Link>
              <button 
                onClick={handleLogout}
                className="p-1.5 text-gray-600 hover:text-red-400 transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link href="/login" className="btn-primary text-[10px] px-5 py-2">
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-1 text-gray-400"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" /> }
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 bg-[#080808] border-b border-white/5 p-6 flex flex-col space-y-4 md:hidden"
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-bold uppercase text-gray-400 hover:text-white transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {isAuthenticated ? (
              <Link
                href="/dashboard"
                className="text-sm font-bold uppercase text-blue-500 hover:text-blue-400 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href="/login"
                className="btn-primary text-center py-3 mt-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign In
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
