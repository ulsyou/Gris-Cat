import { useMutation, useQueryClient } from '@tanstack/react-query'

import apiClient, { Product } from './productService'

const useDeleteProduct = () => {
  const queryClient = useQueryClient()

  return useMutation<Product, Error, number>({
    mutationFn: (productId) => apiClient.delete(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}
export default useDeleteProduct
