import React, { Suspense, lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from 'shared/ProtectedRoute/ProtectedRoute'
import Loader from 'shared/Loader/Loader'
const Login = lazy(() => import('pages/Login/Login'))
const ListPhone = lazy(() => import('pages/ListPhone/ListPhone'))
const AddPhone = lazy(() => import('pages/AddPhone/AddPhone'))
const EditPhone = lazy(() => import('pages/EditPhone/EditPhone'))
const ViewPhone = lazy(() => import('pages/ViewPhone/ViewPhone'))
const Error404 = lazy(() => import('pages/Error404/Error404'))

export interface IRoute {
  path: string
  element: JSX.Element
  lazy?: boolean
  allowAuth?: boolean
}

export enum RoutePath {
  LIST_PHONE = '/',
  VIEW_PHONE = '/:id',
  LOGIN = '/login',
  ADD_PHONE = '/add',
  EDIT_PHONE = '/edit/:id',
  ERROR_404 = '/404'
}

export const routes: IRoute[] = [
  {
    path: RoutePath.LIST_PHONE,
    allowAuth: true,
    lazy: true,
    element: <ListPhone />
  },
  {
    path: RoutePath.LOGIN,
    allowAuth: false,
    lazy: true,
    element: <Login />
  },
  {
    path: RoutePath.VIEW_PHONE,
    allowAuth: true,
    lazy: true,
    element: <ViewPhone />,
  },
  {
    path: RoutePath.ADD_PHONE,
    allowAuth: true,
    lazy: true,
    element: <AddPhone />
  },
  {
    path: RoutePath.EDIT_PHONE,
    allowAuth: true,
    lazy: true,
    element: <EditPhone />
  },
  {
    path: RoutePath.ERROR_404,
    lazy: true,
    element: <Error404 />
  },
  {
    path: '*',
    element: <Navigate replace to="/404" />
  }
]

const lazyReturn = (children: JSX.Element, lazy?: boolean): JSX.Element => {
  if (lazy !== undefined && lazy) {
    return <Suspense fallback={<Loader alwaysShow={true}/>}>{children}</Suspense>
  }
  return children
}

const AppRouter = () => {
  return (
    <>
      <Routes>
        {routes.map(route =>
          <Route
              key={route.path}
              path={route.path}
              element={<ProtectedRoute allow={{
                allowedAuth: route.allowAuth
              }}>
                  {lazyReturn(route.element, route.lazy)}
              </ProtectedRoute>}
            />
        )}
      </Routes>
    </>
  )
}

export default AppRouter