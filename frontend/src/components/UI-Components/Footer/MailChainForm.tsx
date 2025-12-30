import { Box, Button, HStack, Input, Text } from '@chakra-ui/react'
import React, { useRef } from 'react'

import FooterTitle from './FooterTitle'

const MailChainInput = () => {
  const emailchainInputRef = useRef<HTMLInputElement>(null)

  const submitMailChainForm = (event: React.FormEvent) => {
    event.preventDefault()
    if (emailchainInputRef.current) {
      if (!emailchainInputRef.current.value) {
        console.log('email', emailchainInputRef.current.value)
      }
    }
  }
  return (
    <Box>
      <FooterTitle>Nhận ưu đãi, lời mời và cập nhật</FooterTitle>

      <HStack
        paddingY="1rem"
        as="form"
        onSubmit={(event) => submitMailChainForm(event)}
        alignItems="stretch"
      >
        <Input
          width="70%"
          border="solid 1px"
          borderRadius={1}
          borderColor="gray.500"
          ref={emailchainInputRef}
          placeholder="Nhập email của bạn"
          variant="outline"
          height="auto"
          paddingY={3}
          color="black"
        />
        <Button
          border="2px solid"
          borderColor="primary.500"
          height="auto"
          paddingY={3}
          paddingX={10}
          width="30%"
          background="transparent"
          alignItems="center"
          textColor="primary.500"
          marginTop={0}
          borderRadius={1}
          _hover={{ background: 'primary.500', textColor: 'black' }}
        >
          <Text fontWeight="700" fontSize="sm">
            ĐĂNG KÝ
          </Text>
        </Button>
      </HStack>
    </Box>
  )
}

export default MailChainInput
