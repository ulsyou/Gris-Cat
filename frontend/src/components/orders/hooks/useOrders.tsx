import { useQuery } from '@tanstack/react-query'
import ms from 'ms'

import apiClient, { Order } from './orderService'

const useOrders = () => {
  return useQuery<Order[], Error>({
    queryKey: ['orders'],
    queryFn: () => apiClient.getAll({}),
    staleTime: ms('2h'),
  })
}

export default useOrders

