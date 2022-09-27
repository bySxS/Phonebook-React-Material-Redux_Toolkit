import React, { lazy } from 'react'
import { Helmet } from 'react-helmet-async'
import { useParams } from 'react-router-dom'
import { useContacts } from 'features/contacts/hooks/use-сontacts'
import { IContacts } from 'features/contacts/ts/сontacts-interface'
import { useAppSelector } from '../hooks/use-store'

export const EditContactLazy = lazy(() => import('pages/edit-contact'))

const EditContact = () => {
  const { contactById } = useContacts()
  const { id } = useParams()
  const contact: IContacts = useAppSelector(contactById(id || ''))
  
  return (
    <>
      <Helmet title={'Edit contact'}>
        <meta charSet="utf-8" />
      </Helmet>
      <div>Edit {contact.name.first}</div>
    </>
  )
}

export default EditContact