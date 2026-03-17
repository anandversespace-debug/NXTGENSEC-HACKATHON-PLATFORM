'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Star, Code } from 'lucide-react';
import { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      className="bg-[#0c0c0c] border border-white/5 rounded-lg p-5 flex flex-col h-full hover:border-white/10 transition-all hover:bg-white/[0.01] group"
    >
      <div className="mb-4 flex items-start justify-between">
        <div className="flex flex-wrap gap-1.5">
          {project.tech_stack.slice(0, 3).map(tech => (
            <span key={tech} className="px-1.5 py-0.5 text-[8px] font-bold bg-white/5 text-gray-500 rounded uppercase tracking-tighter">
              {tech}
            </span>
          ))}
        </div>
        <div className="flex items-center space-x-1 text-gray-600 font-bold text-[9px]">
          <Star className="w-2.5 h-2.5" />
          <span>{(project.stars / 1000).toFixed(1)}K</span>
        </div>
      </div>

      <div className="flex items-center space-x-3 mb-3">
         <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center">
            <Code className="w-4 h-4 text-blue-600" />
         </div>
         <h3 className="text-sm font-bold text-gray-200 group-hover:text-blue-500 transition-colors uppercase tracking-tight italic">
           {project.title}
         </h3>
      </div>
      
      <p className="text-[11px] text-gray-500 mb-6 flex-grow leading-snug font-medium uppercase tracking-tighter">
        {project.description}
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-white/[0.02]">
        <div className="flex items-center space-x-1.5">
          <a 
            href={project.github_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-1.5 text-gray-600 hover:text-white transition-colors"
          >
            <Github className="w-3.5 h-3.5" />
          </a>
          {project.demo_url && (
            <a 
              href={project.demo_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-1.5 text-gray-600 hover:text-white transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
        <button className="text-[9px] font-bold uppercase tracking-widest text-blue-600 hover:text-blue-400">
          Intel →
        </button>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
