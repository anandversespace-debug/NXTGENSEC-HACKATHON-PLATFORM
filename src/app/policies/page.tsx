'use client';

import React from 'react';
import { ShieldAlert, Lock, Eye, Database } from 'lucide-react';

export default function PoliciesPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-6 bg-[#050505]">
      <div className="max-w-3xl mx-auto space-y-12">
        <div className="text-center">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-6">
            <Lock className="w-6 h-6 text-emerald-500" />
          </div>
          <h1 className="text-3xl font-black italic uppercase tracking-tight mb-4 text-white">Privacy Policy</h1>
          <p className="text-gray-400">Simple plain-english explanation of your privacy.</p>
        </div>

        <div className="bg-[#0c0c0c] border border-white/5 rounded-xl p-8 md:p-12 space-y-10">
           
           <div className="flex flex-col md:flex-row gap-6">
              <div className="w-12 h-12 rounded bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                <Database className="w-5 h-5 text-gray-300" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white uppercase tracking-tight mb-2">What We Collect</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  We collect basic things like your email address and name when you sign up. We also keep track of the projects you build and the comments you post. We do this just so the website works normally for you!
                </p>
              </div>
           </div>

           <div className="flex flex-col md:flex-row gap-6">
              <div className="w-12 h-12 rounded bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                <ShieldAlert className="w-5 h-5 text-gray-300" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white uppercase tracking-tight mb-2">How We Keep It Safe</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Your passwords are mathematically scrambled (encrypted) before we save them. This means even we cannot see what your password is. We use strong cloud safety rules to block hackers from stealing your data.
                </p>
              </div>
           </div>

           <div className="flex flex-col md:flex-row gap-6">
              <div className="w-12 h-12 rounded bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                <Eye className="w-5 h-5 text-gray-300" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white uppercase tracking-tight mb-2">We Do Not Sell Your Data</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  We promise we will never sell your email or your personal information to advertising companies. The only people who see your public profile are the other developers and judges on this website.
                </p>
              </div>
           </div>

           <div className="border-t border-white/[0.05] pt-10 mt-10">
              <h3 className="text-lg font-bold text-white uppercase tracking-tight mb-4 text-center">Your Rights</h3>
              <p className="text-sm text-gray-400 leading-relaxed text-center max-w-lg mx-auto">
                You can ask us to delete your account and all your data at any time. If you want us to do this, just send an email to <span className="text-blue-500 font-bold">support@nxtgensec.com</span>. We will delete everything permanently.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
