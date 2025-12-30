import APIClient from '../../../services/api-client'

interface OrderItem {
  quantity: number
  unitPrice: number
  productId: number
  orderId: number
  product: {
    id: number
    title: string
    slug: string
  }
}

interface Order {
  id: number
  createdAt: string
  updatedAt: string
  userId: number
  paymentStatus: 'PENDING' | 'FAILED' | 'COMPLETED'
  user: {
    id: number
    name: string
    email: string
  }
  OrderItem: OrderItem[]
}

const apiClient = new APIClient<Order>('/api/orders')

export type { Order, OrderItem }
export default apiClient

