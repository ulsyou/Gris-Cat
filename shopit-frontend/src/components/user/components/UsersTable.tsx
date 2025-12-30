import { Box, Skeleton, Text } from '@chakra-ui/react'
import { createColumnHelper } from '@tanstack/react-table'

import Table from '../../Table/Table'
import { User } from '../hooks/useUsers'
import useUsers from '../hooks/useUsers'

const columnHelper = createColumnHelper<User>()

const columns = [
  columnHelper.accessor('name', {
    cell: (info) => <Text color="gray.800">{info.getValue()}</Text>,
    header: 'Tên',
  }),
  columnHelper.accessor('email', {
    cell: (info) => <Text color="gray.800">{info.getValue()}</Text>,
    header: 'Email',
  }),
  columnHelper.display({
    id: 'address',
    cell: (info) => {
      const user = info.row.original
      const addresses = user.Address || []
      
      if (addresses.length === 0) {
        return <Text color="gray.500">-</Text>
      }
      
      // Format address: street, city, state, country postalCode
      const addressStrings = addresses.map((addr) => {
        return `${addr.street}, ${addr.city}, ${addr.state}, ${addr.country} ${addr.postalCode}`
      })
      
      // If multiple addresses, show them separated by line breaks
      if (addressStrings.length === 1) {
        return <Text color="gray.800">{addressStrings[0]}</Text>
      }
      
      return (
        <Box>
          {addressStrings.map((addr, idx) => (
            <Text key={idx} color="gray.800" mb={idx < addressStrings.length - 1 ? 1 : 0}>
              {addr}
            </Text>
          ))}
        </Box>
      )
    },
    header: 'Địa chỉ',
  }),
]

const UsersTable = () => {
  const { data: users, isLoading, error } = useUsers()

  if (isLoading) return <Skeleton width="100%" height="380px" />
  if (error) return <Text>There is an Error.</Text>

  return <Table columns={columns} data={users || []} />
}

export default UsersTable

