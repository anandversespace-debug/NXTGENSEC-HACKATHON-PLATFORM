'use client';

import Hero from '@/components/home/Hero';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Star, ExternalLink, Calendar, Clock, Users, Shield, Trophy, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface FeaturedProject {
  _id: string;
  title: string;
  description: string;
  tech_stack: string[];
  stars: number;
  status: string;
  image?: string;
  created_by?: { name: string; username: string };
}

interface FeaturedHackathon {
  _id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  prize_pool: string;
}

export default function Home() {
  const [projects, setProjects] = useState<FeaturedProject[]>([]);
  const [hackathons, setHackathons] = useState<FeaturedHackathon[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [loadingHackathons, setLoadingHackathons] = useState(true);

  useEffect(() => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

    fetch(`${baseUrl}/projects/featured`)
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.error('Featured projects fetch error:', err))
      .finally(() => setLoadingProjects(false));

    fetch(`${baseUrl}/hackathons`)
      .then(res => res.json())
      .then(data => setHackathons(data.slice(0, 2)))
      .catch(err => console.error('Hackathons fetch error:', err))
      .finally(() => setLoadingHackathons(false));
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#050505]">
      <Hero />
      
      {/* Featured Projects Section */}
      <section className="py-24 px-6 border-b border-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-16">
            <div>
              <p className="text-label mb-2">Showcase</p>
              <h2 className="text-2xl font-bold uppercase tracking-tight italic">Featured Projects</h2>
            </div>
            <Link href="/projects" className="text-[10px] font-bold uppercase tracking-widest text-blue-500 hover:text-blue-400 transition-colors">
              View All Projects →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {loadingProjects ? (
              [1, 2, 3].map(i => (
                <div key={i} className="bg-[#0c0c0c] border border-white/5 rounded-lg h-[280px] animate-pulse" />
              ))
            ) : projects.length > 0 ? (
              projects.map((project, idx) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Link href={`/projects/${project._id}`} className="block bg-[#0c0c0c] border border-white/5 rounded-lg p-6 group hover:border-white/10 transition-all">
                    <div className="h-40 bg-white/[0.01] border border-white/[0.03] rounded mb-6 flex items-center justify-center p-4 overflow-hidden">
                      {project.image ? (
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover rounded group-hover:scale-105 transition-transform duration-700" />
                      ) : (
                        <div className="w-full h-full bg-white/[0.02] rounded flex items-center justify-center border border-white/[0.03] group-hover:scale-[1.01] transition-transform">
                          <span className="text-gray-800 text-[10px] font-bold tracking-widest uppercase">{project.title.slice(0, 20)}</span>
                        </div>
                      )}
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2 flex-wrap gap-1">
                        {project.tech_stack?.slice(0, 2).map((tech, i) => (
                          <span key={i} className="px-1.5 py-0.5 text-[9px] font-bold bg-white/5 text-gray-400 rounded uppercase">{tech}</span>
                        ))}
                        <span className={`px-1.5 py-0.5 text-[9px] font-bold rounded uppercase ${project.status === 'verified' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-blue-500/10 text-blue-500'}`}>
                          {project.status}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-gray-200 uppercase tracking-tighter group-hover:text-white transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-gray-500 text-[11px] font-medium leading-normal mt-1 line-clamp-2">
                          {project.description}
                        </p>
                      </div>
                      <div className="pt-4 flex items-center justify-between border-t border-white/[0.03]">
                        <div className="flex items-center space-x-2">
                          <Star className="w-3.5 h-3.5 text-amber-500" />
                          <span className="text-[10px] font-bold text-gray-400">{project.stars}</span>
                        </div>
                        <span className="text-[10px] text-gray-700 font-bold uppercase tracking-widest italic group-hover:text-blue-500 transition-colors">
                          {project.created_by?.username ? `@${project.created_by.username}` : 'Anonymous'}
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))
            ) : (
              [1, 2, 3].map(i => (
                <div key={i} className="bg-[#0c0c0c] border border-white/5 rounded-lg p-6 group hover:border-white/10 transition-all">
                  <div className="h-40 bg-white/[0.01] border border-white/[0.03] rounded mb-6 flex items-center justify-center p-4">
                     <div className="w-full h-full bg-white/[0.02] rounded flex items-center justify-center border border-white/[0.03]">
                        <span className="text-gray-800 text-[10px] font-bold tracking-widest uppercase">Coming Soon</span>
                     </div>
                  </div>
                  <div className="space-y-4">
                    <span className="px-1.5 py-0.5 text-[9px] font-bold bg-white/5 text-gray-600 rounded uppercase">Pending</span>
                    <div>
                      <h3 className="text-sm font-bold text-gray-500 uppercase tracking-tighter">No Projects Yet</h3>
                      <p className="text-gray-700 text-[11px] font-medium mt-1">Be the first to submit a project to the platform.</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Upcoming Hackathons Preview */}
      <section className="py-24 px-6 bg-[#080808]/50 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
        <div className="max-w-6xl mx-auto">
           <div className="mb-16">
              <p className="text-label mb-2 text-center">Events</p>
              <h2 className="text-2xl font-bold uppercase tracking-tight text-center italic">Upcoming Hackathons</h2>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {loadingHackathons ? (
                [1, 2].map(i => (
                  <div key={i} className="bg-[#0c0c0c] border border-white/5 rounded-lg h-[200px] animate-pulse" />
                ))
              ) : hackathons.length > 0 ? (
                hackathons.map((hack, idx) => {
                  const daysLeft = Math.max(0, Math.ceil((new Date(hack.end_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24)));
                  return (
                    <motion.div
                      key={hack._id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <Link href={`/hackathons/${hack._id}`} className="flex flex-col md:flex-row bg-[#0c0c0c] border border-white/5 rounded-lg overflow-hidden hover:border-blue-500/30 transition-all duration-500 group">
                        <div className="md:w-1/4 bg-white/[0.02] flex flex-col items-center justify-center p-8 text-center border-r border-white/5">
                          <span className="text-[9px] font-bold uppercase tracking-widest text-gray-600 mb-2">Ends In</span>
                          <span className="text-3xl font-black text-white italic">{daysLeft}D</span>
                        </div>
                        <div className="md:w-3/4 p-8 flex flex-col justify-between">
                          <div>
                            <h3 className="text-sm font-bold mb-2 uppercase tracking-tight text-gray-200 group-hover:text-blue-500 transition-colors italic">{hack.title}</h3>
                            <p className="text-[11px] text-gray-500 font-medium mb-6 uppercase tracking-tighter leading-snug line-clamp-2">{hack.description}</p>
                          </div>
                          <div className="flex items-center justify-between border-t border-white/[0.03] pt-6">
                            <div className="flex items-center space-x-2 text-[10px] text-gray-600 font-bold uppercase tracking-widest">
                              <span>Prize:</span>
                              <span className="text-blue-500">{hack.prize_pool}</span>
                            </div>
                            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-500 transition-all">
                              Join Now
                            </span>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })
              ) : (
                <div className="lg:col-span-2 py-16 text-center">
                  <Trophy className="w-10 h-10 text-gray-800 mx-auto mb-4" />
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-600 italic">No upcoming hackathons at the moment. Check back soon!</p>
                </div>
              )}
           </div>
        </div>
      </section>

      <section className="py-24 px-6 text-center">
         <div className="max-w-2xl mx-auto">
            <h2 className="text-xl font-bold uppercase tracking-tight mb-4">Ready to Get Started?</h2>
            <p className="text-xs text-gray-500 uppercase tracking-tighter mb-8 italic">Create your account, submit your projects, and join a growing community of innovators.</p>
            <div className="flex items-center justify-center space-x-4">
               <Link href="/signup" className="btn-primary">Create Account</Link>
               <Link href="/docs" className="btn-secondary">Read the Docs</Link>
            </div>
         </div>
      </section>
    </div>
  );
}
