import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Loader from 'shared/loader'
import { AddContactLazy } from './pages/add-contact'
import { EditContactLazy } from './pages/edit-contact'
import { Error404Lazy } from './pages/error404'
import { ContactsLazy } from './pages/contacts'
import { LoginLazy } from './pages/login'
import { ViewContactLazy } from './pages/view-contact'
import PublicRoute from './shared/public-route'
import ProtectedRoute from 'shared/protected-route'

export const RoutePath = {
  LIST_CONTACT: '/',
  VIEW_CONTACT: (id: string = ':id') => `/contact/${id}`,
  LOGIN: '/login',
  ADD_CONTACT: '/add',
  EDIT_CONTACT: (id: string = ':id') => `/edit/${id}`,
  ERROR404: '/404'
}

const AppRouter = () => {
  return (
    <>
    <Suspense fallback={<Loader alwaysShow={true} />}>
      <Routes>
          <Route
            path={RoutePath.LIST_CONTACT}
            element={
            <ProtectedRoute>
              <ContactsLazy />
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
            path={RoutePath.ADD_CONTACT}
            element={
            <ProtectedRoute>
              <AddContactLazy />
            </ProtectedRoute>}
          />
        <Route
          path={RoutePath.VIEW_CONTACT()}
          element={
            <ProtectedRoute>
              <ViewContactLazy />
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