import { Typography } from '@mui/material'
import React, { lazy, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useParams } from 'react-router-dom'
import ViewContactItem from 'features/contacts/components/view-contact-item'
import { useContacts } from 'features/contacts/hooks/use-сontacts'
import { IContacts } from 'features/contacts/ts/сontacts-interface'
import { useAppSelector } from 'hooks/use-store'
import LoaderText from 'shared/loader-text'

export const ViewContactLazy = lazy(() => import('pages/view-contact'))

const ViewContact = () => {
  const { contactById, fetchContacts, isLoading, status, error } = useContacts()
  const { id } = useParams()
  const contact: IContacts = useAppSelector(contactById(id || ''))
  useEffect(() => {
    if (!contact?.phone && status !== 'idle' && !error && !isLoading) {
      fetchContacts()
    }
  }, [contact, fetchContacts, isLoading, status, error])
  
  if (isLoading) {
    return <LoaderText />
  }
  
  if (error) {
    return (
      <Typography gutterBottom sx={{ color: 'red' }} variant="h5" component="h2">
        {error}
      </Typography>
    )
  }
  
  if (!contact?.phone) {
    return (
      <Typography gutterBottom variant="h5" component="h2">
        No contact:(
      </Typography>
    ) // or redirect to page 404
  }
  
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
