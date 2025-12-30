import { Button } from '@chakra-ui/react'
import { GiHamburgerMenu } from 'react-icons/gi'

import useAdminLayoutStore from '../hooks/useAdminLayoutSore'

const HamburrgerButton = () => {
  const onToggle = useAdminLayoutStore((s) => s.onToggle)
  return (
    <Button
      width="64px"
      height="64px"
      bgColor="gray.100"
      className="nav-toggler"
      variant="link"
      onClick={onToggle}
      color="gray.800"
      _hover={{ bgColor: 'gray.200', color: 'primary.500' }}
    >
      <GiHamburgerMenu style={{ display: 'inline' }} size="24px" color="gray.800" />
    </Button>
  )
}

export default HamburrgerButton
