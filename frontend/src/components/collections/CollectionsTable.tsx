import { Box, Button, HStack, Skeleton, Text } from '@chakra-ui/react'
import { createColumnHelper } from '@tanstack/react-table'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import Table from '../Table/Table'
import DeleteCollectionModal from './components/DeleteCollectionModal'
import useCollections from './hooks/useCollections'

const columnHelper = createColumnHelper<Collection>()

const CollectionsTable = () => {
  const { data: collections, isLoading, error } = useCollections()
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean
    collectionId?: number
    collectionTitle?: string
  }>({
    isOpen: false,
  })

  const columns = [
    columnHelper.accessor('title', {
      cell: (info) => <Text color="gray.800">{info.getValue()}</Text>,
      header: 'Loại',
    }),
    columnHelper.display({
      id: 'actions',
      cell: (info) => {
        const collection = info.row.original
        return (
          <HStack justify="flex-end" mr={9}>
            <Link to={`/admin/collections/${collection.id}`}>
              <Button color="black" variant="outline" borderColor="black">
                Chỉnh sửa
              </Button>
            </Link>

            <Button
              colorScheme="red"
              onClick={() =>
                setDeleteModal({
                  isOpen: true,
                  collectionId: collection.id,
                  collectionTitle: collection.title,
                })
              }
            >
              Xoá
            </Button>
          </HStack>
        )
      },
      header: 'Hành động',
      meta: {
        isAction: true,
        textAlign: 'right',
      },
    }),
  ]

  if (isLoading) return <Skeleton width="100%" height="380px" />
  if (error) {
    return (
      <Box>
        <Text color="red.500" mb={4}>
          Có lỗi xảy ra: {error.message || 'Không thể tải dữ liệu collections'}
        </Text>
      </Box>
    )
  }

  return (
    <>
      {!collections || collections.length === 0 ? (
        <Box py={8} textAlign="center">
          <Text color="gray.500" fontSize="lg">
            Không có collection nào
          </Text>
        </Box>
      ) : (
        <Table columns={columns} data={collections} />
      )}
      <DeleteCollectionModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false })}
        collectionId={deleteModal.collectionId}
        collectionTitle={deleteModal.collectionTitle}
      />
    </>
  )
}

export default CollectionsTable
