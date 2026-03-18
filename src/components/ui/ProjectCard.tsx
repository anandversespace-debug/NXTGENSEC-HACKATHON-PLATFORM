'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Star, Code } from 'lucide-react';
import { Project } from '@/types';
import Link from 'next/link';
import { useAuthStore } from '@/store/useAuthStore';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const user = useAuthStore((s) => s.user);
  const [stars, setStars] = useState(project.stars || 0);
  const [starred, setStarred] = useState(
    user ? (project.starred_by || []).includes(user.id) : false
  );
  const [starLoading, setStarLoading] = useState(false);

  const handleStar = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) return;
    setStarLoading(true);
    try {
      const token = localStorage.getItem('token');
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${baseUrl}/projects/${project.id || project._id}/star`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        setStars(data.stars);
        setStarred(data.starred);
      }
    } catch (err) {
      console.error('Star error:', err);
    } finally {
      setStarLoading(false);
    }
  };

  const projectId = project.id || project._id;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      className="bg-[#0c0c0c] border border-white/5 rounded-lg flex flex-col h-full hover:border-white/10 transition-all hover:bg-white/[0.01] group overflow-hidden"
    >
      {/* Project Image */}
      {project.image && (
        <Link href={`/projects/${projectId}`} className="block h-36 overflow-hidden border-b border-white/5">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        </Link>
      )}

      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex flex-wrap gap-1.5">
            {project.tech_stack.slice(0, 3).map(tech => (
              <span key={tech} className="px-1.5 py-0.5 text-[8px] font-bold bg-white/5 text-gray-500 rounded uppercase tracking-tighter">
                {tech}
              </span>
            ))}
          </div>
          <button
            onClick={handleStar}
            disabled={starLoading || !user}
            className={`flex items-center space-x-1 font-bold text-[9px] transition-colors ${
              starred ? 'text-amber-500' : 'text-gray-600 hover:text-amber-500'
            } disabled:opacity-50`}
          >
            <Star className={`w-3 h-3 ${starred ? 'fill-amber-500' : ''}`} />
            <span>{stars}</span>
          </button>
        </div>

        <Link href={`/projects/${projectId}`} className="flex items-center space-x-3 mb-3">
           <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center shrink-0">
              <Code className="w-4 h-4 text-blue-600" />
           </div>
           <h3 className="text-sm font-bold text-gray-200 group-hover:text-blue-500 transition-colors uppercase tracking-tight italic">
             {project.title}
           </h3>
        </Link>
        
        <p className="text-[11px] text-gray-500 mb-6 flex-grow leading-snug font-medium uppercase tracking-tighter">
          {project.description}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-white/[0.02]">
          <div className="flex items-center space-x-1.5">
            {project.github_url && (
              <a 
                href={project.github_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-1.5 text-gray-600 hover:text-white transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <Github className="w-3.5 h-3.5" />
              </a>
            )}
            {project.demo_url && (
              <a 
                href={project.demo_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-1.5 text-gray-600 hover:text-white transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
          <Link href={`/projects/${projectId}`} className="text-[9px] font-bold uppercase tracking-widest text-blue-600 hover:text-blue-400">
            Intel →
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
