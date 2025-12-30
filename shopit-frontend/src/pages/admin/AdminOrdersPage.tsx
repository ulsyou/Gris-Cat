import { Box, Container } from '@chakra-ui/react'

import { OrdersTable } from '../../components/orders'
import { SectionTitle } from '../../components/UI-Components'

const AdminOrdersPage = () => {
  return (
    <Container maxW={{ base: 'full', md: '6xl', lg: '7xl', xl: '8xl' }} px={{ base: 2, md: 4, lg: 6 }}>
      <SectionTitle title="Orders" subtitle="" />
      <Box
        bgColor="#fff"
        paddingX={{ base: 3, md: 5, lg: 6 }}
        paddingY={{ base: 4, md: 6, lg: 8 }}
        borderRadius="8px"
        boxShadow="sm"
      >
        <OrdersTable />
      </Box>
    </Container>
  )
}

export default AdminOrdersPage
