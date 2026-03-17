'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Code, Users, Trophy, Shield } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative pt-40 pb-20 overflow-hidden border-b border-white/[0.02]">
      {/* Background Grid - Minimalist */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-blue-600/[0.03] blur-[120px] rounded-full -z-10" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <div className="flex items-center space-x-2 px-3 py-1 bg-white/[0.03] border border-white/5 rounded-full mb-8">
              <Shield className="w-3 h-3 text-blue-500" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
                Ecosystem Node v1.0
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight uppercase italic leading-[1.1]">
              Secure the <span className="text-blue-600">Future</span><br />
              of Development
            </h1>
            
            <p className="max-w-xl mx-auto text-sm text-gray-500 mb-10 font-medium leading-relaxed uppercase tracking-tighter">
              Explore elite project nodes, participate in global security sprints, and integrate with the next generation of development pioneers.
            </p>

            <div className="flex items-center justify-center space-x-4">
              <button className="btn-primary">
                Init Deployment
              </button>
              <button className="btn-secondary">
                View Manual
              </button>
            </div>
          </motion.div>

          {/* Minimal Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-24 w-full"
          >
            {[
              { label: 'Active Projects', value: '542', icon: Code },
              { label: 'Global Events', value: '18', icon: Trophy },
              { label: 'Network Nodes', value: '2.4k', icon: Users },
              { label: 'Uptime Status', value: '99.9%', icon: Shield },
            ].map((stat, idx) => (
              <div key={idx} className="bg-[#080808] border border-white/5 p-6 rounded group hover:bg-white/[0.01] transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <stat.icon className="w-3.5 h-3.5 text-gray-700 group-hover:text-blue-600 transition-colors" />
                  <span className="text-[10px] font-bold text-gray-800 uppercase tracking-widest leading-none">0{idx + 1}</span>
                </div>
                <p className="text-2xl font-black text-gray-200 mb-0.5">{stat.value}</p>
                <p className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
