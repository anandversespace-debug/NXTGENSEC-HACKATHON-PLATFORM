'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, FileText, Code2, Globe, Shield, Layout, Navigation } from 'lucide-react';
import Link from 'next/link';

const DocumentationPage = () => {
  const sections = [
    {
      title: 'Platform Overview',
      icon: Globe,
      content: 'The NxtGenSec Innovation Ecosystem is a decentralized developer hub built with Next.js 16, Express, and Supabase. It serves as a comprehensive registry for digital innovations, community hackathons, and platform audits.',
    },
    {
      title: 'Tech Stack',
      icon: Code2,
      content: 'Built on a modern stack featuring Next.js 16 (App Router), Tailwind CSS, Framer Motion, and Supabase for real-time auth and data. The backend is an Express Node.js server with Cloudinary for file storage.',
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

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 bg-[#050505]">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <p className="text-label mb-2">System Manual</p>
          <h1 className="text-3xl font-black uppercase tracking-tighter italic mb-4">Platform Documentation</h1>
          <p className="text-gray-500 text-[11px] font-bold uppercase tracking-widest leading-loose max-w-2xl">
            Technical specifications, structural mapping, and operational logic for the NxtGenSec innovation ecosystem.
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
              className="bg-[#0c0c0c] border border-white/5 p-6 rounded-lg hover:border-white/10 transition-all group"
            >
              <div className="w-10 h-10 bg-white/5 rounded border border-white/5 flex items-center justify-center mb-6 group-hover:bg-blue-600/10 group-hover:border-blue-600/20 transition-all">
                <section.icon className="w-5 h-5 text-gray-400 group-hover:text-blue-500" />
              </div>
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-white mb-3">{section.title}</h3>
              <p className="text-[10px] text-gray-500 font-medium leading-relaxed">{section.content}</p>
            </motion.div>
          ))}
        </div>

        {/* Detailed Route Map */}
        <div className="bg-[#0c0c0c] border border-white/5 rounded-xl overflow-hidden mb-12">
          <div className="p-6 border-b border-white/5 bg-white/[0.01] flex items-center space-x-3">
            <Navigation className="w-4 h-4 text-blue-500" />
            <h2 className="text-[10px] font-black uppercase tracking-widest text-gray-300">Operational Routes Matrix</h2>
          </div>
          <div className="divide-y divide-white/5">
            {routes.map((route, i) => (
              <div key={i} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-1 h-1 bg-blue-600 rounded-full"></div>
                  <code className="text-blue-400 text-[10px] font-bold uppercase tracking-tighter">{route.path}</code>
                </div>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter text-right">{route.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Deployment Footer */}
        <div className="p-8 bg-blue-600/5 border border-blue-600/20 rounded-xl">
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-blue-600/10 rounded">
              <Shield className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <h4 className="text-[11px] font-bold text-blue-400 uppercase tracking-widest mb-2 flex items-center space-x-2">
                <span>Production Security Initialization</span>
                <span className="text-[8px] bg-blue-600 text-white px-1.5 py-0.5 rounded leading-none">Verified</span>
              </h4>
              <p className="text-[10px] text-blue-300/60 font-medium leading-relaxed">
                Platform is built for scale with Vercel serverless integration. Security headers, rate limiting, and decentralized auth are natively supported.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentationPage;
