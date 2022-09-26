import React, { lazy } from 'react'
import { Helmet } from 'react-helmet-async'

export const AddContactLazy = lazy(() => import('pages/AddContact/AddContact'))

const AddContact = () => {
  return (
    <>
      <Helmet title={'Add contact'}>
        <meta charSet="utf-8" />
      </Helmet>
      <div>Add contact</div>
    </>
  )
}

export default AddContact
