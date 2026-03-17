'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface ProjectFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelect: (category: string) => void;
}

const ProjectFilter: React.FC<ProjectFilterProps> = ({ categories, selectedCategory, onSelect }) => {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <button
        onClick={() => onSelect('All')}
        className={cn(
          "px-3 py-1.5 rounded text-[9px] font-bold uppercase tracking-widest transition-all",
          selectedCategory === 'All'
            ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20"
            : "bg-white/[0.02] border border-white/5 text-gray-600 hover:text-gray-400"
        )}
      >
        Static_All
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={cn(
            "px-3 py-1.5 rounded text-[9px] font-bold uppercase tracking-widest transition-all",
            selectedCategory === category
              ? "bg-white/10 text-blue-400 border border-blue-500/20 shadow-lg shadow-blue-500/5"
              : "bg-white/[0.02] border border-white/5 text-gray-500 hover:text-gray-400"
          )}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default ProjectFilter;
