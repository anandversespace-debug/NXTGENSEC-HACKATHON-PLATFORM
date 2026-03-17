'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, FileText, Code2, Globe, Shield, Layout, Navigation, Database, Lock } from 'lucide-react';
import Link from 'next/link';

const DocumentationPage = () => {
  const sections = [
    {
      title: 'Platform Overview',
      icon: Globe,
      content: 'The NxtGenSec Innovation Ecosystem is a decentralized developer hub built with Next.js 16, Express, and MongoDB. It serves as a comprehensive registry for digital innovations, community hackathons, and platform audits.',
    },
    {
      title: 'Tech Stack',
      icon: Code2,
      content: 'Built on a modern stack featuring Next.js 16 (App Router), Tailwind CSS, Framer Motion, and MongoDB for data persistence. The backend is an Express Node.js server with custom JWT-based authentication and Nodemailer for communication.',
    },
    {
      title: 'Navigation Topology',
      icon: Navigation,
      content: 'The platform is divided into four main layers: Global Presence (Landing/Auth), Community Layer (Projects/Hackathons/Blog), User Workspace (Dashboard/Profile/Settings), and Administrative Control.',
    },
  ];

  const routes = [
    { path: '/', description: 'Landing interface showcasing the core mission.' },
    { path: '/projects', description: 'Registry of platform innovations with search/filter.' },
    { path: '/hackathons', description: 'Sprint challenges and community events list.' },
    { path: '/blog', description: 'Technical audits, ecosystem news, and updates.' },
    { path: '/dashboard', description: 'Personal operations center for authenticated nodes.' },
    { path: '/admin', description: 'Global administrative dashboard for ecosystem review.' },
  ];

  const coreSystems = [
    { title: 'Authentication', icon: Lock, content: 'Stateless JWT-based system utilizing secure HTTP-only cookies and local storage tokens for API authorization.' },
    { title: 'Database Matrix', icon: Database, content: 'MongoDB Atlas implementation with Mongoose ODM for reliable, schema-based data persistence across all entry nodes.' },
    { title: 'Security Protocol', icon: Shield, content: 'Multi-layer protection including Helmet headers, Express rate limiting, and BcryptJS credential hashing.' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 bg-[#050505]">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <p className="text-label mb-2">System Manual</p>
          <h1 className="text-3xl font-black uppercase tracking-tighter italic mb-4 text-white uppercase italic tracking-tighter">Platform <span className="text-blue-600">Documentation</span></h1>
          <p className="text-gray-500 text-[11px] font-bold uppercase tracking-widest leading-loose max-w-2xl">
            Technical specifications, structural mapping, and operational logic for the NxtGenSec innovation ecosystem. Optimized for MongoDB v6.0+ and Node.js LTS.
          </p>
        </div>

        {/* Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {sections.map((section, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-[#0c0c0c] border border-white/5 p-8 rounded-2xl hover:border-blue-500/20 transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
                <section.icon className="w-16 h-16" />
              </div>
              <div className="w-10 h-10 bg-white/5 rounded-lg border border-white/10 flex items-center justify-center mb-6 group-hover:bg-blue-600/10 group-hover:border-blue-600/20 transition-all">
                <section.icon className="w-5 h-5 text-gray-500 group-hover:text-blue-500" />
              </div>
              <h3 className="text-[10px] font-black uppercase tracking-widest text-white mb-3 italic">{section.title}</h3>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter leading-snug">{section.content}</p>
            </motion.div>
          ))}
        </div>

        {/* Core Systems */}
        <div className="mb-16">
           <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-gray-600 mb-8 border-l-2 border-blue-600 pl-4 italic">Core Infrastructure Node</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {coreSystems.map((sys, idx) => (
                <div key={idx} className="bg-[#0c0c0c] border border-white/5 p-6 rounded-xl group hover:border-white/10 transition-colors">
                   <div className="flex items-center space-x-3 mb-4">
                      <sys.icon className="w-4 h-4 text-blue-500" />
                      <span className="text-[10px] font-black text-white uppercase tracking-widest">{sys.title}</span>
                   </div>
                   <p className="text-[10px] text-gray-600 font-bold uppercase tracking-tighter leading-relaxed">{sys.content}</p>
                </div>
              ))}
           </div>
        </div>

        {/* Detailed Route Map */}
        <div className="bg-[#0c0c0c] border border-white/5 rounded-2xl overflow-hidden mb-12 shadow-2xl">
          <div className="p-8 border-b border-white/5 bg-white/[0.01] flex items-center space-x-3">
            <Navigation className="w-4 h-4 text-blue-500" />
            <h2 className="text-[10px] font-black uppercase tracking-widest text-gray-300 italic">Operational Routes Matrix</h2>
          </div>
          <div className="divide-y divide-white/[0.03]">
            {routes.map((route, i) => (
              <div key={i} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors group">
                <div className="flex items-center space-x-4">
                  <div className="w-1 h-1 bg-blue-600 rounded-full group-hover:scale-150 transition-transform"></div>
                  <code className="text-blue-400 text-[10px] font-black uppercase tracking-tighter italic">{route.path}</code>
                </div>
                <p className="text-[10px] text-gray-600 font-black uppercase tracking-tighter text-right">{route.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Deployment Footer */}
        <div className="p-10 bg-blue-600/5 border border-blue-600/20 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-[0.03] rotate-12 transition-transform group-hover:rotate-0 duration-700">
             <Shield className="w-40 h-40" />
          </div>
          <div className="flex items-start space-x-6 relative z-10">
            <div className="p-3 bg-blue-600/10 rounded-xl border border-blue-600/20">
              <Shield className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <h4 className="text-xs font-black text-blue-500 uppercase tracking-widest mb-3 flex items-center space-x-3 italic">
                <span>Production Security Initialization</span>
                <span className="text-[9px] bg-blue-600 text-white px-2 py-0.5 rounded leading-none not-italic">V6.0+ VERIFIED</span>
              </h4>
              <p className="text-[11px] text-gray-500 font-bold uppercase tracking-tighter leading-snug italic max-w-xl">
                The platform is architected for massive scale using MongoDB's horizontal shard capabilities and stateless JWT authorization. Custom session management ensures sub-100ms response times globally.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentationPage;
