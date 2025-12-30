import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { create } from 'zustand'

export interface User {
  id: number
  name: string
  email: string
  cartId: number
  role: 'USER' | 'ADMIN'
}

export interface UserResponse {
  JWT: string
}

interface LoginRequest {
  email: string
  password: string
}

interface SignupRequest {
  email: string
  name: string
  password: string
}

interface AuthStore {
  user: User | null
  JWT: string | null
  login: (req: LoginRequest) => Promise<User>
  signup: (req: SignupRequest) => Promise<User>
  getUserByToken: () => User | null
  logout: () => void
}
const baseQueryURL = import.meta.env.VITE_BACKEND_DOMAIN

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  JWT: null,
  getUserByToken: () => {
    const token = sessionStorage.getItem('token')
    return token ? jwt_decode(token) : null
  },

  login: async (req: LoginRequest) => {
    try {
      const res = await axios.post<string>(baseQueryURL + '/api/login', req)

      const JWT = res.data

      sessionStorage.setItem('token', JWT)

      const user = jwt_decode<User>(JWT)

      set(() => ({ user }))
      set(() => ({ JWT }))

      return user
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.error || error.response?.data || error.message
        throw new Error(typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage))
      }
      throw error
    }
  },

  signup: async (req: SignupRequest) => {
    try {
      const res = await axios.post<string>(baseQueryURL + '/api/signup', req)

      const JWT = res.data
      sessionStorage.setItem('token', JWT)

      const user = jwt_decode<User>(JWT)

      set(() => ({ user }))
      set(() => ({ JWT }))

      return user
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.error || error.response?.data || error.message
        throw new Error(typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage))
      }
      throw error
    }
  },
  logout: () => {
    sessionStorage.removeItem('token')
    set(() => ({ user: null, JWT: null }))
  },
}))

export default useAuthStore
