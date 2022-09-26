import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Loader from 'shared/Loader/Loader'
import { AddContactLazy } from './pages/AddContact/AddContact'
import { EditContactLazy } from './pages/EditContact/EditContact'
import { Error404Lazy } from './pages/Error404/Error404'
import { ListContactsLazy } from './pages/ListContact/ListContact'
import { LoginLazy } from './pages/Login/Login'
import { ViewContactLazy } from './pages/ViewContact/ViewContact'
import PublicRoute from './shared/PublicRoute/PublicRoute'
import ProtectedRoute from 'shared/ProtectedRoute/ProtectedRoute'

export const RoutePath = {
  LIST_CONTACT: '/',
  VIEW_CONTACT: (id: string = ':id') => `/${id}`,
  LOGIN: '/login',
  ADD_CONTACT: '/add',
  EDIT_CONTACT: (id: string = ':id') => `/edit/${id}`,
  ERROR404: '/404'
}

const AppRouter = () => {
  return (
    <>
    <Suspense fallback={<Loader />}>
      <Routes>
          <Route
            path={RoutePath.LIST_CONTACT}
            element={
            <ProtectedRoute>
              <ListContactsLazy />
            </ProtectedRoute>}
          />
          <Route
            path={RoutePath.LOGIN}
            element={
            <PublicRoute>
              <LoginLazy />
            </PublicRoute>
              }
          />
          <Route
            path={RoutePath.VIEW_CONTACT()}
            element={
            <ProtectedRoute>
              <ViewContactLazy />
            </ProtectedRoute>}
          />
          <Route
            path={RoutePath.ADD_CONTACT}
            element={
            <ProtectedRoute>
              <AddContactLazy />
            </ProtectedRoute>}
          />
          <Route
            path={RoutePath.EDIT_CONTACT()}
            element={
              <ProtectedRoute>
                <EditContactLazy />
              </ProtectedRoute>}
          />
          <Route
            path={RoutePath.ERROR404}
            element={<Error404Lazy />}
          />
          <Route
            path={'*'}
            element={<Navigate
              to={RoutePath.ERROR404}
              state={{ from: location }}
              replace={true} />
            }
          />
      </Routes>
    </Suspense>
    </>
  )
}

export default AppRouter