import { Box, Button, Container, HStack, Icon } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { AiOutlinePlus } from 'react-icons/ai'

import CollectionsTable from '../../../components/collections/CollectionsTable'
import { SectionTitle } from '../../../components/UI-Components'

const AdminCollectionsPage = () => {
  return (
    <Container maxW={{ base: 'full', md: '6xl', lg: '7xl', xl: '8xl' }} px={{ base: 2, md: 4, lg: 6 }}>
      <SectionTitle title="Collections" subtitle="" />
      <Box
        bgColor="#fff"
        paddingX={{ base: 3, md: 5, lg: 6 }}
        paddingY={{ base: 4, md: 6, lg: 8 }}
        borderRadius="8px"
        boxShadow="sm"
      >
        <HStack justifyContent="flex-end" marginBottom={5}>
          <Button as={Link} to="createcollection" leftIcon={<Icon as={AiOutlinePlus} />} colorScheme="blue">
            Thêm
          </Button>
        </HStack>

        <CollectionsTable />
      </Box>
    </Container>
  )
}

export default AdminCollectionsPage
