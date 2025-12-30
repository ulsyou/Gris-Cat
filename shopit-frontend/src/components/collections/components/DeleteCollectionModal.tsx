import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from '@chakra-ui/react'

import useDeleteCollection from '../hooks/useDeleteCollection'

interface Props {
  collectionId?: number
  collectionTitle?: string
  isOpen: boolean
  onClose: () => void
}

const DeleteCollectionModal = ({
  collectionId,
  collectionTitle,
  isOpen,
  onClose,
}: Props) => {
  const deleteCollection = useDeleteCollection()
  const toast = useToast()

  const deleteHandler = () => {
    if (!collectionId) return

    deleteCollection.mutate(collectionId, {
      onSuccess: () => {
        toast({
          title: 'Thành công',
          description: `Collection "${collectionTitle}" đã được xóa`,
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
        onClose()
      },
      onError: (error: any) => {
        console.error('Delete collection error:', error)
        console.error('Error response:', error.response)
        console.error('Error response data:', error.response?.data)
        console.error('Error array details:', JSON.stringify(error.response?.data?.error, null, 2))
        const errorMessage = error.response?.data?.message || error.response?.data?.error?.map((e: any) => e.message).join(', ') || error.message || 'Không thể xóa collection'
        toast({
          title: 'Lỗi',
          description: errorMessage,
          status: 'error',
          duration: 15000,
          isClosable: true,
        })
      },
    })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Xóa Collection</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Bạn có chắc chắn muốn xóa collection "{collectionTitle}"? Hành động
          này không thể hoàn tác.
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="gray" mr={3} onClick={onClose}>
            Hủy
          </Button>
          {collectionId && (
            <Button colorScheme="red" onClick={deleteHandler}>
              Xóa
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default DeleteCollectionModal

