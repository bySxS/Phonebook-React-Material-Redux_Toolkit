import { Typography } from '@mui/material'
import React, { lazy, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate, useParams } from 'react-router-dom'
import { useContacts } from 'features/contacts/hooks/use-сontacts'
import { IContacts } from 'features/contacts/ts/сontacts-interface'
import FormEditContact from 'features/contacts/components/form-edit-contact'
import { useAppSelector } from 'hooks/use-store'
import { RoutePath } from 'router'
import LoaderText from 'shared/loader-text'

export const EditContactLazy = lazy(() => import('pages/edit-contact'))

const EditContact = () => {
  const { contactById, editContact, isLoading, status, error, fetchContacts } = useContacts()
  const navigate = useNavigate()
  const { id } = useParams()
  const contact: IContacts = useAppSelector(contactById(id || ''))
  
  const onChange = (contact: IContacts) => {
    editContact(contact)
    navigate(RoutePath.LIST_CONTACT)
  }
  
  useEffect(() => {
    if (!contact?.phone && status !== 'idle' && !isLoading) {
      fetchContacts()
    }
  }, [contact, fetchContacts, isLoading, status])
  
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
      <Helmet title={'Edit contact'}>
        <meta charSet="utf-8" />
      </Helmet>
      <FormEditContact contact={contact} onClickChange={onChange} />
    </>
  )
}

export default EditContact