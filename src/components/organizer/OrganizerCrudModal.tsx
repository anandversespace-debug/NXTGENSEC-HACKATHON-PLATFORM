'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Trash2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OrganizerCrudModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  onSave?: () => void;
  onDelete?: () => void;
  children: React.ReactNode;
  loading?: boolean;
  deleteLabel?: string;
  saveLabel?: string;
}

export const OrganizerCrudModal = ({
  isOpen,
  onClose,
  title,
  subtitle,
  onSave,
  onDelete,
  children,
  loading = false,
  deleteLabel = "Delete Node",
  saveLabel = "Commit Changes"
}: OrganizerCrudModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12 overflow-y-auto overflow-x-hidden">
          {/* Overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#050505]/70 backdrop-blur-md cursor-crosshair"
          />
          
          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="w-full max-w-xl bg-[#0c0c0c] border border-white/5 rounded-3xl shadow-[0_0_80px_rgba(59,130,246,0.1)] relative overflow-hidden flex flex-col max-h-screen z-10"
          >
            {/* Header */}
            <header className="p-8 border-b border-white/[0.03] flex items-center justify-between relative bg-white/[0.01]">
                <div className="space-y-1 text-left">
                   <div className="flex items-center space-x-2">
                       <AlertCircle className="w-3.5 h-3.5 text-blue-500" />
                       <span className="text-[9px] font-black uppercase tracking-widest text-gray-700 italic font-mono">Operations Module</span>
                   </div>
                   <h2 className="text-xl font-black italic uppercase tracking-tighter text-white">{title}</h2>
                   <p className="text-[9px] text-gray-600 font-bold uppercase tracking-widest italic">{subtitle}</p>
                </div>
                <button 
                  onClick={onClose}
                  className="p-3 bg-white/5 border border-white/10 rounded-2xl text-gray-600 hover:text-white transition-all shadow-xl active:scale-95"
                >
                   <X className="w-5 h-5" />
                </button>
            </header>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar text-left font-mono text-[10px] uppercase text-gray-500 tracking-widest leading-relaxed italic">
               {children}
            </div>

            {/* Footer Actions */}
            <footer className="p-8 border-t border-white/[0.03] flex flex-col sm:flex-row items-center justify-between gap-6 bg-white/[0.01]">
               <div className="flex w-full sm:w-auto items-center space-x-4">
                  {onDelete && (
                    <button 
                      onClick={onDelete}
                      disabled={loading}
                      className="px-6 py-4 bg-red-600/10 border border-red-600/20 text-red-500 rounded-2xl text-[9px] font-black uppercase tracking-widest italic hover:bg-red-600 hover:text-white transition-all shadow-xl active:scale-95 flex items-center space-x-3 group"
                    >
                       <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                       <span>{deleteLabel}</span>
                    </button>
                  )}
               </div>
               
               <div className="flex w-full sm:w-auto items-center space-x-4">
                  <button 
                    onClick={onClose}
                    className="flex-1 sm:flex-none px-6 py-4 text-gray-700 text-[9px] font-black uppercase tracking-widest italic hover:text-gray-400 transition-all font-bold"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={onSave}
                    disabled={loading}
                    className="flex-1 sm:flex-none px-10 py-4 bg-blue-600 text-white rounded-2xl text-[9px] font-black uppercase tracking-widest italic shadow-xl shadow-blue-500/20 hover:bg-blue-500 transition-all active:scale-95 flex items-center justify-center space-x-3 group"
                  >
                     {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4 group-focus-within:scale-110 transition-transform" />}
                     <span>{loading ? 'Disseminating...' : saveLabel}</span>
                  </button>
               </div>
            </footer>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
