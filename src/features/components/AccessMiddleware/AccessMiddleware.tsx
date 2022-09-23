import React, { FC, ReactNode } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { RoutePath } from 'Router'

export interface IRequireUser {
  allowedRoles?: string[] | string
  allowedUsers?: string[] | string
  allowedAuth?: boolean
}
interface IAccessMiddlewareProps {
  allow: IRequireUser
}

const AccessMiddleware: FC<IAccessMiddlewareProps> = ({ allow }) => {
  const { allowedAuth } = allow
  const location = useLocation()
  // const { isAuth } = useAuth()
  const isAuth = false
  const checkAuth: () => boolean = () => {
    return (allowedAuth !== undefined) && isAuth === allowedAuth
  }

  return checkAuth()
    ? (<Outlet/>)
    : (<Navigate to={RoutePath.LOGIN} state={{ from: location }} replace/>)
}

const requireAccess = (access: IRequireUser): ReactNode => {
  return <AccessMiddleware allow={access}/>
}

export default requireAccess