import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

export interface CreateCollection {
  title: string
  slug: string
  description: string
  thumbnail: string
}

export interface CreateCollectionContext {
  previousCollections: Collection[]
}

interface IUseCreateCollection {
  onAdd: (newCollection: CreateCollection) => void
  onError: (error: Error) => void
}

const useCreateCollection = ({ onAdd, onError }: IUseCreateCollection) => {
  const queryClient = useQueryClient()

  return useMutation<Collection, Error, CreateCollection>({
    mutationFn: (createCollectionData: CreateCollection) =>
      axios
        .post<Collection>(
          `${import.meta.env.VITE_BACKEND_DOMAIN}/api/collections`,
          createCollectionData
        )
        .then((res) => res.data),
    onSuccess: (savedCollection, newCollection) => {
      onAdd(newCollection)
      queryClient.invalidateQueries({ queryKey: ['collections2'] })
    },
    onError: (error, variables, context) => {
      onError(error)
    },
  })
}
export default useCreateCollection

