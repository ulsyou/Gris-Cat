import { Box, Button, Input, Text, useToast } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { z } from 'zod'

import useAuthStore from './useAuthStore'

const LoginRequestSchema = z.object({
  email: z
    .string({ required_error: 'Email is Required' })
    .email({ message: 'Please input a vaild email.' }),
  password: z
    .string({ required_error: 'Password is Required.' })
    .nonempty({ message: 'Password is Required.' }),
})

export type LoginRequest = z.infer<typeof LoginRequestSchema>

const LoginForm = () => {
  const login = useAuthStore((a) => a.login)
  const navigate = useNavigate()
  const location = useLocation()
  const toast = useToast()
  
  // Get the 'from' location if user was redirected here
  const from = (location.state as { from?: Location })?.from

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    resolver: zodResolver(LoginRequestSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: LoginRequest) => {
    try {
      const user = await login(data)

      if (user) {
        toast({ status: 'success', title: `Welcome back ${user.name}` })
        
        // Redirect based on user role and intended destination
        if (user.role === 'ADMIN') {
          // Admins always go to admin panel
          // If they were trying to access a specific admin page, go there
          const targetPath = from?.pathname?.startsWith('/admin') 
            ? from.pathname 
            : '/admin'
          navigate(targetPath, { replace: true })
        } else {
          // Regular users go to their intended destination or home
          const targetPath = from?.pathname || '/'
          navigate(targetPath, { replace: true })
        }
      }
    } catch (err: any) {
      toast({
        status: 'error',
        title: 'Error',
        description: err?.message || 'Oh no, there is an Error!',
        isClosable: true,
      })
    }
  }
  return (
    <Box
      width="400px"
      padding={8}
      margin="auto"
      bgColor="#fff"
      as="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Box marginBottom={5}>
        <Text
          letterSpacing="0.1rem"
          fontWeight="600"
          fontSize="12px"
          textTransform="uppercase"
          marginBottom={3}
          color="primary.500"
        >
          Email
        </Text>
        <Input
          {...register('email')}
          type="email"
          placeholder="Email"
          borderRadius={0}
          id="email"
          border="0.5px solid"
          borderColor="gray.400"
          color="black"
        />
        {errors.email ? (
          <Text color="primary.500" fontSize="sm">
            {errors.email.message}
          </Text>
        ) : (
          ''
        )}
      </Box>

      <Box marginBottom={5}>
        <Text
          letterSpacing="0.1rem"
          fontWeight="600"
          fontSize="12px"
          textTransform="uppercase"
          marginBottom={3}
          color="primary.500"
        >
          Mật khẩu
        </Text>

        <Input
          {...register('password')}
          borderRadius={0}
          type="password"
          border="0.5px solid"
          placeholder="Mật khẩu"
          borderColor="gray.400"
          color="black"
        />
        {errors.password ? (
          <Text color="primary.500" fontSize="sm">
            {errors.password.message}
          </Text>
        ) : (
          ''
        )}
      </Box>

      <Box marginBottom={2}>
        <Link to="/register">
          <Text color="primary.500" _hover={{ textDecoration: 'underline' }}>
            Đăng ký
          </Text>
        </Link>

        <Link to="/forgotpassword">
          <Text color="primary.500" _hover={{ textDecoration: 'underline' }}>
            Quên mật khẩu
          </Text>
        </Link>
      </Box>

      <Button
        width="full"
        color="primary.500"
        border="2px solid"
        borderRadius={0}
        variant="outline"
        textTransform="uppercase"
        fontSize="sm"
        _hover={{ bgColor: 'primary.500', color: '#fff' }}
        type="submit"
      >
        Đăng nhập
      </Button>
    </Box>
  )
}

export default LoginForm
