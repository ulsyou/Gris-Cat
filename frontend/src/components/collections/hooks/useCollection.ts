import { useQuery } from '@tanstack/react-query'
import ms from 'ms'

import APIClient from '../../../services/api-client'
import useCollections from './useCollections'

const apiClient = new APIClient<Collection>('/api/collections')

const useCollection = (collectionId: number | string) => {
  return useQuery({
    queryKey: ['collection', collectionId],
    queryFn: () => apiClient.get(collectionId),
    staleTime: ms('5m'),
    enabled: !!collectionId,
  })
}

const useCollectionBySlug = (collectionSlug: string) => {
  const { data: collections } = useCollections()
  return (
    collections?.find((collection) => collection.slug === collectionSlug) ||
    null
  )
}

export default useCollection
export { useCollectionBySlug }
