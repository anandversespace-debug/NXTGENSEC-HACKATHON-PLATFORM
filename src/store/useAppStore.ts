import { create } from 'zustand';
import { Project, Hackathon, UserProfile } from '@/types';

// Extended Blog Type
export interface BlogEntry {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  author_id: string;
  author_name: string;
  created_at: string;
  image: string;
}

interface AppState {
  // Auth State
  user: UserProfile | null;
  isAuthenticated: boolean;
  role: 'admin' | 'judge' | 'developer' | 'viewer';
  
  // Data State
  projects: Project[];
  selectedProject: Project | null;
  hackathons: Hackathon[];
  selectedHackathon: Hackathon | null;
  blogs: BlogEntry[];
  selectedBlog: BlogEntry | null;
  profiles: UserProfile[];
  
  // UI State
  loading: boolean;
  searchQuery: string;
  filters: any;
  
  // Actions
  setUser: (user: UserProfile | null) => void;
  setProjects: (projects: Project[]) => void;
  setSelectedProject: (project: Project | null) => void;
  setHackathons: (hackathons: Hackathon[]) => void;
  setSelectedHackathon: (hackathon: Hackathon | null) => void;
  setBlogs: (blogs: BlogEntry[]) => void;
  setSelectedBlog: (blog: BlogEntry | null) => void;
  setLoading: (loading: boolean) => void;
  setSearchQuery: (query: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  isAuthenticated: false,
  role: 'viewer',
  
  projects: [],
  selectedProject: null,
  hackathons: [],
  selectedHackathon: null,
  blogs: [],
  selectedBlog: null,
  profiles: [],
  
  loading: false,
  searchQuery: '',
  filters: {},
  
  setUser: (user) => set({ 
    user, 
    isAuthenticated: !!user, 
    role: user?.role || 'viewer' 
  }),
  setProjects: (projects) => set({ projects }),
  setSelectedProject: (project) => set({ selectedProject: project }),
  setHackathons: (hackathons) => set({ hackathons }),
  setSelectedHackathon: (hackathon) => set({ selectedHackathon: hackathon }),
  setBlogs: (blogs) => set({ blogs }),
  setSelectedBlog: (blog) => set({ selectedBlog: blog }),
  setLoading: (loading) => set({ loading }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
}));
