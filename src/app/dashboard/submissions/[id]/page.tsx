'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Gavel, 
  Github, 
  ExternalLink,
  Code2,
  Trophy,
  MessageSquare,
  Send,
  CheckCircle,
  FileText
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardSubmissionDetailsPage({ params }: { params: { id: string } }) {
  const [submission, setSubmission] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState<string>('');
  const [feedback, setFeedback] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        const token = localStorage.getItem('token');
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const res = await fetch(`${baseUrl}/projects/${params.id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!res.ok) throw new Error('Unrecognized submission hash.');
        const data = await res.json();
        setSubmission(data);
        if (data.score) setScore(data.score.toString());
        if (data.feedback) setFeedback(data.feedback);
      } catch (err) {
        console.error('Fetch detail error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSubmission();
  }, [params.id]);

  const handleScoreSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API delay
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Audit log compiled and securely documented.');
    }, 1000);
  };

  if (loading) return (
    <div className="py-32 text-center">
       <div className="text-blue-500 font-black italic animate-pulse tracking-widest uppercase text-xs">Accessing Submission Matrix Sector...</div>
    </div>
  );

  if (!submission) return (
    <div className="py-32 text-center text-gray-500">
       <span className="text-[10px] font-black uppercase tracking-widest italic">Submission Node Not Recognized</span>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-10">
      <Link href="/dashboard/submissions" className="flex items-center space-x-2 text-gray-500 hover:text-white transition-colors group w-fit">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-[10px] font-bold uppercase tracking-widest">Back to Review Queue</span>
      </Link>

      {/* Header Info */}
      <div className="bg-[#0c0c0c] border border-white/5 rounded-xl p-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-2 h-full bg-blue-600"></div>
        
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                 <span className="text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-tighter border bg-amber-500/10 text-amber-500 border-amber-500/20">Pending Audit</span>
                 <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest flex items-center"><Trophy className="w-3 h-3 mr-1" /> {submission.hackathon_id?.title || 'General'}</span>
              </div>
              <h1 className="text-3xl font-black italic tracking-tight uppercase mb-2">{submission.title}</h1>
              <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Submitted by <span className="text-gray-300">{submission.created_by?.name || 'Authorized Member'}</span></p>
           </div>
        </div>

        <div className="space-y-6 border-t border-white/[0.03] pt-6">
           <div>
             <h3 className="text-[10px] font-bold uppercase text-gray-600 tracking-widest mb-3 flex items-center space-x-2">
                <FileText className="w-3.5 h-3.5" />
                <span>Executive Summary</span>
             </h3>
             <p className="text-sm font-medium text-gray-300 leading-relaxed max-w-2xl">{submission.description}</p>
           </div>

           <div className="flex gap-4">
              <a href={submission.github_url} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 py-2 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-bold transition-colors">
                <Github className="w-4 h-4" />
                <span>Source Code</span>
              </a>
              <a href={submission.demo_url} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 py-2 px-4 bg-blue-600/10 text-blue-400 border border-blue-500/20 hover:bg-blue-600 hover:text-white rounded-lg text-xs font-bold transition-all">
                <ExternalLink className="w-4 h-4" />
                <span>Live Deployment</span>
              </a>
           </div>
        </div>
      </div>

      {/* Judging Panel */}
      <div className="bg-gradient-to-b from-[#0c0c0c] to-[#080808] border border-white/5 rounded-xl p-8">
         <div className="flex items-center space-x-3 mb-8 pb-4 border-b border-white/[0.03]">
            <div className="w-8 h-8 rounded bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
               <Gavel className="w-4 h-4 text-blue-500" />
            </div>
            <div>
               <h2 className="text-lg font-bold uppercase tracking-tight italic">Auditor Evaluation Matrix</h2>
               <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Formulate Final Scoring</p>
            </div>
         </div>

         <form onSubmit={handleScoreSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div>
                 <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2 block ml-1">Comprehensive Score (0-100)</label>
                 <input 
                   type="number" 
                   min="0"
                   max="100"
                   value={score}
                   onChange={(e) => setScore(e.target.value)}
                   required
                   className="w-full bg-[#050505] border border-white/10 rounded-lg py-4 px-4 text-3xl font-black text-white focus:outline-none focus:border-blue-500/50 transition-colors shadow-inner"
                   placeholder="00"
                 />
               </div>

               <div>
                  <div className="p-4 bg-white/[0.01] border border-white/5 rounded-lg h-full flex flex-col justify-center">
                     <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-2 flex items-center"><CheckCircle className="w-3.5 h-3.5 mr-1" /> Evaluation Criteria</p>
                     <ul className="text-[10px] text-gray-400 space-y-1.5 font-medium leading-relaxed">
                       <li>• Innovation & Originality (30%)</li>
                       <li>• Technical Execution & Security (40%)</li>
                       <li>• UX & Implementation Scalability (30%)</li>
                     </ul>
                  </div>
               </div>
            </div>

            <div>
               <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2 block ml-1 mt-4">Security Feedback & Remediation Notes</label>
               <textarea 
                 rows={5}
                 value={feedback}
                 onChange={(e) => setFeedback(e.target.value)}
                 required
                 className="w-full bg-[#050505] border border-white/10 rounded-lg py-3 px-4 text-xs font-mono text-gray-300 focus:outline-none focus:border-blue-500/50 transition-colors shadow-inner resize-none"
                 placeholder="Provide detailed architectural audit notes here..."
               />
            </div>

            <div className="pt-4 flex justify-end">
               <button 
                 type="submit"
                 disabled={isSubmitting}
                 className="btn-primary py-3 px-8 text-xs disabled:opacity-50 flex items-center space-x-2"
               >
                 <Send className="w-4 h-4" />
                 <span>{isSubmitting ? 'Securing Audit Hash...' : 'Lock Official Score'}</span>
               </button>
            </div>
         </form>
      </div>
    </div>
  );
}
