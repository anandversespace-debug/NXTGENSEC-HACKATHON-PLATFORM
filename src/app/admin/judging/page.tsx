'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Gavel, 
  Search, 
  Filter, 
  Star, 
  ExternalLink,
  ShieldCheck,
  Zap,
  Layout,
  Activity,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

const JudgingPage = () => {
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null);

  const submissions = [
    { 
      id: 'sub1', 
      title: 'ZKP Validator', 
      dev: '@ironmind', 
      status: 'pending', 
      tech: ['Rust', 'Wasm'],
      desc: 'A decentralized validator using zero-knowledge proofs for identity verification without exposing raw data.',
      score: null
    },
    { 
      id: 'sub2', 
      title: 'NeuralSentinel', 
      dev: '@matrix_hacker', 
      status: 'pending', 
      tech: ['Python', 'Go'],
      desc: 'AI-driven network monitoring tool that predicts DDOS attacks before they infiltrate the main gateway.',
      score: null
    },
    { 
      id: 'sub3', 
      title: 'EthShield', 
      dev: '@block_master', 
      status: 'judged', 
      tech: ['Solidity', 'Next.js'],
      desc: 'Real-time smart contract auditing tool that flags vulnerability patterns during deployment.',
      score: 94
    },
  ];

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold mb-0.5">Judging Portal</h1>
          <p className="text-xs text-gray-500 font-medium">Evaluation metrics.</p>
        </div>
        <div className="flex bg-[#0c0c0c] border border-white/5 rounded-lg p-1 w-64">
          <input 
            type="text" 
            placeholder="Search queue..." 
            className="bg-transparent border-none focus:outline-none px-3 py-1.5 flex-grow text-white text-[11px]"
          />
          <button className="p-1.5 text-gray-500 hover:text-white transition-colors">
            <Search className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Submission List */}
        <div className="lg:col-span-1 space-y-2">
          <div className="flex items-center space-x-2 mb-4 ml-1">
            <Filter className="w-3.5 h-3.5 text-gray-600" />
            <span className="text-[9px] font-bold uppercase text-gray-500 tracking-wider">Active Queue</span>
          </div>
          {submissions.map((sub, i) => (
            <motion.div
              key={sub.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setSelectedSubmission(sub)}
              className={cn(
                "p-4 rounded-lg border transition-all cursor-pointer",
                selectedSubmission?.id === sub.id 
                  ? "bg-white/5 border-blue-500/20 shadow-lg" 
                  : "bg-[#0c0c0c] border-white/5 hover:border-white/10"
              )}
            >
              <div className="flex items-start justify-between mb-3">
                 <div>
                    <h4 className="text-[11px] font-bold text-gray-200 uppercase tracking-tight">{sub.title}</h4>
                    <p className="text-[9px] font-bold text-gray-600">{sub.dev}</p>
                 </div>
                 {sub.status === 'judged' && (
                   <span className="text-[8px] font-bold text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded uppercase">Score: {sub.score}</span>
                 )}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {sub.tech.map(t => (
                  <span key={t} className="text-[8px] font-bold text-gray-500 px-1.5 py-0.5 bg-white/5 rounded">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Evaluation Console */}
        <div className="lg:col-span-2 min-h-[500px]">
          <AnimatePresence mode="wait">
            {selectedSubmission ? (
              <motion.div
                key={selectedSubmission.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-[#0c0c0c] border border-white/5 rounded-lg p-8 h-full flex flex-col"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
                   <div className="max-w-md">
                      <div className="flex items-center space-x-2 mb-3 text-[9px] font-bold uppercase tracking-widest text-blue-500">
                         <span className="px-1.5 py-0.5 bg-blue-500/10 rounded">Audit Node</span>
                         <span className="text-gray-700 font-mono">ID: {selectedSubmission.id}</span>
                      </div>
                      <h2 className="text-lg font-bold mb-3 text-white uppercase tracking-tight italic">{selectedSubmission.title}</h2>
                      <p className="text-xs text-gray-500 leading-relaxed font-medium">{selectedSubmission.desc}</p>
                   </div>
                   <div className="flex flex-col space-y-2">
                      <button className="flex items-center space-x-2 px-3 py-2 bg-white/5 border border-white/5 rounded-md hover:bg-white/10 transition-colors text-[9px] font-bold text-gray-400">
                         <ExternalLink className="w-3.5 h-3.5" /> <span>Source</span>
                      </button>
                      <button className="flex items-center space-x-2 px-3 py-2 bg-white/5 border border-white/5 rounded-md hover:bg-white/10 transition-colors text-[9px] font-bold text-gray-400">
                         <Layout className="w-3.5 h-3.5" /> <span>Demo</span>
                      </button>
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-white/5 flex-grow">
                   <div className="space-y-6">
                      <h3 className="text-[9px] font-bold uppercase text-gray-600 tracking-[0.2em] mb-4">Metrics</h3>
                      {[
                        { label: 'Technical', icon: ShieldCheck },
                        { label: 'Innovation', icon: Zap },
                        { label: 'Market', icon: Star },
                        { label: 'Code Quality', icon: Activity },
                      ].map((metric, i) => (
                        <div key={i} className="space-y-2">
                           <div className="flex items-center justify-between text-[10px] font-bold text-gray-500">
                              <div className="flex items-center space-x-1.5 uppercase tracking-tighter">
                                 <metric.icon className="w-3 h-3 text-blue-500/50" />
                                 <span>{metric.label}</span>
                              </div>
                              <span className="text-gray-300 italic">8/10</span>
                           </div>
                           <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: '80%' }}
                                transition={{ delay: 0.2, duration: 0.8 }}
                                className="h-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.3)]"
                              />
                           </div>
                        </div>
                      ))}
                   </div>

                   <div className="flex flex-col">
                      <h3 className="text-[9px] font-bold uppercase text-gray-600 tracking-[0.2em] mb-4">Feedback</h3>
                      <div className="bg-white/[0.01] border border-white/5 rounded-lg p-3 flex-grow mb-4">
                         <textarea 
                          placeholder="Submit mission debrief..."
                          className="w-full h-full bg-transparent border-none focus:outline-none text-[11px] text-gray-400 resize-none font-medium italic"
                         />
                      </div>
                      <div className="flex space-x-2">
                         <button className="flex-1 py-2 bg-white/5 border border-white/5 rounded-md text-[9px] font-bold text-gray-500 hover:text-white transition-colors">REVISION</button>
                         <button className="flex-1 py-2 bg-blue-600 rounded-md text-[9px] font-bold text-white hover:bg-blue-500 transition-colors shadow-lg shadow-blue-900/40 uppercase tracking-widest">SUBMIT</button>
                      </div>
                   </div>
                </div>
              </motion.div>
            ) : (
              <div className="bg-[#0c0c0c] border border-white/5 border-dashed rounded-lg flex flex-col items-center justify-center text-center p-20 h-full">
                 <Gavel className="w-8 h-8 text-gray-800 mb-4" />
                 <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest italic">Awaiting Selection</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default JudgingPage;
