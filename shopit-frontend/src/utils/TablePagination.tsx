import { Button, HStack, Input, Select, Text, Tfoot } from '@chakra-ui/react'
import { Table } from '@tanstack/react-table'
import { useState, useEffect } from 'react'
import {
  MdArrowLeft,
  MdArrowRight,
  MdFirstPage,
  MdLastPage,
} from 'react-icons/md'

interface Props {
  table: Table<any>
}
const TablePaginationAction = ({ table }: Props) => {
  const [pageInput, setPageInput] = useState(
    String(table.getState().pagination.pageIndex + 1)
  )

  useEffect(() => {
    setPageInput(String(table.getState().pagination.pageIndex + 1))
  }, [table.getState().pagination.pageIndex])
  return (
    <HStack
      gap={2}
      width="100%"
      fontSize="sm"
      marginTop="3"
      alignItems="center"
    >
      <Button
        variant="link"
        onClick={() => table.setPageIndex(0)}
        disabled={!table.getCanPreviousPage()}
        color="gray.800"
      >
        <MdFirstPage />
      </Button>
      <Button
        variant="link"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
        color="gray.800"
      >
        <MdArrowLeft />
      </Button>
      <Button
        variant="link"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
        color="gray.800"
      >
        <MdArrowRight />
      </Button>

      <Button
        variant="link"
        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        disabled={!table.getCanNextPage()}
        color="gray.800"
      >
        <MdLastPage />
      </Button>

      <HStack gap="2">
        <Text color="gray.800">Trang</Text>
        <Text fontWeight="600" color="gray.800">
          {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
        </Text>
      </HStack>

      <HStack gap={1}>
        <Text color="gray.800">| Đến trang:</Text>
        <Input
          width="58px"
          height="28px"
          bgColor="#fff"
          borderColor="gray.300"
          type="number"
          color="black"
          value={pageInput}
          min={1}
          max={table.getPageCount()}
          onChange={(e) => {
            const value = e.target.value
            setPageInput(value)
            if (value) {
              const pageNum = Number(value)
              const maxPage = table.getPageCount()
              if (pageNum >= 1 && pageNum <= maxPage) {
                table.setPageIndex(pageNum - 1)
              }
            }
          }}
          onBlur={(e) => {
            const value = e.target.value
            if (!value || Number(value) < 1) {
              setPageInput('1')
              table.setPageIndex(0)
            } else {
              const pageNum = Number(value)
              const maxPage = table.getPageCount()
              if (pageNum > maxPage) {
                setPageInput(String(maxPage))
                table.setPageIndex(maxPage - 1)
              } else if (pageNum < 1) {
                setPageInput('1')
                table.setPageIndex(0)
              }
            }
          }}
        />
      </HStack>
      <Select
        bgColor="#fff"
        width="128px"
        height="28px"
        borderColor="gray.300"
        color="gray.800"
        value={table.getState().pagination.pageSize}
        onChange={(e) => {
          table.setPageSize(Number(e.target.value))
        }}
        _hover={{ bg: 'gray.100', borderColor: 'gray.400' }}
      >
        {[10, 20, 30, 40, 50].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </Select>
    </HStack>
  )
}

export default TablePaginationAction
