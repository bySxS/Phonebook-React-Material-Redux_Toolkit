import React, { FC } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from 'features/auth/hooks/use-auth'

interface IPublicRouteProps {
  children: JSX.Element
}

const PublicRoute: FC<IPublicRouteProps> = ({ children }) => {
  const { isAuth } = useAuth()
  const location = useLocation()
  if (isAuth) {
    return <Navigate to={'/'} state={{ from: location }} replace />
  }
  return children
}

export default PublicRoute