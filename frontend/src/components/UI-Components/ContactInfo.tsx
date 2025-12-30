import { HStack, Stack, Text } from '@chakra-ui/react'
import {
  AiOutlineClockCircle,
  AiOutlineMail,
  AiOutlinePhone,
} from 'react-icons/ai'

import Addres from './Footer/Addres'

const ContactInfo = () => {
  return (
    <Stack
      paddingY={5}
      fontWeight="300"
      color="gray.600"
      spacing={0}
      fontSize="0.9rem"
    >
      <HStack>
        <AiOutlineMail />
        <Text>hello@griscat.com</Text>
      </HStack>
      <HStack>
        <AiOutlinePhone />
        <Text>0909090909</Text>
      </HStack>
      <HStack>
        <AiOutlineClockCircle />
        <Text>Hàng ngày 8:00 - 20:00</Text>
      </HStack>
      <Addres />
    </Stack>
  )
}

export default ContactInfo
