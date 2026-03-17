'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/mail/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message })
      });
      if (res.ok) {
        setSent(true);
      }
    } catch(err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 bg-[#050505]">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center">
          <h1 className="text-3xl font-black italic uppercase tracking-tight mb-4 text-white">Contact Us</h1>
          <p className="text-gray-400 max-w-lg mx-auto leading-relaxed">
            Have a question or need help? Send us a message and our team will get back to you as soon as possible. We use simple English to make sure everyone understands.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="bg-[#0c0c0c] border border-white/5 rounded-xl p-8 space-y-8">
            <div>
               <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6">Our Information</h3>
               
               <div className="space-y-6">
                 <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded bg-white/5 border border-white/5 flex items-center justify-center">
                       <Mail className="w-4 h-4 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Email Support</p>
                      <p className="text-sm font-bold text-white">support@nxtgensec.com</p>
                    </div>
                 </div>
                 
                 <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded bg-white/5 border border-white/5 flex items-center justify-center">
                       <Phone className="w-4 h-4 text-emerald-500" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Phone Number</p>
                      <p className="text-sm font-bold text-white">+1 (800) 123-4567</p>
                    </div>
                 </div>

                 <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded bg-white/5 border border-white/5 flex items-center justify-center">
                       <MapPin className="w-4 h-4 text-amber-500" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Office Location</p>
                      <p className="text-sm font-bold text-white leading-relaxed">
                        123 Security Blvd<br />
                        Tech District, CA 94103
                      </p>
                    </div>
                 </div>
               </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-[#0c0c0c] border border-white/5 rounded-xl p-8">
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6">Send A Message</h3>
            
            {sent ? (
               <motion.div 
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-center"
               >
                 <ShieldCheck className="w-10 h-10 text-emerald-500 mx-auto mb-4" />
                 <h4 className="text-lg font-bold text-emerald-500 mb-2">Message Received</h4>
                 <p className="text-xs text-gray-400 leading-relaxed">Thank you for reaching out! We will review your message and reply to your email soon.</p>
               </motion.div>
            ) : (
               <form onSubmit={handleSubmit} className="space-y-4">
                 <div>
                   <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-2">Your Name</label>
                   <input value={name} onChange={(e) => setName(e.target.value)} type="text" required className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-blue-500 focus:outline-none transition-colors" placeholder="John Doe" />
                 </div>
                 
                 <div>
                   <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-2">Your Email</label>
                   <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-blue-500 focus:outline-none transition-colors" placeholder="email@example.com" />
                 </div>

                 <div>
                   <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-2">Your Message</label>
                   <textarea value={message} onChange={(e) => setMessage(e.target.value)} required rows={4} className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-blue-500 focus:outline-none transition-colors resize-none" placeholder="How can we help you today?"></textarea>
                 </div>

                 <button type="submit" disabled={loading} className="w-full py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-lg font-bold text-xs uppercase tracking-widest transition-colors flex items-center justify-center space-x-2 mt-4">
                   <Send className="w-4 h-4" />
                   <span>{loading ? 'Sending...' : 'Submit Message'}</span>
                 </button>
               </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
