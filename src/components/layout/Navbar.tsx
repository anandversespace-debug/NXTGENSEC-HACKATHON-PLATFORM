'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Shield, Search, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/useAuthStore';
import { supabase } from '@/lib/supabase';

const navItems = [
  { name: 'Projects', href: '/projects' },
  { name: 'Hackathons', href: '/hackathons' },
  { name: 'Developer Hub', href: '/hub' },
  { name: 'Bulletin', href: '/blog' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, role, isAuthenticated, logout } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    logout();
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
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center transition-transform duration-300 group-hover:scale-95 shadow-lg shadow-blue-900/20">
            <Shield className="text-white w-4 h-4" />
          </div>
          <span className="text-sm font-bold tracking-tight uppercase italic">
            NxtGen<span className="text-blue-500">Sec</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-10">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="nav-link"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-6">
          <button className="p-1.5 text-gray-500 hover:text-white transition-colors">
            <Search className="w-4 h-4" />
          </button>
          
          {isAuthenticated ? (
            <div className="flex items-center space-x-6">
              {(role === 'admin' || role === 'judge') && (
                <Link href="/admin" className="text-[10px] font-bold uppercase text-blue-500 hover:text-blue-400 tracking-[0.2em] transition-colors border-r border-white/10 pr-6">
                  Terminal
                </Link>
              )}
              <Link href="/dashboard" className="flex items-center space-x-2 groups text-xs font-bold text-gray-400 hover:text-white transition-colors">
                <div className="w-6 h-6 rounded bg-white/5 border border-white/10 flex items-center justify-center text-[9px] font-bold text-gray-500">
                  {user?.name?.[0] || 'U'}
                </div>
                <span>Dashboard</span>
              </Link>
              <button 
                onClick={handleLogout}
                className="p-1.5 text-gray-600 hover:text-red-400 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link href="/login" className="btn-primary text-[10px] px-5 py-2">
              Join Portal
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
            {!isAuthenticated && (
              <Link
                href="/login"
                className="btn-primary text-center py-3 mt-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Join Portal
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
