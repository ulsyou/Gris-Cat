import { useQuery } from '@tanstack/react-query'
import ms from 'ms'

import APIClient from '../../../services/api-client'

export interface Address {
  street: string
  city: string
  state: string
  country: string
  postalCode: string
  userId: number
}

export interface User {
  id: number
  email: string
  name: string
  role: 'USER' | 'ADMIN'
  createdAt: string
  updatedAt: string
  Address?: Address[]
}

const apiClient = new APIClient<User>('/user')

const useUsers = () =>
  useQuery({
    queryKey: ['users'],
    queryFn: () => apiClient.getAll({}),
    staleTime: ms('5m'),
  })

export default useUsers

