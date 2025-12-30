import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

import { CreateCollection } from './useCreateCollection'

interface IUseUpdateCollection {
  onUpdate: () => void
  onError?: (error: Error) => void
}

const useUpdateCollection = (onUpdate: () => void, collectionId: number) => {
  const queryClient = useQueryClient()

  return useMutation<Collection, Error, CreateCollection>({
    mutationFn: (updateCollectionData: CreateCollection) =>
      axios
        .put<Collection>(
          `${import.meta.env.VITE_BACKEND_DOMAIN}/api/collections/${collectionId}`,
          updateCollectionData
        )
        .then((res) => res.data),
    onSuccess: (savedCollection) => {
      // Optimistically update the cache with the returned data
      queryClient.setQueryData(['collection', collectionId], savedCollection)
      // Invalidate all collection queries to refresh the data
      queryClient.invalidateQueries({ queryKey: ['collections2'] })
      queryClient.invalidateQueries({ queryKey: ['collection', collectionId] })
      onUpdate()
    },
  })
}
export default useUpdateCollection

