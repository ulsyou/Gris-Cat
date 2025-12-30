import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

const useDeleteCollection = () => {
  const queryClient = useQueryClient()

  return useMutation<Collection, Error, number>({
    mutationFn: (collectionId: number) =>
      axios
        .delete<Collection>(
          `${import.meta.env.VITE_BACKEND_DOMAIN}/api/collections/${collectionId}`
        )
        .then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collections2'] })
    },
  })
}
export default useDeleteCollection

