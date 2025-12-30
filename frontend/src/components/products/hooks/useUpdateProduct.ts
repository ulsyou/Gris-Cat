import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

import { Product, UpdateProduct } from './productService'
export interface CreateProductContext {
  previousProducts: Product[]
}

const useUpdateProduct = (onUpdate: () => void, productId: number) => {
  const queryClient = useQueryClient()

  return useMutation<Product, Error, UpdateProduct>({
    mutationFn: (createProductData: UpdateProduct) =>
      axios
        .put<Product>(
          `${import.meta.env.VITE_BACKEND_DOMAIN}/api/products/${productId}`,
          createProductData
        )
        .then((res) => res.data),
    onSuccess: (savedProduct) => {
      // Optimistically update the cache with the returned data
      if (savedProduct?.slug) {
        queryClient.setQueryData(['products', savedProduct.slug], savedProduct)
      }
      // Invalidate all product queries to refresh the data
      queryClient.invalidateQueries({ queryKey: ['products'] })
      // Invalidate the specific product query if we have the slug
      if (savedProduct?.slug) {
        queryClient.invalidateQueries({ queryKey: ['products', savedProduct.slug] })
      }
      onUpdate()
    },
  })
}
export default useUpdateProduct
