import { create } from 'zustand';
import { UserProfile } from '@/types';

interface AuthState {
  user: UserProfile | null;
  role: 'admin' | 'judge' | 'developer' | 'viewer' | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: UserProfile | null) => void;
  setLoading: (isLoading: boolean) => void;
  logout: () => void;
  updateRole: (role: 'admin' | 'judge' | 'developer' | 'viewer' | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  role: null,
  isAuthenticated: false,
  isLoading: true,
  setUser: (user) => set({ 
    user, 
    role: user?.role || null,
    isAuthenticated: !!user, 
    isLoading: false 
  }),
  setLoading: (isLoading) => set({ isLoading }),
  logout: () => set({ user: null, role: null, isAuthenticated: false, isLoading: false }),
  updateRole: (role) => set((state) => ({ 
    role, 
    user: state.user && role ? { ...state.user, role } : state.user 
  })),
}));
