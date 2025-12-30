import { Box, Button, HStack, Skeleton, Text, useDisclosure } from '@chakra-ui/react'
import { createColumnHelper } from '@tanstack/react-table'
import { format } from 'date-fns'
import React, { useCallback, useState } from 'react'

import Table from '../../Table'
import { Order } from '../hooks/orderService'
import useOrders from '../hooks/useOrders'
import DeleteOrderModal from './DeleteOrderModal'

const columnHelper = createColumnHelper<Order>()

const OrdersTable = () => {
  const { data: orders, isLoading, error } = useOrders()
  const [selectedOrder, setSelectedOrder] = useState<{
    id?: number
    info?: string
  }>({})
  const { isOpen, onOpen, onClose } = useDisclosure()

  const deleteOrderHandler = useCallback((orderId: number, orderInfo: string) => {
    setSelectedOrder({ id: orderId, info: orderInfo })
    onOpen()
  }, [onOpen])

  const columns = React.useMemo(() => [
    columnHelper.accessor('id', {
      cell: (info) => <Text color="gray.800">#{info.getValue()}</Text>,
      header: 'Mã đơn hàng',
    }),
    columnHelper.accessor('user.name', {
      cell: (info) => <Text color="gray.800">{info.getValue()}</Text>,
      header: 'Khách hàng',
    }),
    columnHelper.accessor('user.email', {
      cell: (info) => <Text color="gray.800">{info.getValue()}</Text>,
      header: 'Email',
    }),
    columnHelper.accessor('createdAt', {
      cell: (info) => (
        <Text color="gray.800">{format(new Date(info.getValue()), 'dd/MM/yyyy HH:mm')}</Text>
      ),
      header: 'Ngày đặt',
    }),
    columnHelper.accessor('paymentStatus', {
      cell: (info) => {
        const status = info.getValue()
        const colorMap = {
          PENDING: 'orange',
          FAILED: 'red',
          COMPLETED: 'green',
        }
        return (
          <Text color={`${colorMap[status]}.500`} fontWeight="medium">
            {status === 'PENDING' ? 'Đang chờ' : status === 'FAILED' ? 'Thất bại' : 'Hoàn thành'}
          </Text>
        )
      },
      header: 'Trạng thái thanh toán',
    }),
    columnHelper.display({
      id: 'total',
      cell: (info) => {
        const order = info.row.original
        const total = order.OrderItem.reduce(
          (sum, item) => sum + item.quantity * item.unitPrice,
          0
        )
        return <Text color="gray.800">${total.toLocaleString()}</Text>
      },
      header: 'Tổng tiền',
      meta: {
        isNumeric: true,
      },
    }),
    columnHelper.display({
      id: 'actions',
      cell: (info) => {
        const order = info.row.original
        const orderInfo = `#${order.id} - ${order.user.name}`
        return (
          <HStack justify="flex-end" mr={9}>
            <Button
              colorScheme="red"
              onClick={() => deleteOrderHandler(order.id, orderInfo)}
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
  ], [deleteOrderHandler])

  if (isLoading) return <Skeleton width="100%" height="380px" />
  if (error) {
    return (
      <Box>
        <Text color="red.500" mb={4}>
          Có lỗi xảy ra: {error.message || 'Không thể tải dữ liệu đơn hàng'}
        </Text>
      </Box>
    )
  }

  return (
    <>
      <DeleteOrderModal
        isOpen={isOpen}
        onClose={onClose}
        orderId={selectedOrder.id}
        orderInfo={selectedOrder.info}
      />

      {!orders || orders.length === 0 ? (
        <Box py={8} textAlign="center">
          <Text color="gray.500" fontSize="lg">
            Không có đơn hàng nào
          </Text>
        </Box>
      ) : (
        <Table columns={columns} data={orders} />
      )}
    </>
  )
}

export default OrdersTable

