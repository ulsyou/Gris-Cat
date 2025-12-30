import { Box, Text } from '@chakra-ui/react'
import React from 'react'

interface Props {
  data: string
  title: string
}

const DashCard = ({ data, title }: Props) => {
  return (
    <Box
      bgColor="gray.200"
      p={{ base: 4, md: 5, lg: 6 }}
      minHeight={{ base: '120px', md: '138px', lg: '150px' }}
      borderRadius="8px"
      boxShadow="sm"
      _hover={{ boxShadow: 'md', transform: 'translateY(-2px)' }}
      transition="all 0.2s"
    >
      <Text
        fontWeight="600"
        fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}
        mb={2}
        color="black"
      >
        {data}
      </Text>
      <Text
        fontWeight="500"
        fontSize={{ base: 'md', md: 'xl', lg: 'lg' }}
        letterSpacing="0.2px"
        color="gray.600"
        mt={2}
      >
        {title}
      </Text>
    </Box>
  )
}

export default DashCard
