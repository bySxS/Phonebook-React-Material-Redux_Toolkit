import React, { lazy } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import FormEditContact from 'features/contacts/components/form-edit-contact'
import { useContacts } from 'features/contacts/hooks/use-сontacts'
import { IContacts } from 'features/contacts/ts/сontacts-interface'
import { RoutePath } from 'router'

export const AddContactLazy = lazy(() => import('pages/add-contact'))

const AddContact = () => {
  const { addContact } = useContacts()
  const navigate = useNavigate()
  const onAdd = (contact: IContacts) => {
    addContact(contact)
    navigate(RoutePath.LIST_CONTACT)
  }
  return (
    <>
      <Helmet title={'Add contact'}>
        <meta charSet="utf-8" />
      </Helmet>
      <FormEditContact onClickChange={onAdd} />
    </>
  )
}

export default AddContact
