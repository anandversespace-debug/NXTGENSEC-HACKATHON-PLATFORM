'use client';

import React, { useState, useEffect, Suspense } from 'react';
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
import { useSearchParams } from 'next/navigation';
import Loader from '@/components/ui/Loader';

function SearchContent() {
  const searchParams = useSearchParams();
  const router = require('next/navigation').useRouter();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [activeCategory, setActiveCategory] = useState('all');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const categories = [
    { id: 'all', label: 'All Resources', icon: Globe },
    { id: 'projects', label: 'Projects', icon: Code2 },
    { id: 'hackathons', label: 'Events', icon: Trophy },
    { id: 'developers', label: 'Members', icon: Users },
  ];

  // Update URL search query as user types (debounced)
  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (searchQuery) {
        params.set('q', searchQuery);
      } else {
        params.delete('q');
      }
      router.replace(`/search?${params.toString()}`, { scroll: false });
    }, 400);
    return () => clearTimeout(timeout);
  }, [searchQuery, searchParams, router]);

  useEffect(() => {
    const performSearch = async () => {
      const query = searchParams.get('q') || '';
      setLoading(true);
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const res = await fetch(`${baseUrl}/search?q=${encodeURIComponent(query)}&category=${activeCategory}`);
        if (!res.ok) throw new Error('Search failed');
        const data = await res.json();
        setResults(data);
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    };
    performSearch();
  }, [searchParams, activeCategory]);

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 bg-[#050505] overflow-hidden">
       {/* Ambient Visuals */}
       <div className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-[0.02]">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-500 rounded-full blur-[200px]"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-indigo-500 rounded-full blur-[200px]"></div>
       </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <header className="mb-12 space-y-4">
           <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1">
              <Search className="w-3 h-3 text-blue-500" />
              <span className="text-[9px] font-black uppercase tracking-widest text-blue-400 italic">Global Platform Search</span>
           </div>
           <h1 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-white">Find your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">Next Sprint</span></h1>
        </header>

        {/* Search Bar */}
        <div className="relative mb-12">
            <input 
              type="text" 
              placeholder="Search by project, tech stack, or member name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0c0c0c] border border-white/5 rounded-2xl py-6 pl-16 pr-8 text-lg font-bold text-white focus:outline-none focus:border-blue-500/30 transition-all shadow-2xl"
            />
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-700" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
           {/* Sidebar Filters */}
           <aside className="space-y-8">
              <div>
                 <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] mb-6 flex items-center">
                    <Filter className="w-3.5 h-3.5 mr-2" /> Categories
                 </h3>
                 <div className="space-y-2">
                    {categories.map(cat => (
                       <button
                         key={cat.id}
                         onClick={() => setActiveCategory(cat.id)}
                         className={cn(
                           "w-full flex items-center justify-between px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all border italic",
                           activeCategory === cat.id 
                            ? "bg-blue-600/10 text-blue-400 border-blue-500/20 shadow-[0_0_15px_rgba(37,99,235,0.1)]" 
                            : "bg-[#0c0c0c] text-gray-600 border-white/5 hover:border-white/10"
                         )}
                       >
                          <div className="flex items-center space-x-3">
                             <cat.icon className="w-3.5 h-3.5" />
                             <span>{cat.label}</span>
                          </div>
                          <ChevronRight className={cn("w-3 h-3 transition-transform", activeCategory === cat.id ? "rotate-90" : "")} />
                       </button>
                    ))}
                 </div>
              </div>

              <div className="bg-gradient-to-br from-[#0c0c0c] to-[#080808] border border-white/5 rounded-2xl p-6">
                 <div className="flex items-center space-x-2 mb-4">
                    <Zap className="w-4 h-4 text-amber-500" />
                    <h3 className="text-[10px] font-black text-white uppercase tracking-widest italic">Platform Status</h3>
                 </div>
                 <div className="space-y-3">
                    <div className="flex items-center justify-between text-[9px] font-bold">
                       <span className="text-gray-600 uppercase">Latency</span>
                       <span className="text-emerald-500">14ms</span>
                    </div>
                    <div className="flex items-center justify-between text-[9px] font-bold">
                       <span className="text-gray-600 uppercase">Search Load</span>
                       <span className="text-blue-500">Normal</span>
                    </div>
                 </div>
              </div>
           </aside>

           {/* Results Area */}
           <div className="lg:col-span-3 space-y-6">
             {loading ? (
                <div className="py-20 text-center space-y-6">
                   <div className="flex justify-center">
                      <Loader />
                   </div>
                   <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-700 italic">Searching projects and members...</p>
                </div>
             ) : (
                <>
                  <div className="flex items-center justify-between mb-8 border-b border-white/[0.03] pb-4">
                     <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 italic">
                        Found <span className="text-white">{results.length}</span> results
                     </p>
                  </div>

                  <div className="space-y-4">
                    <AnimatePresence mode='popLayout'>
                      {results.map((result, idx) => (
                        <motion.div
                          layout
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ delay: idx * 0.05 }}
                          key={result.id}
                          className="group bg-[#0c0c0c] border border-white/5 rounded-2xl p-6 hover:border-blue-500/20 transition-all hover:shadow-2xl hover:shadow-blue-900/10 cursor-pointer relative overflow-hidden"
                        >
                          <Link href={result.link} className="flex flex-col md:flex-row md:items-center gap-6">
                            <div className="bg-[#050505] p-4 rounded-xl border border-white/5 group-hover:border-blue-500/20 transition-colors">
                               {result.category === 'projects' && <Code2 className="w-6 h-6 text-blue-500" />}
                               {result.category === 'hackathons' && <Trophy className="w-6 h-6 text-amber-500" />}
                               {result.category === 'developers' && <Users className="w-6 h-6 text-indigo-500" />}
                            </div>

                            <div className="flex-grow">
                               <div className="flex items-center space-x-3 mb-1">
                                  <span className="text-[8px] font-black px-2 py-0.5 rounded-full bg-white/5 text-gray-500 uppercase tracking-widest border border-white/5">{result.category}</span>
                                  <span className="text-[8px] font-black text-blue-500 uppercase tracking-widest flex items-center italic">{result.metrics}</span>
                               </div>
                               <h3 className="text-lg font-black text-white group-hover:text-blue-400 transition-colors uppercase tracking-tight italic">{result.title}</h3>
                               <p className="text-[11px] font-medium text-gray-500 max-w-lg mb-4 leading-relaxed line-clamp-2">{result.description}</p>
                               
                               <div className="flex flex-wrap gap-2">
                                  {result.tags && result.tags.map((tag: string) => (
                                    <span key={tag} className="text-[8px] bg-white/[0.03] border border-white/5 px-2 py-0.5 rounded text-gray-500 font-bold uppercase tracking-widest">{tag}</span>
                                  ))}
                               </div>
                            </div>

                            <ArrowRight className="hidden md:block w-5 h-5 text-gray-800 group-hover:text-blue-500 transition-all transform group-hover:translate-x-1" />
                          </Link>
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    {results.length === 0 && !loading && (
                       <div className="py-20 text-center bg-[#0c0c0c] border border-dashed border-white/5 rounded-3xl">
                          <Shield className="w-12 h-12 text-gray-800 mx-auto mb-6 opacity-30" />
                          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-700 italic mb-2">No Results Found</h3>
                          <p className="text-[10px] text-gray-800 font-bold uppercase tracking-widest">No items match your search.</p>
                       </div>
                    )}
                  </div>
                </>
             )}
           </div>
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
       <div className="min-h-screen bg-[#050505] flex items-center justify-center">
          <Loader />
       </div>
    }>
       <SearchContent />
    </Suspense>
  );
}
