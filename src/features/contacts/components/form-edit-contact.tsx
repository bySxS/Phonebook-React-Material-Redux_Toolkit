import React, { FC } from 'react'
import { IContacts } from '../ts/сontacts-interface'

interface IFormEditContact {
  onClickChange: (id: string, contact: IContacts) => void
  contact: IContacts
}

const FormEditContact: FC<IFormEditContact> = ({ contact, onClickChange }) => {
  
  const onClick = () => {
    onClickChange('', contact)
  }
  return (
    <div>
      form {contact.name.first}
    </div>
  )
}

export default FormEditContact