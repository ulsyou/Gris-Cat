import { Container } from '@chakra-ui/react'
import React from 'react'

import CreateCollectionForm from '../../../components/collections/components/CreateCollectionForm'

const CreateCollectionPage = () => {
  return (
    <Container maxW="8xl">
      <CreateCollectionForm />
    </Container>
  )
}

export default CreateCollectionPage
