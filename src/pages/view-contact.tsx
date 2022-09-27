import React, { lazy, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate, useParams } from 'react-router-dom'
import { RoutePath } from 'router'

export const ViewContactLazy = lazy(() => import('pages/view-contact'))

const ViewContact = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  useEffect(() => {
    if (id && isNaN(+id)) {
      navigate(RoutePath.ERROR404)
    }
  }, [id, navigate])
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
