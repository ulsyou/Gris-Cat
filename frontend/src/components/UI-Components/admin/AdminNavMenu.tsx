import { Button, Heading, HStack, Text } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import { FiLogOut } from 'react-icons/fi'

import useAuthStore from '../../user/useAuthStore'
import HamburrgerButton from './Layout/HamburrgerButton'

const AdminNavMenu = (): JSX.Element => {
  const logout = useAuthStore((state) => state.logout)
  const getUserByToken = useAuthStore((state) => state.getUserByToken)
  const navigate = useNavigate()
  const user = getUserByToken()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

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

      <HStack spacing={4} alignItems="center">
        {user && (
          <Text color="gray.800" fontSize="sm" display={{ base: 'none', md: 'block' }}>
            {user.name}
          </Text>
        )}
        <Button
          leftIcon={<FiLogOut />}
          onClick={handleLogout}
          colorScheme="gray"
          variant="outline"
          size="sm"
          color="gray.800"
          _hover={{ bgColor: 'gray.200', borderColor: 'gray.400' }}
        >
          Logout
        </Button>
      </HStack>
    </HStack>
  )
}

export default AdminNavMenu
