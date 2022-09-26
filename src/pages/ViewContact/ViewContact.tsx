import React, { lazy, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate, useParams } from 'react-router-dom'
import { RoutePath } from 'Router'

export const ViewContactLazy = lazy(() => import('pages/ViewContact/ViewContact'))

const ViewContact = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  useEffect(() => {
    if (id && isNaN(+id)) {
      navigate(RoutePath.ERROR404)
    }
  }, [])
  return (
    <>
      <Helmet title={'View contacts'}>
        <meta charSet="utf-8" />
      </Helmet>
      <div>View</div>
    </>
  )
}

export default ViewContact
