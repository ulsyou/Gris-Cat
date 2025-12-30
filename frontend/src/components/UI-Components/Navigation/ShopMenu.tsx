import { Box, Button, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react'
import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

const ShopMenu = () => {
  const location = useLocation()
  const isProductsPage = location.pathname.startsWith('/products')
  const [isOpen, setIsOpen] = useState(false)
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)

  // Shop submenu items in Vietnamese
  const shopCategories = [
    {
      title: 'READY TO WEAR',
      key: 'ready-to-wear',
      items: [
        { title: 'Xem tất cả', link: '/products' },
        { title: 'Áo khoác', link: '/products?category=outwears' },
        { title: 'Váy', link: '/products?category=dresses' },
        { title: 'Áo', link: '/products?category=tops' },
        { title: 'Chân váy', link: '/products?category=skirts' },
        { title: 'Quần', link: '/products?category=pants' },
        { title: 'Đồ ở nhà', link: '/products?category=loungewear' },
      ],
    },
  ]

  return (
    <Menu
      isOpen={isOpen}
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
      closeOnSelect={false}
    >
      <MenuButton
        as={Button}
        variant="ghost"
        fontWeight={isProductsPage ? '700' : '500'}
        fontSize="12px"
        letterSpacing="1px"
        textTransform="uppercase"
        color={isProductsPage ? 'gray.600' : 'gray.400'}
        _hover={{ color: 'gray.600' }}
        _active={{ color: 'gray.600' }}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => {
          // Delay closing to allow moving to menu
          setTimeout(() => {
            if (!hoveredCategory) setIsOpen(false)
          }, 100)
        }}
      >
        SHOP
      </MenuButton>
      <MenuList
        bgColor="white"
        minWidth="200px"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => {
          setIsOpen(false)
          setHoveredCategory(null)
        }}
        position="relative"
      >
        {shopCategories.map((category) => (
          <Box key={category.key} position="relative">
            <MenuItem
              bgColor="white"
              _hover={{ bgColor: 'gray.100' }}
              px={4}
              py={2}
              onMouseEnter={() => setHoveredCategory(category.key)}
              onClick={(e) => e.preventDefault()}
            >
              <Text fontSize="14px" fontWeight="400" color="gray.800">
                {category.title}
              </Text>
            </MenuItem>
            {hoveredCategory === category.key && (
              <Box
                position="absolute"
                left="100%"
                top={0}
                ml={1}
                bgColor="white"
                border="1px solid"
                borderColor="gray.200"
                borderRadius="md"
                boxShadow="md"
                minWidth="180px"
                py={2}
                zIndex={1000}
                onMouseEnter={() => setHoveredCategory(category.key)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                {category.items.map((item, itemIndex) => (
                  <Box
                    key={itemIndex}
                    as={Link}
                    to={item.link}
                    display="block"
                    px={4}
                    py={2}
                    _hover={{ bgColor: 'gray.100' }}
                  >
                    <Text fontSize="14px" fontWeight="400" color="gray.800">
                      {item.title}
                    </Text>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        ))}
      </MenuList>
    </Menu>
  )
}

export default ShopMenu

