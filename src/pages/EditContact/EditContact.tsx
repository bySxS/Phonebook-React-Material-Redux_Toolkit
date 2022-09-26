import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate, useParams } from 'react-router-dom'
import { RoutePath } from 'Router'

const EditContact = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  useEffect(() => {
    if (id && isNaN(+id)) {
      navigate(RoutePath.ERROR404)
    }
  }, [])
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