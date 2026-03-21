'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Github, 
  Globe, 
  Code2, 
  Save,
  Twitter,
  Linkedin,
  MapPin,
  Cpu
} from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';

export default function DashboardProfilePage() {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    username: user?.username || '',
    bio: user?.bio || '',
    location: user?.location || '',
    github: user?.github || '',
    twitter: user?.twitter || '',
    portfolio: user?.portfolio || '',
    skills: Array.isArray(user?.skills) ? user.skills.join(', ') : (user?.skills || ''),
    picture: user?.picture || user?.avatar_url || ''
  });

  // Sync with store once user is loaded
  React.useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.name || '',
        username: user.username || '',
        bio: user.bio || '',
        location: user.location || '',
        github: user.github || '',
        twitter: user.twitter || '',
        portfolio: user.portfolio || '',
        skills: Array.isArray(user.skills) ? user.skills.join(', ') : (user.skills || ''),
        picture: user.picture || user.avatar_url || ''
      });
    }
  }, [user]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setUploading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const fd = new FormData();
      fd.append('file', file);
      
      const res = await fetch(`${baseUrl}/uploads/single`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        credentials: 'include',
        body: fd
      });
      
      const data = await res.json();
      if (res.ok && data.url) {
        setFormData(prev => ({ ...prev, picture: data.url }));
        // Also update backend immediately to persist profile pic change if user wants
        // Or wait for save. Waiting for save is better.
      } else {
        setError('Image upload failed.');
      }
    } catch (err) {
      console.error(err);
      setError('Upload failed.');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const token = localStorage.getItem('token');
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      
      const payload = {
        ...formData,
        name: formData.fullName,
        skills: formData.skills.split(',').map((s: string) => s.trim()).filter((s: string) => s !== '')
      };

      const res = await fetch(`${baseUrl}/users/${user?.id || user?._id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include',
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const updatedUser = await res.json();
        setUser(updatedUser);
        alert('Profile updated successfully.');
      } else {
        alert('Failed to update profile.');
      }
    } catch (err) {
      console.error(err);
      alert('Error saving profile.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="space-y-6 pb-12">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold mb-0.5">Edit Profile</h1>
          <p className="text-xs text-gray-400 font-medium tracking-tight">Update your personal details and social links.</p>
        </div>
      </header>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
         {/* Profile Preview */}
         <div className="lg:col-span-1 space-y-6">
            <div className="bg-[#0c0c0c] border border-white/5 rounded-xl p-8 text-center relative overflow-hidden group">
               <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-500 to-indigo-500"></div>
               
               <div className="w-24 h-24 mx-auto bg-[#050505] border border-white/10 rounded-2xl flex items-center justify-center mb-6 relative group-hover:border-blue-500/50 transition-colors overflow-hidden">
                  {formData.picture ? (
                    <img src={formData.picture} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-10 h-10 text-gray-500 group-hover:scale-110 transition-transform duration-500" />
                  )}
                  {uploading && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                       <Cpu className="w-5 animate-spin text-blue-500" />
                    </div>
                  )}
               </div>

               <h2 className="text-lg font-black italic uppercase text-white mb-1 tracking-tight truncate">{formData.fullName}</h2>
               <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest font-mono">@{formData.username}</p>
               
               <div className="mt-8 flex flex-col items-center border-t border-white/[0.03] pt-6">
                  <label className="cursor-pointer text-[9px] font-bold text-gray-400 border border-white/10 px-6 py-2.5 rounded-lg bg-white/[0.02] hover:bg-blue-600/10 hover:border-blue-500/20 hover:text-blue-500 transition-all uppercase tracking-widest italic">
                    {uploading ? 'Processing...' : 'Upload Signal'}
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploading} />
                  </label>
                  {error && <p className="text-[8px] text-red-500 mt-2 font-black uppercase tracking-widest">{error}</p>}
               </div>
            </div>
         </div>

         {/* Profile Settings */}
         <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#0c0c0c] border border-white/5 rounded-xl p-8 md:p-10">
               <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-6 border-b border-white/[0.03] pb-4 flex items-center">
                 <User className="w-3.5 h-3.5 mr-2" /> Basic Info
               </h3>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2 block ml-1">Full Name</label>
                    <input 
                      type="text" 
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full bg-[#050505] border border-white/10 rounded-lg py-3 px-4 text-xs font-bold text-white focus:outline-none focus:border-blue-500/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2 block ml-1">Username</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 font-mono text-xs">@</span>
                      <input 
                        type="text" 
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full bg-[#050505] border border-white/10 rounded-lg py-3 pl-8 pr-4 text-xs font-mono text-gray-300 focus:outline-none focus:border-blue-500/50 transition-colors"
                      />
                    </div>
                  </div>
               </div>

               <div className="mb-8">
                  <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2 block ml-1">Bio</label>
                  <textarea 
                    name="bio"
                    rows={4}
                    value={formData.bio}
                    onChange={handleChange}
                    className="w-full bg-[#050505] border border-white/10 rounded-lg py-3 px-4 text-xs font-medium text-gray-300 focus:outline-none focus:border-blue-500/50 transition-colors resize-none leading-relaxed"
                  />
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center ml-1"><MapPin className="w-3 h-3 mr-1" /> Location</label>
                    <input 
                      type="text" 
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full bg-[#050505] border border-white/10 rounded-lg py-3 px-4 text-xs text-gray-300 focus:outline-none focus:border-blue-500/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center ml-1"><Code2 className="w-3 h-3 mr-1" /> Skills (Comma Separated)</label>
                    <input 
                      type="text" 
                      name="skills"
                      value={formData.skills}
                      onChange={handleChange}
                      className="w-full bg-[#050505] border border-white/10 rounded-lg py-3 px-4 text-xs font-mono text-blue-400 focus:outline-none focus:border-blue-500/50 transition-colors"
                    />
                  </div>
               </div>

               <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-6 border-b border-white/[0.03] pb-4 flex items-center mt-12">
                 <Globe className="w-3.5 h-3.5 mr-2" /> Social Links
               </h3>

               <div className="space-y-4">
                  <div className="relative">
                    <Github className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input 
                      type="url" 
                      name="github"
                      value={formData.github}
                      onChange={handleChange}
                      placeholder="https://github.com/your-username"
                      className="w-full bg-[#050505] border border-white/10 rounded-lg py-3 pl-12 pr-4 text-xs font-mono text-gray-400 focus:outline-none focus:border-blue-500/50 transition-colors"
                    />
                  </div>
                  <div className="relative">
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input 
                      type="url" 
                      name="portfolio"
                      value={formData.portfolio}
                      onChange={handleChange}
                      placeholder="https://your-portfolio.com"
                      className="w-full bg-[#050505] border border-white/10 rounded-lg py-3 pl-12 pr-4 text-xs font-mono text-gray-400 focus:outline-none focus:border-blue-500/50 transition-colors"
                    />
                  </div>
                  <div className="relative">
                    <Twitter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input 
                      type="url" 
                      name="twitter"
                      value={formData.twitter}
                      onChange={handleChange}
                      placeholder="https://twitter.com/your-username"
                      className="w-full bg-[#050505] border border-white/10 rounded-lg py-3 pl-12 pr-4 text-xs font-mono text-gray-400 focus:outline-none focus:border-blue-500/50 transition-colors"
                    />
                  </div>
               </div>

               <div className="mt-10 flex justify-end">
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="btn-primary py-3 px-8 text-xs font-bold uppercase tracking-widest flex items-center space-x-2 disabled:opacity-50"
                  >
                     {loading ? <span className="animate-pulse">Saving...</span> : <><span>Save Changes</span> <Save className="w-3.5 h-3.5" /></>}
                  </button>
               </div>
            </div>
         </div>
      </form>
    </div>
  );
}
