import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

import { Order } from './orderService'

const useDeleteOrder = () => {
  const queryClient = useQueryClient()

  return useMutation<Order, Error, number>({
    mutationFn: (orderId: number) =>
      axios
        .delete<Order>(`${import.meta.env.VITE_BACKEND_DOMAIN}/api/orders/${orderId}`)
        .then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] })
    },
  })
}

export default useDeleteOrder

