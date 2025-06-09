import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserType = 'industry' | 'professor' | 'student' | 'admin';

export interface User {
  id: string;
  fullName: string;
  email: string;
  mobile: string;
  userType: UserType;
  profilePictureUrl?: string;
  bio?: string;
  skills?: string[];
  isVerified: boolean;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
      updateUser: (updates) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),
    }),
    {
      name: 'auth-storage',
    }
  )
);