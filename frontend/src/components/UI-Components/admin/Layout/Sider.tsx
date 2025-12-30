import { Box, Button, HStack, Stack, Text } from '@chakra-ui/react'
import { IconType } from 'react-icons'
import {
  AiOutlineHome,
  AiOutlineShoppingCart,
} from 'react-icons/ai'
import { BsCollection, BsBox } from 'react-icons/bs'
import { FiUsers } from 'react-icons/fi'
import { Link } from 'react-router-dom'

import useAdminLayoutStore from '../hooks/useAdminLayoutSore'

export interface IMenu {
  openKeys: string[]
  selectedKey: string
}

const menus = [
  {
    key: '/admin',
    title: 'Tổng quan',
    Icon: AiOutlineHome,
  },
  {
    key: '/admin/collections',
    title: 'Collections',
    Icon: BsCollection,
  },
  {
    key: '/admin/products',
    title: 'Sản phẩm',
    Icon: BsBox,
  },
  {
    key: '/admin/orders',
    title: 'Đơn hàng',
    Icon: AiOutlineShoppingCart,
  },
  {
    key: '/admin/users',
    title: 'Người dùng',
    Icon: FiUsers,
  },
]

const Sider = (): JSX.Element => {
  const isOpen = useAdminLayoutStore((s) => s.isOpen)
  return (
    <Stack
      padding={{ base: '20px 0 16px 0', md: '20px 0 20px 0' }}
      paddingX={0}
      height="100%"
      as="nav"
      aria-labelledby="nested-list-subheader"
      bgColor="gray.100"
      gap={isOpen ? { base: '0.5rem', md: '0.75rem' } : '1rem'}
    >
      {menus.map((item) => (
        <MenuItem key={item.key} item={item} isOpen={isOpen} />
      ))}
    </Stack>
  )
}

type MenuItem = {
  key: string
  title: string
  Icon: IconType
}
interface IMenuItem {
  item: MenuItem
  isOpen: boolean
}

const MenuItem = ({ item, isOpen }: IMenuItem) => {
  const { key, Icon, title } = item

  return (
    <Button
      as={Link}
      to={key}
      bgColor="gray.100"
      _hover={{ bgColor: 'gray.200', color: 'primary.500' }}
      color="gray.800"
    >
      <Stack
        key={key}
        direction={isOpen ? 'row' : 'column'}
        width={isOpen ? '180px' : '64px'}
        justifyContent={isOpen ? 'start' : 'center'}
        columnGap={5}
        alignItems="center"
        pl={isOpen ? { base: 3, md: 4 } : 0}
      >
        {Icon && (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="20px"
            width="20px"
            flexShrink={0}
          >
            <Icon
              style={{ display: 'block' }}
              className="item-icon"
              size={20}
            />
          </Box>
        )}

        {isOpen && (
          <Text
            fontSize={{ base: '14px', md: '15px', lg: '16px' }}
            fontWeight={400}
            overflow="ellipsis"
            maxWidth="100%"
            lineHeight="20px"
            height="20px"
            color="gray.800"
            display="flex"
            alignItems="center"
            margin={0}
            padding={0}
          >
            {title}
          </Text>
        )}
      </Stack>
    </Button>
  )
}

export default Sider
