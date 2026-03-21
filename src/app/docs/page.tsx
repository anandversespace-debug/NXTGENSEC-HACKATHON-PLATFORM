'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Terminal, 
  Globe, 
  Shield, 
  Layout, 
  Navigation, 
  Database, 
  Lock, 
  Cloud, 
  Mail, 
  Users, 
  ChevronRight,
  Zap,
  TrendingUp,
  Search,
  History,
  Award,
  CirclePlay
} from 'lucide-react';

const DocumentationPage = () => {
  const sections = [
    {
      title: 'Architectural Vision',
      icon: Globe,
      content: 'NxtGenSec operates on a Hybrid Stateful model, combining the velocity of Next.js 16 Edge delivery with the persistent power of a Node.js socket cluster.',
    },
    {
      title: 'Real-Time Signal Sync',
      icon: Zap,
      content: 'Integrated Socket.io engine via SignalListener. Get instant achievement alerts and project verification status without page refreshes.',
    },
    {
      title: 'Enterprise Audit Trail',
      icon: History,
      content: 'Every administrative action is serialized and logged. High-performance indexing allows for millisecond-latency security reviews.',
    },
  ];

  const dashboards = [
    { 
      title: 'Administrator Overview', 
      icon: Layout, 
      description: 'L3 command center featuring Recharts telemetry, project audit pipelines, and global user identity management.' 
    },
    { 
      title: 'Organizer Terminal', 
      icon: Terminal, 
      description: 'Role-specific interface with elevated clearance for event growth tracking and submission screening.' 
    },
    { 
      title: 'Developer Workspace', 
      icon: CirclePlay, 
      description: 'Unified operational hub for innovation registries, tech-stack management, and reputation tracking.' 
    },
  ];

  const coreSystems = [
    { title: 'Search Intelligence', icon: Search, content: 'Unified crawler indexing members, projects, and events into a search-first experience.' },
    { title: 'Reputation Engine', icon: Award, content: 'Automated achievement signals granting verified contributors instant reputation nodes.' },
    { title: 'Telemetry Hub', icon: TrendingUp, content: 'Data-driven visualization of network growth and identity sector distribution.' },
    { title: 'Cloud Infrastructure', icon: Cloud, content: 'Multer-streamed binary storage optimized via Cloudinary global CDN.' },
    { title: 'Stateless Auth', icon: Lock, content: 'HttpOnly secure sessions with multi-level RBAC (Role Based Access Control).' },
    { title: 'Security Protocol', icon: Shield, content: 'Defense-in-depth architecture with network isolation and automated audit logging.' },
  ];

  const routes = [
    { path: '/admin/dashboard', description: 'System-wide telemetry and L3 operational control.' },
    { path: '/admin/projects', description: 'Searchable 3-state audit pipeline (Pending-Auditing-Verified).' },
    { path: '/organizer', description: 'L2 terminal for event orchestration and metrics.' },
    { path: '/community', description: 'Searchable developer registry with identity sector cards.' },
    { path: '/search', description: 'Global multi-resource discovery engine.' },
    { path: '/dashboard/submissions', description: 'Real-time submission tracking and status monitoring.' },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 bg-[#050505] overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10 text-left">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center space-x-3 mb-6">
             <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
             <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 italic">System v2.1 Documentation</p>
          </div>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic mb-8 text-white">Platform <span className="text-blue-600">Intelligence</span></h1>
          <p className="text-gray-500 text-xs md:text-sm font-bold uppercase tracking-widest leading-relaxed max-w-3xl text-left">
            Welcome to the NxtGenSec Knowledge Base. This node documents the technical orchestration, security protocols, and operational workflows of the platform.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 text-left">
          {sections.map((section, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-[#0c0c0c] border border-white/5 p-8 rounded-3xl hover:border-blue-500/20 transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-6 opacity-[0.02] group-hover:opacity-[0.1] transition-opacity">
                <section.icon className="w-20 h-20" />
              </div>
              <div className="w-12 h-12 bg-white/5 rounded-xl border border-white/5 flex items-center justify-center mb-8 group-hover:bg-blue-600/10 group-hover:border-blue-500/20 transition-all">
                <section.icon className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-[11px] font-black uppercase tracking-widest text-white mb-4 italic leading-none">{section.title}</h3>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-relaxed italic">{section.content}</p>
            </motion.div>
          ))}
        </div>

        {/* Operational Nodes */}
        <div className="mb-20 text-left">
           <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-700 mb-10 border-l-2 border-blue-600 pl-6 italic leading-none">Operational Hubs</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {dashboards.map((dash, idx) => (
                <div key={idx} className="bg-[#0c0c0c] border border-white/5 p-8 rounded-3xl group hover:border-white/10 transition-all text-left">
                   <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-blue-600/10 transition-all border border-white/5">
                      <dash.icon className="w-5 h-5 text-gray-400 group-hover:text-blue-500" />
                   </div>
                   <h4 className="text-[10px] font-black text-white uppercase tracking-widest italic mb-4">{dash.title}</h4>
                   <p className="text-[9px] text-gray-600 font-bold uppercase tracking-widest leading-relaxed italic line-clamp-2">{dash.description}</p>
                </div>
              ))}
           </div>
        </div>

        {/* Core Architecture Systems */}
        <div className="mb-20 text-left">
           <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-700 mb-10 border-l-2 border-blue-600 pl-6 italic leading-none">System Architecture</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coreSystems.map((sys, idx) => (
                <div key={idx} className="bg-[#0c0c0c] border border-white/5 p-8 rounded-2xl group hover:border-white/10 transition-all text-left">
                   <div className="flex items-center space-x-4 mb-6">
                      <sys.icon className="w-4 h-4 text-blue-500" />
                      <span className="text-[10px] font-black text-white uppercase tracking-widest italic leading-none">{sys.title}</span>
                   </div>
                   <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest leading-relaxed italic">{sys.content}</p>
                </div>
              ))}
           </div>
        </div>

        {/* Navigation Topology */}
        <div className="bg-[#0c0c0c] border border-white/5 rounded-3xl overflow-hidden mb-20 text-left">
          <div className="p-8 border-b border-white/5 bg-white/[0.01] flex items-center space-x-4">
            <Navigation className="w-5 h-5 text-blue-500" />
            <h2 className="text-[11px] font-black uppercase tracking-widest text-gray-300 italic leading-none">Navigation Topology</h2>
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

        {/* Security Footer */}
        <div className="p-12 bg-[#0c0c0c] border border-white/5 rounded-3xl relative overflow-hidden group text-left">
          <div className="absolute top-0 right-0 p-10 opacity-[0.03] transition-transform group-hover:rotate-6 duration-700">
             <Shield className="w-40 h-40 text-blue-500" />
          </div>
          <div className="flex items-start space-x-8 relative z-10">
            <div className="w-16 h-16 bg-blue-600/10 rounded-2xl border border-blue-600/20 flex items-center justify-center shrink-0">
              <Shield className="w-8 h-8 text-blue-500" />
            </div>
            <div>
              <h4 className="text-sm font-black text-blue-500 uppercase tracking-widest mb-4 flex items-center space-x-4 italic leading-none">
                <span>Security Integrity Protocol</span>
                <span className="text-[9px] bg-blue-600 text-white px-3 py-1 rounded-full leading-none not-italic font-bold">LATEST</span>
              </h4>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-widest leading-relaxed italic max-w-2xl text-left">
                NxtGenSec utilizes mandatory stateless validation and user-specific signal isolation. Every node deployment is monitored via automated audit logging to ensure ecosystem integrity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentationPage;
