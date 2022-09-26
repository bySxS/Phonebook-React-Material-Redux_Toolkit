import React, { Suspense, lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from 'shared/ProtectedRoute/ProtectedRoute'
import Loader from 'shared/Loader/Loader'
const Login = lazy(() => import('pages/Login/Login'))
const ListContacts = lazy(() => import('pages/ListContact/ListContact'))
const AddContact = lazy(() => import('pages/AddContact/AddContact'))
const EditContact = lazy(() => import('pages/EditContact/EditContact'))
const ViewContact = lazy(() => import('pages/ViewContact/ViewContact'))
const Error404 = lazy(() => import('pages/Error404/Error404'))

export interface IRoute {
  path: string
  element: JSX.Element
  lazy?: boolean
  allowAuth?: boolean
}

export const RoutePath = {
  LIST_PHONE: '/',
  VIEW_PHONE: (id: string = ':id') => `/${id}`,
  LOGIN: '/login',
  ADD_PHONE: '/add',
  EDIT_PHONE: (id: string = ':id') => `/edit/${id}`,
  ERROR404: '/404'
}

export const routes: IRoute[] = [
  {
    path: RoutePath.LIST_PHONE,
    allowAuth: true,
    lazy: true,
    element: <ListContacts />
  },
  {
    path: RoutePath.LOGIN,
    allowAuth: false,
    lazy: true,
    element: <Login />
  },
  {
    path: RoutePath.VIEW_PHONE(),
    allowAuth: true,
    lazy: true,
    element: <ViewContact />,
  },
  {
    path: RoutePath.ADD_PHONE,
    allowAuth: true,
    lazy: true,
    element: <AddContact />
  },
  {
    path: RoutePath.EDIT_PHONE(),
    allowAuth: true,
    lazy: true,
    element: <EditContact />
  },
  {
    path: RoutePath.ERROR404,
    lazy: true,
    element: <Error404 />
  },
  {
    path: '*',
    lazy: true,
    element: <Navigate to={RoutePath.ERROR404} state={{ from: location }} replace={true} />
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