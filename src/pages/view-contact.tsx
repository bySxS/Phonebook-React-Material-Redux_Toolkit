import React, { lazy } from 'react'
import { Helmet } from 'react-helmet-async'
import { useParams } from 'react-router-dom'
import ViewContactItem from '../features/contacts/components/view-contact-item'
import { useContacts } from '../features/contacts/hooks/use-сontacts'
import { IContacts } from '../features/contacts/ts/сontacts-interface'
import { useAppSelector } from '../hooks/use-store'

export const ViewContactLazy = lazy(() => import('pages/view-contact'))

const ViewContact = () => {
  const { contactById } = useContacts()
  const { id } = useParams()
  const contact: IContacts = useAppSelector(contactById(id || ''))
  return (
    <>
      <Helmet title={'View contacts'}>
        <meta charSet="utf-8" />
      </Helmet>
      <ViewContactItem contact={contact} />
    </>
  )
}

export default ViewContact
