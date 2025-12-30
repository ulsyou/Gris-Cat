import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Show,
  Stack,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { BsGlobe } from 'react-icons/bs'
import React from 'react'

import Divider from '../Divider'
import CartDrawerEmptyCart from '../../cart/CartDrawerEmptyCart'
import CartDrawerFooter from '../../cart/CartDrawerFooter'
import CartDrawerItemCard from '../../cart/CartDrawerItemCard'
import useCartStore, { CartItem } from '../../cart/hooks/useCartStore'
import SearchInput from '../SearchInput'
import CollectionNacigate from './CollectionNacigate'
import ShopMenu from './ShopMenu'

const NavBar = () => {
  return (
    <HStack
      paddingX="3rem"
      paddingY="10px"
      justifyContent="space-between"
      spacing={5}
      flexWrap="nowrap"
      position="relative"
    >
      {/* Left side: Shop and Collections */}
      <Show above="md">
        <HStack spacing={4} flexShrink={0}>
          <ShopMenu />
          <CollectionNacigate />
        </HStack>
      </Show>

      {/* Center: Gris Cat */}
      <Box
        position="absolute"
        left="50%"
        transform="translateX(-50%)"
        flexShrink={0}
      >
        <Link to="/">
          <Heading textAlign="center">Gris Cat</Heading>
        </Link>
      </Box>

      {/* Right side: Search, Language, Cart */}
      <Show above="md">
        <HStack spacing={4} flexShrink={0} ml="auto">
          <Box minWidth="200px" maxWidth="400px" flex="1">
            <SearchInput />
          </Box>
          
          <Menu>
            <MenuButton
              as={Button}
              variant="ghost"
              fontSize="12px"
              letterSpacing="1px"
              textTransform="uppercase"
              color="gray.400"
              _hover={{ color: 'gray.600' }}
              leftIcon={<BsGlobe />}
            >
              NGÔN NGỮ
            </MenuButton>
            <MenuList bgColor="white">
              <MenuItem bgColor="white" _hover={{ bgColor: 'gray.100' }}>
                Tiếng Việt
              </MenuItem>
              <MenuItem bgColor="white" _hover={{ bgColor: 'gray.100' }}>
                English
              </MenuItem>
            </MenuList>
          </Menu>

          <CartButton />
        </HStack>
      </Show>

      <Show below="md">
        <Button
          backgroundColor="transparent"
          color="gray.400"
          fontWeight="400"
          _hover={{ fontWeoght: '600', color: 'gray.600' }}
        >
          Menu
        </Button>
      </Show>
    </HStack>
  )
}

const CartButton = () => {
  const cartItems = useCartStore((c) => c.cart.items)
  const isOpen = useCartStore((c) => c.isOpen)
  const onOpen = useCartStore((c) => c.onOpen)
  const onClose = useCartStore((c) => c.onClose)
  const btnRef = React.useRef(null)

  return (
    <>
      <IconButton
        ref={btnRef}
        onClick={onOpen}
        variant="ghost"
        icon={<AiOutlineShoppingCart />}
        aria-label="Cart"
        fontSize="20px"
        color="gray.400"
        _hover={{ color: 'gray.600' }}
      />

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        size="sm"
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Cart</DrawerHeader>
          <Divider />
          {cartItems.length === 0 ? (
            <CartDrawerEmptyCart />
          ) : (
            <>
              <DrawerBody>
                <Stack>
                  {cartItems.map(({ productId, product, quantity }) => (
                    <CartDrawerItemCard
                      key={productId}
                      product={product}
                      quantity={quantity}
                    />
                  ))}
                </Stack>
              </DrawerBody>
              <CartDrawerFooter />
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default NavBar
