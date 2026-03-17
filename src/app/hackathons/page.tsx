'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Trophy, ChevronRight, Clock, Shield } from 'lucide-react';
import { Hackathon } from '@/types';
import Link from 'next/link';

const HackathonsPage = () => {
  const hackathons: Hackathon[] = [
    {
      id: 'h1',
      title: 'CyberShield Global 2024',
      description: 'Join elite developers to build the next generation of firewall technology. Focus on real-time threat detection and automated response.',
      start_date: '2024-04-15',
      end_date: '2024-04-17',
      prize_pool: '10,000 CP',
      registration_link: '/register/h1'
    },
    {
      id: 'h2',
      title: 'DeFi Security Sprint',
      description: 'Audit and secure decentralized finance protocols. Identify vulnerabilities in smart contracts and develop mitigation strategies.',
      start_date: '2024-05-20',
      end_date: '2024-05-22',
      prize_pool: '25,000 CP',
      registration_link: '/register/h2'
    },
    {
      id: 'h3',
      title: 'AI Trust Hackathon',
      description: 'Building transparent and fair AI systems. Explore methods for explainability and bias detection in large language models.',
      start_date: '2024-06-10',
      end_date: '2024-06-12',
      prize_pool: '15,000 CP',
      registration_link: '/register/h3'
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 bg-[#050505]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <p className="text-label mb-2">Operational Events</p>
          <h1 className="text-2xl font-bold uppercase tracking-tight italic mb-3">Global Hackathons</h1>
          <p className="text-gray-500 text-[11px] font-bold uppercase tracking-tighter leading-snug max-w-xl">
            Compete in world-class challenges, solve critical security problems, and win prestigious node reputation grants.
          </p>
        </div>

        {/* Featured Card */}
        <div className="bg-[#0c0c0c] border border-white/5 rounded-lg mb-12 overflow-hidden hover:border-blue-500/20 transition-all group">
          <div className="p-8 md:p-10 flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0 md:mr-8 flex-grow">
              <div className="flex items-center space-x-2 mb-4">
                 <Shield className="w-3.5 h-3.5 text-blue-500" />
                 <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-blue-500/80">Featured Deployment</span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold mb-4 uppercase tracking-tight italic text-white underline underline-offset-8 decoration-blue-500/20">CyberShield Global 2024</h2>
              <p className="text-gray-500 text-[11px] mb-8 max-w-lg font-medium uppercase tracking-tighter leading-snug">
                The flagship event of the division. 10,000 CP reputation grant, 500+ participating nodes, and senior auditor mentorship.
              </p>
              <div className="flex flex-wrap gap-10 text-[10px] text-gray-600 font-bold uppercase tracking-widest mb-10">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-3.5 h-3.5 text-blue-500/50" />
                  <span>APR 15-17</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-3.5 h-3.5 text-blue-500/50" />
                  <span>48H Sprint</span>
                </div>
                <div className="flex items-center space-x-2">
                   <Users className="w-3.5 h-3.5 text-blue-500/50" />
                   <span>Global Hub</span>
                </div>
              </div>
              <Link href="/hackathons/register" className="btn-primary">Register Node</Link>
            </div>
            <div className="w-full md:w-1/4 aspect-square bg-white/[0.01] rounded-lg border border-white/[0.03] flex items-center justify-center relative group-hover:scale-105 transition-transform duration-700">
               <Trophy className="w-16 h-16 text-blue-500/10 group-hover:text-blue-500/20 transition-colors" />
            </div>
          </div>
        </div>

        {/* Events List */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 mb-8 ml-1">
             <Trophy className="w-3.5 h-3.5 text-gray-700" />
             <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600">Event Registry</p>
          </div>
          {hackathons.map((hack, idx) => (
            <motion.div
              key={hack.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-[#0c0c0c] border border-white/5 rounded-lg p-5 hover:border-white/10 transition-all group"
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex-grow">
                  <div className="flex items-center space-x-3 mb-2">
                     <h4 className="text-xs font-bold uppercase tracking-tight text-gray-200 group-hover:text-blue-500 transition-colors">{hack.title}</h4>
                     <span className="px-1.5 py-0.5 text-[8px] font-bold bg-emerald-500/5 text-emerald-500/80 rounded uppercase tracking-tighter">Registration Open</span>
                  </div>
                  <p className="text-gray-600 text-[10px] font-medium uppercase tracking-tighter max-w-2xl">
                    {hack.description}
                  </p>
                </div>
                
                <div className="flex items-center space-x-10">
                  <div className="text-right">
                    <p className="text-[8px] text-gray-700 uppercase font-bold tracking-widest mb-1">Grant Pool</p>
                    <p className="text-sm font-bold text-white italic">{hack.prize_pool}</p>
                  </div>
                  <Link 
                    href="/hackathons/register"
                    className="p-2 border border-white/5 bg-white/[0.02] rounded-md hover:bg-blue-600 hover:text-white transition-all text-gray-600 shadow-lg shadow-black/20"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HackathonsPage;
