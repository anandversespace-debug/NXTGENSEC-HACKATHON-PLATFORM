'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, FileText, Code2, Globe, Shield, Layout, Navigation, Database, Lock, Cloud, Mail, Users, FileStack } from 'lucide-react';

const DocumentationPage = () => {
  const sections = [
    {
      title: 'Platform Overview',
      icon: Globe,
      content: 'The NxtGenSec Innovation Ecosystem is a decentralized developer hub built with Next.js 16, Express, and MongoDB. It serves as a comprehensive registry for digital innovations, community hackathons, and platform audits.',
    },
    {
      title: 'Frontend Stack',
      icon: Layout,
      content: 'Engineered with Next.js 16 (App Router), React 19, and Tailwind CSS v4. State management is handled by Zustand, with Framer Motion powering dynamic user interfaces.',
    },
    {
      title: 'Backend Logic',
      icon: Terminal,
      content: 'A robust Node.js/Express server forms the backbone, managing six primary data models (Users, Projects, Hackathons, Blogs, Registrations, Comments) deployed on a REST architecture.',
    },
  ];

  const routes = [
    { path: '/login & /signup', description: 'User identity verification and secure ecosystem onboarding.' },
    { path: '/projects & /projects/[id]', description: 'Decentralized repository and detailed analysis for digital innovations.' },
    { path: '/hackathons & /hackathons/[id]', description: 'Registry of active sprint challenges, rules, and live registration forms.' },
    { path: '/blog', description: 'Technical audits, ecosystem news, and comprehensive platform updates.' },
    { path: '/dashboard', description: 'Personal operations center. Tracks active projects and hackathon participation metrics.' },
    { path: '/profile', description: 'Primary identity management interface showcasing skills and platform contributions.' },
    { path: '/admin', description: 'Global administrative dashboard for comprehensive ecosystem review, metric tracking, and user governance.' },
    { path: '/admin/judging', description: 'Dedicated evaluating interface for authorized individuals assessing challenge submissions.' },
  ];

  const coreSystems = [
    { title: 'Authentication', icon: Lock, content: 'Stateless JWT-based system utilizing secure cookies for global API authorization and route guarding.' },
    { title: 'Database Matrix', icon: Database, content: 'MongoDB Atlas implementation with Mongoose ODM for reliable, schema-based data persistence across all entry nodes.' },
    { title: 'Storage Node', icon: Cloud, content: 'Integrated Cloudinary blob storage via Multer, ensuring rapid delivery and secure persistence for user avatars and project media.' },
    { title: 'Signal Relay', icon: Mail, content: 'Nodemailer communications system with sophisticated SMTP fallback mechanics, ensuring 100% notification delivery accuracy.' },
    { title: 'Access Control', icon: Users, content: 'Multi-tiered role-based access logic segregating Admin, Developer, Judge, and Viewer permissions within the ecosystem.' },
    { title: 'Security Protocol', icon: Shield, content: 'Multi-layer protection natively integrating Helmet HTTP headers, strict Express rate limiting, dynamic CORS policies, and credential hashing.' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 bg-[#050505]">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <p className="text-label mb-2">System Manual</p>
          <h1 className="text-3xl font-black uppercase tracking-tighter italic mb-4 text-white">Platform <span className="text-blue-600">Documentation</span></h1>
          <p className="text-gray-500 text-[11px] font-bold uppercase tracking-widest leading-loose max-w-2xl">
            Comprehensive technical specifications, structural mapping, and operational logic for the NxtGenSec innovation ecosystem. Read-only manual for active nodes.
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

        {/* Core Systems Integration */}
        <div className="mb-16">
           <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-gray-600 mb-8 border-l-2 border-blue-600 pl-4 italic">Core Infrastructure Node</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                <div className="flex items-center space-x-4 shrink-0">
                  <div className="w-1 h-1 bg-blue-600 rounded-full group-hover:scale-150 transition-transform"></div>
                  <code className="text-blue-400 text-[10px] font-black uppercase tracking-tighter italic whitespace-nowrap">{route.path}</code>
                </div>
                <p className="text-[10px] text-gray-600 font-black uppercase tracking-tighter text-right leading-relaxed">{route.description}</p>
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
                The platform is architected for massive scale using MongoDB's horizontal shard capabilities, stateless JWT authorization, Cloudinary CDN integrations, and Next.js static asset optimizations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentationPage;
