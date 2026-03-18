import React from 'react';
import Link from 'next/link';
import { Shield, Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#050505] border-t border-white/5 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-12">
          <div className="max-w-xs">
            <Link href="/" className="flex items-center space-x-2 mb-4 group">
              <div className="w-6 h-6 bg-white/[0.03] border border-white/10 rounded flex items-center justify-center">
                <Shield className="text-gray-400 w-3.5 h-3.5" />
              </div>
              <span className="text-sm font-bold tracking-tight uppercase italic">NxtGen<span className="text-gray-500">Sec</span></span>
            </Link>
            <p className="text-gray-600 text-[11px] font-medium leading-relaxed uppercase tracking-tighter">
              A platform for developers to showcase projects, compete in hackathons, and grow together.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-16">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-700 mb-4">Explore</p>
              <ul className="space-y-2 text-[10px] font-bold text-gray-500 uppercase tracking-tight">
                <li><Link href="/projects" className="hover:text-blue-500 transition-colors">Projects</Link></li>
                <li><Link href="/hackathons" className="hover:text-blue-500 transition-colors">Hackathons</Link></li>
                <li><Link href="/community" className="hover:text-blue-500 transition-colors">Community</Link></li>
                <li><Link href="/blog" className="hover:text-blue-500 transition-colors">Blog</Link></li>
              </ul>
            </div>

            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-700 mb-4">Resources</p>
              <ul className="space-y-2 text-[10px] font-bold text-gray-500 uppercase tracking-tight">
                <li><Link href="/docs" className="hover:text-blue-500 transition-colors">Documentation</Link></li>
                <li><Link href="/about" className="hover:text-blue-500 transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-blue-500 transition-colors">Contact</Link></li>
                <li><Link href="/terms" className="hover:text-blue-500 transition-colors">Terms</Link></li>
              </ul>
            </div>

            <div className="col-span-2 md:col-span-1">
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-700 mb-4">Follow Us</p>
              <div className="flex items-center space-x-4">
                 <a href="#" className="text-gray-600 hover:text-white transition-colors"><Github className="w-4 h-4" /></a>
                 <a href="#" className="text-gray-600 hover:text-white transition-colors"><Twitter className="w-4 h-4" /></a>
                 <a href="#" className="text-gray-600 hover:text-white transition-colors"><Linkedin className="w-4 h-4" /></a>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/[0.02] flex flex-col md:flex-row items-center justify-between text-[9px] font-bold uppercase tracking-widest text-gray-700">
          <p>© 2026 NxtGenSec. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
             <span className="flex items-center space-x-1.5"><div className="w-1 h-1 bg-emerald-500/50 rounded-full animate-pulse"></div><span>All Systems Online</span></span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
