import React, { lazy } from 'react'
import { Helmet } from 'react-helmet-async'
import ListContacts from 'features/contacts/components/list-contacts'

export const ContactsLazy = lazy(() => import('pages/contacts'))

const Contacts = () => {
  return (
    <>
      <Helmet title={'List contacts'}/>
      <ListContacts />
    </>
  )
}

export default Contacts
