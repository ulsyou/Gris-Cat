import { useQuery } from '@tanstack/react-query'
import ms from 'ms'

import APIClient from '../../../services/api-client'

const apiClient = new APIClient<Collection>('/api/collections')

const useCollections = () =>
  useQuery({
    queryKey: ['collections2'],
    queryFn: () => apiClient.getAll({}),
    staleTime: ms('5m'),
  })

export default useCollections
