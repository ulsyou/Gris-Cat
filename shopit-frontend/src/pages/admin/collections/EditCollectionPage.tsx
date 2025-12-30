import { Container, Spinner } from '@chakra-ui/react'
import React from 'react'
import { useParams } from 'react-router-dom'

import EditCollectionForm from '../../../components/collections/components/EditCollectionForm'
import useCollection from '../../../components/collections/hooks/useCollection'

const EditCollectionPage = () => {
  const { collectionId } = useParams()
  const { data: collection, isLoading, error } = useCollection(collectionId!)

  if (isLoading) return <Spinner />
  if (error || !collection) throw error

  return (
    <Container maxW="8xl">
      <EditCollectionForm collection={collection} />
    </Container>
  )
}

export default EditCollectionPage

