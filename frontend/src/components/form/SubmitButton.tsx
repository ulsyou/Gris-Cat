import { Button } from '@chakra-ui/react'
import React from 'react'

interface Props {
  title?: string
}

const SubmitButton = ({ title = 'Xác nhận' }: Props) => {
  return (
    <Button
      type="submit"
      width="100%"
      bgColor="primary.500"
      borderRadius="0"
      border="1px solid"
      borderColor="primary.500"
      color="white"
      _hover={{ bgColor: 'transparent', borderColor: 'primary.500', color: 'primary.500' }}
      _focus={{ bgColor: 'transparent', borderColor: 'primary.500', color: 'primary.500' }}
      _active={{ bgColor: 'transparent', borderColor: 'primary.500', color: 'primary.500' }}
      _disabled={{ bgColor: 'transparent', borderColor: 'primary.500', color: 'primary.500' }}
      _focusVisible={{ bgColor: 'transparent', borderColor: 'primary.500', color: 'primary.500' }}
      _focusWithin={{ bgColor: 'transparent', borderColor: 'primary.500', color: 'primary.500' }}
    >
      {title}
    </Button>
  )
}

export default SubmitButton
