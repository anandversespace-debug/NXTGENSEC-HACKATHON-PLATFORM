'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Terminal, 
  Cpu, 
  Network,
  Users,
  Code2,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  const stats = [
    { label: 'Community Members', value: '...', icon: Users },
    { label: 'Bug Reports', value: '...', icon: ShieldCheck },
    { label: 'Projects Audited', value: '...', icon: Terminal },
    { label: 'Prizes Awarded', value: '...', icon: Cpu },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 bg-[#050505] overflow-hidden">
       {/* Ambient Backing Vectors */}
       <div className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-[0.03]">
          <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-blue-500 rounded-full blur-[150px]"></div>
          <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-indigo-500 rounded-full blur-[150px]"></div>
       </div>

      <div className="max-w-5xl mx-auto space-y-24 relative z-10">
        
        {/* Core Mission Header */}
        <section className="text-center space-y-6 max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-blue-900/30 border border-white/10"
          >
            <ShieldCheck className="w-8 h-8 text-white" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-white leading-tight"
          >
            Building a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 text-left">Secure</span> Future
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-xs md:text-sm leading-relaxed font-medium uppercase tracking-tight text-left"
          >
            NxtGenSec is a security and development platform. We bring together developers and security experts to build better software through community events and collaborative project reviews.
          </motion.p>
        </section>

        {/* Telemetry Stats */}
        <section>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {stats.map((stat, idx) => {
                 const Icon = stat.icon;
                 return (
                   <motion.div 
                     key={idx}
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ delay: idx * 0.1 }}
                     className="bg-[#0c0c0c] border border-white/5 rounded-2xl p-6 text-left group hover:border-white/10 transition-colors"
                   >
                      <div className="w-10 h-10 rounded bg-blue-500/5 border border-blue-500/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-blue-500/10 transition-all duration-500">
                         <Icon className="w-5 h-5 text-blue-500" />
                      </div>
                      <h3 className="text-2xl md:text-3xl font-black text-white italic tracking-tight">{stat.value}</h3>
                      <p className="text-[9px] font-bold uppercase tracking-widest text-gray-500 mt-2">{stat.label}</p>
                   </motion.div>
                 )
              })}
           </div>
        </section>

        {/* Narrative Split */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
           <motion.div 
             initial={{ opacity: 0, x: -30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="space-y-6 text-left"
           >
              <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-2">
                 <Network className="w-3.5 h-3.5 text-blue-500" />
                 <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Our Method</span>
              </div>
              <h2 className="text-2xl font-black italic uppercase tracking-tight text-white leading-tight">Building Better Software Together.</h2>
              <div className="space-y-4 text-xs text-gray-400 leading-relaxed font-medium uppercase tracking-tight">
                <p>
                  Building secure software should be a community effort. We believe that by bringing together thousands of developers, we can find and fix issues faster than any single team.
                </p>
                <p>
                  NxtGenSec gamifies the development process. Through hackathons and project reviews, we allow developers to earn reputation and prizes while making the digital world a safer place for everyone.
                </p>
                <p>
                  Join us in our mission to build a more secure and transparent digital ecosystem.
                </p>
              </div>
           </motion.div>

           <motion.div 
             initial={{ opacity: 0, x: 30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="bg-gradient-to-br from-[#0c0c0c] to-[#050505] border border-white/5 rounded-2xl p-8 relative overflow-hidden h-full min-h-[400px]"
           >
              {/* Decorative Code Block Mock */}
              <div className="absolute -right-10 -bottom-10 opacity-30 pointer-events-none transform rotate-12 scale-125">
                 <Code2 className="w-64 h-64 text-blue-900" />
              </div>
              <div className="relative z-10 space-y-4">
                 <div className="flex items-center space-x-2 border-b border-white/5 pb-4 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-500/50"></div>
                 </div>
                 <pre className="text-[10px] font-mono text-gray-400 leading-wider overflow-x-hidden">
                    <code>
                       <span className="text-blue-400">import</span> {'{'} SecurityCore {'}'} <span className="text-blue-400">from</span> &apos;@nxtgensec/core&apos;;<br/><br/>
                      <span className="text-purple-400">const</span> initPlatform = <span className="text-blue-400">async</span> () ={'>'} {'{'}<br/>
                      &nbsp;&nbsp;<span className="text-gray-500">// Connect to community network</span><br/>
                      &nbsp;&nbsp;<span className="text-amber-300">await</span> SecurityCore.syncMembers();<br/>
                      &nbsp;&nbsp;<span className="text-amber-300">await</span> SecurityCore.auditProject();<br/><br/>
                      &nbsp;&nbsp;<span className="text-blue-400">return</span> {'{'}<br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;status: <span className="text-emerald-400">'Ready'</span>,<br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;active: <span className="text-blue-400">true</span><br/>
                      &nbsp;&nbsp;{'}'};<br/>
                      {'}'};
                    </code>
                 </pre>
              </div>
           </motion.div>
        </section>

        {/* CTA */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center py-12 border-t border-white/5"
        >
           <h2 className="text-2xl font-black italic uppercase tracking-tight text-white mb-6">Ready to Join the Community?</h2>
           <Link 
             href="/signup"
             className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] uppercase tracking-widest rounded-lg shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all italic"
           >
             Create Account <ChevronRight className="w-4 h-4 ml-2" />
           </Link>
        </motion.section>

      </div>
    </div>
  );
}
