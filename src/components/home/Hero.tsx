'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Rocket, Code, Users, Trophy, Shield } from 'lucide-react';
import Link from 'next/link';

const Hero = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProjects: 0,
    activeHackathons: 0,
    uptime: '99.9%'
  });

  useEffect(() => {
    const fetchGlobalStats = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const res = await fetch(`${baseUrl}/users/public-stats`);
        if (res.ok) {
          const data = await res.json();
          setStats({
            totalUsers: data.totalUsers || 0,
            totalProjects: data.totalProjects || 0,
            activeHackathons: data.activeHackathons || 0,
            uptime: '99.9%' // Static for now as per design
          });
        }
      } catch (err) {
        console.error('Failed to fetch global telemetry:', err);
      }
    };
    fetchGlobalStats();
  }, []);

  const statItems = [
    { label: 'Projects', value: stats.totalProjects > 0 ? stats.totalProjects.toString() : '...', icon: Code },
    { label: 'Hackathons', value: stats.activeHackathons > 0 ? stats.activeHackathons.toString() : '...', icon: Trophy },
    { label: 'Members', value: stats.totalUsers > 0 ? (stats.totalUsers > 1000 ? (stats.totalUsers / 1000).toFixed(1) + 'k' : stats.totalUsers.toString()) : '...', icon: Users },
    { label: 'Uptime', value: stats.uptime, icon: Shield },
  ];

  return (
    <section className="relative pt-40 pb-20 overflow-hidden border-b border-white/[0.02]">
      {/* Background Grid */}
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
            <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight uppercase italic leading-[1.1] text-white">
              Build the <span className="text-blue-600">Future</span><br />
              of Innovation
            </h1>
            
            <p className="max-w-xl mx-auto text-sm text-gray-500 mb-10 font-medium leading-relaxed uppercase tracking-tighter">
              Discover amazing projects, compete in hackathons, and connect with developers building the next big thing.
            </p>

            <div className="flex items-center justify-center space-x-4">
              <Link href="/projects" className="btn-primary">
                Explore Projects
              </Link>
              <Link href="/docs" className="btn-secondary">
                Read the Docs
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-24 w-full"
          >
            {statItems.map((stat, idx) => (
              <div key={idx} className="bg-[#080808] border border-white/5 p-6 rounded group hover:bg-white/[0.01] transition-colors relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-blue-600/10 group-hover:bg-blue-600/30 transition-colors"></div>
                <div className="flex items-center justify-between mb-4">
                  <stat.icon className="w-3.5 h-3.5 text-gray-700 group-hover:text-blue-600 transition-colors" />
                  <span className="text-[10px] font-bold text-gray-800 uppercase tracking-widest leading-none">0{idx + 1}</span>
                </div>
                <p className="text-2xl font-black text-gray-200 mb-0.5 italic">{stat.value}</p>
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

