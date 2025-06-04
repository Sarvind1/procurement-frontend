import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { api } from '@/lib/api'
import { User, LoginCredentials, AuthResponse } from '@/types'

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => void
  checkAuth: () => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (credentials) => {
        set({ isLoading: true })
        try {
          // For demo purposes, accept hardcoded credentials
          if (
            (credentials.username === 'admin' && credentials.password === 'admin123') ||
            (credentials.username === 'user' && credentials.password === 'user123')
          ) {
            const mockToken = 'mock-jwt-token-' + Date.now()
            const mockUser: User = {
              id: 1,
              username: credentials.username,
              email: credentials.username + '@example.com',
              is_active: true,
              is_superuser: credentials.username === 'admin',
              created_at: new Date().toISOString(),
            }
            
            set({ 
              token: mockToken, 
              user: mockUser,
              isAuthenticated: true,
              isLoading: false 
            })
            return
          }
          
          const { data } = await api.post<AuthResponse>('/auth/login', credentials)
          const { access_token } = data
          
          // Set token in store
          set({ token: access_token, isAuthenticated: true })
          
          // Get user data
          const userResponse = await api.get('/auth/me')
          set({ user: userResponse.data, isLoading: false })
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false })
      },

      checkAuth: async () => {
        const token = useAuthStore.getState().token
        if (!token) {
          set({ isAuthenticated: false })
          return
        }

        try {
          const { data } = await api.get('/auth/me')
          set({ user: data, isAuthenticated: true })
        } catch (error) {
          set({ user: null, token: null, isAuthenticated: false })
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ token: state.token }),
    }
  )
)