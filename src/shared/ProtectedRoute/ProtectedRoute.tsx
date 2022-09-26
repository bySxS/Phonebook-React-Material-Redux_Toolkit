import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { RoutePath } from 'Router'
import { useAuth } from 'hooks/useStore'

export interface IRequireUser {
  // allowedRoles?: string[] | string
  // allowedUsers?: string[] | string
  allowedAuth?: boolean
}
interface IProtectedRouteProps {
  allow: IRequireUser
  children?: JSX.Element
}

const ProtectedRoute = ({ allow, children }: IProtectedRouteProps) => {
  const { allowedAuth } = allow
  const location = useLocation()
  const { isAuth } = useAuth()
  if (!isAuth && allowedAuth && allowedAuth) {
    return <Navigate to={RoutePath.LOGIN} state={{ from: location }} replace />
  }

  if (isAuth && location.pathname === RoutePath.LOGIN) {
    return <Navigate to={'/'} state={{ from: location }} replace />
  }

  return children || <Outlet />
}

export default ProtectedRoute