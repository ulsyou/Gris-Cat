import { Button, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react'
import { Link, useLocation } from 'react-router-dom'

import useProductQueryStore from '../../../store/collectionQueryStore'
import useCollections from '../../collections/hooks/useCollections'

const CollectionNacigate = () => {
  const setCollectionSlug = useProductQueryStore((s) => s.setCollectionSlug)
  const { data, isLoading, error } = useCollections()
  const location = useLocation()

  const isCollectionsPage = location.pathname.startsWith('/collections')

  if (isLoading || error) {
    return (
      <Button
        as={Link}
        to="/collections"
        variant="ghost"
        fontWeight="500"
        fontSize="12px"
        letterSpacing="1px"
        textTransform="uppercase"
        color={isCollectionsPage ? 'gray.600' : 'gray.400'}
        _hover={{ color: 'gray.600' }}
      >
        COLLECTIONS
      </Button>
    )
  }

  return (
    <Menu>
      <MenuButton
        as={Button}
        variant="ghost"
        fontWeight={isCollectionsPage ? '700' : '500'}
        fontSize="12px"
        letterSpacing="1px"
        textTransform="uppercase"
        color={isCollectionsPage ? 'gray.600' : 'gray.400'}
        _hover={{ color: 'gray.600' }}
        _active={{ color: 'gray.600' }}
      >
        COLLECTIONS
      </MenuButton>
      <MenuList bgColor="white">
        {data?.map(({ title, slug, id }) => (
          <MenuItem
            key={id}
            as={Link}
            to={'/collections/' + slug}
            onClick={() => setCollectionSlug(slug)}
            bgColor="white"
            _hover={{ bgColor: 'gray.100' }}
          >
            <Text
              fontSize="14px"
              fontWeight="400"
              color="gray.800"
            >
              {title}
            </Text>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}

export default CollectionNacigate
