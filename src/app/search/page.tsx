'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Terminal, 
  ShieldCheck, 
  Trophy, 
  Code2, 
  Users, 
  ArrowRight,
  Filter,
  Activity,
  Zap,
  ChevronRight,
  Shield,
  Layout,
  Globe
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Resources', icon: Globe },
    { id: 'projects', label: 'Projects', icon: Code2 },
    { id: 'hackathons', label: 'Hackathons', icon: Trophy },
    { id: 'developers', label: 'Members', icon: Users },
  ];

  const results: any[] = [];

  const filteredResults = activeCategory === 'all' 
    ? results 
    : results.filter(r => r.category === activeCategory);

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 bg-[#050505] overflow-hidden">
      {/* Search Header Background */}
      <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-blue-600/5 to-transparent pointer-events-none opacity-50 blur-3xl"></div>

      <div className="max-w-4xl mx-auto space-y-12 relative z-10">
        
        {/* Search Input Section */}
        <section className="space-y-6">
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-black italic uppercase tracking-tighter text-white mb-2">Global <span className="text-blue-500">Search</span></h1>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest leading-loose text-left">Search for members, hackathons, or projects across the platform.</p>
          </div>

          <div className="relative group shadow-2xl shadow-blue-900/10">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-700 group-hover:text-blue-500 transition-colors" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, ID, or title..." 
              className="w-full bg-[#0c0c0c] border border-white/10 rounded-2xl py-6 pl-16 pr-8 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-all font-medium"
            />
            <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center space-x-2">
               <span className="text-[10px] font-bold text-gray-700 uppercase tracking-widest bg-white/5 border border-white/10 px-2 py-1 rounded">ESC</span>
            </div>
          </div>
        </section>

        {/* Category Toggles */}
        <div className="flex bg-[#0c0c0c] border border-white/5 p-1 rounded-2xl overflow-x-auto">
           {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button 
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    "flex-grow flex items-center justify-center space-x-2 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.1em] transition-all whitespace-nowrap",
                    activeCategory === cat.id ? "bg-blue-600 text-white shadow-xl shadow-blue-900/20" : "text-gray-500 hover:text-gray-300"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{cat.label}</span>
                </button>
              )
           })}
        </div>

        {/* Results Matrix */}
        <div className="space-y-4">
           <AnimatePresence mode="popLayout">
              {filteredResults.map((result, idx) => {
                 const CategoryIcon = categories.find(c => c.id === result.category)?.icon || Globe;
                 return (
                   <motion.div
                     key={result.id}
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, scale: 0.95 }}
                     transition={{ delay: idx * 0.05 }}
                     className="bg-[#0c0c0c] border border-white/5 rounded-2xl p-6 group hover:border-white/10 transition-colors relative overflow-hidden text-left"
                   >
                     {/* Category Specific Gradient Overlay */}
                     <div className={cn(
                        "absolute top-0 right-0 w-[150px] h-full opacity-0 group-hover:opacity-10 transition-opacity blur-3xl",
                        result.category === 'projects' ? 'bg-blue-600' : result.category === 'hackathons' ? 'bg-emerald-600' : 'bg-amber-600'
                     )}></div>

                     <div className="flex items-start justify-between gap-6 relative z-10">
                        <div className="flex items-start space-x-6">
                           <div className={cn(
                             "w-12 h-12 rounded-xl flex items-center justify-center border transition-all",
                             result.category === 'projects' ? "bg-blue-600/5 border-blue-600/10 text-blue-500 group-hover:bg-blue-600 group-hover:text-white" : 
                             result.category === 'hackathons' ? "bg-emerald-500/5 border-emerald-500/10 text-emerald-500 group-hover:bg-emerald-600 group-hover:text-white" : 
                             "bg-amber-500/5 border-amber-500/10 text-amber-500 group-hover:bg-amber-600 group-hover:text-white"
                           )}>
                              <CategoryIcon className="w-6 h-6" />
                           </div>
                           <div className="text-left">
                              <div className="flex items-center space-x-3 mb-1">
                                 <h3 className="text-sm font-black text-gray-200 uppercase tracking-tight group-hover:text-white transition-colors">{result.title}</h3>
                                 <span className="text-[8px] font-bold text-gray-600 uppercase tracking-[0.2em]">{result.category}</span>
                              </div>
                              <p className="text-[11px] font-medium text-gray-500 max-w-lg mb-4 leading-relaxed line-clamp-2">{result.description}</p>
                              
                              <div className="flex flex-wrap gap-2">
                                 {result.tags.map((tag: string) => (
                                   <span key={tag} className="text-[8px] bg-white/[0.03] border border-white/5 px-2 py-0.5 rounded text-gray-500 font-bold uppercase tracking-widest">{tag}</span>
                                 ))}
                              </div>
                           </div>
                        </div>

                        <div className="flex flex-col items-end shrink-0 pt-1">
                           <div className="text-right mb-4">
                              <p className="text-[9px] font-black text-white italic tracking-tighter uppercase">{result.metrics}</p>
                           </div>
                           <Link href={result.link} className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-gray-500 hover:text-white transition-all transform group-hover:translate-x-1">
                              <ArrowRight className="w-4 h-4" />
                           </Link>
                        </div>
                     </div>
                   </motion.div>
                 )
              })}
           </AnimatePresence>

           {filteredResults.length === 0 && (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-20 text-center space-y-6">
                <div className="w-16 h-16 bg-white/[0.02] border border-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="w-8 h-8 text-gray-700" />
                </div>
                <h3 className="text-lg font-black italic text-white uppercase tracking-tight">No Results Found</h3>
                <p className="text-xs text-gray-500 font-medium">We couldn't find anything matching your search in our records.</p>
             </motion.div>
           )}
        </div>

        {/* Global Footer Quicklinks */}
        <section className="pt-12 border-t border-white/5 grid grid-cols-2 lg:grid-cols-4 gap-8">
           {[
             { label: 'Platform Blog', icon: Terminal, link: '/blog' },
             { label: 'Community', icon: Users, link: '/community' },
             { label: 'Projects', icon: Layout, link: '/projects' },
             { label: 'Hackathons', icon: Trophy, link: '/hackathons' }
           ].map((quick, i) => (
             <Link key={i} href={quick.link} className="flex flex-col items-center group">
                <div className="w-10 h-10 rounded-lg bg-[#0c0c0c] border border-white/5 flex items-center justify-center mb-3 group-hover:bg-blue-600/10 group-hover:border-blue-600/20 transition-all">
                   <quick.icon className="w-4 h-4 text-gray-700 group-hover:text-blue-500 transition-colors" />
                </div>
                <span className="text-[9px] font-bold uppercase tracking-widest text-gray-600 group-hover:text-gray-300 transition-colors">{quick.label}</span>
             </Link>
           ))}
        </section>

      </div>
    </div>
  );
};

export default SearchPage;
