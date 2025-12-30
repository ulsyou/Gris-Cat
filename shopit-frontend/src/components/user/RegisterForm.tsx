import { Box, Button, Input, Text, useToast } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'

import useAuthStore from './useAuthStore'

const RegisterRequestSchema = z
  .object({
    name: z
      .string({ required_error: 'Name is required' })
      .max(50, { message: 'name should not longer than 50.' }),
    email: z
      .string({ required_error: 'Email is Required' })
      .email({ message: 'Please input a vaild email.' })
      .max(50),
    password: z
      .string({ required_error: 'Password is Required.' })
      .nonempty({ message: 'Password is Required.' })
      .min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'], // path of error
  })

export type RegisterRequest = z.infer<typeof RegisterRequestSchema>

const RegisterForm = () => {
  const navigate = useNavigate()
  const signup = useAuthStore((a) => a.signup)
  const toast = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterRequest>({
    resolver: zodResolver(RegisterRequestSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (data: RegisterRequest) => {
    try {
      const user = await signup(data)

      if (user) {
        toast({ status: 'success', title: `Welcome back ${user.name}` })
        navigate('/')
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
          placeholder="Enter your Email"
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
          Họ và Tên
        </Text>
        <Input
          {...register('name')}
          type="text"
          placeholder="Tên của bạn"
          borderRadius={0}
          id="name"
          border="0.5px solid"
          borderColor="gray.400"
          color="black"
        />
        {errors.name ? (
          <Text color="primary.500" fontSize="sm">
            {errors.name.message}
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
      <Box marginBottom={5}>
        <Text
          letterSpacing="0.1rem"
          fontWeight="600"
          fontSize="12px"
          textTransform="uppercase"
          marginBottom={3}
          color="primary.500"
        >
          Xác nhận mật khẩu
        </Text>

        <Input
          {...register('confirmPassword')}
          borderRadius={0}
          type="password"
          border="0.5px solid"
          placeholder="Nhập lại mật khẩu"
          borderColor="gray.400"
          color="black"
        />
        {errors.confirmPassword ? (
          <Text color="primary.500" fontSize="sm">
            {errors.confirmPassword.message}
          </Text>
        ) : (
          ''
        )}
      </Box>

      <Box marginBottom={2}>
        <Link to="/register">
          <Text color="primary.500" _hover={{ textDecoration: 'underline' }}>
            Đăng nhập
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
        Đăng ký
      </Button>
    </Box>
  )
}

export default RegisterForm
