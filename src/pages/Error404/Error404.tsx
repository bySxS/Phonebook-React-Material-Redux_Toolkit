import React from 'react'
import { Helmet } from 'react-helmet-async'

const Error404 = () => {
  return (
    <>
      <Helmet title={'404 Error'}>
        <meta charSet="utf-8" />
      </Helmet>
      <div>Error 404</div>
    </>
  )
}

export default Error404