import { Box, SimpleGrid } from '@chakra-ui/react'
import React from 'react'

import BarChart from '../../components/UI-Components/charts/BarChart'
import DashCard from '../../components/UI-Components/DashCard'

const AdminDashboard = () => {
  return (
    <Box
      width="100%"
      maxW="full"
      padding={{ base: 2, md: 4, lg: 6, xl: 8 }}
    >
      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 2, lg: 4 }}
        spacing={{ base: 3, md: 4, lg: 5, xl: 6 }}
        width="100%"
        mb={{ base: 4, md: 6, lg: 8 }}
      >
        <DashCard title="Doanh thu hôm qua" data="$ 332.50" />
        <DashCard title="Doanh thu tháng này" data="$ 9120.30" />
        <DashCard title="Doanh thu năm nay" data="$ 39,123.42" />
        <DashCard title="Khách hàng đến" data="423" />
      </SimpleGrid>
      <Box
        width="100%"
        padding={{ base: 2, md: 4, lg: 6 }}
        bgColor="white"
        borderRadius="10px"
        boxShadow="sm"
        overflowX="auto"
      >
        <BarChart />
      </Box>
    </Box>
  )
}

export default AdminDashboard
