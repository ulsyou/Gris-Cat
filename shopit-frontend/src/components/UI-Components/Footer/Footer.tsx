import { Box, Grid, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import ContactInfo from '../ContactInfo'
import FooterTitle from './FooterTitle'
import MailChainForm from './MailChainForm'
import SocialMedia from './SocialMedia'

const Footer = () => {
  return (
    <Grid
      paddingX={5}
      paddingY={8}
      width="100%"
      borderTop="1px Solid"
      borderColor="primary.500"
      bgColor="gray.200"
      templateColumns={{ base: '1', md: '55% 45%' }}
    >
      <SimpleGrid width="100%" columns={3}>
        {footerSection.map(({ section, children }) => (
          <Box key={section}>
            <FooterTitle>{section}</FooterTitle>

            <Stack paddingY="1rem">
              {children.map(({ label, href }, index) => (
                <Text
                  fontWeight="300"
                  color="gray.600"
                  as={Link}
                  to={href}
                  key={`${label}_${index}`}
                >
                  {label}
                </Text>
              ))}
            </Stack>
          </Box>
        ))}

        <Box>
          <FooterTitle>Cần trợ giúp</FooterTitle>
          <ContactInfo />
        </Box>
      </SimpleGrid>

      <Stack width="60%">
        <MailChainForm />
        <SocialMedia />
      </Stack>
    </Grid>
  )
}

const footerSection = [
  {
    section: 'Dịch vụ khách hàng',
    children: [
      {
        label: 'Giao hàng miễn phí + Trả hàng',
        href: '',
      },
      {
        label: 'Bắt đầu trả hàng',
        href: '',
      },
      {
        label: 'Chính sách trả hàng',
        href: '',
      },
      {
        label: 'Câu hỏi thường gặp',
        href: '',
      },
      {
        label: 'Liên hệ',
        href: '',
      },
    ],
  },
  {
    section: 'About Us',
    children: [
      {
        label: 'Về Gris Cat',
        href: '',
      },
      {
        label: 'Bản tin',
        href: '',
      },
      {
        label: 'Đánh giá',
        href: '',
      },
    ],
  },
]
export default Footer
