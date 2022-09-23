import React, {
  ReactNode, Suspense, lazy
} from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import requireAccess from 'features/components/AccessMiddleware/AccessMiddleware'
import Loader from 'shared/UI/Loader/Loader'
const Login = lazy(() => import('features/pages/Login/Login'))
const ListPhone = lazy(() => import('features/pages/ListPhone/ListPhone'))
const AddPhone = lazy(() => import('features/pages/AddPhone/AddPhone'))
const EditPhone = lazy(() => import('features/pages/EditPhone/EditPhone'))
const ViewPhone = lazy(() => import('features/pages/ViewPhone/ViewPhone'))
const Error404 = lazy(() => import('features/pages/Error404/Error404'))

export interface IRoute {
  path: string
  element: ReactNode
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

const lazyReturn = (element: ReactNode, lazy: boolean | undefined): ReactNode => {
  if (lazy !== undefined && lazy) {
    return <Suspense fallback={<Loader alwaysShow={true}/>}>{element}</Suspense>
  } else {
    return element
  }
}

const AppRouter = () => {
  return (
    <>
      <Routes>
        {routes.map(route =>
          (route.allowAuth !== undefined)
            ? (<Route
              key={route.path}
              path={route.path}
              element={requireAccess({
                allowedAuth: route.allowAuth
              })}
            >
              <Route
                index
                element={lazyReturn(route.element, route.lazy)}
              />
            </Route>)
            : (<Route
              key={route.path}
              path={route.path}
              element={lazyReturn(route.element, route.lazy)}
            />)
        )}
      </Routes>
    </>
  )
}

export default AppRouter