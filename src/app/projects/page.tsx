'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Search, Plus, Terminal } from 'lucide-react';
import { Project } from '@/types';
import Link from 'next/link';
import ProjectCard from '@/components/ui/ProjectCard';
import SearchBar from '@/components/ui/SearchBar';
import ProjectFilter from '@/components/ui/ProjectFilter';

const ProjectsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const categories = ['Next.js', 'Solidity', 'Go', 'React', 'Rust'];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const res = await fetch(`${baseUrl}/projects`);
        if (!res.ok) throw new Error('System failed to synchronize projects.');
        const data = await res.json();
        const transformedData = data.map((p: any) => ({
          ...p,
          id: p._id
        }));
        setProjects(transformedData);
      } catch (err) {
        console.error('Failed to fetch projects:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.tech_stack.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 bg-[#050505]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-xl">
            <p className="text-label mb-2">Browse</p>
            <h1 className="text-2xl font-bold uppercase tracking-tight italic mb-3">All Projects</h1>
            <p className="text-gray-500 text-[11px] font-bold uppercase tracking-tighter leading-snug">Explore innovative projects built by our community. Search, filter, and contribute to what interests you.</p>
          </div>
          <Link href="/projects/new" className="bg-blue-600 hover:bg-blue-500 text-white py-2.5 px-6 rounded text-[10px] font-bold uppercase tracking-widest transition-all flex items-center space-x-2">
            <Plus className="w-3.5 h-3.5" />
            <span>Add Project</span>
          </Link>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-[#0c0c0c]/50 border border-white/5 rounded-lg p-6 mb-12 space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <SearchBar 
              value={searchQuery} 
              onChange={setSearchQuery} 
              placeholder="Search projects..." 
            />
            <button className="flex items-center justify-center space-x-2 bg-white/[0.02] border border-white/5 rounded-lg px-6 py-2 transition-all hover:bg-white/5">
              <Terminal className="w-3.5 h-3.5 text-gray-600" />
              <span className="text-[9px] font-bold uppercase tracking-widest text-gray-500">Filters</span>
            </button>
          </div>
          
          <ProjectFilter 
            categories={categories} 
            selectedCategory={selectedCategory} 
            onSelect={setSelectedCategory} 
          />
        </div>

        {/* Project Grid */}
        <div className="min-h-[400px]">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="bg-[#0c0c0c] border border-white/5 h-[160px] animate-pulse rounded-lg" />
              ))}
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {filteredProjects.length > 0 ? (
                <motion.div 
                   key="projects-grid"
                   layout
                   className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                  {filteredProjects.map((project, idx) => (
                    <ProjectCard key={project.id} project={project} index={idx} />
                  ))}
                </motion.div>
              ) : (
                <motion.div 
                  key="empty-state"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-32 text-center"
                >
                   <div className="w-12 h-12 bg-white/5 border border-white/5 rounded flex items-center justify-center mb-6">
                      <Search className="w-5 h-5 text-gray-800" />
                   </div>
                   <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-1">0 Results Found</h3>
                   <p className="text-[10px] text-gray-700 font-bold uppercase tracking-tighter">No projects match your search criteria.</p>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
