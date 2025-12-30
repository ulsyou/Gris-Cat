import { Heading, HStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import HamburrgerButton from './Layout/HamburrgerButton'

const AdminNavMenu = (): JSX.Element => {
  return (
    <HStack
      justifyContent="space-between"
      bgColor="gray.100"
      pl={0}
      pr={{ base: 2, md: 4, lg: 6 }}
      height="64px"
      boxShadow="sm"
    >
      <HStack width={{ base: '240px', md: '280px' }} alignItems="center" pl={0}>
        <HamburrgerButton />

        <Heading
          as={Link}
          to={'/'}
          display="inline"
          className="branding-text"
          variant="h3"
          whiteSpace="nowrap"
          bgColor="gray.100"
          color="gray.800"
          fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
        >
          Gris Cat
        </Heading>
      </HStack>

      {/* <AccountMenu /> */}
    </HStack>
  )
}

export default AdminNavMenu
