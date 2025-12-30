import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
} from '@chakra-ui/react'

import useDeleteOrder from '../hooks/useDeleteOrder'

interface Props {
  isOpen: boolean
  onClose: () => void
  orderId?: number
  orderInfo?: string
}

const DeleteOrderModal = ({ isOpen, onClose, orderId, orderInfo }: Props) => {
  const toast = useToast()
  const deleteOrder = useDeleteOrder()

  const handleDelete = () => {
    if (!orderId) return

    deleteOrder.mutate(orderId, {
      onSuccess: () => {
        toast({
          title: 'Thành công',
          description: `Đơn hàng đã được xóa`,
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
        onClose()
      },
      onError: (error: any) => {
        toast({
          title: 'Lỗi',
          description: error.response?.data?.message || error.message || 'Không thể xóa đơn hàng',
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      },
    })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Xác nhận xóa đơn hàng</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            Bạn có chắc chắn muốn xóa đơn hàng {orderInfo ? `"${orderInfo}"` : `#${orderId}`} không?
            Hành động này không thể hoàn tác.
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="gray" mr={3} onClick={onClose}>
            Hủy
          </Button>
          <Button colorScheme="red" onClick={handleDelete}>
            Xóa
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default DeleteOrderModal

