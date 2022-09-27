import React, { lazy, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate, useParams } from 'react-router-dom'
import { RoutePath } from 'router'

export const EditContactLazy = lazy(() => import('pages/edit-contact'))

const EditContact = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  useEffect(() => {
    if (id && isNaN(+id)) {
      navigate(RoutePath.ERROR404)
    }
  }, [id, navigate])
  return (
    <>
      <Helmet title={'Edit contact'}>
        <meta charSet="utf-8" />
      </Helmet>
      <div>Edit contact</div>
    </>
  )
}

export default EditContact