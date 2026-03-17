'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Search, 
  Trash2, 
  Star, 
  RefreshCw,
  Reply,
  ShieldCheck,
  Clock,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

const AdminInbox = () => {
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  
  const messages = [
    { 
      id: 'm1', 
      sender: 'Vikas Sharma', 
      email: 'vikas@corp.com', 
      subject: 'Partnership Inquiry', 
      body: 'Hello team, we are interested in a long-term partnership for auditing our decentralized nodes. Let us know your availability for a call next week.',
      time: '10:45 AM',
      unread: true,
      tag: 'Partner'
    },
    { 
      id: 'm2', 
      sender: 'Sarah Thompson', 
      email: 'sarah.t@devbox.io', 
      subject: 'Issue with Registration API', 
      body: 'I am receiving a 401 Unauthorized error even with a valid JWT when calling the /register endpoint. Could you please check the RBAC middleware?',
      time: 'Yesterday',
      unread: false,
      tag: 'Support'
    },
    { 
      id: 'm3', 
      sender: 'John Doe', 
      email: 'john@security.com', 
      subject: 'Vulnerability Report', 
      body: 'Found a potential bypass in the OAuth flow. Attaching the PoC for your review. Please confirm receipt.',
      time: '2 days ago',
      unread: false,
      tag: 'Urgent'
    },
  ];

  return (
    <div className="h-[calc(100vh-80px)] flex flex-col space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold mb-0.5">Inbox</h1>
          <p className="text-xs text-gray-500 font-medium">Secured communications.</p>
        </div>
        <div className="flex bg-[#0c0c0c] border border-white/5 rounded-lg p-1 w-64">
          <input 
            type="text" 
            placeholder="Search threads..." 
            className="bg-transparent border-none focus:outline-none px-3 py-1.5 flex-grow text-white text-[11px]"
          />
          <button className="p-1.5 text-gray-500 hover:text-white transition-colors">
            <Search className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      <div className="flex-grow flex bg-[#0c0c0c] border border-white/5 rounded-lg overflow-hidden">
        {/* Inbox Sidebar */}
        <div className="w-[320px] border-r border-white/5 flex flex-col bg-white/[0.01]">
          <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
             <div className="flex items-center space-x-2">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
                <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400">Encrypted</span>
             </div>
             <button className="p-1.5 text-gray-600 hover:text-white transition-colors">
                <RefreshCw className="w-3 h-3" />
             </button>
          </div>
          
          <div className="flex-grow overflow-y-auto custom-scrollbar">
             {messages.map((msg) => (
                <div 
                  key={msg.id}
                  onClick={() => setSelectedMessage(msg)}
                  className={cn(
                    "p-4 cursor-pointer border-b border-white/[0.02] transition-all hover:bg-white/[0.02] relative",
                    selectedMessage?.id === msg.id ? "bg-white/[0.03]" : "",
                    msg.unread ? "after:absolute after:left-0 after:top-0 after:bottom-0 after:w-1 after:bg-blue-500" : "opacity-60"
                  )}
                >
                   <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-gray-200">{msg.sender}</span>
                      <span className="text-[9px] text-gray-600 font-medium">{msg.time}</span>
                   </div>
                   <h4 className={cn("text-[11px] mb-1 truncate", msg.unread ? "font-bold text-blue-400" : "font-medium text-gray-400")}>
                      {msg.subject}
                   </h4>
                   <p className="text-[10px] text-gray-600 line-clamp-1">{msg.body}</p>
                </div>
             ))}
          </div>
        </div>

        {/* Message Viewer */}
        <div className="flex-grow flex flex-col relative overflow-hidden bg-black/40">
           <AnimatePresence mode="wait">
              {selectedMessage ? (
                <motion.div
                  key={selectedMessage.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-grow flex flex-col p-8 h-full overflow-y-auto"
                >
                   <div className="flex items-center justify-between mb-8 pb-8 border-b border-white/[0.03]">
                      <div className="flex items-center space-x-4">
                         <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center font-bold text-lg text-gray-400">
                            {selectedMessage.sender[0]}
                         </div>
                         <div>
                            <h2 className="text-sm font-bold text-white uppercase tracking-tight">{selectedMessage.sender}</h2>
                            <p className="text-[10px] text-blue-500 font-mono">{selectedMessage.email}</p>
                         </div>
                      </div>
                      <div className="flex items-center space-x-2">
                         <button className="p-2 bg-white/5 border border-white/5 rounded-md hover:text-white text-gray-500 transition-all"><Star className="w-3.5 h-3.5" /></button>
                         <button className="p-2 bg-white/5 border border-white/5 rounded-md hover:text-white text-gray-500 transition-all"><Reply className="w-3.5 h-3.5" /></button>
                         <button className="p-2 bg-white/5 border border-white/5 rounded-md hover:text-red-400 text-gray-500 transition-all"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                   </div>

                   <div className="flex items-center space-x-2 mb-6 text-[9px] font-bold uppercase tracking-widest text-gray-600">
                      <Clock className="w-3 h-3" />
                      <span>{selectedMessage.time} via SecureGate</span>
                      <span className="px-1.5 py-0.5 bg-white/5 rounded text-gray-400">{selectedMessage.tag}</span>
                   </div>

                   <div className="bg-white/[0.01] border border-white/5 p-6 rounded-lg mb-8 min-h-[200px]">
                      <h3 className="text-sm font-bold mb-6 text-gray-200">{selectedMessage.subject}</h3>
                      <div className="text-xs text-gray-400 leading-relaxed whitespace-pre-wrap">
                         {selectedMessage.body}
                      </div>
                   </div>

                   <div className="mt-auto border-t border-white/5 pt-6">
                      <div className="relative group">
                        <textarea 
                          placeholder="Reply as Administrator..."
                          className="w-full bg-white/[0.02] border border-white/5 rounded-lg p-4 text-[11px] text-white focus:outline-none focus:border-blue-500/30 resize-none h-[80px]"
                        />
                        <button className="absolute bottom-3 right-3 p-2 bg-blue-600 rounded-md text-white hover:bg-blue-500 shadow-lg transition-all">
                           <Reply className="w-3.5 h-3.5" />
                        </button>
                      </div>
                   </div>
                </motion.div>
              ) : (
                <div className="flex-grow flex flex-col items-center justify-center text-center p-20 opacity-30">
                    <Mail className="w-8 h-8 text-gray-500 mb-4" />
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">Select Message</p>
                </div>
              )}
           </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AdminInbox;
