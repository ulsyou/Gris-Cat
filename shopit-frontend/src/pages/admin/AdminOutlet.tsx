import { Navigate, Outlet, useLocation } from 'react-router-dom'

import useAuthStore from '../../components/user/useAuthStore'
import AdminLayout from './AdminLayout'

const AdminOutlet = () => {
  const getUserByToken = useAuthStore((a) => a.getUserByToken)
  const user = getUserByToken()
  const location = useLocation()

  // Redirect to login if not authenticated or not an admin
  if (!user || user.role !== 'ADMIN') {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  )
}

export default AdminOutlet
