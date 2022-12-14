import React, { lazy } from 'react'
import { Helmet } from 'react-helmet-async'

export const Error404Lazy = lazy(() => import('pages/error404'))

const Error404 = () => {
  return (
    <>
      <Helmet title={'404 Error'}/>
      <div>Error 404</div>
    </>
  )
}

export default Error404