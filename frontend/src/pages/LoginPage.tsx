import { Heading, Stack } from '@chakra-ui/react'
import { Navigate } from 'react-router-dom'

import useAuthStore from '../components/user/useAuthStore'
import LoginForm from '../components/user/LoginForm'

const LoginPage = () => {
  const getUserByToken = useAuthStore((a) => a.getUserByToken)
  const user = getUserByToken()

  // If admin is already logged in, redirect to admin panel
  if (user && user.role === 'ADMIN') {
    return <Navigate to="/admin" replace />
  }

  // If regular user is already logged in, redirect to home
  if (user && user.role === 'USER') {
    return <Navigate to="/" replace />
  }

  return (
    <Stack justifyContent="center" alignItems="center">
      <Heading marginTop={12} fontWeight="400" fontSize="6xl" color="black">
        Đăng nhập
      </Heading>
      <LoginForm />
    </Stack>
  )
}

export default LoginPage
