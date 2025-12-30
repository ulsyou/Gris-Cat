import { Box, Container, HStack } from '@chakra-ui/react'

import { ProductsTable } from '../../../components/products'
import CreateButton from '../../../components/Table/CreateButton'
import { SectionTitle } from '../../../components/UI-Components'

const AdminProductsPage = () => {
  return (
    <Container maxW={{ base: 'full', md: '6xl', lg: '7xl', xl: '8xl' }} px={{ base: 2, md: 4, lg: 6 }}>
      <SectionTitle title="Products" subtitle="" />
      <Box
        bgColor="#fff"
        paddingX={{ base: 3, md: 5, lg: 6 }}
        paddingY={{ base: 4, md: 6, lg: 8 }}
        width="100%"
        borderRadius="8px"
        boxShadow="sm"
      >
        <HStack justifyContent="flex-end" marginBottom={5}>
          <CreateButton title="Thêm +" to="createproduct" />
        </HStack>

        <ProductsTable />
      </Box>
    </Container>
  )
}

export default AdminProductsPage
