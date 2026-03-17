'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Github, Globe, Type, FileText, Send } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';

const NewProjectPage = () => {
  const { user, isAuthenticated } = useAuthStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tech_stack: '',
    github_url: '',
    demo_url: '',
  });

  if (!isAuthenticated) {
    router.push('/login');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          tech_stack: formData.tech_stack.split(',').map(s => s.trim()),
          created_by: user?.id,
        }),
      });

      if (response.ok) {
        router.push('/projects');
      }
    } catch (error) {
      console.error('Error creating project:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-10"
        >
          <div className="mb-10">
            <h1 className="text-3xl font-bold mb-2">Submit New Project</h1>
            <p className="text-gray-400">Share your innovation with the NxtGenSec community.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-3 flex items-center space-x-2">
                <Type className="w-4 h-4" /> <span>Project Title</span>
              </label>
              <input
                type="text"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50"
                placeholder="e.g. SecureVault Engine"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-3 flex items-center space-x-2">
                <FileText className="w-4 h-4" /> <span>Description</span>
              </label>
              <textarea
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50 h-32"
                placeholder="Describe your project, its security features and use cases..."
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-3 flex items-center space-x-2">
                  <Code className="w-4 h-4" /> <span>Tech Stack (comma separated)</span>
                </label>
                <input
                  type="text"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50"
                  placeholder="Next.js, TypeScript, Rust"
                  value={formData.tech_stack}
                  onChange={(e) => setFormData({...formData, tech_stack: e.target.value})}
                  required
                />
              </div>
              <div>
                 <label className="block text-sm font-medium text-gray-400 mb-3 flex items-center space-x-2">
                  <Github className="w-4 h-4" /> <span>GitHub Repository</span>
                </label>
                <input
                  type="url"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50"
                  placeholder="https://github.com/..."
                  value={formData.github_url}
                  onChange={(e) => setFormData({...formData, github_url: e.target.value})}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-3 flex items-center space-x-2">
                <Globe className="w-4 h-4" /> <span>Live Demo URL (Optional)</span>
              </label>
              <input
                type="url"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500/50"
                placeholder="https://..."
                value={formData.demo_url}
                onChange={(e) => setFormData({...formData, demo_url: e.target.value})}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-4 flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <Send className="w-5 h-5" />
              <span>{loading ? 'Submitting...' : 'Launch Project'}</span>
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default NewProjectPage;
