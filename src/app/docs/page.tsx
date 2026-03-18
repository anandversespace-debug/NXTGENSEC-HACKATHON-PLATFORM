'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, FileText, Code2, Globe, Shield, Layout, Navigation, Database, Lock, Cloud, Mail, Users, FileStack, ChevronRight } from 'lucide-react';

const DocumentationPage = () => {
  const sections = [
    {
      title: 'Platform Overview',
      icon: Globe,
      content: 'The NxtGenSec Community Platform is a hub for developers built with modern technology. It serves as a place to showcase projects, join hackathons, and collaborate with others.',
    },
    {
      title: 'Frontend Technology',
      icon: Layout,
      content: 'Built using Next.js and React for a fast and responsive user experience. We use Tailwind CSS for our custom design system and Framer Motion for smooth animations.',
    },
    {
      title: 'Backend System',
      icon: Terminal,
      content: 'A powerful Node.js and Express server manages everything from user accounts to project reviews, ensuring all data is secure and accessible.',
    },
  ];

  const routes = [
    { path: '/login & /signup', description: 'User account creation and secure login pages.' },
    { path: '/projects & /projects/[id]', description: 'Full list of community projects and detailed information for each.' },
    { path: '/hackathons & /hackathons/[id]', description: 'List of all events, including rules, schedules, and registration.' },
    { path: '/blog', description: 'Company news, technology updates, and community articles.' },
    { path: '/dashboard', description: 'Your personal dashboard. Track your projects and events in one place.' },
    { path: '/profile', description: 'Your public profile page where you can show off your skills.' },
    { path: '/admin', description: 'Full control panel for administrators to manage users and content.' },
    { path: '/search', description: 'Global search to find anything on the platform easily.' },
  ];

  const coreSystems = [
    { title: 'Security', icon: Lock, content: 'Secure login system using modern encryption to keep your account safe.' },
    { title: 'Database', icon: Database, content: 'Advanced database technology to ensure your data is always available.' },
    { title: 'Storage', icon: Cloud, content: 'Integrated cloud storage for fast and reliable file and image hosting.' },
    { title: 'Email Service', icon: Mail, content: 'Reliable notification system to keep you updated on all platform activity.' },
    { title: 'Permissions', icon: Users, content: 'Role-based access to ensure everyone has the right level of control.' },
    { title: 'Protection', icon: Shield, content: 'Multiple layers of security to protect against common web threats.' },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 bg-[#050505] overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10 text-left">
        {/* Header */}
        <div className="mb-16">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 mb-4 italic">User Guide</p>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic mb-8 text-white">Platform <span className="text-blue-600">Documentation</span></h1>
          <p className="text-gray-500 text-xs md:text-sm font-bold uppercase tracking-widest leading-relaxed max-w-3xl text-left">
            Everything you need to know about how the NxtGenSec platform works. From early setup to advanced features, we keep things simple and easy to understand.
          </p>
        </div>

        {/* Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 text-left">
          {sections.map((section, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: section.title === 'Platform Overview' ? 0.1 : section.title === 'Frontend Technology' ? 0.2 : 0.3 }}
              className="bg-[#0c0c0c] border border-white/5 p-8 rounded-3xl hover:border-blue-500/20 transition-all group relative overflow-hidden shadow-2xl"
            >
              <div className="absolute top-0 right-0 p-6 opacity-[0.02] group-hover:opacity-[0.1] transition-opacity">
                <section.icon className="w-20 h-20" />
              </div>
              <div className="w-12 h-12 bg-[#050505] rounded-xl border border-white/5 flex items-center justify-center mb-8 group-hover:bg-blue-600/10 group-hover:border-blue-500/20 transition-all shadow-inner">
                <section.icon className="w-6 h-6 text-gray-700 group-hover:text-blue-500" />
              </div>
              <h3 className="text-[11px] font-black uppercase tracking-widest text-white mb-4 italic leading-none">{section.title}</h3>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-relaxed italic">{section.content}</p>
            </motion.div>
          ))}
        </div>

        {/* Core Systems Integration */}
        <div className="mb-20 text-left">
           <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-700 mb-10 border-l-2 border-blue-600 pl-6 italic leading-none">Core Platform Features</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coreSystems.map((sys, idx) => (
                <div key={idx} className="bg-[#0c0c0c] border border-white/5 p-8 rounded-2xl group hover:border-white/10 transition-all shadow-2xl text-left">
                   <div className="flex items-center space-x-4 mb-6">
                      <div className="w-8 h-8 rounded-lg bg-black/40 flex items-center justify-center border border-white/5 group-hover:border-blue-500/20 transition-all">
                        <sys.icon className="w-4 h-4 text-blue-500" />
                      </div>
                      <span className="text-[10px] font-black text-white uppercase tracking-widest italic">{sys.title}</span>
                   </div>
                   <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest leading-relaxed italic">{sys.content}</p>
                </div>
              ))}
           </div>
        </div>

        {/* Detailed Route Map */}
        <div className="bg-[#0c0c0c] border border-white/5 rounded-3xl overflow-hidden mb-20 shadow-2xl text-left">
          <div className="p-8 border-b border-white/5 bg-white/[0.01] flex items-center space-x-4">
            <Navigation className="w-5 h-5 text-blue-500" />
            <h2 className="text-[11px] font-black uppercase tracking-widest text-gray-300 italic leading-none">Main Platform Pages</h2>
          </div>
          <div className="divide-y divide-white/[0.03]">
            {routes.map((route, i) => (
              <div key={i} className="p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-white/[0.02] transition-colors group">
                <div className="flex items-center space-x-6 shrink-0">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full group-hover:scale-150 transition-transform"></div>
                  <code className="text-blue-500 text-[11px] font-black uppercase tracking-tighter italic whitespace-nowrap">{route.path}</code>
                </div>
                <p className="text-[10px] text-gray-600 font-black uppercase tracking-widest text-left md:text-right leading-relaxed italic">{route.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Deployment Footer */}
        <div className="p-12 bg-blue-600/5 border border-blue-600/20 rounded-3xl relative overflow-hidden group shadow-2xl text-left">
          <div className="absolute top-0 right-0 p-10 opacity-[0.03] rotate-12 transition-transform group-hover:rotate-0 duration-700">
             <Shield className="w-52 h-52 text-blue-500" />
          </div>
          <div className="flex items-start space-x-8 relative z-10">
            <div className="w-16 h-16 bg-blue-600/10 rounded-2xl border border-blue-600/20 flex items-center justify-center shrink-0">
              <Shield className="w-8 h-8 text-blue-500" />
            </div>
            <div>
              <h4 className="text-sm font-black text-blue-500 uppercase tracking-widest mb-4 flex items-center space-x-4 italic leading-none">
                <span>Platform Security</span>
                <span className="text-[9px] bg-blue-600 text-white px-3 py-1 rounded-full leading-none not-italic font-bold">LATEST VERSION</span>
              </h4>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-widest leading-relaxed italic max-w-2xl text-left">
                The platform is built for the future using advanced database technology, a secure login system, and optimized for fast loading times. We ensure that your experience is always safe, fast, and reliable.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentationPage;
