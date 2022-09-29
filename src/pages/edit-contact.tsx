import React, { lazy } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate, useParams } from 'react-router-dom'
import { useContacts } from 'features/contacts/hooks/use-сontacts'
import { IContacts } from 'features/contacts/ts/сontacts-interface'
import FormEditContact from 'features/contacts/components/form-edit-contact'
import { useAppSelector } from 'hooks/use-store'
import { RoutePath } from 'router'
import OneContact from 'features/contacts/components/one-contact'

export const EditContactLazy = lazy(() => import('pages/edit-contact'))

const EditContact = () => {
  const { contactById, editContact } = useContacts()
  const navigate = useNavigate()
  const { id } = useParams()
  const contact: IContacts = useAppSelector(contactById(id || ''))
  
  const onChange = (contact: IContacts) => {
    editContact(contact)
    navigate(RoutePath.LIST_CONTACT)
  }
  
  return (
      <OneContact>
        <>
        <Helmet title={`Edit ${contact?.phone} contact`}/>
        <FormEditContact contact={contact} onClickChange={onChange} />
        </>
      </OneContact>
  )
}

export default EditContact