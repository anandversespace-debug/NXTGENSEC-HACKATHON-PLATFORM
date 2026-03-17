'use client';

import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, placeholder }) => {
  return (
    <div className="relative flex-grow group">
      <div className="absolute inset-y-0 left-0 pl-1 py-1 flex items-center pointer-events-none">
        <div className="w-8 h-8 rounded bg-[#0c0c0c] border border-white/5 flex items-center justify-center">
          <Search className="h-3.5 w-3.5 text-gray-600 transition-colors group-focus-within:text-blue-500" />
        </div>
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full bg-[#080808] border border-white/5 rounded-lg pl-12 pr-4 py-2.5 text-xs text-gray-300 font-bold uppercase tracking-tight placeholder:text-gray-700 focus:outline-none focus:border-blue-500/30 transition-all font-mono"
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchBar;
