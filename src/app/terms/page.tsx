'use client';

import React from 'react';
import { FileText, CheckCircle2 } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-6 bg-[#050505]">
      <div className="max-w-3xl mx-auto space-y-12">
        <div className="text-center">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mx-auto mb-6">
            <FileText className="w-6 h-6 text-blue-500" />
          </div>
          <h1 className="text-3xl font-black italic uppercase tracking-tight mb-4 text-white">Terms of Service</h1>
          <p className="text-gray-400">Last Updated: March 2024</p>
        </div>

        <div className="bg-[#0c0c0c] border border-white/5 rounded-xl p-8 md:p-12 space-y-10 prose prose-invert prose-p:text-gray-400 prose-headings:text-white prose-p:leading-relaxed">
           
           <div>
             <h2 className="text-xl font-bold uppercase tracking-tight flex items-center space-x-2 mb-4">
               <span className="text-blue-500">1.</span>
               <span>Welcome to NxtGenSec</span>
             </h2>
             <p className="text-sm text-gray-400 leading-relaxed">
               Hello! By using our website and services, you agree to these simple rules. Please read them carefully. If you do not agree with these rules, you should not use our platform.
             </p>
           </div>

           <div>
             <h2 className="text-xl font-bold uppercase tracking-tight flex items-center space-x-2 mb-4">
               <span className="text-blue-500">2.</span>
               <span>Account Rules</span>
             </h2>
             <ul className="space-y-3 text-sm text-gray-400">
               <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-emerald-500 mr-3 mt-0.5 shrink-0" /> You must keep your password safe. Do not share it with anyone.</li>
               <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-emerald-500 mr-3 mt-0.5 shrink-0" /> You are responsible for everything that happens on your account.</li>
               <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-emerald-500 mr-3 mt-0.5 shrink-0" /> Do not make fake accounts to trick others.</li>
             </ul>
           </div>

           <div>
             <h2 className="text-xl font-bold uppercase tracking-tight flex items-center space-x-2 mb-4">
               <span className="text-blue-500">3.</span>
               <span>Your Projects</span>
             </h2>
             <p className="text-sm text-gray-400 leading-relaxed">
               When you upload projects or write code on our platform, you still own them. However, you give us permission to display them on the website so other users and judges can see your hard work. 
             </p>
           </div>

           <div>
             <h2 className="text-xl font-bold uppercase tracking-tight flex items-center space-x-2 mb-4">
               <span className="text-blue-500">4.</span>
               <span>What You Cannot Do</span>
             </h2>
             <p className="text-sm text-gray-400 leading-relaxed mb-4">
               To keep NxtGenSec safe for everyone, you promise you will NOT:
             </p>
             <ul className="space-y-3 text-sm text-gray-400">
               <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-red-500 mr-3 mt-0.5 shrink-0" /> Share illegal, harmful, or hateful content.</li>
               <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-red-500 mr-3 mt-0.5 shrink-0" /> Try to hack or break the website.</li>
               <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-red-500 mr-3 mt-0.5 shrink-0" /> Bully or harass other developers.</li>
               <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-red-500 mr-3 mt-0.5 shrink-0" /> Post viruses or malicious software.</li>
             </ul>
           </div>

           <div>
             <h2 className="text-xl font-bold uppercase tracking-tight flex items-center space-x-2 mb-4">
               <span className="text-blue-500">5.</span>
               <span>Ending Your Account</span>
             </h2>
             <p className="text-sm text-gray-400 leading-relaxed">
               If you break these simple rules, we have the right to delete your projects and ban your account without warning. We want a safe community for everyone. You can also delete your own account at any time in your settings.
             </p>
           </div>

        </div>
      </div>
    </div>
  );
}
