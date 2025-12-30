import { HStack, IconButton, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { AiOutlineUser } from 'react-icons/ai'
import { FiLogOut, FiUser } from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom'

import { CartDrawer } from '../../cart'
import useAuthStore from '../../user/useAuthStore'

const NavBanner = () => {
  const getUserByToken = useAuthStore((u) => u.getUserByToken)
  const logout = useAuthStore((u) => u.logout)
  const navigate = useNavigate()

  const currentUser = getUserByToken()
  console.log('currentUser', currentUser)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <NavBannerContainer>
      <PromotionInsentive />

      <HStack width="120px" color="#fff" spacing={4}>
        {currentUser ? (
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<AiOutlineUser />}
              variant="ghost"
              color="#fff"
              _hover={{ bgColor: 'rgba(255, 255, 255, 0.1)' }}
              _active={{ bgColor: 'rgba(255, 255, 255, 0.1)' }}
              aria-label="User menu"
            />
            <MenuList>
              <MenuItem as={Link} to="/userprofile" icon={<FiUser />}>
                Hồ sơ
              </MenuItem>
              <MenuItem icon={<FiLogOut />} onClick={handleLogout}>
                Đăng xuất
              </MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <Link to="/login">
            <AiOutlineUser />
          </Link>
        )}
      </HStack>
    </NavBannerContainer>
  )
}

const NavBannerContainer = ({ children }: { children: ReactNode }) => {
  return (
    <HStack
      width="100%"
      height="34px"
      backgroundColor="#000"
      justifyContent="space-between"
    >
      {children}
    </HStack>
  )
}

const PromotionInsentive = () => {
  return (
    <Text
      width="100%"
      textAlign="center"
      textTransform="uppercase"
      color="#fff"
      fontWeight="500"
      paddingY={1}
      fontSize="sm"
    >
      Quảng cáo nằm ở đây
    </Text>
  )
}

export default NavBanner
