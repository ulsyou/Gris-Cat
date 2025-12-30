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

import useDeleteProduct from '../hooks/useDeleteProduct'

interface Props {
  productId?: number
  productTitle?: string
  isOpen: boolean
  onClose: () => void
}

const DeleteProductModal = ({ productId, productTitle, isOpen, onClose }: Props) => {
  const deleteProduct = useDeleteProduct()
  const toast = useToast()

  const deleteHanddler = () => {
    if (!productId) return

    deleteProduct.mutate(productId, {
      onSuccess: () => {
        toast({
          title: 'Thành công',
          description: `Product "${productTitle || productId}" đã được xóa`,
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
        onClose()
      },
      onError: (error: any) => {
        const errorMessage = error.response?.data?.message || error.message || 'Không thể xóa product'
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
        <ModalHeader>Xóa Product</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Bạn có chắc chắn muốn xóa product "{productTitle || productId}"? Hành động
          này không thể hoàn tác.
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="gray" mr={3} onClick={onClose}>
            Hủy
          </Button>
          {productId && (
            <Button colorScheme="red" onClick={deleteHanddler}>
              Xóa
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default DeleteProductModal
