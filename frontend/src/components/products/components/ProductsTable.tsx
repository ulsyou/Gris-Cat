import { Box, Button, HStack, Input, Select, Skeleton, Text, useDisclosure } from '@chakra-ui/react'
import { createColumnHelper } from '@tanstack/react-table'
import React, { useCallback, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import useCollections from '../../collections/hooks/useCollections'
import Table from '../../Table'
import useProductQueryStore from '../../../store/productQueryStore'
import { Product } from '../hooks/productService'
import useProudcts from '../hooks/useProducts'
import DeleteProductModal from './DeleteProductModal'

const columnHelper = createColumnHelper<Product>()

const ProductsTable = () => {
  const { data: products, isLoading, error } = useProudcts()
  const { data: collections } = useCollections()
  const productQuery = useProductQueryStore((s) => s.productQuery)
  const setCollectionId = useProductQueryStore((s) => s.setCollectionId)
  const setSearchText = useProductQueryStore((s) => s.setProductQuery)
  const setSortOrder = useProductQueryStore((s) => s.setSortOrder)
  const collectionId = useProductQueryStore((s) => s.productQuery.collectionId)
  const [selectedProduct, setSelectedProduct] = useState<{
    id?: number
    title?: string
  }>({})
  const { isOpen, onOpen, onClose } = useDisclosure()

  // Sort products client-side based on sortOrder
  const sortedProducts = useMemo(() => {
    if (!products) return []
    const sorted = [...products]
    if (productQuery.sortOrder === 'a-z') {
      sorted.sort((a, b) => a.title.localeCompare(b.title))
    } else if (productQuery.sortOrder === 'z-a') {
      sorted.sort((a, b) => b.title.localeCompare(a.title))
    }
    return sorted
  }, [products, productQuery.sortOrder])

  const deleteProductHandler = useCallback((productId: number, productTitle: string) => {
    setSelectedProduct({ id: productId, title: productTitle })
    onOpen()
  }, [onOpen])

  const columns = React.useMemo(() => [
    columnHelper.accessor('title', {
      cell: (info) => <Text color="gray.800">{info.getValue()}</Text>,
      header: 'Tên sản phẩm',
    }),
    columnHelper.display({
      id: 'collections',
      cell: (info) => {
        const product = info.row.original
        const productCollections = product.collectionsOnProducts?.map(
          (cop) => cop.collection
        ) || []
        return (
          <Text color="gray.800">
            {productCollections.length > 0
              ? productCollections.map((c) => c.title).join(', ')
              : '-'}
          </Text>
        )
      },
      header: 'Collections',
    }),
    columnHelper.accessor('slug', {
      cell: (info) => <Text color="gray.800">{info.getValue()}</Text>,
      header: 'Slug',
      enableHiding: true,
    }),
    columnHelper.accessor('price', {
      cell: (info) => <Text color="gray.800">$ {info.getValue()}</Text>,
      header: 'Giá',
      meta: {
        isNumeric: true,
      },
    }),
    columnHelper.accessor('inventory', {
      cell: (info) => <Text color="gray.800">{info.getValue()}</Text>,
      header: 'Số lượng',
      meta: {
        isNumeric: true,
      },
    }),
    columnHelper.display({
      id: 'actions',
      cell: (info) => (
        <HStack justify="flex-end" mr={9}>
          <Link to={`/admin/products/${info.row.getValue('slug')}`}>
            <Button color="black" variant="outline" borderColor="black">
              Chỉnh sửa
            </Button>
          </Link>

          <Button
            colorScheme="red"
            onClick={() => deleteProductHandler(info.row.original.id, info.row.original.title)}
          >
            Xoá
          </Button>
        </HStack>
      ),
      header: 'Hành động',
      meta: {
        isAction: true,
        textAlign: 'right',
      },
    }),
  ], [deleteProductHandler])

  if (isLoading) return <Skeleton width="100%" height="380px" />
  if (error) {
    return (
      <Box>
        <Text color="red.500" mb={4}>
          Có lỗi xảy ra: {error.message || 'Không thể tải dữ liệu sản phẩm'}
        </Text>
      </Box>
    )
  }

  return (
    <>
      <Box mb={4}>
        <HStack spacing={4} mb={4}>
          <Input
            placeholder="Tìm kiếm sản phẩm..."
            value={productQuery.searchText || ''}
            onChange={(e) => setSearchText(e.target.value)}
            maxW="300px"
            bgColor="white"
            color="black"
            borderColor="gray.300"
            _placeholder={{ color: 'gray.500' }}
          />
          <Select
            placeholder="Sắp xếp"
            value={productQuery.sortOrder || ''}
            onChange={(e) => setSortOrder(e.target.value ? e.target.value : undefined)}
            maxW="200px"
            bgColor="white"
            color="black"
            borderColor="gray.300"
          >
            <option value="a-z">A - Z</option>
            <option value="z-a">Z - A</option>
          </Select>
          <Select
            placeholder="Tất cả Collections"
            value={collectionId || ''}
            onChange={(e) => {
              const value = e.target.value
              setCollectionId(value ? parseInt(value) : undefined)
            }}
            maxW="300px"
            bgColor="white"
            color="black"
            borderColor="gray.300"
          >
            {collections?.map((collection) => (
              <option key={collection.id} value={collection.id}>
                {collection.title}
              </option>
            ))}
          </Select>
        </HStack>
      </Box>

      <DeleteProductModal
        isOpen={isOpen}
        onClose={onClose}
        productId={selectedProduct.id}
        productTitle={selectedProduct.title}
      />

      {!sortedProducts || sortedProducts.length === 0 ? (
        <Box py={8} textAlign="center">
          <Text color="gray.500" fontSize="lg">
            Không có sản phẩm nào
          </Text>
        </Box>
      ) : (
        <Table
          columns={columns}
          data={sortedProducts}
          columnVisibility={{ slug: false }}
        />
      )}
    </>
  )
}

export default ProductsTable
